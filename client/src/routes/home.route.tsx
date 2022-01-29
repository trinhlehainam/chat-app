import { AnimatePresence } from "framer-motion";
import { lazy, memo, Suspense } from "react";
import { useMatch } from "react-router-dom";

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

enum PATH {
    HOME_MENU = '/',
    PLAY_MEMU = '/play',
    ROOMS = '/rooms',
    LOBBY = '/lobby'
}

const Home = () => {
    const isMenu = useMatch(PATH.HOME_MENU);
    const isPlay = useMatch(PATH.PLAY_MEMU);
    const isRooms = useMatch(PATH.ROOMS);
    const isLobby = useMatch(PATH.LOBBY);

    return (
        <div>
            <Suspense fallback={<div></div>} >
                <MemoTitle />
            </Suspense>
            <Suspense fallback={<div></div>} >
                <AnimatePresence exitBeforeEnter>
                    {isMenu && <MemoHomeMenu key={PATH.HOME_MENU} />}
                    {isPlay && <MemoPlayMenu key={PATH.PLAY_MEMU} />}
                    {isRooms && <MemoRooms key={PATH.ROOMS} />}
                    {isLobby && <MemoLobby key={PATH.LOBBY} />}
                </AnimatePresence>
            </Suspense>
        </div>
    )
}

export default Home;
