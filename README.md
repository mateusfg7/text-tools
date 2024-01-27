# Text Tools

**refs**:

- _https://convertcase.net/_
- _browserling.com/tools/all-hashes_

## Planned Features

_For v1.0_

- Text Transform
  - Sentence Case `mateus Felipe gonçalves -> Mateus felipe gonçalves`
  - Lowercase `Mateus Felipe -> mateus felipe`
  - Uppercase `Mateus Felipe -> MATEUS FELIPE`
  - Snake Case `MaTeus FeliPe -> mateus felipe`
  - Capitalized Case `mateUS feLipe -> Mateus Felipe`
  - Alternating Case `Mateus Felipe -> mAtEuS fElIpE`
  - Inverse Case `MatEus FeLiPe -> mATeUS fElIpE`
  - Reverse `Mateus Felipe -> epileF suetaM`
  - Text Statistics
    - Character Count
    - Word Count
    - Sentence Count
    - Line Count
- Generate Hashes (MD5, SHA1, SHA256...)
- Converter
  - `(HEX|BIN|DEC) -> (HEX|BIN|DEC)`
  - Base64
  - `(JSON|CSV) -> (JSON|CSV)`
  - URl Encoder/Decoder
- Ciphers
  - Caesar
  - ROT13
  - Rail Fence
  - Morse
- Password Generator

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

## More examples of transform

| Case     | Original                                                             | Transformed                                                          |
| -------- | -------------------------------------------------------------------- | -------------------------------------------------------------------- |
| Sentence | "i Like TURTLES. dO You? awesome! hahaha. lol!!! hat's Going on????" | "I like turtles. Do you? Awesome! Hahaha. Lol!!! Hat's going on????" |
