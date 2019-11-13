import launchOutput from './class9-studio'
import assert from 'assert'

describe("launchOutput function", () => {
    it("should be evenly divisible by 2", () => {
        let output = launchOutput(14)
        assert.strictEqual(output, 'Launch!')
    })

    it("should be evenly divisible by 3", () => {
        let output = launchOutput(9)
        assert.strictEqual(output, 'Code!')
    })

    it("should be evenly divisible by 5", () => {
        let output = launchOutput(25)
        assert.strictEqual(output, 'Rocks!')
    })

    it("should return 'LaunchCode!' when evenly divisible by both 2 & 3", () => {
        let output = launchOutput(12)
        assert.strictEqual(output, 'LaunchCode!')
    })

    it("should return 'Code Rocks!' when evenly divisible by both 3 & 5", () => {
        let output = launchOutput(15)
        assert.strictEqual(output, 'Code Rocks!')
    })

    it("should return 'Launch Rocks!' when evenly divisible by both 2 & 5", () => {
        let output = launchOutput(20)
        assert.strictEqual(output, 'Launch Rocks! (CRASH!!!!)')
    })

    it("should return 'LaunchCode Rocks!' when evenly divisible by all of 2, 3, & 5", () => {
        let output = launchOutput(30)
        assert.strictEqual(output, 'LaunchCode Rocks!')
    })

    it("should return an error when not dividible by 2, 3, or 5", () => {
        let output = launchOutput(23)
        assert.strictEqual(output, "Rutabagas! That doesn't work.")
    })
})