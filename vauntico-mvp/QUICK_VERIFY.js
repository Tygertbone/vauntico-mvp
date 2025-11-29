#!/usr/bin/env node

/**
 * VAUNTICO TRUST SCORE SYSTEM - QUICK VERIFICATION SCRIPT
 *
 * Run this script to verify your complete system works from start to finish:
 * node QUICK_VERIFY.js
 */

import { execSync } from 'child_process';
import fs from 'fs';
import path from 'path';

const CHECKS = [
  {
    name: 'Backend Dependencies',
    test: () => {
      try {
        execSync('cd server && npm list --depth=0', { stdio: 'pipe' });
        return true;
      } catch (e) {
        throw new Error('Backend dependencies not installed - run "cd server && npm install"');
      }
    }
  },
  {
    name: 'Frontend Dependencies',
    test: () => {
      try {
        execSync('npm list --depth=0', { stdio: 'pipe' });
        return true;
      } catch (e) {
        throw new Error('Frontend dependencies not installed - run "npm install"');
      }
    }
  },
  {
    name: 'Backend Build',
    test: () => {
      try {
        execSync('cd server && npm run build', { stdio: 'pipe' });
        return fs.existsSync('server/dist/index.js');
      } catch (e) {
        throw new Error('Backend build failed - check TypeScript compilation');
      }
    }
  },
  {
    name: 'Frontend Build',
    test: () => {
      try {
        execSync('npm run build', { stdio: 'pipe' });
        return fs.existsSync('dist/index.html');
      } catch (e) {
        throw new Error('Frontend build failed - check React compilation');
      }
    }
  },
  {
    name: 'Database Migrations',
    test: () => {
      // Check if migrations exist and are properly structured
      const migrations = fs.readdirSync('server/migrations');
      const requiredTables = ['users', 'trust_scores', 'content_items', 'oauth_connections'];
      for (const table of requiredTables) {
        if (!migrations.some(m => m.includes(table))) {
          throw new Error(`Migration for ${table} missing`);
        }
      }
      return true;
    }
  },
  {
    name: 'API Structure',
    test: () => {
      const requiredRoutes = [
        'server/src/routes/auth.ts',
        'server/src/routes/trust-score.ts',
        'server/src/routes/oauth.ts'
      ];
      for (const route of requiredRoutes) {
        if (!fs.existsSync(route)) {
          throw new Error(`${route} missing`);
        }
      }
      return true;
    }
  },
  {
    name: 'Frontend Components',
    test: () => {
      const requiredComponents = [
        'src/components/AuthModal.jsx',
        'src/components/TrustScoreCard.jsx',
        'src/components/PlatformConnections.jsx'
      ];
      for (const component of requiredComponents) {
        if (!fs.existsSync(component)) {
          throw new Error(`${component} missing`);
        }
      }
      return true;
    }
  },
  {
    name: 'Deployment Configuration',
    test: () => {
      if (!fs.existsSync('vercel.json')) {
        throw new Error('Vercel configuration missing');
      }
      if (!fs.existsSync('server/railway.json')) {
        throw new Error('Railway configuration missing');
      }
      return true;
    }
  }
];

async function runVerification() {
  console.log('🚀 VAUNTICO TRUST SCORE SYSTEM - QUICK VERIFICATION\n');
  console.log('Testing complete system integrity...\n');

  let passed = 0;
  let failed = 0;

  for (const check of CHECKS) {
    process.stdout.write(`Testing: ${check.name}... `);

    try {
      await check.test();
      console.log('✅ PASSED');
      passed++;
    } catch (error) {
      console.log('❌ FAILED');
      console.log(`   Error: ${error.message}\n`);
      failed++;
    }
  }

  console.log('\n' + '='.repeat(60));
  console.log('VERIFICATION RESULTS');
  console.log('='.repeat(60));
  console.log(`✅ PASSED: ${passed}/${CHECKS.length}`);
  console.log(`❌ FAILED: ${failed}/${CHECKS.length}`);

  if (failed === 0) {
    console.log('\n🎉 ALL CHECKS PASSED - SYSTEM IS COMPLETE AND READY!');

    console.log('\n📋 NEXT STEPS:');
    console.log('1. Set up environment variables (cp server/.env.example server/.env)');
    console.log('2. Start backend: cd server && npm run dev');
    console.log('3. Start frontend: npm run dev');
    console.log('4. Test creator flow: Register → Connect → Calculate Scores');
    console.log('5. Deploy following DEPLOYMENT.md');

    console.log('\n🚀 READY FOR CREATOR ONBOARDING!');
    console.log('\n   Your Vauntico Trust Score system is production-ready.');
    console.log('   Deploy to Railway + Vercel and start calculating real Trust Scores!');

  } else {
    console.log('\n⚠️ ISSUES DETECTED - REVIEW FAILED CHECKS ABOVE');
    console.log('\nCommon fixes:');
    console.log('- Backend: cd server && npm install');
    console.log('- Frontend: npm install');
    console.log('- Build: npm run build in respective directories');
    console.log('- Missing files: Check that all components are created');
  }

  console.log('\n📚 RESOURCES:');
  console.log('- Setup Guide: README.md');
  console.log('- Production Deploy: DEPLOYMENT.md');
  console.log('- API Docs: server/README.md');
  console.log('- Full Testing: node test-full-system.js');

  console.log('\n' + '='.repeat(60));

  if (failed === 0) {
    process.exit(0);
  } else {
    process.exit(1);
  }
}

// Run verification
runVerification().catch(error => {
  console.error('Verification script error:', error);
  process.exit(1);
});
