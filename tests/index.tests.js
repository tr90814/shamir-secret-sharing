const expect = require('chai').expect
const fuzzer = require('./fuzzer')
const bigInt = require('big-integer')

const {
  split,
  splitNumber,
  recover,
  recoverNumber,
  stringToBigInt,
  bigIntToString,
  modulusPolynomialFromBigIntArray
} = require('../lib/index')

describe('Shamir\'s secret sharing', () => {
  const knownSecret = 'secret'
  const knownSecretNumberFormat = bigInt('115101099114101116')
  const bigPrime = bigInt('22953686867719691230002707821868552601124472329079')

  describe('stringToBigInt', () => {
    it('encodes a string into a number', () => {
      expect(stringToBigInt(knownSecret)).to.eql(knownSecretNumberFormat)
    })

    it('reverses bigIntToString', () => {
      expect(stringToBigInt(bigIntToString(knownSecretNumberFormat))).to.eql(knownSecretNumberFormat)
    })
  })

  describe('bigIntToString', () => {
    it('decodes a number into a string', () => {
      expect(bigIntToString(knownSecretNumberFormat)).to.equal(knownSecret)
    })

    it('reverses _stringToBigInt', () => {
      expect(bigIntToString(stringToBigInt(knownSecret))).to.equal(knownSecret)
    })
  })

  describe('modulusPolynomialFromBigIntArray', () => {
    const polynomial = [bigInt(4), bigInt(2), bigInt(1)]
    it('creates a polynomial evaluating function, modulus a given number', () => {
      expect(modulusPolynomialFromBigIntArray(3, polynomial)(1)).to.eql(bigInt(1))
    })
  })

  describe('split', () => {
    it('splits the secret into the correct number of parts', () => {
      const parts = fuzzer.integer(20)
      expect(split(bigPrime, parts, 5)('secret').length).to.equal(parts)
    })

    it('splits the secret into strings', () => {
      expect(typeof split(bigPrime, 2, 5)('secret')[0][1]).to.equal('string')
    })
  })

  describe('recoverNumber', () => {
    const partsToSplitInto = 6
    const minimumPartsToRecover = 3

    it('reverses encode', () => {
      const splitRes = splitNumber(bigPrime, partsToSplitInto, minimumPartsToRecover)(knownSecretNumberFormat)
      const minParts = splitRes.slice(0, minimumPartsToRecover)
      expect(recoverNumber(bigPrime)(minParts)).to.eql(knownSecretNumberFormat)
    })
  })

  describe('recover', () => {
    const string = 'tommyiscool'
    const partsToSplitInto = 7
    const minimumPartsToRecover = 5

    it('Splits and reconstructs strings', () => {
      expect(recover(bigPrime, partsToSplitInto, minimumPartsToRecover)(split(bigPrime, partsToSplitInto, minimumPartsToRecover)(string))).to.eql(string)
    })
  })
})
