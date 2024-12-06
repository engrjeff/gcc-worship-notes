import { clsx, type ClassValue } from "clsx"
import { format } from "date-fns"
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
  return format(new Date(dateInput), "MMM dd, yyyy")
}
