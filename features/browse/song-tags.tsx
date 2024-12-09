"use client"

import * as React from "react"
import Link from "next/link"
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react"

import { cn } from "@/lib/utils"
import { useSongTags } from "@/hooks/use-song-tags"
import { Button } from "@/components/ui/button"
import { ScrollArea, ScrollBar } from "@/components/ui/scroll-area"
import { Skeleton } from "@/components/ui/skeleton"

export function SongTags({
  tagQuery,
  viewQuery,
}: {
  tagQuery?: string
  viewQuery?: string
}) {
  console.log(tagQuery)

  const songTagsQuery = useSongTags()

  const scrollAreaRef = React.useRef<HTMLDivElement>(null)

  const [shownArrow, setShownArrow] = React.useState<"left" | "right">("right")

  React.useEffect(() => {
    if (!scrollAreaRef.current) return

    if (!songTagsQuery.data) return

    const scrollableElement = scrollAreaRef.current.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLElement

    if (!scrollableElement) return

    const activeTag =
      scrollableElement.querySelector<HTMLAnchorElement>("[data-active=true]")

    if (!activeTag) return

    // focus the default active tag
    if (activeTag.offsetLeft > scrollableElement.clientWidth - 100) {
      scrollableElement.scrollTo({
        left: activeTag.offsetLeft,
        behavior: "smooth",
      })

      setShownArrow("left")
    }
  }, [songTagsQuery.data])

  React.useEffect(() => {
    if (!scrollAreaRef.current) return

    const scrollableElement = scrollAreaRef.current.querySelector(
      "[data-radix-scroll-area-viewport]"
    ) as HTMLDivElement

    if (!scrollableElement) return

    function updateArrows() {
      if (scrollableElement.scrollLeft === 0) {
        setShownArrow("right")
      } else {
        setShownArrow("left")
      }
    }

    scrollableElement.addEventListener("scrollend", updateArrows)

    return () => {
      scrollableElement.removeEventListener("scrollend", updateArrows)
    }
  }, [])

  const scroll = (direction: "left" | "right") => {
    if (scrollAreaRef.current) {
      const scrollableElement = scrollAreaRef.current.querySelector(
        "[data-radix-scroll-area-viewport]"
      ) as HTMLElement
      if (scrollableElement) {
        const scrollAmount = 700 // Adjust this value to change scroll distance
        const currentScroll = scrollableElement.scrollLeft
        const newScroll =
          direction === "left"
            ? currentScroll - scrollAmount
            : currentScroll + scrollAmount

        scrollableElement.scrollTo({
          left: newScroll,
          behavior: "smooth",
        })

        if (direction === "left") {
          setShownArrow("right")
        }
        if (direction === "right") {
          setShownArrow("left")
        }
      }
    }
  }

  if (songTagsQuery.isLoading) {
    return (
      <div className="relative max-w-full">
        <div className="w-full overflow-hidden">
          <div className={cn("flex items-center py-2")}>
            {Array.from(Array(10).keys())?.map((n) => (
              <Skeleton
                key={`loading-song-tag-${n}`}
                className="w-20 h-7 animate-pulse bg-muted/80 mr-2 last:mr-0"
              />
            ))}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="relative max-w-full">
      <ScrollArea ref={scrollAreaRef} className="w-full">
        <div className={cn("flex items-center py-2")}>
          <Link
            key="song-tag-all"
            href={{
              pathname: "/",
              query: {
                ...(viewQuery && { view: viewQuery }),
              },
            }}
            data-active={tagQuery === undefined}
            className={cn(
              "bg-muted/80 text-foreground mr-2 flex-none rounded-md px-3 py-1 text-sm font-medium last:mr-0",
              tagQuery === undefined
                ? "bg-foreground text-background hover:bg-foreground"
                : "hover:bg-muted"
            )}
          >
            All
          </Link>
          {songTagsQuery.data?.map((tag, tagIndex) => (
            <Link
              key={`song-tag-${tagIndex}`}
              href={
                tag === tagQuery
                  ? {
                      pathname: "/",
                      query: {
                        ...(viewQuery && { view: viewQuery }),
                      },
                    }
                  : {
                      pathname: "/",
                      query: {
                        tag,
                        ...(viewQuery && { view: viewQuery }),
                      },
                    }
              }
              data-active={tag === tagQuery}
              className={cn(
                "bg-muted/80 text-foreground mr-2 flex-none rounded-md px-3 py-1 text-sm font-medium last:mr-0",
                tag === tagQuery
                  ? "bg-foreground text-background hover:bg-foreground"
                  : "hover:bg-muted"
              )}
            >
              {tag}
            </Link>
          ))}

          {/* Left fade effect */}
          <div
            className={cn(
              "from-background pointer-events-none absolute inset-y-0 left-0 h-auto w-[100px] shrink-0 bg-gradient-to-r to-transparent",
              shownArrow === "right" ? "opacity-0" : ""
            )}
          />
          {/* Right fade effect */}
          <div
            className={cn(
              "from-background pointer-events-none absolute inset-y-0 right-0 h-auto w-[100px] shrink-0 bg-gradient-to-l to-transparent",
              shownArrow === "left" ? "opacity-0" : ""
            )}
          ></div>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className={cn(
              "absolute right-0 shrink-0 rounded-full",
              shownArrow === "left" ? "pointer-events-none opacity-0" : ""
            )}
          >
            <ChevronRightIcon className="size-4" />
          </Button>

          <Button
            variant="ghost"
            size="icon"
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className={cn(
              "absolute left-0 shrink-0 rounded-full",
              shownArrow === "right" ? "pointer-events-none opacity-0" : ""
            )}
          >
            <ChevronLeftIcon className="size-4" />
          </Button>
        </div>

        <ScrollBar orientation="horizontal" />
      </ScrollArea>
    </div>
  )
}
