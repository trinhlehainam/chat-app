import cx from 'classnames'
import { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import LobbyChatBox from '../components/lobby/lobbychatbox.component';
import PlayerCards from '../components/lobby/playercards.component';
import LobbyTitle from '../components/lobby/title.component';
import GlobalContext from '../contexts/global.context';
import LobbyContext from '../contexts/lobby.context';
import Button from '../svg/lobby/button.svg';

const Lobby = () => {
    const [roomName, setRoomName] = useState('');

    const navigate = useNavigate();

    const {
        room, setRoom,
    } = useContext(GlobalContext);

    const context = {
        roomName, setRoomName,
    };

    const leave = () => {
        room && room.leave()
            .then(() => {
                setRoom && setRoom(undefined);
            });
        navigate('/rooms', { replace: true })
    };

    useEffect(() => {
        if (!room) {
            navigate('/rooms', { replace: true })
            return;
        }

        setRoomName(room.state.roomName);
    }, [room, setRoomName, navigate]);

    return (
        <LobbyContext.Provider value={context}>
            <div
                className={cx(
                    "absolute inset-0 sm:inset-6 bg-black/10 backdrop-blur-xl",
                    "flex items-center justify-center",
                )}
            >
                <div
                    className={cx(
                        "w-full h-full p-4 max-w-[1440px]",
                        "relative flex flex-col items-center"
                    )}
                >
                    <LobbyTitle classname='text-yellow-custom lg:text-5xl' />
                    <PlayerCards classname='w-4/5 max-w-[1105px] my-auto' />
                    <div className='flex translate-x-1/4 w-1/2 my-auto'>
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
                    <LobbyChatBox
                        classname='absolute bottom-0 left-0 w-full md:w-1/2 lg:w-1/3 h-full text-yellow-custom group'
                    />
                </div>
            </div>
        </LobbyContext.Provider>
    )
};

export default Lobby;
