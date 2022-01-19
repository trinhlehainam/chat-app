import { useState, ChangeEvent, useContext, useEffect, KeyboardEvent, useRef, FC, useCallback } from 'react';
import cx from 'classnames'

import GlobalContext from '../../contexts/global.context';

interface Props {
    classname?: string,
};

interface Message {
    playerName: string,
    message: string
}

const LobbyChatBox: FC<Props> = ({ classname }) => {
    const { room } = useContext(GlobalContext);

    const [message, setMessage] = useState('');
    const [chat, setChat] = useState<Array<Message>>([]);

    const checkpointRef = useRef<HTMLDivElement>(null);

    const scrollToCheckpoint = useCallback(() => {
        checkpointRef.current?.scrollIntoView({ behavior: 'smooth' })
    },[checkpointRef]);

    useEffect(() => {
        if (!room) return;

        let isMounted = true;

        room.send('requireMessages');

        room.onMessage('initMessages', (messages) => {
            const convertedMessage = messages.map((messages: any) => {
                return {
                    playerName: messages.clientName,
                    message: messages.message
                }
            });
            isMounted && setChat(convertedMessage);
        });

        room.onMessage('syncChat', (messages) => {
            const convertedMessage = messages.map((messages: any) => {
                return {
                    playerName: messages.clientName,
                    message: messages.message
                }
            });
            isMounted && setChat(convertedMessage);
        });

        return () => {
            isMounted = false
        };

    }, [room, setChat])

    const changeMessage = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setMessage(e.target.value);
    }, [setMessage]);

    const sendMessage = useCallback((e: KeyboardEvent<HTMLInputElement>, message: string) => {
        if (e.key === 'Enter') {
            message && room && room.send('newMessage', message);
            setMessage('');
            scrollToCheckpoint();
        }
    }, [room, setMessage, scrollToCheckpoint]);

    return (
        <div
            className={cx(
                'flex flex-col-reverse justify-start pointer-events-auto',
                classname
            )}
        >
            <input
                type='text'
                className='peer outline-none border-2 border-yellow-custom bg-gray-700/90 w-full text-lg px-2'
                value={message}
                onChange={changeMessage}
                onKeyPress={(e) => sendMessage(e, message)}
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
                {chat.map(({ playerName, message }, idx) => <div key={idx} className='mx-2 break-all'>{`[ ${playerName} ] : ${message}`}</div>)}
                <div ref={checkpointRef} />
            </div>
        </div>
    )
};

export default LobbyChatBox;
