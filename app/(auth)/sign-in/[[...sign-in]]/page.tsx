import { type Metadata } from "next"
import { SignIn } from "@clerk/nextjs"

export const metadata: Metadata = {
  title: "Sign In",
}

export default function SignInPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <SignIn />
    </div>
  )
}
