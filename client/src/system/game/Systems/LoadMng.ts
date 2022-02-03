import {LoadingManager} from 'three'

import TextureMng from './TextureMng'
import ModelDataMng from './ModelDataMng'

class LoadMng {
    private static instance?: LoadMng
    private loader: LoadingManager

    private constructor() {
        this.loader = new LoadingManager();
        TextureMng.Create(this.loader);
        ModelDataMng.Create(this.loader);
    }

    static Create(): void {
        if (this.instance === undefined)
            this.instance = new LoadMng();
    }

    static Destroy(): void {
        if (this.instance) {
            TextureMng.Destroy();
            ModelDataMng.Destroy();

            delete this.instance;
            this.instance = undefined;
        }
    }

    static EnableLoadingScene(flag: boolean): void {
        if (!this.IsCreated()) return;
        const instance = this.instance!;
    }
    
    private static IsCreated(): boolean {
        if (this.instance === undefined){
            console.log('FALSE: Instance of TextureMng is not created !!!');
            return false;
        }
        return true;
    }
} 

export {LoadMng, TextureMng, ModelDataMng};
