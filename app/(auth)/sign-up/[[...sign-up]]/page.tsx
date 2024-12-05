import { type Metadata } from "next"
import { SignUp } from "@clerk/nextjs"

export const metadata: Metadata = {
  title: "Sign Up",
}

export default function SignUpPage() {
  return (
    <div className="flex h-full flex-col items-center justify-center">
      <SignUp />
    </div>
  )
}
