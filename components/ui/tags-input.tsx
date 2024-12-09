// Add the following to tailwind.config.ts: "./node_modules/emblor/dist/index.mjs",

"use client"

import * as React from "react"
import { Tag, TagInput } from "emblor"

interface TagsInputProps {
  placeholder?: string
  value: { value: string }[]
  onValueChange: (tags: { value: string }[]) => void
}

const TagsInput = React.forwardRef<HTMLInputElement, TagsInputProps>(
  (props, ref) => {
    const [tags, setTags] = React.useState<Tag[]>(() =>
      props.value.map((v, idx) => ({ id: idx.toString(), text: v.value }))
    )
    const [activeTagIndex, setActiveTagIndex] = React.useState<number | null>(0)

    return (
      <TagInput
        ref={ref}
        tags={tags}
        placeholder={props.placeholder}
        setTags={(newTags) => {
          setTags(newTags)

          const newValue = newTags as [Tag, ...Tag[]]

          props.onValueChange(newValue.map((v) => ({ value: v.text })))
        }}
        styleClasses={{
          tagList: {
            container: "gap-1",
          },
          input:
            "border-input file:text-foreground placeholder:text-muted-foreground focus-visible:ring-ring flex h-10 w-full rounded-md border bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium focus-visible:outline-none focus-visible:ring-1 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          tag: {
            body: "relative h-7 ring-none ring-offset-0 ring-transparent bg-muted/60 border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
            closeButton:
              "absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-lg flex size-7 transition-colors outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground",
          },
        }}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
        inlineTags={false}
        inputFieldPosition="top"
      />
    )
  }
)

TagsInput.displayName = "TagsInput"

export { TagsInput }
