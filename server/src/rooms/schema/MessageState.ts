import {Schema, type} from '@colyseus/schema'

export default class MessageState extends Schema {
    @type('string') message: string;
}