import { Client, Room } from "colyseus.js";
import { Dispatch, SetStateAction, createContext } from "react";

interface Props {
    client?: Client;
    setClient: Dispatch<SetStateAction<Client | undefined>>;
    
    room?: Room;
    setRoom: Dispatch<SetStateAction<Room | undefined>>;
};

const RoomContext = createContext<Partial<Props>>({});

export default RoomContext;