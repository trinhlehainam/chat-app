import { Client, Room } from "colyseus.js";
import { AnimatePresence } from "framer-motion";
import { lazy, memo, Suspense, useState } from "react";
import { useLocation } from "react-router-dom";
import { HOME_PATH } from "./common/enum/path";

import GlobalContext from "./contexts/global.context";
import NotHomePages from "./routes/nothomepages.route";

const Home = lazy(() => import('./routes/home.route'));

const MemoHome = memo(Home);
const MemoNotHomePages = memo(NotHomePages);

const App = () => {
    const [client, setClient] = useState<Client>();
    const [room, setRoom] = useState<Room>();
    const [changeToNotHome, setChangeToNotHome] = useState(false);

    const path = useLocation().pathname;

    const isHome = Object.values(HOME_PATH).includes(path as HOME_PATH);

    const roomContext = {
        client,
        setClient,
        room,
        setRoom,
        setChangeToNotHome
    };

    console.log('app');

    return (
        <>
            <GlobalContext.Provider value={roomContext}>
                <Suspense fallback={<div>Loading page</div>} >
                    <AnimatePresence onExitComplete={() => setChangeToNotHome(true)}>
                        {isHome && <MemoHome key={'home'} />}
                    </AnimatePresence>
                </Suspense>
                {changeToNotHome && <MemoNotHomePages />}
            </GlobalContext.Provider>
        </>
    );
};

export default App;
