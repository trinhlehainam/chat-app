import { Client, Room } from "colyseus.js";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Routes as Switch, Route, useLocation } from "react-router-dom";

import RoomContext from "./contexts/room.context";
import Home from "./routes/home.route";
import Title from "./components/title.component";
import Play from "./routes/play.route";
import Rooms from "./routes/rooms.route";
import Lobby from "./routes/lobby.route";

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
            <Title />
            <RoomContext.Provider value={roomContext}>
                <AnimatePresence exitBeforeEnter>
                    <Switch location={location} key={location.key}>
                        <Route path={"/"} element={<Home />} />
                        <Route path={"/play"} element={<Play />} />
                        <Route path={"/rooms"} element={<Rooms />}/>
                        {room && <Route path={"/lobby"} element={<Lobby />} />}
                    </Switch>
                </AnimatePresence>
            </RoomContext.Provider>
        </>
    );
};

export default App;
