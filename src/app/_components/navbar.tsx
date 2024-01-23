"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ReactNode } from "react";

const NavbarItem = ({
  title,
  path,
  disabled = false,
}: {
  title: string;
  path: string;
  disabled?: boolean;
}) => {
  const pathname = usePathname();

  const selected = pathname === path;

  const alertMessage = () => alert("Under construction");

  if (disabled) {
    return (
      <button
        onClick={alertMessage}
        className="flex w-full items-stretch gap-1 group hover:cursor-pointer opacity-60"
      >
        <span
          data-selected={selected}
          className="data-[selected='true']:bg-blue-600/70 w-1 rounded-full"
        />
        <span
          data-selected={selected}
          className="inline-flex data-[selected='true']:bg-slate-600/5 items-center gap-1 group-hover:bg-slate-600/10 px-1 py-1.5 leading-none rounded-lg flex-1"
        >
          <span>[X]</span>
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
        <span>[X]</span>
        <span>{title}</span>
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
    <span className="px-3 text-sm opacity-60">{title}</span>
    <div>{children}</div>
  </div>
);

const Divider = () => <div className="bg-slate-100 w-full rounded-full h-px" />;

export function Navbar() {
  return (
    <div className="space-y-4">
      <Section title="Text">
        <NavbarItem title="Transform" path="/text/transform" />
        <NavbarItem disabled title="Styling" path="/text/styling" />
        <NavbarItem disabled title="Statistics" path="/text/statistics" />
      </Section>

      <Divider />

      <Section title="Cryptography">
        <NavbarItem disabled title="Ciphers" path="/cryptography/ciphers" />
        <NavbarItem disabled title="Hash functions" path="/cryptography/hash" />
      </Section>

      <Divider />

      <Section title="Misc">
        <NavbarItem disabled title="Converter" path="/misc/converter" />
        <NavbarItem disabled title="Password Generator" path="/misc/password" />
      </Section>
    </div>
  );
}
