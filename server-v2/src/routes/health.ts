import { Router, Request, Response } from 'express';
import { sendSlackAlert } from '../utils/slack-alerts';
import { securityMonitor } from '../middleware/security';
import { getEnvironmentStatus } from '../utils/env-validation';

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
    environment: process.env.NODE_ENV || 'development',
    correlationId: req.correlationId // Include correlation ID for debugging
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

  // Add security monitoring statistics
  try {
    const securityStats = securityMonitor.getSecurityStats(24); // Last 24 hours
    health.security = {
      totalEvents: securityStats.totalEvents,
      eventsByType: securityStats.eventsByType,
      eventsBySeverity: securityStats.eventsBySeverity,
      topIPs: securityStats.topIPs.slice(0, 5), // Top 5 IPs for brevity
      status: securityStats.eventsBySeverity.high > 0 || securityStats.eventsBySeverity.critical > 0 ? 'warning' : 'healthy'
    };
  } catch (error) {
    health.security = { error: 'Failed to get security stats', details: (error as Error).message };
  }

  // Add environment validation status
  try {
    const envStatus = getEnvironmentStatus();
    health.environmentStatus = {
      requiredPresent: envStatus.requiredPresent,
      recommendedPresent: envStatus.recommendedPresent,
      warningsCount: envStatus.warningsCount,
      status: envStatus.warningsCount > 0 ? 'warning' : 'healthy'
    };
  } catch (error) {
    health.environmentStatus = { error: 'Failed to get environment status', details: (error as Error).message };
  }

  // Add database performance metrics
  try {
    const { dbMonitor } = await import('../utils/database-monitoring');
    const perfStats = dbMonitor.getPerformanceStats(1); // Last hour
    health.databasePerformance = {
      totalQueries: perfStats.totalQueries,
      averageResponseTime: Math.round(perfStats.averageResponseTime),
      p95ResponseTime: Math.round(perfStats.p95ResponseTime),
      errorRate: Math.round(perfStats.errorRate * 100) / 100,
      slowQueryCount: perfStats.slowQueryCount,
      queriesByType: perfStats.queriesByType,
      status: perfStats.slowQueryCount > 5 || perfStats.errorRate > 0.1 ? 'warning' : 'healthy'
    };
  } catch (error) {
    health.databasePerformance = { error: 'Failed to get database performance', details: (error as Error).message };
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
