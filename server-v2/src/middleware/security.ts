import helmet from 'helmet';
import cors, { CorsOptions } from 'cors';
import compression from 'compression';

// Security middleware configuration
export const securityMiddleware = helmet({
  contentSecurityPolicy: false, // Disable for API-only server (can be re-enabled if needed)
  crossOriginEmbedderPolicy: false, // Disable for CORS requirements
  hsts: false, // Disable for localhost development
});

// CORS configuration for production
const corsOptions: CorsOptions = {
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
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With'],
};

export const corsMiddleware = cors(corsOptions);

// Compression middleware for response optimization
export const compressionMiddleware = compression({
  level: 6, // Good balance between compression and CPU usage
  filter: (req, res) => {
    // Don't compress small responses
    if (req.headers['x-no-compression']) {
      return false;
    }
    return compression.filter(req, res);
  },
});
