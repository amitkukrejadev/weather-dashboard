"use client"

import { useState, useEffect, useMemo } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Cloud,
  CloudLightning,
  CloudRain,
  CloudSnow,
  CloudSun,
  Droplets,
  Search,
  Sun,
  Thermometer,
  Wind,
  CloudFog,
  AlertCircle,
  Loader2,
  Sunrise,
  Sunset,
  Gauge,
  Eye,
  Leaf,
} from "lucide-react"
import { ThemeSwitcher } from "@/components/theme-switcher"
import { Badge } from "@/components/ui/badge"
import { Alert, AlertDescription } from "@/components/ui/alert"

interface WeatherData {
  current: {
    name: string
    main: {
      temp: number
      feels_like: number
      humidity: number
      pressure: number
    }
    weather: {
      description: string
      icon: string
      main: string
    }[]
    wind: {
      speed: number
    }
    sys: {
      sunrise: number
      sunset: number
    }
    visibility: number
  }
  air_pollution: {
    list: {
      main: {
        aqi: number
      }
      components: {
        co: number
        no: number
        no2: number
        o3: number
        so2: number
        pm2_5: number
        pm10: number
        nh3: number
      }
    }[]
  } | null
}

// Helper functions
const getWeatherIcon = (iconCode: string) => {
  switch (iconCode) {
    case "01d":
    case "01n":
      return <Sun className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" />
    case "02d":
    case "02n":
      return <CloudSun className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
    case "03d":
    case "03n":
    case "04d":
    case "04n":
      return <Cloud className="w-12 h-12 sm:w-16 sm:h-16 text-gray-400" />
    case "09d":
    case "09n":
      return <CloudRain className="w-12 h-12 sm:w-16 sm:h-16 text-blue-400" />
    case "10d":
    case "10n":
      return <CloudRain className="w-12 h-12 sm:w-16 sm:h-16 text-blue-500" />
    case "11d":
    case "11n":
      return <CloudLightning className="w-12 h-12 sm:w-16 sm:h-16 text-gray-600" />
    case "13d":
    case "13n":
      return <CloudSnow className="w-12 h-12 sm:w-16 sm:h-16 text-blue-200" />
    case "50d":
    case "50n":
      return <CloudFog className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300" />
    default:
      return <Sun className="w-12 h-12 sm:w-16 sm:h-16 text-yellow-400" />
  }
}

const formatTime = (timestamp: number) => {
  const date = new Date(timestamp * 1000)
  return date.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", hour12: true })
}

const getAirQualityDescription = (aqi: number | undefined) => {
  if (aqi === undefined) return "N/A"
  switch (aqi) {
    case 1:
      return "Good"
    case 2:
      return "Fair"
    case 3:
      return "Moderate"
    case 4:
      return "Poor"
    case 5:
      return "Very Poor"
    default:
      return "Unknown"
  }
}

export function WeatherDashboard() {
  const [city, setCity] = useState("London")
  const [weatherData, setWeatherData] = useState<WeatherData | null>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [showInitialLoading, setShowInitialLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowInitialLoading(false)
    }, 5000) // 5 seconds
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    if (!showInitialLoading) {
      // Automatically fetch London weather when app loads
      fetchWeatherData("London")
    }
  }, [showInitialLoading])

  const fetchWeatherData = async (searchCity: string) => {
    setLoading(true)
    setError(null)
    console.log("Fetching weather for:", searchCity)

    try {
      const response = await fetch(`/api/weather?city=${encodeURIComponent(searchCity)}`)
      console.log("API response status:", response.status)

      if (!response.ok) {
        const errorData = await response.json()
        console.error("API error:", errorData)
        throw new Error(errorData.error || "Failed to fetch weather data")
      }

      const data: WeatherData = await response.json()
      console.log("Weather data received:", data)
      setWeatherData(data)
      setCity(searchCity) // Update the city state with the searched city
    } catch (err: any) {
      console.error("Fetch error:", err)
      setError(err.message || "An unexpected error occurred.")
      setWeatherData(null)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = () => {
    if (city.trim()) {
      fetchWeatherData(city)
    }
  }

  const currentWeather = weatherData?.current
  const airPollution = weatherData?.air_pollution

  const formattedDate = useMemo(() => {
    if (!currentWeather) return ""
    const date = new Date()
    return date.toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    })
  }, [currentWeather])

  if (showInitialLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen w-full bg-weather-gradient text-white px-4">
        <Loader2 className="h-16 w-16 sm:h-24 sm:w-24 animate-spin text-white" />
        <p className="mt-6 sm:mt-8 text-lg sm:text-2xl font-semibold text-center">Loading the future of weather...</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-2 sm:p-4">
      <div className="w-full max-w-4xl mx-auto p-3 sm:p-4 md:p-8 bg-card-gradient backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 text-white">
        <div className="flex flex-col gap-4 mb-6">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-white drop-shadow-lg text-center sm:text-left">
              Weather Dashboard
            </h1>
            <div className="flex flex-col sm:flex-row w-full sm:w-auto gap-2">
              <div className="flex gap-2 w-full sm:w-auto">
                <Input
                  type="text"
                  placeholder="Enter city name"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  onKeyPress={(e) => {
                    if (e.key === "Enter") {
                      handleSearch()
                    }
                  }}
                  className="flex-1 sm:w-64 bg-white/10 border-white/30 text-white placeholder:text-white/70 focus:ring-2 focus:ring-blue-400 focus:ring-offset-2 focus:ring-offset-transparent"
                />
                <Button
                  onClick={handleSearch}
                  disabled={loading}
                  className="bg-blue-600 hover:bg-blue-700 text-white font-semibold shadow-md transition-all duration-200 ease-in-out transform hover:scale-105 px-3 sm:px-4"
                >
                  {loading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <Search className="h-4 w-4" />}
                  <span className="hidden sm:inline ml-2">Search</span>
                </Button>
              </div>
              <div className="w-full sm:w-auto">
                <ThemeSwitcher />
              </div>
            </div>
          </div>
        </div>

        {error && (
          <Alert className="bg-red-500/20 border-red-400 text-red-200 mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertDescription>Error: {error}</AlertDescription>
          </Alert>
        )}

        {loading && !weatherData && (
          <div className="flex flex-col items-center justify-center h-48 sm:h-64">
            <Loader2 className="h-8 w-8 sm:h-12 sm:w-12 animate-spin text-white" />
            <p className="mt-4 text-base sm:text-lg text-white">Fetching weather data...</p>
          </div>
        )}

        {!loading && weatherData && (
          <>
            <Card className="bg-card-gradient backdrop-blur-md border border-white/20 text-white shadow-xl mb-6 sm:mb-8 transition-all duration-300 ease-in-out transform hover:scale-[1.01]">
              <CardHeader className="flex flex-col sm:flex-row items-center justify-between pb-2 space-y-2 sm:space-y-0">
                <CardTitle className="text-xl sm:text-2xl font-bold text-white drop-shadow-md text-center sm:text-left">
                  {currentWeather?.name}
                </CardTitle>
                <p className="text-xs sm:text-sm text-white/80 text-center sm:text-right">{formattedDate}</p>
              </CardHeader>
              <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 items-center">
                <div className="flex flex-col items-center md:items-start">
                  <div className="flex items-center gap-3 sm:gap-4">
                    {currentWeather && getWeatherIcon(currentWeather.weather[0].icon)}
                    <span className="text-4xl sm:text-5xl md:text-6xl font-extrabold text-white drop-shadow-lg">
                      {currentWeather && Math.round(currentWeather.main.temp)}°C
                    </span>
                  </div>
                  <p className="text-lg sm:text-xl capitalize text-white/90 mt-2 text-center md:text-left">
                    {currentWeather?.weather[0].description}
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4 text-white/80 text-sm sm:text-base md:text-lg">
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <Thermometer className="h-4 w-4 sm:h-5 sm:w-5 text-blue-300" />
                    <span>Feels like: {currentWeather && Math.round(currentWeather.main.feels_like)}°C</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start">
                    <Droplets className="h-4 w-4 sm:h-5 sm:w-5 text-blue-300" />
                    <span>Humidity: {currentWeather?.main.humidity}%</span>
                  </div>
                  <div className="flex items-center gap-2 justify-center sm:justify-start sm:col-span-2">
                    <Wind className="h-4 w-4 sm:h-5 sm:w-5 text-blue-300" />
                    <span>Wind: {currentWeather?.wind.speed} m/s</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4 mb-6 sm:mb-8">
              <Card className="bg-card-gradient backdrop-blur-md border border-white/20 text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                <CardContent className="flex flex-col items-center p-3 sm:p-4">
                  <Leaf className="h-6 w-6 sm:h-8 sm:w-8 text-green-400 mb-2" />
                  <p className="text-base sm:text-lg font-semibold">Air Quality</p>
                  <p className="text-xl sm:text-2xl font-bold mt-1">{airPollution?.list[0]?.main.aqi || "N/A"}</p>
                  <Badge
                    variant="secondary"
                    className="mt-2 bg-white/10 text-white/90 border-white/20 text-xs sm:text-sm"
                  >
                    {getAirQualityDescription(airPollution?.list[0]?.main.aqi)}
                  </Badge>
                </CardContent>
              </Card>

              <Card className="bg-card-gradient backdrop-blur-md border border-white/20 text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                <CardContent className="flex flex-col items-center p-3 sm:p-4">
                  <Droplets className="h-6 w-6 sm:h-8 sm:w-8 text-blue-400 mb-2" />
                  <p className="text-base sm:text-lg font-semibold">Humidity</p>
                  <p className="text-xl sm:text-2xl font-bold mt-1">{currentWeather?.main.humidity}%</p>
                  <p className="text-xs sm:text-sm text-white/70">Current humidity level</p>
                </CardContent>
              </Card>

              <Card className="bg-card-gradient backdrop-blur-md border border-white/20 text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                <CardContent className="flex flex-col items-center p-3 sm:p-4">
                  <Gauge className="h-6 w-6 sm:h-8 sm:w-8 text-gray-400 mb-2" />
                  <p className="text-base sm:text-lg font-semibold">Pressure</p>
                  <p className="text-xl sm:text-2xl font-bold mt-1">{currentWeather?.main.pressure} hPa</p>
                  <p className="text-xs sm:text-sm text-white/70">Atmospheric pressure</p>
                </CardContent>
              </Card>

              <Card className="bg-card-gradient backdrop-blur-md border border-white/20 text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                <CardContent className="flex flex-col items-center p-3 sm:p-4">
                  <Sunrise className="h-6 w-6 sm:h-8 sm:w-8 text-orange-400 mb-2" />
                  <p className="text-base sm:text-lg font-semibold">Sunrise</p>
                  <p className="text-xl sm:text-2xl font-bold mt-1">
                    {currentWeather?.sys.sunrise ? formatTime(currentWeather.sys.sunrise) : "N/A"}
                  </p>
                  <p className="text-xs sm:text-sm text-white/70">Time of sunrise</p>
                </CardContent>
              </Card>

              <Card className="bg-card-gradient backdrop-blur-md border border-white/20 text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                <CardContent className="flex flex-col items-center p-3 sm:p-4">
                  <Sunset className="h-6 w-6 sm:h-8 sm:w-8 text-purple-400 mb-2" />
                  <p className="text-base sm:text-lg font-semibold">Sunset</p>
                  <p className="text-xl sm:text-2xl font-bold mt-1">
                    {currentWeather?.sys.sunset ? formatTime(currentWeather.sys.sunset) : "N/A"}
                  </p>
                  <p className="text-xs sm:text-sm text-white/70">Time of sunset</p>
                </CardContent>
              </Card>

              <Card className="bg-card-gradient backdrop-blur-md border border-white/20 text-white shadow-lg transition-all duration-300 ease-in-out transform hover:scale-105">
                <CardContent className="flex flex-col items-center p-3 sm:p-4">
                  <Eye className="h-6 w-6 sm:h-8 sm:w-8 text-cyan-400 mb-2" />
                  <p className="text-base sm:text-lg font-semibold">Visibility</p>
                  <p className="text-xl sm:text-2xl font-bold mt-1">
                    {currentWeather?.visibility ? `${(currentWeather.visibility / 1000).toFixed(1)} km` : "N/A"}
                  </p>
                  <p className="text-xs sm:text-sm text-white/70">How far you can see</p>
                </CardContent>
              </Card>
            </div>
          </>
        )}
      </div>

      {/* FAQ Section - Separate Container */}
      <div className="w-full max-w-4xl mx-auto mt-6 sm:mt-8 p-4 sm:p-6 md:p-8 bg-card-gradient backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 text-white">
        <div className="text-center">
          <h3 className="text-xl sm:text-2xl font-bold mb-6 sm:mb-8">Frequently Asked Questions</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8 text-left">
            <div>
              <p className="font-semibold text-white/90 mb-2">How often is data updated?</p>
              <p className="text-white/80 text-sm sm:text-base">
                Weather data refreshes in real-time with each search, providing the most current conditions available.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white/90 mb-2">Which cities are supported?</p>
              <p className="text-white/80 text-sm sm:text-base">
                All major cities worldwide are supported via the OpenWeatherMap API database.
              </p>
            </div>
            <div>
              <p className="font-semibold text-white/90 mb-2">Is it mobile-friendly?</p>
              <p className="text-white/80 text-sm sm:text-base">
                Yes, fully responsive design optimized for all devices including mobile, tablet, and desktop.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer - Original 3-Grid Design */}
      <footer className="w-full max-w-4xl mx-auto mt-6 sm:mt-8 p-4 sm:p-6 md:p-8 bg-card-gradient backdrop-blur-lg rounded-xl shadow-2xl border border-white/20 text-white text-center md:text-left">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">About Project</h3>
            <p className="text-white/80 text-xs sm:text-sm leading-relaxed">
              A cutting-edge weather application built with Next.js 14, featuring real-time data from OpenWeatherMap
              API. Designed with modern UI/UX principles, offering multiple gradient themes and comprehensive weather
              insights for users worldwide.
            </p>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Features</h3>
            <ul className="space-y-1 sm:space-y-2 text-white/80 text-xs sm:text-sm">
              <li>🌡️ Real-time weather data</li>
              <li>🎨 Multiple gradient themes</li>
              <li>📱 Fully responsive design</li>
              <li>🌍 Global city search</li>
              <li>💨 Air quality monitoring</li>
              <li>🌅 Sunrise & sunset times</li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg sm:text-xl font-bold mb-3 sm:mb-4">Connect</h3>
            <ul className="space-y-2 sm:space-y-3 text-white/80 text-xs sm:text-sm">
              <li>
                <a
                  href="https://x.com/amitkukreja_dev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-300 transition-colors flex items-center justify-center md:justify-start gap-2"
                >
                  <span>🐦</span>
                  <span>@amitkukreja_dev</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/amitkukrejadev"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-300 transition-colors flex items-center justify-center md:justify-start gap-2"
                >
                  <span>⚡</span>
                  <span>github.com/amitkukrejadev</span>
                </a>
              </li>
              <li>
                <a
                  href="https://github.com/amitkukrejadev/weather-dashboard"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-blue-300 transition-colors flex items-center justify-center md:justify-start gap-2"
                >
                  <span>🌟</span>
                  <span>View Repository</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="border-t border-white/20 mt-6 sm:mt-8 pt-4 sm:pt-6 text-xs sm:text-sm text-white/60">
          <p className="text-center">
            &copy; {new Date().getFullYear()} Weather Dashboard by Amit Kukreja. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  )
}
