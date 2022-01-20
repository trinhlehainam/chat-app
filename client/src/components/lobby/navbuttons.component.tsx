import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cx from 'classnames'

import GlobalContext from "../../contexts/global.context";
import LobbyButton from "./button.component";

const MemoButton = memo(LobbyButton);

interface Props {
    classname?: string,
    setInfoState: Function,
    isHost: boolean,
};

type ArrowFunction<T> = () => T

const NavButtons: FC<Props> = ({ classname, setInfoState, isHost }) => {
    const { room, setRoom } = useContext(GlobalContext);

    const navigate = useNavigate();

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
        setFunc(() => isHost ? start : ready);
        setText(isHost ? 'START' : 'READY');
    }, [isHost, setText, setFunc, start, ready])

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
