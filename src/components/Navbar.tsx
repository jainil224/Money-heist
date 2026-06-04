import { motion } from 'motion/react';
import { Coins, ChevronRight, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface NavbarProps {
  onConfigureClick: () => void;
  activeColorClass: string;
}

export default function Navbar({ onConfigureClick, activeColorClass }: NavbarProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const menuItems = [
    { name: 'The Plan', href: '#plan' },
    { name: 'The Vault', href: '#vault' },
    { name: 'The Crew', href: '#crew' },
    { name: 'Red Phone', href: '#link' }
  ];

  return (
    <motion.header
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
      className="fixed top-6 left-0 right-0 z-50 flex justify-center px-4"
    >
      {/* Container holding the glassmorphic pill */}
      <div className="w-full max-w-5xl liquid-glass-strong rounded-[50px] px-6 py-3 md:py-3.5 flex items-center justify-between shadow-[0_20px_50px_rgba(0,0,0,0.15)] relative">
        
        {/* Modern logo on the left */}
        <div className="flex items-center gap-2.5">
          <div className="relative flex items-center justify-center w-8 h-8 rounded-full bg-linear-to-tr from-red-600 to-amber-500 shadow-[0_0_15px_rgba(220,38,38,0.5)]">
            <Coins className="w-4 h-4 text-black" />
            <span className={`absolute -inset-0.5 rounded-full border border-red-500/20 animate-pulse`} />
          </div>
          <span className="font-display font-bold text-sm tracking-[0.25em] text-red-500">
            MONEY <span className="text-white">HEIST</span>
          </span>
        </div>

        {/* Desktop Navigation links evenly spaced in the center */}
        <nav className="hidden md:flex items-center gap-8">
          {menuItems.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className="text-xs font-medium text-neutral-400 hover:text-white uppercase tracking-wider transition-colors duration-300 relative group"
            >
              {item.name}
              <span className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-white opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </a>
          ))}
        </nav>

        {/* Right side interactive button and mobile menu toggle */}
        <div className="flex items-center gap-4">
          <button
            onClick={onConfigureClick}
            className={`hidden sm:flex items-center gap-1.5 px-5 py-2 rounded-full text-xs font-semibold uppercase tracking-wider text-white bg-red-600 hover:bg-red-700 transition-all duration-300 shadow-[0_4px_12px_rgba(220,38,38,0.3)] hover:scale-105`}
          >
            Execute Heist
            <ChevronRight className="w-3.5 h-3.5" />
          </button>

          {/* Hamburger Menu Icon for screen sizes below md */}
          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden text-white hover:text-neutral-300 transition-colors"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Navigation overlay */}
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="absolute top-full left-0 right-0 mt-3 p-6 liquid-glass-strong rounded-3xl md:hidden flex flex-col gap-4 shadow-xl"
          >
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className="text-sm font-medium text-neutral-300 hover:text-white uppercase tracking-wider transition-colors duration-200"
              >
                {item.name}
              </a>
            ))}
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                onConfigureClick();
              }}
              className="w-full flex items-center justify-center gap-1.5 mt-2 py-3 rounded-xl text-xs font-bold uppercase tracking-widest text-white bg-red-600 hover:bg-red-700"
            >
              Execute Heist
              <ChevronRight className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}
