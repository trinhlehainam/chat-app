import { Client, Room } from "colyseus.js";
import { memo, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Routes as Switch, Route, useLocation } from "react-router-dom";

import GlobalContext from "./contexts/global.context";
import Home from "./routes/home.route";
import Title from "./components/title.component";
import Play from "./routes/play.route";
import Rooms from "./routes/rooms.route";
import Lobby from "./routes/lobby.route";

const HomeMemo = memo(Home);
const TitleMemo = memo(Title);
const PlayMemo = memo(Play);
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
                    <Switch location={location} key={location.key}>
                        <Route path={"/"} element={<HomeMemo />} />
                        <Route path={"/play"} element={<PlayMemo />} />
                        <Route path={"/rooms"} element={<RoomsMemo />} />
                        <Route path={"/lobby"} element={<LobbyMemo />} />
                    </Switch>
                </AnimatePresence>
            </GlobalContext.Provider>
        </>
    );
};

export default App;
