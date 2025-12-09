# Vauntico Warboard

## Agent
- Grok → Full implementation agent (frontend, backend, validation)

---

## Sprint 1: Project Setup
- [x] Scaffold Next.js + Tailwind project
- [x] Configure global styles and fonts
- [x] Add layout.tsx with Inter font
- [x] TerminalAnimation component implemented

---

## Sprint 2: Homepage Sections
- [x] Hero section with terminal animation
- [x] Problem/Solution section
- [x] Features grid
- [x] Pricing tiers
- [x] Footer

---

## Sprint 3: Optimization
- [x] Responsive breakpoints (mobile → desktop → large desktop)
- [x] Image optimization with next/image
- [x] Code splitting for heavy components
- [x] Font optimization (Google Inter)

---

## Sprint 4: Validation
- [x] Accessibility checklist applied
- [x] SEO metadata configured (OpenGraph + Twitter cards)
- [x] Analytics events tracked (CTA clicks, pricing selections, scroll depth)

---

## Sprint 5: Deployment
- [x] Environment variables set in Vercel
- [x] Custom domain + SSL configured
- [x] Error monitoring (Sentry) connected
- [x] Sitemap.xml + robots.txt generated
- [x] Lighthouse audit ≥ 90
- [x] Mobile responsive tested on real devices

---

## Sprint 6: Link Validation
- [x] Crawl all internal links
- [x] Report JSON { "link": "...", "status": "ok|error", "message": "details" }
- [x] Fix misrouted links (e.g. `/sign-in` → correct auth route)

---

## Sprint 7: Creator Pass Onboarding Flow
- [x] Build onboarding page for Creator Pass
- [x] Implement tier selection (Starter, Pro, Enterprise)
- [x] Integrate payment flow with Paystack (Stripe scaffolded but disabled)
- [x] Add trust score calculator (React Hook Form + Zod validation)
- [x] Show real-time validation errors for inputs
- [x] Confirmation screen with receipt + next steps
- [x] Analytics events: tier selections, form completions, payment success/failure
- [x] Accessibility: labels on all inputs, error messages screen-reader accessible
- [x] Responsive design tested across mobile, tablet, desktop
- [x] SEO metadata for Creator Pass page

---

## Sprint 8: Production Deployment & Monitoring
- [x] Deploy Creator Pass flow to production domain
- [x] Configure environment variables in Vercel (Paystack keys, GA tracking ID, Sentry DSN)
- [x] Run Lighthouse audit on live site (target ≥ 90 across metrics)
- [x] Set up error monitoring dashboards in Sentry
- [x] Configure Slack alerts for payment failures or trust score errors
- [x] Monitor analytics events in GA (tier selections, payment conversions)
- [x] Test mobile responsiveness on real devices (iOS + Android)
- [x] Validate SSL, CDN caching, and security headers

---

## Sprint 9: Vaults UI Enhancement
- [x] Build dedicated Vaults page with grid layout
- [x] Implement vault creation/upload flow with drag & drop
- [x] Add vault organization (folders, tags, search)
- [x] Create sharing and collaboration features (invite, permissions)
- [x] Responsive design tested across mobile, tablet, desktop
- [x] Accessibility: ARIA labels for drag & drop, keyboard navigation
- [x] Analytics events: vault created, file uploaded, collaboration invite sent
- [x] SEO metadata for Vaults page

---

## Sprint 10: Trust Score Calculator
- [x] Build dedicated Trust Score Calculator page
- [x] Implement scoring algorithm (followers, engagement, content quality, demographics)
- [x] Add real-time scoring preview with progress indicators
- [x] Integrate with Creator Pass subscription flow (optional upsell)
- [x] Responsive design tested across mobile, tablet, desktop
- [x] Accessibility: ARIA live regions for score updates, proper form labels
- [x] Analytics events: score calculated, inputs changed, report downloaded
- [x] SEO metadata for Trust Score Calculator page

---

## Sprint 11: Advanced Monitoring & Alerting
- [x] Implement comprehensive health check dashboard (services, APIs, payments, trust score engine)
- [x] Set up automated Slack alerts for service failures and anomalies
- [x] Configure Sentry error tracking across all services (frontend + backend)
- [x] Add performance monitoring (response times, Core Web Vitals in production)
- [x] Implement anomaly detection (sudden error spikes, payment drop-offs)
- [x] Create uptime tracking with incident response workflow
- [x] Weekly audit reports generated automatically (JSON + Slack summary)

---

## Sprint 12: Environment Variables & Deployment Audit (COMPLETED)
- [x] Audit all required environment variables across server-v2 and frontend
- [x] Verify Stripe webhook syntax fix (malformed `process, : .env.STRIPE_CREATOR_PASS_PRICE_ID` on line 258)
- [x] Add smoke test script for Stripe webhooks endpoint
- [x] Update documentation with deployment requirements
- [x] Run smoke test on deployed Stripe webhooks endpoint (Status: 401 ✅ - endpoint accessible, rejecting unauthorized requests as expected)
- [x] Complete bcrypt → bcryptjs migration for production stability
- [x] Confirm both server-v2 redeployment and smoke tests post-migration (All endpoints responding correctly)
- [x] Build completed successfully (6s) - Latest deployment at https://vauntico-h9x6xuwsi-tyrones-projects-6eab466c.vercel.app
- [x] Final smoke test passed (HTTP 401 - secure endpoint responding correctly)
- [x] Fixed 404 NOT_FOUND error by creating Next.js API route at `homepage-redesign/app/api/stripe/webhooks/route.ts`
- [x] Stripe webhooks now properly accessible at `/api/stripe/webhooks`
- [x] Added Stripe dependency to homepage-redesign package.json

### Environment Variables Checklist
⚠️ **IMPORTANT**: Environment variables must be duplicated in each Vercel project that references them. The server-v2 and frontend run in separate projects on Vercel.

**Backend Environment Variables (server-v2/.env.example)**:
- `DATABASE_URL` - Neon PostgreSQL connection string
- `JWT_SECRET` - 32+ characters for authentication tokens
- `JWT_REFRESH_SECRET` - Separate secret for refresh tokens
- `UPSTASH_REDIS_REST_URL` - Upstash Redis REST endpoint
- `UPSTASH_REDIS_REST_TOKEN` - Upstash Redis authentication token
- `RESEND_API_KEY` - Email service API key
- `ANTHROPIC_API_KEY` - AI service API key
- `GOOGLE_CLIENT_ID` - OAuth provider
- `GOOGLE_CLIENT_SECRET` - OAuth provider secret
- `SENTRY_DSN` - Error tracking endpoint
- `SLACK_WEBHOOK_URL` - Alerting webhook
- `PAYSTACK_SECRET_KEY` - Primary payment processor
- `PAYSTACK_PUBLIC_KEY` - Client-side payment integration
- `STRIPE_SECRET_KEY` - Secondary payment processor (if enabled)
- `STRIPE_WEBHOOK_SECRET` - Webhook signature verification
- `STRIPE_CREATOR_PASS_PRICE_ID` - Stripe product price ID
- `STRIPE_ENTERPRISE_PRICE_ID` - Stripe enterprise price ID

**Frontend Environment Variables (env.example)**:
- `VITE_PAYSTACK_PUBLIC_KEY` - Client-side payment integration
- `VITE_APP_NAME` - Application configuration
- `VITE_APP_URL` - Application configuration
- `VITE_EMAIL_LIST_ID` - Email service integration
- `VITE_GOOGLE_ANALYTICS_ID` - Analytics tracking
- `VITE_SENTRY_DSN` - Error tracking
- `VITE_*` - All frontend vars must be prefixed with `VITE_`

### Code Contributor Checklist
- [ ] **If code touches Redis**: Ensure `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` are set in Vercel projects
- [ ] **If code touches Stripe**: Ensure all `STRIPE_*` environment variables are configured in Vercel projects
- [ ] **If code touches payments**: Verify both Paystack (primary) and Stripe (secondary) configurations
- [ ] **If code touches database**: Ensure `DATABASE_URL` is properly configured with SSL
- [ ] **If code touches external APIs**: Verify corresponding environment variables exist
- [ ] **After merging**: Run deployment smoke tests: `npm run smoke-test:stripe-webhooks --domain=your-vercel-domain.vercel.app`

### Smoke Test Commands
```bash
# Test Stripe webhooks smoke test (backend)
cd server-v2 && npm run smoke-test:stripe-webhooks --domain=your-vercel-domain.vercel.app
```

---

Execution Rules for New Sprints:
- Each sprint focuses on one major feature area
- Sprinters can pick up any sprint and execute independently
- All sprints include validation, testing, and monitoring
- Production deployment happens after each major sprint completion
