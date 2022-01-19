import cx from 'classnames'
import { FC, useContext, useEffect } from 'react';

import GlobalContext from '../../contexts/global.context';

import PlayerCard from './playercard.component';

interface Props {
    classname?: string,
    playerInfos: Array<{ playerName: string, isReady: boolean, isHost: boolean }>,
};

const PlayerCards: FC<Props> = ({ classname, playerInfos }) => {
    const { room } = useContext(GlobalContext);

    useEffect(() => {
        if (!room) {
            return;
        }

    }, [room]);

    return (
        <div className={cx(
            'flex justify-center items-center',
            'text-yellow-custom',
            classname,
        )}
        >
            {playerInfos.map(({ playerName, isReady, isHost }, idx) => (
                <PlayerCard key={idx} classname='w-1/4' playerName={playerName} isReady={isReady} isHost={isHost} />
            ))}
        </div>
    )
};

export default PlayerCards;
