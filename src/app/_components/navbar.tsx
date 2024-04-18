'use client'

import { ReactNode } from 'react'
import {
  ArrowLeftRight,
  BarChart3,
  Binary,
  CaseSensitive,
  Fingerprint,
  FolderTree,
  Heading1,
  KeyRound,
  List,
  LockKeyhole,
  MoreHorizontal,
  Text
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
    <div className="text-lg p-7 md:p-0 max-h-dvh overflow-y-auto md:max-h-[98vh] w-max">
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
      </Section>

      <Section title="Security & Ciphers">
        <NavbarItem
          isOnDrawer={isOnDrawer}
          Icon={CaseSensitive}
          title="Caesar cipher"
          path="/security/caesar"
        />
        <NavbarItem
          isOnDrawer={isOnDrawer}
          Icon={Heading1}
          title="Letter to number"
          path="/security/letter-number"
        />
        <NavbarItem
          isOnDrawer={isOnDrawer}
          Icon={MoreHorizontal}
          title="Morse Code"
          path="/security/morse"
        />
        <NavbarItem
          isOnDrawer={isOnDrawer}
          Icon={Fingerprint}
          title="Hash functions"
          path="/security/hash"
        />
        <NavbarItem
          isOnDrawer={isOnDrawer}
          Icon={LockKeyhole}
          title="Base64"
          path="/security/base64"
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
          Icon={FolderTree}
          title="Ascii File Tree"
          path="/misc/tree"
        />
      </Section>

      <Section title="Converters">
        <NavbarItem
          isOnDrawer={isOnDrawer}
          Icon={Binary}
          title="Bases"
          path="/converter/bases"
        />
        <NavbarItem
          isOnDrawer={isOnDrawer}
          Icon={ArrowLeftRight}
          title="Datas"
          path="/converter/datas"
        />
      </Section>
    </div>
  )
}
