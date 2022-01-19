import cx from 'classnames'
import { memo, useCallback, useContext, useEffect, useMemo, useState } from 'react';
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
const MemoCards = memo(PlayerCards);

interface PlayerInfo {
    playerName: string,
    isReady: boolean,
    isHost: boolean,
};

const Lobby = () => {
    const [roomName, setRoomName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [infoState, setInfoState] = useState(false);
    const [playerInfos, setPlayerInfos] = useState<Array<PlayerInfo>>([]);
    const [myId, setMyId] = useState('');
    const [hostId, setHostId] = useState('');
    const [isHost, checkHost] = useState(false);

    const navigate = useNavigate();

    const { room } = useContext(GlobalContext);

    const context = {
        roomName, setRoomName,
        infoState, setInfoState
    };

    const extractClientInfo = useCallback((state: any) => {
        // NOTE: extract server MapSchema
        const clients = Object.entries(state.clients);

        const infos = clients.map(([id, client]: [string, any]) => ({
            playerName: client.name,
            isReady: client.isReady,
            isHost: state.hostClient === id
        }))

        setPlayerInfos(infos);

    }, [setPlayerInfos]);

    useEffect(() => {
        if (!room) {
            navigate('/rooms', { replace: true })
            return;
        }

        let isMounted = true;

        room.send('requireInit');
        room.onMessage('initState', ({ state, id }) => {
            if (!isMounted) return;
            setRoomName(state.roomName);
            setRoomId(room.id);
            setMyId(id);
            setHostId(state.hostClient);

            extractClientInfo(state);
        });

        room.onMessage('newComer', (state) => {
            if (!isMounted) return;
            extractClientInfo(state);
        });

        room.onMessage('playerLeave', (state) => {
            if (!isMounted) return;
            extractClientInfo(state);
        });

        return () => { isMounted = false };

    }, [room, setRoomName, setRoomId, navigate, extractClientInfo]);

    useEffect(() => {
        checkHost(myId === hostId);
    },[checkHost, myId, hostId]);

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
                    <MemoTitle classname='text-yellow-custom lg:text-5xl' roomName={roomName} />
                    <MemoCards classname='w-4/5 max-w-[1105px] my-auto' playerInfos={playerInfos} />
                    <MemoNavButtons classname='w-1/2 my-auto' setInfoState={setInfoState} isHost={isHost} />
                    <LobbyChatBox
                        classname='absolute bottom-0 left-0 w-full md:w-1/2 lg:w-1/3 text-yellow-custom group'
                    />
                </div>
            </div>
        </LobbyContext.Provider>
    )
};

export default Lobby;
