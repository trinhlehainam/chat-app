import SceneMng from './Systems/SceneMng'
import { LoadMng } from './Systems/LoadMng';

import EventController from '../EventController';
import { InitMessage } from '../../common/message/messages';
import UIController from './Systems/UIController';

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

    private constructor() {
        this.sceneMng = new SceneMng();
        LoadMng.Create();

        EventController.on('init', async (message: InitMessage) => {
            UIController.SetLoadingSceneFunc(message.setIsLoadingResource);
            UIController.SetWaitingOtherPlayersScene(message.setIsWaitingOtherPlayers);
            await this.sceneMng.Init(message.container, message.gameMode, message.playerNum, message.room);
        });
    }

}
