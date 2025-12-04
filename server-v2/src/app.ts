import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import morgan from 'morgan';
import logger from './utils/logger';

// Routes
import healthRoutes from './routes/health';
import authRoutes from './routes/auth';
import oauthRoutes from './routes/oauth';
import trustScoreRoutes from './routes/trust-score';

const app = express();

// Trust proxy for Vercel
app.set('trust proxy', 1);

// Security middleware
app.use(helmet({
  crossOriginEmbedderPolicy: false,
}));

// CORS configuration - restrict to vauntico.com domains
const allowedOrigins = [
  'https://vauntico.com',
  'https://www.vauntico.com',
  /^(https?:\/\/localhost(:\d+)?)$/,  // local development
  'https://vauntico-mvp.vercel.app',
  /\.vercel\.app$/,  // any vercel domain
];

app.use(cors({
  origin: (origin, callback) => {
    // Allow requests with no origin (like mobile apps)
    if (!origin) return callback(null, true);

    const isAllowed = allowedOrigins.some(allowedOrigin => {
      if (typeof allowedOrigin === 'string') {
        return origin === allowedOrigin;
      } else {
        return allowedOrigin.test(origin);
      }
    });

    if (isAllowed) {
      callback(null, true);
    } else {
      logger.warn(`CORS blocked request from origin: ${origin}`);
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

// Compression
app.use(compression());

// Request logging
app.use(morgan(':method :url :status :response-time ms - :res[content-length]', {
  stream: {
    write: (message) => {
      logger.info(message.trim());
    }
  },
  skip: (req) => req.url === '/health' // Skip health checks in production logs
}));

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true, limit: '10mb' }));

// Routes
app.use('/', healthRoutes);
app.use('/auth', authRoutes);
app.use('/oauth', oauthRoutes);
app.use('/trustscore', trustScoreRoutes);

// Error handling
app.use((err: any, req: express.Request, res: express.Response, next: express.NextFunction) => {
  logger.error(`Error processing ${req.method} ${req.url}:`, {
    error: err.message,
    stack: err.stack,
    status: err.status || 500
  });

  res.status(err.status || 500).json({
    success: false,
    error: err.message || 'Internal server error',
    ...(process.env.NODE_ENV === 'development' && { stack: err.stack })
  });
});

// 404 handler
app.use('*', (req: express.Request, res: express.Response) => {
  logger.warn(`Route not found: ${req.method} ${req.url}`);
  res.status(404).json({
    success: false,
    error: 'Route not found'
  });
});

export default app;
