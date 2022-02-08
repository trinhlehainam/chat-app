import { Client, Room } from "colyseus.js";
import { Dispatch, SetStateAction, createContext } from "react";
import { GAME_MODE } from "../common/enum/gamemode";

interface Props {
    client?: Client,
    setClient: Dispatch<SetStateAction<Client | undefined>>,
    
    room?: Room,
    setRoom: Dispatch<SetStateAction<Room | undefined>>,

    setInGameAuth: Dispatch<SetStateAction<boolean>>,

    gameMode?: GAME_MODE,
    setGameMode: Dispatch<SetStateAction<GAME_MODE | undefined>>,

    playerNum: number,
    setPlayerNum?: Dispatch<SetStateAction<number>>,
};

const GlobalContext = createContext<Partial<Props>>({});

export default GlobalContext;
