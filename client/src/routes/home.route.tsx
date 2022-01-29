import { AnimatePresence } from "framer-motion";
import { lazy, memo, Suspense } from "react";
import { useMatch } from "react-router-dom";

const Title = lazy(() => import('../components/title.component'))
const HomeMenu = lazy(() => import('../routes/homemenu.route'));
const PlayMenu = lazy(() => import('../routes/playmenu.route'));
const Rooms = lazy(() => import('../routes/rooms.route'));
const Lobby = lazy(() => import('../routes/lobby.route'));

const TitleMemo = memo(Title);
const HomeMenuMemo = memo(HomeMenu);
const PlayMenuMemo = memo(PlayMenu);
const RoomsMemo = memo(Rooms);
const LobbyMemo = memo(Lobby);

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

    console.log('home');

    return (
        <div>
            <Suspense fallback={<div></div>} >
                <TitleMemo />
            </Suspense>
            <Suspense fallback={<div></div>} >
                <AnimatePresence exitBeforeEnter>
                    {isMenu && <HomeMenuMemo key={PATH.HOME_MENU} />}
                    {isPlay && <PlayMenuMemo key={PATH.PLAY_MEMU} />}
                    {isRooms && <RoomsMemo key={PATH.ROOMS} />}
                    {isLobby && <LobbyMemo key={PATH.LOBBY} />}
                </AnimatePresence>
            </Suspense>
        </div>
    )
}

export default Home;
