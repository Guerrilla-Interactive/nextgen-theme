
import { VisualEditing } from "next-sanity";
import { draftMode } from "next/headers";
import { SanityLive } from "@/sanity/lib/live";
import Header from "@/sanity/desk-organized-sanity-utilities/settings/header-settings/header";
import { DisableDraftMode } from "@/features/unorganized-components/disable-draft-mode";
import Footer from "@/sanity/desk-organized-sanity-utilities/settings/footer-settings/footer/footer";
import { fetchSettings } from "@/sanity/desk-organized-sanity-utilities/settings/settings.query";



export default async function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const settings = await fetchSettings();




  return (
    <>
      <Header {...settings.data.headerSettings} />
      <main>{children}</main>
      <SanityLive />
      {(await draftMode()).isEnabled && (
        <>
          <DisableDraftMode />
          <VisualEditing />
        </>
      )}
      <Footer {...settings.data.footerSettings} />
    </>
  );
}
