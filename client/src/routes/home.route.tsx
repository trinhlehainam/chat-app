import { AnimatePresence } from "framer-motion";
import { lazy, memo, Suspense, useContext, useEffect } from "react";
import { useLocation, useMatch } from "react-router-dom";
import { motion } from 'framer-motion'

import { HOME_PATH } from "../common/enum/path";
import GlobalContext from "../contexts/global.context";

const Title = lazy(() => import('../components/title.component'))
const HomeMenu = lazy(() => import('../routes/homemenu.route'));
const PlayMenu = lazy(() => import('../routes/playmenu.route'));
const Rooms = lazy(() => import('../routes/rooms.route'));
const Lobby = lazy(() => import('../routes/lobby.route'));

const MemoTitle = memo(Title);
const MemoHomeMenu = memo(HomeMenu);
const MemoPlayMenu = memo(PlayMenu);
const MemoRooms = memo(Rooms);
const MemoLobby = memo(Lobby);

const Home = () => {
    const isRoot = useMatch(HOME_PATH.ROOT);
    const isPlay = useMatch(HOME_PATH.PLAY_MEMU);
    const isLogin = useMatch(HOME_PATH.LOGIN);
    const isSetting = useMatch(HOME_PATH.SETTING);
    const isRooms = useMatch(HOME_PATH.ROOMS);
    const isLobby = useMatch(HOME_PATH.LOBBY);

    const path = useLocation().pathname;
    const isHome = Object.values(HOME_PATH).includes(path as HOME_PATH);

    const isHomeMenu = isSetting || isLogin || isRoot;
    
    const {setInGameAuth} = useContext(GlobalContext);

    useEffect(() => {
        setInGameAuth && setInGameAuth(false);
    }, [setInGameAuth]);

    return (
        <motion.div
            exit={{ opacity: 0 }}
            transition={{
                delay: 1.5,
                duration: 0
            }}
        >
            <Suspense fallback={<div></div>} >
                <MemoTitle />
            </Suspense>
            <Suspense fallback={<div></div>} >
                <AnimatePresence exitBeforeEnter>
                    {isHomeMenu && <MemoHomeMenu key={HOME_PATH.ROOT} />}
                    {isPlay && <MemoPlayMenu key={HOME_PATH.PLAY_MEMU} />}
                    {isRooms && <MemoRooms key={HOME_PATH.ROOMS} />}
                    {isLobby && <MemoLobby key={HOME_PATH.LOBBY} />}
                    {!isHome && <motion.div key={'not-home'} />}
                </AnimatePresence>
            </Suspense>
        </motion.div >
    )
}

export default Home;
