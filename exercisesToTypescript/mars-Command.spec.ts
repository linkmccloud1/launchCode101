import assert from 'assert'
import Command from './mars-Command'

describe("Command class", () => {
    // ignoring the first test of the assignment
    // b/c the compiler catches that error, lol
    // really all of these tests seem pointless with TS?

    it("constructor sets command type", () => {
        let output = new Command('MOVE')
        assert.notStrictEqual(output.commandType, undefined)
    })

    it("constructor sets a value passed in as the 2nd argument", () => {
        let output = new Command('MOVE', 123)
        assert.notStrictEqual(output.value, undefined)
    })
})