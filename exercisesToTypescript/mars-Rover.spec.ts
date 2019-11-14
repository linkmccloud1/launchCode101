import assert from 'assert'
import Command from './mars-Command'
import Message from './mars-Message'
import Rover from './mars-Rover'

describe("Rover class", () => {
    it("constructor sets position and default values for mode and generatorWatts", () => {
        let output = new Rover(100)
        assert.strictEqual(output.mode, 'NORMAL')
        assert.strictEqual(output.generatorWatts, 110)
    })

    it("response returned by receiveMessage contains name of message", () => {
        let message = new Message('Test message')
        let rover = new Rover(100)
        let output = rover.receiveMessage(message)
        assert.strictEqual(output.message, message.name)
    })

    it("response returned by receiveMessage includes two results if two commands are sent in the message", () => {
        let array = [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('STATUS_CHECK')]
        let message = new Message('Test message', array)
        let rover = new Rover(100)
        let output = rover.receiveMessage(message).results
        assert.strictEqual(output.length, 2)
    })

    it("responds correctly to status check command", () => {
        let message = new Message('Test message', [new Command('STATUS_CHECK')])
        let rover = new Rover(500)
        let output = rover.receiveMessage(message).results[0]

        assert.notStrictEqual(output.roverStatus, undefined)

        if (output.roverStatus !== undefined) {
            assert.strictEqual(output.roverStatus.mode, 'NORMAL')
            assert.strictEqual(output.roverStatus.generatorWatts, 110)
            assert.strictEqual(output.roverStatus.position, 500)
        }
    })

    it("responds correctly to mode change command", () => {
        let message = new Message('Test message', [new Command('MODE_CHANGE', 'LOW_POWER')])
        let rover = new Rover(100)
        let output = rover.receiveMessage(message).results[0]
        assert.strictEqual(output.completed, true)
        assert.strictEqual(rover.mode, 'LOW_POWER')
    })

    it("responds with 'completed: false' when attempting to move in LOW_POWER mode", () => {
        let message = new Message('Test', [new Command('MODE_CHANGE', 'LOW_POWER'), new Command('MOVE', 20)])
        let rover = new Rover(100)
        let output = rover.receiveMessage(message).results[1]
        assert.strictEqual(output.completed, false)
    })

    it("responds with position for move command", () => {
        let message = new Message('Test', [new Command('MOVE', 500)])
        let rover = new Rover(100)
        let results = rover.receiveMessage(message)
        assert.strictEqual(rover.position, 500)
    })

    it("responds with 'completed: false' and a message when given unknown command", () => {
        let message = new Message('Test', [new Command('Ahoy, matey!')])
        let rover = new Rover(100)
        let output = rover.receiveMessage(message).results[0]
        assert.strictEqual(output.completed, false)
        assert.strictEqual(output.message, 'Error: Invalid command!')
    })
})