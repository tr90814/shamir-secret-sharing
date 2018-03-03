## Shamir's Secret Sharing

An implementation of Shamir's secret sharing algorithm see [wiki article](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing).

#### How to use

```JS
const ShamirSecretSharing = require('shamir-secret-sharing')

const sharingInstance = new ShamirSecretSharing(6, 2)
const secretsToShare = sharingnIstance.share('thisisverysecret')
// => 
// [
//   [ 1, '19675587604197859220423539702042757228705618586063' ],
//   [ 2, '16397488340676027191773553500395920132106362672628' ],
//   [ 3, '13119389077154195163123567298749083035507106759193' ],
//   [ 4, '9841289813632363134473581097102245938907850845758' ],
//   [ 5, '6563190550110531105823594895455408842308594932323' ],
//   [ 6, '3285091286588699077173608693808571745709339018888' ]
// ]

sharingInstance.recover(secretsToShare)
// => 'thisisverysecret'
```
