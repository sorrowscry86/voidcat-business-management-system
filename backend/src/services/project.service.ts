import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

export const findProjects = async () => {
  return await prisma.project.findMany();
};

export const findProjectById = async (id: string) => {
  return await prisma.project.findUnique({ where: { id } });
};

export const createProject = async (data: {
  name: string;
  description?: string;
  startDate?: Date;
  endDate?: Date;
}) => {
  return await prisma.project.create({ data });
};

export const updateProject = async (
  id: string,
  data: {
    name?: string;
    description?: string;
    startDate?: Date;
    endDate?: Date;
  }
) => {
  return await prisma.project.update({ where: { id }, data });
};

export const deleteProject = async (id: string) => {
  return await prisma.project.delete({ where: { id } });
};
