import cx from 'classnames'
import { Dispatch, FC, SetStateAction, useEffect } from 'react';

import Arrow from "../../svg/arrow.svg"

interface Props {
    classname?: string,
    playerNum: number,
    setPlayerNum: Dispatch<SetStateAction<number>>,
}

const PlayerNumSlider: FC<Props> = ({ classname, playerNum, setPlayerNum }) => {
    const MAX_PLAYER_NUM = 4;

    useEffect(() => {
        setPlayerNum(MAX_PLAYER_NUM);
    }, [setPlayerNum]);

    const nextNum = () => {
        const newNum = 1 + playerNum % MAX_PLAYER_NUM;
        setPlayerNum(newNum);
    };

    const previousNum = () => {
        const newNum = 1 + (playerNum - 2 + MAX_PLAYER_NUM) % MAX_PLAYER_NUM;
        setPlayerNum(newNum);
    }

    const isLeftEnable = playerNum > 1;
    const isRightEnable = playerNum < MAX_PLAYER_NUM;

    return (
        <div className={cx(
            "flex flex-col md:flex-row justify-center items-center md:text-xl lg:text-2xl gap-2",
            classname
        )}>
            <div className="md:w-1/4 select-none">MAX PLAYERS</div>
            <div className="flex justify-center items-center gap-6 md:gap-10 w-3/4 md:w-1/2 h-8">
                <Arrow
                    classname={cx(
                        "-rotate-90 h-[150%] md:h-[200%] w-auto cursor-pointer",
                        { "pointer-events-none cursor-none opacity-40": !isLeftEnable },
                    )}
                    onClick={() => previousNum()}
                />
                <div className={cx(
                    "relative flex items-center overflow-hidden",
                    "bg-gray-400/30 h-[100%] md:h-[120%] aspect-square"
                )}>
                    <div
                        className={cx(
                            'absolute flex justify-center items-center select-none',
                            'w-[400%]',
                            'transition-all ease-in-out duration-100',
                            {'-translate-x-1/4': playerNum === 2},
                            {'-translate-x-2/4': playerNum === 3},
                            {'-translate-x-3/4': playerNum === 4},
                        )}
                    >
                        <div className='w-1/4 text-center'>1</div>
                        <div className='w-1/4 text-center'>2</div>
                        <div className='w-1/4 text-center'>3</div>
                        <div className='w-1/4 text-center'>4</div>
                    </div>
                </div>
                <Arrow
                    classname={cx(
                        "rotate-90 h-[150%] md:h-[200%] w-auto cursor-pointer",
                        { "pointer-events-none cursor-none opacity-40": !isRightEnable },
                    )}
                    onClick={() => nextNum()}
                />
            </div>
        </div>
    );
};

export default PlayerNumSlider;
