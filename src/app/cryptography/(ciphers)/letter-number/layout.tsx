import { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Letter to Number'
}

export default function LetterToNumberLayout({
  children
}: {
  children: ReactNode
}) {
  return children
}
