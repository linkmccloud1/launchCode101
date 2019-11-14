import Command from './mars-Command'

export default class Message {
    name:string
    commands?:Command[]

    constructor(name:string, commands?:Command[]) {
        this.name = name
        this.commands = commands
    }
}