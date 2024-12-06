"use client"

import { useAction } from "next-safe-action/hooks"
import { toast } from "sonner"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { SubmitButton } from "@/components/ui/submit-button"

import { deleteCollection } from "./actions"

export function CollectionDeleteDialog({
  open,
  setOpen,
  collectionId,
  collectionName,
}: {
  collectionId: string
  collectionName: string
  open: boolean
  setOpen: (state: boolean) => void
}) {
  const action = useAction(deleteCollection, {
    onError({ error }) {
      toast.error(
        error.serverError ?? "The collection was not deleted. Please try again."
      )
    },
    onSuccess() {
      toast.success("The collection was deleted successfully!")
    },
  })

  const handleDelete = async () => {
    const result = await action.executeAsync({ id: collectionId })
    if (result?.data?.status === "ok") {
      setOpen(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete <br />
            <span className="text-foreground text-center font-medium">
              {collectionName}
            </span>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction asChild>
            <SubmitButton
              type="button"
              variant="destructive"
              onClick={handleDelete}
              loading={action.isPending}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Continue
            </SubmitButton>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}
