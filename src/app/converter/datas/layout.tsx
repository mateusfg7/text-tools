import { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Converter Data'
}

export default function ConverterDataLayout({
  children
}: {
  children: ReactNode
}) {
  return children
}
