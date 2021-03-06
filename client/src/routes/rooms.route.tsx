import cx from "classnames";
import { memo, Suspense, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Client } from "colyseus.js";

import fetchAvailableRooms, { AvailableRoomsResource_t } from "../utils/fetchAvailableRooms";

import GlobalContext from "../contexts/global.context";
import RoomContext from "../contexts/room.context";

import RoomBorder from "../svg/room/roomborder.svg";
import RoomLine1 from "../svg/room/roomline-1.svg";
import RoomLine2 from "../svg/room/roomline-2.svg";
import RoomLine3 from "../svg/room/roomline-3.svg";

import RoomTitle from "../components/rooms/title.component";
import NavButtons from "../components/rooms/navbuttons.component";
import CreateBox from "../components/rooms/createbox.component";
import JoinErrorBox from "../components/rooms/joinerrorbox.component";
import FindBox from "../components/rooms/findbox.component";
import RoomCancelButton from "../components/rooms/cancelbutton.component";
import AvailableRooms from "../components/rooms/availablerooms.component";
import { PATH } from "../common/enum/path";

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

    // NOTE: available rooms fetch resource
    const [avaiRoomsResource, setAvaiRoomsResource] = useState<AvailableRoomsResource_t>();
    const [isJoinError, setJoinError] = useState(true);
    const [joinErrorMessage, setJoinErrorMessage] = useState('');
    const [isCreateState, setCreateState] = useState(false);
    const [isFindState, setFindState] = useState(false);
    const [roomId, setRoomId] = useState('');

    const navigate = useNavigate();

    const refresh = useCallback(() => {
        client && setAvaiRoomsResource(fetchAvailableRooms(client));
    }, [client, setAvaiRoomsResource]);

    const join = useCallback((roomId: string) => {
        client && client.joinById(roomId)
            .then((room) => {
                setRoom && setRoom(room);
                navigate(PATH.LOBBY, { replace: true })
            })
            .catch((e) => {
                setJoinErrorMessage(e.message);
                setJoinError(false);
            });
    }, [client, setRoom, navigate, setJoinError, setJoinErrorMessage]);

    const closeJoinErrorBox = useCallback(() => {
        setJoinError(true);
        refresh();
    }, [setJoinError, refresh]);

    const context = {
        isJoinError, setJoinError,
        joinErrorMessage, setJoinErrorMessage,
        isCreateState, setCreateState,
        isFindState, setFindState,
        roomId, setRoomId,
        refresh, join, closeJoinErrorBox,
    };

    useEffect(() => {
        const HOST = window.document.location.host.replace(/:.*/, '');
        const PORT = process.env.NODE_ENV !== 'production' ? 2567 : window.document.location.port;
        const SERVER_LOCATION = window.document.location.protocol.replace("http", "ws") + "//" + HOST + (PORT ? ':' + PORT : '');

        setClient && setClient(new Client(SERVER_LOCATION));
    }, [setClient]);

    useEffect(() => {
        if (!client) return;

        refresh();
    }, [client, setRoom, refresh]);

    const navigateBack = useCallback(() => {
        navigate(PATH.PLAY_MEMU, { replace: true });
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
                {!isJoinError && <JoinErrorBox />}
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
                            <Suspense fallback={<div>Loading</div>} >
                                {avaiRoomsResource && <AvailableRooms resource={avaiRoomsResource} />}
                            </Suspense>
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
