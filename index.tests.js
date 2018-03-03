const expect = require('chai').expect
const fuzzer = require('./fuzzer')
const bigInt = require('big-integer')

const {
  ShamirSecretSharing,
  _split,
  _splitNumber,
  _reconstruct,
  _reconstructNumber,
  _padIntegerToLength,
  _stringToBigInt,
  _bigIntToString,
  _modulusPolynomialFromBigIntArray,
  _lagrangeProduct,
  _getProduct
} = require('./index')

describe('Shamir\'s secret sharing', () => {
  const knownSecret = 'secret'
  const knownSecretNumberFormat = bigInt('115101099114101116')
  const randomSecret = fuzzer.string()
  const bigPrime = bigInt('22953686867719691230002707821868552601124472329079')

  describe('_padIntegerToLength', () => {
    it('pads number strings', () => {
      expect(_padIntegerToLength(4, 98)).to.equal('0098')
    })

    it('pads integer to any length', () => {
      const length = fuzzer.integer(200)
      expect(_padIntegerToLength(length, 8).length).to.equal(length)
    })
  })

  describe('_stringToBigInt', () => {
    it('encodes a string into a number', () => {
      expect(_stringToBigInt(knownSecret)).to.eql(knownSecretNumberFormat)
    })

    it('reverses _bigIntToString', () => {
      expect(_stringToBigInt(_bigIntToString(knownSecretNumberFormat))).to.eql(knownSecretNumberFormat)
    })
  })

  describe('_bigIntToString', () => {
    it('decodes a number into a string', () => {
      expect(_bigIntToString(knownSecretNumberFormat)).to.equal(knownSecret)
    })

    it('reverses _stringToBigInt', () => {
      expect(_bigIntToString(_stringToBigInt(knownSecret))).to.equal(knownSecret)
    })
  })

  describe('_modulusPolynomialFromBigIntArray', () => {
    const polynomial = [bigInt(4), bigInt(2), bigInt(1)]
    it('creates a polynomial evaluating function, modulus a given number', () => {
      expect(_modulusPolynomialFromBigIntArray(3, polynomial)(1)).to.eql(bigInt(1))
    })
  })

  describe('_split', () => {
    it('splits the secret into the correct number of parts', () => {
      const parts = fuzzer.integer(20)
      expect(_split(bigPrime, parts, 5)('secret').length).to.equal(parts)
    })

    it('splits the secret into strings', () => {
      expect(typeof _split(bigPrime, 2, 5)('secret')[0][1]).to.equal('string')
    })
  })

  describe('_reconstructNumber', () => {
    const partsToSplitInto = 6
    const minimumPartsToReconstruct = 3

    it('reverses encode', () => {
      const splitRes = _splitNumber(bigPrime, partsToSplitInto, minimumPartsToReconstruct)(knownSecretNumberFormat)
      const minParts = splitRes.slice(0, minimumPartsToReconstruct)
      expect(_reconstructNumber(bigPrime)(minParts)).to.eql(knownSecretNumberFormat)
    })
  })

  describe('ShamirSecretSharing', () => {
    const string = 'tommyiscool'
    const partsToSplitInto = 7
    const minimumPartsToReconstruct = 5

    const ShamirInstance = new ShamirSecretSharing(bigPrime, partsToSplitInto, minimumPartsToReconstruct)

    it('Splits and reconstructs strings', () => {
      expect(ShamirInstance.reconstruct(ShamirInstance.split(string))).to.eql(string)
    })
  })
})
