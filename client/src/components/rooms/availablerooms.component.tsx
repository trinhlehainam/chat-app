import { FC } from "react";
import { AvailableRoomsResource_t } from "../../utils/fetchAvailableRooms";
import AvailableRoom from "./availableroom.component";

interface Props {
    resource: AvailableRoomsResource_t;
};

const AvailableRooms: FC<Props> = ({resource}) => {
    const avaiRooms = resource.read();

    return (
        <div className="flex flex-col h-full w-full overflow-y-auto scrollbar-hide gap-[5px]">
            {avaiRooms &&
                avaiRooms.map(({ roomId, clients, maxClients, metadata }) => {
                    return (
                        <AvailableRoom
                            key={roomId}
                            roomId={roomId}
                            roomName={metadata.roomName}
                            players={`${clients}/${maxClients}`}
                        />
                    );
                })}
        </div>
    )
};

export default AvailableRooms;
