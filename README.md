## Shamir's Secret Sharing

An implementation of Shamir's secret sharing algorithm see [wiki article](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing).

#### How to use

```JS
const ShamirSecretSharing = require('shamir-secret-sharing')

const sharingInstance = new ShamirSecretSharing(6, 2)
const secretsToShare = sharingnIstance.share('thisisverysecret')
// => ['234', '32345]

sharingInstance.recover([])
// => 'thisisverysecret'
```
