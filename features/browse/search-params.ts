import { createSearchParamsCache, parseAsString } from "nuqs/server"

export const browseSongParsers = {
  q: parseAsString.withDefault(""),
  chord: parseAsString.withDefault(""),
  assignee: parseAsString.withDefault(""),
}

export const searchParamsCache = createSearchParamsCache(browseSongParsers)
