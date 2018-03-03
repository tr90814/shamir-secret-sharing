const characters = 'abcdefghijklmnopqrstuvwxyz'

const createArrayOfLength = (length) => Array.from(new Array(length))

const padIntegerToLength = (length, string) => {
  string = '' + string

  while (string.length < length) {
    string = '0' + string
  }

  return string
}

module.exports = {
  characters,
  createArrayOfLength,
  padIntegerToLength
}
