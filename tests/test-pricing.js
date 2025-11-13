import { getLocalizedPrice, PRICING } from '../src/utils/pricing.js';
import assert from 'assert';

// This test cannot be run directly in Node.js due to the use of
// import.meta.env in the source code. It is provided as a demonstration
// of a correct, clean test for this bug.

// Mock localStorage for the Node.js environment
class LocalStorageMock {
  constructor() {
    this.store = {};
  }
  clear() {
    this.store = {};
  }
  getItem(key) {
    return this.store[key] || null;
  }
  setItem(key, value) {
    this.store[key] = String(value);
  }
  removeItem(key) {
    delete this.store[key];
  }
}

global.localStorage = new LocalStorageMock();

console.log('Running pricing tests...');

// Test 1: Verify the fix for a nested plan in ZAR
localStorage.setItem('vauntico_locale', 'ZAR');
const product = PRICING.AUDIT_SERVICE;
const fixedResultZAR = getLocalizedPrice(product, 'starter');
assert.strictEqual(fixedResultZAR.price, 499, 'Test Failed: ZAR price should be 499');
console.log('  - Test 1 Passed: Correct ZAR price returned.');

// Test 2: Verify the fix for a nested plan in USD
localStorage.setItem('vauntico_locale', 'USD');
const fixedResultUSD = getLocalizedPrice(product, 'starter');
assert.strictEqual(fixedResultUSD.price, 29, 'Test Failed: USD price should be 29');
console.log('  - Test 2 Passed: Correct USD price returned.');

console.log('\nAll pricing tests passed!');
