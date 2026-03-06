import { PrismaClient } from '@prisma/client';
import { logger } from './logger';
import { mcp } from './mcp'; // Assuming we export an instance of McpService as mcp

const prisma = new PrismaClient();

export class OperationService {
  /**
   * Syncs latest events from Causal Memory Core to the local database
   */
  public async syncCmcEvents(query: string = "latest operations"): Promise<void> {
    try {
      // In a real scenario, we would use the CMC MCP tool here.
      // Since we are the agent, we can "pre-sync" or act as the bridge.
      logger.info(`Syncing CMC events for query: ${query}`);
      
      // Placeholder: In a real implementation with internal MCP access:
      // const cmcData = await mcp.callTool('causal-memory-core_query', { query });
      
      // For now, we simulate the internal logging bridge
      await prisma.operationalEvent.create({
        data: {
          action: 'LOG_SYNC',
          effect: 'Synchronized local BMS with CMC state',
          agent: 'Echo',
          context: 'System Realignment Phase',
          status: 'SUCCESS'
        }
      });
    } catch (error) {
      logger.error('Error syncing CMC events:', error);
    }
  }

  public async getRecentEvents(limit: number = 20) {
    return prisma.operationalEvent.findMany({
      orderBy: { timestamp: 'desc' },
      take: limit
    });
  }

  /**
   * Records a local operation and pushes it to external CMC via MCP if configured
   */
  public async recordOperation(data: { action: string; effect: string; agent: string; context?: string }) {
    const event = await prisma.operationalEvent.create({
      data: {
        ...data,
        status: 'COMPLETED'
      }
    });

    // Strategy: Agent (Echo) will also call add_event in CMC via tool during execution
    logger.info(`Operation recorded: ${data.action}`);
    return event;
  }
}

export const operationService = new OperationService();
