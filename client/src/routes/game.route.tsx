import { useContext, useEffect, useRef, useState } from "react";

import { InitMessage } from "../common/message/messages";

import LoadingResource from "../components/game/loadingresource.component";
import GlobalContext from "../contexts/global.context";

import EventController from "../system/EventController";
import GameApp from "../system/game/app";

const Game = () => {
    const { room, gameMode, playerNum } = useContext(GlobalContext);

    const [isLoadingResource, setIsLoadingResource] = useState(true);
    const [isWaitingConnect, setIsWaitingConnect] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current || !gameMode || !playerNum) return;
        EventController.Create();
        GameApp.Create();

        const message: InitMessage = {
            container: ref.current,
            setIsLoadingResource: setIsLoadingResource,
            setIsWaitingConnect: setIsWaitingConnect,
            gameMode: gameMode,
            playerNum: playerNum,
            room: room
        };

        EventController.emit('init', message);

        return () => {
            GameApp.Destroy();
            EventController.Destroy();
        }
    }, [ref, gameMode, room, playerNum, setIsLoadingResource, setIsWaitingConnect]);

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
