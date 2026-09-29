/**
 * Authoritative, synchronized score calculation for SongGuessr.
 * Evaluates points earned based on time taken (in seconds) for a round.
 *
 * Curve specifications (for standard 30s rounds with 100 max points):
 * - 0 to 0.5s: 100 points (grace reaction period)
 * - 1 to 4s: 94 - 99 points (rapid recognition)
 * - 5 to 9s: 80 - 91 points (moderate decay)
 * - 10 to 16s: 53 - 77 points (pre-chorus decay)
 * - 17 to 23s: 15 - 49 points (hook wait penalty)
 * - 23.5s+: 10 points (base minimum)
 *
 * Monotonic invariant: calculateRoundScore(t1) >= calculateRoundScore(t2) for all t1 < t2.
 */
export function calculateRoundScore(timeSpentSeconds: number, maxRoundPoints: number = 100): number {
  if (typeof timeSpentSeconds !== 'number' || isNaN(timeSpentSeconds) || timeSpentSeconds <= 0) {
    return maxRoundPoints;
  }
  const minBasePoints = Math.round(maxRoundPoints * 0.10); // 10
  const maxBonus = Math.max(10, maxRoundPoints - minBasePoints); // 90
  const effectiveT = Math.max(0, timeSpentSeconds - 0.5);
  // Quadratic loss curve hitting 100% loss at ~23.5-24.0s
  const lossFraction = Math.min(1, 0.016 * effectiveT + 0.00113 * effectiveT * effectiveT);
  const speedBonus = Math.round(maxBonus * (1 - lossFraction));
  return Math.min(maxRoundPoints, Math.max(minBasePoints, minBasePoints + speedBonus));
}
