import { Room } from "colyseus.js";
import { GAME_MODE } from "../enum/gamemode";

export interface InitMessage {
    container: HTMLDivElement,
    setIsLoadingResource: Function,
    setIsWaitingConnect: Function,
    gameMode: GAME_MODE,
    playerNum: number,
    room?: Room
}
