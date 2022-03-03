import { useContext, useEffect, useRef, useState } from "react";

import { InitMessage } from "../common/message/messages";

import LoadingResource from "../components/game/loadingresource.component";
import WaitingOtherPlayers from "../components/game/waitingotherplayers.component";
import GlobalContext from "../contexts/global.context";

import EventController from "../system/EventController";
import GameApp from "../system/game/app";
import UIController from "../system/UIController";

const Game = () => {
    const { room, gameMode, playerNum } = useContext(GlobalContext);

    const [isLoadingResource, setIsLoadingResource] = useState(true);
    const [isWaitingOtherPlayers, setIsWaitingOtherPlayers] = useState(false);

    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        if (!ref.current || !gameMode || !playerNum) return;
        EventController.Create();
        UIController.Create();
        GameApp.Create();

        const message: InitMessage = {
            container: ref.current,
            setIsLoadingResource: setIsLoadingResource,
            setIsWaitingOtherPlayers: setIsWaitingOtherPlayers,
            gameMode: gameMode,
            playerNum: playerNum,
            room: room
        };

        EventController.emit('init', message);

        return () => {
            GameApp.Destroy();
            UIController.Destroy();
            EventController.Destroy();
        }
    }, [ref, gameMode, room, playerNum, setIsLoadingResource, setIsWaitingOtherPlayers]);

    return (
        <div
            ref={ref}
            className="relative flex justify-center items-center min-h-screen"
        >
            {isLoadingResource && <LoadingResource />}
            {isWaitingOtherPlayers && <WaitingOtherPlayers />}
        </div>
    )
}

export default Game;
