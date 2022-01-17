import { Schema, Context, type } from "@colyseus/schema";
import ChatState from "./ChatState";

export class LobbyRoomState extends Schema {
  @type(ChatState) chatState = new ChatState();
  @type('string') name: string = '';
  @type('string') roomId: string = '';
  @type('string') hostClient: string = '';
  @type('number') clientNum: number = 1;
}
