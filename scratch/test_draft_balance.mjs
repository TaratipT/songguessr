// Test draft balance algorithm
function cleanArtist(str) {
  return str.toLowerCase().replace(/[\s\-_]/g, '').trim();
}

function balanceDraftPicks(redPool, bluePool, totalRounds) {
  const targetRed = Math.ceil(totalRounds / 2);
  const targetBlue = totalRounds - targetRed;

  let redCount = Math.min(targetRed, redPool.length);
  let blueCount = Math.min(targetBlue, bluePool.length);

  let remainingNeeded = totalRounds - (redCount + blueCount);
  if (remainingNeeded > 0) {
    const redSurplus = Math.max(0, redPool.length - redCount);
    const blueSurplus = Math.max(0, bluePool.length - blueCount);
    if (redCount < targetRed && blueSurplus > 0) {
      const takeBlue = Math.min(remainingNeeded, blueSurplus);
      blueCount += takeBlue;
      remainingNeeded -= takeBlue;
    } else if (blueCount < targetBlue && redSurplus > 0) {
      const takeRed = Math.min(remainingNeeded, redSurplus);
      redCount += takeRed;
      remainingNeeded -= takeRed;
    }
  }

  const redSelected = redPool.slice(0, redCount);
  const blueSelected = bluePool.slice(0, blueCount);

  const interleaved = [];
  const rList = [...redSelected];
  const bList = [...blueSelected];

  const redStarts = Math.random() < 0.5;
  let currentSide = redStarts ? 'red' : 'blue';

  while (rList.length > 0 || bList.length > 0) {
    if (currentSide === 'red') {
      if (rList.length > 0) interleaved.push(rList.shift());
      else if (bList.length > 0) interleaved.push(bList.shift());
      currentSide = 'blue';
    } else {
      if (bList.length > 0) interleaved.push(bList.shift());
      else if (rList.length > 0) interleaved.push(rList.shift());
      currentSide = 'red';
    }
  }

  return { redSelected, blueSelected, interleaved };
}

// Test case 1: 10 rounds, both sides have plenty of songs
const testRed = Array.from({ length: 15 }, (_, i) => ({ id: `red_${i}`, title: `Red Song ${i}`, artist: 'Red Artist', draftCorner: 'red' }));
const testBlue = Array.from({ length: 15 }, (_, i) => ({ id: `blue_${i}`, title: `Blue Song ${i}`, artist: 'Blue Artist', draftCorner: 'blue' }));

const result1 = balanceDraftPicks(testRed, testBlue, 10);
console.log('Test 1 (Plenty songs, 10 rounds):');
console.log('Red Count:', result1.redSelected.length, 'Blue Count:', result1.blueSelected.length, 'Total:', result1.interleaved.length);
console.log('Interleaved sequence:', result1.interleaved.map(s => s.draftCorner).join(', '));

// Test case 2: Red has only 3 songs, Blue has 10 songs, 10 rounds
const testRedFew = Array.from({ length: 3 }, (_, i) => ({ id: `red_${i}`, title: `Red Song ${i}`, artist: 'Red Artist', draftCorner: 'red' }));
const result2 = balanceDraftPicks(testRedFew, testBlue, 10);
console.log('\nTest 2 (Red only has 3 songs, Blue has 10):');
console.log('Red Count:', result2.redSelected.length, 'Blue Count:', result2.blueSelected.length, 'Total:', result2.interleaved.length);
console.log('Interleaved sequence:', result2.interleaved.map(s => s.draftCorner).join(', '));

// Test case 3: 7 rounds (odd)
const result3 = balanceDraftPicks(testRed, testBlue, 7);
console.log('\nTest 3 (Odd 7 rounds):');
console.log('Red Count:', result3.redSelected.length, 'Blue Count:', result3.blueSelected.length, 'Total:', result3.interleaved.length);
console.log('Interleaved sequence:', result3.interleaved.map(s => s.draftCorner).join(', '));
