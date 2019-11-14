type commands = number | string

export default class Command {
    commandType:string
    value?:commands

    constructor(commandType:string, value?:commands) {
        this.commandType = commandType
        this.value = value
    }
}