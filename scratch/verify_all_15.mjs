const artists = [
  { id: 'hybs', name: 'HYBS', region: 'thai', storefront: 'TH' },
  { id: 'zweed_n_roll', name: "Zweed n' Roll", region: 'thai', storefront: 'TH' },
  { id: 'zom_marie', name: 'Zom Marie', region: 'thai', storefront: 'TH' },
  { id: 'ploychompoo', name: 'Ploychompoo', region: 'thai', storefront: 'TH' },
  { id: 'new_jiew', name: 'New & Jiew', region: 'thai', storefront: 'TH' },
  { id: 'two_popetorn', name: 'TWO Popetorn', region: 'thai', storefront: 'TH' },
  { id: 'the_richman_toy', name: 'The Richman Toy', region: 'thai', storefront: 'TH' },
  { id: 'gavin_d', name: 'GAVIN:D', region: 'thai', storefront: 'TH' },
  { id: 'autta', name: 'AUTTA', region: 'thai', storefront: 'TH' },
  { id: 'central_cee', name: 'Central Cee', region: 'inter', storefront: 'US' },
  { id: 'aylas', name: "AYLA's", region: 'thai', storefront: 'TH' },
  { id: 'blvckheart', name: 'BLVCKHEART', region: 'thai', storefront: 'TH' },
  { id: 'p6ick', name: 'P6ICK', region: 'thai', storefront: 'TH' },
  { id: 'reinizra', name: 'เรนิษรา', region: 'thai', storefront: 'TH' },
  { id: 'suriya_mqt', name: 'SURIYA MQT', region: 'thai', storefront: 'TH' },
];

async function verifyAll() {
  for (const a of artists) {
    const url = `https://itunes.apple.com/search?term=${encodeURIComponent(a.name)}&entity=song&limit=4&country=${a.storefront}`;
    const res = await fetch(url);
    const data = await res.json();
    const songs = data.results?.map(r => r.trackName) || [];
    console.log(`✅ [OK] ${a.name} (${a.region}) -> ${songs.length} songs: ${songs.slice(0, 3).join(' | ')}`);
  }
}

verifyAll();
