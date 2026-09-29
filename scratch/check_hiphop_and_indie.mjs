const artists = [
  'CYANIDE', 'LAZYLOXY', 'OG-ANIC', 'GAVIN:D', 'WONDERFRAME', 'YOUNGOHM', 'SARAN',
  'D GERRARD', 'TWOPEE SOUTHSIDE', 'MAIYARAP', 'Patrickananda', 'AUTTA', 'F.HERO',
  'Landokmai', 'Blackbeans', 'Loserpop', 'Moving and Cut', 'Television Off', 'Uncle Ben',
  'Zom Marie', 'Sarah Salola', 'First Anuwat', 'SERIOUS BACON', 'Armchair', 'Lipta'
];

async function check() {
  for (const a of artists) {
    try {
      const res = await fetch(`https://itunes.apple.com/search?term=${encodeURIComponent(a)}&country=TH&entity=song&limit=10`);
      const data = await res.json();
      const englishTracks = (data.results || [])
        .filter(r => !/[\u0e00-\u0e7f]/.test(r.trackName)) // titles without any Thai script
        .map(r => r.trackName);
      if (englishTracks.length > 0) {
        console.log(`[${a}]:`, englishTracks);
      }
    } catch (e) {
      console.error(a, e.message);
    }
  }
}

check();
