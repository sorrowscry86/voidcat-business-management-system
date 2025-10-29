import axios from 'axios';
import { randomUUID } from 'crypto';
import { logger } from './logger';

class McpService {
  private mcpServerEndpoint: string;
  private sessionId: string | null = null;

  constructor() {
    this.mcpServerEndpoint = process.env.MCP_SERVER_ENDPOINT || 'http://localhost:3001/mcp';
  }

  public async initializeSession(): Promise<void> {
    if (this.sessionId) {
      return;
    }

    try {
      const response = await axios.post(this.mcpServerEndpoint, {
        jsonrpc: '2.0',
        id: randomUUID(),
        method: 'initialize',
        params: {
          protocolVersion: '2024-11-05',
          capabilities: {},
          clientInfo: {
            name: 'VoidCat BMS',
            version: '0.1.0',
          },
        },
      });

      this.sessionId = response.headers['mcp-session-id'];
      logger.info(`MCP session initialized: ${this.sessionId}`);
    } catch (error) {
      logger.error('Error initializing MCP session:', error);
      throw new Error('Could not initialize MCP session');
    }
  }

  public async callTool(toolName: string, args: { text: string }): Promise<any> {
    if (!this.sessionId) {
      await this.initializeSession();
    }

    try {
      const response = await axios.post(
        this.mcpServerEndpoint,
        {
          jsonrpc: '2.0',
          id: randomUUID(),
          method: 'tools/call',
          params: {
            name: toolName,
            arguments: args,
          },
        },
        {
          headers: {
            'mcp-session-id': this.sessionId,
          },
        }
      );

      return response.data;
    } catch (error) {
      logger.error(`Error calling MCP tool '${toolName}':`, error);
      throw new Error(`Could not call MCP tool '${toolName}'`);
    }
  }

  public async endSession(): Promise<void> {
    if (!this.sessionId) {
      return;
    }

    try {
      await axios.delete(this.mcpServerEndpoint, {
        headers: {
          'mcp-session-id': this.sessionId,
        },
      });

      logger.info(`MCP session ended: ${this.sessionId}`);
      this.sessionId = null;
    } catch (error) {
      logger.error('Error ending MCP session:', error);
      // Don't throw an error, just log it and reset the session ID
      this.sessionId = null;
    }
  }
}

export const mcpService = new McpService();
