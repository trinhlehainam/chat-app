import { FC, memo, useCallback, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import cx from 'classnames'

import GlobalContext from "../../contexts/global.context";
import LobbyButton from "./button.component";
import { PlayerInfoMap } from "./playercards.component";

const MemoButton = memo(LobbyButton);

interface Props {
    classname?: string,
    setInfoState: Function,
    myId: string,
    playerInfoMap: PlayerInfoMap,
    updated: number,
};

type ArrowFunction<T> = () => T

const NavButtons: FC<Props> = ({ classname, setInfoState, myId, playerInfoMap, updated }) => {
    const { room, setRoom } = useContext(GlobalContext);

    const navigate = useNavigate();

    const [isHost, setIsHost] = useState(false);
    const [isReady, setIsReady] = useState(false);
    const [allReady, setAllReady] = useState(false);
    const [text, setText] = useState('');
    const [func, setFunc] = useState<ArrowFunction<void>>(() => () => { });

    useEffect(() => {
        const myInfo = playerInfoMap.get(myId);
        if (myInfo) {
            setIsHost(myInfo.isHost);
            setIsReady(myInfo.isReady);
        }
    }, [myId, updated, playerInfoMap, setIsHost, setIsReady]);

    useEffect(() => {
        const infos = Array.from(playerInfoMap.values());
        setAllReady(infos.every((info) => info.isReady === true));
    }, [updated, playerInfoMap, setAllReady]);

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
        setText(isHost ? 'START' : 'READY');
    }, [setText, isHost])

    useEffect(() => {
        setFunc(() => isHost ? (allReady ? start : () => {}) : ready);
    }, [setFunc, start, ready, isHost, allReady]);

    return (
        <div className={cx(
            'flex justify-center items-center',
            classname
        )}>
            <MemoButton classname="w-1/2 scale-75" childClassName="btn-base peer" fillClass="fill" onClick={popInfo} text="INFO" />
            <MemoButton
                classname={cx(
                    "w-1/2",
                    { "cursor-not-allowed opacity-30": isHost && !allReady }
                )}
                childClassName={cx(
                    { "btn-base peer": !isHost && !isReady },
                    { "btn-base peer": isHost && allReady },
                )}
                fillClass={cx(
                    { "fill": !isHost && !isReady },
                    { "fill-ready": !isHost && isReady },
                    { "fill": isHost && allReady },
                )}
                onClick={func} text={text}
            />
            <MemoButton classname="w-1/2 scale-75" childClassName="btn-base peer" fillClass="fill" onClick={leave} text="LEAVE" />
        </div>
    );
}

export default NavButtons;
