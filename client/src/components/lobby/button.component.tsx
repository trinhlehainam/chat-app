import { FC, memo, MouseEventHandler } from "react";
import cx from 'classnames'

import Button from "../../svg/lobby/button.svg";

interface Props {
    classname?: string,
    onClick?: MouseEventHandler<HTMLDivElement>
    text: string,
};

const MemoButton = memo(Button);

const LobbyButton: FC<Props> = ({ classname, onClick, text }) => {
    return (

        <div
            className={cx(
                'relative flex justify-center items-center cursor-pointer',
                classname
            )}
            onClick={onClick}
        >
            <MemoButton classname='h-auto btn-base peer' />
            <div
                className='absolute text-yellow-custom text-4xl pointer-events-none peer-hover:scale-[1.2]'>
                {text}
            </div>
        </div>
    )
};

export default LobbyButton;
