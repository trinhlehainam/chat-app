import cx from 'classnames'
import { FC, memo, useCallback, useContext, useEffect, useState } from 'react';
import GlobalContext from '../../contexts/global.context';
import LobbyContext from '../../contexts/lobby.context';
import BorderBottom from '../../svg/lobby/border-bottom.svg';
import BorderTop from '../../svg/lobby/border-top.svg';

import RoomBorder from '../../svg/room/roomborder.svg'
import RoomCancelButton from '../rooms/cancelbutton.component';
import LobbyButton from './button.component';

const MemoBorder = memo(RoomBorder);
const MemoCancelButton = memo(RoomCancelButton);
const MemoBorderTop = memo(BorderTop);
const MemoBorderBottom = memo(BorderBottom);

interface Props {
    roomId: string,
    maxPlayers: number,
    playerName: string,
};

const MemoButton = memo(LobbyButton);

const InfoBox: FC<Props> = ({ roomId, maxPlayers, playerName }) => {
    const MAX_INPUT_LENGTH = 9;

    const { room } = useContext(GlobalContext);
    const { setInfoState } = useContext(LobbyContext);

    const [name, setName] = useState('');

    useEffect(() => {
        setName(playerName);
    }, [playerName, setName]);

    const cancel = useCallback(() => {
        setInfoState && setInfoState(false);
    }, [setInfoState]);

    const canRename = name !== playerName && name !== "";

    const rename = () => {
        if(canRename)
            room && room.send('requestChangePlayerName', name);
    }

    return (
        <div
            className={cx(
                "absolute w-full h-full",
                "flex items-center justify-center",
                "z-30 text-yellow-custom"
            )}
        >
            <div
                className={cx(
                    "absolute w-[50%] h-[60%] sm:h-[60%] max-w-[740px]",
                    "flex flex-col items-center justify-center gap-4 sm:gap-8",
                    "z-10"
                )}
            >
                <MemoBorder
                    classname="absolute w-full h-full mx-auto"
                    fillclass="fill-black/80 backdrop-blur-xl"
                />
                <MemoCancelButton
                    classname="absolute right-0 top-0 w-[20%] sm:w-[18%] h-auto translate-x-1/4 -translate-y-1/4 z-30 cursor-pointer"
                    onClick={cancel}
                />
                <div className={cx(
                    'flex flex-col items-center select-none',
                    'w-[50%] h-auto',
                    'text-lg',
                    'md:text-4xl z-20'
                )}
                >
                    <MemoBorderTop classname='w-[45%] h-auto' />
                    <div className="md:my-2">
                        INFO
                    </div>
                    <MemoBorderBottom classname='w-[45%] h-auto' />
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center z-20 w-full md:text-xl lg:text-2xl gap-2">
                    <div className="md:w-1/3 select-none">ROOM ID</div>
                    <div className="bg-gray-400/30 px-2 w-3/4 md:w-1/3 text-center">
                        {roomId}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center z-20 w-full md:text-xl lg:text-2xl gap-2">
                    <div className="md:w-1/3 select-none">MAX PLAYERS</div>
                    <div className="bg-gray-400/30 px-2 w-3/4 md:w-1/3 text-center">
                        {maxPlayers}
                    </div>
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center z-20 w-full md:text-xl lg:text-2xl gap-2">
                    <div className="md:w-1/3 select-none">PLAYER NAME</div>
                    <input type='text' value={name} onChange={(e) => { setName(e.target.value) }} maxLength={MAX_INPUT_LENGTH}
                        className="bg-gray-400/30 px-2 w-3/4 md:w-1/3 focus:outline-none text-center"
                    />
                </div>
                <MemoButton
                    classname={cx(
                        "w-1/3",
                        {"opacity-30 cursor-not-allowed": !canRename}
                    )}
                    childClassName={cx({'btn-base peer': canRename})}
                    fillClass={cx({'fill': canRename})}
                    onClick={rename}
                    text='RENAME' />
            </div>
        </div>
    );
};

export default InfoBox;
