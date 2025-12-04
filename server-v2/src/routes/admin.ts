import { Router, Request, Response } from 'express';
import { securityMonitor } from '../middleware/security';

const router = Router();

// Middleware to check if user is admin (simplified for now)
const requireAdmin = (req: Request, res: Response, next: any) => {
  // In production, you'd check JWT token and user role
  // For now, we'll just check for an admin header
  const adminKey = req.headers['x-admin-key'];
  const expectedKey = process.env.ADMIN_ACCESS_KEY;

  if (!adminKey || adminKey !== expectedKey) {
    return res.status(403).json({
      error: 'Admin access required',
      message: 'You do not have permission to access admin endpoints'
    });
  }

  next();
};

// GET /admin/security/stats - Security monitoring statistics
router.get('/security/stats', requireAdmin, async (req: Request, res: Response) => {
  try {
    const hours = parseInt(req.query.hours as string) || 24;
    const stats = securityMonitor.getSecurityStats(hours);

    res.json({
      success: true,
      data: {
        ...stats,
        period: `${hours} hours`,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch security statistics',
      details: (error as Error).message
    });
  }
});

// GET /admin/security/events - Recent security events
router.get('/security/events', requireAdmin, async (req: Request, res: Response) => {
  try {
    const limit = Math.min(parseInt(req.query.limit as string) || 50, 200); // Max 200
    const events = securityMonitor.getRecentEvents(limit);

    res.json({
      success: true,
      data: {
        events,
        count: events.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch security events',
      details: (error as Error).message
    });
  }
});

// GET /admin/security/events/:type - Events by security event type
router.get('/security/events/:type', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { type } = req.params;
    const hours = parseInt(req.query.hours as string) || 24;
    const events = securityMonitor.getEventsByType(type as any, hours);

    res.json({
      success: true,
      data: {
        events,
        count: events.length,
        type,
        period: `${hours} hours`,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch events by type',
      details: (error as Error).message
    });
  }
});

// GET /admin/security/ip/:ip - Events for specific IP
router.get('/security/ip/:ip', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { ip } = req.params;
    const hours = parseInt(req.query.hours as string) || 24;
    const events = securityMonitor.getEventsByIP(ip, hours);

    res.json({
      success: true,
      data: {
        events,
        count: events.length,
        ip,
        period: `${hours} hours`,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch events by IP',
      details: (error as Error).message
    });
  }
});

// POST /admin/security/block-ip - Block an IP (placeholder for future implementation)
router.post('/security/block-ip', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { ip, reason, duration } = req.body;

    if (!ip) {
      return res.status(400).json({
        success: false,
        error: 'IP address is required'
      });
    }

    // In a real implementation, you'd add to a blocklist/iptables/firewall
    // For now, just log the action
    console.log(`Admin requested to block IP ${ip} for reason: ${reason || 'No reason provided'}`);

    res.json({
      success: true,
      message: `Block request logged for IP ${ip}`,
      data: {
        ip,
        reason: reason || 'No reason provided',
        duration: duration || 'permanent',
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to process block request',
      details: (error as Error).message
    });
  }
});

// GET /admin/system/info - Basic system information
router.get('/system/info', requireAdmin, async (req: Request, res: Response) => {
  try {
    const info = {
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      nodeVersion: process.version,
      platform: process.platform,
      environment: process.env.NODE_ENV || 'development',
      timestamp: new Date().toISOString()
    };

    res.json({
      success: true,
      data: info
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch system info',
      details: (error as Error).message
    });
  }
});

export default router;
