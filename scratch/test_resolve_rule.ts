interface ThaiSongTranslationRule {
  canonical: string;
  artists?: string[];
}

function checkArtistMatch(rule: ThaiSongTranslationRule, artistName?: string): boolean {
  if (!rule.artists || rule.artists.length === 0) return true;
  if (!artistName) return true;
  const lowerArtist = artistName.toLowerCase().replace(/\s+/g, '');
  return rule.artists.some((a) => lowerArtist.includes(a.toLowerCase().replace(/\s+/g, '')));
}

function resolveRule(
  rule: ThaiSongTranslationRule | ThaiSongTranslationRule[],
  artistName?: string
): ThaiSongTranslationRule | undefined {
  if (Array.isArray(rule)) {
    if (!artistName) return rule[0];
    const match = rule.find((r) => {
      if (!r.artists || r.artists.length === 0) return false;
      const lowerArtist = artistName.toLowerCase().replace(/\s+/g, '');
      return r.artists.some((a) => lowerArtist.includes(a.toLowerCase().replace(/\s+/g, '')));
    });
    return match || rule[0];
  }
  return checkArtistMatch(rule, artistName) ? rule : undefined;
}

const ghostRule: ThaiSongTranslationRule[] = [
  { canonical: 'ซ่อน (ไม่) หา (Ghost)', artists: ['jeff satur'] },
  { canonical: 'ไม่ไปไหน (Ghost)', artists: ['mirrr'] }
];

console.log('Jeff Satur ->', resolveRule(ghostRule, 'Jeff Satur')?.canonical);
console.log('Mirrr ->', resolveRule(ghostRule, 'Mirrr')?.canonical);
console.log('undefined artist ->', resolveRule(ghostRule, undefined)?.canonical);
