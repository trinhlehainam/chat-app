import { Schema, Context, type } from "@colyseus/schema";
import ChatState from "./ChatState";
import { LobbyClient } from "./LobbyClient";

export class LobbyRoomState extends Schema {
  @type(ChatState) chatState = new ChatState();
  @type([LobbyClient]) clients: LobbyClient[] = [];
  @type('string') roomName: string = '';
  @type('string') roomId: string = '';
  @type('string') hostClient: string = '';
  @type('number') clientNum: number = 1;
}
