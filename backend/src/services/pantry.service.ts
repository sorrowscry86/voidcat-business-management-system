import { PrismaClient } from '@prisma/client';
import { logger } from './logger';
import * as fs from 'fs';
import * as path from 'path';

const prisma = new PrismaClient();
const PANTHEON_ROOT = 'C:\\Users\\Wykeve\\Projects\\The Great Library\\00_The_Pantheon\\01_Active_Profiles';

export class PantryService {
  /**
   * Indexes the Active Pantheon Profiles into the Spirit table
   */
  public async syncSpirits(): Promise<void> {
    try {
      if (!fs.existsSync(PANTHEON_ROOT)) {
        logger.warn(`Pantheon root not found: ${PANTHEON_ROOT}`);
        return;
      }

      const files = fs.readdirSync(PANTHEON_ROOT).filter(f => f.endsWith('.md'));
      
      for (const file of files) {
        const filePath = path.join(PANTHEON_ROOT, file);
        const content = fs.readFileSync(filePath, 'utf-8');
        
        // Simple name extraction: "01_Echo.md" -> "Echo"
        const name = file.replace(/^\d+_/, '').replace('.md', '');
        
        // Simple role extraction from content (assumes "Role: X" format or similar)
        // For MVP, we default or use regex.
        const roleMatch = content.match(/Role:\s*(.+)/i);
        const role = roleMatch ? roleMatch[1].trim() : 'Sovereign Spirit';

        await prisma.spirit.upsert({
          where: { name },
          update: {
            active: true,
            role,
            focus: 'Global Operations'
          },
          create: {
            name,
            role,
            focus: 'Global Operations',
            active: true,
            metadata: {
              source: filePath
            }
          }
        });
      }
      
      logger.info('Pantheon spirits synchronized');
    } catch (error) {
      logger.error('Error syncing spirits:', error);
    }
  }

  public async getActiveSpirits() {
    return prisma.spirit.findMany({
      where: { active: true }
    });
  }
}

export const pantryService = new PantryService();
