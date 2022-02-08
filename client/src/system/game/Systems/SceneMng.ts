import { WebGLRenderer, Color, Clock, PerspectiveCamera, sRGBEncoding } from 'three'

import { ModelDataMng } from '../Systems/LoadMng'

import IScene from '../Scenes/IScene'
import GameScene from '../Scenes/GameScene'
import { GAME_MODE } from '../../../common/enum/gamemode'
import { Room } from 'colyseus.js'
import UIController from './UIController'

export default class SceneMng {
    private renderer: WebGLRenderer
    private scene: IScene
    private clock: Clock
    private container?: HTMLDivElement;

    constructor() {
        this.renderer = new WebGLRenderer({ antialias: true, alpha: true });
        this.renderer.setSize(window.innerWidth, window.innerHeight);
        this.renderer.setPixelRatio(window.devicePixelRatio);
        this.renderer.setClearColor(new Color(0x000000));
        this.renderer.outputEncoding = sRGBEncoding;
        this.renderer.shadowMap.enabled = true;

        this.clock = new Clock();

        this.scene = new GameScene(this);
    }

    async Init(container: HTMLDivElement, gameMode: GAME_MODE, room?: Room): Promise<boolean> {
        UIController.EnableLoadingScene(true);
        this.container = container;
        this.container.appendChild(this.renderer.domElement);
        window.addEventListener('resize', this.onResizeWindow.bind(this));

        ModelDataMng.LoadAsync('./assets/factory/eve.glb', 'eve');
        ModelDataMng.LoadAsync('./assets/factory/eve2.glb', 'eve2');
        ModelDataMng.LoadAsync('./assets/factory/swat-guy.glb', 'swat-guy');
        ModelDataMng.LoadAsync('./assets/factory/swat-guy2.glb', 'swat-guy2');

        switch (gameMode) {
            case GAME_MODE.SINGE:
                await this.scene.InitSingleplayer();
                this.Run();
                UIController.EnableLoadingScene(false);
                return true;
            case GAME_MODE.MULTIPLAYER:
                if (!room) return false;
                await this.scene.InitMultiplayer(room);
                UIController.EnableLoadingScene(false);
                UIController.EnableWaitAllConnectedScene(true);
                room.onMessage('allInitCompleted', () => {
                    this.Run();
                    UIController.EnableWaitAllConnectedScene(true);
                })
                return true;
            default:
                console.error('ERROR: Invalid game mode !');
                return false;
        }
    }

    Release(): void {
        if (!this.container) return;
        this.Stop();
        this.scene.Release();
        window.removeEventListener('resize', this.onResizeWindow.bind(this));
        this.container.removeChild(this.renderer.domElement);
    }

    Run(): void {
        this.renderer.setAnimationLoop(this.Loop.bind(this));
    }

    Stop(): void {
        this.renderer.setAnimationLoop(null);
    }

    GetRenderer(): WebGLRenderer { return this.renderer; }

    private Loop(): void {
        const deltaTime_s = this.clock.getDelta();

        if (this.scene.IsChangeSceneEnable()) {
            this.scene.ChangeScene(this.scene).then(
                // Wait until change scene set up complele
                // Then start loop again
                scene => {
                    this.scene = scene;
                    this.Run();
                    UIController.EnableLoadingScene(false);
                }
            );

            // Stop loop and wait until change scene set up is done
            this.Stop();
            UIController.EnableLoadingScene(true);
            return;
        }

        this.scene.ProcessInput();
        this.scene.Update(deltaTime_s);
        this.scene.Render();

        this.Render();
    }

    private Render(): void {
        this.renderer.render(this.scene.GetThreeScene(), this.scene.GetThreeCamera());
    }

    private onResizeWindow(): void {
        const camera = this.scene.GetThreeCamera();
        if (camera instanceof PerspectiveCamera) {
            camera.aspect = window.innerWidth / window.innerHeight;
            camera.updateProjectionMatrix();
        }
        this.renderer.setSize(window.innerWidth, window.innerHeight);
    }
}
