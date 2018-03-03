const { split, recover, bigPrime } = require('./lib/index')

function ShamirSecretSharing (partsToSplitInto, minimumPartsToRecover, prime) {
  this.prime = prime || bigPrime()
  this.split = split(this.prime, partsToSplitInto, minimumPartsToRecover)
  this.reconstruct = recover(this.prime)
}

module.exports = ShamirSecretSharing
