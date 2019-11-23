import c = Command

export default class Message {
    name:string
    commands:c.Command[]

    constructor(name:string, commands:c.Command[]) {
        this.name = name
        this.commands = commands
    }
}