import assert from 'assert'
import c = Command

describe("Command type and functions", () => {
    // test the moveCommand function
    it("should return a Command of kind 'MOVE'", () => {
        let output = c.moveCommand(100)

        switch (output.kind) {
            case 'MODE_CHANGE' : return fail('Error: incorrect kind set.')
            case 'STATUS_CHECK' : return fail('Error: incorrect kind set.')
            case 'MOVE' : return assert.strictEqual(output, {kind: 'MOVE', value: 100})
        }
    })

    // test the modeCommand function
    it("should return a Command of kind 'MODE_CHANGE'", () => {
        let output = c.modeCommand('LOW_POWER')

        switch (output.kind) {
            case 'MOVE' : return fail('Error: incorrect kind set.')
            case 'STATUS_CHECK' : return fail('Error: incorrect kind set.')
            case 'MODE_CHANGE' : return assert.strictEqual(output, {kind: 'MODE_CHANGE', value: 'LOW_POWER'})
        }
    })

    it("should throw an error when MODE_CHANGE is given an invalid mode", () => {
        let output = c.modeCommand('Foobar')
        assert.strictEqual(output, Error)
    })

    // test the statusCommand function
    it("should return a Command of kind 'STATUS_CHECK'", () => {
        let output = c.statusCommand()

        switch (output.kind) {
            case 'MOVE' : return fail('Error: incorrect kind set.')
            case 'MODE_CHANGE' : return fail('Error: incorrect kind set.')
            case 'STATUS_CHECK' : return assert.strictEqual(output, {kind: 'STATUS_CHECK'})
        }
    })
})