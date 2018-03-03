const bigInt = require('big-integer')

const characters = 'abcdefghijklmnopqrstuvwxyz'

const _mapStringToNumber = (string) => {
  return bigInt(string.split('').map((c) => _padIntegerToLength(2, characters.indexOf(c))).join(''))
}

const _mapNumberToString = (number) => {
  return number.toString().match(/.{1,2}/g)
    .map((n) => characters[parseInt(n) % 27]).join('')
}

const _createArrayOfLength = (length) => Array.from(new Array(length))

const _padIntegerToLength = (length, string) => {
  string = '' + string

  while (string.length < length) {
    string = '0' + string
  }

  return string
}

const _stringToBigInt = (string) => {
  const characterNumbers = string.split('')
    .map((character) => _padIntegerToLength(3, character.charCodeAt()))
  return bigInt(characterNumbers.join(''))
}

const _bigIntToString = (number) => {
  return number.toString().match(/.{1,3}/g)
    .map((digits) => String.fromCharCode(parseInt(digits)))
    .join('')
}

const _modulusPolynomialFromBigIntArray = (number, array) => (value) => {
  return array.reduce((acc, constant, index) => {
    const modProduct = bigInt(value).modPow(index, number)
    const summed = acc.add(bigInt(constant).times(modProduct))
    return summed.mod(number)
  }, bigInt(0))
}

const _getProduct = (j, points) => {
  let product = 1

  for (i = 0; i < points.length; i++) {
    if (i !== j) {
      product = product * (points[i][0] / (points[i][0] - points[j][0]))
    }
  }

  return product
}

const _lagrangeProduct = (points) => {
  return points.reduce((acc, next, j) => {
    const product = _getProduct(j, points)
    return acc.add(bigInt(next[1]).times(product))
  }, bigInt(0))
}

const _splitNumber = (prime, partsToSplitInto, minimumPartsToReconstruct) => (number) => {
  if (number >= prime) {
    throw new Error('Number/string too big/long')
  }

  const constant = bigInt(number)
  const numberOfCoefficients = minimumPartsToReconstruct - 1
  const randomCoefficients = _createArrayOfLength(numberOfCoefficients).map(() => bigInt.randBetween(0, prime))
  const coefficients = [constant].concat(randomCoefficients)
  const polynomial = _modulusPolynomialFromBigIntArray(prime, coefficients)

  return _createArrayOfLength(partsToSplitInto)
    .map((el, index) => [index + 1, polynomial(index + 1).toString()])
}

const _split = (prime, partsToSplitInto, minimumPartsToReconstruct) => (secretString) => {
  return _splitNumber(prime, partsToSplitInto, minimumPartsToReconstruct)(_mapStringToNumber(secretString))
}

const _reconstructNumber = (prime) => (secretParts) => {
  const constant = _lagrangeProduct(secretParts)
  return constant.add(prime).mod(prime)
}

const _reconstruct = (prime) => (secretParts) => {
  const modulusBigInt = _reconstructNumber(prime)(secretParts)
  return _mapNumberToString(modulusBigInt)
}

function ShamirSecretSharing (prime, partsToSplitInto, minimumPartsToReconstruct) {
  this.split = _split(prime, partsToSplitInto, minimumPartsToReconstruct)
  this.reconstruct = _reconstruct(prime)
}

module.exports = {
  ShamirSecretSharing,
  _split,
  _splitNumber,
  _reconstructNumber,
  _reconstruct,
  _stringToBigInt,
  _bigIntToString,
  _modulusPolynomialFromBigIntArray,
  _lagrangeProduct,
  _getProduct,
  _padIntegerToLength,
}