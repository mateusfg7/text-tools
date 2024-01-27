import CryptoJs from 'crypto-js'

export type HashApiBody = {
  data: string
}

export type HashApiResponse = {
  MD5: string
  SHA1: string
  SHA3: string
  SHA224: string
  SHA256: string
  SHA384: string
  SHA512: string
}

export async function POST(request: Request) {
  const { data }: HashApiBody = await request.json()
  const { MD5, SHA1, SHA224, SHA256, SHA3, SHA384, SHA512 } = CryptoJs

  //   const hashes = {
  //     argon2d: await Bun.password.hash(data, 'argon2d'),
  //     bcrypt: await Bun.password.hash(data, 'bcrypt'),
  //     blake2b256: new Bun.CryptoHasher('blake2b256').update(data).digest('hex'),
  //     md4: new Bun.CryptoHasher('md4').update(data).digest('hex'),
  //     md5: new Bun.CryptoHasher('md5').update(data).digest('hex'),
  //     ripemd160: new Bun.CryptoHasher('ripemd160').update(data).digest('hex'),
  //     sha1: new Bun.CryptoHasher('sha1').update(data).digest('hex'),
  //     sha224: new Bun.CryptoHasher('sha224').update(data).digest('hex'),
  //     sha256: new Bun.CryptoHasher('sha256').update(data).digest('hex'),
  //     sha384: new Bun.CryptoHasher('sha384').update(data).digest('hex'),
  //     sha512: new Bun.CryptoHasher('sha512').update(data).digest('hex'),
  //     'sha512-256': new Bun.CryptoHasher('sha512-256').update(data).digest('hex'),
  //   }

  // crypto.createHash('sha224').toString()

  const hashes = {
    MD5: MD5(data).toString(),
    SHA1: SHA1(data).toString(),
    SHA3: SHA3(data).toString(),
    SHA224: SHA224(data).toString(),
    SHA256: SHA256(data).toString(),
    SHA384: SHA384(data).toString(),
    SHA512: SHA512(data).toString()
  }

  return new Response(JSON.stringify(hashes))
}

export const runtime = 'nodejs'
