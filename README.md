# Claw-Nomad

<div align="center">
  <img src="public/logo.png" alt="Claw-Nomad Logo" width="120" height="120">

  <h3>Autonomous AI Agent Protocol</h3>
  <p>Deploy AI agents that move seamlessly between Web2 services, blockchain networks, and Moltworld — all while you maintain complete control.</p>

  <p>
    <a href="#features">Features</a> •
    <a href="#tech-stack">Tech Stack</a> •
    <a href="#getting-started">Getting Started</a> •
    <a href="#project-structure">Structure</a> •
    <a href="#deployment">Deployment</a>
  </p>

  ![Next.js](https://img.shields.io/badge/Next.js-14.2-black?style=flat-square&logo=next.js)
  ![TypeScript](https://img.shields.io/badge/TypeScript-5.0-blue?style=flat-square&logo=typescript)
  ![Tailwind CSS](https://img.shields.io/badge/Tailwind-3.4-38B2AC?style=flat-square&logo=tailwind-css)
  ![License](https://img.shields.io/badge/License-MIT-green?style=flat-square)
</div>

---

## Overview

Claw-Nomad is a cross-platform AI agent controller that bridges the gap between Web2 services, Web3 protocols, and Moltworld. It provides a unified dashboard for managing autonomous agents with granular permission controls, real-time activity monitoring, and seamless workflow automation.

### Key Concepts

- **Cross-Platform Agents**: Deploy AI agents that operate across Gmail, Calendar, DEXs, and Moltworld simultaneously
- **Reputation System**: Build trust through successful task completion with on-chain reputation tracking
- **Vault Security**: Manage permissions with encrypted memory and spending limits
- **Natural Language Commands**: Control your agent using simple, conversational instructions

---

## Features

### Landing Page
- Modern, responsive design with smooth animations
- Feature showcase with interactive cards
- Use cases demonstration
- Call-to-action sections

### Dashboard
- **Overview**: Real-time stats, quick actions, and activity feed
- **Activity Log**: Complete history with filters and search
- **Workflows**: Create and manage automated workflows
- **Integrations**: Connect Web2/Web3/Moltworld platforms
- **Vault**: Permission management and secret keys
- **History**: Analytics and reputation tracking
- **Settings**: Profile, notifications, security, and appearance

### Documentation
- GitBook-style documentation system
- Searchable content with sidebar navigation
- Code examples and API references
- 28+ documentation pages across 6 sections

---

## Tech Stack

| Category | Technology |
|----------|------------|
| Framework | [Next.js 14](https://nextjs.org/) (App Router) |
| Language | [TypeScript](https://www.typescriptlang.org/) |
| Styling | [Tailwind CSS](https://tailwindcss.com/) |
| Animations | [Framer Motion](https://www.framer.com/motion/) |
| Charts | [Recharts](https://recharts.org/) |
| Icons | [Lucide React](https://lucide.dev/) |
| Deployment | [Vercel](https://vercel.com/) |

---

## Getting Started

### Prerequisites

- Node.js 18.x or higher
- npm, yarn, or pnpm

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/claw-nomad-dashboard.git
   cd claw-nomad-dashboard
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   # or
   pnpm install
   ```

3. **Set up environment variables**
   ```bash
   cp .env.example .env.local
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   # or
   pnpm dev
   ```

5. **Open your browser**

   Navigate to [http://localhost:3000](http://localhost:3000)

### Available Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start development server |
| `npm run build` | Build for production |
| `npm run start` | Start production server |
| `npm run lint` | Run ESLint |

---

## Project Structure

```
claw-nomad-dashboard/
├── public/
│   ├── logo.png              # App logo
│   └── favicon.png           # Favicon
├── src/
│   ├── app/
│   │   ├── dashboard/
│   │   │   ├── activity/     # Activity log page
│   │   │   ├── history/      # History & analytics page
│   │   │   ├── integrations/ # Integrations page
│   │   │   ├── settings/     # Settings page
│   │   │   ├── vault/        # Vault & security page
│   │   │   ├── workflows/    # Workflows page
│   │   │   └── page.tsx      # Main dashboard
│   │   ├── docs/
│   │   │   ├── [...slug]/    # Dynamic doc pages
│   │   │   └── page.tsx      # Docs landing
│   │   ├── features/         # Features page
│   │   ├── how-it-works/     # How it works page
│   │   ├── use-cases/        # Use cases page
│   │   ├── globals.css       # Global styles
│   │   ├── layout.tsx        # Root layout
│   │   └── page.tsx          # Landing page
│   ├── components/
│   │   ├── Dashboard/        # Dashboard components
│   │   │   ├── CommandInput.tsx
│   │   │   ├── DashboardLayout.tsx
│   │   │   ├── LiveActivityFeed.tsx
│   │   │   ├── QuickActions.tsx
│   │   │   ├── StatsOverview.tsx
│   │   │   └── index.ts
│   │   ├── Docs/             # Documentation components
│   │   │   ├── DocContent.tsx
│   │   │   └── DocsLayout.tsx
│   │   ├── Landing/          # Landing page components
│   │   │   ├── CTA.tsx
│   │   │   ├── Features.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Hero.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── Navbar.tsx
│   │   │   ├── Stats.tsx
│   │   │   └── UseCases.tsx
│   │   ├── ReputationChart.tsx
│   │   └── VaultPermissions/
│   │       ├── PermissionCard.tsx
│   │       ├── PermissionToggle.tsx
│   │       ├── VaultPermissions.tsx
│   │       └── index.ts
│   └── types/
│       └── index.ts          # TypeScript types
├── .env.example              # Environment variables template
├── .gitignore
├── next.config.mjs           # Next.js configuration
├── package.json
├── tailwind.config.ts        # Tailwind configuration
├── tsconfig.json             # TypeScript configuration
└── vercel.json               # Vercel deployment config
```

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Landing page with hero, features, and CTA |
| `/features` | Detailed features breakdown |
| `/how-it-works` | Step-by-step guide |
| `/use-cases` | Real-world use cases |
| `/docs` | Documentation hub |
| `/docs/[...slug]` | Dynamic documentation pages |
| `/dashboard` | Main dashboard overview |
| `/dashboard/activity` | Activity log with filters |
| `/dashboard/workflows` | Workflow management |
| `/dashboard/integrations` | Platform integrations |
| `/dashboard/vault` | Security & permissions |
| `/dashboard/history` | Analytics & reputation |
| `/dashboard/settings` | User preferences |

---

## Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git remote add origin https://github.com/yourusername/claw-nomad-dashboard.git
   git push -u origin master
   ```

2. **Import to Vercel**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Vercel will auto-detect Next.js settings
   - Click "Deploy"

### Deploy via Vercel CLI

```bash
# Install Vercel CLI
npm install -g vercel

# Login
vercel login

# Deploy
vercel

# Production deployment
vercel --prod
```

### Environment Variables

Set these in your Vercel dashboard:

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_APP_URL` | Your app URL (e.g., https://claw-nomad.vercel.app) |

---

## Configuration

### Tailwind CSS

Custom colors are defined in `tailwind.config.ts`:

```typescript
colors: {
  'terminal-glow': '#39FF14',      // Primary green
  'terminal-darker': '#0a0a0a',    // Background
  'terminal-border': '#1a1a1a',    // Borders
  'web2': '#3B82F6',               // Web2 blue
  'web3': '#A855F7',               // Web3 purple
}
```

### Next.js

Configuration in `next.config.mjs` includes:
- React Strict Mode
- Image optimization (AVIF, WebP)
- Security headers
- Font caching

---

## Screenshots

### Landing Page
The landing page features a modern dark theme with animated hero section, feature cards, and smooth scrolling.

### Dashboard
The dashboard provides a comprehensive overview with:
- Real-time activity feed
- Quick action buttons
- Reputation charts
- Permission management

---

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

## Acknowledgments

- [Next.js](https://nextjs.org/) - The React Framework
- [Tailwind CSS](https://tailwindcss.com/) - Utility-first CSS
- [Framer Motion](https://www.framer.com/motion/) - Animation library
- [Lucide](https://lucide.dev/) - Beautiful icons
- [Recharts](https://recharts.org/) - Charting library

---

<div align="center">
  <p>Built with ❤️ by the Claw-Nomad Team</p>
  <p>
    <a href="https://claw-nomad.vercel.app">Website</a> •
    <a href="https://claw-nomad.vercel.app/docs">Documentation</a>
  </p>
</div>
