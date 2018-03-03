const bigInt = require('big-integer')
const { lagrangeProduct } = require('./lagrangeProduct')
const { characters, padIntegerToLength, createArrayOfLength } = require('./utilities')

const mapStringToNumber = (string) => {
  return bigInt(string.split('')
    .map((c) => padIntegerToLength(2, characters.indexOf(c))
    ).join(''))
}

const mapNumberToString = (number) => {
  return number.toString().match(/.{1,2}/g)
    .map((n) => characters[parseInt(n) % 27]).join('')
}

const stringToBigInt = (string) => {
  const characterNumbers = string.split('')
    .map((character) => padIntegerToLength(3, character.charCodeAt()))
  return bigInt(characterNumbers.join(''))
}

const bigIntToString = (number) => {
  return number.toString().match(/.{1,3}/g)
    .map((digits) => String.fromCharCode(parseInt(digits)))
    .join('')
}

const modulusPolynomialFromBigIntArray = (number, array) => (value) => {
  return array.reduce((acc, constant, index) => {
    const modProduct = bigInt(value).modPow(index, number)
    const summed = acc.add(bigInt(constant).times(modProduct))
    return summed.mod(number)
  }, bigInt(0))
}

const shareNumber = (prime, partsToSplitInto, minimumPartsToReconstruct) => (number) => {
  if (number >= prime) {
    throw new Error('Number/string too big/long')
  }

  const constant = bigInt(number)
  const numberOfCoefficients = minimumPartsToReconstruct - 1
  const randomCoefficients = createArrayOfLength(numberOfCoefficients).map(() => bigInt.randBetween(0, prime))
  const coefficients = [constant].concat(randomCoefficients)
  const polynomial = modulusPolynomialFromBigIntArray(prime, coefficients)

  return createArrayOfLength(partsToSplitInto)
    .map((el, index) => [index + 1, polynomial(index + 1).toString()])
}

const share = (prime, partsToSplitInto, minimumPartsToReconstruct) => (secretString) => {
  return shareNumber(prime, partsToSplitInto, minimumPartsToReconstruct)(mapStringToNumber(secretString))
}

const recoverNumber = (prime) => (secretParts) => {
  const constant = lagrangeProduct(secretParts)
  return constant.add(prime).mod(prime)
}

const recover = (prime) => (secretParts) => {
  const modulusBigInt = recoverNumber(prime)(secretParts)
  return mapNumberToString(modulusBigInt)
}

const bigPrime = () => bigInt('22953686867719691230002707821868552601124472329079')

module.exports = {
  share,
  shareNumber,
  recoverNumber,
  recover,
  stringToBigInt,
  bigIntToString,
  modulusPolynomialFromBigIntArray,
  bigPrime
}
