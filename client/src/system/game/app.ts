import { InitMessage } from '../../common/ui_messages/messages';
import EventController from '../EventController';
import { LoadMng } from './Systems/LoadMng';
import SceneMng from './Systems/SceneMng'

export default class GameApp {
    private static instance?: GameApp

    private sceneMng: SceneMng

    static Create(): GameApp {
        if (!this.instance)
            this.instance = new GameApp();
        
        return this.instance;
    }

    static Destroy(): void {
        if (this.instance) {
            this.instance.sceneMng.Release();
            LoadMng.Destroy();

            delete this.instance;
            this.instance = undefined;
        }
    }

    private constructor(){
        this.sceneMng = new SceneMng();
        LoadMng.Create();

        EventController.on('init', async (message: InitMessage) => {
            LoadMng.SetLoadingSceneFunc(message.setIsLoadingResource);
            await this.sceneMng.Init(message.container);
        });
    }

}
