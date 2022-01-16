import cx from "classnames";
import { useContext, useEffect, useState } from "react";
import * as Colyseus from "colyseus.js";

import RoomBorder from "../svg/room/roomborder.svg";
import RoomCancelButton from "../svg/room/roomcanclebutton.svg";
import RoomLine1 from "../svg/room/roomline-1.svg";
import RoomLine2 from "../svg/room/roomline-2.svg";
import RoomLine3 from "../svg/room/roomline-3.svg";
import AvailableRoom from "../components/rooms/availableroom.component";
import GlobalContext from "../contexts/global.context";
import RoomTitle from "../components/rooms/title.component";
import NavButtons from "../components/rooms/navbuttons.component";
import { useNavigate } from "react-router-dom";
import RoomContext from "../contexts/room.context";
import RoomButton from "../svg/room/roombutton.svg";
import CreateBox from "../components/rooms/createbox.component";
import InvalidMessage from "../components/rooms/invalidmessage.component";

enum RoomType {
    LOBBY = 'Lobby',
};

const Rooms = () => {
    const { client, setClient, setRoom } = useContext(GlobalContext);
    const [avaiRooms, setAvaiRooms] = useState<Array<Colyseus.RoomAvailable>>([]);
    const [isValidRoom, setValidRoom] = useState(true);
    const [isCreating, setCreate] = useState(false);
    const [roomName, setRoomName] = useState('');
    const [password, setPassword] = useState('');

    const navigate = useNavigate();

    const refresh = () => {
        client && client.getAvailableRooms("Lobby")
            .then((rooms) => {
                setAvaiRooms(rooms);
            });
    };

    const create = (roomName: string, password: string) => {
        client && client.create(RoomType.LOBBY, {name: roomName, password: password})
            .then((room) => {
                setRoom && setRoom(room);
            });
        navigate('/lobby');
    };

    const join = (name: string) => {
        client && client.joinById(name)
            .then((room) => {
                setRoom && setRoom(room);
                navigate('/lobby')
            })
            .catch((error) => {
                console.log(error);
                setValidRoom(false);
            });
    };

    const cancelMessage = () => {
        setValidRoom(true);
        refresh();
    };

    const context = {
        isValidRoom, setValidRoom,
        isCreating, setCreate,
        roomName, setRoomName,
        password, setPassword,
        refresh, create, join, cancelMessage
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
                {!isValidRoom && <InvalidMessage /> }
                {isCreating && <CreateBox /> }
                <div
                    className={cx(
                        "w-full h-full p-4 max-w-[1280px] ",
                        "relative flex flex-col items-center"
                    )}
                >
                    <RoomBorder classname="w-[90%] h-full mx-auto" fillclass=""/>
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
                            <div className="w-1/3">NAME</div>
                            <div className="w-1/3">PLAYERS</div>
                            <div className="w-1/3"></div>
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
                                                name={metadata.name ? metadata.name : roomId}
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
