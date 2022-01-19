import {Schema, type } from '@colyseus/schema'

export default class MessageState extends Schema {
    @type('string') message: string;
    @type('string') clientName: string;

    constructor(clientName: string, message:string) {
        super();
        this.clientName = clientName;
        this.message = message;
    }
}
