"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  AudioWaveformIcon,
  FolderIcon,
  MusicIcon,
  SearchIcon,
  UsersIcon,
} from "lucide-react"

import { cn } from "../../lib/utils"
import { buttonVariants } from "../ui/button"
import { AppUserButton } from "./app-user-button"

const menuItems = [
  {
    heading: "Discover",
    menu: [
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
    ],
  },
  {
    heading: "Manage",
    menu: [
      {
        path: "/members",
        label: "Members",
        Icon: UsersIcon,
      },
    ],
  },
]

export function Sidebar() {
  const pathname = usePathname()

  return (
    <div className="w-sidebar-width bg-background fixed inset-y-0 hidden h-screen flex-col space-y-6 border-r p-4 lg:flex">
      <div className="p-3 text-center">
        <span className="flex items-center gap-2 text-sm font-bold">
          <AudioWaveformIcon className="size-5 text-orange-500" /> GCC Worship
          Notes
        </span>
      </div>
      <nav className="flex-1 space-y-4">
        {menuItems.map((item) => (
          <div key={`menu-group-${item.heading}`}>
            <p className="mb-2 px-4 font-semibold">{item.heading}</p>
            {item.menu.map((menuItem) => (
              <Link
                key={`menu-group-item-${menuItem.label}`}
                href={menuItem.path}
                className={cn(
                  buttonVariants({
                    size: "sm",
                    variant:
                      pathname === "/" && menuItem.path === "/"
                        ? "default"
                        : pathname.includes(menuItem.path) &&
                            menuItem.path !== "/"
                          ? "default"
                          : "ghost",
                  }),
                  "mb-2 w-full justify-start font-medium"
                )}
              >
                <menuItem.Icon className="mr-2" /> {menuItem.label}
              </Link>
            ))}
          </div>
        ))}
      </nav>

      <div className="mt-auto">
        <AppUserButton />
      </div>
    </div>
  )
}
