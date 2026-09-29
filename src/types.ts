export interface Song {
  id: string | number;
  title: string;
  artist: string;
  album: string;
  year: number | string;
  genre: string;
  previewUrl: string;
  artworkUrl: string;
  duration?: number;
  lyricsHint?: string;
  firstCharHint?: string;
  mood?: string;
  choices?: string[];
  draftCorner?: 'red' | 'blue' | 'neutral';
}

export interface Category {
  id: string;
  name: string;
  thaiName: string;
  emoji: string;
  badge: string;
  description: string;
  region?: 'thai' | 'inter' | 'kpop' | 'anime_jpop' | 'all';
  gradient: string;
  searchQueries: string[];
  selectedArtists?: string[];
  includedCategories?: Category[];
  modeType?: 'preset' | 'random' | 'custom' | 'standard' | 'combined';
  modeSummary?: string;
}

export interface PlayerRoundAnswer {
  playerId: string;
  playerName: string;
  avatar: string;
  answered: boolean;
  isCorrect: boolean;
  answerText?: string;
  pointsEarned: number;
  timeTaken: number;
}

export interface RoundResult {
  round: number;
  song: Song;
  guessedCorrectly: boolean;
  guessedTitle?: string;
  pointsEarned: number;
  hintsUsedCount: number;
  timeSpent: number;
  winnerName?: string;
  playerAnswers?: PlayerRoundAnswer[];
}

export interface HintStatus {
  artist: boolean;
  albumYear?: boolean;
  genre?: boolean;
  firstLetter: boolean;
  mvPreview?: boolean;
  fiftyFifty?: boolean;
  songLength?: boolean;
}

export type AnswerMode = 'multiple_choice' | 'text_pure' | 'autocomplete';

export interface PlayerSession {
  id: string;
  name: string;
  avatar: string;
  score: number;
  streak: number;
  isHost: boolean;
  hasAnsweredThisRound: boolean;
  lastAnswerCorrect?: boolean;
}

export type RoomGameType = 'standard' | 'song_draft';

export type SongDraftPhase = 'secret_pick' | 'reveal' | 'ban_phase' | 'battle_roster' | 'completed';

export interface DraftPlayerPick {
  playerId: string;
  playerName: string;
  avatar: string;
  corner: 'red' | 'blue';
  picks: string[];
  pickedCount: number;
  isLocked: boolean;
  bans: string[];
  isBanLocked: boolean;
}

export interface SongDraftState {
  phase: SongDraftPhase;
  redPlayer: DraftPlayerPick;
  bluePlayer: DraftPlayerPick;
  autoMatchedArtists: string[];
  survivingArtists: string[];
  timeLeft: number;
  isAiOpponent?: boolean;
}

export interface RoomState {
  code: string;
  hostId: string;
  players: PlayerSession[];
  category: Category;
  totalRounds: number;
  answerMode: AnswerMode;
  gameType?: RoomGameType;
  draftState?: SongDraftState;
  roundTimeLimit?: number; // 20, 25, 30, or 0 (unlimited)
  autoAdvance?: boolean;
  currentRound: number;
  status: 'waiting' | 'drafting' | 'in_game' | 'round_reveal' | 'game_over';
  songs: Song[];
  currentSongIndex: number;
  roundTimeLeft: number;
  currentRoundAnswers: PlayerRoundAnswer[];
}

export type AppFont = 'krub' | 'sarabun' | 'baijamjuree' | 'prompt';


