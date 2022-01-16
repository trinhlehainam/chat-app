import cx from "classnames";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Colyseus from "colyseus.js";

import GlobalContext from "../contexts/global.context";
import RoomContext from "../contexts/room.context";

import RoomBorder from "../svg/room/roomborder.svg";
import RoomCancelButton from "../svg/room/roomcanclebutton.svg";
import RoomLine1 from "../svg/room/roomline-1.svg";
import RoomLine2 from "../svg/room/roomline-2.svg";
import RoomLine3 from "../svg/room/roomline-3.svg";

import AvailableRoom from "../components/rooms/availableroom.component";
import RoomTitle from "../components/rooms/title.component";
import NavButtons from "../components/rooms/navbuttons.component";
import CreateBox from "../components/rooms/createbox.component";
import InvalidMessage from "../components/rooms/invalidmessage.component";
import FindBox from "../components/rooms/findbox.component";

enum RoomType {
    LOBBY = 'Lobby',
};

const Rooms = () => {
    const { client, setClient, setRoom } = useContext(GlobalContext);
    const [avaiRooms, setAvaiRooms] = useState<Array<Colyseus.RoomAvailable>>([]);
    const [isJoinError, setJoinError] = useState(true);
    const [isCreateState, setCreateState] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [password, setPassword] = useState('');
    const [isFindState, setFindState] = useState(false);
    const [roomId, setRoomId] = useState('');

    const navigate = useNavigate();

    const refresh = () => {
        client && client.getAvailableRooms("Lobby")
            .then((rooms) => {
                setAvaiRooms(rooms);
            });
    };

    const create = (roomName: string, password: string) => {
        client && client.create(RoomType.LOBBY, { name: roomName, password: password })
            .then((room) => {
                console.log(room.id);
                setRoom && setRoom(room);
            });
        navigate('/lobby');
    };

    const join = (roomId: string) => {
        client && client.joinById(roomId)
            .then((room) => {
                setRoom && setRoom(room);
                navigate('/lobby')
            })
            .catch((e) => {
                console.log(e.message);
                setJoinError(false);
            });
    };

    const joinWithFind = (roomId: string, password: string) => {
        client && client.joinById(roomId, {password: password})
            .then((room) => {
                setRoom && setRoom(room);
                navigate('/lobby')
            })
            .catch((e) => {
                console.log(e.message);
                setJoinError(false);
            });
    };

    const cancelMessage = () => {
        setJoinError(true);
        refresh();
    };

    const context = {
        isJoinError, setJoinError,
        isCreateState, setCreateState,
        roomName, setRoomName,
        password, setPassword,
        isFindState, setFindState,
        roomId, setRoomId,
        refresh, create, join, cancelMessage,
        joinWithFind
    };

    useEffect(() => {
        // TODO: change SERVER_ENPOINT to proper domain on deployment
        const SERVER_ENDPOINT = "ws://localhost:3030";
        setClient && setClient(new Colyseus.Client(SERVER_ENDPOINT));
    }, [setClient]);

    useEffect(() => {
        if (!client) return;

        refresh();
    }, [client, setRoom]);

    // TODO: layout close button

    return (
        <RoomContext.Provider value={context}>
            <div
                className={cx(
                    "absolute inset-0 sm:inset-6 bg-black/10 backdrop-blur-xl",
                    "flex items-center justify-center",
                    "text-yellow-custom"
                )}
            >
                {!isJoinError && <InvalidMessage />}
                {isCreateState && <CreateBox />}
                {isFindState && <FindBox />}
                <div
                    className={cx(
                        "w-full h-full p-4 max-w-[1280px] ",
                        "relative flex flex-col items-center"
                    )}
                >
                    <RoomBorder classname="w-[90%] h-full mx-auto" fillclass="" />
                    <div className="absolute flex flex-col items-center w-full h-full">
                        <RoomTitle
                            classname={cx(
                                "flex flex-col items-center",
                                "mt-16",
                                "text-yellow-custom text-3xl",
                                "md:text-5xl"
                            )}
                        />
                        <RoomLine1 classname="w-[75%] h-auto max-h-6 mt-8 mx-auto" />
                        <div className={cx(
                            "flex flex-row justify-center items-center",
                            "w-[75%] my-4 mx-auto",
                            "text-lg sm:text-3xl text-center"
                        )}>
                            <div className="w-1/3 select-none">NAME</div>
                            <div className="w-1/3 select-none">PLAYERS</div>
                            <div className="w-1/3 select-none"></div>
                        </div>
                        <RoomLine2 classname="w-[75%] h-auto max-h-4 mx-auto" />
                        <div
                            className={cx(
                                "w-[75%] h-full max-h-[30.0%] overflow-hidden",
                                "flex flex-col items-center mx-auto mt-4",
                            )}
                        >
                            <div className="flex flex-col h-full w-full overflow-y-auto scrollbar-hide gap-[5px]">
                                {avaiRooms &&
                                    avaiRooms.map(({ roomId, clients, maxClients, metadata }, idx) => {
                                        return (
                                            <AvailableRoom
                                                key={`${roomId}-${idx}`}
                                                roomId={roomId}
                                                name={metadata.name}
                                                players={`${clients}/${maxClients}`}
                                            />
                                        );
                                    })}
                            </div>
                        </div>
                        <RoomLine3 classname="w-[75%] h-auto max-h-12 mx-auto mb-4" />
                        <NavButtons
                            classname={cx(
                                "flex justify-center items-center -space-x-1 sm:gap-x-8",
                                "w-3/4 mx-auto mb-16",
                            )}
                        />
                        <RoomCancelButton
                            classname={cx(
                                "w-[64px] h-auto sm:hidden"
                            )}
                            fillClass=""
                        />
                    </div>
                </div>
            </div>
        </RoomContext.Provider>
    );
};

export default Rooms;
