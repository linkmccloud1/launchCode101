type launchCode = {
    Factor: number
    Value: string
}

const launchCodes: launchCode[] = [
    { Factor: 2, Value: 'Launch' },
    { Factor: 3, Value: 'Code' },
    { Factor: 5, Value: 'Rocks' }
]

export default function launchOutput(num:number):string {
    let result:string = 
        launchCodes
            .map(code => (num % code.Factor === 0) ? code.Value : '')
            .reduce((acc, res) => acc + ((acc === 'LaunchCode' && res === 'Rocks') ? ' ' : '') 
                                      + ((acc === 'Launch' && res === 'Rocks') ? ' ' : '')
                                      + ((acc === 'Code' && res === 'Rocks') ? ' ' : '')
                                      + res)
            + '!'

    return ((result === '!')
        ? "Rutabagas! That doesn't work." 
        : ((result === 'Launch Rocks!') ? result + ' (CRASH!!!!)' : result))
}