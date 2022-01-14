import { Dispatch, FC, SetStateAction, useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import {RoomAvailable} from 'colyseus.js'

import RoomContext from '../../contexts/room.context';
import RoomButton from '../../svg/room/roombutton.svg';

interface Props {
    classname: string
    setAvaiRooms: Dispatch<SetStateAction<RoomAvailable[]>>
}

const NavButtons: FC<Props> = ({ classname, setAvaiRooms }) => {
    const {client, setRoom} = useContext(RoomContext);
    const navigate = useNavigate();

    return (
        <div
            className={classname}
        >
            <div
                className="relative flex justify-center items-center cursor-pointer"
                onClick={() => {
                    client &&
                        client.getAvailableRooms("MyRoom").then((rooms) => {
                            setAvaiRooms(rooms);
                        });
                }}
            >
                <RoomButton classname="h-auto w-2/3 min-w-[80px] btn-base" />
                <div className="absolute text-yellow-custom text-md sm:text-2xl pointer-events-none">
                    REFRESH
                </div>
            </div>
            <div
                className="relative flex justify-center items-center cursor-pointer"
                onClick={() => {
                    client && client.create('MyRoom')
                        .then((room) => {
                            setRoom && setRoom(room);
                        });
                    navigate('/lobby');
                }}
            >
                <RoomButton classname="h-auto w-2/3 min-w-[80px] btn-base" />
                <div className="absolute text-yellow-custom text-md sm:text-2xl pointer-events-none">
                    CREATE
                </div>
            </div>
            <div className="relative flex justify-center items-center cursor-pointer">
                <RoomButton classname="h-auto w-2/3 min-w-[80px] btn-base" />
                <div className="absolute text-yellow-custom text-md sm:text-2xl pointer-events-none">
                    FIND
                </div>
            </div>
        </div>
    )
};

export default NavButtons;
