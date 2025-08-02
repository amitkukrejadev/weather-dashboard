# Weather Dashboard

A modern, futuristic weather application that displays current weather conditions, key environmental metrics, and comprehensive weather data. Built with a sleek gradient design, responsive layout, and advanced theme switching capabilities.

## Features

- **Current Weather:** Displays temperature, "feels like", humidity, and wind speed.
- **Environmental Metrics:** Dedicated cards for Air Quality Index (AQI), Humidity, Atmospheric Pressure, Sunrise/Sunset times, and Visibility.
- **Advanced Theming:** Switch between Light, Dark, and several custom gradient themes (Sunrise, Forest, Ocean, Aurora).
- **City Search:** Search for weather data in any city worldwide.
- **Responsive Design:** Optimized for seamless viewing across all devices (mobile, tablet, desktop).
- **Futuristic UI:** Inspired by modern design aesthetics with vibrant gradients and subtle animations.
- **Loading Animation:** Engaging 5-second loading animation on initial load.
- **Default Location:** Automatically loads London weather on startup.

## Technologies Used

- **Next.js 14:** React framework with App Router
- **React 18:** For building interactive user interfaces
- **TypeScript:** For type safety and better development experience
- **Tailwind CSS:** For rapid and responsive styling with custom gradients
- **shadcn/ui:** Modern UI components (Button, Input, Card, DropdownMenu, Badge, Alert)
- **Lucide React:** Beautiful and consistent icons
- **next-themes:** For theme management and switching
- **OpenWeatherMap API:** For fetching current weather and air pollution data

## Quick Setup

### Prerequisites

- Node.js 18.0.0 or higher
- npm or yarn
- OpenWeatherMap API key

### Installation

\`\`\`bash
# Clone the repository
git clone https://github.com/amitkukrejadev/weather-dashboard.git
cd weather-dashboard

# Install dependencies
npm install

# Set up environment variables
cp .env.example .env.local
# Add your OpenWeatherMap API key to .env.local

# Run the development server
npm run dev
\`\`\`

The application will be accessible at \`http://localhost:3000\`.

### Default Behavior

- **Loads London weather automatically** after 5-second loading animation
- **Search functionality** to find weather for any city worldwide
- **Theme switching** with 6 beautiful gradient themes
- **Responsive design** that works on all devices

## Usage

- **Default City:** London weather loads automatically on app start
- **Search:** Type any city name and press Enter or click Search
- **Theme Switcher:** Use the palette dropdown to switch between themes
- **Responsive:** Works perfectly on mobile, tablet, and desktop

## Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint
- \`npm run type-check\` - Run TypeScript checks

## Deployment
🚀 Live: https://weather-dashboard-2025.vercel.app/


### Vercel (Recommended)

\`\`\`bash
npm i -g vercel
vercel --prod
\`\`\`

### Other Platforms

- **Netlify:** Build and upload the \`out\` folder
- **Railway:** Use Railway CLI to deploy
- **Heroku:** Push to Heroku with buildpack

## Connect

- **Twitter:** [@amitkukreja_dev](https://x.com/amitkukreja_dev)
- **GitHub:** [github.com/amitkukrejadev](https://github.com/amitkukrejadev)

## Future Enhancements

- **Geolocation:** Automatic location detection
- **Unit Conversion:** Celsius/Fahrenheit toggle
- **Search History:** Recent searches storage
- **Hourly Forecast:** Detailed hourly predictions
- **Weather Alerts:** Severe weather notifications
- **Multi-language:** Interface translations

---

Built with ❤️ by Amit Kukreja
# Production ready for deployment
