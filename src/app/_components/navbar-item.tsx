import { AlertTriangle, LucideIcon } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { toast } from "sonner";

export const NavbarItem = ({
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

  const alertMessage = () =>
    toast.warning(`Under construction`, {
      icon: (
        <AlertTriangle
          size="1em"
          className="text-base text-slate-950 dark:text-slate-100 fill-slate-950/20 dark:fill-slate-100/20"
        />
      ),
      description: `${title} page has not been developed yet.`,
    });

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
