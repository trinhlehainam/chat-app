import { Room, Client, ServerError } from "colyseus";
import { LobbyRoomState } from "./schema/LobbyRoomState";

export class LobbyRoom extends Room<LobbyRoomState> {
    private password: string = '';

    onCreate(options: any) {
        this.setState(new LobbyRoomState());

        if (options.password) {
            this.setPrivate();
            this.password = options.password;
        }

        if (options.name) {
            this.state.name = options.name;
        }

        this.maxClients = options.maxClients;

        this.state.roomId = this.roomId;

        this.setMetadata({ name: options.name })

        this.onMessage("newMessage", (client, message) => {
            this.state.chatState.messages.push(message);
            this.broadcast('syncChat', this.state.chatState.messages);
        });

    }

    onJoin(client: Client, options: any) {
        console.log(client.sessionId, "joined!");
        
        this.state.clientNum = this.clients.length;
        // NOTE:Asign host to first client
        if (this.clients.length === 1) {
            this.state.hostClient = client.id;
        }

        client.send('initState', this.state.chatState.messages);
    }

    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }

    async onAuth(client: Client, options: any, request) {
        //TODO: set up more advance auth
        if (!this.password) return true;

        if (options.password !== this.password)
            throw new ServerError(400, `Incorrect password`);

        return true;
    }

}
