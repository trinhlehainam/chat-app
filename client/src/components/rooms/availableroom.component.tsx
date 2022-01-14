import { FC, useContext } from "react";
import { useNavigate } from "react-router-dom";
import RoomContext from "../../contexts/room.context";
import RoomButton from "../../svg/room/roombutton.svg";

interface Props {
  name: string;
  players: string;
}

const AvailableRoom: FC<Props> = ({ name, players}) => {
  const navigate = useNavigate();

    const {
        client, setRoom
    } = useContext(RoomContext);

  return (
    <div className="flex flex-row w-full text-xs md:text-xl justify-center items-center text-center">
      <div className="w-1/3 break-words">{name}</div>
      <div className="w-1/3">{players}</div>
      <div className="w-1/3 relative flex justify-center items-center my-auto">
        <RoomButton
          classname="w-1/3 h-auto m-auto btn-base min-w-[60px] cursor-pointer"
          onClick={() => {
            client && client.joinById(name)
            .then((room) => {
                setRoom && setRoom(room);
            });
            navigate('/lobby')
          }}
        />
        <div className="absolute pointer-events-none">JOIN</div>
      </div>
    </div>
  );
};

export default AvailableRoom;
