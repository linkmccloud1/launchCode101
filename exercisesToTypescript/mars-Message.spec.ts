import assert from 'assert'
import c = Command
import m = Message

describe("Message class", () => {
    // ignoring the first test of the class
    // b/c the compiler catches that error!

    it("constructor sets name", () => {
        let output = m.newMessage('MOVING')
        assert.notStrictEqual(output.name, undefined)
    })

    it("contains a commands array passed into the constructor as 2nd argument", () => {
        let array = [c.changeMode('LOW_POWER'), c.checkStatus()]
        let output = m.newMessage('Test message', array)
        switch (output.kind) {
            case 'ECHO' : return assert.fail
            case 'COMMANDS' : return assert.notStrictEqual(output.commands, undefined)
        }
    })
})