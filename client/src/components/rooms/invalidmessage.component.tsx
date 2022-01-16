import cx from 'classnames'
import { useContext } from 'react';
import RoomContext from '../../contexts/room.context';
import RoomBorder from '../../svg/room/roomborder.svg'
import RoomCancelButton from '../../svg/room/roomcanclebutton.svg'

const InvalidMessage = () => {
    const { cancelMessage } = useContext(RoomContext)
    return (
        <div
            className={cx(
                "absolute w-[60%] h-[50%] max-w-[740px] bg-black/80 backdrop-blur-xl",
                "flex flex-col items-center justify-center",
                "z-10"
            )}
        >
            <RoomBorder classname="absolute w-full h-full mx-auto" fillclass="" />
            <div className="sm:text-5xl select-none">ROOM IS INVALID</div>
            <RoomCancelButton
                classname="w-[20%] sm:w-[15%] h-auto z-20 mb-16 sm:mt-10 cursor-pointer"
                fillClass=""
                onClick={() => cancelMessage && cancelMessage()}
            />
        </div>
    );
};

export default InvalidMessage;
