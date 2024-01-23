import { ReactNode } from "react";

const MenuItem = ({
  text,
  selected = false,
}: {
  text: string;
  selected?: boolean;
}) => (
  <div className="flex items-stretch gap-1 group hover:cursor-pointer">
    <span
      data-selected={selected}
      className="data-[selected='true']:bg-blue-600/70 w-1 rounded-full"
    />
    <span
      data-selected={selected}
      className="inline-flex data-[selected='true']:bg-slate-600/5 items-center gap-1 group-hover:bg-slate-600/10 px-1 py-1.5 leading-none rounded-lg flex-1"
    >
      <span>[X]</span>
      <span>{text}</span>
    </span>
  </div>
);

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

export default function Home() {
  return (
    <div className="flex flex-col gap-10">
      <div className="w-full flex items-end px-2">
        <h1 className="text-3xl">Website Title</h1>
      </div>
      <div className="flex-1 flex gap-20">
        <div className="space-y-4">
          <Section title="Text">
            <MenuItem text="Transform" selected />
            <MenuItem text="Styling" />
            <MenuItem text="Statistics" />
          </Section>

          <Divider />

          <Section title="Cryptography">
            <MenuItem text="Ciphers" />
            <MenuItem text="Hash functions" />
          </Section>

          <Divider />

          <Section title="Misc">
            <MenuItem text="Converter" />
            <MenuItem text="Password Generator" />
          </Section>
        </div>
        <div className="flex-1">
          <h2>Text Transform</h2>
        </div>
      </div>
    </div>
  );
}
