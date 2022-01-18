import { useState, ChangeEvent, useContext, useEffect, KeyboardEvent, useRef, FC } from 'react';
import cx from 'classnames'

import GlobalContext from '../../contexts/global.context';

interface Props {
    classname?: string,
};

const LobbyChatBox: FC<Props> = ({ classname }) => {
    const { room } = useContext(GlobalContext);

    const [message, setMessage] = useState('');
    const [chat, setChat] = useState<Array<string>>([]);

    const checkpointRef = useRef<HTMLDivElement>(null);

    const scrollToCheckpoint = () => { checkpointRef.current?.scrollIntoView({ behavior: 'smooth' }) };

    useEffect(() => {
        if (!room) return;

        let isMounted = true;

        room.send('requreChatMessages');

        room.onMessage('initState', (messages) => {
            isMounted && setChat(messages);
        });

        room.onMessage('syncChat', (messages) => {
            isMounted && setChat(messages);
        });

        return () => {
            isMounted = false
        };

    }, [room])

    const changeMessage = (e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }

    const sendMessage = (e: KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter') {
            room && room.send('newMessage', message);
            setMessage('');
            setTimeout(() => scrollToCheckpoint(), 100);
        }
    }

    return (
        <div
            className={cx(
                'flex flex-col-reverse justify-start',
                classname
            )}
        >
            <input
                type='text'
                className='peer outline-none border-2 border-yellow-custom bg-gray-700/90 w-full text-lg px-2'
                value={message}
                onChange={changeMessage}
                onKeyPress={sendMessage}
                onClick={() => scrollToCheckpoint()}
            />
            <div
                className={cx(
                    'bottom-0 left-0 border-yellow-custom z-10',
                    'bg-gray-700/90',
                    'w-full h-0 opacity-0',
                    'peer-focus:h-[400px] peer-focus:opacity-100 peer-focus:border-2',
                    'hover:h-[400px] hover:opacity-100 hover:border-2',
                    'transition-all ease-linear duration-[0.2s]',
                    'overflow-auto scrollbar-hide'
                )}
            >
                {chat.map((mess, idx) => <div key={idx} className='mx-2'>{mess}</div>)}
                <div ref={checkpointRef} />
            </div>
        </div>
    )
};

export default LobbyChatBox;
