import { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'ASCII File Tree'
}

export default function TreeLayout({ children }: { children: ReactNode }) {
  return children
}
