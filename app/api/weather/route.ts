import { NextResponse } from "next/server"

const OPENWEATHER_API_KEY = process.env.OPENWEATHER_API_KEY
const BASE_URL = "https://api.openweathermap.org/data/2.5"
const AIR_POLLUTION_URL = "https://api.openweathermap.org/data/2.5/air_pollution"

/**
 * Weather API Route Handler
 * Created by: Amit Kukreja
 *
 * Fetches current weather and air pollution data from OpenWeatherMap API
 */
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const city = searchParams.get("city")

  console.log("API Key available:", !!OPENWEATHER_API_KEY)
  console.log("Requested city:", city)

  if (!city) {
    return NextResponse.json({ error: "City parameter is required" }, { status: 400 })
  }

  if (!OPENWEATHER_API_KEY) {
    console.error("OpenWeatherMap API key not found in environment variables")
    return NextResponse.json({ error: "OpenWeatherMap API key not configured" }, { status: 500 })
  }

  try {
    // 1. Fetch current weather to get coordinates (lat, lon)
    const weatherUrl = `${BASE_URL}/weather?q=${encodeURIComponent(city)}&appid=${OPENWEATHER_API_KEY}&units=metric`
    console.log("Fetching weather from:", weatherUrl.replace(OPENWEATHER_API_KEY, "API_KEY_HIDDEN"))

    const currentWeatherRes = await fetch(weatherUrl)

    if (!currentWeatherRes.ok) {
      const errorData = await currentWeatherRes.json()
      console.error("Weather API error:", errorData)
      return NextResponse.json(
        { error: errorData.message || "Failed to fetch current weather" },
        { status: currentWeatherRes.status },
      )
    }

    const currentWeatherData = await currentWeatherRes.json()
    console.log("Weather data received for:", currentWeatherData.name)

    const { lat, lon } = currentWeatherData.coord

    // 2. Fetch air pollution data using coordinates
    const airPollutionUrl = `${AIR_POLLUTION_URL}?lat=${lat}&lon=${lon}&appid=${OPENWEATHER_API_KEY}`
    const airPollutionRes = await fetch(airPollutionUrl)

    let airPollutionData = null
    if (airPollutionRes.ok) {
      airPollutionData = await airPollutionRes.json()
      console.log("Air pollution data received")
    } else {
      console.warn("Failed to fetch air pollution data, but continuing with weather data")
    }

    return NextResponse.json({
      current: currentWeatherData,
      air_pollution: airPollutionData,
    })
  } catch (error) {
    console.error("Error fetching weather data:", error)
    return NextResponse.json({ error: "Internal server error" }, { status: 500 })
  }
}
