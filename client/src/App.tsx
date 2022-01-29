import { Client, Room } from "colyseus.js";
import { memo, Suspense, useState } from "react";
import { useLocation } from "react-router-dom";

import GlobalContext from "./contexts/global.context";
import Home from "./routes/home.route";

const MemoHome = memo(Home);

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
            <Suspense fallback={<div></div>} >
                <GlobalContext.Provider value={roomContext}>
                    <MemoHome />
                </GlobalContext.Provider>
            </Suspense>
        </>
    );
};

export default App;
