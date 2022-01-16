import { useContext } from "react"
import cx from 'classnames'

import RoomContext from "../../contexts/room.context"
import RoomBorder from "../../svg/room/roomborder.svg";
import RoomCancelButton from "../../svg/room/roomcanclebutton.svg";
import RoomButton from "../../svg/room/roombutton.svg";

const FindBox = () => {
    const {
        roomId, setRoomId,
        password, setPassword,
        setFindState, joinWithFind
    } = useContext(RoomContext);

    return (
        <div
            className={cx(
                "absolute w-full h-full",
                "flex items-center justify-center",
                "z-10"
            )}
        >
            <div
                className={cx(
                    "absolute w-[60%] h-[50%] max-w-[740px]",
                    "flex flex-col items-center justify-center gap-6 sm:gap-8",
                    "z-10"
                )}
            >
                <RoomBorder
                    classname="absolute w-full h-full mx-auto"
                    fillclass="fill-black/80 backdrop-blur-xl"
                />
                <RoomCancelButton
                    classname="absolute right-0 top-0 w-[30%] sm:w-[15%] h-auto translate-x-1/4 -translate-y-1/4 z-30"
                    fillClass="fill-black"
                    onClick={() => setFindState && setFindState(false)}
                />
                <div className="flex flex-col sm:flex-row justify-center items-center z-20 w-full sm:text-2xl gap-2">
                    <div className="sm:w-1/4">ROOM ID</div>
                    <input type='text' value={roomId} onChange={(e) => setRoomId && setRoomId(e.target.value)}
                        className="bg-gray-400/30 px-2 w-3/4 sm:w-1/2 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col sm:flex-row justify-center items-center z-20 w-full sm:text-2xl gap-2">
                    <div className="sm:w-1/4">PASSWORD</div>
                    <input type='password' value={password} onChange={(e) => setPassword && setPassword(e.target.value)}
                        className="bg-gray-400/30 px-2 w-3/4 sm:w-1/2 focus:outline-none"
                    />
                </div>
                <div className="relative flex items-center justify-center w-full sm:mt-6">
                    <RoomButton
                        classname="w-1/2 sm:w-[30%] h-auto btn-base cursor-pointer"
                        onClick={() => joinWithFind && joinWithFind(roomId, password)}
                    />
                    <div className="absolute text-xl sm:text-3xl pointer-events-none select-none">JOIN</div>
                </div>
            </div>
        </div>
    )
};

export default FindBox;
