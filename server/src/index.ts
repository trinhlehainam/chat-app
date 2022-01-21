import express from 'express'
// import path from 'path'
import { createServer } from 'http'
import { Server } from "colyseus";
import { monitor } from "@colyseus/monitor";
import { WebSocketTransport } from '@colyseus/ws-transport'
import { LobbyRoom } from './rooms/LobbyRoom';

class App {
    private port: number;
    private server: Server;

    constructor(port: number) {
        const app = express();
        // const public_path = path.resolve(__dirname, '../build/');

        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        // app.use(express.static(public_path))
        app.use('/colyseus', monitor());
        /* app.get('/', (req, res) => {
            res.sendFile(path.join(public_path, 'index.html'));
        }); */

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
        this.server
            .define("Lobby", LobbyRoom)
            .filterBy(['password']);

        return this;
    }

    run(): App {
        this.server.listen(this.port);
        console.log(`Listening on port ${this.port}`)

        if (process.env.NODE_ENV !== "production") {

            // simulate 200ms latency between server and client.
            this.server.simulateLatency(200);
        }

        return this;
    }
}

const PORT = Number(process.env.PORT || 3030);
new App(PORT).init().run();
