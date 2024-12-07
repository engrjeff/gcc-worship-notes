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

import { deleteSongNote } from "./actions"

export function SongDeleteDialog({
  open,
  setOpen,
  songId,
  songTitle,
}: {
  songId: string
  songTitle: string
  open: boolean
  setOpen: (state: boolean) => void
}) {
  const action = useAction(deleteSongNote, {
    onError({ error }) {
      toast.error(
        error.serverError ?? "The song was not deleted. Please try again."
      )
    },
    onSuccess() {
      toast.success("The song was deleted successfully!")
    },
  })

  const handleDelete = async () => {
    const result = await action.executeAsync({ id: songId })
    if (result?.data?.status === "ok") {
      setOpen(false)
    }
  }

  return (
    <AlertDialog open={open} onOpenChange={setOpen}>
      <AlertDialogContent>
        <AlertDialogHeader className="text-left">
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete{" "}
            <span className="text-foreground text-center font-medium">
              {songTitle}
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
