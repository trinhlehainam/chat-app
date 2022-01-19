import { Room, Client, ServerError } from "colyseus";
import { LobbyRoomState } from "./schema/LobbyRoomState";
import { LobbyClient } from "./schema/LobbyClient";
import MessageState from "./schema/MessageState";

export class LobbyRoom extends Room<LobbyRoomState> {
    private password: string = '';

    onCreate(options: any) {
        this.setState(new LobbyRoomState());

        if (options.password) {
            this.setPrivate();
            this.password = options.password;
        }

        this.maxClients = options.maxClients;

        this.state.roomName = options.roomName ? options.roomName : this.roomId;
        this.state.roomId = this.roomId;

        this.setMetadata({ roomName: options.roomName })

        this.onMessage('requireInit', (client) => {
            client.send('initState', this.state);
        });

        this.onMessage('requireMessages', (client) => {
            client.send('initMessages', this.state.messsages);
        })

        this.onMessage("newMessage", (client, message) => {
            this.state.messsages.push(new MessageState(this.state.clients.get(client.sessionId).name, message));
            this.broadcast('syncChat', this.state.messsages);
        });
    }

    onJoin(client: Client, options: any) {
        console.log(client.sessionId, "joined!");

        this.state.clientNum = this.clients.length;

        // NOTE:Asign host to first client
        if (this.clients.length === 1) {
            this.state.hostClient = client.sessionId;
        }

        const clientName = options.clientName ? options.clientName : client.sessionId;
        const isHost = client.sessionId === this.state.hostClient;

        this.state.clients.set(client.sessionId, new LobbyClient(clientName, isHost));
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
