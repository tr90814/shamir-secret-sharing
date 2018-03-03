const expect = require('chai').expect
const fuzzer = require('./fuzzer')

const { padIntegerToLength } = require('../lib/utilities')

describe('padIntegerToLength', () => {
  it('pads number strings', () => {
    expect(padIntegerToLength(4, 98)).to.equal('0098')
  })

  it('pads integer to any length', () => {
    const length = fuzzer.integer(200)
    expect(padIntegerToLength(length, 8).length).to.equal(length)
  })
})
