const { share, recover, bigPrime } = require('./lib/index')

function ShamirSecretSharing (partsToSplitInto, minimumPartsToRecover, prime) {
  this.prime = prime || bigPrime()
  this.share = share(this.prime, partsToSplitInto, minimumPartsToRecover)
  this.recover = recover(this.prime)
}

module.exports = ShamirSecretSharing
