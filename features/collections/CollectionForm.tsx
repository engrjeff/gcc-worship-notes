"use client"

import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { FolderPlusIcon } from "lucide-react"
import { useAction } from "next-safe-action/hooks"
import { useForm } from "react-hook-form"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { SubmitButton } from "@/components/ui/submit-button"

import { createCollection } from "./actions"
import { CollectionInputs, collectionSchema } from "./schema"

export function CollectionFormDialog() {
  const [open, setOpen] = useState(false)

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm">
          <FolderPlusIcon /> Add Folder
        </Button>
      </DialogTrigger>
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>New Collection</DialogTitle>
          <DialogDescription>Fill in the details below.</DialogDescription>
        </DialogHeader>
        <CollectionForm onAfterSave={() => setOpen(false)} />
      </DialogContent>
    </Dialog>
  )
}

function CollectionForm({ onAfterSave }: { onAfterSave: () => void }) {
  const form = useForm<CollectionInputs>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: "",
    },
  })

  const action = useAction(createCollection, {
    onError: ({ error }) => {
      if (error.serverError === "The given name is already in use.") {
        form.setFocus("name")
      }
      toast.error(
        error.serverError ?? "The collection was not created. Please try again."
      )
    },
  })

  function onError(errors: typeof form.formState.errors) {
    console.log(errors)
  }

  async function onSubmit(values: CollectionInputs) {
    const result = await action.executeAsync(values)

    if (result?.data?.collection?.id) {
      toast.success("Collection saved!")

      onAfterSave()
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit, onError)} autoComplete="off">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Collection name</FormLabel>
              <FormControl>
                <Input placeholder="Untitled collection" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="mt-6 flex flex-col-reverse sm:flex-row sm:justify-end sm:space-x-2">
          <DialogClose asChild>
            <Button type="button" variant="ghost" disabled={action.isPending}>
              Cancel
            </Button>
          </DialogClose>
          <SubmitButton type="submit" loading={action.isPending}>
            Create
          </SubmitButton>
        </div>
      </form>
    </Form>
  )
}
