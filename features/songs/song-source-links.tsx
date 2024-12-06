import { ArrowRightIcon } from "lucide-react"

import { FaviconImage } from "@/components/shared/favicon-image"

export function SongSourceLinks({ sources }: { sources: string[] }) {
  if (!sources?.length)
    return (
      <div>
        <p>No sources listed for this song.</p>
      </div>
    )

  return (
    <div className="max-w-full">
      <h2 className="mb-3 font-semibold">Sources from the Web</h2>
      <ul className="space-y-3">
        {sources.map((source, idx) => (
          <li key={`song-source-${idx + 1}`}>
            <a
              href={source}
              target="_blank"
              className="hover:bg-muted/30 group flex items-center gap-3 rounded-full border px-2.5 py-2"
            >
              <FaviconImage url={source} size={24} />
              <p
                className="line-clamp-1 max-w-full font-mono text-sm"
                style={{
                  width: "260px",
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                }}
              >
                {source}
              </p>

              <ArrowRightIcon
                size={16}
                className="ml-auto shrink-0 transition-transform group-hover:translate-x-1"
              />
            </a>
          </li>
        ))}
      </ul>
    </div>
  )
}
