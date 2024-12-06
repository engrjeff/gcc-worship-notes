"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { FolderIcon, MusicIcon, SearchIcon, UsersIcon } from "lucide-react"

const menuItems = [
  {
    path: "/",
    label: "Browse",
    Icon: SearchIcon,
  },
  {
    path: "/songs",
    label: "Songs",
    Icon: MusicIcon,
  },
  {
    path: "/collections",
    label: "Collections",
    Icon: FolderIcon,
  },
  {
    path: "/members",
    label: "Members",
    Icon: UsersIcon,
  },
]

export function MobileNav() {
  const pathname = usePathname()

  return (
    <nav className="fixed inset-x-4 bottom-4 lg:hidden">
      <ul className="bg-muted/80 mx-auto flex h-16 max-w-[425px] items-center justify-evenly gap-2 rounded-full p-2 backdrop-blur-lg">
        {menuItems.map((menu) => (
          <li key={`mobile-nav-${menu.label}`}>
            <Link
              href={menu.path}
              prefetch
              className="group flex flex-col items-center gap-1 rounded-full"
              data-active={
                pathname === "/" && menu.path === "/"
                  ? true
                  : pathname.includes(menu.path) && menu.path !== "/"
                    ? true
                    : false
              }
            >
              <div className="group-data-[active=true]:bg-primary/20 group-data-[active=true]:text-primary rounded-full px-3 py-1">
                <menu.Icon size={18} />
              </div>
              <span className="text-muted-foreground group-data-[active=true]:text-foreground text-xs">
                {menu.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
