import type { Metadata } from "next";
import { Archivo, DM_Sans, JetBrains_Mono } from "next/font/google";
import { Providers } from "./providers";
import { MangaFilters } from "@/components/courtroom/manga-portrait";
import "./globals.css";

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
});

const archivo = Archivo({
  subsets: ["latin"],
  axes: ["wdth"],
  variable: "--font-display",
});

export const metadata: Metadata = {
  title: "Badge Wars",
  description: "The courtroom. One weekly live-text Mafia event.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${dmSans.variable} ${jetbrainsMono.variable} ${archivo.variable} font-sans antialiased`}
      >
        <MangaFilters />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
