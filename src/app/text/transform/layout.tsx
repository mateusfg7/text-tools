import { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Transform'
}

export default function TransformLayout({ children }: { children: ReactNode }) {
  return children
}
