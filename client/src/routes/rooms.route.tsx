import cx from "classnames";
import { memo, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Colyseus from "colyseus.js";

import GlobalContext from "../contexts/global.context";
import RoomContext from "../contexts/room.context";

import RoomBorder from "../svg/room/roomborder.svg";
import RoomLine1 from "../svg/room/roomline-1.svg";
import RoomLine2 from "../svg/room/roomline-2.svg";
import RoomLine3 from "../svg/room/roomline-3.svg";

import AvailableRoom from "../components/rooms/availableroom.component";
import RoomTitle from "../components/rooms/title.component";
import NavButtons from "../components/rooms/navbuttons.component";
import CreateBox from "../components/rooms/createbox.component";
import JoinMessageBox from "../components/rooms/joinerrorbox.component";
import FindBox from "../components/rooms/findbox.component";
import RoomCancelButton from "../components/rooms/cancelbutton.component";

const MemoBorder = memo(RoomBorder);
const MemoTitle = memo(RoomTitle);
const MemoLine1 = memo(RoomLine1);
const MemoLine2 = memo(RoomLine2);
const MemoLine3 = memo(RoomLine3);
const MemoNavButtons = memo(NavButtons);
const MemoCreateBox = memo(CreateBox);
const MemoCancelButton = memo(RoomCancelButton);

const Rooms = () => {
    const { client, setClient, setRoom } = useContext(GlobalContext);

    const [avaiRooms, setAvaiRooms] = useState<Array<Colyseus.RoomAvailable>>([]);
    const [isJoinError, setJoinError] = useState(true);
    const [joinErrorMessage, setJoinErrorMessage] = useState('');
    const [isCreateState, setCreateState] = useState(false);
    const [isFindState, setFindState] = useState(false);
    const [roomId, setRoomId] = useState('');

    const navigate = useNavigate();

    // TODO: useCallback to reuse function
    const refresh = useCallback(() => {
        client && client.getAvailableRooms("Lobby")
            .then((rooms) => {
                setAvaiRooms(rooms);
            });
    }, [client, setAvaiRooms]);

    const join = useCallback((roomId: string) => {
        client && client.joinById(roomId)
            .then((room) => {
                setRoom && setRoom(room);
                navigate('/lobby', { replace: true })
            })
            .catch((e) => {
                setJoinErrorMessage(e.message);
                setJoinError(false);
            });
    }, [client, setRoom, navigate, setJoinError, setJoinErrorMessage]);

    const cancelMessage = useCallback(() => {
        setJoinError(true);
        refresh();
    }, [setJoinError, refresh]);

    const context = {
        isJoinError, setJoinError,
        joinErrorMessage, setJoinErrorMessage,
        isCreateState, setCreateState,
        isFindState, setFindState,
        roomId, setRoomId,
        refresh, join, cancelMessage,
    };

    useEffect(() => {
        const HOST = window.document.location.host.replace(/:.*/, '');
        const PORT = process.env.NODE_ENV !== 'production' ? 3030 : window.document.location.port;
        const SERVER_LOCATION = window.document.location.protocol.replace("http", "ws") + "//"  + HOST + (PORT ? ':' + PORT : '');
        // FIXME:
        console.log(SERVER_LOCATION);
        setClient && setClient(new Colyseus.Client(SERVER_LOCATION));
    }, [setClient]);

    useEffect(() => {
        if (!client) return;

        refresh();
    }, [client, setRoom, refresh]);

    const navigateBack = useCallback(() => {
        navigate('/play', { replace: true });
    }, [navigate]);

    // TODO: layout close button

    return (
        <RoomContext.Provider value={context}>
            <div
                className={cx(
                    "absolute inset-0 md:inset-6 bg-black/10 backdrop-blur-xl",
                    "flex items-center justify-center",
                    "text-yellow-custom"
                )}
            >
                {!isJoinError && <JoinMessageBox />}
                {isCreateState && <MemoCreateBox />}
                {isFindState && <FindBox />}
                <div
                    className={cx(
                        "w-full h-full p-4 max-w-[1280px] ",
                        "relative flex flex-col items-center"
                    )}
                >
                    <MemoBorder classname="w-[90%] h-full mx-auto" />
                    <div className="absolute flex flex-col items-center w-full h-full">
                        <MemoTitle
                            classname={cx(
                                "mt-16",
                                "text-yellow-custom text-3xl",
                                "md:text-5xl"
                            )}
                        />
                        <MemoLine1 classname="w-[75%] h-auto max-h-6 mt-8 mx-auto" />
                        <div className={cx(
                            "flex flex-row justify-center items-center",
                            "w-[75%] my-4 mx-auto",
                            "text-lg md:text-3xl text-center"
                        )}>
                            <div className="w-1/3 select-none">NAME</div>
                            <div className="w-1/3 select-none">PLAYERS</div>
                            <div className="w-1/3 select-none"></div>
                        </div>
                        <MemoLine2 classname="w-[75%] h-auto max-h-4 mx-auto" />
                        <div
                            className={cx(
                                "w-[75%] h-full max-h-[20%] md:max-h-[25%] lg:max-h-[30%] overflow-hidden",
                                "flex flex-col items-center mx-auto mt-4",
                            )}
                        >
                            <div className="flex flex-col h-full w-full overflow-y-auto scrollbar-hide gap-[5px]">
                                {avaiRooms &&
                                    avaiRooms.map(({ roomId, clients, maxClients, metadata }) => {
                                        return (
                                            <AvailableRoom
                                                key={roomId}
                                                roomId={roomId}
                                                roomName={metadata.roomName}
                                                players={`${clients}/${maxClients}`}
                                            />
                                        );
                                    })}
                            </div>
                        </div>
                        <MemoLine3 classname="w-[75%] h-auto max-h-12 mx-auto" />
                        <MemoNavButtons
                            classname={cx(
                                "w-3/4 mx-auto mt-4",
                            )}
                        />
                        <MemoCancelButton
                            classname={cx(
                                "w-[64px] h-auto mt-4",
                                "lg:hidden"
                            )}
                            onClick={navigateBack}
                        />
                    </div>
                </div>
            </div>
        </RoomContext.Provider>
    );
};

export default Rooms;
