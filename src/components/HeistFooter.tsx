import { motion, useInView } from 'motion/react';
import { useRef } from 'react';
import { ArrowUpRight } from 'lucide-react';

const NAV_LINKS = ['Services', 'Process', 'Testimonials', 'Work'];
const SOCIAL_LINKS = ['X.com', 'LinkedIn', 'Instagram', 'Behance'];

export default function HeistFooter() {
  const sectionRef = useRef<HTMLElement>(null);
  const isInView = useInView(sectionRef, { once: true, margin: '-10% 0px' });

  const wordmarkVariants = {
    hidden: { opacity: 0, y: 60, clipPath: 'inset(100% 0 0 0)' },
    visible: {
      opacity: 1,
      y: 0,
      clipPath: 'inset(0% 0 0 0)',
      transition: { duration: 1.1, ease: [0.16, 1, 0.3, 1], delay: 0.2 },
    },
  };

  const fadeUp = (delay = 0) => ({
    hidden: { opacity: 0, y: 24 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1], delay } },
  });

  return (
    <footer
      ref={sectionRef}
      className="relative w-full overflow-hidden"
      style={{ background: 'linear-gradient(180deg, #0c0c0c 0%, #0a0a0a 100%)' }}
    >
      {/* Top red separator line */}
      <div className="w-full h-px" style={{ background: 'linear-gradient(90deg, transparent, #dc2626 30%, #dc2626 70%, transparent)' }} />

      {/* Subtle red radial glow top-center */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 pointer-events-none"
        style={{ width: 600, height: 300, background: 'radial-gradient(ellipse at top, rgba(220,38,38,0.1) 0%, transparent 70%)', zIndex: 0 }}
      />

      {/* Background dot grid */}
      <div
        className="absolute inset-0 pointer-events-none opacity-[0.04]"
        style={{ backgroundImage: 'radial-gradient(circle, #ffffff 1px, transparent 1px)', backgroundSize: '32px 32px', zIndex: 0 }}
      />

      {/* ── Top content row ───────────────────────────────── */}
      <div className="relative max-w-[1400px] mx-auto px-10 sm:px-16 lg:px-20 pt-24 pb-0" style={{ zIndex: 1 }}>
        <div className="flex flex-col lg:flex-row justify-between items-start gap-16">

          {/* Left: Agency description */}
          <motion.p
            variants={fadeUp(0)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            style={{
              maxWidth: 480,
              fontSize: 16,
              lineHeight: 1.8,
              color: '#7A7A7A',
              fontFamily: 'Inter, sans-serif',
              fontWeight: 400,
            }}
          >
            <span style={{ color: '#dc2626', fontWeight: 600 }}>Money Heist</span> — a resistance-led creative collective.
            We design, build, and ship bold digital experiences that break conventions.
            Every heist is a masterwork.
          </motion.p>

          {/* Right: Two-column nav */}
          <motion.div
            variants={fadeUp(0.1)}
            initial="hidden"
            animate={isInView ? 'visible' : 'hidden'}
            className="flex gap-16 sm:gap-20 flex-shrink-0"
          >
            {/* Col 1 */}
            <div className="flex flex-col" style={{ gap: 28 }}>
              {NAV_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    fontSize: 13,
                    color: '#555',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    transition: 'color 0.25s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#dc2626')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#555')}
                >
                  {link}
                </a>
              ))}
            </div>
            {/* Col 2 */}
            <div className="flex flex-col" style={{ gap: 28 }}>
              {SOCIAL_LINKS.map((link) => (
                <a
                  key={link}
                  href="#"
                  style={{
                    fontSize: 13,
                    color: '#555',
                    fontFamily: 'Inter, sans-serif',
                    fontWeight: 500,
                    letterSpacing: '0.04em',
                    textDecoration: 'none',
                    textTransform: 'uppercase',
                    transition: 'color 0.25s ease',
                  }}
                  onMouseEnter={e => (e.currentTarget.style.color = '#ffffff')}
                  onMouseLeave={e => (e.currentTarget.style.color = '#555')}
                >
                  {link}
                </a>
              ))}
            </div>
          </motion.div>

        </div>



      </div>

      {/* ── Giant Wordmark ───────────────────────────────── */}
      <div className="relative w-full overflow-hidden mt-8 select-none" style={{ paddingLeft: '1vw', paddingRight: '1vw', zIndex: 1 }}>
        <motion.div
          variants={wordmarkVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="w-full"
        >
          {/* "MONEY" — first line, solid white */}
          <div
            className="footer-wordmark w-full text-center"
            style={{
              fontSize: 'clamp(80px, 20vw, 400px)',
              display: 'block',
              fontFamily: "'FK Raster Roman', 'Barlow Condensed', sans-serif",
              fontWeight: 900,
              color: '#ffffff',
            }}
          >
            MONEY
          </div>
          {/* "HEIST" — second line, red stroke outline */}
          <div
            className="footer-wordmark w-full text-center"
            style={{
              fontSize: 'clamp(80px, 20vw, 400px)',
              display: 'block',
              fontFamily: "'FK Raster Roman', 'Barlow Condensed', sans-serif",
              fontWeight: 900,
              color: 'transparent',
              WebkitTextStroke: '2.5px #dc2626',
              marginTop: '-0.06em',
            }}
          >
            HEIST
          </div>
        </motion.div>
      </div>

      {/* ── Bottom bar ───────────────────────────────────── */}
      <motion.div
        variants={fadeUp(0.4)}
        initial="hidden"
        animate={isInView ? 'visible' : 'hidden'}
        className="relative max-w-[1400px] mx-auto px-10 sm:px-16 lg:px-20 py-8 flex flex-col sm:flex-row items-center justify-between gap-4"
        style={{ borderTop: '1px solid rgba(255,255,255,0.06)', zIndex: 1 }}
      >
        <span style={{ fontSize: 12, color: '#444', fontFamily: 'Inter, sans-serif', letterSpacing: '0.04em', textTransform: 'uppercase' }}>
          © 2026 Money Heist Ltd. All rights reserved.
        </span>

        <div className="flex items-center gap-2" style={{ color: '#444', fontSize: 12, fontFamily: 'Inter, sans-serif' }}>
          <span style={{ letterSpacing: '0.05em', textTransform: 'uppercase' }}>Madrid, Spain</span>
          <ArrowUpRight className="w-3 h-3" style={{ color: '#dc2626' }} />
        </div>
      </motion.div>

    </footer>
  );
}
