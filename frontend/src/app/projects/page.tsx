'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { motion } from 'framer-motion';

type Project = {
  id: string;
  name: string;
  description: string | null;
  startDate: string | null;
  endDate: string | null;
};

export default function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchProjects = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      try {
        const response = await fetch(`${apiUrl}/api/v1/projects`);
        if (!response.ok) {
          throw new Error('Failed to fetch projects');
        }
        const data = await response.json();
        setProjects(data.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjects();
  }, []);

  if (isLoading) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center">
        <div className="w-12 h-12 border-4 border-voidcat-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex min-h-[60vh] items-center justify-center text-red-400 font-mystical-mono">
        {`[ <Error Trace> :: ${error} ]`}
      </div>
    );
  }

  return (
    <div className="container mx-auto p-8 max-w-6xl">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="flex justify-between items-end mb-12 border-b border-voidcat-800 pb-8"
      >
        <div>
          <h1 className="text-5xl font-bold cosmic-text mb-2">Projects</h1>
          <p className="text-voidcat-300 tracking-wider uppercase text-xs font-mystical-mono">
            Active Intelligence Operations
          </p>
        </div>
        <Link href="/projects/new">
          <button className="mystical-button">
            New Project
          </button>
        </Link>
      </motion.div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.length === 0 ? (
          <div className="col-span-full py-20 text-center glass-card">
            <p className="text-voidcat-400 italic">No active projects found in the void.</p>
          </div>
        ) : (
          projects.map((project, index) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: index * 0.1 }}
            >
              <Link href={`/projects/${project.id}`}>
                <div className="glass-card p-8 h-full flex flex-col group cursor-pointer">
                  <h2 className="text-2xl font-semibold mb-4 text-voidcat-100 group-hover:text-voidcat-400 transition-colors">
                    {project.name}
                  </h2>
                  <p className="text-voidcat-300 mb-8 line-clamp-3 font-light flex-grow">
                    {project.description || 'No description provided.'}
                  </p>
                  <div className="flex items-center justify-between text-xs font-mystical-mono text-voidcat-500 uppercase tracking-tighter">
                    <span className="flex items-center gap-2">
                      <span className="w-1.5 h-1.5 rounded-full bg-voidcat-500" />
                      {project.startDate ? new Date(project.startDate).toLocaleDateString() : 'TBD'}
                    </span>
                    <span>→</span>
                    <span>{project.endDate ? new Date(project.endDate).toLocaleDateString() : 'Ongoing'}</span>
                  </div>
                </div>
              </Link>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
