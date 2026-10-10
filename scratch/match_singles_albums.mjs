import fs from 'fs';

// Let's inspect all Thai artists in our database and check their albums on iTunes
// to find tracks where a single had an English title and an album had a Thai title (or vice versa)!

async function checkArtist(artistId) {
  const url = `https://itunes.apple.com/lookup?id=${artistId}&entity=song&country=th&limit=200`;
  const res = await fetch(url, { headers: { 'User-Agent': 'Mozilla/5.0' } });
  if (!res.ok) return [];
  const data = await res.json();
  const tracks = (data.results || []).filter(x => x.wrapperType === 'track');
  return tracks;
}

// Let's test Safeplanet first: artistId 1083804443
const tracks = await checkArtist(1083804443);
console.log('Safeplanet total tracks:', tracks.length);

// Compare track timeMillis (duration) and track numbers to match singles to album tracks!
const singles = tracks.filter(t => (t.collectionName || '').includes('Single'));
const albumTracks = tracks.filter(t => !(t.collectionName || '').includes('Single'));

console.log('Singles:', singles.length, 'Album tracks:', albumTracks.length);

for (const s of singles) {
  for (const a of albumTracks) {
    // If trackTimeMillis is very close (within 2 seconds) and titles are DIFFERENT:
    if (Math.abs(s.trackTimeMillis - a.trackTimeMillis) < 2000 && s.trackName.toLowerCase() !== a.trackName.toLowerCase()) {
      console.log(`MATCH FOUND: Single "${s.trackName}" <===> Album "${a.trackName}" (duration diff: ${Math.abs(s.trackTimeMillis - a.trackTimeMillis)}ms)`);
    }
  }
}
