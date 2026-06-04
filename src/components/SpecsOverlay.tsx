import { motion } from 'motion/react';
import { X, Cpu, Server, Radio, Fan, Compass, Zap, ShieldCheck } from 'lucide-react';
import { DeviceColor } from '../types';

interface SpecsOverlayProps {
  currentColor: DeviceColor;
  isOpen: boolean;
  onClose: () => void;
}

export default function SpecsOverlay({ currentColor, isOpen, onClose }: SpecsOverlayProps) {
  if (!isOpen) return null;

  const schematicSpecs = [
    {
      group: 'CRYOGENIC CORE MODULE',
      items: [
        { label: 'Thermal Output State', value: '0.15K Constant Ambient', details: 'Continuous cooling via isolated liquid nitrogen capillary loop.' },
        { label: 'Superconductor Layer', value: 'Gold-Plated YBCO Matrix', details: 'Achieves high-temperature zero electromagnetic resistance.' }
      ]
    },
    {
      group: 'TELEMETRY BROADCAST',
      items: [
        { label: 'Dynamic Bandwidth', value: '4.8 Terabytes/second', details: 'Full spectrum neural links with hyper-localized mesh relays.' },
        { label: 'Sub-space Receiver', value: 'Hex-Phase Array Antenna', details: 'Resonates at 142Hz for atmospheric signal transparency.' }
      ]
    },
    {
      group: 'INDUCTION HARMONICS',
      items: [
        { label: 'Coupling Efficiency', value: '98.4% Refracted Arc', details: 'Near-perfect inductive power transfer across glass casing.' },
        { label: 'Core Field Geometry', value: 'Toroidal Singularity Flux', details: 'Suppresses surrounding interference up to 3.5 Tesla.' }
      ]
    }
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Semi-transparent Backdrop with heavy blur */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/40 backdrop-blur-md cursor-pointer"
      />

      {/* Holographic Technical Grid Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.98 }}
        transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
        className="relative w-full max-w-5xl bg-zinc-950 text-white rounded-3xl z-10 border border-zinc-800 shadow-[0_40px_100px_rgba(0,0,0,0.4)] overflow-hidden flex flex-col max-h-[85vh] sm:max-h-[80vh]"
      >
        
        {/* Abstract Technical Blueprint Background Matrix Gird lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.015)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.015)_1px,transparent_1px)] bg-[size:20px_20px] pointer-events-none" />
        
        {/* Glassmorphic edge highlight glow matching state colors */}
        <div className={`absolute -top-40 -left-40 w-96 h-96 rounded-full blur-[120px] opacity-15 pointer-events-none ${currentColor.glowClass}`} />

        {/* Blueprint Header */}
        <div className="relative border-b border-zinc-850 p-6 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <div className={`w-3 h-3 rounded-full relative z-10 ${currentColor.glowColor} opacity-75`} />
            <div>
              <h3 className="text-sm font-bold uppercase tracking-[0.25em] font-display">
                ANC-01 HYPER-SCHEMATICS
              </h3>
              <p className="text-[10px] text-zinc-500 font-mono tracking-wider mt-0.5 uppercase">
                AETHER LABS CONFIDENTIAL DIAGNOSTICS BRIEFING
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            aria-label="Close blueprint"
            className="w-10 h-10 rounded-full bg-zinc-900 border border-zinc-800 hover:border-zinc-700 flex items-center justify-center text-zinc-400 hover:text-white transition-all cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Diagonal Technical Spec Grid contents */}
        <div className="relative flex-1 overflow-y-auto p-6 grid grid-cols-1 md:grid-cols-12 gap-8 z-10">
          
          {/* Left Column: Visual schematic orthographic viewport */}
          <div className="col-span-1 md:col-span-6 flex flex-col justify-between bg-zinc-900/40 border border-zinc-850/60 rounded-2xl p-6 min-h-[250px] relative">
            <div>
              <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono">
                ORT-VIEW: ISOMETRIC AXIS
              </span>
              <h4 className="text-xs font-bold text-neutral-300 font-display mt-0.5 tracking-wider">
                CORE GIMBAL SUSPENSION
              </h4>
            </div>

            {/* Simulated Animated Oscilloscope SVG Vector */}
            <div className="w-full h-40 flex items-center justify-center relative my-4">
              <svg className="w-4/5 h-full opacity-35" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="2,2" />
                <circle cx="50" cy="50" r="45" fill="none" stroke="currentColor" strokeWidth="0.5" />
                
                {/* Horizontal sweep trace */}
                <line x1="5" y1="50" x2="95" y2="50" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3,3" />
                <line x1="50" y1="5" x2="50" y2="95" stroke="currentColor" strokeWidth="0.5" strokeDasharray="3,3" />

                {/* Concentric dynamic sine frequency wave */}
                <path
                  d="M 12,50 Q 25,20 38,50 T 62,50 T 88,50"
                  fill="none"
                  stroke={`currentColor`}
                  strokeWidth="0.75"
                  className="text-zinc-400 animate-pulse"
                />
              </svg>

              {/* Central glowing pulse matching color theme */}
              <div className={`absolute w-12 h-12 rounded-full blur-xl opacity-30 ${currentColor.glowColor}`} />
              <div className={`absolute w-2 h-2 rounded-full ${currentColor.glowColor} shadow-[0_0_8px_currentColor]`} />
            </div>

            <div className="grid grid-cols-2 gap-4 border-t border-zinc-850 pt-4 font-mono text-[9px] text-zinc-500">
              <div className="flex flex-col gap-0.5">
                <span>SYSTEM ID: 4880-ANC</span>
                <span>STATUS: STABLE PROTO</span>
              </div>
              <div className="flex flex-col gap-0.5 text-right">
                <span>ACCURACY: +/-0.002%</span>
                <span>CRYPT PROTOCOL: SE-V1</span>
              </div>
            </div>
          </div>

          {/* Right Column: Key structured specifications table */}
          <div className="col-span-1 md:col-span-6 space-y-6">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest font-mono block">
              SPECIFICATION INDEX DATA
            </span>

            <div className="space-y-6">
              {schematicSpecs.map((group, groupIdx) => (
                <div key={groupIdx} className="space-y-3">
                  <h5 className="text-[10px] font-bold text-zinc-400 font-mono tracking-wider uppercase border-b border-zinc-900 pb-1.5 flex items-center gap-1.5">
                    {group.group === 'CRYOGENIC CORE MODULE' && <Cpu className="w-3.5 h-3.5" />}
                    {group.group === 'TELEMETRY BROADCAST' && <Radio className="w-3.5 h-3.5" />}
                    {group.group === 'INDUCTION HARMONICS' && <Zap className="w-3.5 h-3.5" />}
                    {group.group}
                  </h5>

                  <div className="space-y-4">
                    {group.items.map((item, itemIdx) => (
                      <div key={itemIdx} className="grid grid-cols-1 sm:grid-cols-12 gap-1 sm:gap-4 items-start text-left">
                        <div className="sm:col-span-5 text-zinc-400 font-sans text-xs">
                          {item.label}
                        </div>
                        <div className="sm:col-span-7 space-y-1">
                          <span className="text-zinc-100 font-display font-semibold font-bold text-xs tracking-wide block">
                            {item.value}
                          </span>
                          <span className="text-[10px] text-zinc-500 font-sans leading-relaxed block">
                            {item.details}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Blueprint Footer */}
        <div className="relative bg-zinc-900 px-6 py-4 flex flex-col sm:flex-row items-center justify-between border-t border-zinc-850 z-10 gap-2">
          <div className="flex items-center gap-2 text-zinc-400 text-[10px] font-mono">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>ACCELERATOR COMPONENT CERTIFIED AT HIGHEST BENCHMARKS</span>
          </div>
          <span className="text-[9px] text-zinc-600 font-mono">
            AETHER® LAB RESEARCH CO. © 2026/G-9
          </span>
        </div>
      </motion.div>
    </div>
  );
}
