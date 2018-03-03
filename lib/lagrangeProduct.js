const bigInt = require('big-integer')

const getProduct = (j, points) => {
  let product = 1

  for (let i = 0; i < points.length; i++) {
    if (i !== j) {
      product = product * (points[i][0] / (points[i][0] - points[j][0]))
    }
  }

  return product
}

const lagrangeProduct = (points) => {
  return points.reduce((acc, next, j) => {
    const product = getProduct(j, points)
    return acc.add(bigInt(next[1], 16).times(product))
  }, bigInt(0))
}

module.exports = {
  lagrangeProduct
}
