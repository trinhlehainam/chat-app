import { Dispatch, FC, memo, SetStateAction, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cx from 'classnames'

import GlobalContext from "../../contexts/global.context";
import LobbyButton from "./button.component";
import { PlayerInfoMap } from "./playercards.component";

const MemoButton = memo(LobbyButton);

interface Props {
    classname?: string,
    setInfoState: Function,
    isHost: boolean,
    setPlayerInfoMap: Dispatch<SetStateAction<PlayerInfoMap>>,
    setUpdatePlayerState: Dispatch<SetStateAction<number>>
};

type ArrowFunction<T> = () => T

const NavButtons: FC<Props> = ({ classname, setInfoState, isHost, setPlayerInfoMap, setUpdatePlayerState }) => {
    const { room, setRoom } = useContext(GlobalContext);

    const navigate = useNavigate();

    const [isReady, setIsReady] = useState(false);
    const [text, setText] = useState('');

    const [func, setFunc] = useState<ArrowFunction<void>>(() => () => {});

    const leave = useCallback(() => {
        room && room.leave()
            .then(() => {
                setRoom && setRoom(undefined);
            });
        navigate('/rooms', { replace: true })
    }, [setRoom, navigate, room]);

    const start = useCallback(() => {
        navigate('/game', { replace: true })
    }, [navigate]);

    const ready = useCallback(() => {
        if (!room) return;
        room.send('requireToggleReady');
    }, [room]);

    const popInfo = useCallback(() => {
        setInfoState && setInfoState(true);
    }, [setInfoState]);

    useEffect(() => {
        if (!room) return;

        let isMounted = true;

        room.onMessage('updateClientReadyState', ({ id, isReady }) => {
            if (!isMounted) return;

            setIsReady(isReady);
            setPlayerInfoMap(infoMap => {
                const client = infoMap.get(id);
                if (client) {
                    client.isReady = isReady;
                }
                return infoMap;
            });
            setUpdatePlayerState(state => state + 1);
        });

        return () => {isMounted = false};
    }, [room, setIsReady, setUpdatePlayerState]);

    useEffect(() => {
        setFunc(() => isHost ? start : ready);
        setText(isHost ? 'START' : 'READY');
    }, [isHost, setText, setFunc])

    return (
        <div className={cx(
            'flex justify-center items-center',
            classname
        )}>
            <MemoButton classname="w-1/2 scale-75" onClick={popInfo} text="INFO" />
            <MemoButton classname="w-1/2" onClick={func} text={text} />
            <MemoButton classname="w-1/2 scale-75" onClick={leave} text="LEAVE" />
        </div>
    );
}

export default NavButtons;
