import type { Metadata } from "next";
import { Syne, Inter, Tomorrow, Roboto_Mono } from "next/font/google";
import "./globals.css";
import { cn } from "@/features/unorganized-utils/utils";
import { ThemeProvider } from "@/features/theme/theme-provider";
import { Toaster } from "@/features/unorganized-components/ui/sonner";
import { GlobalContextProvider } from "@/features/context/global-context";
import { NextgenContextStatusPanel } from "@/features/context/nextgen-context-panel";


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
const syneFont = Syne({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-syne",
});

const interFont = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-inter",
});

const supplementFont = Tomorrow({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-supplement",
});

const robotoMonoFont = Roboto_Mono({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-roboto-mono",
});

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>

      <link rel="icon" href="/favicon.ico" />
      <GlobalContextProvider>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased overscroll-none",
          syneFont.variable,
          interFont.variable,
          supplementFont.variable,
          robotoMonoFont.variable
        )}
      >
          
          {children}
        
        <Toaster position="top-center" richColors />
        <NextgenContextStatusPanel />

        

      </body>
      </GlobalContextProvider>
      
    </html>
  );
}