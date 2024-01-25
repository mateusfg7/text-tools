'use client'

import { ReactNode } from 'react'
import {
  ArrowLeftRight,
  AsteriskSquare,
  BarChart3,
  Fingerprint,
  KeyRound,
  Text,
  Wand2,
} from 'lucide-react'

import { Separator } from '~/shared/components/separator'
import { NavbarItem } from './navbar-item'

const Section = ({
  title,
  children,
}: {
  title: string
  children: ReactNode
}) => (
  <div className="space-y-1">
    <span className="px-3 text-sm opacity-70">{title}</span>
    <div className="space-y-px">{children}</div>
  </div>
)

type Props = {
  isOnDrawer?: boolean
}
export function Navbar({ isOnDrawer = false }: Props) {
  return (
    <div className="space-y-4 text-lg p-7 md:p-0">
      <Section title="Text">
        <NavbarItem
          isOnDrawer={isOnDrawer}
          Icon={Text}
          title="Transform"
          path="/text/transform"
        />

        <NavbarItem
          isOnDrawer={isOnDrawer}
          disabled
          Icon={Wand2}
          title="Styling"
          path="/text/styling"
        />

        <NavbarItem
          isOnDrawer={isOnDrawer}
          Icon={BarChart3}
          title="Statistics"
          path="/text/statistics"
        />
      </Section>

      <Separator />

      <Section title="Cryptography">
        <NavbarItem
          isOnDrawer={isOnDrawer}
          disabled
          Icon={AsteriskSquare}
          title="Ciphers"
          path="/cryptography/ciphers"
        />

        <NavbarItem
          isOnDrawer={isOnDrawer}
          Icon={Fingerprint}
          title="Hash functions"
          path="/cryptography/hash"
        />
      </Section>

      <Separator />

      <Section title="Misc">
        <NavbarItem
          isOnDrawer={isOnDrawer}
          disabled
          Icon={ArrowLeftRight}
          title="Converter"
          path="/misc/converter"
        />

        <NavbarItem
          isOnDrawer={isOnDrawer}
          disabled
          Icon={KeyRound}
          title="Password Generator"
          path="/misc/password"
        />
      </Section>
    </div>
  )
}
