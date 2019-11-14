import Command from './mars-Command'
import Message from './mars-Message'

type status = {
    mode: string
    generatorWatts: number
    position: number
}

type report = {
    completed: boolean
    message?: string
    roverStatus?: status
}

type feed = {
    message: Message["name"]
    results: report[]
}

export default class Rover {
    position: number
    mode: string
    generatorWatts: number

    constructor(position:number) {
        this.position = position
        this.mode = 'NORMAL'
        this.generatorWatts = 110
    }

    processMessage(array:Command[]):report[] {
        let results:report[] = []

        for (let i = 0; i < array.length; i++) {
            if (array[i].commandType === 'MOVE') {
                if (this.mode === 'LOW_POWER') {
                    results.push({completed: false})
                } else if (this.mode === 'NORMAL') {
                    this.position = Number(array[i].value)
                    results.push({completed: true})
                }
            } else if (array[i].commandType === 'STATUS_CHECK') {
                results.push({
                    completed: true,
                    roverStatus: {
                        mode: this.mode,
                        generatorWatts: this.generatorWatts,
                        position: this.position
                    }
                })
            } else if (array[i].commandType === 'MODE_CHANGE') {
                this.mode = String(array[i].value)
                results.push({completed: true})
            } else {
                results.push({completed: false, message: 'Error: Invalid command!'})
            }
        }

        return results
    }

    receiveMessage(input:Message):feed {
        let processed:report[]

        if (input.commands !== undefined) {
            processed = this.processMessage(input.commands)
        } else {
            processed = [{completed:false, message: 'No commands given.'}]
        }

        let output:feed = {
            message: input.name,
            results: processed
        }

        return output
    }
}