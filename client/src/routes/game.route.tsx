import { useEffect, useRef } from "react";

import EventController from "../system/EventController";
import GameApp from "../system/game/app";

const Game = () => {
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        EventController.Create();
        GameApp.Create();

        EventController.emit('init', ref.current);

        return () => {
            GameApp.Destroy();
            EventController.Destroy();
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
