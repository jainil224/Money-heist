# 🔴 Money Heist — La Casa de Papel

> *"Bella Ciao, Bella Ciao, Bella Ciao, Ciao, Ciao."*

A cinematic, ultra-premium **Money Heist (La Casa de Papel)** themed landing page built with React, TypeScript, Vite, and Framer Motion. Featuring a mouse-reactive spotlight hero, animated heist stats, a dark luxury footer, and an interactive heist configurator overlay.

---

## 🖥️ Live Preview

![Money Heist Banner](https://res.cloudinary.com/dgqd54pbl/image/upload/v1780577997/1_jkwbbs.png)

---

## ✨ Features

- 🎬 **Cinematic Hero Section** — Full-screen dual-layer background with mouse-reactive radial spotlight reveal
- 🔴 **Money Heist Navbar** — Branded navigation with "Execute Heist" CTA
- 🏦 **Vault Stats Section** — Animated heist statistics with glassmorphism cards
- 🌑 **Premium Dark Footer** — Giant editorial wordmark (MONEY / HEIST), two-column nav, and bottom bar
- ⚙️ **Heist Configurator** — Interactive slide-over panel to switch crew color themes
- 🎭 **Specs Blueprint Overlay** — Full-screen tactical overlay
- 🔵 **HUD Grid Animation** — Live moving grid tied to mouse movement
- 💎 **Liquid Glass UI** — Glassmorphism cards and panels with backdrop blur
- 🎨 **5 Crew Color Themes** — Tokyo Red, Berlin Gold, Nairobi Emerald, Professor Obsidian, Rio Cyber

---

## 🛠️ Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| [React](https://react.dev/) | ^19.0.1 | UI Framework |
| [TypeScript](https://www.typescriptlang.org/) | ~5.8.2 | Type Safety |
| [Vite](https://vitejs.dev/) | ^6.2.3 | Build Tool & Dev Server |
| [Tailwind CSS](https://tailwindcss.com/) | ^4.1.14 | Utility-first Styling |
| [Framer Motion](https://motion.dev/) | ^12.23.24 | Animations & Transitions |
| [Lucide React](https://lucide.dev/) | ^0.546.0 | Icon Library |
| [Express](https://expressjs.com/) | ^4.21.2 | Backend Server |
| [@google/genai](https://ai.google.dev/) | ^2.4.0 | Gemini AI Integration |

---

## 📁 Project Structure

```
ho-main/
├── public/
│   └── fonts/               # Custom font files (FK Raster Roman)
├── src/
│   ├── components/
│   │   ├── Navbar.tsx        # Money Heist branded navigation
│   │   ├── HeistFooter.tsx   # Premium dark footer with wordmark
│   │   ├── AetherConfigurator.tsx  # Slide-over crew configurator
│   │   └── SpecsOverlay.tsx  # Full-screen blueprint overlay
│   ├── App.tsx               # Main app — Hero + Vault Stats sections
│   ├── index.css             # Global styles + liquid glass CSS
│   ├── main.tsx              # Entry point
│   └── types.ts              # TypeScript type definitions
├── index.html
├── vite.config.ts
├── tsconfig.json
└── package.json
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher
- **npm** v9 or higher

### Installation

```bash
# 1. Clone the repository
git clone https://github.com/jainil224/Money-heist.git
cd Money-heist

# 2. Install dependencies
npm install

# 3. Start the development server
npm run dev
```

The app will be available at **http://localhost:3000**

---

## 📜 Available Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start local development server on port 3000 |
| `npm run build` | Build production bundle to `dist/` |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run TypeScript type checks |
| `npm run clean` | Remove `dist/` and `server.js` |

---

## 🎨 Color Themes

The Heist Configurator lets you switch between 5 crew-inspired color themes:

| Theme | Color | Code Name |
|---|---|---|
| 🔴 Tokyo Red | `#dc2626` | `HEIST_RESISTANCE_R1` |
| 🟡 Berlin Gold | `#f59e0b` | `ROYAL_MINT_LEADER_G2` |
| 🟢 Nairobi Emerald | `#10b981` | `PRINTING_PRESS_N3` |
| ⚫ Professor Obsidian | `#a3a3a3` | `THE_BRAIN_P0` |
| 🔵 Rio Cyber | `#3b82f6` | `MAINFRAME_HACK_R7` |

---

## 🔤 Custom Font

This project is designed for the **FK Raster Roman Compact Smooth** font by [Florian Karsten Typefaces](https://floriankarsten.com/) for the footer wordmark. This is a **commercial font** and is not included in the repository.

To use it:
1. Purchase the font from Florian Karsten Typefaces
2. Place `FKRasterRomanCompactSmooth.woff2` and `FKRasterRomanCompactSmooth.woff` in `/public/fonts/`

**Fallback:** The project gracefully falls back to **Barlow Condensed 900** (loaded from Google Fonts) if the font files are not present.

---

---

## 🏗️ Build for Production

```bash
npm run build
```

Output files will be in the `dist/` directory. Deploy these to any static hosting provider (Vercel, Netlify, GitHub Pages, etc.).

---

## 📄 License

This project is for educational and personal portfolio use only.

**Money Heist / La Casa de Papel** is a trademark of Netflix and Vancouver Media. This fan project is not affiliated with or endorsed by Netflix.

---

## 👤 Author

**Jainil Patel**
- GitHub: [@jainil224](https://github.com/jainil224)

---

<div align="center">

*"The mask goes on. The heist begins."* 🔴

**⭐ Star this repo if you liked it!**

</div>
