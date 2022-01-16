import { createContext, Dispatch, SetStateAction } from "react";

interface Props {
    isJoinError: boolean,
    setJoinError: Dispatch<SetStateAction<boolean>>

    joinErrorMessage: string,
    setJoinErrorMessage: Dispatch<SetStateAction<string>>,

    isCreateState: boolean,
    setCreateState: Dispatch<SetStateAction<boolean>>

    roomName: string,
    setRoomName: Dispatch<SetStateAction<string>>,

    password: string,
    setPassword: Dispatch<SetStateAction<string>>,

    isFindState: boolean,
    setFindState: Dispatch<SetStateAction<boolean>>,

    roomId: string,
    setRoomId: Dispatch<SetStateAction<string>>,

    refresh: Function,
    create: Function,
    join: Function,
    find: Function
    cancelMessage: Function,
    joinWithFind: Function
    resetInput: Function,
}

const RoomContext = createContext<Partial<Props>>({});

export default RoomContext;
