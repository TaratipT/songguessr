import type { AnswerMode, AppFont } from '../types';
import type { ArtistRegion } from '../data/artistsData';

const STORAGE_KEYS = {
  ANSWER_MODE: 'songguessr_answer_mode',
  TOTAL_ROUNDS: 'songguessr_total_rounds',
  ROUND_TIME_LIMIT: 'songguessr_round_time_limit',
  AUTO_ADVANCE: 'songguessr_auto_advance',
  PLAYER_NAME: 'songguessr_player_name',
  PLAYER_AVATAR: 'songguessr_player_avatar',
  LAST_CATEGORY_ID: 'songguessr_last_category_id',
  RANDOM_REGIONS: 'songguessr_random_regions',
  RANDOM_COUNT: 'songguessr_random_count',
  FONT_FAMILY: 'songguessr_font_family'
} as const;

export const storageService = {
  getRandomRegions(fallback: ArtistRegion[] = ['thai', 'inter', 'kpop', 'anime_jpop']): ArtistRegion[] {
    const validRegions: ArtistRegion[] = ['thai', 'inter', 'kpop', 'anime_jpop'];
    try {
      // Try localStorage
      const val = localStorage.getItem(STORAGE_KEYS.RANDOM_REGIONS);
      if (val) {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed) && parsed.length > 0) {
          const filtered = parsed.filter((r: any) => validRegions.includes(r));
          if (filtered.length > 0) return filtered;
        }
      }
      // Cookie fallback
      const match = document.cookie.match(/(?:^|; )songguessr_random_regions=([^;]*)/);
      if (match) {
        const parsed = JSON.parse(decodeURIComponent(match[1]));
        if (Array.isArray(parsed) && parsed.length > 0) {
          const filtered = parsed.filter((r: any) => validRegions.includes(r));
          if (filtered.length > 0) return filtered;
        }
      }
    } catch {
      // Ignore
    }
    return fallback;
  },

  setRandomRegions(regions: ArtistRegion[]): void {
    try {
      const json = JSON.stringify(regions);
      localStorage.setItem(STORAGE_KEYS.RANDOM_REGIONS, json);
      document.cookie = `songguessr_random_regions=${encodeURIComponent(json)}; max-age=31536000; path=/; SameSite=Lax`;
    } catch {
      // Ignore
    }
  },

  getRandomCount(fallback: number = 5): number {
    try {
      const val = localStorage.getItem(STORAGE_KEYS.RANDOM_COUNT);
      if (val) {
        const num = parseInt(val, 10);
        if (!isNaN(num) && num >= 1 && num <= 25) return num;
      }
      const match = document.cookie.match(/(?:^|; )songguessr_random_count=([^;]*)/);
      if (match) {
        const num = parseInt(decodeURIComponent(match[1]), 10);
        if (!isNaN(num) && num >= 1 && num <= 25) return num;
      }
    } catch {
      // Ignore
    }
    return fallback;
  },

  setRandomCount(count: number): void {
    try {
      localStorage.setItem(STORAGE_KEYS.RANDOM_COUNT, String(count));
      document.cookie = `songguessr_random_count=${count}; max-age=31536000; path=/; SameSite=Lax`;
    } catch {
      // Ignore
    }
  },

  getAnswerMode(fallback: AnswerMode = 'multiple_choice'): AnswerMode {
    try {
      const val = localStorage.getItem(STORAGE_KEYS.ANSWER_MODE);
      if (val === 'multiple_choice' || val === 'text_pure' || val === 'autocomplete') {
        return val;
      }
    } catch {
      // Ignore localStorage errors (e.g. sandboxed iframe or private browsing)
    }
    return fallback;
  },

  setAnswerMode(mode: AnswerMode): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ANSWER_MODE, mode);
    } catch {
      // Ignore
    }
  },

  getTotalRounds(fallback: number = 10): number {
    try {
      const val = localStorage.getItem(STORAGE_KEYS.TOTAL_ROUNDS);
      if (val) {
        const num = parseInt(val, 10);
        if (!isNaN(num) && num > 0) return num;
      }
    } catch {
      // Ignore
    }
    return fallback;
  },

  setTotalRounds(rounds: number): void {
    try {
      localStorage.setItem(STORAGE_KEYS.TOTAL_ROUNDS, String(rounds));
    } catch {
      // Ignore
    }
  },

  getRoundTimeLimit(fallback: number = 20): number {
    try {
      const val = localStorage.getItem(STORAGE_KEYS.ROUND_TIME_LIMIT);
      if (val !== null) {
        const num = parseInt(val, 10);
        if (!isNaN(num)) return num;
      }
    } catch {
      // Ignore
    }
    return fallback;
  },

  setRoundTimeLimit(limit: number): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ROUND_TIME_LIMIT, String(limit));
    } catch {
      // Ignore
    }
  },

  getAutoAdvance(fallback: boolean = true): boolean {
    try {
      const val = localStorage.getItem(STORAGE_KEYS.AUTO_ADVANCE);
      if (val !== null) {
        return val === 'true';
      }
    } catch {
      // Ignore
    }
    return fallback;
  },

  setAutoAdvance(val: boolean): void {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTO_ADVANCE, String(val));
    } catch {
      // Ignore
    }
  },

  getPlayerName(fallback: string = 'ผู้เล่นเซียนเพลง'): string {
    try {
      const val = localStorage.getItem(STORAGE_KEYS.PLAYER_NAME);
      if (val && val.trim()) return val.trim();
    } catch {
      // Ignore
    }
    return fallback;
  },

  setPlayerName(name: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PLAYER_NAME, name);
    } catch {
      // Ignore
    }
  },

  getPlayerAvatar(fallback: string = '🎧'): string {
    try {
      const val = localStorage.getItem(STORAGE_KEYS.PLAYER_AVATAR);
      if (val) return val;
    } catch {
      // Ignore
    }
    return fallback;
  },

  setPlayerAvatar(avatar: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PLAYER_AVATAR, avatar);
    } catch {
      // Ignore
    }
  },

  getSelectedCategoryId(fallback: string = 'thai_hits'): string {
    try {
      const val = localStorage.getItem('songguessr_selected_category_id');
      if (val) return val;
      const oldVal = localStorage.getItem('songguessr_selected_category_ids');
      if (oldVal) {
        const parsed = JSON.parse(oldVal);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed[0];
      }
    } catch {
      // Ignore
    }
    return fallback;
  },

  setSelectedCategoryId(id: string): void {
    try {
      localStorage.setItem('songguessr_selected_category_id', id);
      document.cookie = `songguessr_selected_category_id=${encodeURIComponent(id)}; max-age=31536000; path=/; SameSite=Lax`;
    } catch {
      // Ignore
    }
  },

  getSelectedCategoryIds(fallback: string[] = ['thai_hits']): string[] {
    try {
      const val = localStorage.getItem('songguessr_selected_category_ids');
      if (val) {
        const parsed = JSON.parse(val);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
      const match = document.cookie.match(/(?:^|; )songguessr_selected_category_ids=([^;]*)/);
      if (match) {
        const parsed = JSON.parse(decodeURIComponent(match[1]));
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // Ignore
    }
    return fallback;
  },

  setSelectedCategoryIds(ids: string[]): void {
    try {
      const json = JSON.stringify(ids);
      localStorage.setItem('songguessr_selected_category_ids', json);
      document.cookie = `songguessr_selected_category_ids=${encodeURIComponent(json)}; max-age=31536000; path=/; SameSite=Lax`;
    } catch {
      // Ignore
    }
  },

  getFontFamily(fallback: AppFont = 'krub'): AppFont {
    const validFonts: AppFont[] = ['krub', 'sarabun', 'baijamjuree', 'prompt'];
    try {
      const val = localStorage.getItem(STORAGE_KEYS.FONT_FAMILY) as AppFont | null;
      if (val && validFonts.includes(val)) return val;
      const match = document.cookie.match(/(?:^|; )songguessr_font_family=([^;]*)/);
      if (match && validFonts.includes(match[1] as AppFont)) return match[1] as AppFont;
    } catch {
      // Ignore
    }
    return fallback;
  },

  setFontFamily(font: AppFont): void {
    try {
      localStorage.setItem(STORAGE_KEYS.FONT_FAMILY, font);
      document.cookie = `songguessr_font_family=${encodeURIComponent(font)}; max-age=31536000; path=/; SameSite=Lax`;
      document.documentElement.setAttribute('data-font', font);
    } catch {
      // Ignore
    }
  }
};
