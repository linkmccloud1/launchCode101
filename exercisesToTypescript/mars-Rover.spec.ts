import assert from 'assert'
import Rover from './mars-Rover'
import c = Command
import m = Message

describe("Rover class", () => {
    it("constructor sets position and default values for mode and generatorWatts", () => {
        let output = new Rover(100)
        assert.strictEqual(output.mode, 'NORMAL')
        assert.strictEqual(output.generatorWatts, 110)
    })

    it("response returned by receiveMessage contains name of message", () => {
        let message = m.newMessage('Test message')
        let rover = new Rover(100)
        let output = rover.receiveMessage(message)
        switch (output.kind) {
            case 'COMMANDS' : return assert.fail
            case 'ECHO' : return assert.strictEqual(output.name, message.name)
        }
    })

    it("response returned by receiveMessage includes two results if two commands are sent in the message", () => {
        let array = [c.changeMode('LOW_POWER'), c.checkStatus()]
        let message = m.newMessage('Test message', array)
        let rover = new Rover(100)
        let output = rover.receiveMessage(message)
        switch (output.kind) {
            case 'ECHO' : return assert.fail
            case 'COMMANDS' : return assert.strictEqual(output.results.length, 2)
        }
    })

    // it should return a status check correctly
    it("responds correctly to status check command", () => {
        let message = m.newMessage('Test message', [c.checkStatus()])
        let rover = new Rover(500)
        let output = rover.receiveMessage(message)

        switch (output.kind) {
            case 'ECHO' : return assert.fail
            case 'COMMANDS' :
                switch (output.results[0].kind) {
                    case 'boolOutput' : return assert.fail
                    case 'msgOutput' : return assert.fail
                    case 'statusOutput' : return assert.strictEqual (output.results[0].roverStatus, { mode: "NORMAL", generatorWatts: 110, position: 500 })
                }
        }})

    // it should change mode correctly
    it("responds correctly to mode change command", () => {
        let message = m.newMessage('Test message', [c.changeMode('LOW_POWER')])
        let rover = new Rover(100)
        let output = rover.receiveMessage(message)
        switch (output.kind) {
            case 'ECHO' : return assert.fail
            case 'COMMANDS' : assert.strictEqual(output.results[0].completed, true)
        }
        assert.strictEqual(rover.mode, 'LOW_POWER')
    })

    // it should error and not move when in low power mode
    it("responds with 'completed: false' when attempting to move in LOW_POWER mode", () => {
        let message = m.newMessage('Test', [c.changeMode('LOW_POWER'), c.moveRover(20)])
        let rover = new Rover(100)
        let output = rover.receiveMessage(message)
        switch (output.kind) {
            case 'ECHO' : return assert.fail
            case 'COMMANDS' : assert.strictEqual(output.results[1].completed, false)
        }
    })

    // it should move correctly when in normal mode
    it("responds with position for move command", () => {
        let message = m.newMessage('Test', [c.moveRover(500)])
        let rover = new Rover(100)
        let results = rover.receiveMessage(message)
        assert.strictEqual(rover.position, 500)
    })
})