import { AlertTriangle, LucideIcon } from 'lucide-react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { ReactNode } from 'react'
import { toast } from 'sonner'
import { DrawerClose } from '~/shared/components/drawer'

export const NavbarItem = ({
  title,
  path,
  Icon,
  disabled = false,
  isOnDrawer = false,
}: {
  title: string
  path: string
  Icon: LucideIcon
  disabled?: boolean
  isOnDrawer?: boolean
}) => {
  const pathname = usePathname()

  const selected = pathname === path

  const alertMessage = () =>
    toast.warning(`Under construction`, {
      icon: (
        <AlertTriangle
          size="1em"
          className="text-base text-slate-950 dark:text-slate-100 fill-slate-950/20 dark:fill-slate-100/20"
        />
      ),
      description: `${title} page has not been developed yet.`,
    })

  const DrawerCloserWrapper = ({ children }: { children: ReactNode }) =>
    isOnDrawer ? <DrawerClose asChild>{children}</DrawerClose> : children

  if (disabled) {
    return (
      <DrawerCloserWrapper>
        <button
          onClick={alertMessage}
          className="flex w-full items-stretch gap-1 group hover:cursor-pointer opacity-40"
        >
          <span
            data-selected={selected}
            className="data-[selected='true']:bg-primary w-1 rounded-full"
          />
          <span
            data-selected={selected}
            className="inline-flex data-[selected='true']:bg-primary-foreground text-primary items-center gap-1 group-hover:bg-accent group-hover:text-accent-foreground px-1 py-1.5 leading-none rounded-lg flex-1"
          >
            <Icon
              size="1em"
              className="text-base opacity-70"
              strokeWidth={1.5}
            />
            <span
              data-selected={selected}
              className="data-[selected='true']:font-bold"
            >
              {title}
            </span>
          </span>
        </button>
      </DrawerCloserWrapper>
    )
  }

  return (
    <DrawerCloserWrapper>
      <Link
        href={path}
        className="flex items-stretch gap-1 group hover:cursor-pointer"
      >
        <span
          data-selected={selected}
          className="data-[selected='true']:bg-primary w-1 rounded-full"
        />
        <span
          data-selected={selected}
          className="inline-flex data-[selected='true']:bg-primary-foreground text-primary items-center gap-1 group-hover:bg-accent group-hover:text-accent-foreground px-1 py-1.5 leading-none rounded-lg flex-1"
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
    </DrawerCloserWrapper>
  )
}
