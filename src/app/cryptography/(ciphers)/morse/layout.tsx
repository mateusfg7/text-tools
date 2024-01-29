import { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Morse'
}

export default function MorseLayout({ children }: { children: ReactNode }) {
  return children
}
