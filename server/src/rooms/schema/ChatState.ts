import {Schema, type, ArraySchema} from '@colyseus/schema'

export default class ChatState extends Schema {
    @type(['string']) messages = new ArraySchema<string>();
}