import { Schema, type } from "@colyseus/schema";

export class LobbyClient extends Schema {
    @type('string') name: string = '';
    @type('boolean') isReady: boolean = false;

    constructor(name: string, isHost: boolean) {
        super();
        this.name = name;
        this.isReady = isHost;
    }
}
