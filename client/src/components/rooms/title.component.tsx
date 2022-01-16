import { FC } from "react";

import RoomTitleBorderBottom from "../../svg/room/roomtitleborder-bottom.svg";
import RoomTitleBorderTop from "../../svg/room/roomtitleborder-top.svg";

interface Props {
    classname: string
};

const RoomTitle: FC<Props> = ({ classname }) => {
    return (
        <div
            className={classname}
        >
            <RoomTitleBorderTop classname="w-[80%] sm:w-fit h-auto" />
            <div className="my-2 select-none">ROOMS</div>
            <RoomTitleBorderBottom classname="w-[80%] sm:w-fit h-auto" />
        </div>
    );
};

export default RoomTitle; 
