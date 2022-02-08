export default class UIController {
    private static instance?: UIController

    private setLoadingScene?: Function
    private setWaitAllConnectScene?: Function

    private constructor() {
    }

    static Create(): void {
        if (this.instance === undefined)
            this.instance = new UIController();
    }

    static Destroy(): void {
        if (this.instance) {
            delete this.instance;
            this.instance = undefined;
        }
    }

    static SetLoadingSceneFunc(func: Function): void {
        if (!this.IsCreated()) return;
        const instance = this.instance!;

        instance.setLoadingScene = func;
    }

    static EnableLoadingScene(flag: boolean): void {
        if (!this.IsCreated()) return;
        const instance = this.instance!;

        instance.setLoadingScene!(flag);
    }

    static SetWaitAllConnectedScene(func: Function): void {
        if (!this.IsCreated()) return;
        const instance = this.instance!;

        instance.setWaitAllConnectScene = func;
    }

    static EnableWaitAllConnectedScene(flag: boolean): void {
        if (!this.IsCreated()) return;
        const instance = this.instance!;

        instance.setWaitAllConnectScene!(flag);
    }

    private static IsCreated(): boolean {
        if (this.instance === undefined){
            console.log('FALSE: Instance of TextureMng is not created !!!');
            return false;
        }
        return true;
    }
    
}
