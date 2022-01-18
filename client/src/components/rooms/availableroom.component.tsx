import { FC, useContext } from "react";
import RoomContext from "../../contexts/room.context";
import RoomButton from "../../svg/room/roombutton.svg";

interface Props {
    roomId: string,
    roomName?: string,
    players: string,
}

const AvailableRoom: FC<Props> = ({ roomId, roomName, players }) => {
    const { join } = useContext(RoomContext);

    return (
        <div className="flex flex-row w-full text-xs md:text-xl justify-center items-center text-center">
            <div className="w-1/3 break-words">{roomName ? roomName : roomId}</div>
            <div className="w-1/3 select-none">{players}</div>
            <div className="w-1/3 relative flex justify-center items-center my-auto">
                <RoomButton
                    classname="w-1/3 h-auto m-auto btn-base min-w-[60px] cursor-pointer"
                    onClick={() => join && join(roomId)}
                />
                <div className="absolute pointer-events-none">JOIN</div>
            </div>
        </div>
    );
};

export default AvailableRoom;
