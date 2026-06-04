import { motion } from 'motion/react';
import { X, Check, Save, ShieldAlert, Sliders, Cpu, CloudLightning, RefreshCw, Key } from 'lucide-react';
import { DeviceColor, DeviceColorId } from '../types';
import { useState } from 'react';

interface AetherConfiguratorProps {
  colors: DeviceColor[];
  currentColor: DeviceColor;
  onSelectColor: (color: DeviceColor) => void;
  isOpen: boolean;
  onClose: () => void;
}

export default function AetherConfigurator({
  colors,
  currentColor,
  onSelectColor,
  isOpen,
  onClose,
}: AetherConfiguratorProps) {
  const [pulseRate, setPulseRate] = useState<'slow' | 'medium' | 'fast'>('medium');
  const [securedLink, setSecuredLink] = useState(true);
  const [crypticKey, setCrypticKey] = useState('AE-9008-X83-C7');
  const [isExporting, setIsExporting] = useState(false);

  const generateNewKey = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let key = 'AE-';
    for (let i = 0; i < 4; i++) key += chars.charAt(Math.floor(Math.random() * chars.length));
    key += '-';
    for (let i = 0; i < 3; i++) key += chars.charAt(Math.floor(Math.random() * chars.length));
    key += '-';
    key += chars.charAt(Math.floor(Math.random() * chars.length)) + chars.charAt(Math.floor(Math.random() * chars.length));
    setCrypticKey(key);
  };

  const handleExportConfig = () => {
    setIsExporting(true);
    setTimeout(() => {
      // Create a nice structural text report
      const report = `=========================================
AETHER LABORATORIES - CONFIGURATION BRIEF
=========================================
Device Model: ANC-01 Neural Synthesizer
Core Resonance: ${currentColor.name.toUpperCase()}
Focal Wavelength: ${currentColor.techLabel}
Induction Mode: ${securedLink ? 'Quantum Encrypted' : 'Wide Broadcast'}
Pulse Rate Interval: ${pulseRate.toUpperCase()}
Active Cryptokey: ${crypticKey}
Thermal Limit State: 0.15 Kelvin
Link Bandwidth Peak: 4.8 TB/s
=========================================
STATUS: STABLE & DEPLOYED`;

      const blob = new Blob([report], { type: 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `ANC-01-${currentColor.id}-config.txt`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      setIsExporting(false);
    }, 1200);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-hidden flex justify-end">
      {/* Semi-transparent Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-zinc-950/20 backdrop-blur-xs cursor-pointer"
      />

      {/* Slide-out Sidebar Panel */}
      <motion.div
        initial={{ x: '100%' }}
        animate={{ x: 0 }}
        exit={{ x: '100%' }}
        transition={{ type: 'spring', damping: 26, stiffness: 220 }}
        className="relative w-full max-w-md h-full bg-zinc-950 text-white shadow-2xl flex flex-col border-l border-zinc-850 p-6 sm:p-8"
      >
        {/* Header toolbar */}
        <div className="flex items-center justify-between border-b border-zinc-900 pb-5">
          <div className="flex items-center gap-2">
            <Sliders className="w-4 h-4 text-neutral-400" />
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] font-display">
              CORE LAB CONFIGURATOR
            </h2>
          </div>
          <button
            onClick={onClose}
            aria-label="Close configurator"
            className="w-8 h-8 rounded-full bg-zinc-900 hover:bg-zinc-800 flex items-center justify-center text-zinc-400 hover:text-white transition-colors cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Dynamic configurations form body */}
        <div className="flex-1 overflow-y-auto py-6 space-y-8 pr-2 custom-scrollbar">
          
          {/* Section 1: Selecting the Core Wave color style */}
          <div className="space-y-4">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono">
                01. Core Accent
              </label>
              <span className="text-[11px] text-zinc-500 uppercase tracking-widest font-sans font-medium">
                {currentColor.name}
              </span>
            </div>

            <div className="grid grid-cols-5 gap-3">
              {colors.map((color) => (
                <button
                  key={color.id}
                  onClick={() => onSelectColor(color)}
                  className={`relative flex flex-col items-center justify-center p-3 rounded-2xl bg-zinc-900 border hover:bg-zinc-850 cursor-pointer transition-all ${
                    currentColor.id === color.id
                      ? 'border-neutral-200 shadow-lg scale-105'
                      : 'border-zinc-800'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-full relative ${color.glowColor} border border-white/20 shadow-inner flex items-center justify-center`}>
                    {currentColor.id === color.id && (
                      <Check className="w-3 h-3 text-white drop-shadow-[0_1px_2px_rgba(0,0,0,0.5)]" />
                    )}
                  </div>
                  <span className="text-[9px] mt-2 font-mono text-zinc-400 uppercase tracking-wider block text-center truncate w-full">
                    {color.name.split(' ')[0]}
                  </span>
                </button>
              ))}
            </div>
          </div>

          {/* Section 2: Pulse Rate Frequency */}
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono block">
              02. LED Pulse Emission Rate
            </label>
            <div className="bg-zinc-900 p-1 rounded-xl border border-zinc-850 grid grid-cols-3 gap-1">
              {(['slow', 'medium', 'fast'] as const).map((rate) => (
                <button
                  key={rate}
                  onClick={() => setPulseRate(rate)}
                  className={`py-2 rounded-lg text-xs font-semibold capitalize tracking-wide transition-colors cursor-pointer ${
                    pulseRate === rate
                      ? 'bg-zinc-800 text-white shadow-sm'
                      : 'text-zinc-400 hover:text-zinc-200'
                  }`}
                >
                  {rate === 'slow' ? 'Resonance' : rate === 'medium' ? 'Static' : 'Hyperdrive'}
                </button>
              ))}
            </div>
          </div>

          {/* Section 3: Secure encryption neural link */}
          <div className="space-y-4">
            <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono block">
              03. Neural Link Protocol
            </label>
            <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-850 flex items-center justify-between">
              <div className="flex items-start gap-3">
                <Cpu className="w-5 h-5 text-neutral-400 mt-0.5" />
                <div>
                  <h4 className="text-xs font-bold font-display uppercase tracking-wider">
                    Secured Quantum Auth
                  </h4>
                  <p className="text-[10px] text-zinc-400 leading-relaxed max-w-[200px] mt-0.5">
                    Encrypt core telemetry broadcast streams with end-to-end cryptographic layers.
                  </p>
                </div>
              </div>
              <button
                onClick={() => setSecuredLink(!securedLink)}
                className={`relative w-11 h-6 rounded-full transition-colors duration-300 cursor-pointer ${
                  securedLink ? 'bg-zinc-200' : 'bg-zinc-800'
                }`}
              >
                <div
                  className={`absolute top-1 left-1 w-4 h-4 rounded-full transition-transform duration-300 ${
                    securedLink ? 'translate-x-5 bg-black' : 'translate-x-0 bg-neutral-400'
                  }`}
                />
              </button>
            </div>
          </div>

          {/* Section 4: Crypto Cryptic Code key generator */}
          <div className="space-y-4">
            <div className="flex justify-between items-baseline">
              <label className="text-xs font-bold uppercase tracking-widest text-zinc-400 font-mono">
                04. Hardware Activation Key
              </label>
              <button
                onClick={generateNewKey}
                className="text-[10px] font-bold text-neutral-400 hover:text-white uppercase tracking-wider flex items-center gap-1.5 cursor-pointer"
              >
                <RefreshCw className="w-3 h-3" />
                Regenerate
              </button>
            </div>
            <div className="bg-zinc-900 p-4 rounded-2xl border border-zinc-850 flex items-center justify-between font-mono">
              <div className="flex items-center gap-2.5">
                <Key className="w-4 h-4 text-zinc-400" />
                <span className="text-xs font-semibold tracking-widest text-neutral-200">{crypticKey}</span>
              </div>
              <span className="text-[9px] bg-zinc-800 text-zinc-400 px-2.5 py-1 rounded-md uppercase font-bold tracking-wider">
                ACTIVE
              </span>
            </div>
          </div>
        </div>

        {/* Footer actions for saving and downloading config */}
        <div className="border-t border-zinc-900 pt-6 space-y-4">
          <div className="flex items-center gap-2 text-zinc-500">
            <ShieldAlert className="w-4 h-4 text-orange-400 animate-pulse" />
            <span className="text-[10px] font-bold uppercase tracking-widest font-mono">
              PRE-PRODUCTION BUILD EXP_V01
            </span>
          </div>

          <div className="flex gap-3">
            <button
              onClick={onClose}
              className="flex-1 py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-widest text-zinc-400 hover:text-white bg-zinc-900 hover:bg-zinc-850 border border-zinc-800 transition-colors cursor-pointer text-center"
            >
              Cancel
            </button>
            
            <button
              onClick={handleExportConfig}
              disabled={isExporting}
              className="flex-1 py-3.5 px-4 rounded-xl text-xs font-bold uppercase tracking-widest text-black bg-white hover:bg-zinc-100 disabled:opacity-50 transition-colors flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <Save className="w-3.5 h-3.5" />
              {isExporting ? 'EXPORTING...' : 'SAVE & DOWNLOAD'}
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
