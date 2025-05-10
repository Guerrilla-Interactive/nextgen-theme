import Route404 from "@/sanity/desk-organized-sanity-utilities/settings/route-404-settings/route-404.component";
import { fetchRoute404Settings } from "@/sanity/desk-organized-sanity-utilities/settings/route-404-settings/route-404-settings.server-actions";
import type { Metadata } from "next";
import { fetchSettings } from "@/sanity/desk-organized-sanity-utilities/settings/settings.query";

export async function generateMetadata(): Promise<Metadata> {
  // Fetch 404 settings from Sanity for metadata
  const settings = await fetchSettings();
  
  return {
    title: settings?.data?.meta_title || "Page not found",
    description: settings?.data?.meta_description,
    robots: "noindex, nofollow",
  };
}

export default async function NotFoundPage() {
  // Fetch 404 settings from Sanity
  const data = await fetchRoute404Settings();
  
  return (
    <>
      <Route404 data={data} />
    </>
  );
}
