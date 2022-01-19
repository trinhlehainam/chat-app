import { memo, useCallback, useContext, useEffect, useState } from "react"
import { useNavigate } from "react-router-dom";
import cx from 'classnames'

import RoomContext from "../../contexts/room.context"
import GlobalContext from "../../contexts/global.context";

import RoomBorder from "../../svg/room/roomborder.svg";
import RoomButton from "../../svg/room/roombutton.svg";
import PlayerNumSlider from "./playernumslider.component";
import RoomCancelButton from "./cancelbutton.component";

const MemoBorder = memo(RoomBorder);
const MemoCancelButton = memo(RoomCancelButton);

const CreateBox = () => {
    const MAX_INPUT_LENGTH = 9;

    const { client, setRoom } = useContext(GlobalContext);
    const [password, setPassword] = useState('');
    const [roomName, setRoomName] = useState('');
    const [playerNum, setPlayerNum] = useState(4);

    const navigate = useNavigate();

    const {
        setCreateState,
    } = useContext(RoomContext);

    const reset = useCallback(() => {
        setPassword('');
        setRoomName('');
    }, [setPassword, setRoomName]);

    useEffect(() => {
        return () => reset();
    }, [reset]);

    const cancel = useCallback(() => {
        setCreateState && setCreateState(false);
        reset();
    }, [setCreateState, reset]);

    const create = useCallback((roomName: string, password: string, playerNum: number) => {
        client && client.create('Lobby', {
            roomName: roomName,
            password: password,
            maxClients: playerNum,
            //TODO: add change username feature
            // clientName: 'GlobalChecker'
        })
            .then((room) => {
                setRoom && setRoom(room);

                navigate('/lobby', { replace: true });

                // Reset input state
                setRoomName('');
                setPassword('');
            });
    }, [client, setRoom, navigate, setPassword, setRoomName]);

    return (
        <div
            className={cx(
                "absolute w-full h-full",
                "flex items-center justify-center",
                "z-10"
            )}
        >
            <div
                className={cx(
                    "w-[60%] h-[50%] max-w-[740px]",
                    "relative flex flex-col items-center justify-center gap-6 md:gap-8",
                    "z-10"
                )}
            >
                <MemoBorder
                    classname="absolute w-full h-full mx-auto"
                    fillclass="fill-black/80 backdrop-blur-xl"
                />
                <MemoCancelButton
                    classname="absolute right-0 top-0 w-[25%] md:w-[15%] h-auto translate-x-1/4 -translate-y-1/4 z-30 cursor-pointer"
                    onClick={cancel}
                />
                <div className="flex flex-col md:flex-row justify-center items-center z-20 w-full md:text-xl lg:text-2xl gap-2">
                    <div className="md:w-1/4 select-none">ROOM NAME</div>
                    <input type='text' value={roomName} onChange={(e) => setRoomName(e.target.value)} maxLength={MAX_INPUT_LENGTH}
                        className="bg-gray-400/30 px-2 w-3/4 md:w-1/2 focus:outline-none"
                    />
                </div>
                <div className="flex flex-col md:flex-row justify-center items-center z-20 w-full md:text-xl lg:text-2xl gap-2">
                    <div className="md:w-1/4 select-none">PASSWORD</div>
                    <input type='password' value={password} onChange={(e) => setPassword(e.target.value)} maxLength={MAX_INPUT_LENGTH}
                        className="bg-gray-400/30 px-2 w-3/4 md:w-1/2 focus:outline-none"
                    />
                </div>
                <PlayerNumSlider classname="z-20 w-full" playerNum={playerNum} setPlayerNum={setPlayerNum} />
                <div className="relative flex items-center justify-center w-full md:mt-6">
                    <RoomButton
                        classname="w-1/2 md:w-[30%] h-auto btn-base cursor-pointer"
                        onClick={() => create(roomName, password, playerNum)}
                    />
                    <div className="absolute text-xl md:text-3xl pointer-events-none select-none">OK</div>
                </div>
            </div>
        </div>
    )
};

export default CreateBox;
