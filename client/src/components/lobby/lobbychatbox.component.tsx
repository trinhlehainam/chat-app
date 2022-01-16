import { useState, ChangeEvent, useContext, useEffect, KeyboardEvent } from 'react';
import cx from 'classnames'

import GlobalContext from '../../contexts/global.context';

const LobbyChatBox = () => {
    const {room} = useContext(GlobalContext);

    const [message, setMessage] = useState('');
    const [chat, setChat] = useState<Array<string>>([]);

    useEffect(() => {
        if (!room) return;
        room.send('requireInit');

        room.onMessage('initState', (messages) => {
            setChat(messages);
        });

        room.onMessage('syncChat', (messages) => {
            setChat(messages);
        });

    },[room])

    const changeMessage = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    const sendMessage = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            room && room.send('newMessage', message);
            setMessage('');
        }
    }

    return (
        <div
            className={cx(
                'flex flex-col-reverse justify-start',
                'absolute bottom-0 left-0 w-1/3 h-full text-yellow-custom',
            )}
        >
            <input
                type='text'
                className='peer outline-none border-2 border-yellow-custom bg-gray-700/90 w-full text-lg px-2'
                value={message}
                onChange={changeMessage}
                onKeyPress={sendMessage}
            />
            <div
                className={cx(
                    'bottom-0 left-0 border-2 border-yellow-custom z-10',
                    'bg-gray-700/90',
                    'w-full h-0 opacity-0',
                    'peer-focus:h-[400px] peer-focus:opacity-100',
                    'transition-all ease-linear duration-[0.2s]',
                    'overflow-auto scrollbar-hide'
                )}
            >
                {chat.map((mess, idx) => <div key={idx} className='mx-4'>{mess}</div>)}
            </div>
        </div>
    )
};

export default LobbyChatBox;
