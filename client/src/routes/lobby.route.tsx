import cx from 'classnames'
import { memo, useCallback, useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import GlobalContext from '../contexts/global.context';
import LobbyContext from '../contexts/lobby.context';

import InfoBox from '../components/lobby/infobox.component';
import LobbyChatBox from '../components/lobby/lobbychatbox.component';
import NavButtons from '../components/lobby/navbuttons.component';
import PlayerCards, { PlayerInfo, PlayerInfoMap } from '../components/lobby/playercards.component';
import LobbyTitle from '../components/lobby/title.component';

const MemoTitle = memo(LobbyTitle);
const MemoNavButtons = memo(NavButtons);
const MemoCards = memo(PlayerCards);

const Lobby = () => {
    const [roomName, setRoomName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [infoState, setInfoState] = useState(false);
    const [playerInfoMap, setPlayerInfoMap] = useState<PlayerInfoMap>(new Map<string, PlayerInfo>());


    const [myId, setMyId] = useState('');
    const [maxPlayers, setMaxPlayers] = useState(4);
    const [playerName, setPlayerName] = useState('');
    const [hostId, setHostId] = useState('');
    const [isHost, checkHost] = useState(false);


    // NOTE: help Memo Component to recognize state change
    const [updatePlayerState, setUpdatePlayerState] = useState(0);

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
    }, [room, navigate]);

    const extractClientInfo = useCallback((state: any) => {
        // NOTE: extract server MapSchema
        const clients = Object.entries(state.clients);

        setPlayerInfoMap(infoMap => {
            clients.forEach(([id, client]: [string, any]) => {
                infoMap.set(id, {
                    playerName: client.name,
                    isReady: client.isReady,
                    isHost: state.hostId === id
                })
            });
            return infoMap;
        });

    }, [setPlayerInfoMap]);

    const updatePlayerInfo = useCallback((state: any) => {
        // NOTE: extract server MapSchema
        const clients = Object.entries(state.clients);

        setPlayerInfoMap(infoMap => {
            clients.forEach(([id, client]: [string, any]) => {
                const playerInfo = infoMap.get(id);
                if (playerInfo) {
                    playerInfo.playerName = client.name;
                    playerInfo.isReady = client.isReady;
                    playerInfo.isHost = state.hostId === id;
                }
                else {
                    infoMap.set(id, {
                        playerName: client.name,
                        isReady: client.isReady,
                        isHost: state.hostId === id
                    })
                };
            });
            return infoMap;
        });
    }, [setPlayerInfoMap]);

    const removePlayerInfo = useCallback((currentHostId: any, leftPlayerId: any, newHostId: any) => {
        setPlayerInfoMap(infoMap => {
            infoMap.delete(leftPlayerId);

            if (currentHostId !== newHostId) {
                const newHost = infoMap.get(newHostId);
                if (newHost) {
                    newHost.isHost = true;
                    newHost.isReady = false;
                }
                setHostId(newHostId);
            }
            return infoMap;
        });
    }, [setPlayerInfoMap, setHostId]);

    useEffect(() => {
        if (!room) {
            return;
        }

        let isMounted = true;

        room.send('requireInit');
        room.onMessage('initState', ({ state, id, playerName, maxClients }) => {
            if (!isMounted) return;
            setRoomName(state.roomName);
            setRoomId(room.id);
            setMyId(id);
            setHostId(state.hostId);
            setMaxPlayers(maxClients);
            setPlayerName(playerName);

            extractClientInfo(state);
            setUpdatePlayerState(state => state + 1);
        });

        return () => { isMounted = false };

    }, [
        room, setRoomName, setRoomId, setMyId, setHostId, setMaxPlayers, setPlayerName,
        extractClientInfo, setUpdatePlayerState
    ]);

    useEffect(() => {
        if (!room) {
            return;
        }

        let isMounted = true;

        room.onMessage('newComer', (state) => {
            if (!isMounted) return;
            updatePlayerInfo(state);
            setUpdatePlayerState(state => state + 1);
        });

        return () => { isMounted = false };

    }, [room, updatePlayerInfo, setUpdatePlayerState]);

    useEffect(() => {
        if (!room) {
            return;
        }

        let isMounted = true;

        room.onMessage('playerLeave', ({ id, newHostId }) => {
            if (!isMounted) return;
            removePlayerInfo(hostId, id, newHostId);
            setUpdatePlayerState(state => state + 1);
        });

        return () => { isMounted = false };

    }, [room, removePlayerInfo, setUpdatePlayerState, hostId]);

    useEffect(() => {
        if (!room) {
            return;
        }

        let isMounted = true;

        room.onMessage('updateClientReadyState', ({ id, isReady }) => {
            if (!isMounted) return;

            setPlayerInfoMap(infoMap => {
                const client = infoMap.get(id);
                if (client) {
                    client.isReady = isReady;
                }
                return infoMap;
            });
            setUpdatePlayerState(state => state + 1);
        });

        return () => { isMounted = false };

    }, [room, setPlayerInfoMap, setUpdatePlayerState]);

    useEffect(() => {
        if (!room) {
            return;
        }

        let isMounted = true;
        room.onMessage('updateClientName', ({ id, newPlayerName }) => {
            if (!isMounted) return;

            setPlayerInfoMap(infoMap => {
                const client = infoMap.get(id);
                if (client) {
                    client.playerName = newPlayerName;
                    // NOTE: only update local playerName of sender
                    if (myId === id)
                        setPlayerName(newPlayerName);
                }
                return infoMap;
            });
            setUpdatePlayerState(state => state + 1);
        });

        return () => { isMounted = false };
    }, [room, setPlayerInfoMap, setPlayerName, setUpdatePlayerState, myId]);

    useEffect(() => {
        checkHost(myId === hostId);
    }, [checkHost, myId, hostId]);

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
                    {infoState &&
                        <InfoBox
                            roomId={roomId}
                            maxPlayers={maxPlayers}
                            playerName={playerName}
                        />
                    }
                    <MemoTitle classname='text-yellow-custom lg:text-5xl select-none' roomName={roomName} />
                    <MemoCards
                        classname='w-4/5 max-w-[1105px] my-auto'
                        playerInfoMap={playerInfoMap}
                        updatePlayerState={updatePlayerState} />
                    <MemoNavButtons
                        classname='w-1/2 my-auto'
                        setInfoState={setInfoState}
                        isHost={isHost}
                    />
                    <LobbyChatBox
                        classname='absolute bottom-0 left-0 w-full md:w-1/2 lg:w-1/3 text-yellow-custom group'
                    />
                </div>
            </div>
        </LobbyContext.Provider>
    )
};

export default Lobby;
