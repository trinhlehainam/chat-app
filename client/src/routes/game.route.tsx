import { useContext, useEffect, useRef, useState } from "react";

import { InitMessage } from "../common/message/messages";

import LoadingResource from "../components/game/loadingresource.component";
import GlobalContext from "../contexts/global.context";

import EventController from "../system/EventController";
import GameApp from "../system/game/app";

const Game = () => {
    const { room, gameMode } = useContext(GlobalContext);

    const [isLoadingResource, setIsLoadingResource] = useState(true);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current || !gameMode) return;
        EventController.Create();
        GameApp.Create();

        const message: InitMessage = {
            container: ref.current,
            setIsLoadingResource: setIsLoadingResource,
            gameMode: gameMode,
            room: room
        };

        EventController.emit('init', message);

        return () => {
            GameApp.Destroy();
            EventController.Destroy();
        }
    }, [ref, gameMode, room]);

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
