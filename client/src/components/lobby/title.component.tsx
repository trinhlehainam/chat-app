import { FC } from "react";
import cx from 'classnames'

import TitleBorderBottom from "../../svg/room/roomtitleborder-bottom.svg";
import TitleBorderTop from "../../svg/room/roomtitleborder-top.svg";

interface Props {
    classname?: string,
    roomName?: string
};

const LobbyTitle: FC<Props> = ({ classname, roomName }) => {
    return (
        <div
            className={cx(
                "relative flex flex-col items-center justify-center",
                classname
            )}
        >
            <TitleBorderTop classname="w-[80%] sm:w-fit h-auto" />
            <div className="my-4">{roomName? roomName: '...'}</div>
            <TitleBorderBottom classname="w-[80%] sm:w-fit h-auto" />
        </div>
    );
};

export default LobbyTitle; 
