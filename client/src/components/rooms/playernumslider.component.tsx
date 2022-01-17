import cx from 'classnames'
import { FC, useCallback, useState } from 'react';
import { AnimatePresence, motion, Variants } from 'framer-motion'

import Arrow from "../../svg/arrow.svg"

interface Props {
    classname?: string,
}

const PlayerNumSlider: FC<Props> = ({ classname }) => {
    const MAX_PLAYER_NUM = 4;

    const [playerNum, setPlayerNum] = useState(MAX_PLAYER_NUM);

    const [enter, setEnter] = useState(true);

    const nextVariants: Variants = {
        hidden: {
            x: '10vw'
        },
        visible: {
            x: 0,
            transition: {
                ease: 'easeInOut',
                duration: 0.1
            }
        },
        exit: {
            x: '-10vw'
        },
    };

    const previousVariants: Variants = {
        hidden: {
            x: '-10vw'
        },
        visible: {
            x: 0,
            transition: {
                ease: 'easeInOut',
                duration: 0.1, 
            }
        },
        exit: {
            x: '10vw',
        }
    };

    const [variants, setVariants] = useState(previousVariants);

    const nextNum = () => {
        const newNum = 1 + playerNum % MAX_PLAYER_NUM;
        setVariants(nextVariants);
        setTimeout(() => setEnter(false), 50);
        setTimeout(() => setPlayerNum(newNum), 100);
    };

    const previousNum = () => {
        const newNum = 1 + (playerNum - 2 + MAX_PLAYER_NUM) % MAX_PLAYER_NUM;
        setVariants(previousVariants);
        setTimeout(() => setEnter(false), 50);
        setTimeout(() => setPlayerNum(newNum), 100);
    }

    return (
        <div className={cx(
            "flex flex-col md:flex-row justify-center items-center md:text-2xl gap-2",
            classname
        )}>
            <div className="md:w-1/4 select-none">MAX PLAYERS</div>
            <div className="flex justify-center items-center gap-6 md:gap-10 w-3/4 md:w-1/2 h-8">
                <Arrow
                    classname="-rotate-90 h-[150%] md:h-[200%] w-auto cursor-pointer active:animate-pulse"
                    onClick={() => previousNum()}
                />
                <div className={cx(
                    "relative flex items-center justify-center flex-nowrap overflow-hidden",
                    "bg-gray-400/30 h-[100%] md:h-[120%] aspect-square"
                )}>
                    <AnimatePresence exitBeforeEnter onExitComplete={() => setTimeout(() => setEnter(true), 50)}>
                        {enter &&
                            <motion.div
                                className='absolute w-full text-center select-none'
                                variants={variants}
                                initial='hidden'
                                animate='visible'
                                exit='exit'
                            >
                                {playerNum}
                            </motion.div>
                        }
                    </AnimatePresence>
                </div>
                <Arrow
                    classname="rotate-90 h-[150%] md:h-[200%] w-auto cursor-pointer"
                    onClick={() => nextNum()}
                />
            </div>
        </div>
    );
};

export default PlayerNumSlider;
