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
            client.send('initState', {
                state: this.state,
                id: client.sessionId,
                playerName: this.state.clients.get(client.sessionId).name,
                maxClients: this.maxClients});

            if (this.clients.length > 1)
                this.broadcast('newComer', this.state);
        });

        this.onMessage('requireMessages', (client) => {
            client.send('initMessages', this.state.messsages);
        });

        this.onMessage('requireToggleReady', (client) => {
            const clientState = this.state.clients.get(client.sessionId);
            clientState.isReady = !clientState.isReady;
            this.broadcast('updateClientReadyState', {
                id: client.sessionId, isReady: clientState.isReady
            });
        });

        this.onMessage('requestChangePlayerName', (client, newPlayerName) => {
            const clientState = this.state.clients.get(client.sessionId);
            clientState.name = newPlayerName;
            this.broadcast('updateClientName', {id: client.sessionId, newPlayerName});
        });

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
            this.state.hostId = client.sessionId;
        }

        const clientName = options.clientName ? options.clientName : client.sessionId;
        const isHost = client.sessionId === this.state.hostId;

        this.state.clients.set(client.sessionId, new LobbyClient(clientName, isHost));
    }

    onLeave(client: Client, consented: boolean) {
        console.log(client.sessionId, "left!");
        this.state.clients.delete(client.sessionId);
        
        // NOTE: pick new client to become host when current host left
        if (this.state.hostId === client.sessionId) {
            const clientIds = Array.from(this.state.clients.keys());
            const randomId = Math.random() * clientIds.length;
            const pickRandomId = Math.floor(randomId);
            this.state.hostId = clientIds[pickRandomId];
        }

        this.broadcast('playerLeave', {id: client.sessionId, newHostId: this.state.hostId});
    }

    onDispose() {
        console.log("room", this.roomId, "disposing...");
    }

    async onAuth(client: Client, options: any, request: any) {
        //TODO: set up more advance auth
        if (!this.password) return true;

        if (options.password !== this.password)
            throw new ServerError(400, `Incorrect password`);

        return true;
    }

}
