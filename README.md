## Shamir's Secret Sharing

An implementation of Shamir's secret sharing algorithm see [wiki article](https://en.wikipedia.org/wiki/Shamir%27s_Secret_Sharing).

#### How to use

```JS
const ShamirSecretSharing = require('shamir-secret-sharing')
const sharingInstance = new ShamirSecretSharing(6, 2)

const secretsToShare = sharingnIstance.share('thisisverysecret')

// => 
// [
//  '1_9af6c411bb1da840de2ecf08d38107592152c2e62',
//  '2_3aa39977284d7f152e4d58092e58a81fb84c25f1a',
//  '3_d59a5d88e36b27470129f7586ce114987ec302349',
//  '4_754732ee509afe1b51488058c7b8b55f15bc65401',
//  '5_14f40853bdcad4efa167095922905625acb5c84b9',
//  '6_afeacc6578e87d217443a8a86118c29e732ca48e8'
// ]

sharingInstance.recover(secretsToShare.slice(-2))

// => 'thisisverysecret'
```
