const input = require('readline-sync')

interface Algorithm {
    name: string
    description: string
    scoreFunction(input: string, pointStruct?: {}): number
}

interface input {
    algChoice(): number
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
    description: 'The traditional scoring algorithm.',
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

let state: input = {
    algChoice: function(): number {
        let options: number[] = [0, 1, 2]
        let choice: number = Number(input.question("Enter 0, 1, or 2: "))
        while (!options.includes(choice)) {
            choice = Number(input.question("\nInvalid input! Please enter 0, 1, or 2: "))
        }
        return choice
    },
    word: function(): string {
        let word = input.question('Please enter a word or command: ')
        let test = word.match(/[^a-zA-Z\u0020]/)
        return 'ha'
    }
}

// code your initialPrompt function here
function initialPrompt(): number {
    console.log(`Welcome to the Scrabble score calculator!\n\nWhich scoring algorithm would you like to use?\n`)
    scoringAlgorithms.map((x:Algorithm, index) => console.log(`${index} - ${x.name}: ${x.description}`))
    console.log('')
    return state.algChoice()
}

// code your wordValidate function here
function wordValidate(word: string): boolean {
    let test = word.match(/[^a-zA-Z\u0020]/)
    if (test === null) {
        return true
    } else {
        return false
    }
}

function userWord(): string {
    let entry: string = input.question('\nPlease enter a word to score, or "Stop" to exit the program.\nYou may also type "Algorithm Select" to return to the selection prompt: ')
    return entry
}

// code your runProgram function here
function runProgram(scoreAlgo: Algorithm[]): void {
    let userChoice = initialPrompt()
    let input: string = ' '

    console.log(`\nUsing algorithm: ${scoreAlgo[userChoice].name}: ${scoreAlgo[userChoice].description}`)

    input = userWord()

    while (input !== 'Stop') {
        if (input === 'Stop' || input === 'stop') {
            break;
        }
        
        if (input.toLowerCase() === 'algorithm select') {
            userChoice = initialPrompt()
            console.log(`\nUsing algorithm: ${scoreAlgo[userChoice].name}: ${scoreAlgo[userChoice].description}`)
            input = userWord()
        } else {
            if (wordValidate(input)) {
                let points = scoreAlgo[userChoice].scoreFunction(input)
                console.log(`\n>>> Score for "${input}": ${points} <<<`)
                input = userWord()
            } else {
                console.log('Invalid input!')
                input = userWord()
            }
        }
    }
}

// call the runProgram function here
runProgram(scoringAlgorithms)