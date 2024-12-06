import { DrumIcon, GuitarIcon, MicVocalIcon } from "lucide-react"

export function TeamMemberIcon({ designation }: { designation: string }) {
  if (designation.includes("Drummer"))
    return <DrumIcon className="text-muted-foreground ml-1 size-4" />

  if (designation.includes("Guitarist") || designation.includes("Bassist"))
    return <GuitarIcon className="text-muted-foreground ml-1 size-4" />

  if (designation.includes("Vocalist"))
    return <MicVocalIcon className="text-muted-foreground ml-1 size-4" />

  return null
}
