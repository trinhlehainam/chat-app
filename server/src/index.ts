import express from 'express'
import path from 'path'
import { createServer } from 'http'
import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";
import { WebSocketTransport } from '@colyseus/ws-transport'
import { MyRoom } from './rooms/MyRoom';

class App {
    private port: number;
    private server: Server;

    constructor(port: number) {
        const app = express();
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        // app.use(express.static(path.resolve(__dirname, '../../client/build/')))
        app.use('/colyseus', monitor());

        this.port = port;
        this.server = new Server({
            transport: new WebSocketTransport({
                server: createServer(app),
                verifyClient: function(info, next) {
                    // TODO: change VALID_ORIGIN to proper modain on production 
                    const VALID_ORIGIN = 'http://localhost:3000';
                    next(VALID_ORIGIN === info.origin);
                }
            }),
        });
    }

    init(): App {
        this.server.define("MyRoom", MyRoom);

        return this;
    }

    run(): App {
        this.server.listen(this.port);
        console.log(`Listening on port ${this.port}`)

        return this;
    }
}

const PORT = Number(process.env.PORT || 3030);
new App(PORT).init().run();
