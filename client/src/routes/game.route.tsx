import { useEffect, useRef, useState } from "react";

import { InitMessage } from "../common/message/messages";

import LoadingResource from "../components/game/loadingresource.component";

import EventController from "../system/EventController";
import GameApp from "../system/game/app";

const Game = () => {
    const [isLoadingResource, setIsLoadingResource] = useState(true);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current) return;
        EventController.Create();
        GameApp.Create();

        const message: InitMessage = { container: ref.current, setIsLoadingResource: setIsLoadingResource };
        EventController.emit('init', message);

        return () => {
            GameApp.Destroy();
            EventController.Destroy();
        }
    }, [ref]);

    return (
        <div
            ref={ref}
            className="relative flex justify-center items-center min-h-screen"
        >
            {isLoadingResource && <LoadingResource />}
        </div>
    )
}

export default Game;
