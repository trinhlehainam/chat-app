import GameApp from './app'

async function main(){
    const app = new GameApp();
    await app.init();
    app.run();
}

main().catch(err => console.log(err));
