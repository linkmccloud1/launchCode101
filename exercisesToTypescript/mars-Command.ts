namespace Command {
    export type Command =
        | {
            kind: 'MOVE'
            value: number
        }
        | {
            kind: 'MODE_CHANGE'
            value: string
        }
        | {
            kind: 'STATUS_CHECK'
        }

    export const moveCommand = (value: number): Command => ({
        kind: 'MOVE',
        value
    })

    export const modeCommand = (value: string): Command => {
        switch (value) {
            case 'NORMAL' :
                return {
                    kind: 'MODE_CHANGE',
                    value
                }
            case 'LOW_POWER' :
                return {
                    kind: 'MODE_CHANGE',
                    value
                }
            default :
                throw Error
        }
    }

    export const statusCommand = (): Command => ({
        kind: 'STATUS_CHECK'
    })
}