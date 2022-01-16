import { Schema, Context, type } from "@colyseus/schema";
import ChatState from "./ChatState";

export class LobbyRoomState extends Schema {

  @type(ChatState) chatState = new ChatState();
}
