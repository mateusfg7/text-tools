import { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Hash'
}

export default function HashLayout({ children }: { children: ReactNode }) {
  return children
}
