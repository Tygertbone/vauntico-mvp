import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import { logger } from './utils/logger';

// Import routes
import healthRoute from './routes/health';
import authRoutes from './routes/auth';

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

// Request logging (simplified for free tier)
app.use((req: any, res: any, next: any) => {
  logger.info(`${req.method} ${req.url}`, {
    ip: req.ip,
    userAgent: req.get('User-Agent')?.slice(0, 100),
  });
  next();
});

// Body parsing middleware
app.use(express.json({ limit: '10mb' })); // Limit payload size for free tier
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// API routes
app.use('/health', healthRoute);
app.use('/api/auth', authRoutes);

// 404 handler for undefined routes
app.use('*', (req: any, res: any) => {
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
  const statusCode = error.statusCode || error.status || 500;

  logger.error('Unhandled error', {
    error: error.message,
    stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    url: req.url,
    method: req.method,
    statusCode,
  });

  res.status(statusCode).json({
    error: statusCode >= 500 ? 'Internal Server Error' : error.message,
    message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong',
    ...(process.env.NODE_ENV === 'development' && { stack: error.stack }),
    timestamp: new Date().toISOString(),
  });
});

export default app;
