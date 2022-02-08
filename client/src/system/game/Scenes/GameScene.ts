import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls'
// import Stats from 'three/examples/jsm/libs/stats.module'

import { ModelDataMng } from '../Systems/LoadMng'

import IScene from './IScene'
import SceneMng from '../Systems/SceneMng'

import GameMng from '../Scripts/GameMng'
import Player from '../Scripts/Player'
// import Enemy from '../Scripts/Enemy'

export default class GameScene extends IScene {
    private player?: Player
    private gameMng?: GameMng
    private controls: OrbitControls

    // DEBUG:
    // private stats: Stats

    constructor(sceneMng: SceneMng) {
        super(sceneMng);

        this.sceneMng = sceneMng;
        this.scene = new THREE.Scene();

        this.camera = new THREE.PerspectiveCamera(
            45, window.innerWidth / window.innerHeight, 0.1, 10000);
        this.camera.position.set(64, 64, 0);
        this.camera.lookAt(0, 0, 0);

        // Canmera controls settings
        this.controls = new OrbitControls(this.camera, this.sceneMng.GetRenderer().domElement);
        this.controls.mouseButtons = {
            RIGHT: THREE.MOUSE.PAN,
            MIDDLE: THREE.MOUSE.DOLLY,
            LEFT: THREE.MOUSE.ROTATE
        }

        this.controls.screenSpacePanning = false;

        this.controls.enableRotate = false;

        this.controls.enableDamping = true;
        this.controls.dampingFactor = 0.05;

        // zoom | dolly distance
        this.controls.minDistance = 20;
        this.controls.maxDistance = 100;

        this.controls.maxPolarAngle = Math.PI / 4;
        this.controls.minPolarAngle = Math.PI / 4;
        
        this.controls.maxAzimuthAngle = 0;
        this.controls.minAzimuthAngle = 0;
        //

        /* this.stats = Stats();
        document.body.appendChild(this.stats.domElement); */

    }

    Release(): void {
        // document.body.removeChild(this.stats.domElement);
        this.player?.release();
    }

    ProcessInput(): void {

    }

    Init(): Promise<boolean> {
        this.sceneMng.GetRenderer().setClearColor(0x00aaaa);
        return new Promise(
            async (resolve, reject) => {
                // Wait until Player's resources are loaded before create Player
                await ModelDataMng.GetAsync('eve', 'swat-guy');
                this.gameMng = new GameMng(this.scene, this.camera);
                this.player = new Player(this.scene, this.gameMng, this.camera);
                //
                resolve(true);
                reject('INIT ERROR: Fail to initialize GameScene !!!');
            }
        );
    }

    Update(deltaTime_s: number): void {
        this.player?.processInput();

        this.controls.update();
        this.player?.update(deltaTime_s);
        this.gameMng?.Update(deltaTime_s);
    }

    Render(): void {
        this.gameMng?.Render();
        this.player?.render();
        // this.stats.update();
    }

    ChangeScene(scene: IScene): Promise<IScene> {
        return new Promise((resolve, reject) => {
            scene.Release();
            resolve(scene);
            reject('ERROR : Fail to change scene !!!');
        }
        );
    }
}
