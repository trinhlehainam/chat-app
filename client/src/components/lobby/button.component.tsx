import { FC, memo, MouseEventHandler } from "react";
import cx from 'classnames'

import Button from "../../svg/lobby/button.svg";

interface Props {
    classname?: string,
    childClassName?: string,
    fillClass?: string,
    onClick?: MouseEventHandler<HTMLDivElement>
    text: string,
};

const MemoButton = memo(Button);

const LobbyButton: FC<Props> = ({ classname, childClassName, fillClass, onClick, text }) => {
    return (
        <div
            className={cx(
                'relative flex justify-center items-center cursor-pointer select-none',
                classname
            )}
            onClick={onClick}
        >
            <MemoButton
                classname={cx(
                    'h-auto', childClassName
                )}
                fillClass={fillClass}
            />
            <div
                className='absolute text-yellow-custom text-4xl pointer-events-none peer-hover:scale-[1.2]'>
                {text}
            </div>
        </div>
    )
};

export default LobbyButton;
