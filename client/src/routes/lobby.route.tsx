import cx from 'classnames'
import { memo, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import GlobalContext from '../contexts/global.context';
import LobbyContext from '../contexts/lobby.context';

import InfoBox from '../components/lobby/infobox.component';
import LobbyChatBox from '../components/lobby/lobbychatbox.component';
import NavButtons from '../components/lobby/navbuttons.component';
import PlayerCards from '../components/lobby/playercards.component';
import LobbyTitle from '../components/lobby/title.component';

const MemoTitle = memo(LobbyTitle);
const MemoNavButtons = memo(NavButtons);

const Lobby = () => {
    const [roomName, setRoomName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [infoState, setInfoState] = useState(false);

    const navigate = useNavigate();

    const { room } = useContext(GlobalContext);

    const context = {
        roomName, setRoomName,
        infoState, setInfoState
    };

    useEffect(() => {
        if (!room) {
            navigate('/rooms', { replace: true })
            return;
        }

        room.send('requireInit');
        room.onMessage('initState', (state) => {
            setRoomName(state.roomName);
            setRoomId(room.id);
            console.log(room.id);
        });

    }, [room, setRoomName, setRoomId, navigate]);

    return (
        <LobbyContext.Provider value={context}>
            <div
                className={cx(
                    "absolute inset-0 sm:inset-6 bg-black/10 backdrop-blur-xl",
                    "flex items-center justify-center",
                )}
            >
                <div
                    className={cx(
                        "w-full h-full p-4 max-w-[1440px]",
                        "relative flex flex-col items-center"
                    )}
                >
                    {infoState && <InfoBox />}
                    <MemoTitle classname='text-yellow-custom lg:text-5xl' roomName={roomName}/>
                    <PlayerCards classname='w-4/5 max-w-[1105px] my-auto' />
                    <MemoNavButtons classname='w-1/2 my-auto' setInfoState={setInfoState}/>
                    <LobbyChatBox
                        classname='absolute bottom-0 left-0 w-full md:w-1/2 lg:w-1/3 text-yellow-custom group'
                    />
                </div>
            </div>
        </LobbyContext.Provider>
    )
};

export default Lobby;
