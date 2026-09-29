import fs from 'fs';

// Extract all songs from curatedSongs.ts
const content = fs.readFileSync('src/data/curatedSongs.ts', 'utf-8');

// Parse songs using a more thorough parser
const songBlocks = content.split(/{\s*id:\s*'/).slice(1);

const songs = [];
for (const block of songBlocks) {
  const idMatch = block.match(/^([^']+)'/);
  const titleMatch = block.match(/title:\s*'([^']+)'/);
  const artistMatch = block.match(/artist:\s*'([^']+)'/);
  const previewMatch = block.match(/previewUrl:\s*'([^']+)'/);
  const artworkMatch = block.match(/artworkUrl:\s*'([^']+)'/);

  if (idMatch && titleMatch && artistMatch && previewMatch) {
    songs.push({
      id: idMatch[1],
      title: titleMatch[1],
      artist: artistMatch[1],
      previewUrl: previewMatch[1],
      artworkUrl: artworkMatch ? artworkMatch[1] : ''
    });
  }
}

console.log(`Checking all ${songs.length} curated songs against iTunes API...`);

async function testSong(s) {
  // Determine country
  let country = 'TH';
  if (/[\u3040-\u30ff\u3400-\u4dbf\u4e00-\u9fff]/.test(s.title + s.artist) || ['LiSA', 'YOASOBI', 'Fujii Kaze', 'Kenshi Yonezu', 'Ado', 'Eve', 'Official HIGE DANdism'].includes(s.artist)) {
    country = 'JP';
  } else if (/[\uac00-\ud7af]/.test(s.title + s.artist) || ['BLACKPINK', 'NewJeans', 'BTS', 'TWICE', 'aespa', 'IVE', 'LE SSERAFIM'].includes(s.artist)) {
    country = 'US';
  } else if (['Taylor Swift', 'The Weeknd', 'Coldplay', 'Bruno Mars', 'Ed Sheeran', 'Billie Eilish', 'Ariana Grande', 'Dua Lipa'].includes(s.artist)) {
    country = 'US';
  }

  const query = `${s.artist} ${s.title.replace(/\(.*?\)/g, '')}`.trim();
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&country=${country}&entity=song&limit=5`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    const results = data.results || [];
    if (results.length === 0) {
      return { ...s, status: 'NOT_FOUND', query };
    }
    // Check if current previewUrl matches any result
    const match = results.find(r => r.previewUrl === s.previewUrl);
    if (match) {
      return { ...s, status: 'MATCH', realTrack: match.trackName, realArtist: match.artistName };
    } else {
      // Mismatch!
      const top = results[0];
      return {
        ...s,
        status: 'MISMATCH',
        realPreviewUrl: top.previewUrl,
        realArtworkUrl: top.artworkUrl100 ? top.artworkUrl100.replace('100x100bb', '600x600bb') : '',
        topTrack: top.trackName,
        topArtist: top.artistName
      };
    }
  } catch (err) {
    return { ...s, status: 'ERROR', error: err.message };
  }
}

async function run() {
  const mismatches = [];
  for (let i = 0; i < songs.length; i++) {
    const s = songs[i];
    const res = await testSong(s);
    if (res.status === 'MISMATCH') {
      console.log(`[MISMATCH] ${s.id}: ${s.artist} - ${s.title}`);
      console.log(`   Current preview: ${s.previewUrl}`);
      console.log(`   Suggested real preview: ${res.realPreviewUrl}`);
      mismatches.push(res);
    } else if (res.status === 'MATCH') {
      console.log(`[OK] ${s.id}: ${s.artist} - ${s.title}`);
    } else {
      console.log(`[${res.status}] ${s.id}: ${s.artist} - ${s.title}`);
    }
    // Small delay to be polite to iTunes API
    await new Promise(r => setTimeout(r, 200));
  }

  console.log(`\n\nTotal mismatches found: ${mismatches.length}`);
}

run();
