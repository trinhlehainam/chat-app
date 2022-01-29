import { Client, RoomAvailable } from "colyseus.js"
import FETCH_STATUS from "../common/enum/fetchstatus";

export interface AvailableRoomsResource_t {
    read(): RoomAvailable[] | undefined;
}

function wrapPromise(client: Client, roomName?: string): AvailableRoomsResource_t {
    const promise = client.getAvailableRooms(roomName);

    let status = FETCH_STATUS.PENDING;
    let result: RoomAvailable[] = [];
    let error: any;

    const suspense = promise.then(
        r => {
            status = FETCH_STATUS.SUCCESS;
            result = r;
        },
        e => {
            status = FETCH_STATUS.ERROR;
            error = e;
        }
    );

    return {
        read() {
            if (status === FETCH_STATUS.PENDING)
                throw suspense;
            else if (status === FETCH_STATUS.ERROR)
                throw error;
            else if (status === FETCH_STATUS.SUCCESS)
                return result;
        }
    }
}

function fetchAvailableRooms(client: Client, roomName?: string): AvailableRoomsResource_t {
    return wrapPromise(client, roomName);
}

export default fetchAvailableRooms;
