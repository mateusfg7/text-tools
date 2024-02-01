'use client'

import { ReactNode } from 'react'
import {
  ArrowLeftRight,
  BarChart3,
  CaseSensitive,
  Fingerprint,
  Heading1,
  KeyRound,
  List,
  MoreHorizontal,
  Text,
  Wand2
} from 'lucide-react'

import { NavbarItem } from './navbar-item'

const Section = ({
  title,
  children
}: {
  title: string
  children: ReactNode
}) => (
  <div className="space-y-1 border-b border-border py-4 first:pt-0 last:pb-0 last:border-none">
    <span className="px-3 text-sm opacity-70">{title}</span>
    <div className="space-y-px">{children}</div>
  </div>
)

type Props = {
  isOnDrawer?: boolean
}
export function Navbar({ isOnDrawer = false }: Props) {
  return (
    <div className="text-lg p-7 md:p-0 max-h-dvh overflow-y-auto md:max-h-[calc(100vh-9rem)] w-max">
      <Section title="Text">
        <NavbarItem
          isOnDrawer={isOnDrawer}
          Icon={Text}
          title="Transform"
          path="/text/transform"
        />
        <NavbarItem
          isOnDrawer={isOnDrawer}
          Icon={List}
          title="List"
          path="/text/list"
        />

        <NavbarItem
          isOnDrawer={isOnDrawer}
          Icon={BarChart3}
          title="Statistics"
          path="/text/statistics"
        />

        <NavbarItem
          isOnDrawer={isOnDrawer}
          disabled
          Icon={Wand2}
          title="Styling"
          path="/text/styling"
        />
      </Section>

      <Section title="Cryptography">
        <NavbarItem
          isOnDrawer={isOnDrawer}
          Icon={CaseSensitive}
          title="Caesar cipher"
          path="/cryptography/caesar"
        />
        <NavbarItem
          isOnDrawer={isOnDrawer}
          Icon={Heading1}
          title="Letter to number"
          path="/cryptography/letter-number"
        />
        <NavbarItem
          isOnDrawer={isOnDrawer}
          Icon={MoreHorizontal}
          title="Morse Code"
          path="/cryptography/morse"
        />
        <NavbarItem
          isOnDrawer={isOnDrawer}
          Icon={Fingerprint}
          title="Hash functions"
          path="/cryptography/hash"
        />
      </Section>

      <Section title="Misc">
        <NavbarItem
          isOnDrawer={isOnDrawer}
          Icon={KeyRound}
          title="Password Generator"
          path="/misc/password"
        />

        <NavbarItem
          isOnDrawer={isOnDrawer}
          disabled
          Icon={ArrowLeftRight}
          title="Converter"
          path="/misc/converter"
        />
      </Section>
    </div>
  )
}
