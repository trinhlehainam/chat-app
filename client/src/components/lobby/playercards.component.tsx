import cx from 'classnames'
import { FC } from 'react';

import PlayerCard from './playercard.component';

export interface PlayerInfo {
    playerName: string,
    isReady: boolean,
    isHost: boolean,
};

export type PlayerInfoMap = Map<string, PlayerInfo>;

interface Props {
    classname?: string,
    playerInfoMap: PlayerInfoMap,
    updated: number,
};

const PlayerCards: FC<Props> = ({ classname, playerInfoMap, updated }) => {
    const memoInfos = Array.from(playerInfoMap.values());

    return (
        <div className={cx(
            'flex justify-center items-center',
            'text-yellow-custom',
            classname,
        )}
        >
            {memoInfos.map(({ playerName, isReady, isHost }, idx) => (
                <PlayerCard key={idx} classname='w-1/4' playerName={playerName} isReady={isReady} isHost={isHost} />
            ))}
        </div>
    )
};

export default PlayerCards;
