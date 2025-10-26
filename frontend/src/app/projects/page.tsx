'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';

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
    return <div>Loading projects...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold">Projects</h1>
        <Link href="/projects/new">
          <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
            Create Project
          </button>
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project) => (
          <Link href={`/projects/${project.id}`} key={project.id}>
            <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
              <h2 className="text-2xl font-semibold mb-2">{project.name}</h2>
              <p className="text-gray-600 mb-4">{project.description}</p>
              <div className="text-sm text-gray-500">
                <span>
                  {project.startDate
                    ? new Date(project.startDate).toLocaleDateString()
                    : 'No start date'}
                </span>
                {' - '}
                <span>
                  {project.endDate
                    ? new Date(project.endDate).toLocaleDateString()
                    : 'No end date'}
                </span>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
