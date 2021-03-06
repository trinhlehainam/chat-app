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
import { Room } from 'colyseus.js';
import { GAME_MODE } from '../common/enum/gamemode';
import { PATH } from '../common/enum/path';

const MemoTitle = memo(LobbyTitle);
const MemoNavButtons = memo(NavButtons);
const MemoPlayerCards = memo(PlayerCards);

const Lobby = () => {
    const [roomName, setRoomName] = useState('');
    const [roomId, setRoomId] = useState('');
    const [infoState, setInfoState] = useState(false);
    const [playerInfoMap, setPlayerInfoMap] = useState<PlayerInfoMap>(new Map<string, PlayerInfo>());

    const [myId, setMyId] = useState('');
    const [maxPlayers, setMaxPlayers] = useState(4);
    const [playerName, setPlayerName] = useState('');
    const [hostId, setHostId] = useState('');

    // NOTE: help Child Component recognize playerInfoMap state updated
    const [playerInfoUpdated, setPlayerInfoUpdated] = useState(0);

    const navigate = useNavigate();

    const { client, room, setRoom, setInGameAuth, setGameMode, setPlayerNum } = useContext(GlobalContext);

    const context = {
        roomName, setRoomName,
        infoState, setInfoState
    };

    // NOTE: return to home page if client hasn't connected to any room
    useEffect(() => {
        if (!room) {
            navigate(PATH.ROOT, { replace: true });
            return;
        }
    }, [room, navigate]);

    const extractPlayerInfoFromServer = useCallback((state: any) => {
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
        setPlayerInfoUpdated(state => state + 1);

    }, [setPlayerInfoMap, setPlayerInfoUpdated]);

    const updatePlayerInfoFromServer = useCallback((state: any) => {
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

    const removePlayerInfoFromServer = useCallback((currentHostId: any, leftPlayerId: any, newHostId: any) => {
        setPlayerInfoMap(infoMap => {
            infoMap.delete(leftPlayerId);

            if (currentHostId !== newHostId) {
                const newHost = infoMap.get(newHostId);
                if (newHost) {
                    newHost.isHost = true;
                    newHost.isReady = true;
                }
                setHostId(newHostId);
            }
            return infoMap;
        });
        setPlayerInfoUpdated(state => state + 1);
    }, [setPlayerInfoMap, setHostId, setPlayerInfoUpdated]);

    // NOTE: process request initailize state
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

            extractPlayerInfoFromServer(state);
            setPlayerInfoUpdated(state => state + 1);
        });

        return () => { isMounted = false };

    }, [
        room, setRoomName, setRoomId, setMyId, setHostId, setMaxPlayers, setPlayerName,
        extractPlayerInfoFromServer, setPlayerInfoUpdated
    ]);

    // NOTE: process new player join room messages from server
    useEffect(() => {
        if (!room) {
            return;
        }

        let isMounted = true;

        room.onMessage('newComer', (state) => {
            if (!isMounted) return;
            updatePlayerInfoFromServer(state);
            setPlayerInfoUpdated(state => state + 1);
        });

        return () => { isMounted = false };

    }, [room, updatePlayerInfoFromServer, setPlayerInfoUpdated]);

    // NOTE: process message from server when has player left
    useEffect(() => {
        if (!room) {
            return;
        }

        let isMounted = true;

        room.onMessage('playerLeave', ({ id, newHostId }) => {
            if (!isMounted) return;
            removePlayerInfoFromServer(hostId, id, newHostId);
            setPlayerInfoUpdated(state => state + 1);
        });

        return () => { isMounted = false };

    }, [room, removePlayerInfoFromServer, setPlayerInfoUpdated, hostId]);

    // NOTE: process message from server when has player toggled ready button
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
            setPlayerInfoUpdated(state => state + 1);
        });

        return () => { isMounted = false };

    }, [room, setPlayerInfoMap, setPlayerInfoUpdated]);

    // NOTE: process message from server when have players changed their name
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
            setPlayerInfoUpdated(state => state + 1);
        });

        return () => { isMounted = false };
    }, [room, setPlayerInfoMap, setPlayerName, setPlayerInfoUpdated, myId]);

    const [gameRoom, setGameRoom] = useState<Room>();

    // NOTE: process server messages when host pressed start button (send 'requestPlay' message)
    useEffect(() => {
        if (!client || !room) return;
        let isMounted = true;

        room.onMessage('createGame', () => {
            client.create('Game')
                .then((gameRoom) => {
                    if (isMounted)
                        setGameRoom(gameRoom);

                    room.send('requestJoinGame', gameRoom.id);
                })
        });

        room.onMessage('joinGame', (gameRoomId) => {
            client.joinById(gameRoomId)
                .then((gameRoom) => {
                    if (isMounted)
                        setGameRoom(gameRoom);
                })
        });

        return () => { isMounted = false; };
    }, [client, room, setGameRoom]);

    // NOTE: move to game room when it's created
    useEffect(() => {
        if (!gameRoom || !room) return;
        if (room.id === gameRoom.id) return;

        let isMounted = true;

        room.leave()
            .then(() => {
                if (!isMounted) return;

                setRoom && setRoom(gameRoom);
                setInGameAuth && setInGameAuth(true);
                setGameMode && setGameMode(GAME_MODE.MULTIPLAYER);
                setPlayerNum && setPlayerNum(playerInfoMap.size);
                navigate(PATH.GAME, { replace: true });
            });

        return () => { isMounted = false; };
    }, [gameRoom, room, setRoom, navigate, setInGameAuth, setGameMode, setPlayerNum, playerInfoMap]);

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
                    <MemoPlayerCards
                        classname='w-4/5 max-w-[1105px] my-auto'
                        playerInfoMap={playerInfoMap}
                        updated={playerInfoUpdated} />
                    <MemoNavButtons
                        classname='w-1/2 my-auto'
                        setInfoState={setInfoState}
                        myId={myId}
                        playerInfoMap={playerInfoMap}
                        updated={playerInfoUpdated}
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
