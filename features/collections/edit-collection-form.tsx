"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { SongCollection } from "@prisma/client"
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

import { updateCollection } from "./actions"
import { CollectionInputs, collectionSchema } from "./schema"

interface EditCollectionFormDialogProps {
  open: boolean
  setOpen: (v: boolean) => void
  noTrigger?: boolean
  collection: SongCollection
}

export function EditCollectionFormDialog({
  open,
  setOpen,
  noTrigger,
  collection,
}: EditCollectionFormDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      {noTrigger ? (
        <DialogTrigger asChild>
          <Button size="sm">
            <FolderPlusIcon /> Add Folder
          </Button>
        </DialogTrigger>
      ) : null}
      <DialogContent
        className="sm:max-w-[425px]"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <DialogHeader>
          <DialogTitle>Edit Collection</DialogTitle>
          <DialogDescription>Fill in the details below.</DialogDescription>
        </DialogHeader>
        <EditCollectionForm
          collection={collection}
          onAfterSave={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  )
}

function EditCollectionForm({
  onAfterSave,
  collection,
}: {
  onAfterSave: () => void
  collection: SongCollection
}) {
  const form = useForm<CollectionInputs>({
    resolver: zodResolver(collectionSchema),
    defaultValues: {
      name: collection.name,
    },
  })

  const action = useAction(updateCollection, {
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
    const result = await action.executeAsync({
      id: collection.id,
      name: values.name,
    })

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
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <DialogClose asChild>
            <Button type="button" variant="ghost" disabled={action.isPending}>
              Cancel
            </Button>
          </DialogClose>
          <SubmitButton type="submit" loading={action.isPending}>
            Save Changes
          </SubmitButton>
        </div>
      </form>
    </Form>
  )
}
