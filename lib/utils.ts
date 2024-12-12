import { TeamMember } from "@prisma/client"
import { clsx, type ClassValue } from "clsx"
import { intlFormatDistance } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function getInitials(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((s) => s.substring(0, 1))
    .join("")
}

export function formatDate(dateInput: number | string | Date) {
  // return format(new Date(dateInput), "MMM dd, yyyy")
  return intlFormatDistance(new Date(dateInput), new Date(), { style: "short" })
}

const memberNameMap = {
  "Eugene Ababa": "Uge",
  "Leslie Henoguin": "Les",
  "Rosa Sahagun": "Rosa",
  "Pastor John": "Pas J",
  "Kim Lopez": "Kim",
  "Daniel John Baja": "Daniel",
}

export function formatAssignees(assignees: TeamMember[]) {
  return assignees
    .map((a) => memberNameMap[a.name as keyof typeof memberNameMap])
    .join(", ")
}

export function getYouTubeVideoIds(urls: string[]) {
  const youtubeVideoIds =
    urls
      .map((u) => {
        try {
          if (!u.includes("youtube.com")) return false

          const parsedUrl = new URL(u)

          const domain = parsedUrl.hostname

          if (!domain.includes("youtube.com")) return false

          const videoId = parsedUrl.searchParams.get("v")

          if (!videoId) return false

          return videoId
        } catch {
          return false
        }
      })
      .filter(Boolean) ?? []

  const unique = Array.from(new Set(youtubeVideoIds))

  return unique as string[]
}
