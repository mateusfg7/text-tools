"use client";

import { ReactNode } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import {
  ArrowLeftRight,
  AsteriskSquare,
  BarChart3,
  Fingerprint,
  KeyRound,
  LucideIcon,
  Text,
  Wand2,
} from "lucide-react";

import { Separator } from "~/shared/components/separator";

const NavbarItem = ({
  title,
  path,
  Icon,
  disabled = false,
}: {
  title: string;
  path: string;
  Icon: LucideIcon;
  disabled?: boolean;
}) => {
  const pathname = usePathname();

  const selected = pathname === path;

  const alertMessage = () => alert("Under construction");

  if (disabled) {
    return (
      <button
        onClick={alertMessage}
        className="flex w-full items-stretch gap-1 group hover:cursor-pointer opacity-40"
      >
        <span
          data-selected={selected}
          className="data-[selected='true']:bg-blue-600/70 w-1 rounded-full"
        />
        <span
          data-selected={selected}
          className="inline-flex data-[selected='true']:bg-slate-600/5 items-center gap-1 group-hover:bg-slate-600/10 px-1 py-1.5 leading-none rounded-lg flex-1"
        >
          <Icon size="1em" className="text-base opacity-70" strokeWidth={1.5} />
          <span>{title}</span>
        </span>
      </button>
    );
  }

  return (
    <Link
      href={path}
      className="flex items-stretch gap-1 group hover:cursor-pointer"
    >
      <span
        data-selected={selected}
        className="data-[selected='true']:bg-blue-600/70 w-1 rounded-full"
      />
      <span
        data-selected={selected}
        className="inline-flex data-[selected='true']:bg-slate-600/5 items-center gap-1 group-hover:bg-slate-600/10 px-1 py-1.5 leading-none rounded-lg flex-1"
      >
        <Icon size="1em" className="text-base opacity-70" strokeWidth={1.5} />
        <span
          data-selected={selected}
          className="data-[selected='true']:font-bold"
        >
          {title}
        </span>
      </span>
    </Link>
  );
};

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
