import { PrismaClient, TaskStatus, TaskPriority } from '@prisma/client';

const prisma = new PrismaClient();

export const findTasksByProjectId = async (projectId: string) => {
  return await prisma.task.findMany({ where: { projectId } });
};

export const findTaskById = async (id: string) => {
  return await prisma.task.findUnique({ where: { id } });
};

export const createTask = async (data: {
  title: string;
  description?: string;
  status?: TaskStatus;
  priority?: TaskPriority;
  dueDate?: Date;
  projectId: string;
  assigneeId?: string;
}) => {
  return await prisma.task.create({ data });
};

export const updateTask = async (
  id: string,
  data: {
    title?: string;
    description?: string;
    status?: TaskStatus;
    priority?: TaskPriority;
    dueDate?: Date;
    assigneeId?: string;
  }
) => {
  return await prisma.task.update({ where: { id }, data });
};

export const deleteTask = async (id: string) => {
  return await prisma.task.delete({ where: { id } });
};
