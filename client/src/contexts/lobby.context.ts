import { createContext, Dispatch, SetStateAction } from "react";

interface Props {
    roomName: string,
    setRoomName: Dispatch<SetStateAction<string>>,

    infoState: boolean,
    setInfoState: Dispatch<SetStateAction<boolean>>,
}

const LobbyContext = createContext<Partial<Props>>({});

export default LobbyContext;
