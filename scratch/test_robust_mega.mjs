// Test helper to fetch mega hits
async function fetchMegaHit(query, country = 'TH') {
  try {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(query)}&entity=song&limit=4&country=${country}`;
    const res = await fetch(url);
    if (!res.ok) return null;
    const data = await res.json();
    const results = data.results || [];
    
    // Pick the best match with previewUrl, avoid karaoke/tribute/instrumental
    const valid = results.find(item => {
      if (!item.previewUrl || !item.trackName || !item.artistName) return false;
      const lowerTitle = item.trackName.toLowerCase();
      const lowerArtist = item.artistName.toLowerCase();
      if (lowerArtist.includes('karaoke') || lowerArtist.includes('tribute') || lowerArtist.includes('instrumental')) return false;
      if (lowerTitle.includes('karaoke') || lowerTitle.includes('backing track')) return false;
      return true;
    });

    if (valid) {
      return {
        id: String(valid.trackId),
        title: valid.trackName,
        artist: valid.artistName,
        previewUrl: valid.previewUrl
      };
    }
  } catch (e) {
    return null;
  }
  return null;
}

async function testList() {
  const testTracks = [
    { q: 'ทรงอย่างแบด Paper Planes', c: 'TH' },
    { q: 'รักแรก นนท์ ธนนท์', c: 'TH' },
    { q: 'โต๊ะริม NONT TANONT', c: 'TH' },
    { q: 'วาดไว้ BOWKYLION', c: 'TH' },
    { q: 'The Weeknd Blinding Lights', c: 'US' },
    { q: 'Shape of You Ed Sheeran', c: 'US' },
    { q: 'Uptown Funk Bruno Mars', c: 'US' },
    { q: 'Dynamite BTS', c: 'US' },
    { q: 'Supernova aespa', c: 'US' },
    { q: 'Next Level aespa', c: 'US' },
    { q: 'Hype Boy NewJeans', c: 'US' }
  ];

  for (const t of testTracks) {
    const song = await fetchMegaHit(t.q, t.c);
    console.log(`${t.q} -> ${song ? `[FOUND] "${song.title}" by ${song.artist}` : '[MISSING]'}`);
  }
}

testList();
