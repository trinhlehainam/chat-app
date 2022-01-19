import cx from 'classnames'
import { FC, useContext, useEffect, useState } from 'react';

import GlobalContext from '../../contexts/global.context';

import PlayerCard from './playercard.component';

interface Props {
    classname?: string,
};

const PlayerCards: FC<Props> = ({ classname }) => {
    console.log('player')
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
            <PlayerCard classname='w-1/4' playerName='GLOBAL' isReady={false} />
        </div>
    )
};

export default PlayerCards;
