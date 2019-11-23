import assert from 'assert'
import Message from './mars-Message'
import Rover from './mars-Rover'
import c = Command

describe("Rover class", () => {
    it("constructor sets position and default values for mode and generatorWatts", () => {
        let output = new Rover(100)
        assert.strictEqual(output.mode, 'NORMAL')
        assert.strictEqual(output.generatorWatts, 110)
    })
    
    // add handling for message without commands
    // m.newMessage('Testing functions', [c.checkStatus, c.moveRover(50), c.changeMode('NORMAL')])

    it("response returned by receiveMessage contains name of message", () => {
        let message = new Message('Test message', [c.checkStatus()])
        let rover = new Rover(100)
        let output = rover.receiveMessage(message)
        assert.strictEqual(output.name, message.name)
    })

    it("response returned by receiveMessage includes two results if two commands are sent in the message", () => {
        let array = [c.changeMode('LOW_POWER'), c.checkStatus()]
        let message = new Message('Test message', array)
        let rover = new Rover(100)
        let output = rover.receiveMessage(message).results
        assert.strictEqual(output.length, 2)
    })

    // it should return a status check correctly
    it("responds correctly to status check command", () => {
        let message = new Message('Test message', [c.checkStatus()])
        let rover = new Rover(500)
        let output = rover.receiveMessage(message).results[0]

        switch (output.kind) {
            case 'boolOutput' : return assert.fail
            case 'msgOutput' : return assert.fail
            case 'statusOutput' : return assert.strictEqual (output.roverStatus, { mode: "NORMAL", generatorWatts: 110, position: 500 })
        }})

    // it should change mode correctly
    it("responds correctly to mode change command", () => {
        let message = new Message('Test message', [c.changeMode('LOW_POWER')])
        let rover = new Rover(100)
        let output = rover.receiveMessage(message).results[0]
        assert.strictEqual(output.completed, true)
        assert.strictEqual(rover.mode, 'LOW_POWER')
    })

    // it should error and not move when in low power mode
    it("responds with 'completed: false' when attempting to move in LOW_POWER mode", () => {
        let message = new Message('Test', [c.changeMode('LOW_POWER'), c.moveRover(20)])
        let rover = new Rover(100)
        let output = rover.receiveMessage(message).results[1]
        assert.strictEqual(output.completed, false)
    })

    // it should move correctly when in normal mode
    it("responds with position for move command", () => {
        let message = new Message('Test', [c.moveRover(500)])
        let rover = new Rover(100)
        let results = rover.receiveMessage(message)
        assert.strictEqual(rover.position, 500)
    })
})