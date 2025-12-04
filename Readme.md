6. **Build for production**
   ```bash
   # Frontend
   pnpm run build

   # Backend
   cd server-v2 && pnpm run build
   ```

## Integration with https://api.vauntico.com

The frontend is configured to communicate with the backend API at `https://api.vauntico.com`.

### API Client

The application includes a comprehensive API client (`src/lib/api.js`) that handles:
- Authentication with JWT tokens
- Trust score calculations
- Request/response logging
- Automatic token refresh

### Authentication Flow

1. User logs in via `apiClient.login({email, password})`
2. JWT token stored in localStorage
3. Automatic token attachment to all requests
4. Auto token refresh on expiration
5. Logout clears tokens

### Trust Score Integration

```jsx
import { useTrustScore } from './hooks/useTrustScore';

function MyComponent() {
  const { calculateTrustScore, loading, error } = useTrustScore();

  const handleCalculate = async () => {
    try {
      const result = await calculateTrustScore({
        userId: userId,
        platform: 'youtube',
        metrics: { followers: 1000, engagement: 0.05 }
      });
      console.log('Trust score:', result.score);
    } catch (err) {
      console.error('Calculation failed:', err);
    }
  };
}
```

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `VITE_API_BASE_URL` | Backend API base URL | `https://api.vauntico.com` |
| `VITE_PAYSTACK_PUBLIC_KEY` | Paystack public key | `pk_test_your_test_key_here` |
| `VITE_PAYSTACK_SECRET_KEY` | Paystack secret key (for backend) | `sk_test_your_secret_key_here` |
| `VITE_CURRENCY` | Payment currency | `NGN` |
| `VITE_PRODUCT_PRICE` | Product price | `97` |
| `VITE_NOTION_EMBED_URL` | Notion embed URL for content | Notion URL |
| `VITE_APP_NAME` | Application name | `Vauntico Prompt Vault` |
| `VITE_APP_URL` | Application URL | `https://vauntico.com` |

## Monitoring & Alerting

### Vercel Dashboard Monitoring
- Visit [Vercel Dashboard](https://vercel.com/dashboard) for your project
- Real-time function logs via Functions tab
- Error tracking and performance metrics
- Automatic uptime monitoring

### Winston Logging
The backend uses structured logging with Winston:
```javascript
logger.info('Request completed', {
  method: req.method,
  url: req.url,
  statusCode: res.statusCode,
  duration: `${duration}ms`
});
```

Logs are captured in Vercel's function logs for:
- API requests/responses
- Errors and exceptions
- Database query performance
- Authentication events

### Error Alerting Setup
For additional error tracking, consider:

1. **Sentry Integration** (Recommended for production)
   ```bash
   cd server-v2
   pnpm add @sentry/node @sentry/tracing
   ```

2. **Logtail for Centralized Logging**
   ```bash
   pnpm add @logtail/node
   ```

### Uptime Monitoring

For external uptime monitoring, consider:
- **Pingdom**: Set up endpoint monitoring for `/health`
- **UptimeRobot**: Free tier monitoring every 5 minutes
- **Vercel Analytics**: Built-in uptime and performance tracking

Set monitoring URL: `https://api.vauntico.com/health`

## Security Considerations

- ✅ **Environment Variables** - Sensitive keys stored in environment
- ✅ **CORS Restricted** - API only accepts requests from vauntico.com domains
- ✅ **JWT Tokens** - Secure authentication with auto-refresh
- ✅ **Input Validation** - Server-side validation on all endpoints
- ✅ **Rate Limiting** - Prevents abuse with configurable limits
- ✅ **HTTPS Only** - Required for all API communications
- ✅ **Helmet.js** - Security headers including CSP
