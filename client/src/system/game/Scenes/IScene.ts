import { Room } from 'colyseus.js'
import {Camera, Scene} from 'three'

import SceneMng from '../Systems/SceneMng'

// TODO: Refactoring the order of class destructor
export default abstract class IScene {
    protected camera: Camera
    protected scene: Scene
    protected sceneMng: SceneMng
    protected room?: Room

    private isEnable: boolean
    private isChange: boolean

    constructor(sceneMng: SceneMng){
        this.sceneMng = sceneMng;
        this.scene = new Scene();
        this.camera = new Camera();
        this.isEnable = true; 
        this.isChange = false;
    }

    abstract InitSingleplayer(): Promise<boolean>;
    abstract InitMultiplayer(room: Room, playerNum: number): Promise<boolean>;
    abstract Release(): void;
    abstract ProcessInput(): void;
    abstract Update(deltaTime_s: number): void;
    abstract Render(): void;
    abstract ChangeScene(scene: IScene): Promise<IScene>;

    SetEnable(flag: boolean): void { this.isEnable = flag; }
    GetThreeScene(): Scene { return this.scene; }
    GetThreeCamera(): Camera { return this.camera; }
    EnableChangeScene(): void { this.isChange = true; }
    IsEnable(): boolean { return this.isEnable; }
    IsChangeSceneEnable(): boolean { return this.isChange; }
}
