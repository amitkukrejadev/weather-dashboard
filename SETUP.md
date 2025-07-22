# Weather Dashboard - Setup Guide
    
## 🚀 Quick Start (5 minutes)

Follow these steps to get the Weather Dashboard running on your local machine in under 5 minutes!

### Prerequisites

- Node.js 18.0.0 or higher
- npm 8.0.0 or higher (or yarn/pnpm)
- OpenWeatherMap API key (free)

### Step 1: Clone and Install

\`\`\`bash
# Clone the repository
git clone <your-repo-url>
cd weather-dashboard

# Install dependencies
npm install
\`\`\`

### Step 2: Get Your API Key

1. Go to [OpenWeatherMap](https://openweathermap.org/api)
2. Sign up for a free account
3. Navigate to "API keys" in your dashboard
4. Copy your API key

### Step 3: Configure Environment

\`\`\`bash
# Copy the example environment file
cp .env.example .env.local

# Edit .env.local and replace with your actual API key
OPENWEATHER_API_KEY=your_actual_api_key_here
\`\`\`

### Step 4: Run the Development Server

\`\`\`bash
npm run dev
\`\`\`

Open [http://localhost:3000](http://localhost:3000) in your browser!

## 🌍 Default Behavior

- **Default City:** London (loads automatically)
- **Loading Time:** 5-second initial animation
- **Auto-fetch:** Weather data loads immediately after animation

## 📱 Deploy to Vercel

\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
\`\`\`

## 🔧 Available Scripts

- \`npm run dev\` - Start development server
- \`npm run build\` - Build for production
- \`npm run start\` - Start production server
- \`npm run lint\` - Run ESLint

## Deployment Options

### Deploy to Netlify

1. Build the project: \`npm run build\`
2. Upload the \`out\` folder to Netlify
3. Add environment variables in Netlify dashboard

### Deploy to Railway

\`\`\`bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway init
railway up
\`\`\`

## Troubleshooting

### Common Issues

**API Key Not Working:**
- Make sure you've activated your OpenWeatherMap API key
- Wait 10-15 minutes after creating the key
- Check that \`.env.local\` is in your project root

**Build Errors:**
- Run \`npm run type-check\` to see TypeScript errors
- Make sure all dependencies are installed: \`npm install\`

**Styling Issues:**
- Clear your browser cache
- Make sure Tailwind CSS is properly configured

### Need Help?

- Check the [Next.js documentation](https://nextjs.org/docs)
- Review [OpenWeatherMap API docs](https://openweathermap.org/api)
- Contact: amit@example.com

---

Created by Amit Kukreja ❤️
