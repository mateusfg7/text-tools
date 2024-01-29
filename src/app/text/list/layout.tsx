import { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'List'
}

export default function ListLayout({ children }: { children: ReactNode }) {
  return children
}
