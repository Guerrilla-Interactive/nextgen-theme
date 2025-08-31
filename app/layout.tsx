import type { Metadata } from "next";

import "./styles/globals.css";
import { cn } from "@/features/unorganized-utils/utils";
import { ThemeProvider } from "@/features/theme/theme-provider";
import { Toaster } from "@/features/unorganized-components/ui/sonner";
import { GlobalContextProvider } from "@/features/context/global-context";
import { NextgenContextStatusPanel } from "@/features/context/nextgen-context-panel";
import { fonts } from "./load-fonts";
import { ClerkProvider } from "@clerk/nextjs";


const isProduction = process.env.NEXT_PUBLIC_SITE_ENV === "production";

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL!),
  title: {
    template: "%s | Nextgen",
    default: "Nextgen",
  },
  openGraph: {
    images: [
      {
        url: `${process.env.NEXT_PUBLIC_SITE_URL}/images/og-image.jpg`,
        width: 1200,
        height: 630,
      },
    ],
    locale: "en_US",
    type: "website",
  },
  robots: "index, follow",
};

// Import 3 fonts with custom CSS variable names

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>

      <link rel="icon" href="/favicon.ico" />
      <GlobalContextProvider>
      <ClerkProvider>

      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased overscroll-none",
          fonts
        )}
      >
     


        
          
          {children}
        
        <Toaster position="top-center" richColors />
        {/* <NextgenContextStatusPanel /> */}

        

      </body>
      </ClerkProvider>
      </GlobalContextProvider>
      
    </html>
  );
}