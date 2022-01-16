import cx from 'classnames'
import { useContext } from 'react';
import RoomContext from '../../contexts/room.context';
import RoomBorder from '../../svg/room/roomborder.svg'
import RoomCancelButton from '../../svg/room/roomcanclebutton.svg'

const JoinMessageBox = () => {
    const { cancelMessage, joinErrorMessage } = useContext(RoomContext)
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
                    "absolute w-[60%] h-[20%] sm:h-[50%] max-w-[740px]",
                    "flex flex-col items-center justify-center gap-6 sm:gap-8",
                    "z-10"
                )}
            >
                <RoomBorder
                    classname="absolute w-full h-full mx-auto"
                    fillclass="fill-black/80 backdrop-blur-xl"
                />
                <div className="sm:text-6xl z-20 text-center w-3/4 sm:w-full">{joinErrorMessage}</div>
                <RoomCancelButton
                    classname="absolute right-0 top-0 w-[20%] sm:w-[15%] h-auto translate-x-1/4 -translate-y-1/4 z-30"
                    fillClass="fill-black"
                    onClick={() => cancelMessage && cancelMessage()}
                />
            </div>
        </div>
    );
};

export default JoinMessageBox;
