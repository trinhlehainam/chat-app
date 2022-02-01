import { useEffect, useRef } from "react";

import EventController from "../system/EventController";
import GameApp from "../system/game/app";

const Game = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        EventController.Create();
        const gameApp = new GameApp();
        EventController.emit('init', ref.current);
        console.log('hello');

        return () => {
            EventController.emit('release');
        }
    }, [ref]);

    return (
        <div
            ref={ref}
            className="flex justify-center items-center min-h-screen">
        </div>
    )
}

export default Game;
