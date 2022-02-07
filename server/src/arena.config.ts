import Arena from "@colyseus/arena";
import { monitor } from "@colyseus/monitor";
import express from 'express'
// import path from 'path'

/**
 * Import your Room files
 */
import { LobbyRoom } from './rooms/LobbyRoom';
import { GameRoom } from "./rooms/GameRoom";

export default Arena({
    getId: () => "Your Colyseus App",

    initializeGameServer: (gameServer) => {
        /**
         * Define your room handlers:
         */
        gameServer
            .define("Lobby", LobbyRoom)
            .filterBy(['password']);
        
        gameServer
            .define('Game', GameRoom)
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

        /**
         * Bind your custom express routes here:
         */
        // NOTE: set up public path for deployment
        /* const public_path = path.resolve(__dirname, '../build/');
        app.use(express.static(public_path))
        app.get('/*', (req, res) => {
            res.sendFile(path.join(public_path, 'index.html'));
        }); */
    },


    beforeListen: () => {
        /**
         * Before gameServer.listen() is called.
         */
    }
});
