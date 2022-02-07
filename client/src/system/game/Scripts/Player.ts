import * as THREE from 'three'

import ModelDataMng from '../Systems/ModelDataMng'

import Entity from '../GameObjects/Entity'
import Transform from '../Components/Transform'

import INPUT_ID from '../Inputs/InputID'
import KeyboardInput from '../Inputs/KeyboardInput'
import InputCommand from '../Inputs/InputCommand'

import GameMng from './GameMng'

export default class Player {
    private enitty: Entity
    private model: THREE.Group
    private mixer: THREE.AnimationMixer
    private scene: THREE.Scene;
    private actions: { [key: string]: THREE.AnimationAction }
    private currentActionKey: string
    private constroller: KeyboardInput
    private inputCommand: InputCommand

    private gameMng: GameMng
    private mapPos: THREE.Vector2
    private ground: THREE.Mesh

    // Test Rotation
    private pointer: THREE.Vector2
    private raycaster: THREE.Raycaster
    private camera: THREE.Camera
    private dest: THREE.Vector3

    constructor(scene: THREE.Scene, stage: GameMng, camera: THREE.Camera) {
        this.scene = scene;
        this.gameMng = stage;
        this.mapPos = new THREE.Vector2();
        this.ground = this.gameMng.GetRound();

        this.enitty = new Entity('player');
        this.actions = {};

        this.constroller = new KeyboardInput([37, 39, 38, 40, 32, 16, 65, 68]);
        this.inputCommand = new InputCommand(this.constroller);
        this.inputCommand.AddPattern(
            'shot',
            [INPUT_ID.LEFT, INPUT_ID.LEFT, INPUT_ID.LEFT]
        )
        this.inputCommand.AddPattern(
            'firing',
            [INPUT_ID.SPACE, INPUT_ID.SPACE, INPUT_ID.SPACE]
        )

        this.pointer = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();
        this.camera = camera;
        this.dest = new THREE.Vector3();

        this.model = ModelDataMng.GetObject3D('eve') as THREE.Group;
        this.model.traverse(node => {
            if (node instanceof THREE.Mesh)
                node.castShadow = true;
        });
        this.mixer = new THREE.AnimationMixer(this.model);
        const animations = ModelDataMng.GetAnimationClips('eve') as THREE.AnimationClip[];
        this.currentActionKey = "idle";
        const animKeys = Object.keys(animations);
        for (let i = 0; i < animKeys.length; ++i) {
            this.actions[animations[i].name.toLowerCase()] = this.mixer.clipAction(animations[i]);
        }
        this.actions[this.currentActionKey].play();
        const transform = this.enitty.transform;
        transform.SetThreeObject(this.model);
        transform.scale.multiplyScalar(3);

        this.scene.add(this.model);

        document.addEventListener('pointermove', this.onPointerMove.bind(this));
        document.addEventListener('pointerdown', this.onPointerDown.bind(this));
    }

    release(): void {
        document.removeEventListener('pointermove', this.onPointerMove.bind(this));
        document.removeEventListener('pointerdown', this.onPointerDown.bind(this));
    }

    processInput(): void {
        this.constroller.Update();
        this.inputCommand.Update();
    }

    update(dt_s: number): void {
        if (!this.model) return;

        const transform = this.enitty.GetComponent(Transform);
        if (transform === undefined) return;
        if (this.constroller.IsReleased(INPUT_ID.LEFT)) {
            transform.position.x += +15 * dt_s;
        }
        if (this.constroller.IsReleased(INPUT_ID.RIGHT)) {
            transform.position.x += -15 * dt_s;
        }
        if (this.constroller.IsReleased(INPUT_ID.UP)) {
            transform.position.z += +15 * dt_s;
        }
        if (this.constroller.IsReleased(INPUT_ID.DOWN)) {
            transform.position.z += -15 * dt_s;
        }

        let shot: boolean = false;
        let fire: boolean = false
        if (this.inputCommand.IsMatch('shot', 1))
            shot = true;
        if (this.inputCommand.IsMatch('firing', 1))
            fire = true;

        if (Object.keys(this.actions).length > 0) {
            if (shot)
                this.setAnim('shot', 0.5);
            else if (fire)
                this.setAnim('firing', 0.5);
            else
                this.setAnim('idle', 0.5);
        }

        if (Object.keys(this.actions).length > 0) {
        }

        let cursor: boolean = false;
        if (this.constroller.IsPressed(INPUT_ID.SHIFT)) {
            cursor = true;
        }

        if (this.constroller.IsPressed(INPUT_ID.ADD)) {
            cursor = true;
        }

        if (this.constroller.IsPressed(INPUT_ID.DELETE)) {
            cursor = true;
        }

        if (this.constroller.IsJustPressed(INPUT_ID.SPACE)) {
            this.gameMng.Start();
        }

        this.gameMng.SetCursorVisible(cursor);

        this.mixer?.update(dt_s);
        this.enitty.Update(dt_s);

    }

    render(): void {
    }

    setAnim(animKey: string, duration: number): void {
        if (this.currentActionKey === animKey) return;
        this.crossFadeAnim(animKey, duration);
        this.currentActionKey = animKey;
    }

    crossFadeAnim(animKey: string, duration: number): void {
        const currentAction = this.actions[this.currentActionKey]
        const nextAcion = this.actions[animKey];

        nextAcion.reset();
        /* nextAcion.setEffectiveTimeScale(1);
        nextAcion.setEffectiveWeight(1); */
        currentAction.crossFadeTo(nextAcion, duration, true);
        nextAcion.play();
    }

    waitActionFinished() {
    }

    private onPointerMove(event: MouseEvent): void {
        const isAdd = this.constroller.IsPressed(INPUT_ID.ADD);
        const isDelete = this.constroller.IsPressed(INPUT_ID.DELETE);
        if (!isAdd && !isDelete) return;

        this.pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);

        this.raycaster.setFromCamera(this.pointer, this.camera);

        const intersects = this.raycaster.intersectObject(this.ground, false);

        if (intersects.length > 0) {
            const intersect = intersects[0];
            const intersect_point = intersect.point.clone();
            intersect_point.add(intersect.face!.normal);
            this.gameMng.SetCursorPos(intersect_point);
            this.gameMng.CheckTile();
        }
    }

    private onPointerDown(event: MouseEvent): void {
        const isAdd = this.constroller.IsPressed(INPUT_ID.ADD);
        const isDelete = this.constroller.IsPressed(INPUT_ID.DELETE);
        if (!isAdd && !isDelete) return;

        this.pointer.set((event.clientX / window.innerWidth) * 2 - 1, - (event.clientY / window.innerHeight) * 2 + 1);

        this.raycaster.setFromCamera(this.pointer, this.camera);

        const intersects = this.raycaster.intersectObject(this.ground, false);

        if (intersects.length > 0) {
            const intersect = intersects[0];
            const intersect_point = intersect.point.clone();
            intersect_point.add(intersect.face!.normal);

            if (isAdd) {
                this.gameMng.SetCursorPos(intersect_point);
                this.gameMng.AddObject();
            }
            else if (isDelete) {
                this.gameMng.SetCursorPos(intersect_point);
                this.gameMng.RemoveObject();
            }

            this.gameMng.CheckTile();
        }
    }
}
