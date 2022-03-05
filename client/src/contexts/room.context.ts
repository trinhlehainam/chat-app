import { createContext, Dispatch, SetStateAction } from "react";

interface Props {
    isJoinError: boolean,
    setJoinError: Dispatch<SetStateAction<boolean>>

    joinErrorMessage: string,
    setJoinErrorMessage: Dispatch<SetStateAction<string>>,

    isCreateState: boolean,
    setCreateState: Dispatch<SetStateAction<boolean>>

    isFindState: boolean,
    setFindState: Dispatch<SetStateAction<boolean>>,

    roomId: string,
    setRoomId: Dispatch<SetStateAction<string>>,

    refresh: Function,
    join: Function,
    find: Function
    closeJoinErrorBox: Function,
}

const RoomContext = createContext<Partial<Props>>({});

export default RoomContext;
