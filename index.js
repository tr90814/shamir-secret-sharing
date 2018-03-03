const { _split, _reconstruct } = require('./lib/index')

function ShamirSecretSharing (prime, partsToSplitInto, minimumPartsToReconstruct) {
  this.split = _split(prime, partsToSplitInto, minimumPartsToReconstruct)
  this.reconstruct = _reconstruct(prime)
}

module.exports = {
  ShamirSecretSharing
}
