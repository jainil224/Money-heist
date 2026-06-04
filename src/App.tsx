import { useState, useEffect, useRef } from 'react';
import { AnimatePresence, motion } from 'motion/react';
import Navbar from './components/Navbar';
import AetherConfigurator from './components/AetherConfigurator';
import SpecsOverlay from './components/SpecsOverlay';
import HeistFooter from './components/HeistFooter';
import { DeviceColor } from './types';
import { Shield, RefreshCw, Map, Vault, Fingerprint } from 'lucide-react';

const DEVICE_COLORS: DeviceColor[] = [
  {
    id: 'tokyo',
    name: 'Tokyo Red',
    glowColor: 'bg-red-600 shadow-[0_0_40px_#dc2626]',
    accentClass: 'text-red-500',
    glowClass: 'from-red-600 via-orange-500 to-yellow-400 bg-linear-to-tr',
    techLabel: 'HEIST_RESISTANCE_R1',
  },
  {
    id: 'berlin',
    name: 'Berlin Gold',
    glowColor: 'bg-amber-500 shadow-[0_0_40px_#f59e0b]',
    accentClass: 'text-amber-500',
    glowClass: 'from-amber-400 via-yellow-500 to-amber-200 bg-linear-to-tr',
    techLabel: 'ROYAL_MINT_LEADER_G2',
  },
  {
    id: 'nairobi',
    name: 'Nairobi Emerald',
    glowColor: 'bg-emerald-500 shadow-[0_0_40px_#10b981]',
    accentClass: 'text-emerald-500',
    glowClass: 'from-emerald-400 via-teal-300 to-green-100 bg-linear-to-tr',
    techLabel: 'PRINTING_PRESS_N3',
  },
  {
    id: 'professor',
    name: 'Professor Obsidian',
    glowColor: 'bg-neutral-400 shadow-[0_0_40px_#a3a3a3]',
    accentClass: 'text-neutral-400',
    glowClass: 'from-neutral-300 via-stone-400 to-zinc-200 bg-linear-to-tr',
    techLabel: 'THE_BRAIN_P0',
  },
  {
    id: 'rio',
    name: 'Rio Cyber',
    glowColor: 'bg-blue-500 shadow-[0_0_40px_#3b82f6]',
    accentClass: 'text-blue-500',
    glowClass: 'from-blue-400 via-sky-300 to-indigo-200 bg-linear-to-tr',
    techLabel: 'MAINFRAME_HACK_R7',
  },
];

const VAULT_STATS = [
  { label: 'Currency Printed', value: '€984M', sub: 'Royal Mint Phase I', icon: Vault },
  { label: 'Gold Extracted', value: '90 Tons', sub: 'Bank of Spain', icon: Fingerprint },
  { label: 'Hostages Managed', value: '67', sub: 'Zero casualties', icon: Map },
  { label: 'Hours in the Vault', value: '413 hrs', sub: 'Combined ops time', icon: Shield },
];

export default function App() {
  const [currentColor, setCurrentColor] = useState<DeviceColor>(DEVICE_COLORS[0]);
  const [isConfiguratorOpen, setIsConfiguratorOpen] = useState(false);
  const [isSpecsOpen, setIsSpecsOpen] = useState(false);

  const [maskUrl, setMaskUrl] = useState<string>('');
  const [gridX, setGridX] = useState<number>(0);
  const [gridY, setGridY] = useState<number>(0);

  const [alignmentX] = useState<number>(0); 
  const [alignmentY] = useState<number>(0);

  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const targetX = useRef<number>(0);
  const targetY = useRef<number>(0);
  const smoothX = useRef<number>(0);
  const smoothY = useRef<number>(0);

  const gridOffsetX = useRef<number>(0);
  const gridOffsetY = useRef<number>(0);

  const dimensions = useRef({ width: 1920, height: 1080 });

  useEffect(() => {
    targetX.current = window.innerWidth / 2;
    targetY.current = window.innerHeight / 2;
    smoothX.current = window.innerWidth / 2;
    smoothY.current = window.innerHeight / 2;
    dimensions.current = { width: window.innerWidth, height: window.innerHeight };

    const handleMouseMove = (e: MouseEvent) => {
      targetX.current = e.clientX;
      targetY.current = e.clientY;
    };

    const handleResize = () => {
      dimensions.current = { width: window.innerWidth, height: window.innerHeight };
      if (canvasRef.current) {
        canvasRef.current.width = window.innerWidth;
        canvasRef.current.height = window.innerHeight;
      }
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    if (canvasRef.current) {
      canvasRef.current.width = window.innerWidth;
      canvasRef.current.height = window.innerHeight;
    }

    let animationId: number;

    const updateFrame = () => {
      smoothX.current += (targetX.current - smoothX.current) * 0.1;
      smoothY.current += (targetY.current - smoothY.current) * 0.1;

      const width = dimensions.current.width || 1920;
      const height = dimensions.current.height || 1080;

      const nx = (smoothX.current / width) - 0.5;
      const ny = (smoothY.current / height) - 0.5;

      gridOffsetX.current += nx * 16;
      gridOffsetY.current += ny * 16;

      setGridX(gridOffsetX.current % 48);
      setGridY(gridOffsetY.current % 48);

      const canvas = canvasRef.current;
      if (canvas) {
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.clearRect(0, 0, canvas.width, canvas.height);

          const cursorX = smoothX.current;
          const cursorY = smoothY.current;

          const gradient = ctx.createRadialGradient(cursorX, cursorY, 0, cursorX, cursorY, 260);
          gradient.addColorStop(0, "rgba(255,255,255,1)");
          gradient.addColorStop(0.4, "rgba(255,255,255,1)");
          gradient.addColorStop(0.6, "rgba(255,255,255,0.75)");
          gradient.addColorStop(0.75, "rgba(255,255,255,0.4)");
          gradient.addColorStop(0.88, "rgba(255,255,255,0.12)");
          gradient.addColorStop(1, "rgba(255,255,255,0)");

          ctx.beginPath();
          ctx.arc(cursorX, cursorY, 260, 0, Math.PI * 2);
          ctx.fillStyle = gradient;
          ctx.fill();

          setMaskUrl(canvas.toDataURL());
        }
      }

      animationId = requestAnimationFrame(updateFrame);
    };

    animationId = requestAnimationFrame(updateFrame);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      cancelAnimationFrame(animationId);
    };
  }, []);

  return (
    <div className="relative w-full bg-zinc-950 text-white selection:bg-neutral-100 selection:text-black overflow-x-hidden">

      {/* Hidden processing canvas */}
      <canvas ref={canvasRef} className="hidden" />

      {/* Header Navigation */}
      <Navbar
        onConfigureClick={() => setIsConfiguratorOpen(true)}
        activeColorClass={currentColor.accentClass}
      />

      {/* ─── SECTION 1: HERO ───────────────────────────────── */}
      <section id="plan" className="relative w-full h-screen overflow-hidden">

        {/* Static Background */}
        <div
          className="absolute inset-0 bg-center bg-cover bg-no-repeat z-0"
          style={{ backgroundImage: "url('https://res.cloudinary.com/dgqd54pbl/image/upload/v1780577997/1_jkwbbs.png')" }}
        />

        {/* Dynamic Reveal Layer */}
        <div
          className="absolute inset-0 bg-cover bg-no-repeat z-1 pointer-events-none"
          style={{
            backgroundImage: "url('https://res.cloudinary.com/dgqd54pbl/image/upload/v1780577997/2_o4rbir.png')",
            backgroundPosition: `calc(50% + ${alignmentX}px) calc(50% + ${alignmentY}px)`,
            WebkitMaskImage: maskUrl ? `url(${maskUrl})` : 'none',
            maskImage: maskUrl ? `url(${maskUrl})` : 'none',
            WebkitMaskRepeat: 'no-repeat',
            maskRepeat: 'no-repeat',
            WebkitMaskSize: '100% 100%',
            maskSize: '100% 100%',
            WebkitMaskPosition: '0 0',
            maskPosition: '0 0',
          }}
        />

        {/* Grid HUD */}
        <svg className="absolute inset-0 w-full h-full opacity-15 pointer-events-none z-2">
          <defs>
            <pattern id="grid" width="48" height="48" patternUnits="userSpaceOnUse" x={gridX} y={gridY}>
              <path d="M 48 0 L 0 0 0 48" fill="none" stroke="#64748b" strokeWidth="0.6" />
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#grid)" />
        </svg>

        {/* Vignette */}
        <div className="absolute inset-0 bg-radial from-transparent via-black/30 to-black/70 pointer-events-none z-2" />

        {/* Hero Content — text removed, visuals only */}
        <main className="relative h-full w-full max-w-7xl mx-auto px-6 sm:px-12 flex flex-col justify-end pb-28 md:pb-24 z-10 select-none pointer-events-none" />


      </section>


      {/* ─── SECTION 2: THE VAULT STATS ───────────────────── */}
      <section id="link" className="relative w-full py-28 bg-zinc-950 overflow-hidden">

        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[1px] bg-gradient-to-r from-transparent via-emerald-700/40 to-transparent" />
        {/* Diagonal stripe bg */}
        <div className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{ backgroundImage: 'repeating-linear-gradient(45deg, #fff 0, #fff 1px, transparent 0, transparent 50%)', backgroundSize: '24px 24px' }} />

        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 z-10">

          {/* Section header */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="mb-16 flex flex-col gap-3"
          >
            <span className="text-[10px] font-mono uppercase tracking-[0.3em] text-emerald-500 flex items-center gap-2">
              <span className="inline-block w-8 h-px bg-emerald-600" />
              SECTION 04 — SPOILS & INTEL
            </span>
            <h2 className="text-3xl sm:text-5xl font-bold font-display text-white tracking-tight">
              The Vault
            </h2>
            <p className="text-sm text-zinc-400 max-w-xl leading-relaxed">
              What was taken. What was printed. What was left behind. The numbers that shook two central banks and a continent.
            </p>
          </motion.div>

          {/* Stats grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 mb-20">
            {VAULT_STATS.map((stat, i) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: i * 0.1 }}
                  className="liquid-glass-strong rounded-2xl p-6 flex flex-col gap-4 hover:scale-[1.02] transition-transform duration-300 group"
                >
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-xl bg-zinc-800/80 flex items-center justify-center">
                      <Icon className="w-4.5 h-4.5 text-zinc-400 group-hover:text-white transition-colors" />
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500 uppercase tracking-widest">{stat.label}</span>
                  </div>
                  <div>
                    <div className="text-3xl font-bold font-display text-white tracking-tight">{stat.value}</div>
                    <div className="text-[10px] text-zinc-500 font-mono mt-1 uppercase tracking-wider">{stat.sub}</div>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Bottom "Bella Ciao" call-to-action strip */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative rounded-3xl overflow-hidden liquid-glass-strong p-10 flex flex-col md:flex-row items-center justify-between gap-8"
          >
            {/* Red glow accent */}
            <div className="absolute -top-20 -left-20 w-64 h-64 rounded-full bg-red-600/10 blur-[80px] pointer-events-none" />

            <div className="flex flex-col gap-2 max-w-xl">
              <span className="text-[10px] font-mono text-red-500 uppercase tracking-[0.3em]">FINAL TRANSMISSION</span>
              <h3 className="text-2xl sm:text-3xl font-bold font-display text-white leading-tight">
                "Bella Ciao, Bella Ciao,<br />
                <span className="text-red-400">Bella Ciao, Ciao, Ciao."</span>
              </h3>
              <p className="text-xs text-zinc-400 leading-relaxed mt-1">
                A song of resistance. The anthem of the revolution. Sung by those who chose to fight — inside and outside the walls.
              </p>
            </div>

            <button
              onClick={() => setIsConfiguratorOpen(true)}
              className="flex-shrink-0 flex items-center gap-2 px-7 py-3.5 rounded-full text-sm font-bold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 transition-all duration-300 shadow-[0_0_30px_rgba(220,38,38,0.3)] hover:scale-105"
            >
              Join the Resistance
              <Map className="w-4 h-4" />
            </button>
          </motion.div>

        </div>

        {/* Page footer */}
        <div className="relative max-w-7xl mx-auto px-6 sm:px-12 mt-20 flex flex-col sm:flex-row items-center justify-between text-[10px] font-mono tracking-wider text-zinc-600 gap-3 select-none">
          <div className="flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-red-800 animate-pulse" />
            <span>PORT OK SECURE_LINE // EL PROFESOR</span>
          </div>
          <div className="hidden md:flex items-center gap-2 uppercase tracking-widest">
            <RefreshCw className="w-3 h-3 text-red-800 animate-spin-slow" />
            <span>Bella Ciao - Resistance System Active</span>
          </div>
          <div>
            <span>LA BANDA DE PAPEL © 2026</span>
          </div>
        </div>

      </section>

      {/* ─── PREMIUM FOOTER ────────────────────────────── */}
      <HeistFooter />

      {/* Slide-Over Drawers & Specs Blueprint Overlays */}
      <AnimatePresence>
        {isConfiguratorOpen && (
          <AetherConfigurator
            colors={DEVICE_COLORS}
            currentColor={currentColor}
            onSelectColor={setCurrentColor}
            isOpen={isConfiguratorOpen}
            onClose={() => setIsConfiguratorOpen(false)}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isSpecsOpen && (
          <SpecsOverlay
            currentColor={currentColor}
            isOpen={isSpecsOpen}
            onClose={() => setIsSpecsOpen(false)}
          />
        )}
      </AnimatePresence>

    </div>
  );
}
