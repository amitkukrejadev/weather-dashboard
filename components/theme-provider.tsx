"use client"

/**
 * Theme Provider Component
 * Created by: Amit Kukreja
 *
 * Provides theme context using next-themes for the Weather Dashboard
 */
import { ThemeProvider as NextThemesProvider } from "next-themes"
import type { ThemeProviderProps } from "next-themes"

export function ThemeProvider({ children, ...props }: ThemeProviderProps) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>
}
