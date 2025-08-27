import { Orbitron, Inter, Fira_Code } from "next/font/google";

const headingFont = Orbitron({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-heading",
});

const bodyFont = Inter({
  subsets: ["latin"],
  weight: ["100", "300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-body",
});

const monoFont = Fira_Code({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-mono",
});

export const fonts = {
  heading: headingFont.variable,
  body: bodyFont.variable,
  mono: monoFont.variable
};

export const htmlClassName = `${headingFont.variable} ${bodyFont.variable} ${monoFont.variable}`;
