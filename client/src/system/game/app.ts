import EventController from '../EventController';
import SceneMng from './Systems/SceneMng'

export default class GameApp {
    private sceneMng: SceneMng
    private static instance?: GameApp

    static Create(): GameApp {
        if (!this.instance)
            this.instance = new GameApp();
        
        return this.instance;
    }

    static Destroy(): void {
        if (this.instance) {
            this.instance.sceneMng.Release();
            delete this.instance;
            this.instance = undefined;
        }
    }

    private constructor(){
        this.sceneMng = new SceneMng();

        EventController.on('init', async (container: HTMLDivElement) => {
            await this.sceneMng.Init(container);
        });
    }

}
