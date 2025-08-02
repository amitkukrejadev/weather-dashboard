import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/theme-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Weather Dashboard - Modern Weather App",
  description:
    "A modern, futuristic weather application with real-time data, beautiful gradients, and comprehensive weather metrics. Built by Amit Kukreja.",
  keywords: ["weather", "dashboard", "modern", "futuristic", "real-time", "gradients", "Amit Kukreja"],
  authors: [{ name: "Amit Kukreja" }],
  creator: "Amit Kukreja",
  publisher: "Amit Kukreja",
  metadataBase: new URL("https://weather-dashboard-2025.vercel.app"),
  icons: {
    icon: [
      { url: "/favicon-16x16.png", sizes: "16x16", type: "image/png" },
      { url: "/favicon-32x32.png", sizes: "32x32", type: "image/png" },
      { url: "/favicon.ico", type: "image/x-icon" },
    ],
    apple: "/apple-touch-icon.png",
    shortcut: "/favicon.ico",
  },
  manifest: "/site.webmanifest",
  openGraph: {
    title: "Weather Dashboard - Modern Weather App",
    description:
      "A modern, futuristic weather application with real-time data and beautiful gradients",
    type: "website",
    locale: "en_US",
    url: "https://weather-dashboard-2025.vercel.app/",
    siteName: "Weather Dashboard",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weather Dashboard - Modern Weather App",
    description:
      "A modern, futuristic weather application with real-time data and beautiful gradients",
    creator: "@amitkukreja_dev",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="icon" href="/favicon.ico" />
        <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        <link rel="icon" type="image/png" sizes="32x32" href="/favicon-32x32.png" />
        <link rel="icon" type="image/png" sizes="16x16" href="/favicon-16x16.png" />

        <link rel="manifest" href="/site.webmanifest" />

        <meta name="theme-color" content="#0ea5e9" />
        <meta name="application-name" content="Weather Dashboard" />
        <meta name="apple-mobile-web-app-title" content="Weather Dashboard" />
      </head>
      <body className={`${inter.className} theme-default`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="default"
          enableSystem={false}
          themes={[
            "default",
            "light",
            "dark",
            "sunrise",
            "forest",
            "ocean",
            "aurora"
          ]}
          storageKey="weather-dashboard-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}
