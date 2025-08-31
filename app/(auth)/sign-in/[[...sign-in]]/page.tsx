"use client";
import { SignIn } from "@clerk/nextjs";

export default function Page() {
  return (
    <div className="grid min-h-screen place-items-center p-6">
      <SignIn afterSignInUrl="/dashboard" />
    </div>
  );
}
