import cx from "classnames";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Colyseus from "colyseus.js";

import RoomBorder from "../svg/room/roomborder.svg";
import RoomButton from "../svg/room/roombutton.svg";
import RoomCancelButton from "../svg/room/roomcanclebutton.svg";
import RoomLine1 from "../svg/room/roomline-1.svg";
import RoomLine2 from "../svg/room/roomline-2.svg";
import RoomLine3 from "../svg/room/roomline-3.svg";
import RoomTitleBorderBottom from "../svg/room/roomtitleborder-bottom.svg";
import RoomTitleBorderTop from "../svg/room/roomtitleborder-top.svg";
import AvailableRoom from "../components/availableroom.component";
import RoomContext from "../contexts/room.context";

const Rooms = () => {
    const { client, setClient, room, setRoom } = useContext(RoomContext);

    const [avaiRooms, setAvaiRooms] = useState<Array<Colyseus.RoomAvailable>>([]);

    const navigate = useNavigate();

    useEffect(() => {
        // TODO: change SERVER_ENPOINT to proper domain on deployment
        const SERVER_ENDPOINT = "ws://localhost:3030";
        setClient && setClient(new Colyseus.Client(SERVER_ENDPOINT));
    }, [setClient]);

    useEffect(() => {
        if (!client) return;

        client.getAvailableRooms("MyRoom").then((rooms) => {
            setAvaiRooms(rooms);
        });
    }, [client, setRoom]);

    useEffect(() => {
        if (!room) return;

        return () => {
            room.leave();
        };
    }, [room]);

    // TODO: layout close button

    return (
        <div
            className={cx(
                "absolute inset-0 sm:inset-6 bg-black/10 backdrop-blur-xl",
                "flex items-center justify-center"
            )}
        >
            <div
                className={cx(
                    "w-full h-full p-4",
                    "relative flex items-center justify-center"
                )}
            >
                <RoomBorder classname="w-[90%] h-full max-w-[1280px]" />
                <div
                    className={cx(
                        "absolute top-[7%]",
                        "flex flex-col items-center",
                        "text-yellow-custom text-3xl",
                        "md:text-5xl"
                    )}
                >
                    <RoomTitleBorderTop classname="w-[80%] sm:w-fit h-auto" />
                    <div className="my-2">ROOMS</div>
                    <RoomTitleBorderBottom classname="w-[80%] sm:w-fit h-auto" />
                </div>
                <RoomCancelButton
                    classname={cx(
                        "absolute top-[82%] left-[50%] transform -translate-x-1/2 sm:top-0 sm:right-0 w-[64px] h-auto sm:hidden"
                    )}
                    path="/play"
                />
                <RoomLine1 classname="w-[75%] max-w-[1107px] h-auto max-h-6 absolute top-[32%] sm:top-[30%]" />
                <RoomLine2 classname="w-[75%] max-w-[1107px] h-auto max-h-4 absolute top-[40%]" />
                <RoomLine3 classname="w-[75%] max-w-[1107px] h-auto max-h-12 absolute top-[70%]" />
                <div
                    className={cx(
                        "absolute top-[34.3%] w-[75%] max-w-[1107px] max-h-[35.2%] overflow-hidden",
                        "flex flex-col items-center",
                        "text-yellow-custom"
                    )}
                >
                    <div className="flex flex-row w-full text-lg sm:text-3xl justify-center items-center mb-8 sm:mb-12 text-center ">
                        <div className="w-1/3">NAME</div>
                        <div className="w-1/3">PLAYERS</div>
                        <div className="w-1/3"></div>
                    </div>
                    <div className="flex flex-col h-full w-full overflow-y-auto scrollbar-hide gap-[5px]">
                        {avaiRooms &&
                            avaiRooms.map(({ roomId, clients, maxClients }, idx) => {
                                return (
                                    <AvailableRoom
                                        key={`${roomId}-${clients}/${maxClients}`}
                                        name={roomId}
                                        players={`${clients}/${maxClients}`}
                                    />
                                );
                            })}
                    </div>
                    <div></div>
                </div>
                <div
                    className={cx(
                        "absolute top-[75%] sm:top-[79%] w-3/4",
                        "flex justify-center items-center -space-x-1 sm:gap-x-8"
                    )}
                >
                    <div
                        className="relative flex justify-center items-center cursor-pointer"
                        onClick={() => {
                            client &&
                                client.getAvailableRooms("MyRoom").then((rooms) => {
                                    setAvaiRooms(rooms);
                                });
                        }}
                    >
                        <RoomButton classname="h-auto w-2/3 min-w-[80px] btn-base" />
                        <div className="absolute text-yellow-custom text-md sm:text-2xl pointer-events-none">
                            REFRESH
                        </div>
                    </div>
                    <div
                        className="relative flex justify-center items-center cursor-pointer"
                        onClick={() => {
                            client && client.create('MyRoom')
                                .then((room) => {
                                    setRoom && setRoom(room);
                                });
                            navigate('/lobby');
                        }}
                    >
                        <RoomButton classname="h-auto w-2/3 min-w-[80px] btn-base" />
                        <div className="absolute text-yellow-custom text-md sm:text-2xl pointer-events-none">
                            CREATE
                        </div>
                    </div>
                    <div className="relative flex justify-center items-center cursor-pointer">
                        <RoomButton classname="h-auto w-2/3 min-w-[80px] btn-base" />
                        <div className="absolute text-yellow-custom text-md sm:text-2xl pointer-events-none">
                            FIND
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Rooms;
