function calculatePoints(elapsedSec, timeLimit = 20) {
  if (elapsedSec > timeLimit && timeLimit > 0) return 0;
  
  const basePoints = 20;
  const maxSpeedBonus = 80;
  
  // Answering under 1 second gets full 100 points
  const timeDecay = Math.max(0, elapsedSec - 0.8);
  // Decay rate of ~0.115 creates a realistic ~30-38 pt spread across 5-6 seconds
  const speedBonus = Math.round(maxSpeedBonus * Math.exp(-0.115 * timeDecay));
  
  return Math.min(100, Math.max(basePoints, basePoints + speedBonus));
}

console.log('--- Speed-Based Scoring Table ---');
const times = [0.5, 1.0, 1.5, 2.0, 2.5, 3.0, 4.0, 5.0, 6.0, 7.0, 7.5, 8.0, 10.0, 12.0, 15.0, 20.0];
for (const t of times) {
  console.log(`Time: ${t.toFixed(1)}s -> Points: ${calculatePoints(t)}`);
}

console.log('\n--- Real Scenarios ---');
const p1 = calculatePoints(1.8);
const p2 = calculatePoints(7.5);
console.log(`Player 1 (1.8s): ${p1} pts`);
console.log(`Player 2 (7.5s - 5.7s later): ${p2} pts`);
console.log(`Difference: ${p1 - p2} points!`);

const p3 = calculatePoints(2.5);
const p4 = calculatePoints(8.0);
console.log(`\nPlayer 3 (2.5s): ${p3} pts`);
console.log(`Player 4 (8.0s - 5.5s later): ${p4} pts`);
console.log(`Difference: ${p3 - p4} points!`);
