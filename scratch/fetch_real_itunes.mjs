// Using native fetch

async function searchTrack(term, country = 'TH') {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(term)}&country=${country}&entity=song&limit=5`;
  try {
    const res = await fetch(url);
    const data = await res.json();
    return data.results || [];
  } catch (err) {
    console.error(`Failed to fetch ${term}:`, err);
    return [];
  }
}

async function check() {
  const songsToCheck = [
    { id: 'fujii_shinunoga', term: 'Fujii Kaze Shinunoga E-Wa', country: 'JP' },
    { id: 'tattoo_1', term: 'Tattoo Colour ขาหมู', country: 'TH' },
    { id: 'ed_1', term: 'Ed Sheeran Shape of You', country: 'US' },
    { id: 'ive_1', term: 'IVE LOVE DIVE', country: 'KR' },
    { id: 'sf_1', term: 'Silly Fools ขี้หึง', country: 'TH' },
    { id: 'clash_1', term: 'Clash ขอเช็ดน้ำตา', country: 'TH' },
    { id: 'kenshi_lemon', term: 'Kenshi Yonezu Lemon', country: 'JP' },
    { id: 'cp_1', term: 'Coldplay Viva La Vida', country: 'US' }
  ];

  for (const s of songsToCheck) {
    const results = await searchTrack(s.term, s.country);
    if (results.length > 0) {
      const best = results[0];
      console.log(`\n=== [${s.id}] ${s.term} ===`);
      console.log(`Track Name: ${best.trackName}`);
      console.log(`Artist: ${best.artistName}`);
      console.log(`Preview URL: ${best.previewUrl}`);
      console.log(`Artwork URL: ${best.artworkUrl100?.replace('100x100bb', '600x600bb')}`);
    } else {
      console.log(`\n=== NOT FOUND: [${s.id}] ${s.term} ===`);
    }
  }
}

check();
