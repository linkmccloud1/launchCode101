function divByTwo(num:number):string {
    if (num % 2) {
        return ''
    } else {
        return 'Launch'
    }
}

function divByThree(num:number):string {
    if (num % 3) {
        return ''
    } else {
        return 'Code'
    }
}

function divByFive(num:number):string {
    if (num % 5) {
        return ''
    } else {
        return 'Rocks'
    }
}

export default function launchOutput(x:number):string {
    let two = divByTwo(x)
    let three = divByThree(x)
    let five = divByFive(x)

    if (two && three && five) {
        return `${two}${three} ${five}!`
    } else if (two && three) {
        return `${two}${three}!`
    } else if (three && five) {
        return `${three} ${five}!`
    } else if (two && five) {
        return `${two} ${five}!`
    } else if (two) {
        return `${two}!`
    } else if (three) {
        return `${three}!`
    } else if (five) {
        return `${five}!`
    } else {
        return "Rutabagas! That doesn't work."
    }
}