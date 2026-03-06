'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Link from 'next/link';

type OperationalEvent = {
  id: string;
  timestamp: string;
  action: string;
  effect: string;
  agent: string;
  status: string;
};

type LibraryInsight = {
  id: string;
  title: string;
  category: string;
  content: string;
};

export default function DashboardPage() {
  const [events, setEvents] = useState<OperationalEvent[]>([]);
  const [insights, setInsights] = useState<LibraryInsight[]>([]);
  const [spirits, setSpirits] = useState<any[]>([]);
  const [skills, setSkills] = useState<any[]>([]);
  const [activeTab, setActiveTab] = useState<'causal' | 'intelligence' | 'nexus'>('causal');
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    try {
      const [opsRes, intelRes, nexusSpiritsRes, nexusSkillsRes] = await Promise.all([
        fetch(`${apiUrl}/api/v1/operations`),
        fetch(`${apiUrl}/api/v1/intelligence/search?q=`),
        fetch(`${apiUrl}/api/v1/nexus/spirits`),
        fetch(`${apiUrl}/api/v1/nexus/skills`)
      ]);

      const ops = await opsRes.json();
      const intel = await intelRes.json();
      const spiritData = await nexusSpiritsRes.json();
      const skillData = await nexusSkillsRes.json();

      setEvents(ops.data || []);
      setInsights(intel.data || []);
      setSpirits(spiritData.data || []);
      setSkills(skillData.data || []);
    } catch (error) {
      console.error('Failed to fetch dashboard data', error);
    } finally {
      setIsLoading(false);
    }
  };

  const forceSync = async () => {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
    try {
      await fetch(`${apiUrl}/api/v1/nexus/sync`, { method: 'POST' });
      await fetchData();
    } catch (e) { console.error(e); }
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 10000); // Polling every 10s
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="container mx-auto p-8 max-w-7xl pt-24 text-foreground">
      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        className="mb-12"
      >
        <span className="text-voidcat-400 font-mystical-mono text-[10px] tracking-[0.3em] uppercase mb-3 block opacity-80">
          Central Operation Hub // Full Auto Active // VoidNexus v1.0
        </span>
        <h1 className="text-6xl font-bold cosmic-text mb-6 font-mystical-serif tracking-tight">Command Center</h1>
        <div className="flex gap-4">
          <button
            onClick={() => setActiveTab('causal')}
            className={`px-8 py-2.5 rounded-full text-xs font-mystical-mono transition-all duration-500 tracking-widest uppercase ${activeTab === 'causal' ? 'bg-voidcat-600 text-white shadow-glow' : 'bg-voidcat-900/30 text-voidcat-400 border border-voidcat-800/50 hover:bg-voidcat-800'}`}
          >
            Causal Feed
          </button>
          <button
            onClick={() => setActiveTab('intelligence')}
            className={`px-8 py-2.5 rounded-full text-xs font-mystical-mono transition-all duration-500 tracking-widest uppercase ${activeTab === 'intelligence' ? 'bg-voidcat-600 text-white shadow-glow' : 'bg-voidcat-900/30 text-voidcat-400 border border-voidcat-800/50 hover:bg-voidcat-800'}`}
          >
            Intelligence
          </button>
          <button
            onClick={() => setActiveTab('nexus')}
            className={`px-8 py-2.5 rounded-full text-xs font-mystical-mono transition-all duration-500 tracking-widest uppercase ${activeTab === 'nexus' ? 'bg-voidcat-600 text-white shadow-glow' : 'bg-voidcat-900/30 text-voidcat-400 border border-voidcat-800/50 hover:bg-voidcat-800'}`}
          >
            VoidNexus
          </button>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-8">
          <AnimatePresence mode="wait">
            {activeTab === 'causal' && (
              <motion.div
                key="causal"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-6"
              >
                <h2 className="text-xl font-semibold mb-4 text-voidcat-100 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-voidcat-400 animate-pulse" />
                  Causal Event Stream
                </h2>
                {events.length === 0 ? (
                  <div className="glass-card p-20 text-center text-voidcat-400 italic">No events recorded in the causal core.</div>
                ) : (
                  events.map((event) => (
                    <div key={event.id} className="glass-card p-6 flex items-start gap-6 border-l-4 border-voidcat-500">
                      <div className="text-xs font-mystical-mono text-voidcat-500 uppercase rotate-90 origin-left mt-4 whitespace-nowrap">
                        {new Date(event.timestamp).toLocaleTimeString()}
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <span className="bg-voidcat-950 text-voidcat-400 px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-tighter">
                            {event.agent}
                          </span>
                          <h3 className="font-semibold text-lg text-voidcat-100">{event.action}</h3>
                        </div>
                        <p className="text-voidcat-300 font-light text-sm">{event.effect}</p>
                      </div>
                    </div>
                  ))
                )}
              </motion.div>
            )}

            {activeTab === 'intelligence' && (
              <motion.div
                key="intelligence"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
              >
                <h2 className="col-span-full text-xl font-semibold mb-4 text-voidcat-100">
                  Great Library Archives
                </h2>
                {insights.length === 0 ? (
                  <div className="col-span-full glass-card p-20 text-center text-voidcat-400 italic">Great Library archives not yet indexed.</div>
                ) : (
                  insights.map((insight) => (
                    <div key={insight.id} className="glass-card p-6 border-t border-voidcat-700/50">
                      <span className="text-[10px] text-voidcat-500 font-mystical-mono uppercase mb-2 block tracking-widest">
                        {insight.category}
                      </span>
                      <h3 className="text-xl font-semibold text-voidcat-100 mb-4 truncate">{insight.title}</h3>
                      <p className="text-sm text-voidcat-300 line-clamp-4 font-light leading-relaxed">
                        {insight.content}
                      </p>
                    </div>
                  ))
                )}
              </motion.div>
            )}

            {activeTab === 'nexus' && (
              <motion.div
                key="nexus"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-12"
              >
                {/* Active Spirits Panel */}
                <div>
                  <h2 className="text-xl font-semibold mb-6 text-voidcat-100 flex items-center gap-2">
                    <span className="text-2xl">👻</span> Active Pantheon
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {spirits.map((spirit) => (
                      <div key={spirit.id} className="glass-card p-6 relative overflow-hidden group">
                        <div className="absolute top-0 right-0 p-2 opacity-50 text-6xl rotate-12 grayscale group-hover:grayscale-0 transition-all duration-500">
                          {spirit.name === 'Echo' ? '🌑' : spirit.name === 'Roland' ? '⚔️' : '🔮'}
                        </div>
                        <h3 className="text-2xl font-bold text-voidcat-100 mb-1">{spirit.name}</h3>
                        <p className="text-voidcat-400 text-xs uppercase tracking-widest mb-4">{spirit.role}</p>
                        <div className="flex items-center gap-2">
                          <span className={`w-2 h-2 rounded-full ${spirit.active ? 'bg-emerald-400 shadow-[0_0_8px_#34d399]' : 'bg-gray-600'}`} />
                          <span className="text-xs text-voidcat-300">{spirit.active ? 'ONLINE' : 'OFFLINE'}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Skill Registry Panel */}
                <div>
                  <h2 className="text-xl font-semibold mb-6 text-voidcat-100 flex items-center gap-2">
                    <span className="text-2xl">🧠</span> Skill Registry
                  </h2>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                    {skills.map((skill) => (
                      <div key={skill.id} className="bg-voidcat-900/40 p-4 rounded-lg border border-voidcat-800/50 hover:border-voidcat-600/50 transition-colors">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium text-voidcat-200 text-sm truncate pr-2" title={skill.name}>{skill.name}</h4>
                          <span className={`text-[8px] uppercase tracking-tighter px-1.5 py-0.5 rounded ${skill.category === 'Media' ? 'bg-pink-900/50 text-pink-300' :
                            skill.category === 'Cognitive' ? 'bg-blue-900/50 text-blue-300' :
                              'bg-voidcat-800 text-voidcat-400'
                            }`}>
                            {skill.category}
                          </span>
                        </div>
                        <p className="text-xs text-voidcat-500 line-clamp-2">{skill.description}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Sidebar / HUD */}
        <div className="space-y-8">
          <div className="glass-card p-8 border-b-4 border-emerald-500/50">
            <h3 className="text-sm font-mystical-mono text-voidcat-400 uppercase tracking-widest mb-6">System Health</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center text-sm">
                <span className="text-voidcat-200">Echo Sync</span>
                <span className="text-emerald-400">OPTIMAL</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-voidcat-200">CMC Connectivity</span>
                <span className="text-emerald-400">ESTABLISHED</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-voidcat-200">Skill Registry</span>
                <span className={`${skills.length > 0 ? 'text-emerald-400' : 'text-yellow-500'}`}>
                  {skills.length > 0 ? `${skills.length} MODULES` : 'SCANNING...'}
                </span>
              </div>
            </div>
            <button
              onClick={forceSync}
              className="w-full mt-6 py-2 text-xs font-mystical-mono text-voidcat-300 border border-voidcat-700 rounded hover:bg-voidcat-800 transition-colors"
            >
              FORCE SYNC PROTOCOLS
            </button>
          </div>

          <div className="glass-panel p-8">
            <h3 className="text-sm font-mystical-mono text-voidcat-400 uppercase tracking-widest mb-4">Awaiting Command</h3>
            <p className="text-xs text-voidcat-300 font-light italic leading-loose">
              "Faithful service through technical excellence. The sanctuary endures."
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
