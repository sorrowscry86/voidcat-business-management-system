'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';

type Project = {
  id: string;
  name: string;
  description: string | null;
  startDate: string | null;
  endDate: string | null;
};

type Task = {
  id: string;
  title: string;
  description: string | null;
  status: string;
  priority: string;
  dueDate: string | null;
};

export default function ProjectDetailsPage() {
  const params = useParams();
  const { id } = params;

  const [project, setProject] = useState<Project | null>(null);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!id) return;

    const fetchProjectAndTasks = async () => {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001';
      try {
        // Fetch project details
        const projectRes = await fetch(`${apiUrl}/api/v1/projects/${id}`);
        if (!projectRes.ok) {
          throw new Error('Failed to fetch project');
        }
        const projectData = await projectRes.json();
        setProject(projectData.data);

        // Fetch tasks for the project
        const tasksRes = await fetch(`${apiUrl}/api/v1/tasks/project/${id}`);
        if (!tasksRes.ok) {
          throw new Error('Failed to fetch tasks');
        }
        const tasksData = await tasksRes.json();
        setTasks(tasksData.data);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProjectAndTasks();
  }, [id]);

  if (isLoading) {
    return <div>Loading project details...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  if (!project) {
    return <div>Project not found.</div>;
  }

  return (
    <div className="container mx-auto p-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold mb-2">{project.name}</h1>
        <p className="text-gray-600">{project.description}</p>
      </div>

      <div>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold">Tasks</h2>
          <Link href={`/projects/${id}/tasks/new`}>
            <button className="bg-purple-600 text-white px-4 py-2 rounded-md hover:bg-purple-700">
              Add Task
            </button>
          </Link>
        </div>
        <div className="space-y-4">
          {tasks.map((task) => (
            <div key={task.id} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="text-xl font-semibold">{task.title}</h3>
              <p className="text-gray-500">{task.description}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
