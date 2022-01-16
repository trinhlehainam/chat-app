import { createContext, Dispatch, SetStateAction } from "react";

interface Props {
    isValidRoom: boolean,
    setValidRoom: Dispatch<SetStateAction<boolean>>

    refresh: Function,
    create: Function,
    join: Function,
    find: Function
}

const RoomContext = createContext<Partial<Props>>({});

export default RoomContext;
