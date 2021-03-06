export default class UIController {
    private static instance?: UIController

    private overlayBoxMap: Map<string, Function>

    private constructor() {
        this.overlayBoxMap = new Map();
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

    static RegisterOverlayBox(eventName: string, toggleLoadingFunc: Function): void {
        if (!this.IsCreated()) return;
        const instance = this.instance!;

        if (instance.overlayBoxMap.has(eventName)) {
            console.log(`WARN: ${eventName} is already registered !`);
            return;
        }

        instance.overlayBoxMap.set(eventName, toggleLoadingFunc);
    }

    static SetShowOverlayBox(eventName: string, flag: boolean): void {
        if (!this.IsCreated()) return;
        const instance = this.instance!;

        const event = instance.overlayBoxMap.get(eventName);
        if (!event) {
            console.log(`WARN: ${eventName} has not registered yet !`);
            return;
        }

        event(flag);
    }

    private static IsCreated(): boolean {
        if (this.instance === undefined){
            console.log('FALSE: Instance of TextureMng is not created !!!');
            return false;
        }
        return true;
    }
}
