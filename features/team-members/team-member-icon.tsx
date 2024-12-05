import { DrumIcon, GuitarIcon, MicVocalIcon } from "lucide-react"

export function TeamMemberIcon({ designation }: { designation: string }) {
  if (designation.includes("Drummer"))
    return <DrumIcon className="size-4 text-muted-foreground ml-1" />

  if (designation.includes("Guitarist") || designation.includes("Bassist"))
    return <GuitarIcon className="size-4 text-muted-foreground ml-1" />

  if (designation.includes("Vocalist"))
    return <MicVocalIcon className="size-4 text-muted-foreground ml-1" />

  return null
}
