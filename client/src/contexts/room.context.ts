import { createContext, Dispatch, SetStateAction } from "react";

interface Props {
    isValidRoom: boolean,
    setValidRoom: Dispatch<SetStateAction<boolean>>

    isCreateState: boolean,
    setCreateState: Dispatch<SetStateAction<boolean>>

    roomName:string,
    setRoomName: Dispatch<SetStateAction<string>>,

    password: string,
    setPassword: Dispatch<SetStateAction<string>>,

    refresh: Function,
    create: Function,
    join: Function,
    find: Function
    cancelMessage: Function,
}

const RoomContext = createContext<Partial<Props>>({});

export default RoomContext;
