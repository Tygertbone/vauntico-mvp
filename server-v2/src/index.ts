import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import dotenv from 'dotenv';

import { logger } from './utils/logger';
import { checkDatabaseHealth } from './db/health';
import { closeDatabase } from './db/pool';
import { checkRedisHealth } from './queue/upstash';

// Import routes
import authRoutes from './routes/auth';
import trustScoreRoutes from './routes/trust-score';
import oauthRoutes from './routes/oauth';

// Load environment variables
dotenv.config();

// Create Express app
const app = express();

// Trust proxy for Render deployment
app.set('trust proxy', 1);

// Security middleware (Helmet with minimal config for free tier)
app.use(helmet({
  contentSecurityPolicy: false, // Disable for API-only server
  crossOriginEmbedderPolicy: false, // Disable for CORS
}));

// CORS configuration (allow your frontend)
const corsOptions = {
  origin: function (origin: any, callback: any) {
    // Allow requests with no origin (mobile apps, curl, etc.)
    if (!origin) return callback(null, true);

    const allowedOrigins = [
      process.env.FRONTEND_URL || 'http://localhost:5173',
      'https://vauntico-mvp.vercel.app',
      'https://vauntico-trust-score.onrender.com', // Self-reference for health checks
    ];

    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      logger.warn('CORS blocked request from origin', { origin });
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

app.use(cors(corsOptions));

// Compression middleware
app.use(compression());

// Request logging
app.use(morgan('combined', {
  stream: {
    write: (message: string) => {
      logger.info('HTTP Request', { message: message.trim() });
    }
  },
  skip: (req: any) => {
    // Skip health checks from logging to reduce noise
    return req.url === '/api/health' || req.url === '/health';
  }
}));

// Body parsing middleware
app.use(express.json({ limit: '10mb' })); // Limit payload size for free tier
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Health check endpoint
app.get('/health', async (req, res) => {
  try {
    const dbHealth = await checkDatabaseHealth();
    const redisHealth = await checkRedisHealth();

    const overallHealth = {
      ok: dbHealth.isHealthy && redisHealth.isHealthy,
      now: new Date().toISOString(),
      database: {
        healthy: dbHealth.isHealthy,
        timestamp: dbHealth.timestamp,
        error: dbHealth.error,
      },
      redis: {
        healthy: redisHealth.isHealthy,
      },
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
    };

    const statusCode = overallHealth.ok ? 200 : 503; // Service unavailable

    logger.debug('Health check', {
      ok: overallHealth.ok,
      dbHealthy: dbHealth.isHealthy,
    });

    res.status(statusCode).json(overallHealth);
  } catch (error) {
    logger.error('Health check failed', {
      error: error instanceof Error ? error.message : 'Unknown error',
    });

    res.status(503).json({
      ok: false,
      now: new Date().toISOString(),
      error: 'Health check failed',
      message: error instanceof Error ? error.message : 'Unknown error',
    });
  }
});

// API routes
app.use('/api/auth', authRoutes);
app.use('/api/trust-score', trustScoreRoutes);
app.use('/api/oauth', oauthRoutes);

// Cron job endpoints (protected)
app.post('/api/cron/sync-data', (req, res) => {
  // Cron job endpoint for data synchronization
  // TODO: Implement in next phase
  res.json({ message: 'Sync data cron job endpoint - TODO' });
});

app.post('/api/cron/calculate-scores', (req, res) => {
  // Cron job endpoint for score calculation
  // TODO: Implement in next phase
  res.json({ message: 'Calculate scores cron job endpoint - TODO' });
});

// 404 handler for undefined routes
app.use('*', (req, res) => {
  logger.warn('404 - Route not found', {
    method: req.method,
    url: req.url,
    ip: req.ip,
  });

  res.status(404).json({
    error: 'Not Found',
    message: `Route ${req.method} ${req.url} not found`,
    timestamp: new Date().toISOString(),
  });
});

// Global error handler
app.use((error: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error("Error:", error);
  const statusCode = error.statusCode || error.status || 500;
  const isDevelopment = process.env.NODE_ENV === 'development';

  logger.error('Unhandled error', {
    error: error.message,
    stack: isDevelopment ? error.stack : undefined,
    url: req.url,
    method: req.method,
    statusCode,
  });

  res.status(statusCode).json({
    error: "Internal Server Error",
    timestamp: new Date().toISOString(),
  });
});

// Export for Vercel serverless function
export default app;

// For local development support
if (require.main === module) {
  const PORT = parseInt(process.env.PORT || '3001', 10);

  const server = app.listen(PORT, '0.0.0.0', () => {
    logger.info('Vauntico Trust Score backend started', {
      port: PORT,
      environment: process.env.NODE_ENV || 'development',
      nodeVersion: process.version,
      platform: process.platform,
    });
  });

  // Graceful shutdown for local development
  const gracefulShutdown = (signal: string) => {
    logger.info(`Received ${signal}, starting graceful shutdown...`);

    server.close(async () => {
      logger.info('HTTP server closed');

      try {
        await closeDatabase();
        logger.info('Database connections closed');
      } catch (error) {
        logger.error('Error closing database connections', {
          error: error instanceof Error ? error.message : 'Unknown error',
        });
      }

      process.exit(0);
    });

    // Force shutdown after 30 seconds
    setTimeout(() => {
      logger.error('Forced shutdown after timeout');
      process.exit(1);
    }, 30000);
  };

  // Handle shutdown signals for local development
  process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
  process.on('SIGINT', () => gracefulShutdown('SIGINT'));

  // Handle uncaught exceptions for local development
  process.on('uncaughtException', (error) => {
    logger.error('Uncaught exception', {
      error: error.message,
      stack: error.stack,
    });
    process.exit(1);
  });

  process.on('unhandledRejection', (reason, promise) => {
    logger.error('Unhandled rejection', {
      reason: reason instanceof Error ? reason.message : String(reason),
      promise: promise.toString(),
    });
    process.exit(1);
  });
}
