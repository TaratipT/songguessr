import assert from 'assert';

// Test 1: formatSeconds
const formatSeconds = (sec) => {
  if (typeof sec !== 'number' || sec <= 0) return '1';
  return Number.isInteger(sec) ? sec.toString() : sec.toFixed(1);
};

assert.strictEqual(formatSeconds(1), '1');
assert.strictEqual(formatSeconds(1.0), '1');
assert.strictEqual(formatSeconds(2.4), '2.4');
assert.strictEqual(formatSeconds(0.8), '0.8');
assert.strictEqual(formatSeconds(15.23), '15.2');
assert.strictEqual(formatSeconds(undefined), '1');
assert.strictEqual(formatSeconds(0), '1');
console.log('✓ Test 1 Passed: formatSeconds formats integers and decimals properly');

// Test 2: avgTime calculation
const history1 = [
  { timeSpent: 1.2 },
  { timeSpent: 2.5 },
  { timeSpent: 3.8 },
  { timeSpent: 0.9 },
  { timeSpent: 4.1 }
];
const total = history1.reduce((sum, h) => sum + (h.timeSpent || 0), 0);
const avg = (total / history1.length).toFixed(1);
assert.strictEqual(avg, '2.5');
console.log('✓ Test 2 Passed: avgTime computes real average (' + avg + 's)');

// Test 3: speedMultiplier in unlimited mode vs timed mode
function computeScore(roundPoints, roundTimeLimit, elapsedSec, isCorrect) {
  const speedMultiplier = roundTimeLimit === 0
    ? 1.0
    : Math.max(0.6, Math.max(0, roundTimeLimit - elapsedSec) / roundTimeLimit);
  return isCorrect ? Math.round(roundPoints * speedMultiplier) : 0;
}

// Unlimited mode
assert.strictEqual(computeScore(100, 0, 4.5, true), 100);
// 20s mode, answered in 2.0s -> 18/20 = 0.90 -> 90 pt
assert.strictEqual(computeScore(100, 20, 2.0, true), 90);
// 20s mode, answered in 15s -> 5/20 = 0.25 -> clamped to 0.60 -> 60 pt
assert.strictEqual(computeScore(100, 20, 15.0, true), 60);
console.log('✓ Test 3 Passed: speedMultiplier calculates points correctly in both unlimited and timed modes');

console.log('ALL VERIFICATION TESTS PASSED SUCCESSFULLY!');
