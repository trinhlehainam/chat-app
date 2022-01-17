import cx from 'classnames'
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LobbyChatBox from '../components/lobby/lobbychatbox.component';
import PlayerCards from '../components/lobby/playercards.component';
import GlobalContext from '../contexts/global.context';
import Button from '../svg/lobby/button.svg';

const Lobby = () => {
    const [roomId, setRoomId] = useState('');
    const [roomName, setRoomName] = useState('');
    const [playerNum, setPlayerNum] = useState(1);

    const navigate = useNavigate();

    const {
        room, setRoom
    } = useContext(GlobalContext);

    const leave = () => {
        room && room.leave()
        .then(() => {
            setRoom && setRoom(undefined);
        });
        navigate('/rooms')
    };

    useEffect(() => {
        if (!room) return;
        setRoomId(room.state.roomId);
        setRoomName(room.state.name);
        setPlayerNum(room.state.clientNum);
    },[room])

    return (
        <div
            className={cx(
                "absolute inset-0 sm:inset-6 bg-black/10 backdrop-blur-xl",
                "flex items-center justify-center",
            )}
        >
            <div
                className={cx(
                    "w-full h-full p-4",
                    "relative flex flex-col items-center"
                )}
            >
                <PlayerCards />
                <div className='flex mt-20 translate-x-1/4 w-1/2'>
                    <div
                        className='relative flex justify-center items-center w-1/2 cursor-pointer'
                        onClick={() => navigate('/game')}
                    >
                        <Button classname='h-auto btn-base peer' />
                        <div
                            className='absolute text-yellow-custom text-4xl pointer-events-none peer-hover:scale-[1.2]'>
                            PLAY
                        </div>
                    </div>
                    <div
                        className='relative flex justify-center items-center w-1/2 scale-75 cursor-pointer'
                        onClick={() => leave()}
                    >
                        <Button classname='h-auto btn-base peer' />
                        <div
                            className='absolute text-yellow-custom text-4xl pointer-events-none peer-hover:scale-[1.2]'>
                            LEAVE
                        </div>
                    </div>
                </div>
                <LobbyChatBox />
            </div>
        </div>
    )
};

export default Lobby;
