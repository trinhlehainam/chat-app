import cx from 'classnames'
import { memo, useContext } from 'react';

import RoomContext from '../../contexts/room.context';

import RoomBorder from '../../svg/room/roomborder.svg'
import RoomCancelButton from './cancelbutton.component';

const MemoBorder = memo(RoomBorder);
const MemoCancelButton = memo(RoomCancelButton);

const JoinErrorBox = () => {
    const { closeJoinErrorBox, joinErrorMessage } = useContext(RoomContext)
    return (
        <div
            className={cx(
                "absolute w-full h-full",
                "flex items-center justify-center",
                "z-30 text-red-500"
            )}
        >
            <div
                className={cx(
                    "absolute w-[60%] h-[20%] sm:h-[50%] max-w-[740px]",
                    "flex flex-col items-center justify-center gap-6 sm:gap-8",
                    "z-10"
                )}
            >
                <MemoBorder
                    classname="absolute w-full h-full mx-auto"
                    fillclass="fill-black/80 backdrop-blur-xl"
                />
                <div className="sm:text-6xl z-20 text-center w-3/4 sm:w-full">{joinErrorMessage}</div>
                <MemoCancelButton
                    classname="absolute right-0 top-0 w-[20%] sm:w-[15%] h-auto translate-x-1/4 -translate-y-1/4 z-30 cursor-pointer"
                    onClick={closeJoinErrorBox}
                />
            </div>
        </div>
    );
};

export default JoinErrorBox;
