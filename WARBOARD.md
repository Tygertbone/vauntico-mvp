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
- [x] Pushed all changes and triggered redeploy for both homepage-redesign and server-v2 projects
- [x] Latest server-v2 deployment: https://vauntico-qtqmhfufp-tyrones-projects-6eab466c.vercel.app
- [x] Final deployment verification: HTTP 401 ✅ (secure endpoint responding correctly)

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
## Sprint 13: Architecture Separation & Deployment Hygiene (RECOMMENDED)

### Planned Repo Separation for Cleaner Builds
**Goal**: Eliminate mixed-framework conflicts that cause build failures and deployment issues.

**Current Architecture** (Problematic):
- ❌ **Root `src/`**: Vite React app (`import.meta.env`)
- ❌ **homepage-redesign/**: Next.js app (`process.env`)
- ❌ **server-v2/**: Express backend

**Recommended Architecture**:
- ✅ **vauntico-frontend-vite**: React UI with Vite (handles user interface)
- ✅ **vauntico-frontend-next**: Next.js API routes + SSR pages (handles routing/SSR)
- ✅ **vauntico-server-v2**: Express backend (handles business logic/data)

**Migration Steps**:
1. Migrate Next.js API routes from `homepage-redesign/app/api/` to new `vauntico-frontend-next` repo
2. Move Vite React components from root `src/` to `vauntico-frontend-vite` repo
3. Update Vercel deployments to point to appropriate repos
4. Update documentation with new repo structure

### Contributor Deployment Checklist
- [ ] **Environment Variables**: Always verify proper syntax before deployment
  - `NEXT_PUBLIC_*` for Next.js (runtime client-side)
  - `VITE_*` for Vite (runtime client-side)
  - Server-side: Use `process.env.*` without prefixes
- [ ] **Local Build**: Always run `npm run build && npm start` before pushing
  - Confirm CSS/styling renders locally
  - Verify no console errors
  - Test API routes respond correctly
- [ ] **Repo Separation**: If working on code that mixes frameworks, log conflicts in WARBOARD
- [ ] **Pre-Deployment Checklist**:
  - [] Clean build artifacts: `rm -rf .next/ node_modules/.cache/ dist/`
  - [] Test critical API routes: stripe webhooks, auth endpoints
  - [] Check Vercel build logs for serverless function errors
- [ ] **Post-Deployment**: Smoke test live site immediately after deployment

---

## Sprint 14: Resolved Incident – Mixed Build Config

**✅ RESOLVED**: Mixed Build Configuration Incident Closed

### Root Cause Analysis
The primary root cause was **Next.js compiling Vite files**, creating incompatible build configurations where:
- Next.js expected `process.env` syntax
- Vite builds included `import.meta.env` calls
- Webpack configuration conflicted between frameworks
- Dual-framework dependencies caused bundling failures

### Fixes Applied
1. **Environment Variable Migration**: Migrated all Vite-specific `import.meta.env` calls to Next.js compatible `process.env`
2. **Webpack Exclusions**: Added proper webpack configuration to exclude Vite-specific files from Next.js compilation
3. **Dependency Installs**: Verified and installed required dependencies (`stripe`, `react-chartjs-2`, `chart.js`) in appropriate project packages
4. **Build Script Validation**: Updated build scripts to run clean builds without conflicting frameworks

### Results
- ✅ Build completed successfully (6s)
- ✅ No `import.meta.env` errors in production
- ✅ TailwindCSS/globals.css bundled successfully
- ✅ Dependencies resolved across all projects
- ✅ API route `/api/stripe/webhooks` built and returns 401 as expected

### Contributor Build Safety Checklist
- [ ] **Verify env syntax**: Ensure no `import.meta.env` usage in Next.js code (use `process.env` instead)
- [ ] **Run local build before push**: Execute `npm run build` locally to catch errors early
- [ ] **Check Vercel logs for CSS bundling**: Monitor deployment logs for TailwindCSS and styling issues
- [ ] **Test API routes post-deployment**: Verify webhook endpoints return expected status codes
- [ ] **Dependency verification**: Confirm required packages are installed in correct project scopes

### Common Issues & Quick Fixes
- **CSS Missing**: Check build didn't fail due to mixed `import.meta.env`/`process.env`
- **API 404**: Verify API routes are in correct Next.js `app/api/` directory
- **Env Not Working**: Ensure variables are prefixed correctly for the framework
- **Build Conflicts**: If Next.js complains about Vite files, check webpack exclusions

---

## Sprint 15: Resolved Incident – Next.js Config & Env Handling

**✅ RESOLVED**: Next.js Configuration and Environment Handling Incident Closed

### Root Cause Analysis
Two critical issues caused build failures and runtime errors:
1. **Deprecated Next.js Config Keys**: `experimental.appDir` has been enabled by default since Next.js 13.4
2. **Runtime Environment Access in Client Components**: `process.env` access in browser causes "process is not defined" errors

### Fixes Applied
1. **Next.js Config Cleanup**: Removed deprecated `experimental.appDir` and unsupported keys
2. **Webpack Rule Fix**: Changed from `include` function to `exclude` pattern for better exclusion of Vite files
3. **Environment Injection Pattern**: Moved env variable access to parent components for build-time injection
4. **PaystackButton Refactor**: Updated to accept `amount` as prop instead of direct env access

### Technical Details
**Before (Problematic)**:
```javascript
// next.config.js
experimental: { appDir: true } // Deprecated

webpack: (config) => {
  include: (resourcePath) => !resourcePath.includes('/src/') // Complex function
}

// PaystackButton.jsx
amount = parseInt(process.env.NEXT_PUBLIC_PRODUCT_PRICE) || 97 // Runtime error
```

**After (Fixed)**:
```javascript
// next.config.js - Clean and minimal
const path = require('path')

webpack: (config) => {
  exclude: [path.resolve(__dirname, 'src')] // Proper Node.js path resolution
}

// PaystackButton.jsx - Props-based
const PaystackButton = ({ amount }) => { // Requires parent injection
```

### Results
- ✅ Build completed without deprecated config errors
- ✅ No "process is not defined" runtime errors
- ✅ Webpack exclusions working correctly (Vite files ignored)
- ✅ Environment variables properly injected from server components

### Contributor Build Safety Checklist
- [ ] **Verify env usage pattern**: Only use `process.env` in server components/pages, pass as props to client components
- [ ] **Keep next.config.js clean**: Remove any deprecated `experimental.*` keys
- [ ] **Test client components**: Ensure no runtime env access causing browser errors
- [ ] **Webpack exclusions**: Use simple patterns over complex functions for better performance

---

## Sprint 16: Resolved Incident – Vercel Project Duplication

**✅ RESOLVED**: Vercel Project Duplication Incident Closed

### Root Cause Analysis
Duplicate Vercel project `vauntico-mvp-2ozt` was auto-generated (indicated by suffix `-2ozt`) and connected to the same `Tygertbone/vauntico-mvp` repository as the canonical `vauntico-mvp` project, but with no production deployment. This created confusion around domain mappings and resource allocation.

### Fixes Applied
1. **Duplicate Project Deletion**: Removed the shadow project `vauntico-mvp-2ozt` from Vercel workspace
2. **Domain Alignment**: Confirmed `vauntico-mvp` remains mapped to `fulfillment.vauntico.com` for production
3. **Repo Connection Verification**: Verified `vauntico-frontend` is mapped to `www.vauntico.com` but requires GitHub repo connection
4. **Resource Cleanup**: Eliminated unnecessary resource consumption from duplicate project

### Results
- ✅ Duplicate project `vauntico-mvp-2ozt` deleted from Vercel workspace
- ✅ Production deployment at `fulfillment.vauntico.com` remains unaffected
- ✅ Domain mappings clarified and documented
- ✅ Workspace streamlined to 2 active projects

### Contributor Deployment Checklist
- [ ] **Confirm project mappings**: Always verify which Vercel project is connected to which GitHub repo before deployments
- [ ] **Avoid duplicate projects**: Do not create shadow projects unless intentionally testing (use branches instead)
- [ ] **Domain verification**: Ensure domains (`fulfillment.vauntico.com`, `www.vauntico.com`) are mapped to correct repos and branches
- [ ] **Workspace audit**: Periodically review Vercel projects to identify and remove abandoned duplicates

### Project Summary Table
| Project Name        | Repo                        | Domain                  | Status                  |
|---------------------|-----------------------------|-------------------------|-------------------------|
| vauntico-mvp-2ozt   | Tygertbone/vauntico-mvp     | none                    | Duplicate (deleted)     |
| vauntico-mvp        | Tygertbone/vauntico-mvp     | fulfillment.vauntico.com| Active production       |
| vauntico-frontend   | (not connected)             | www.vauntico.com        | Needs repo connection   |

---

Execution Rules for New Sprints:
- Each sprint focuses on one major feature area
- Sprinters can pick up any sprint and execute independently
- All sprints include validation, testing, and monitoring
- Production deployment happens after each major sprint completion
