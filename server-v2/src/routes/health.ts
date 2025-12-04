import { Router, Request, Response } from 'express';
import { sendSlackAlert } from '../utils/slack-alerts';

const router = Router();

// Health check endpoint - simplified for Render keepalive
router.get('/', async (req: Request, res: Response) => {
  const now = new Date().toISOString();

  // Basic system health checks
  const health: any = {
    ok: true,
    timestamp: now,
    uptime: process.uptime(),
    memory: process.memoryUsage(),
    environment: process.env.NODE_ENV || 'development'
  };

  // Check database connection (basic ping)
  try {
    // Import pool here to avoid circular dependencies
    const { pool } = await import('../db/pool');
    await pool.query('SELECT 1');
    health.database = 'healthy';
  } catch (error) {
    health.ok = false;
    health.database = 'unhealthy';
    health.databaseError = (error as Error).message;
    // Alert on database issues
    sendSlackAlert('Database connection failed', { error: (error as Error).message, timestamp: now });
  }

  // Check Redis connection
  try {
    const { redis } = await import('../queue/upstash');
    await redis.ping();
    health.redis = 'healthy';
  } catch (error) {
    health.ok = false;
    health.redis = 'unhealthy';
    health.redisError = (error as Error).message;
    // Alert on Redis issues
    sendSlackAlert('Redis connection failed', { error: (error as Error).message, timestamp: now });
  }

  // Send alert if system is unhealthy
  if (!health.ok) {
    sendSlackAlert('Health check failed', health);
  }

  res.json({
    ...health
  });
});

export default router;
