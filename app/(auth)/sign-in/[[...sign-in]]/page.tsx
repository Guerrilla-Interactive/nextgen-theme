"use client";
import { SignIn } from "@clerk/nextjs";
import { useSearchParams } from "next/navigation";

export default function Page() {
  const params = useSearchParams();
  const redirectUrl = params?.get("redirect_url") || "/dashboard";
  return (
    <div className="grid min-h-screen place-items-center p-6">
      <SignIn afterSignInUrl={redirectUrl} />
    </div>
  );
}
