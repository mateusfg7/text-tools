import { ReactNode } from 'react'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Statistics'
}

export default function StatisticsLayout({
  children
}: {
  children: ReactNode
}) {
  return children
}
