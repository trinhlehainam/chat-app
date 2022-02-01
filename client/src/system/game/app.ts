import SceneMng from './Systems/SceneMng'

export default class GameApp {
    private sceneMng: SceneMng

    constructor(){
        this.sceneMng = new SceneMng();
    }

    async init(): Promise<void> {
        this.sceneMng.Init();
    }

    run(): void{
        this.sceneMng.Run();
    }
}
