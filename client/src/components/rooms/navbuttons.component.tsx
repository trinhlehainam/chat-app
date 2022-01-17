import { FC, useContext } from 'react'
import cx from 'classnames'

import RoomButton from '../../svg/room/roombutton.svg';
import RoomContext from '../../contexts/room.context';

interface Props {
    classname: string
}

const NavButtons: FC<Props> = ({ classname }) => {

    const {
        refresh, setCreateState, setFindState
    } = useContext(RoomContext);

    return (
        <div
            className={cx(
                "relative flex justify-center items-center -space-x-1 md:gap-x-8",
                classname
            )}
        >
            <div
                className="relative flex justify-center items-center cursor-pointer"
                onClick={() => refresh && refresh()}
            >
                <RoomButton classname="h-auto w-2/3 min-w-[80px] btn-base" />
                <div className="absolute text-yellow-custom text-md sm:text-2xl pointer-events-none">
                    REFRESH
                </div>
            </div>
            <div
                className="relative flex justify-center items-center cursor-pointer"
                onClick={() => setCreateState && setCreateState(true)}
            >
                <RoomButton classname="h-auto w-2/3 min-w-[80px] btn-base" />
                <div className="absolute text-yellow-custom text-md sm:text-2xl pointer-events-none">
                    CREATE
                </div>
            </div>
            <div
                className="relative flex justify-center items-center cursor-pointer"
                onClick={() => setFindState && setFindState(true)}
            >
                <RoomButton classname="h-auto w-2/3 min-w-[80px] btn-base" />
                <div className="absolute text-yellow-custom text-md sm:text-2xl pointer-events-none">
                    FIND
                </div>
            </div>
        </div>
    )
};

export default NavButtons;
