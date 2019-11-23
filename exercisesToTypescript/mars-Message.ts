import c = Command

namespace Message {
    export type Echo = {
        kind: 'ECHO',
        name: string
    }

    export type Commands = {
        kind: 'COMMANDS',
        name: string,
        commands: c.Command[]
    }

    export type Message =
        | Echo
        | Commands
    
    export const newMessage = (name: string, commands?:c.Command[]): Message => {
        if (commands === undefined) {
            return {
                kind: 'ECHO',
                name
            }
        } else {
            return {
                kind: 'COMMANDS',
                name,
                commands
            }
        }
    }
}