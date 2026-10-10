import fs from 'fs';
import { cleanSongTitle } from '../src/services/itunesApi';
import { getThaiTitleTranslation } from '../src/data/thaiSongTitleAliases';

interface TrackItem {
  artistName: string;
  trackName: string;
  collectionName: string;
  previewUrl?: string;
}

async function searchArtist(artist: string): Promise<TrackItem[]> {
  const url = `https://itunes.apple.com/search?term=${encodeURIComponent(artist)}&country=TH&entity=song&limit=50`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const data = await res.json();
    return (data.results || []).map((r: any) => ({
      artistName: r.artistName || '',
      trackName: r.trackName || '',
      collectionName: r.collectionName || '',
      previewUrl: r.previewUrl
    }));
  } catch {
    return [];
  }
}

async function main() {
  const artists: string[] = JSON.parse(fs.readFileSync('scratch/all_thai_artists.json', 'utf8'));
  console.log(`Analyzing ${artists.length} artists...`);

  const results: Array<{
    artist: string;
    rawTitle: string;
    album: string;
    cleanedTitle: string;
    hasTranslation: boolean;
  }> = [];

  for (let i = 0; i < artists.length; i++) {
    const artist = artists[i];
    const tracks = await searchArtist(artist);
    
    for (const t of tracks) {
      if (!t.artistName.toLowerCase().includes(artist.toLowerCase())) continue;
      
      const raw = t.trackName;
      // We are interested in tracks where raw trackName does NOT contain Thai letters
      const hasThaiInRaw = /[\u0E00-\u0E7F]/.test(raw);
      if (!hasThaiInRaw) {
        const cleaned = cleanSongTitle(raw, t.artistName);
        const hasTranslation = Boolean(getThaiTitleTranslation(raw, t.artistName) || /[\u0E00-\u0E7F]/.test(cleaned));
        
        results.push({
          artist,
          rawTitle: raw,
          album: t.collectionName,
          cleanedTitle: cleaned,
          hasTranslation
        });
      }
    }

    if ((i + 1) % 25 === 0 || i === artists.length - 1) {
      console.log(`Processed ${i + 1}/${artists.length} artists...`);
    }
    await new Promise(r => setTimeout(r, 60));
  }

  // Deduplicate
  const seen = new Set<string>();
  const unique = results.filter(r => {
    const k = `${r.artist.toLowerCase()}:::${r.rawTitle.toLowerCase()}`;
    if (seen.has(k)) return false;
    seen.add(k);
    return true;
  });

  // Split into without translation
  const untranslated = unique.filter(u => !u.hasTranslation);
  console.log(`Total English-titled tracks: ${unique.length}`);
  console.log(`Currently untranslated: ${untranslated.length}`);

  fs.writeFileSync('scratch/untranslated_english_tracks.json', JSON.stringify(untranslated, null, 2));
  
  // Group by artist
  const grouped: Record<string, string[]> = {};
  for (const u of untranslated) {
    if (!grouped[u.artist]) grouped[u.artist] = [];
    grouped[u.artist].push(`"${u.rawTitle}" [Album: ${u.album}]`);
  }

  let summary = '';
  for (const [artist, songs] of Object.entries(grouped)) {
    summary += `\n=== ${artist} (${songs.length}) ===\n`;
    for (const s of songs) summary += `  - ${s}\n`;
  }
  fs.writeFileSync('scratch/untranslated_summary.txt', summary);
  console.log('Saved to scratch/untranslated_summary.txt');
}

main();
