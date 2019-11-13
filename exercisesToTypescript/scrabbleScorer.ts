const input = require('readline-sync')

interface Algorithm {
    name: string
    description: string
    scoreFunction(input: string, pointStruct?: {}): number
}

interface input {
    algValid(): number
    alg(algorithms: Algorithm[]): number
    word(): string
}

// here is the oldScoreKey object
const oldScoreKey: {} = {
    1: ['A', 'E', 'I', 'O', 'U', 'L', 'N', 'R', 'S', 'T'],
    2: ['D', 'G'],
    3: ['B', 'C', 'M', 'P'],
    4: ['F', 'H', 'V', 'W', 'Y'],
    5: ['K'],
    8: ['J', 'X'],
    10: ['Q', 'Z']
}

// code your transform function here
function transform(oldObj: {}): {} {
    let newObj: {} = {}
    for (let item in oldObj) {
        for (let i = 0; i < oldObj[item].length; i++) {
            newObj[`${oldObj[item][i]}`] = item
        }
    }
    return newObj
}

// use the transform function to create your newScoreKey object here
let letters: {} = transform(oldScoreKey)

// handle blank tiles by adding ' ' to newScoreKey here
letters[' '] = 0

// create your scoringAlgorithms objects here
let scrabble: Algorithm = {
    name: 'Scrabble',
    description: 'A traditional scoring algorithm.',
    scoreFunction: function (input:string, pointStruct:{} = letters): number {
        // assigns points based on a given point object
        const word = input.toUpperCase().split('')
        let points: number = 0
        for (let i = 0; i < word.length; i++) {
            points += Number(pointStruct[word[i]])
        }
        return points
    }
}

let simple: Algorithm = {
    name: 'Simple Score',
    description: 'Each letter is worth 1 point.',
    scoreFunction: function (input:string): number {
        return input.toLowerCase().split('').length
    }
}

let vowel: Algorithm = {
    name: 'Bonus Vowels',
    description: 'Vowels are 3 pts, consonants are 1 pt.',
    scoreFunction: function (input:string): number {
        const word: string[] = input.toLowerCase().split('')
        let vowels: string[] = ['a', 'e', 'i', 'o', 'u']
        let vowelsInWord: string[] = []
        let consInWord: string[] = []

        for (let i = 0; i < word.length; i++) {
            if (vowels.includes(word[i])) {
                vowelsInWord.push(word[i])
            } else {
                consInWord.push(word[i])
            }
        }

        let points: number = (vowelsInWord.length * 3) + consInWord.length

        return points
    }
}

// create your scoringAlgorithms array here
let scoringAlgorithms: Algorithm[] = [scrabble, simple, vowel]

// Handle user input (algorithm choice & word entry)
let state: input = {
    algValid: function(): number {
        let options: number[] = [0, 1, 2]
        let choice: number = Number(input.question("Enter 0, 1, or 2: "))
        while (!options.includes(choice)) {
            choice = Number(input.question("\nInvalid input! Please enter 0, 1, or 2: "))
        }
        return choice
    },
    alg: function(algorithms: Algorithm[]): number {
        console.log(`\nWhich scoring algorithm would you like to use?\n`)
        scoringAlgorithms.map((x:Algorithm, index) => console.log(`${index} - ${x.name}: ${x.description}`))
        console.log('')
        let choice = this.algValid()
        console.log(`\nUsing the ${algorithms[choice].name} algorithm: ${algorithms[choice].description}`)
        return choice
    },
    word: function(): string {
        let word = input.question('\nPlease enter a word or command: ')
        let test = word.match(/[^a-zA-Z\u0020]/)
        while (test !== null) {
            word = input.question('\nInvalid input! Please enter a word or command: ')
        }
        return word
    }
}

// Main program function
function runProgram(algorithms: Algorithm[]): void {
    console.log('Welcome to the Scrabble score calculator!')

    let choice:number = state.alg(algorithms)

    console.log('\nUsage: Enter a word to score, or "Stop" to exit the program.\nYou may also type "Select Algorithm" to change how words are scored.')

    let input:string = state.word()

    while (input !== 'Stop') {
        if (input.toLowerCase() === 'select algorithm') {
            choice = state.alg(algorithms)
            input = state.word()
        } else {
            let points = algorithms[choice].scoreFunction(input)
            console.log(`\n>>> Score for "${input}": ${points} <<<`)
            input = state.word()
        }

        if (input === 'Stop' || input === 'stop') {
            break;
        }
    }
}

// Run main program function
runProgram(scoringAlgorithms)