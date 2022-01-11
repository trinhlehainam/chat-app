import { FC } from "react";
import RoomButton from "../svg/room/roombutton.svg";

interface Props {
    name: string,
    players: string
};

const AvailableRoom: FC<Props> = ({name, players}) => {
    return (
        <div className='flex flex-row w-full text-xs md:text-xl justify-center items-center text-center'>
            <div className='w-1/3 break-words'>{name}</div>
            <div className='w-1/3'>{players}</div>
            <div className='w-1/3 relative flex justify-center items-center my-auto'>
                <RoomButton classname='w-1/3 h-auto m-auto btn-base min-w-[60px]' />
                <div className='absolute pointer-events-none'>JOIN</div>
            </div>
        </div>
    );
};

export default AvailableRoom;
