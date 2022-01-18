import cx from 'classnames'
import { FC, useContext, useEffect, useState } from 'react';

import GlobalContext from '../../contexts/global.context';

import BorderBottom from '../../svg/lobby/border-bottom.svg';
import BorderTop from '../../svg/lobby/border-top.svg';
import IconBorder from '../../svg/lobby/iconborder.svg';
import PlayerBorder from '../../svg/lobby/playerborder.svg';

interface Props {
    classname?: string,
};

const PlayerCards: FC<Props> = ({ classname }) => {
    const { room } = useContext(GlobalContext);
    const [playerNum, setPlayerNum] = useState(1);

    useEffect(() => {
        if (!room) {
            return;
        }

        setPlayerNum(room.state.clientNum);
    }, [room]);

    return (
        <div className={cx(
            'flex justify-center items-center',
            'text-yellow-custom',
            classname,
        )}
        >
            <div className='relative flex flex-col items-center w-1/4'>
                <PlayerBorder classname='w-3/4 h-auto m-auto' />
                <div className='absolute w-full flex flex-col items-center justify-center gap-8 top-[10%]'>
                    <IconBorder classname='w-2/5 h-auto top-[10%]' />
                    <div className='w-full h-full flex fex-col item-cemter justify-center'>
                        <div className={cx(
                            'top-[40%]',
                            'flex flex-col items-center',
                            'text-xl',
                            'md:text-2xl'
                        )}
                        >
                            <BorderTop classname='w-[45%] h-auto' />
                            <div className="my-2">
                                MYNAME
                            </div>
                            <BorderBottom classname='w-[45%] h-auto' />
                        </div>
                    </div>
                    <div className='top-[62%] text-center text-4xl'>
                        READY
                    </div>
                </div>
            </div>
        </div>
    )
};

export default PlayerCards;
