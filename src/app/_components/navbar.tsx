"use client";

import { ReactNode } from "react";
import {
  ArrowLeftRight,
  AsteriskSquare,
  BarChart3,
  Fingerprint,
  KeyRound,
  Text,
  Wand2,
} from "lucide-react";

import { Separator } from "~/shared/components/separator";
import { NavbarItem } from "./navbar-item";

const Section = ({
  title,
  children,
}: {
  title: string;
  children: ReactNode;
}) => (
  <div className="space-y-1">
    <span className="px-3 text-sm opacity-70">{title}</span>
    <div>{children}</div>
  </div>
);

export function Navbar() {
  return (
    <div className="space-y-4 text-lg">
      <Section title="Text">
        <NavbarItem Icon={Text} title="Transform" path="/text/transform" />
        <NavbarItem
          disabled
          Icon={Wand2}
          title="Styling"
          path="/text/styling"
        />
        <NavbarItem
          disabled
          Icon={BarChart3}
          title="Statistics"
          path="/text/statistics"
        />
      </Section>

      <Separator />

      <Section title="Cryptography">
        <NavbarItem
          disabled
          Icon={AsteriskSquare}
          title="Ciphers"
          path="/cryptography/ciphers"
        />
        <NavbarItem
          disabled
          Icon={Fingerprint}
          title="Hash functions"
          path="/cryptography/hash"
        />
      </Section>

      <Separator />

      <Section title="Misc">
        <NavbarItem
          disabled
          Icon={ArrowLeftRight}
          title="Converter"
          path="/misc/converter"
        />
        <NavbarItem
          disabled
          Icon={KeyRound}
          title="Password Generator"
          path="/misc/password"
        />
      </Section>
    </div>
  );
}
