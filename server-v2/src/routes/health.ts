import { Router, Request, Response } from 'express';

const router = Router();

// Health check endpoint - simplified for Render keepalive
router.get('/', async (req: Request, res: Response) => {
  const now = new Date().toISOString();

  res.json({
    ok: true,
    now
  });
});

export default router;
