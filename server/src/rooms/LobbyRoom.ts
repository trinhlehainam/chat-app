import { Room, Client } from "colyseus";
import { LobbyRoomState } from "./schema/LobbyRoomState";

export class LobbyRoom extends Room<LobbyRoomState> {
    maxClients: number = 4;

    onCreate(options: any) {
        if (options.password) {
            this.setPrivate();
        }

        this.setState(new LobbyRoomState());

        this.setMetadata({ name: options.name })

        this.onMessage("requireInit", (client, message) => {
            // NOTE:Asign host to first client
            if (this.clients.length === 1) {
                this.state.hostClient = client.id;
            }

            client.send('initState', this.state.chatState.messages);
        });

        this.onMessage("newMessage", (client, message) => {
            this.state.chatState.messages.push(message);
            this.broadcast('syncChat', this.state.chatState.messages);
        });

    }

    onJoin(client: Client, options: any) {
        console.log(client.sessionId, "joined!");
    }

    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }

}
