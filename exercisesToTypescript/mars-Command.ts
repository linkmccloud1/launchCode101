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

    export const moveRover = (value: number): Command => ({
        kind: 'MOVE',
        value
    })

    export const changeMode = (value: string): Command => {
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

    export const checkStatus = (): Command => ({
        kind: 'STATUS_CHECK'
    })
}