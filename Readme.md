# Vauntico Trust Score Platform ⚡

**Creator Analytics Platform** - Data-driven trust scoring for content creators across multiple platforms including Google Analytics, YouTube, Stripe, and Substack.

[![CI/CD](https://github.com/Tygertbone/vauntico-mvp/actions/workflows/deploy-validate.yml/badge.svg)](https://github.com/Tygertbone/vauntico-mvp/actions/workflows/deploy-validate.yml)
[![Deployment](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/Tygertbone/vauntico-mvp)

## 🚀 Core Features

### 📊 **Trust Score Engine**
- **5-Component Scoring**: Analytics, Audience, Consistency, Growth, Reputation
- **Real-time Calculation**: Automated scoring from platform data
- **Historical Tracking**: Score progression with visual charts
- **UEI Algorithm**: Unique Engagement Index for content quality

### 🔗 **Platform Integrations**
- **Google Analytics** - Website traffic and audience insights
- **YouTube Analytics** - Video performance and engagement metrics
- **Stripe** - Revenue and monetization data
- **Substack** - Newsletter subscriber and engagement tracking
- **OAuth Security** - Encrypted token storage and refresh

### 🏆 **Gamification System**
- **Leaderboard Rankings** - Anonymous creator comparisons
- **Achievement Badges** - Milestone celebration system (8+ badge types)
- **Score History** - Visual progress tracking with Chart.js
- **Social Sharing** - Viral growth mechanics

### 🛡️ **Admin Features**
- **Anomaly Detection** - AI-powered fraud prevention (8 detection rules)
- **Security Monitoring** - Real-time security event tracking and alerting
- **Rate Limit Analytics** - Per-IP and per-user monitoring
- **Admin Dashboard** - System monitoring and user management
- **Manual Sync** - Real-time data refresh controls
- **Tenant Isolation** - Multi-tenant database architecture

## 🏗️ Architecture

```
┌─────────────────┐    ┌──────────────────┐    ┌────────────────┐
│   Frontend      │    │   Backend API    │    │   Database     │
│   (React + Vite)│◄──►│   (Express.js)   │◄──►│ (PostgreSQL)   │
│                 │    │   server-v2/     │    │                │
└─────────────────┘    └──────────────────┘    └────────────────┘
         │                       │                       │
         └───────── Vercel ──────┼─ Railway/Render ──────┼─ Neon/Supabase
                                 │                       │
                                 └───────────── Redis ──┼─ Upstash
                                                         │
                                                         └────── Redis Queue
```

### Tech Stack
- **Frontend**: React 18, Vite, Tailwind CSS, Chart.js
- **Backend**: Node.js, Express.js, TypeScript, Winston logging
- **Database**: PostgreSQL (Neon), Redis (Upstash), Prisma ORM
- **Hosting**: Vercel (Frontend), Railway/Render (Backend)
- **CI/CD**: GitHub Actions, Vercel auto-deploy
- **Security**: JWT auth, CORS, Helmet, rate limiting

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- pnpm (recommended) or npm
- PostgreSQL database (local or cloud)
- Redis instance (local or Upstash)

### Local Development Setup

1. **Clone and Install Dependencies**
   ```bash
   git clone https://github.com/Tygertbone/vauntico-mvp.git
   cd vauntico-mvp

   # Install frontend dependencies
   pnpm install

   # Install backend dependencies
   cd server-v2
   pnpm install
   cd ..
   ```

2. **Configure Environment Variables**
   ```bash
   # Copy environment templates
   cp .env.example .env
   cp server-v2/.env.example server-v2/.env

   # Edit with your values (database, JWT secrets, OAuth keys)
   ```

3. **Setup Database**
   ```bash
   cd server-v2

   # Create database schema
   psql $DATABASE_URL -f migrations/001_create_schema.sql

   # Run all migrations in order
   node scripts/migrate.js
   ```

4. **Start Development Servers**
   ```bash
   # Backend (port 3001)
   cd server-v2 && pnpm dev

   # Frontend (port 5173) - in new terminal
   cd .. && pnpm dev
   ```

5. **Verify Setup**
   ```bash
   # Test health endpoint
   curl http://localhost:3001/health

   # Access frontend
   open http://localhost:5173
   ```

## 📊 API Documentation

### Core Endpoints

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/api/auth/register` | POST | User registration |
| `/api/auth/login` | POST | User authentication |
| `/api/trust-score` | GET | Get current trust score |
| `/api/oauth/google` | POST | Connect Google Analytics |
| `/api/badges` | GET | Get user achievements |
| `/health` | GET | System health check |

### Authentication Flow
```javascript
import { apiClient } from './src/lib/api.js';

// Register user
await apiClient.auth.register({
  email: 'creator@example.com',
  password: 'securepass123'
});

// Login
const { accessToken } = await apiClient.auth.login({
  email: 'creator@example.com',
  password: 'securepass123'
});

// Use authenticated requests
const score = await apiClient.trustScore.getCurrent();
```

### Trust Score Calculation
```javascript
import { useTrustScore } from './src/hooks/useTrustScore.jsx';

function ScoreCalculator() {
  const { calculateTrustScore, loading, error } = useTrustScore();

  const handleSync = async () => {
    const result = await calculateTrustScore({
      platforms: ['google_analytics', 'youtube'],
      manual: true
    });
    console.log('New score:', result.score);
  };
}
```

## 🔧 Production Deployment

### Automated CI/CD Pipeline

The platform includes full CI/CD automation:

#### GitHub Actions Workflow
- **Deploy**: Automatic deployment on main branch
- **Validation**: Post-deployment endpoint validation
- **Rollback**: Failed validations maintain previous deployment

#### Environment Variables Required
```bash
# Backend (Railway/Vercel)
DATABASE_URL=postgresql://...
REDIS_URL=rediss://...
JWT_SECRET=your-secret-here
GOOGLE_CLIENT_ID=...
STRIPE_SECRET_KEY=...

# Frontend (Vercel)
VITE_API_URL=https://your-backend-url.com
VITE_APP_ENV=production
```

#### Deployment Steps
1. **Push to main**: Auto-deploys backend and frontend
2. **Environment setup**: Configure variables in hosting providers
3. **Database migration**: Run migrations on production database
4. **Post-deploy validation**: Health checks and endpoint testing

## 📊 Performance & Usage

### Production Metrics (Expected)
- **Page Load**: <3 seconds
- **API Response**: <500ms average
- **Database Load**: Optimized queries with indexing
- **Concurrent Users**: 10k+ with current architecture

### Scaling Features
- **Connection Pooling**: Efficient database connections
- **Caching**: Redis-backed response caching
- **Rate Limiting**: Progressive rate limiting
- **CDN**: Static assets via Vercel CDN

## 🔒 Security Features

### Authentication & Authorization
- **JWT Tokens**: Access (15min) + Refresh (7 days) tokens
- **Password Hashing**: bcrypt with 12 salt rounds
- **OAuth Secure**: Encrypted token storage
- **Session Management**: Automatic token rotation

### Platform Protection
- **Rate Limiting**: Configurable per endpoint with security event logging
- **CORS**: Domain-restricted API access
- **Input Validation**: Server-side validation with SQL/XSS detection
- **Security Headers**: Helmet.js comprehensive headers with CSRF protection
- **Anomaly Detection**: AI-powered fraud prevention with real-time alerting
- **Security Monitoring**: Comprehensive event tracking and analytics
- **Suspicious Activity Detection**: Automated threat pattern recognition

## 📈 Scoring Algorithm

### Trust Score Components (100-point scale)

1. **Analytics Performance (25 points)**
   - Website traffic, page views, time on site
   - YouTube views, watch time, engagement rate
   - Audience growth velocity

2. **Content Quality (20 points)**
   - UEI (Unique Engagement Index)
   - Content consistency scoring
   - Platform-specific quality metrics

3. **Audience Loyalty (20 points)**
   - Subscriber retention
   - Repeat visitor rate
   - Engagement depth

4. **Growth Trajectory (20 points)**
   - YoY growth rate
   - New audience acquisition
   - Trend analysis

5. **Platform Reputation (15 points)**
   - Cross-platform consistency
   - Monetization readiness
   - Authority indicators

### Badge System Examples
- 🏅 **Rising Star**: First 70+ score
- 🎯 **Analytics Ace**: Google Analytics connected
- 🚀 **Growth Hacker**: 50% YoY growth
- 🛡️ **Consistent Creator**: 90+ day streak
- 💰 **Revenue Champion**: $10k+ monthly revenue

## 🧪 Testing & Quality

### Test Coverage
```bash
# Frontend tests
pnpm test

# Backend tests
cd server-v2 && pnpm test

# E2E testing
pnpm test:e2e
```

### Code Quality
- **ESLint**: Strict JavaScript/TypeScript rules
- **Prettier**: Automated code formatting
- **TypeScript**: Static type checking
- **Jest**: Unit and integration tests

## 📞 Contributing

See [CONTRIBUTING.md](./CONTRIBUTING.md) for development guidelines and workflow.

## 📄 License

Copyright 2024 Vauntico. All rights reserved.

## 🎯 Mission

**Vauntico** empowers content creators with data-driven insights to build audience trust and accelerate monetization through transparent, comprehensive platform analytics.

---

**Ready to launch your creator analytics career?** Connect your platforms and get your Trust Score today! 🚀
