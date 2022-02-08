import { Room } from "colyseus.js";
import { GAME_MODE } from "../enum/gamemode";

export interface InitMessage {
    container: HTMLDivElement,
    setIsLoadingResource: Function,
    gameMode: GAME_MODE,
    room?: Room
}
