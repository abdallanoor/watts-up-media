import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Watts Up Media",
  description: "Real Estate Photography & Video.",
  keywords: [
    "video editing",
    "real estate video editing",
    "real estate videos",
    "Watts Up Media",
    "editing services",
  ],
  authors: [{ name: "Watts Up Media" }],
  openGraph: {
    title: "Watts Up Media",
    description: "Real Estate Photography & Video.",
    url: "https://wattsupmedia.vercel.app",
    images: [
      {
        url: "/metalogo.jpg",
        width: 1200,
        height: 630,
        alt: "Watts Up Media",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <ThemeProvider attribute="class" defaultTheme="dark">
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
