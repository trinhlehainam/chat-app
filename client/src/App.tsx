import { Client, Room } from "colyseus.js";
import { memo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Routes, Route, useLocation, Navigate } from "react-router-dom";

import GlobalContext from "./contexts/global.context";
import HomeMenu from "./routes/homemenu.route";
import Title from "./components/title.component";
import PlayMenu from "./routes/playmenu.route";
import Rooms from "./routes/rooms.route";
import Lobby from "./routes/lobby.route";

const TitleMemo = memo(Title);
const HomeMenuMemo = memo(HomeMenu);
const PlayMenuMemo = memo(PlayMenu);
const RoomsMemo = memo(Rooms);
const LobbyMemo = memo(Lobby);

const App = () => {
    const [client, setClient] = useState<Client>();
    const [room, setRoom] = useState<Room>();

    const roomContext = {
        client,
        setClient,
        room,
        setRoom,
    };

    const location = useLocation();

    return (
        <>
            <TitleMemo />
            <GlobalContext.Provider value={roomContext}>
                <AnimatePresence exitBeforeEnter>
                    <Routes location={location} key={location.key}>
                        <Route path={"/"} element={<HomeMenuMemo />} />
                        <Route path={"/play"} element={<PlayMenuMemo />} />
                        <Route path={"/rooms"} element={<RoomsMemo />} />
                        <Route path={"/lobby"} element={<LobbyMemo />} />
                        <Route path='*' element={<Navigate to='/' />} />
                    </Routes>
                </AnimatePresence>
            </GlobalContext.Provider>
        </>
    );
};

export default App;
