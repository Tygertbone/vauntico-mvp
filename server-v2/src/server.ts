import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Import logger early for startup logging
import { logger } from './utils/logger';

// Validate environment before starting server
import { validateEnvironment } from './utils/env-validation';
const envValidation = validateEnvironment();

// Exit if environment validation fails
if (!envValidation.isValid) {
  logger.error('Server startup aborted due to environment configuration issues');
  process.exit(1);
}

const PORT = parseInt(process.env.PORT || '3001', 10);

// Import app after dotenv config
import app from './app';

const server = app.listen(PORT, '0.0.0.0', () => {
  logger.info(`Vauntico Trust Score backend started on port ${PORT}`);
  logger.info(`Health check: http://localhost:${PORT}/health`);
});

// Graceful shutdown
const gracefulShutdown = (signal: string) => {
  logger.info(`Received ${signal}, starting graceful shutdown...`);

  server.close(() => {
    logger.info('HTTP server closed');
    process.exit(0);
  });

  // Force shutdown after 10 seconds
  setTimeout(() => {
    logger.error('Forced shutdown after timeout');
    process.exit(1);
  }, 10000);
};

// Handle shutdown signals
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught exceptions
process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception:', error);
  process.exit(1);
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled rejection:', { reason });
  process.exit(1);
});
