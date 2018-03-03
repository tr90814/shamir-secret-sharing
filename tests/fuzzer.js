const randomString = require('randomstring')

const integer = (maxValue = 10000) => {
  return Math.floor(Math.random() * maxValue)
}

module.exports = {
  string: randomString.generate,
  integer
}
