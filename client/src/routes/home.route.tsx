import { AnimatePresence } from "framer-motion";
import { lazy, memo, Suspense } from "react";
import { useMatch } from "react-router-dom";
import { motion } from 'framer-motion'

import { PATH } from "../common/enum/path";

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
    const isMenu = useMatch(PATH.HOME_MENU);
    const isPlay = useMatch(PATH.PLAY_MEMU);
    const isRooms = useMatch(PATH.ROOMS);
    const isLobby = useMatch(PATH.LOBBY);
    const isGame = useMatch(PATH.GAME);

    return (
        <motion.div
            exit={{opacity: 0}}
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
                    {isMenu && <MemoHomeMenu key={PATH.HOME_MENU} />}
                    {isPlay && <MemoPlayMenu key={PATH.PLAY_MEMU} />}
                    {isRooms && <MemoRooms key={PATH.ROOMS} />}
                    {isLobby && <MemoLobby key={PATH.LOBBY} />}
                    {isGame && <motion.div key={PATH.GAME} />}
                </AnimatePresence>
            </Suspense>
        </motion.div >
    )
}

export default Home;
