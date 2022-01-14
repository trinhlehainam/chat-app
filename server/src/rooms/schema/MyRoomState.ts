import { Schema, Context, type } from "@colyseus/schema";
import ChatState from "./ChatState";

export class MyRoomState extends Schema {

  @type(ChatState) chatState = new ChatState();
}
