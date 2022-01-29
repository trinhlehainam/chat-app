import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";
import express from 'express'
// import path from 'path'

/**
 * Import your Room files
 */
import { LobbyRoom } from './rooms/LobbyRoom';

export default Arena({
    getId: () => "Your Colyseus App",

    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer
            .define("Lobby", LobbyRoom)
            .filterBy(['password']);

    },

    initializeExpress: (app) => {
        /**
         * Bind @colyseus/monitor
         * It is recommended to protect this route with a password.
         * Read more: https://docs.colyseus.io/tools/monitor/
         */
        app.use("/colyseus", monitor());
        app.use(express.json());
        app.use(express.urlencoded({ extended: true }));
        app.use('/colyseus', monitor());

        // NOTE: set up public path for deployment
        /* const public_path = path.resolve(__dirname, '../build/');
        app.use(express.static(public_path))
        app.get('/', (req, res) => {
            res.sendFile(path.join(public_path, 'index.html'));
        }); */

        /**
         * Bind your custom express routes here:
         */
        app.get("/", (req, res) => {
            res.send("It's time to kick ass and chew bubblegum!");
        });
    },


    beforeListen: () => {
        /**
         * Before gameServer.listen() is called.
         */
    }
});
