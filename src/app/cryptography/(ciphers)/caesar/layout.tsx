import { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Caesar Cipher'
}

export default function CaesarCipherLayout({
  children
}: {
  children: ReactNode
}) {
  return children
}
