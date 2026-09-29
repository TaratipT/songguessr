
const testArtists = [
  { id: 'oat_pramote', name: 'Oat Pramote', query: 'โอ๊ต ปราโมทย์', country: 'th' },
  { id: 'guncharlie', name: 'guncharlie', query: 'guncharlie', country: 'th' },
  { id: 'atom_chanakan', name: 'Atom Chanakan', query: 'Atom ชนกันต์', country: 'th' },
  { id: 'dr_fuu', name: 'Dr.Fuu', query: 'Dr.Fuu', country: 'th' },
  { id: 'soybad', name: 'SOYBAD', query: 'SOYBAD', country: 'th' },
  { id: 'wonderframe', name: 'WONDERFRAME', query: 'WONDERFRAME', country: 'th' },
  { id: 'room39', name: 'Room39', query: 'Room39', country: 'th' },
  { id: 'wanyai', name: 'Wanyai', query: 'Wanyai', country: 'th' },
  { id: 'whatcharawalee', name: 'WhatChaRaWaLee', query: 'วัชราวลี', country: 'th' }
];

async function testAll() {
  for (const a of testArtists) {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(a.query)}&entity=song&limit=10&country=${a.country}`;
    try {
      const res = await fetch(url);
      const data = await res.json();
      const songsWithPreview = (data.results || []).filter(r => r.previewUrl);
      console.log(`[${a.name}] (${a.query}) => Total songs: ${data.resultCount}, With preview: ${songsWithPreview.length}`);
      if (songsWithPreview.length > 0) {
        console.log('   Sample tracks:', songsWithPreview.slice(0, 3).map(s => `${s.trackName} - ${s.artistName}`).join(' | '));
      } else {
        // try alternative query
        console.log('   *** ZERO PREVIEWS, checking alternative query ***');
      }
    } catch (e) {
      console.error(`Error fetching ${a.name}:`, e.message);
    }
  }
}

testAll();
