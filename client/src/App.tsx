import { Client, Room } from "colyseus.js";
import { AnimatePresence } from "framer-motion";
import { lazy, memo, Suspense, useState } from "react";
import { Navigate, useLocation, useMatch } from "react-router-dom";
import { PATH, HOME_PATH, UNSUPPORTED_PATH } from "./common/enum/path";

import GlobalContext from "./contexts/global.context";
import UnsupportedPrompt from "./routes/unsupportedprompt.route";

const Home = lazy(() => import('./routes/home.route'));
const Game = lazy(() => import('./routes/game.route'));

const MemoHome = memo(Home);
const MemoGame = memo(Game);

const App = () => {
    const [client, setClient] = useState<Client>();
    const [room, setRoom] = useState<Room>();

    const location = useLocation();
    const path = location.pathname;
    const isUnsupportedPath = Object.values(UNSUPPORTED_PATH).includes(path as UNSUPPORTED_PATH);
    const isPathValid = Object.values(PATH).includes(path as PATH) || isUnsupportedPath;

    const isHome = Object.values(HOME_PATH).includes(path as HOME_PATH);
    const isGame = useMatch(PATH.GAME);

    const roomContext = {
        client,
        setClient,
        room,
        setRoom,
    };

    return (
        <Suspense fallback={<div>Loading page</div>} >
            <GlobalContext.Provider value={roomContext}>
                <AnimatePresence exitBeforeEnter>
                    {isHome && <MemoHome key={'home'} />}
                    {isGame && <MemoGame key={'game'} />}
                </AnimatePresence>
            </GlobalContext.Provider>
            {isUnsupportedPath && <UnsupportedPrompt />}
            {!isPathValid && <Navigate to='/' />}
        </Suspense>
    );
};

export default App;
