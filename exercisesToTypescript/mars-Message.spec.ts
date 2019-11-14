import assert from 'assert'
import Command from './mars-Command'
import Message from './mars-Message'

describe("Message class", () => {
    // ignoring the first test of the class
    // b/c the compiler catches that error!

    it("constructor sets name", () => {
        let output = new Message('MOVING')
        assert.notStrictEqual(output.name, undefined)
    })

    it("contains a commands array passed into the constructor as 2nd argument", () => {
        let array = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')]
        let output = new Message('Test message', array)
        assert.notStrictEqual(output.commands, undefined)
    })
})