import type { Metadata } from "next";
import { Stick_No_Bills, Barlow_Condensed, Tomorrow } from "next/font/google";
import "./globals.css";
import { cn } from "@/features/unorganized-utils/utils";
import { ThemeProvider } from "@/features/theme/theme-provider";
import { Toaster } from "@/features/unorganized-components/ui/sonner";
import { GlobalContextProvider } from "@/features/context/global-context";
import { NextgenContextStatusPanel } from "@/features/context/nextgen-context-panel";
import { FrontendCaptureProvider } from "./(main)/(root)/[slug]/_page-slug-core-utilities/frontend-capture-provider";

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
const titleFont = Stick_No_Bills({
  subsets: ["latin"],
  weight: ["600", "800"],
  variable: "--font-title",
});

const generalFont = Barlow_Condensed({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  variable: "--font-general",
});

const supplementFont = Tomorrow({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-supplement",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        {/* Include html2canvas for screenshot functionality */}
        <script src="https://html2canvas.hertzen.com/dist/html2canvas.min.js" async></script>
      </head>
      <link rel="icon" href="/favicon.ico" />
      <GlobalContextProvider>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased overscroll-none",
          titleFont.variable,
          generalFont.variable,
          supplementFont.variable
        )}
      >
          <FrontendCaptureProvider />
          {children}
        
        <Toaster position="top-center" richColors />
        <NextgenContextStatusPanel />

        

      </body>
      </GlobalContextProvider>
      
    </html>
  );
}