import { Schema, Context, type } from "@colyseus/schema";
import ChatState from "./ChatState";

export class LobbyRoomState extends Schema {
  @type(ChatState) chatState = new ChatState();
  @type('string') password: string = '';
  @type('string') name: string = '';
  @type('string') hostClient: string = '';
}
