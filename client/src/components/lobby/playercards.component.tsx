import cx from 'classnames'
import { FC, useContext, useEffect } from 'react';

import GlobalContext from '../../contexts/global.context';

import PlayerCard from './playercard.component';

interface Props {
    classname?: string,
    playerInfos: Array<{ playerName: string, isReady: boolean }>,
};

const PlayerCards: FC<Props> = ({ classname, playerInfos }) => {
    const { room } = useContext(GlobalContext);

    // WARN:
    console.log('card');

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
            {playerInfos.map(({ playerName, isReady }, idx) => (
                <PlayerCard key={idx} classname='w-1/4' playerName={playerName} isReady={isReady} />
            ))}
        </div>
    )
};

export default PlayerCards;
