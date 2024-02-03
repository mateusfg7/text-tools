// ref: https://stackoverflow.com/a/41452318
// Generate a random integer r with equal chance in  min <= r < max.
export function randRange(min: number, max: number) {
  var range = max - min
  if (range <= 0) {
    throw new Error('max must be larger than min')
  }
  var requestBytes = Math.ceil(Math.log2(range) / 8)
  if (!requestBytes) {
    // No randomness required
    return min
  }
  var maxNum = Math.pow(256, requestBytes)
  var ar = new Uint8Array(requestBytes)

  while (true) {
    window.crypto.getRandomValues(ar)

    var val = 0
    for (var i = 0; i < requestBytes; i++) {
      val = (val << 8) + ar[i]
    }

    if (val < maxNum - (maxNum % range)) {
      return min + (val % range)
    }
  }
}
