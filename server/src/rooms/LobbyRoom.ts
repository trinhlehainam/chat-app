import { Room, Client, ServerError } from "colyseus";
import { LobbyRoomState } from "./schema/LobbyRoomState";

export class LobbyRoom extends Room<LobbyRoomState> {
    onCreate(options: any) {
        this.setState(new LobbyRoomState());

        if (options.password) {
            this.setPrivate();
            this.state.password = options.password;
        }

        this.maxClients = options.maxClients;

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

    async onAuth(client: Client, options: any, request) {
        //TODO: set up more advance auth
        if(!this.state.password) return true;

        if(options.password !== this.state.password)
            throw new ServerError(400, `Incorrect password`);

        return true;
    }

}
