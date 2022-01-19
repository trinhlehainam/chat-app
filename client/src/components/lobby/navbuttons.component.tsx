import { FC, memo, useCallback, useContext } from "react";
import { useNavigate } from "react-router-dom";
import cx from 'classnames'

import GlobalContext from "../../contexts/global.context";
import LobbyButton from "./button.component";

const MemoButton = memo(LobbyButton);

interface Props {
    classname?: string,
    setInfoState: Function
};

const NavButtons: FC<Props> = ({ classname, setInfoState }) => {
    const { room, setRoom } = useContext(GlobalContext);

    const navigate = useNavigate();
    
    const leave = useCallback(() => {
        room && room.leave()
            .then(() => {
                setRoom && setRoom(undefined);
            });
        navigate('/rooms', { replace: true })
    }, [setRoom, navigate]);

    const play = useCallback(() => {
        navigate('/game', { replace: true })
    }, [navigate]);

    const popInfo = useCallback(() => {
        setInfoState && setInfoState(true);
    }, [setInfoState]);

    return (
        <div className={cx(
            'flex justify-center items-center',
            classname
        )}>
            <MemoButton classname="w-1/2 scale-75" onClick={popInfo} text="INFO" />
            <MemoButton classname="w-1/2" onClick={play} text="PLAY" />
            <MemoButton classname="w-1/2 scale-75" onClick={leave} text="LEAVE" />
        </div>
    );
}

export default NavButtons;
