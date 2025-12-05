import { Router, Request, Response } from 'express';
import { securityMonitor } from '../middleware/security';
import { featureFlagManager, FeatureFlagType } from '../utils/featureFlags';
import { ProofVault } from '../services/ProofVault';

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

// GET /admin/features - List all feature flags
router.get('/features', requireAdmin, async (req: Request, res: Response) => {
  try {
    const flags = await featureFlagManager.listFeatureFlags();

    res.json({
      success: true,
      data: {
        flags,
        count: flags.length,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch feature flags',
      details: (error as Error).message
    });
  }
});

// GET /admin/features/analytics - Feature flag analytics
router.get('/features/analytics', requireAdmin, async (req: Request, res: Response) => {
  try {
    const analytics = await featureFlagManager.getAnalytics();

    res.json({
      success: true,
      data: analytics
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch feature analytics',
      details: (error as Error).message
    });
  }
});

// GET /admin/features/:key - Get specific feature flag
router.get('/features/:key', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const flag = await featureFlagManager.getFeatureFlag(key);

    if (!flag) {
      return res.status(404).json({
        success: false,
        error: 'Feature flag not found'
      });
    }

    res.json({
      success: true,
      data: flag
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch feature flag',
      details: (error as Error).message
    });
  }
});

// POST /admin/features - Create/update feature flag
router.post('/features', requireAdmin, async (req: Request, res: Response) => {
  try {
    const {
      key,
      type,
      enabled,
      description,
      percentage,
      userIds,
      environments
    } = req.body;

    if (!key || !type) {
      return res.status(400).json({
        success: false,
        error: 'Feature flag key and type are required'
      });
    }

    if (!Object.values(FeatureFlagType).includes(type)) {
      return res.status(400).json({
        success: false,
        error: 'Invalid feature flag type',
        validTypes: Object.values(FeatureFlagType)
      });
    }

    const success = await featureFlagManager.setFeatureFlag({
      key,
      type,
      enabled: enabled || false,
      description,
      percentage: type === FeatureFlagType.PERCENTAGE ? percentage : undefined,
      userIds: type === FeatureFlagType.USER_TARGETING ? userIds : undefined,
      environments: type === FeatureFlagType.ENVIRONMENT ? environments : undefined,
      createdBy: 'admin'
    });

    if (!success) {
      return res.status(500).json({
        success: false,
        error: 'Failed to create/update feature flag'
      });
    }

    const flag = await featureFlagManager.getFeatureFlag(key);

    res.json({
      success: true,
      message: 'Feature flag created/updated successfully',
      data: flag
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to create/update feature flag',
      details: (error as Error).message
    });
  }
});

// DELETE /admin/features/:key - Delete feature flag
router.delete('/features/:key', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { key } = req.params;

    const success = await featureFlagManager.deleteFeatureFlag(key);

    if (!success) {
      return res.status(404).json({
        success: false,
        error: 'Feature flag not found or could not be deleted'
      });
    }

    res.json({
      success: true,
      message: 'Feature flag deleted successfully'
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to delete feature flag',
      details: (error as Error).message
    });
  }
});

// POST /admin/features/emergency-disable - Emergency disable all feature flags
router.post('/features/emergency-disable', requireAdmin, async (req: Request, res: Response) => {
  try {
    await featureFlagManager.emergencyDisableAll();

    res.json({
      success: true,
      message: 'All feature flags have been disabled (emergency mode)',
      timestamp: new Date().toISOString()
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to disable feature flags',
      details: (error as Error).message
    });
  }
});

// GET /admin/features/:key/check - Check if feature is enabled for current context
router.get('/features/:key/check', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { key } = req.params;
    const { userId, userEmail } = req.query;

    const context = {
      key,
      userId: userId as string,
      userEmail: userEmail as string
    };

    const enabled = await featureFlagManager.isEnabled(key, context);

    res.json({
      success: true,
      data: {
        key,
        enabled,
        context,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to check feature flag status',
      details: (error as Error).message
    });
  }
});

// GET /admin/proofs/:userId - Get subscription proofs for a user
router.get('/proofs/:userId', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;
    const proofs = await ProofVault.getProofs(userId);

    res.json({
      success: true,
      data: {
        proofs: proofs.rows,
        count: proofs.rows.length,
        userId,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch subscription proofs',
      details: (error as Error).message
    });
  }
});

// POST /admin/mfa/send-unlock-code - Send MFA code for account unlock
router.post('/mfa/send-unlock-code', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    // Get user email
    const userResult = await pool.query(
      'SELECT email FROM users WHERE id = $1',
      [userId]
    );

    if (userResult.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const userEmail = userResult.rows[0].email;

    // Send MFA code
    const sent = await MFAService.sendMFAForUnlock(userId, userEmail);

    if (!sent) {
      return res.status(500).json({
        success: false,
        error: 'Failed to send MFA code'
      });
    }

    res.json({
      success: true,
      message: 'MFA code sent for account unlock',
      data: {
        userId,
        email: userEmail,
        expiresIn: '5 minutes'
      }
    });
  } catch (error) {
    logger.error('Failed to send MFA unlock code', {
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    res.status(500).json({
      success: false,
      error: 'Failed to send MFA unlock code',
      details: (error as Error).message
    });
  }
});

// POST /admin/mfa/unlock-account - Unlock account with MFA verification
router.post('/mfa/unlock-account', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { userId, code } = req.body;

    if (!userId || !code) {
      return res.status(400).json({
        success: false,
        error: 'User ID and MFA code are required'
      });
    }

    // Verify MFA code
    const isValid = await MFAService.verifyCode(userId, code);

    if (!isValid) {
      return res.status(403).json({
        success: false,
        error: 'Invalid or expired MFA code'
      });
    }

    // Unlock the account
    await pool.query(
      'UPDATE users SET locked_until = NULL WHERE id = $1',
      [userId]
    );

    logger.info('Account unlocked via MFA verification', { userId });

    res.json({
      success: true,
      message: 'Account unlocked successfully after MFA verification',
      data: {
        userId,
        unlockedAt: new Date().toISOString()
      }
    });
  } catch (error) {
    logger.error('Failed to unlock account with MFA', {
      userId: req.body?.userId,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
    res.status(500).json({
      success: false,
      error: 'Failed to unlock account',
      details: (error as Error).message
    });
  }
});

// GET /admin/mfa/status/:userId - Get MFA status for a user
router.get('/mfa/status/:userId', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { userId } = req.params;

    const result = await pool.query(
      'SELECT mfa_enabled, mfa_secret FROM users WHERE id = $1',
      [userId]
    );

    if (result.rows.length === 0) {
      return res.status(404).json({
        success: false,
        error: 'User not found'
      });
    }

    const user = result.rows[0];

    res.json({
      success: true,
      data: {
        userId,
        mfaEnabled: user.mfa_enabled,
        mfaConfigured: !!user.mfa_secret,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to fetch MFA status',
      details: (error as Error).message
    });
  }
});

// POST /admin/mfa/enable - Enable MFA for a user
router.post('/mfa/enable', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    const secret = await MFAService.enableMFA(userId);

    await pool.query(
      'UPDATE users SET mfa_enabled = true, mfa_secret = $1 WHERE id = $2',
      [secret, userId]
    );

    res.json({
      success: true,
      message: 'MFA enabled for user',
      data: {
        userId,
        mfaEnabled: true,
        secret: secret,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to enable MFA',
      details: (error as Error).message
    });
  }
});

// POST /admin/mfa/disable - Disable MFA for a user
router.post('/mfa/disable', requireAdmin, async (req: Request, res: Response) => {
  try {
    const { userId } = req.body;

    if (!userId) {
      return res.status(400).json({
        success: false,
        error: 'User ID is required'
      });
    }

    await MFAService.disableMFA(userId);

    await pool.query(
      'UPDATE users SET mfa_enabled = false, mfa_secret = NULL WHERE id = $1',
      [userId]
    );

    res.json({
      success: true,
      message: 'MFA disabled for user',
      data: {
        userId,
        mfaEnabled: false,
        timestamp: new Date().toISOString()
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: 'Failed to disable MFA',
      details: (error as Error).message
    });
  }
});

export default router;
