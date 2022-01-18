import { createContext, Dispatch, SetStateAction } from "react";

interface Props {
    roomName: string,
    setRoomName: Dispatch<SetStateAction<string>>,
}

const LobbyContext = createContext<Partial<Props>>({});

export default LobbyContext;
