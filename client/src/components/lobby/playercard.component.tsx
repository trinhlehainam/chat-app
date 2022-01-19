import cx from 'classnames'
import { FC, memo } from 'react'

import BorderBottom from "../../svg/lobby/border-bottom.svg"
import BorderTop from "../../svg/lobby/border-top.svg"
import IconBorder from "../../svg/lobby/iconborder.svg"
import PlayerBorder from "../../svg/lobby/playerborder.svg"

interface Props {
    classname?: string,
    playerName: string,
    isReady: boolean,
    isHost: boolean
}

const MemoPlayerBorder = memo(PlayerBorder);
const MemoIconBorder = memo(IconBorder);
const MemoBorderTop = memo(BorderTop);
const MemoBorderBottom = memo(BorderBottom);

const PlayerCard: FC<Props> = ({ classname, playerName, isReady, isHost }) => {
    return (
        <div className={cx(
            'relative flex flex-col items-center',
            classname
        )}>
            <MemoPlayerBorder classname='w-3/4 h-auto m-auto' />
            <div className='absolute w-full flex flex-col items-center justify-center gap-8 top-[10%]'>
                <MemoIconBorder classname='w-2/5 h-auto top-[10%]' />
                <div className='w-full h-full flex fex-col item-cemter justify-center'>
                    <div className={cx(
                        'top-[40%]',
                        'flex flex-col items-center',
                        'text-xl',
                        'md:text-2xl'
                    )}
                    >
                        <MemoBorderTop classname='w-[45%] h-auto' />
                        <div className="my-2">
                            {playerName}
                        </div>
                        <MemoBorderBottom classname='w-[45%] h-auto' />
                    </div>
                </div>
                <div className={cx(
                    'top-[62%] text-center text-4xl',
                    { 'text-green-500 text-glow-green': isReady && !isHost },
                    { 'text-red-500': !isReady && !isHost },
                    { 'text-glow-yellow': isHost }
                )}>
                    {isHost ? 'HOST' : (isReady ? 'READY' : 'MADA')}
                </div>
            </div>
        </div>
    );
};

export default PlayerCard;
