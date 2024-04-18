import { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Password'
}

export default function PasswordLayout({ children }: { children: ReactNode }) {
  return children
}
