import { Room, Client } from "colyseus";
import { MyRoomState } from "./schema/MyRoomState";

export class MyRoom extends Room<MyRoomState> {
  maxClients: number = 4;

  onCreate (options: any) {
    this.setState(new MyRoomState());

    this.onMessage("requireInit", (client, message) => {
      client.send('initState', this.state.chatState.messages);
    });

    this.onMessage("newMessage", (client, message) => {
      this.state.chatState.messages.push(message);
      this.broadcast('syncChat', this.state.chatState.messages);
    });

  }

  onJoin (client: Client, options: any) {
    console.log(client.sessionId, "joined!");
  }

  onLeave (client: Client, consented: boolean) {
    console.log(client.sessionId, "left!");
  }

  onDispose() {
    console.log("room", this.roomId, "disposing...");
  }

}
