import c = Command
import Message from './mars-Message'

type Status = {
    mode: string,
    generatorWatts: number,
    position: number
}

type Output =
    | {
        kind: 'statusOutput',
        completed: boolean,
        roverStatus: Status
    }
    | {
        kind: 'boolOutput',
        completed: boolean
    }
    | {
        kind: 'msgOutput',
        completed: boolean,
        message: string
    }

type Report = {
    name: string,
    results: Output[]
}

const statusGen = (mode: string, generatorWatts: number, position: number): Status => ({
    mode,
    generatorWatts,
    position
})

const statusOut = (completed: boolean, roverStatus: Status): Output => ({
    kind: 'statusOutput',
    completed,
    roverStatus
})

const boolOut = (completed: boolean): Output => ({
    kind: 'boolOutput',
    completed
})

const msgOut = (completed: boolean, message: string): Output => ({
    kind: 'msgOutput',
    completed,
    message
})

export default class Rover {
    mode: string
    generatorWatts: number
    position: number

    constructor(position:number) {
        this.position = position
        this.mode = 'NORMAL'
        this.generatorWatts = 110
    }

    processMessage(input: Message): Output[] {
        let acc: Output[] = []

        input.commands.map((item) => {
            switch (item.kind) {
                case 'MOVE' :
                    switch(this.mode) {
                        case 'LOW_POWER' :
                            acc.push(boolOut(false))
                            break
                        case 'NORMAL' :
                            this.position = item.value
                            acc.push(boolOut(true))
                            break
                        default :
                            acc.push(msgOut(false, 'Error: Invalid mode set!'))
                    }
                    break
                case 'MODE_CHANGE' :
                    this.mode = item.value
                    acc.push(boolOut(true))
                    break
                case 'STATUS_CHECK' :
                    acc.push(statusOut(true, statusGen(this.mode, this.generatorWatts, this.position)))
                    break
                default :
                    acc.push(msgOut(false, 'Error: Invalid command!'))
            }
        })
        return acc
    }

    receiveMessage(input: Message): Report {
        let processed = this.processMessage(input)

        return {
            name: input.name,
            results: processed
        }
    }
}