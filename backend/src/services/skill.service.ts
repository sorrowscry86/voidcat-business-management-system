import { PrismaClient } from '@prisma/client';
import { logger } from './logger';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();
const SKILLS_ROOT = 'C:\\Users\\Wykeve\\.gemini\\skills';

export class SkillService {
  /**
   * Scans the .gemini/skills directory and syncing them with the Skill table
   */
  public async syncSkillsRegistry(): Promise<void> {
    try {
      if (!fs.existsSync(SKILLS_ROOT)) {
        logger.warn(`Skills root not found: ${SKILLS_ROOT}`);
        return;
      }

      const items = fs.readdirSync(SKILLS_ROOT, { withFileTypes: true });
      
      for (const item of items) {
        if (item.isDirectory()) {
          const skillPath = path.join(SKILLS_ROOT, item.name);
          const skillFile = path.join(skillPath, 'SKILL.md');
          
          if (fs.existsSync(skillFile)) {
            // Basic parsing of SKILL.md frontmatter could go here
            // For now, we assume directory name = skill name
            
            const category = this.determineCategory(item.name);
            
            await prisma.skill.upsert({
              where: { name: item.name },
              update: {
                active: true,
                path: skillFile
              },
              create: {
                name: item.name,
                description: `Sovereign Skill: ${item.name}`,
                version: '1.0',
                category: category,
                path: skillFile,
                active: true
              }
            });
          }
        }
      }
      
      logger.info('Skills registry synchronized');
    } catch (error) {
      logger.error('Error syncing skills:', error);
    }
  }

  private determineCategory(name: string): string {
    const mediaSkills = ['CineVessel', 'VisualVessel', 'VoiceVessel'];
    if (mediaSkills.includes(name)) return 'Media';
    if (name.includes('Logic') || name.includes('Thinking')) return 'Cognitive';
    return 'System';
  }

  public async getSkills() {
    return prisma.skill.findMany({
      orderBy: { category: 'asc' }
    });
  }
}

export const skillService = new SkillService();
