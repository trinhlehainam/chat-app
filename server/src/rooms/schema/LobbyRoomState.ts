import { Schema, Context, type, MapSchema } from "@colyseus/schema";
import MessageState from "./MessageState";
import { LobbyClient } from "./LobbyClient";

export class LobbyRoomState extends Schema {
    @type([MessageState]) messsages: Array<MessageState> = [];
    @type({ map: LobbyClient }) clients = new MapSchema<LobbyClient>();
    @type('string') roomName: string = '';
    @type('string') roomId: string = '';
    @type('string') hostId: string = '';
    @type('number') clientNum: number = 1;
}
