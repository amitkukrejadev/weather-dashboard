"use client"

/**
 * Theme Switcher Component
 * Created by: Amit Kukreja
 *
 * Provides a dropdown interface for switching between different gradient themes
 */
import * as React from "react"
import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Palette, Check } from "lucide-react"

const themes = [
  { value: "default", label: "Default", emoji: "🌈" },
  { value: "light", label: "Light", emoji: "☀️" },
  { value: "dark", label: "Dark", emoji: "🌙" },
  { value: "sunrise", label: "Sunrise", emoji: "🌅" },
  { value: "forest", label: "Forest", emoji: "🌲" },
  { value: "ocean", label: "Ocean", emoji: "🌊" },
  { value: "aurora", label: "Aurora", emoji: "🌌" },
]

export function ThemeSwitcher() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  React.useEffect(() => {
    if (mounted && theme) {
      // Remove all theme classes first
      document.body.classList.remove(
        "theme-default",
        "theme-light",
        "theme-dark",
        "theme-sunrise",
        "theme-forest",
        "theme-ocean",
        "theme-aurora",
      )
      // Add the current theme class
      document.body.classList.add(`theme-${theme}`)
    }
  }, [theme, mounted])

  if (!mounted) {
    return (
      <Button variant="outline" size="sm" className="bg-white/10 border-white/30 text-white w-full sm:w-auto">
        <Palette className="h-4 w-4" />
      </Button>
    )
  }

  const currentTheme = themes.find((t) => t.value === theme) || themes[0]

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          className="bg-white/10 border-white/30 text-white hover:bg-white/20 transition-colors w-full sm:w-auto justify-center sm:justify-start"
          aria-label="Switch theme"
        >
          <Palette className="h-4 w-4 mr-2" />
          <span className="sm:hidden">{currentTheme.emoji}</span>
          <span className="hidden sm:inline">
            {currentTheme.emoji} {currentTheme.label}
          </span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-black/80 backdrop-blur-md border-white/20 text-white">
        {themes.map((themeOption) => (
          <DropdownMenuItem
            key={themeOption.value}
            onClick={() => setTheme(themeOption.value)}
            className="hover:bg-white/10 focus:bg-white/10 cursor-pointer flex items-center justify-between"
          >
            <span className="flex items-center gap-2">
              <span>{themeOption.emoji}</span>
              <span>{themeOption.label}</span>
            </span>
            {theme === themeOption.value && <Check className="h-4 w-4" />}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
