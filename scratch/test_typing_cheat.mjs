import { isSongMatch, isCloseMatch, stripVersionSuffix, cleanSongTitle } from '../src/services/itunesApi.ts';

const song1 = { title: 'รักติดไซเรน Midnight Version', artist: 'Ice Paris' };
const song2 = { title: 'I Want It That Way', artist: 'Backstreet Boys' };
const song3 = { title: 'รักแรก (First Love) [Acoustic Version]', artist: 'NONT TANONT' };
const song4 = { title: 'แสงสุดท้าย - Acoustic Version', artist: 'Bodyslam' };
const song5 = { title: 'รักติดไซเรน', artist: 'Ice Paris' };

console.log('1. "รักติดไซเรน" vs "รักติดไซเรน Midnight Version":', isSongMatch('รักติดไซเรน', song1)); // TRUE
console.log('2. "รักติดไซเรน Midnight Version" vs "รักติดไซเรน Midnight Version":', isSongMatch('รักติดไซเรน Midnight Version', song1)); // TRUE
console.log('3. "รักติดไซเรน Midnight Version" vs "รักติดไซเรน":', isSongMatch('รักติดไซเรน Midnight Version', song5)); // TRUE
console.log('4. cleanSongTitle("รักติดไซเรน Midnight Version"):', cleanSongTitle(song1.title, song1.artist)); // "รักติดไซเรน"
console.log('5. "รักแรก" vs "รักแรก (First Love) [Acoustic Version]":', isSongMatch('รักแรก', song3)); // TRUE
console.log('6. "First Love" vs "รักแรก (First Love) [Acoustic Version]":', isSongMatch('First Love', song3)); // TRUE
console.log('7. "แสงสุดท้าย" vs "แสงสุดท้าย - Acoustic Version":', isSongMatch('แสงสุดท้าย', song4)); // TRUE
console.log('8. "I" vs "I Want It That Way":', isSongMatch('I', song2)); // FALSE
console.log('9. "Want" vs "I Want It That Way":', isSongMatch('Want', song2)); // FALSE
console.log('10. "I Want It That Way" vs "I Want It That Way":', isSongMatch('I Want It That Way', song2)); // TRUE
