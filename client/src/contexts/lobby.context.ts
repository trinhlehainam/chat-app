import { createContext, Dispatch, SetStateAction } from "react";

interface Props {
    roomId: string,
    setRoomId: Dispatch<SetStateAction<string>>,

    roomName: string,
    setRoomName: Dispatch<SetStateAction<string>>,
}

const LobbyContext = createContext<Partial<Props>>({});

export default LobbyContext;
