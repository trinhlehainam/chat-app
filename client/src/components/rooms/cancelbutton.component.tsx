import { FC } from 'react';
import CancelMark from '../../svg/cancelmark.svg';

import CancelButton from "../../svg/canclebutton.svg"

interface Props {
    classname?: string,
    onClick?: Function
    fillClass?: string,
};

const RoomCancelButton: FC<Props> = ({ classname, onClick, fillClass }) => {
    return (
        <div
            className={classname}
            onClick={() => onClick && onClick()}
        >
            <div className='relative flex items-center justify-center w-full h-full btn-base'>
                <CancelButton
                    classname="w-full h-auto"
                    fillClass={fillClass ? fillClass : "fill-black"}
                />
                <CancelMark classname='absolute fill-yellow-custom w-1/3 pointer-events-none' />
            </div>
        </div>
    );
};

export default RoomCancelButton;
