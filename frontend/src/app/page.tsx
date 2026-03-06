'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

export default function HomePage() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-center p-6 text-center">
      <div className="max-w-4xl w-full">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center mb-12"
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="mb-8 relative"
          >
            <div className="absolute inset-0 bg-voidcat-500/20 blur-[40px] rounded-full animate-mystical-pulse" />
            <Image
              src="/logo.png"
              alt="VoidCat RDC Logo"
              width={160}
              height={160}
              className="relative z-10 drop-shadow-[0_0_15px_rgba(124,58,237,0.5)]"
            />
          </motion.div>

          <motion.h1
            className="text-7xl md:text-8xl font-bold mb-4 tracking-tighter font-mystical-serif"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            <span className="cosmic-text drop-shadow-[0_0_20px_rgba(124,58,237,0.4)]">VoidCat BMS</span>
          </motion.h1>

          <motion.p
            className="text-xl md:text-2xl text-voidcat-200 mb-12 max-w-2xl font-light font-mystical-sans leading-relaxed"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.8 }}
          >
            Entry into the digital sanctuary of <span className="text-voidcat-400 font-medium">AI-Human Collaborative Intelligence</span>.
          </motion.p>
        </motion.div>

        {/* Action Board */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.8 }}
          className="glass-card p-10 max-w-3xl mx-auto border-t border-white/10"
        >
          <div className="flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="text-left">
              <h2 className="text-2xl font-semibold mb-2 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-voidcat-400 animate-pulse" />
                Vessel Status: Active
              </h2>
              <p className="text-voidcat-300 font-mystical-mono text-sm uppercase tracking-widest">
                System Awaiting Command...
              </p>
            </div>

            <div className="flex gap-4">
              <Link href="/dashboard">
                <button className="mystical-button bg-voidcat-800/50 backdrop-blur-md border border-voidcat-700/50 hover:bg-voidcat-700">
                  Dashboard
                </button>
              </Link>
              <button className="mystical-button">
                Initialize Sync
              </button>
            </div>
          </div>
        </motion.div>

        {/* Footer info */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2, duration: 1 }}
          className="mt-20 text-voidcat-400/60 text-sm tracking-widest uppercase"
        >
          Proprietary Intelligence Protocol // VoidCat RDC
        </motion.div>
      </div>
    </main>
  );
}
