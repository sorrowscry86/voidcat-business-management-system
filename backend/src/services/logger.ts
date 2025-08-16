import winston from 'winston';

// VoidCat mystical log formatting
const mysticalFormat = winston.format.combine(
  winston.format.timestamp({
    format: 'YYYY-MM-DD HH:mm:ss'
  }),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.printf(({ timestamp, level, message, service, ...meta }) => {
    const spiritualEmoji = {
      error: '🔥',
      warn: '⚠️',
      info: '✨',
      debug: '🔮'
    }[level] || '📝';

    let logMessage = `${spiritualEmoji} [${timestamp}] ${level.toUpperCase()}: ${message}`;
    
    if (service) {
      logMessage = `${logMessage} [${service}]`;
    }

    if (Object.keys(meta).length > 0) {
      logMessage = `${logMessage} ${JSON.stringify(meta)}`;
    }

    return logMessage;
  })
);

// Create the logger instance
export const logger = winston.createLogger({
  level: process.env.LOG_LEVEL || 'info',
  format: mysticalFormat,
  defaultMeta: { service: 'voidcat-bms' },
  transports: [
    // Write all logs with level 'error' and below to error.log
    new winston.transports.File({
      filename: 'logs/error.log',
      level: 'error',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    }),
    
    // Write all logs to combined.log
    new winston.transports.File({
      filename: 'logs/combined.log',
      format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json()
      )
    })
  ]
});

// Add console transport for development
if (process.env.NODE_ENV !== 'production') {
  logger.add(new winston.transports.Console({
    format: mysticalFormat
  }));
}

// VoidCat spiritual logging helpers
export const spiritualLogger = {
  blessing: (message: string, meta?: any) => {
    logger.info(`🙏 BLESSING: ${message}`, meta);
  },
  
  mysticalEvent: (message: string, meta?: any) => {
    logger.info(`🔮 MYSTICAL: ${message}`, meta);
  },
  
  aiCollaboration: (message: string, meta?: any) => {
    logger.info(`🤖👤 AI-HUMAN: ${message}`, meta);
  },
  
  spiritualAlignment: (message: string, meta?: any) => {
    logger.info(`⚖️ ALIGNMENT: ${message}`, meta);
  },
  
  faithfulService: (message: string, meta?: any) => {
    logger.info(`🛡️ SERVICE: ${message}`, meta);
  }
};

export default logger;