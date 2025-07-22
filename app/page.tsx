import { WeatherDashboard } from "@/components/weather-dashboard"

export default function HomePage() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen w-full p-4">
      <WeatherDashboard />
    </div>
  )
}
