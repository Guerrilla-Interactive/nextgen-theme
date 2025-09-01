"use client";
import { useEffect } from "react";
import { useAuth } from "@clerk/nextjs";

export default function CliBridge({
  searchParams,
}: { searchParams: { redirect?: string } }) {
  const { getToken, isSignedIn } = useAuth();

  useEffect(() => {
    (async () => {
      const redirect = searchParams?.redirect ?? "http://localhost:4455/callback";

      if (!isSignedIn) {
        const back = new URL(window.location.href);
        window.location.href =
          `/sign-in?redirect_url=${encodeURIComponent(back.toString())}`;
        return;
      }

      const token = await getToken({ template: "cli" }); // <- uses your JWT template
      const url = new URL(redirect);
      url.searchParams.set("token", token ?? "");
      window.location.href = url.toString();
    })();
  }, [getToken, isSignedIn, searchParams?.redirect]);

  return null;
}
