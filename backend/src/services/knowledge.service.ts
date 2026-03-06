import { PrismaClient } from '@prisma/client';
import { logger } from './logger';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();
const LIBRARY_PATH = 'C:\\Users\\Wykeve\\Projects\\The Great Library\\30_The_Archives';

export class KnowledgeService {
  /**
   * Indexes specific categories from the Great Library into the BMS cache
   */
  public async indexLibrarySubdirectory(subDir: string): Promise<void> {
    const targetPath = path.join(LIBRARY_PATH, subDir);
    
    try {
      if (!fs.existsSync(targetPath)) {
        logger.warn(`Library path does not exist: ${targetPath}`);
        return;
      }

      const files = fs.readdirSync(targetPath).filter(f => f.endsWith('.md'));
      
      for (const file of files) {
        const filePath = path.join(targetPath, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        await prisma.libraryInsight.upsert({
          where: { id: file }, // Simple mapping for demo
          update: {
            title: file.replace('.md', ''),
            content,
            category: subDir,
            sourcePath: filePath
          },
          create: {
            id: file,
            title: file.replace('.md', ''),
            content,
            category: subDir,
            sourcePath: filePath,
            tags: [subDir]
          }
        });
      }
      
      logger.info(`Indexed ${files.length} insights from ${subDir}`);
    } catch (error) {
      logger.error(`Failed to index library ${subDir}:`, error);
    }
  }

  public async searchInsights(query: string) {
    return prisma.libraryInsight.findMany({
      where: {
        OR: [
          { title: { contains: query, mode: 'insensitive' } },
          { content: { contains: query, mode: 'insensitive' } }
        ]
      }
    });
  }
}

export const knowledgeService = new KnowledgeService();
