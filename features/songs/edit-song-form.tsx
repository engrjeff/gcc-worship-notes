"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { zodResolver } from "@hookform/resolvers/zod"
import { Song, TeamMember } from "@prisma/client"
import { PlusIcon, XIcon } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useFieldArray, useForm, useFormContext } from "react-hook-form"
import { toast } from "sonner"

import { chordKeyOptions } from "@/lib/constants"
import { Button, buttonVariants } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { MinimalTiptapEditor } from "@/components/ui/minimal-tiptap"
import { NativeSelect } from "@/components/ui/native-select"
import { Separator } from "@/components/ui/separator"
import { SubmitButton } from "@/components/ui/submit-button"
import { FaviconImage } from "@/components/shared/favicon-image"

import { updateSongNote } from "./actions"
import { AssigneeSelect } from "./assignee-select"
import { SongInputs, songSchema } from "./schema"
import { YouTubeLinksPreviews } from "./youtube-links-preview"

interface EditSongFormProps {
  song: Song & { assignees: TeamMember[] }
}

export function EditSongForm({ song }: EditSongFormProps) {
  const router = useRouter()

  const defaultValues: SongInputs = {
    title: song.title,
    chordKey: song.chordKey,
    lyrics: song.lyrics,
    assignees: song.assignees.map((a) => ({ id: a.id })),
    sources: song.sources.map((s) => ({ url: s })),
  }

  const form = useForm<SongInputs>({
    mode: "onBlur",
    resolver: zodResolver(songSchema),
    defaultValues,
  })

  const sources = useFieldArray({ control: form.control, name: "sources" })

  const action = useAction(updateSongNote, {
    onError: ({ error }) => {
      toast.error(
        error.serverError ?? "The song was not updated. Please try again."
      )
    },
  })

  const currentSources = form.watch("sources")

  function onError(errors: typeof form.formState.errors) {
    console.log(errors)
  }

  async function onSubmit(values: SongInputs) {
    const result = await action.executeAsync({
      id: song.id,
      ...values,
    })

    if (result?.data?.song?.id) {
      toast.success("Song changes saved!")

      router.replace("/songs")
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} className="my-6">
        <fieldset
          className="space-y-3 disabled:opacity-90"
          disabled={action.isPending}
        >
          <legend className="text-sm font-semibold">Song Details</legend>

          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input autoFocus placeholder="Enter song title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="chordKey"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Key</FormLabel>
                <FormControl>
                  <NativeSelect className="normal-case" {...field}>
                    <option value="">Select song key</option>
                    {chordKeyOptions.map((option) => (
                      <option key={`chord-key-${option}`} value={option}>
                        {option}
                      </option>
                    ))}
                  </NativeSelect>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="assignees"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Assignees</FormLabel>
                <FormControl>
                  <AssigneeSelect
                    selectedIds={field.value.map((v) => v.id)}
                    onValueChange={field.onChange}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="lyrics"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Lyrics</FormLabel>
                <FormControl>
                  <MinimalTiptapEditor
                    className="max-h-[400px] w-full overflow-y-auto"
                    editorContentClassName="p-4 text-white"
                    output="html"
                    placeholder="Type song lyrics here"
                    editable={true}
                    editorClassName="focus:outline-none text-white"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="space-y-3">
            <div>
              <p className="mb-1 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                Sources
              </p>
              <p className="text-muted-foreground text-xs">
                Links to websites.
              </p>
            </div>
            {sources.fields?.map((source, index) => (
              <SourceUrlInput
                key={source.id}
                index={index}
                onDelete={() => sources.remove(index)}
              />
            ))}
            <Button
              type="button"
              variant="secondary"
              onClick={async () => {
                const validSoFar = await form.trigger(
                  `sources.${currentSources.length - 1}`,
                  { shouldFocus: true }
                )

                if (!validSoFar) return

                sources.append({ url: "" })
              }}
            >
              <PlusIcon />{" "}
              {sources.fields.length === 0 ? "Add Source" : "Add more"}
            </Button>
          </div>

          <div className="flex items-center justify-end gap-4 pt-6">
            <Link
              href="/songs"
              className={buttonVariants({ variant: "outline" })}
            >
              Cancel
            </Link>
            <SubmitButton type="submit" loading={action.isPending}>
              Save Changes
            </SubmitButton>
          </div>
        </fieldset>
      </form>
      <Separator className="mb-6" />
      <YouTubeLinksPreviews
        urls={currentSources.map((s) => s.url)}
        className="space-y-4"
      />
    </Form>
  )
}

function SourceUrlInput({
  index,
  onDelete,
}: {
  index: number
  onDelete: () => void
}) {
  const form = useFormContext<SongInputs>()

  return (
    <FormField
      control={form.control}
      name={`sources.${index}.url`}
      render={({ field }) => (
        <FormItem>
          <FormControl>
            <div className="relative">
              <span className="absolute inset-y-1 start-0.5 flex size-7 items-center justify-center p-px disabled:cursor-not-allowed">
                <FaviconImage url={field.value} />
              </span>
              <Input
                aria-label={`Source No. ${index + 1}`}
                placeholder="https://source.org/example"
                type="url"
                inputMode="url"
                {...field}
                className="px-8"
              />
              <Button
                type="button"
                size="icon"
                variant="ghost"
                className="absolute inset-y-1 end-1 size-7 disabled:cursor-not-allowed"
                aria-label="delete"
                tabIndex={-1}
                onClick={onDelete}
              >
                <XIcon size={16} strokeWidth={2} aria-hidden="true" />
              </Button>
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
