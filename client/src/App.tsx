import { Client, Room } from "colyseus.js";
import { AnimatePresence } from "framer-motion";
import { lazy, memo, Suspense, useEffect, useState } from "react";
import { Navigate, useLocation, useNavigate } from "react-router-dom";

import { HOME_PATH, PATH } from "./common/enum/path";

import GlobalContext from "./contexts/global.context";

import Game from "./routes/game.route";
import LoadingPage from "./routes/loadingpage.route";

const Home = lazy(() => import('./routes/home.route'));

const MemoGame = memo(Game);
const MemoHome = memo(Home);

const App = () => {
    const [client, setClient] = useState<Client>();
    const [room, setRoom] = useState<Room>();
    const [inGameAuth, setInGameAuth] = useState(false);

    const [activeGame, setActiveGame] = useState(false);

    const path = useLocation().pathname;

    const isGameRoute = Object.is(path, PATH.GAME);
    const isHomeRoute = Object.values(HOME_PATH).includes(path as HOME_PATH);

    const isPathValid = Object.values(PATH).includes(path as PATH);

    const roomContext = {
        client,
        setClient,
        room,
        setRoom,
        setInGameAuth
    };

    const navigate = useNavigate();
    // NOTE: variable for keep tracks how many times user navigate to different paths | routes
    // all navigate in this app doesn't push (save) to history
    // -> every time user request page by typing, app will re-counter this variable
    const [navPathCounter, setNavPathCounter] = useState(0);

    useEffect(() => {
        setNavPathCounter(v => v + 1);
    }, [path, setNavPathCounter]);

    // NOTE: redirect to home if user accesses Game path by typing
    // NOTE: only allow user to go to game page when navigate through Play Menu
    useEffect(() => {
        if (!isGameRoute) return;

        if (inGameAuth) {
            setTimeout(() => {
                setActiveGame(true);
            }, 2000);
        } else {
            setActiveGame(false);

            if (navPathCounter <= 1)
                navigate(PATH.ROOT, { replace: true });
        }
    }, [isGameRoute, inGameAuth, setActiveGame, navigate, navPathCounter]);

    // NOTE: preload image resource
    useEffect(() => {
        new Image().src = `${process.env.PUBLIC_URL}/images/gem.png`;
    },[]);

    return (
        <>
            <GlobalContext.Provider value={roomContext}>
                <Suspense fallback={<LoadingPage />} >
                    <AnimatePresence>
                        {isHomeRoute && <MemoHome key={'home'} />}
                    </AnimatePresence>
                </Suspense>
                {activeGame && <MemoGame />}
                {(!isPathValid) && <Navigate to='/' replace />}
            </GlobalContext.Provider>
        </>
    );
};


export default App;
