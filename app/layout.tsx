import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Weather Dashboard - Modern Weather App",
  description:
    "A modern, futuristic weather application with real-time data, beautiful gradients, and comprehensive weather metrics. Built by Amit Kukreja.",
  keywords: ["weather", "dashboard", "modern", "futuristic", "real-time", "gradients", "Amit Kukreja"],
  authors: [{ name: "Amit Kukreja" }],
  creator: "Amit Kukreja",
  publisher: "Amit Kukreja",
  openGraph: {
    title: "Weather Dashboard - Modern Weather App",
    description: "A modern, futuristic weather application with real-time data and beautiful gradients",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Weather Dashboard - Modern Weather App",
    description: "A modern, futuristic weather application with real-time data and beautiful gradients",
    creator: "@amitkukreja_dev",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.className} theme-default`}>
        <ThemeProvider
          attribute="class"
          defaultTheme="default"
          enableSystem={false}
          themes={["default", "light", "dark", "sunrise", "forest", "ocean", "aurora"]}
          storageKey="weather-dashboard-theme"
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
