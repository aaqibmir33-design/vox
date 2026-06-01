# AURA // Premium Voice Clone Studio

A modern, production-ready voice synthesis and clone management dashboard built with React, TypeScript, and Vite.

## Features

- **Dashboard Overview**: Real-time stats, active jobs, recent clips, and popular voices
- **Synthesis Studio**: Full voice parameter control with real-time waveform visualization
- **Voice Library**: Browse, filter, and manage cloned voices with grid/list views
- **Audio Library**: Organize and manage generated audio clips with search and sorting
- **Settings**: Account management, API keys, notifications, and appearance preferences

## Tech Stack

- **React 18** with TypeScript
- **Vite** for fast development and building
- **CSS Custom Properties** for design tokens and theming
- **Canvas API** for animated waveform visualizations
- **Responsive Design** with mobile-first approach

## Project Structure

```
├── public/
│   └── aura-icon.svg
├── src/
│   ├── components/
│   │   ├── App.tsx              # Main app shell with routing
│   │   ├── Sidebar.tsx          # Navigation sidebar
│   │   ├── Header.tsx           # Top header with search and profile
│   │   ├── Dashboard.tsx        # Dashboard overview page
│   │   ├── Studio.tsx           # Voice synthesis workspace
│   │   ├── VoiceLibrary.tsx     # Voice management page
│   │   ├── AudioLibrary.tsx     # Audio clip management
│   │   ├── Settings.tsx         # User settings page
│   │   └── WaveformVisualizer.tsx  # Canvas waveform renderer
│   ├── data/
│   │   └── mockData.ts          # Mock data for demo
│   ├── types/
│   │   └── voice.ts             # TypeScript interfaces
│   ├── styles/
│   │   ├── global.css           # Global styles and design tokens
│   │   └── app.css              # App layout styles
│   └── main.tsx                 # Entry point
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

```bash
# Clone or extract the project
cd aura-studio

# Install dependencies
npm install

# Start development server
npm run dev
```

The app will open at `http://localhost:3000`

### Build for Production

```bash
npm run build
```

Output will be in the `dist/` directory.

## Design System

### Colors
- **Background**: `#0a0a0f` (primary), `#111118` (secondary), `#1a1a24` (tertiary)
- **Text**: `#f0f0f5` (primary), `#a0a0b0` (secondary), `#6a6a7a` (tertiary)
- **Accent**: `#6366f1` (indigo), `#a855f7` (purple), `#ec4899` (pink)
- **Semantic**: `#22c55e` (success), `#f59e0b` (warning), `#ef4444` (error)

### Typography
- **Primary**: Inter (Google Fonts)
- **Monospace**: JetBrains Mono (Google Fonts)

### Spacing Scale
- Base unit: 4px
- Scale: 4, 8, 12, 16, 20, 24, 32, 40, 48, 64, 80, 96px

## Key Features

### Waveform Visualization
- Canvas-based real-time waveform rendering
- Animated glow effects
- Responsive sizing
- Customizable colors and height

### Voice Parameter Controls
- Stability (0-100%)
- Clarity (0-100%)
- Speed (50-150%)
- Pitch Shift (-20 to +20 semitones)
- Emotion selection (6 presets)
- Speaking style (4 presets)

### Responsive Layout
- Collapsible sidebar (260px → 72px)
- Mobile-optimized navigation
- Adaptive grid layouts
- Touch-friendly controls

## Browser Support

- Chrome 90+
- Firefox 88+
- Safari 14+
- Edge 90+

## License

MIT License - feel free to use for personal or commercial projects.
