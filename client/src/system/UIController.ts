export default class UIController {
    private static instance?: UIController

    private eventMap: Map<string, Function>
    private setLoadingScene?: Function
    private setWaitingAllOtherPlayer?: Function

    private constructor() {
        this.eventMap = new Map();
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

    static SetWaitingOtherPlayersScene(func: Function): void {
        if (!this.IsCreated()) return;
        const instance = this.instance!;

        instance.setWaitingAllOtherPlayer = func;
    }

    static EnableWaitAllConnectedScene(flag: boolean): void {
        if (!this.IsCreated()) return;
        const instance = this.instance!;

        instance.setWaitingAllOtherPlayer!(flag);
    }

    private static IsCreated(): boolean {
        if (this.instance === undefined){
            console.log('FALSE: Instance of TextureMng is not created !!!');
            return false;
        }
        return true;
    }
}
