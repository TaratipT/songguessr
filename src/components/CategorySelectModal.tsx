import React, { useState, useEffect, useMemo } from 'react';
import { CATEGORIES } from '../data/categories';
import type { Category, AnswerMode, PlayerSession, RoomState, RoomGameType } from '../types';
import { GLOBAL_ARTISTS, type ArtistRegion, type GlobalArtist } from '../data/artistsData';
import {
  Play,
  Users,
  Check,
  Copy,
  ArrowRight,
  ArrowLeft,
  LogOut,
  SlidersHorizontal,
  Disc,
  Loader2,
  Dice5,
  X,
  RotateCcw,
  Swords,
  Home,
  UserMinus
} from 'lucide-react';
import { soundFX } from '../services/soundEffects';
import { GlobalArtistPickerModal, type ArtistSelectionMeta } from './GlobalArtistPickerModal';
import { getRandomITPlayerName } from '../data/chuunibyouNames';
import { TimeLimitStepper } from './TimeLimitStepper';
import { storageService } from '../services/storageService';

const RANDOM_CATEGORY_OPTIONS: { id: ArtistRegion; label: string; shortLabel: string; emoji: string }[] = [
  { id: 'thai', label: 'เพลงไทย', shortLabel: 'ไทย', emoji: '🎵' },
  { id: 'inter', label: 'สากล', shortLabel: 'สากล', emoji: '🌎' },
  { id: 'kpop', label: 'K-POP', shortLabel: 'K-POP', emoji: '✨' },
  { id: 'anime_jpop', label: 'Anime / J-POP', shortLabel: 'Anime', emoji: '🎌' },
];

interface CategorySelectModalProps {
  onStartSolo: (category: Category, totalRounds: number, answerMode: AnswerMode) => void;
  onStartCustomArtist: (artistName: string, totalRounds: number, answerMode: AnswerMode) => void;
  onCreateOnlineRoom: (hostName: string, category: Category, totalRounds: number, answerMode: AnswerMode) => void;
  onJoinOnlineRoom: (roomCode: string, playerName: string) => void;
  onLeaveRoom?: () => void;
  onKickPlayer?: (playerId: string) => void;
  roomState: RoomState | null;
  isHost: boolean;
  onHostStartGame: () => void;
  onUpdateRoomSettings?: (category: Category, totalRounds: number, answerMode: AnswerMode, roundTimeLimit?: number, autoAdvance?: boolean) => void;
  isLoading: boolean;
  multiplayerError: string | null;
  roundTimeLimit: number;
  onRoundTimeLimitChange: (limit: number) => void;
  autoAdvance: boolean;
  onAutoAdvanceChange: (val: boolean) => void;
  currentAnswerMode?: AnswerMode;
  onAnswerModeChange?: (mode: AnswerMode) => void;
  currentTotalRounds?: number;
  onTotalRoundsChange?: (rounds: number) => void;
  onStartSoloDraft?: () => void;
  onHostStartDraft?: () => void;
  roomGameType?: RoomGameType;
  onRoomGameTypeChange?: (type: RoomGameType) => void;
  initialTab?: 'solo' | 'create_room' | 'join_room';
  onBackToLanding?: () => void;
}

const AVATARS = ['🎧', '🎸', '🎤', '🎹', '🐱', '🦊', '⚡', '🌟'];
export const TIME_LIMIT_OPTIONS = [20, 25, 30, 0];
export const TIME_LIMIT_LABELS = ['20s', '25s', '30s', '∞ ไม่จำกัด'];

export const CategorySelectModal: React.FC<CategorySelectModalProps> = ({
  onStartSolo,
  onStartCustomArtist: _onStartCustomArtist,
  onCreateOnlineRoom,
  onJoinOnlineRoom,
  onLeaveRoom,
  onKickPlayer,
  roomState,
  isHost,
  onHostStartGame,
  onUpdateRoomSettings,
  isLoading,
  multiplayerError,
  roundTimeLimit,
  onRoundTimeLimitChange,
  autoAdvance,
  onAutoAdvanceChange,
  currentAnswerMode,
  onAnswerModeChange,
  currentTotalRounds,
  onTotalRoundsChange,
  onStartSoloDraft,
  onHostStartDraft,
  roomGameType = 'standard',
  onRoomGameTypeChange,
  initialTab,
  onBackToLanding
}) => {
  const [activeTab, setActiveTab] = useState<'solo' | 'create_room' | 'join_room'>(initialTab || 'solo');

  useEffect(() => {
    if (initialTab) {
      setActiveTab(initialTab);
    }
  }, [initialTab]);

  useEffect(() => {
    if (activeTab === 'create_room' && (roundTimeLimit === 0 || roundTimeLimit === 20)) {
      onRoundTimeLimitChange(30);
    }
  }, [activeTab]);

  // Single Category Selection (Persisted with storageService)
  const [selectedCategoryId, setSelectedCategoryId] = useState<string>(() =>
    storageService.getSelectedCategoryId(CATEGORIES[0].id)
  );
  const [regionFilter, setRegionFilter] = useState<ArtistRegion | 'all'>('all');
  const [customCat, setCustomCat] = useState<Category | null>(null);
  const [roundCount, setRoundCount] = useState<number>(() => currentTotalRounds ?? storageService.getTotalRounds(10));
  const [answerMode, setAnswerMode] = useState<AnswerMode>(() => currentAnswerMode ?? storageService.getAnswerMode('multiple_choice'));

  // Online Room Randomizer & Artist Studio State (Matches Image 3)
  const [selectedRandomRegions, setSelectedRandomRegions] = useState<ArtistRegion[]>(() =>
    storageService.getRandomRegions(['thai', 'inter', 'kpop', 'anime_jpop'])
  );
  const [roomRandomCount, setRoomRandomCount] = useState<number>(() => storageService.getRandomCount(5));
  const [roomResultsViewMode, setRoomResultsViewMode] = useState<'list' | 'chips'>('list');
  const [roomCategoryTab, setRoomCategoryTab] = useState<'random' | 'preset'>('random');
  const [roomPresetRegionFilter, setRoomPresetRegionFilter] = useState<ArtistRegion | 'all'>('all');

  // Fast lookup map for artist details (emoji, region, genre)
  const artistMap = useMemo(() => {
    const map = new Map<string, GlobalArtist>();
    for (const a of GLOBAL_ARTISTS) {
      map.set(a.name.toLowerCase().trim(), a);
    }
    return map;
  }, []);

  // Global Artists Multi-Select State
  const [showGlobalPicker, setShowGlobalPicker] = useState<boolean>(false);
  const [pickerPresetRegion, setPickerPresetRegion] = useState<ArtistRegion | undefined>(undefined);
  const [customSelectedArtists, setCustomSelectedArtists] = useState<string[]>([]);

  const activeRoomArtists = useMemo(() => {
    if (roomState?.category.selectedArtists && roomState.category.selectedArtists.length > 0) {
      return roomState.category.selectedArtists;
    }
    return customSelectedArtists;
  }, [roomState?.category.selectedArtists, customSelectedArtists]);

  const filteredPresetCategoryOptions = useMemo(() => {
    if (roomPresetRegionFilter === 'all') {
      return CATEGORIES;
    }
    return CATEGORIES.filter((it) => it.region === roomPresetRegionFilter);
  }, [roomPresetRegionFilter]);

  // Single effective category computed from selectedCategoryId (or custom global artists if chosen)
  const effectiveCategory = useMemo<Category>(() => {
    if (customCat && customSelectedArtists.length > 0) {
      return customCat;
    }
    const found = CATEGORIES.find((item) => item.id === selectedCategoryId);
    if (found) {
      return found;
    }
    return CATEGORIES[0];
  }, [customCat, customSelectedArtists, selectedCategoryId]);

  // Filtered categories based on regionFilter (all categories unified without separating presets)
  const filteredCategoryOptions = useMemo(() => {
    if (regionFilter === 'all') {
      return CATEGORIES;
    }
    return CATEGORIES.filter((it) => it.region === regionFilter);
  }, [regionFilter]);

  // Player Profile (Persisted with storageService)
  const [playerName, setPlayerName] = useState<string>(() => storageService.getPlayerName(getRandomITPlayerName()));
  const [selectedAvatar, setSelectedAvatar] = useState<string>(() => storageService.getPlayerAvatar('🎧'));
  const [joinCodeInput, setJoinCodeInput] = useState<string>('');
  const [copiedLink, setCopiedLink] = useState(false);
  const [copiedCode, setCopiedCode] = useState(false);
  const [loadingAction, setLoadingAction] = useState<string>('');

  // Reset loadingAction when isLoading turns false
  useEffect(() => {
    if (!isLoading) {
      setLoadingAction('');
    }
  }, [isLoading]);

  // Check URL query parameters for ?room=XXXX
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const params = new URLSearchParams(window.location.search);
      const roomParam = params.get('room');
      if (roomParam) {
        setJoinCodeInput(roomParam.toUpperCase().trim().replace(/^SG-?/i, ''));
        setActiveTab('join_room');
      }
    }
  }, []);

  const handleCopyInviteLink = () => {
    if (!roomState) return;
    soundFX.playClick();
    const url = `${window.location.origin}${window.location.pathname}?room=${roomState.code}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopiedLink(true);
        setTimeout(() => setCopiedLink(false), 2500);
      });
    }
  };

  const handleCopyRoomCodeOnly = () => {
    if (!roomState?.code) return;
    soundFX.playClick();
    if (navigator.clipboard) {
      navigator.clipboard.writeText(roomState.code).then(() => {
        setCopiedCode(true);
        setTimeout(() => setCopiedCode(false), 2500);
      });
    }
  };

  const handleStartSoloGame = (cat: Category) => {
    soundFX.playClick();
    setLoadingAction(`กำลังเตรียมเพลง "${cat.thaiName}"...`);
    onStartSolo(cat, roundCount, answerMode);
  };

  const handleOpenGlobalPicker = (region?: ArtistRegion) => {
    soundFX.playClick();
    setPickerPresetRegion(region);
    setShowGlobalPicker(true);
  };

  const handleOpenGlobalPickerForRoom = () => {
    soundFX.playClick();
    setPickerPresetRegion(undefined);
    setShowGlobalPicker(true);
  };

  const toggleRandomRegion = (reg: ArtistRegion) => {
    soundFX.playClick();
    setSelectedRandomRegions((prev) => {
      let next: ArtistRegion[];
      if (prev.includes(reg)) {
        if (prev.length <= 1) return prev;
        next = prev.filter((r) => r !== reg);
      } else {
        next = [...prev, reg];
      }
      storageService.setRandomRegions(next);
      return next;
    });
  };

  const handleSelectAllRandomRegions = () => {
    soundFX.playClick();
    setSelectedRandomRegions((prev) => {
      const allFour: ArtistRegion[] = ['thai', 'inter', 'kpop', 'anime_jpop'];
      const next: ArtistRegion[] = prev.length === 4 ? (['thai'] as ArtistRegion[]) : allFour;
      storageService.setRandomRegions(next);
      return next;
    });
  };

  const handleExecuteSmartRandomForRoom = (countToUse?: number) => {
    soundFX.playClick();
    const count = countToUse ?? roomRandomCount;
    const activeRegions = selectedRandomRegions.length > 0
      ? selectedRandomRegions
      : (['thai', 'inter', 'kpop', 'anime_jpop'] as ArtistRegion[]);

    const pool = GLOBAL_ARTISTS.filter((a) => activeRegions.includes(a.region));
    if (pool.length === 0) return;

    const shuffled = [...pool].sort(() => 0.5 - Math.random());
    const countToPick = Math.min(count, pool.length);
    const picked = shuffled.slice(0, countToPick).map((a) => a.name);

    const regionNames: string[] = [];
    if (activeRegions.includes('thai')) regionNames.push('ไทย');
    if (activeRegions.includes('inter')) regionNames.push('สากล');
    if (activeRegions.includes('kpop')) regionNames.push('K-POP');
    if (activeRegions.includes('anime_jpop')) regionNames.push('Anime');

    const thaiName = `🎲 สุ่มศิลปิน ${regionNames.join('+')} (${picked.length} คน)`;
    const customCategory: Category = {
      id: 'custom_global_artists',
      name: thaiName,
      thaiName,
      emoji: '🎲',
      badge: `สุ่ม ${picked.length} ศิลปิน`,
      description: picked.join(', '),
      gradient: 'from-orange-500 to-pink-600',
      searchQueries: picked,
      selectedArtists: picked,
      modeType: 'random'
    };

    setCustomCat(customCategory);
    setSelectedCategoryId(customCategory.id);
    setCustomSelectedArtists(picked);

    if (roomState && isHost && onUpdateRoomSettings) {
      onUpdateRoomSettings(
        customCategory,
        roomState.totalRounds,
        roomState.answerMode,
        roomState.roundTimeLimit ?? roundTimeLimit,
        roomState.autoAdvance ?? autoAdvance
      );
    }
  };

  const handleRemoveArtistFromRoom = (artistName: string) => {
    soundFX.playClick();
    const currentList = roomState?.category.selectedArtists || customSelectedArtists;
    const remaining = currentList.filter((a) => a !== artistName);
    if (remaining.length === 0) return;

    const thaiName = `🎲 สุ่มศิลปิน (${remaining.length} คน)`;
    const customCategory: Category = {
      id: 'custom_global_artists',
      name: thaiName,
      thaiName,
      emoji: '🎲',
      badge: `${remaining.length} ศิลปิน`,
      description: remaining.join(', '),
      gradient: 'from-orange-500 to-pink-600',
      searchQueries: remaining,
      selectedArtists: remaining,
      modeType: 'random'
    };

    setCustomCat(customCategory);
    setCustomSelectedArtists(remaining);

    if (roomState && isHost && onUpdateRoomSettings) {
      onUpdateRoomSettings(
        customCategory,
        roomState.totalRounds,
        roomState.answerMode,
        roomState.roundTimeLimit ?? roundTimeLimit,
        roomState.autoAdvance ?? autoAdvance
      );
    }
  };

  const handleClearRoomArtists = () => {
    soundFX.playClick();
    setCustomSelectedArtists([]);
    setCustomCat(null);
    setSelectedCategoryId(CATEGORIES[0].id);
    if (roomState && isHost && onUpdateRoomSettings) {
      onUpdateRoomSettings(
        CATEGORIES[0],
        roomState.totalRounds,
        roomState.answerMode,
        roomState.roundTimeLimit ?? roundTimeLimit,
        roomState.autoAdvance ?? autoAdvance
      );
    }
  };

  const handleConfirmGlobalArtists = (artists: string[], meta?: ArtistSelectionMeta) => {
    setShowGlobalPicker(false);
    if (artists.length === 0) return;
    setCustomSelectedArtists(artists);

    let thaiName = `🎨 ศิลปินที่เลือก (${artists.length} คน)`;
    let badge = `${artists.length} ศิลปิน`;
    let emoji = '🎨';
    let modeType: 'preset' | 'random' | 'custom' = 'custom';
    let description = artists.slice(0, 5).join(', ') + (artists.length > 5 ? ` และอีก ${artists.length - 5} คน` : '');

    if (meta?.sourceType === 'preset' && meta.presetTitle) {
      thaiName = meta.presetTitle;
      badge = 'จัดชุดด่วน';
      emoji = '⚡';
      modeType = 'preset';
      description = meta.presetSubtitle || description;
    } else if (meta?.sourceType === 'random') {
      thaiName = `🎲 สุ่มศิลปินอัตโนมัติ (${artists.length} คน)`;
      badge = meta.randomSummary ? `สุ่ม: ${meta.randomSummary}` : 'สุ่มอัตโนมัติ';
      emoji = '🎲';
      modeType = 'random';
      description = artists.join(', ');
    } else {
      thaiName = `🎨 เลือกศิลปินเอง (${artists.length} คน)`;
      badge = 'เลือกศิลปินเอง';
      emoji = '🎨';
      modeType = 'custom';
    }

    const customCategory: Category = {
      id: meta?.sourceType === 'preset' ? `preset_${meta.presetTitle}` : 'custom_global_artists',
      name: thaiName,
      thaiName,
      emoji,
      badge,
      description,
      gradient: 'from-orange-500 to-pink-600',
      searchQueries: artists,
      selectedArtists: artists,
      modeType
    };

    setCustomCat(customCategory);
    setSelectedCategoryId(customCategory.id);

    // If host is updating settings inside an online room:
    if (roomState && roomState.status === 'waiting' && isHost) {
      if (onUpdateRoomSettings) {
        onUpdateRoomSettings(
          customCategory,
          roomState.totalRounds,
          roomState.answerMode,
          roomState.roundTimeLimit ?? roundTimeLimit,
          roomState.autoAdvance ?? autoAdvance
        );
      }
      return;
    }

    if (activeTab === 'solo') {
      setLoadingAction(`กำลังเตรียมเพลง "${thaiName}"...`);
      onStartSolo(customCategory, roundCount, answerMode);
    }
  };

  const handleSelectCategory = (cat: Category) => {
    soundFX.playClick();
    setSelectedCategoryId(cat.id);
    setCustomCat(null);
    setCustomSelectedArtists([]);
    storageService.setSelectedCategoryId(cat.id);
  };

  const handleCreateRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    soundFX.playClick();
    const effectiveLimit = (!roundTimeLimit || roundTimeLimit === 0) ? 30 : roundTimeLimit;
    if (effectiveLimit !== roundTimeLimit) {
      onRoundTimeLimitChange(effectiveLimit);
    }
    setLoadingAction(`กำลังสร้างห้องออนไลน์ (${effectiveCategory.thaiName})...`);
    onCreateOnlineRoom(playerName, effectiveCategory, roundCount, answerMode);
  };

  const handleJoinRoomSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const cleanCode = joinCodeInput.trim().toUpperCase().replace(/^SG-?/i, '');
    if (!cleanCode) return;
    soundFX.playClick();
    setLoadingAction(`กำลังเชื่อมต่อไปยังห้อง ${cleanCode}...`);
    onJoinOnlineRoom(cleanCode, playerName);
  };

  // If already inside an online room waiting for start
  if (roomState && roomState.status === 'waiting') {
    const currentRoomGameType: RoomGameType = roomState.gameType || roomGameType || 'standard';
    const isSongDraftMode = currentRoomGameType === 'song_draft';
    const hostPlayer = roomState.players.find((p) => p.isHost);
    const sortedRoomPlayers = [...roomState.players].sort((a, b) => (b.isHost ? 1 : 0) - (a.isHost ? 1 : 0));
    const roomEffectiveTimeLimit = (!roomState.roundTimeLimit || roomState.roundTimeLimit === 0) ? 30 : roomState.roundTimeLimit;

    return (
      <div className="modal-overlay">
        <div className="clean-modal-card room-waiting-card">
          {/* Top Bar */}
          <div className="room-top-nav-row" style={{ marginBottom: '10px' }}>
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                if (onLeaveRoom) onLeaveRoom();
              }}
              className="btn-room-back-pill"
              id="leave-room-back-btn"
              title="ออกจากห้อง"
            >
              <ArrowLeft size={16} />
              <span>{isHost ? 'ยุบห้อง' : 'ออกจากห้อง'}</span>
            </button>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap' }}>
              {(() => {
                const viewingSummaryCount = roomState.players.filter((p) => p.status === 'viewing_summary').length;
                if (viewingSummaryCount > 0) {
                  return (
                    <span className="clean-pill-badge" style={{ background: '#fffbeb', color: '#b45309', borderColor: '#fde68a' }}>
                      📊 กำลังดูสรุปผล {viewingSummaryCount}/{roomState.players.length} คน
                    </span>
                  );
                }
                return (
                  <span className="clean-pill-badge" style={{ background: '#ecfdf5', color: '#059669', borderColor: '#a7f3d0' }}>
                    🟢 กำลังรอเริ่มเกม
                  </span>
                );
              })()}
              {isHost ? (
                <span className="clean-pill-badge host-pill-highlight">
                  👑 คุณคือหัวหน้าห้อง (ผู้สร้าง)
                </span>
              ) : (
                <span className="clean-pill-badge host-pill-highlight">
                  👑 หัวหน้าห้อง: {hostPlayer?.name || 'หัวหน้าห้อง'}
                </span>
              )}
            </div>
          </div>

          {/* 3-Column Spacious Grid: Settings, Players, Categories */}
          <div className="room-waiting-grid">
            {/* Left Column: Room Code, Rules & Start Button */}
            <div className="room-waiting-left-hub">
              {/* Room Code Card */}
              <div className="room-code-card">
                <span className="room-code-tag">รหัสห้องเล่นเกม</span>
                <div className="room-code-hero-box">
                  <h2 className="room-code-display">
                    {roomState.code}
                  </h2>
                  <button
                    type="button"
                    onClick={handleCopyRoomCodeOnly}
                    className={`btn-copy-code-only ${copiedCode ? 'copied' : ''}`}
                    title="คัดลอกเฉพาะรหัสห้อง 4 ตัว"
                  >
                    {copiedCode ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copiedCode ? 'คัดลอกรหัสแล้ว!' : 'คัดลอกรหัส'}</span>
                  </button>
                </div>
                <div className="copy-link-box" style={{ marginTop: '6px' }}>
                  <input
                    type="text"
                    readOnly
                    value={`${typeof window !== 'undefined' ? window.location.origin + window.location.pathname : ''}?room=${roomState.code}`}
                    className="copy-link-input"
                    style={{ fontSize: '0.74rem' }}
                  />
                  <button onClick={handleCopyInviteLink} className="copy-link-btn" title="คัดลอกลิงก์เชิญเพื่อน">
                    {copiedLink ? <Check size={13} /> : <Copy size={13} />}
                    <span>{copiedLink ? 'คัดลอกแล้ว!' : 'คัดลอกลิงก์'}</span>
                  </button>
                </div>
              </div>

              {/* Game Rules (For Host) */}
              {isHost && (
                <div className="room-setting-block" style={{ padding: '10px 12px', gap: '8px', flexShrink: 0 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                    <SlidersHorizontal size={13} />
                    <span className="block-title" style={{ fontSize: '0.82rem' }}>กติกาการแข่งขัน</span>
                  </div>

                  {/* 0. Game Mode Selection (Standard vs SongDraft 1v1) */}
                  <div className="rule-field">
                    <div className="rule-header-between">
                      <span className="rule-label" style={{ fontSize: '0.74rem' }}>⚔️ โหมดการแข่งขัน</span>
                      {roomState.players.length === 2 && (
                        <span className="rule-badge" style={{ fontSize: '0.66rem', background: '#f59e0b', color: '#fff' }}>
                          ✨ แนะนำสำหรับ 2 คน
                        </span>
                      )}
                    </div>
                    <div className="host-mode-toggle-group">
                      <button
                        type="button"
                        onClick={() => {
                          soundFX.playClick();
                          onRoomGameTypeChange?.('standard');
                        }}
                        className={`host-mode-btn ${currentRoomGameType === 'standard' ? 'active' : ''}`}
                        style={{ fontSize: '0.72rem', padding: '4px 6px' }}
                      >
                        🎵 ทายปกติ
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          soundFX.playVersus();
                          onRoomGameTypeChange?.('song_draft');
                        }}
                        className={`host-mode-btn ${currentRoomGameType === 'song_draft' ? 'active' : ''}`}
                        style={{
                          fontSize: '0.72rem',
                          padding: '4px 6px',
                          color: currentRoomGameType === 'song_draft' ? '#fff' : '#f59e0b',
                          background: currentRoomGameType === 'song_draft' ? 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)' : undefined,
                          borderColor: currentRoomGameType === 'song_draft' ? '#ef4444' : undefined,
                          boxShadow: currentRoomGameType === 'song_draft' ? '0 2px 10px rgba(239, 68, 68, 0.4)' : undefined,
                          fontWeight: currentRoomGameType === 'song_draft' ? 700 : undefined
                        }}
                        title="ดวลเลือก 5 ศิลปินลับๆ แบน 2 คน แล้วมาแข่ง 1v1"
                      >
                        ⚔️ SongDraft 1v1 (ดวล)
                      </button>
                    </div>
                  </div>

                  {/* 1. Answer Mode */}
                  <div className="rule-field">
                    <span className="rule-label" style={{ fontSize: '0.74rem' }}>รูปแบบการตอบ</span>
                    <div className="host-mode-toggle-group">
                      <button
                        type="button"
                        onClick={() => {
                          soundFX.playClick();
                          onUpdateRoomSettings?.(roomState.category, roomState.totalRounds, 'multiple_choice');
                        }}
                        className={`host-mode-btn ${roomState.answerMode === 'multiple_choice' ? 'active' : ''}`}
                        style={{ fontSize: '0.72rem', padding: '4px 6px' }}
                      >
                        🔘 4 ช้อยส์
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          soundFX.playClick();
                          onUpdateRoomSettings?.(roomState.category, roomState.totalRounds, 'text_pure');
                        }}
                        className={`host-mode-btn ${roomState.answerMode === 'text_pure' ? 'active' : ''}`}
                        style={{ fontSize: '0.72rem', padding: '4px 6px' }}
                      >
                        🔤 พิมพ์ตอบ
                      </button>
                      <button
                        type="button"
                        onClick={() => {
                          soundFX.playClick();
                          onUpdateRoomSettings?.(roomState.category, roomState.totalRounds, 'autocomplete');
                        }}
                        className={`host-mode-btn ${roomState.answerMode === 'autocomplete' ? 'active' : ''}`}
                        style={{ fontSize: '0.72rem', padding: '4px 6px' }}
                      >
                        💡 มีตัวช่วย
                      </button>
                    </div>
                  </div>

                  {/* 2. Total Rounds */}
                  <div className="rule-field">
                    <span className="rule-label" style={{ fontSize: '0.74rem' }}>จำนวนรอบการเล่น</span>
                    <div className="host-round-toggle-group">
                      {[5, 10, 15, 20].map((cnt) => (
                        <button
                          key={cnt}
                          type="button"
                          onClick={() => {
                            soundFX.playClick();
                            onUpdateRoomSettings?.(
                              roomState.category,
                              cnt,
                              roomState.answerMode,
                              roomState.roundTimeLimit ?? roundTimeLimit,
                              roomState.autoAdvance ?? autoAdvance
                            );
                          }}
                          className={`host-round-btn ${roomState.totalRounds === cnt ? 'active' : ''}`}
                          style={{ fontSize: '0.72rem', padding: '4px 6px' }}
                        >
                          {cnt} รอบ
                        </button>
                      ))}
                    </div>
                  </div>

                  {/* 3. Time Limit */}
                  <div className="rule-field">
                    <div className="rule-header-between">
                      <span className="rule-label" style={{ fontSize: '0.74rem' }}>⏱️ เวลาตอบแต่ละข้อ</span>
                      <span className="rule-badge" style={{ fontSize: '0.68rem' }}>
                        {`${roomEffectiveTimeLimit} วินาที`}
                      </span>
                    </div>
                    <TimeLimitStepper
                      value={roomEffectiveTimeLimit}
                      onChange={(val) => {
                        onRoundTimeLimitChange(val);
                        onUpdateRoomSettings?.(
                          roomState.category,
                          roomState.totalRounds,
                          roomState.answerMode,
                          val,
                          roomState.autoAdvance ?? autoAdvance
                        );
                      }}
                      mini
                      allowUnlimited={false}
                    />
                  </div>

                  {/* 4. Auto-advance */}
                  <div className="rule-field">
                    <div className="rule-header-between">
                      <span className="rule-label" style={{ fontSize: '0.74rem' }}>⏩ เลื่อนข้ออัตโนมัติ</span>
                      <span className="rule-badge sub" style={{ fontSize: '0.68rem' }}>
                        {(roomState.autoAdvance ?? autoAdvance) ? 'นับ 6 วิ' : 'กดเอง'}
                      </span>
                    </div>
                    <button
                      type="button"
                      onClick={() => {
                        const nextVal = !(roomState.autoAdvance ?? autoAdvance);
                        soundFX.playClick();
                        onAutoAdvanceChange(nextVal);
                        onUpdateRoomSettings?.(
                          roomState.category,
                          roomState.totalRounds,
                          roomState.answerMode,
                          roomState.roundTimeLimit ?? roundTimeLimit,
                          nextVal
                        );
                      }}
                      className={`host-autoadvance-btn ${(roomState.autoAdvance ?? autoAdvance) ? 'active' : 'inactive'}`}
                      style={{ height: '32px', fontSize: '0.76rem' }}
                    >
                      <span>{(roomState.autoAdvance ?? autoAdvance) ? '✓ เปิดอยู่ (ไปข้อถัดไปอัตโนมัติ)' : '✕ ปิดอยู่ (หยุดรอให้กดเอง)'}</span>
                    </button>
                  </div>
                </div>
              )}

              {/* Start Button (For Host) */}
              {isHost && (
                (() => {
                  const isDraftMode = currentRoomGameType === 'song_draft';
                  const isDraftNotTwo = isDraftMode && roomState.players.length !== 2;
                  const isStartDisabled = isLoading || isDraftNotTwo;

                  let draftButtonText = '⚔️ เริ่มดวล SongDraft (เข้าสู่ห้องดราฟต์)';
                  if (isLoading) {
                    draftButtonText = 'กำลังโหลด...';
                  } else if (roomState.players.length < 2) {
                    draftButtonText = '⏳ รอผู้เล่นคนที่ 2 เพื่อเริ่มดวล (ต้องมี 2 คน)';
                  } else if (roomState.players.length > 2) {
                    draftButtonText = `⚠️ ดวลได้ 2 คนเท่านั้น (ปัจจุบัน ${roomState.players.length} คน)`;
                  }

                  return (
                    <button
                      onClick={() => {
                        soundFX.playClick();
                        if (currentRoomGameType === 'song_draft') {
                          if (roomState.players.length !== 2) {
                            soundFX.playWrong();
                            return;
                          }
                          if (onHostStartDraft) {
                            onHostStartDraft();
                          }
                        } else {
                          onHostStartGame();
                        }
                      }}
                      disabled={isStartDisabled}
                      className="btn-primary-large"
                      id="host-start-game-btn"
                      style={{
                        width: '100%',
                        padding: '12px 18px',
                        fontSize: '1.02rem',
                        marginTop: 'auto',
                        flexShrink: 0,
                        opacity: isStartDisabled ? 0.5 : 1,
                        cursor: isStartDisabled ? 'not-allowed' : 'pointer',
                        background: currentRoomGameType === 'song_draft' ? (isStartDisabled ? '#4b5563' : 'linear-gradient(135deg, #ef4444 0%, #b91c1c 100%)') : undefined,
                        boxShadow: currentRoomGameType === 'song_draft' && !isStartDisabled ? '0 4px 18px rgba(239, 68, 68, 0.45)' : undefined
                      }}
                    >
                      {currentRoomGameType === 'song_draft' ? (
                        <>
                          <Swords size={18} />
                          <span>{draftButtonText}</span>
                        </>
                      ) : (
                        <>
                          <Play size={18} fill="currentColor" />
                          <span>{isLoading ? 'กำลังโหลดเพลง...' : '🚀 เริ่มเกมพร้อมกันทุกคน'}</span>
                        </>
                      )}
                    </button>
                  );
                })()
              )}

              {/* Host Viewing Summary Notice */}
              {isHost && roomState.players.some((p) => p.status === 'viewing_summary') && (
                <div style={{
                  fontSize: '0.73rem',
                  color: '#b45309',
                  background: '#fffbeb',
                  border: '1px solid #fde68a',
                  borderRadius: '10px',
                  padding: '8px 12px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  lineHeight: 1.35,
                  marginTop: '8px'
                }}>
                  <span>⏳</span>
                  <span>มีเพื่อนกำลังดูสรุปผลอยู่ {roomState.players.filter((p) => p.status === 'viewing_summary').length} คน (สามารถกดเริ่มเกมเพื่อดึงทุกคนเข้าได้ทันที)</span>
                </div>
              )}

              {/* Leave Room Action */}
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  if (onLeaveRoom) onLeaveRoom();
                }}
                className="btn-room-cancel-link"
                id="leave-room-bottom-btn"
                style={{ marginTop: isHost ? '0' : 'auto', flexShrink: 0 }}
              >
                <LogOut size={13} />
                <span>{isHost ? 'ยุบห้องและกลับไปหน้าหลัก' : 'ออกจากห้องนี้'}</span>
              </button>
            </div>

            {/* Middle Column: Players in Room - Dedicated vertical list */}
            <div className="room-waiting-players-col">
              <div className="players-col-header">
                <div className="players-col-title-wrap">
                  <Users size={16} className="players-col-icon" />
                  <span className="players-col-title">ผู้เล่นในห้อง</span>
                </div>
                <span className="players-col-count-pill">{roomState.players.length} คน</span>
              </div>

              {/* Vertical Scrollable List */}
              <div className="room-players-vertical-list">
                {sortedRoomPlayers.map((p: PlayerSession) => {
                  const isCurrentPlayer = (isHost && p.isHost) || (!isHost && !p.isHost && p.name === playerName);
                  return (
                    <div
                      key={p.id}
                      className={`player-vertical-card ${p.isHost ? 'host-card' : ''} ${isCurrentPlayer ? 'is-self' : ''}`}
                    >
                      <div className="player-vcard-avatar-wrap">
                        <span className="player-vcard-avatar">{p.avatar || '🎧'}</span>
                        {p.isHost && <span className="player-vcard-crown" title="หัวหน้าห้อง">👑</span>}
                      </div>

                      <div className="player-vcard-info">
                        <div className="player-vcard-name-row">
                          <span className="player-vcard-name" title={p.name}>{p.name}</span>
                          {isCurrentPlayer && <span className="player-vcard-you">คุณ</span>}
                        </div>
                        {p.status === 'viewing_summary' ? (
                          <span className="player-vcard-role-tag viewing-summary-tag">
                            📊 กำลังดูสรุปผล
                          </span>
                        ) : p.isHost ? (
                          <span className="player-vcard-role-tag host-tag">👑 ผู้สร้างห้อง</span>
                        ) : (
                          <span className="player-vcard-role-tag ready-tag">🟢 พร้อมเล่น</span>
                        )}
                      </div>

                      {isHost && !p.isHost && onKickPlayer && (
                        <button
                          type="button"
                          className="btn-kick-player-vcard"
                          onClick={(e) => {
                            e.stopPropagation();
                            soundFX.playClick();
                            if (window.confirm(`ต้องการเตะผู้เล่น "${p.name}" ออกจากห้องใช่หรือไม่?`)) {
                              onKickPlayer(p.id);
                            }
                          }}
                          title={`เตะ ${p.name} ออกจากห้อง`}
                        >
                          <UserMinus size={12} />
                          <span>เตะ</span>
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Invite Hint at bottom of players list */}
              <div className="players-col-footer-hint">
                <span>🔗 แชร์รหัสห้องให้เพื่อนเพื่อเข้าเล่น</span>
              </div>
            </div>

            {/* Right Column: Song & Category Selection OR SongDraft 1v1 Guide */}
            <div className="room-waiting-right-panel">
              {isSongDraftMode ? (
                <div className="room-draft-guide-container">
                  {/* Right Header: Title */}
                  <div className="room-right-header-row" style={{ alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.3rem' }}>⚔️</span>
                        <h3 className="room-settings-main-title" style={{ fontSize: '1.12rem', color: '#ea580c' }}>
                          <span>โหมด SongDraft 1v1 Duel (Pick & Ban)</span>
                        </h3>
                      </div>
                      <span className="room-settings-subtitle" style={{ marginTop: '3px' }}>
                        {isHost
                          ? 'ดวลเลือก 5 ศิลปินและแบน 2 ศิลปินแบบเรียลไทม์ (เลือกสดๆ ในห้องดราฟต์)'
                          : 'หัวหน้าห้องได้ตั้งค่าเป็นโหมดดวล 1v1 เลือก & แบนศิลปิน'}
                      </span>
                    </div>
                    <span className="room-draft-badge-pill">
                      ⚔️ 1v1 Arena
                    </span>
                  </div>

                  {/* 4 Steps Timeline Cards */}
                  <div className="room-draft-steps-grid">
                    {/* Step 1 */}
                    <div className="room-draft-step-card step-pick">
                      <div className="step-card-header">
                        <span className="step-card-icon">🎭</span>
                        <strong className="step-card-title">1. Secret Pick (เลือก 5 คน)</strong>
                      </div>
                      <p className="step-card-desc">
                        ผู้เล่นทั้งสองเลือกหรือสุ่ม 5 ศิลปินที่มั่นใจอย่างลับๆ โดยอีกฝ่ายจะไม่เห็นการ์ดจนกว่าจะหมดเวลา
                      </p>
                    </div>

                    {/* Step 2 */}
                    <div className="room-draft-step-card step-reveal">
                      <div className="step-card-header">
                        <span className="step-card-icon">✨</span>
                        <strong className="step-card-title">2. The Reveal (เปิดการ์ด)</strong>
                      </div>
                      <p className="step-card-desc">
                        เปิดการ์ดพร้อมกัน! หากมีศิลปินที่ใจตรงกัน จะได้รับสถานะ <strong>AUTO-MATCH</strong> คุ้มกันห้ามแบน
                      </p>
                    </div>

                    {/* Step 3 */}
                    <div className="room-draft-step-card step-ban">
                      <div className="step-card-header">
                        <span className="step-card-icon">🚫</span>
                        <strong className="step-card-title">3. Ban Phase (แบน 2 คน)</strong>
                      </div>
                      <p className="step-card-desc">
                        คลิกแบนศิลปินของอีกฝ่ายคนละ 2 คนที่คุณไม่อยากให้เพลงออก (การ์ดที่มีโล่ AUTO-MATCH แบนไม่ได้)
                      </p>
                    </div>

                    {/* Step 4 */}
                    <div className="room-draft-step-card step-battle">
                      <div className="step-card-header">
                        <span className="step-card-icon">🔥</span>
                        <strong className="step-card-title">4. Battle Roster (ดวลเพลง)</strong>
                      </div>
                      <p className="step-card-desc">
                        นำเพลงของศิลปินที่รอดชีวิตจากการดราฟต์มาประชันความเร็วในการทายเพลง ชิงชัยความเป็นหนึ่ง!
                      </p>
                    </div>
                  </div>

                  {/* Mode Notice Pill */}
                  <div className="room-draft-notice-pill">
                    <span className="notice-icon">💡</span>
                    <span>ในโหมดนี้ ผู้เล่นทั้งสองจะเข้าไปเลือกและแบนศิลปินสดๆ ในสังเวียนดราฟต์ จึง<strong>ไม่ต้องเลือกหมวดหมู่เพลงหรือสุ่มศิลปินล่วงหน้า</strong></span>
                  </div>

                  {/* Ready / Waiting Banner */}
                  <div className={`room-draft-status-banner ${roomState.players.length === 2 ? 'ready' : 'waiting'}`}>
                    <div className="status-banner-left">
                      <Users size={16} />
                      <span className="status-banner-text">
                        ผู้เล่นในห้อง: {roomState.players.length}/2 คน {roomState.players.length === 2 ? '• พร้อมเข้าสู่ห้องดราฟต์!' : '• กำลังรอผู้เล่นอีก 1 คนเข้าร่วมห้อง'}
                      </span>
                    </div>
                    {!isHost && (
                      <div className="status-banner-right">
                        <div className="spinner-small" style={{ width: '14px', height: '14px' }}></div>
                        <span className="status-banner-sub">
                          รอหัวหน้าห้องกดเริ่ม...
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              ) : isHost ? (
                <>
                  {/* Right Header: Title & Mode Tabs */}
                  <div className="room-right-header-row">
                    <div>
                      <h3 className="room-settings-main-title" style={{ fontSize: '1.05rem' }}>
                        <span>🎵 เลือกเพลงสำหรับการแข่งขัน</span>
                      </h3>
                      <span className="room-settings-subtitle">
                        {roomCategoryTab === 'random' ? 'สุ่มศิลปินตามจำนวนและหมวดหมู่ที่ต้องการ' : 'เลือกจากหมวดหมู่เพลงฮิตสำเร็จรูป'}
                      </span>
                    </div>

                    {/* Segmented Tab Switcher */}
                    <div className="room-right-tab-bar">
                      <button
                        type="button"
                        className={`room-right-tab-btn ${roomCategoryTab === 'random' ? 'active' : ''}`}
                        onClick={() => {
                          soundFX.playClick();
                          setRoomCategoryTab('random');
                          if (activeRoomArtists.length === 0) {
                            handleExecuteSmartRandomForRoom();
                          }
                        }}
                      >
                        <Dice5 size={14} />
                        <span>สุ่มอัตโนมัติ</span>
                      </button>
                      <button
                        type="button"
                        className={`room-right-tab-btn ${roomCategoryTab === 'preset' ? 'active' : ''}`}
                        onClick={() => {
                          soundFX.playClick();
                          setRoomCategoryTab('preset');
                        }}
                      >
                        <Disc size={14} />
                        <span>หมวดหมู่สำเร็จรูป</span>
                      </button>
                      <button
                        type="button"
                        className="room-right-tab-btn room-right-tab-btn-studio"
                        onClick={() => {
                          soundFX.playClick();
                          handleOpenGlobalPickerForRoom();
                        }}
                      >
                        <SlidersHorizontal size={14} />
                        <span>เลือกเอง</span>
                      </button>
                    </div>
                  </div>

                  {/* Tab 1: Image 3 Randomizer */}
                  {roomCategoryTab === 'random' ? (
                    <div className="sidebar-random-panel" style={{ flex: 1, minHeight: 0, overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '8px', paddingRight: '2px' }}>
                      {/* 1. Category Multi-select (Matching Image 3) */}
                      <div className="sidebar-random-cats-box">
                        <div className="sidebar-box-label-row">
                          <span className="sidebar-box-label">หมวดหมู่ที่จะสุ่ม:</span>
                          <button
                            type="button"
                            onClick={handleSelectAllRandomRegions}
                            className="btn-text-toggle"
                            title="เลือกหรือยกเลิกทุกหมวด"
                          >
                            {selectedRandomRegions.length === 4 ? 'ล้างหมวด' : 'เลือกทั้งหมด'}
                          </button>
                        </div>

                        {/* 2x2 Category Cards Grid */}
                        <div className="sidebar-cat-grid">
                          {RANDOM_CATEGORY_OPTIONS.map((cat) => {
                            const isChecked = selectedRandomRegions.includes(cat.id);
                            return (
                              <button
                                key={cat.id}
                                type="button"
                                onClick={() => toggleRandomRegion(cat.id)}
                                className={`sidebar-cat-card ${isChecked ? 'is-checked' : 'is-unchecked'}`}
                              >
                                <span className={`pill-check-box ${isChecked ? 'checked' : 'unchecked'}`}>
                                  {isChecked && <Check size={10} strokeWidth={3.5} />}
                                </span>
                                <span className="sidebar-cat-emoji">{cat.emoji}</span>
                                <span className="sidebar-cat-label">{cat.label}</span>
                              </button>
                            );
                          })}
                        </div>
                      </div>

                      {/* 2. Count Stepper & Quick Chips (Matching Image 3) */}
                      <div className="sidebar-count-box">
                        <div className="sidebar-box-label-row">
                          <span className="sidebar-box-label">จำนวนศิลปิน:</span>
                          <div className="sidebar-stepper-inline">
                            <button
                              type="button"
                              onClick={() => {
                                soundFX.playClick();
                                const next = Math.max(1, roomRandomCount - 1);
                                setRoomRandomCount(next);
                                storageService.setRandomCount(next);
                              }}
                              className="sidebar-stepper-btn"
                              title="ลด 1 คน"
                            >
                              -
                            </button>
                            <span className="sidebar-count-highlight">{roomRandomCount} คน</span>
                            <button
                              type="button"
                              onClick={() => {
                                soundFX.playClick();
                                const next = Math.min(25, roomRandomCount + 1);
                                setRoomRandomCount(next);
                                storageService.setRandomCount(next);
                              }}
                              className="sidebar-stepper-btn"
                              title="เพิ่ม 1 คน"
                            >
                              +
                            </button>
                          </div>
                        </div>

                        {/* Quick Count Chips */}
                        <div className="sidebar-quick-counts">
                          {[3, 5, 10, 15, 20].map((num) => (
                            <button
                              key={num}
                              type="button"
                              onClick={() => {
                                soundFX.playClick();
                                setRoomRandomCount(num);
                                storageService.setRandomCount(num);
                              }}
                              className={`sidebar-quick-btn ${roomRandomCount === num ? 'active' : ''}`}
                            >
                              {num} คน
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* 3. Big Roll Button (Matching Image 3) */}
                      <button
                        type="button"
                        onClick={() => handleExecuteSmartRandomForRoom()}
                        className="sidebar-btn-roll"
                      >
                        <Dice5 size={18} className="dice-spin" />
                        <span>กดสุ่ม {roomRandomCount} คนทันที</span>
                      </button>

                      {/* 4. Results Box (Matching Image 3) */}
                      <div className="sidebar-results-box" style={{ flex: 1, minHeight: 0, display: 'flex', flexDirection: 'column' }}>
                        <div className="sidebar-results-header">
                          <div className="results-title-group">
                            <span className="results-box-title">🎲 รายชื่อที่สุ่มได้</span>
                            <span className="results-count-pill">{activeRoomArtists.length} คน</span>
                          </div>

                          <div className="results-actions-group">
                            {activeRoomArtists.length > 0 && (
                              <div className="results-view-mode-toggle">
                                <button
                                  type="button"
                                  onClick={() => setRoomResultsViewMode('list')}
                                  className={`btn-mode-toggle ${roomResultsViewMode === 'list' ? 'active' : ''}`}
                                  title="แสดงแบบแถวรายการ"
                                >
                                  รายการ
                                </button>
                                <button
                                  type="button"
                                  onClick={() => setRoomResultsViewMode('chips')}
                                  className={`btn-mode-toggle ${roomResultsViewMode === 'chips' ? 'active' : ''}`}
                                  title="แสดงแบบชิปกระชับ"
                                >
                                  ชิป
                                </button>
                              </div>
                            )}

                            {activeRoomArtists.length > 0 && (
                              <button
                                type="button"
                                onClick={handleClearRoomArtists}
                                className="btn-clear-results"
                                title="ล้างทั้งหมด"
                              >
                                <RotateCcw size={11} />
                                <span>ล้าง</span>
                              </button>
                            )}
                          </div>
                        </div>

                        {activeRoomArtists.length > 0 ? (
                          roomResultsViewMode === 'chips' ? (
                            <div className="sidebar-results-chips" style={{ overflowY: 'auto', flex: 1, minHeight: '120px' }}>
                              {activeRoomArtists.map((name) => {
                                const artistInfo = artistMap.get(name.toLowerCase().trim());
                                return (
                                  <div key={name} className="sidebar-result-chip">
                                    <span className="chip-emoji">{artistInfo?.emoji || '🎤'}</span>
                                    <span className="chip-name">{name}</span>
                                    <button
                                      type="button"
                                      onClick={() => handleRemoveArtistFromRoom(name)}
                                      className="chip-remove"
                                      title={`ลบ ${name}`}
                                    >
                                      <X size={11} />
                                    </button>
                                  </div>
                                );
                              })}
                            </div>
                          ) : (
                            <div className="sidebar-results-list" style={{ overflowY: 'auto', flex: 1, minHeight: '120px' }}>
                              {activeRoomArtists.map((name) => {
                                const artistInfo = artistMap.get(name.toLowerCase().trim());
                                return (
                                  <div key={name} className="sidebar-result-item">
                                    <div className="result-artist-left">
                                      <span className="result-artist-emoji">{artistInfo?.emoji || '🎤'}</span>
                                      <span className="result-artist-name">{name}</span>
                                    </div>
                                    <div className="result-artist-right">
                                      {artistInfo && (
                                        <span className="result-artist-tag">{artistInfo.regionLabel}</span>
                                      )}
                                      <button
                                        type="button"
                                        onClick={() => handleRemoveArtistFromRoom(name)}
                                        className="btn-remove-result"
                                        title={`ลบ ${name}`}
                                      >
                                        <X size={12} />
                                      </button>
                                    </div>
                                  </div>
                                );
                              })}
                            </div>
                          )
                        ) : (
                          <div style={{ textAlign: 'center', padding: '20px 14px', color: '#475569', fontSize: '0.82rem' }}>
                            ยังไม่มีศิลปินที่เลือก กดปุ่ม <strong style={{ color: '#1e293b' }}>"กดสุ่ม {roomRandomCount} คนทันที"</strong> ด้านบนเพื่อเริ่มสุ่ม
                          </div>
                        )}
                      </div>


                    </div>
                  ) : (
                    /* Tab 2: Preset Categories */
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', flex: 1, minHeight: 0 }}>
                      {/* Region Filter Chips */}
                      <div className="lobby-region-chips-row" style={{ margin: 0 }}>
                        <button
                          type="button"
                          onClick={() => {
                            soundFX.playClick();
                            setRoomPresetRegionFilter('all');
                          }}
                          className={`region-pill-btn ${roomPresetRegionFilter === 'all' ? 'active' : ''}`}
                        >
                          ทั้งหมด
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            soundFX.playClick();
                            setRoomPresetRegionFilter('thai');
                          }}
                          className={`region-pill-btn ${roomPresetRegionFilter === 'thai' ? 'active' : ''}`}
                        >
                          <span className="region-code-badge">TH</span> เพลงไทย
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            soundFX.playClick();
                            setRoomPresetRegionFilter('inter');
                          }}
                          className={`region-pill-btn ${roomPresetRegionFilter === 'inter' ? 'active' : ''}`}
                        >
                          <span className="region-dot-green">🟢</span> สากล
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            soundFX.playClick();
                            setRoomPresetRegionFilter('kpop');
                          }}
                          className={`region-pill-btn ${roomPresetRegionFilter === 'kpop' ? 'active' : ''}`}
                        >
                          <span className="region-code-badge blue">KR</span> K-POP
                        </button>
                        <button
                          type="button"
                          onClick={() => {
                            soundFX.playClick();
                            setRoomPresetRegionFilter('anime_jpop');
                          }}
                          className={`region-pill-btn ${roomPresetRegionFilter === 'anime_jpop' ? 'active' : ''}`}
                        >
                          🎌 Anime & J-POP
                        </button>
                      </div>

                      {/* Scrollable Category Grid */}
                      <div className="clean-category-grid" style={{ overflowY: 'auto', flex: 1, maxHeight: '540px', padding: '4px 6px 36px 2px' }}>
                        {filteredPresetCategoryOptions.map((item) => {
                          const isSelected = roomState.category.id === item.id;
                          return (
                            <div
                              key={item.id}
                              onClick={() => {
                                soundFX.playClick();
                                setCustomCat(null);
                                setCustomSelectedArtists([]);
                                setSelectedCategoryId(item.id);
                                if (onUpdateRoomSettings) {
                                  onUpdateRoomSettings(
                                    item,
                                    roomState.totalRounds,
                                    roomState.answerMode,
                                    roomEffectiveTimeLimit,
                                    roomState.autoAdvance ?? autoAdvance
                                  );
                                }
                              }}
                              className={`clean-cat-card ${isSelected ? 'active' : ''}`}
                              role="button"
                              tabIndex={0}
                            >
                              <div className="cat-card-header">
                                <span className="cat-icon">{item.emoji}</span>
                                <div className="cat-card-badge-wrap">
                                  <span className="cat-tag-pill">{item.badge}</span>
                                  {isSelected && <span className="cat-selected-pill">✓ เลือกอยู่</span>}
                                </div>
                              </div>
                              <div className="cat-card-content">
                                <h4 className="cat-name" title={item.thaiName}>{item.thaiName}</h4>
                                <p className="cat-subtext" title={item.description}>{item.description}</p>
                              </div>
                            </div>
                          );
                        })}
                      </div>
                    </div>
                  )}
                </>
              ) : (
                /* Guest View: High-contrast, rich, interactive display */
                <div className="guest-lobby-wrap">
                  <div className="room-right-header-row" style={{ alignItems: 'flex-start' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                        <span style={{ fontSize: '1.25rem' }}>🎮</span>
                        <h3 className="room-settings-main-title">
                          <span>ข้อมูลการแข่งขัน & หมวดหมู่เพลง</span>
                        </h3>
                      </div>
                      <span className="room-settings-subtitle">
                        ห้องของ <strong>👑 {hostPlayer?.name || 'หัวหน้าห้อง'}</strong> • กติกาทั้งหมดถูกกำหนดโดยหัวหน้าห้อง
                      </span>
                    </div>
                    <span className="clean-pill-badge" style={{ background: '#ecfdf5', color: '#059669', borderColor: '#a7f3d0' }}>
                      🟢 ซิงค์ข้อมูลสด
                    </span>
                  </div>

                  <div className="guest-lobby-content-scroll">
                    {/* 1. Category Hero Card */}
                    <div className="guest-category-hero-card">
                      <div className="guest-cat-left">
                        <div className="guest-cat-icon-badge">
                          {roomState.category.emoji || '🎵'}
                        </div>
                        <div className="guest-cat-info">
                          <span className="guest-cat-tag">หมวดหมู่เพลงที่กำลังจะเล่น</span>
                          <h4 className="guest-cat-title" title={roomState.category.thaiName}>
                            {roomState.category.thaiName}
                          </h4>
                          <p className="guest-cat-desc">
                            {roomState.category.description || 'เตรียมทายเพลงฮิตและสะสมคะแนนในการแข่งขัน'}
                          </p>
                        </div>
                      </div>
                      <span className="guest-cat-region-badge">
                        {roomState.category.region === 'thai' && '🇹🇭 เพลงไทย'}
                        {roomState.category.region === 'inter' && '🌎 สากล'}
                        {roomState.category.region === 'kpop' && '✨ K-POP'}
                        {roomState.category.region === 'anime_jpop' && '🎌 Anime & J-POP'}
                        {(!roomState.category.region || roomState.category.region === 'all') && '✨ คัดสรรพิเศษ'}
                      </span>
                    </div>

                    {/* 2. Selected Artists Showcase (if any) */}
                    {roomState.category.selectedArtists && roomState.category.selectedArtists.length > 0 ? (
                      <div className="guest-artists-section">
                        <div className="guest-section-header">
                          <div className="guest-section-title-wrap">
                            <h4 className="guest-section-title">
                              🎤 รายชื่อศิลปินในรอบนี้
                            </h4>
                            <span className="guest-artists-count-badge">
                              {roomState.category.selectedArtists.length} คน
                            </span>
                          </div>
                          <span className="guest-section-hint">
                            เพลงจะสุ่มเฉพาะศิลปินที่เลือกไว้นี้
                          </span>
                        </div>

                        <div className="guest-artists-grid">
                          {roomState.category.selectedArtists.map((artistName) => {
                            const artistInfo = artistMap.get(artistName.toLowerCase().trim());
                            return (
                              <div key={artistName} className="guest-artist-card" title={artistName}>
                                <div className="guest-artist-left">
                                  <span className="guest-artist-emoji">{artistInfo?.emoji || '🎤'}</span>
                                  <span className="guest-artist-name">{artistName}</span>
                                </div>
                                {artistInfo?.regionLabel && (
                                  <span className="guest-artist-tag">{artistInfo.regionLabel}</span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    ) : (
                      <div className="guest-preset-info-box">
                        <span className="guest-preset-icon">💿</span>
                        <p className="guest-preset-text">
                          หมวดหมู่นี้ใช้คลังเพลงยอดนิยมของ <strong>{roomState.category.thaiName}</strong> โดยเพลงจะถูกสุ่มจากคลังเพลงคุณภาพสูงตามกติกาที่หัวหน้าห้องกำหนด
                        </p>
                      </div>
                    )}

                    {/* 3. Game Rules 4-Grid */}
                    <div className="guest-rules-grid">
                      <div className="guest-rule-card">
                        <div className="guest-rule-header">
                          <span className="guest-rule-icon">
                            {roomState.answerMode === 'multiple_choice' ? '🔘' : roomState.answerMode === 'text_pure' ? '🔤' : '💡'}
                          </span>
                          <span className="guest-rule-label">รูปแบบการตอบ</span>
                        </div>
                        <div className="guest-rule-val">
                          {roomState.answerMode === 'multiple_choice' && '4 ตัวเลือก'}
                          {roomState.answerMode === 'text_pure' && 'พิมพ์ตอบเอง'}
                          {roomState.answerMode === 'autocomplete' && 'พิมพ์มีตัวช่วย'}
                        </div>
                        <span className="guest-rule-sub">
                          {roomState.answerMode === 'multiple_choice' && 'กดช้อยส์ที่ถูกต้อง'}
                          {roomState.answerMode === 'text_pure' && 'พิมพ์ชื่อเพลงเร็ว'}
                          {roomState.answerMode === 'autocomplete' && 'มีระบบแนะนำชื่อเพลง'}
                        </span>
                      </div>

                      <div className="guest-rule-card">
                        <div className="guest-rule-header">
                          <span className="guest-rule-icon">🎯</span>
                          <span className="guest-rule-label">จำนวนรอบ</span>
                        </div>
                        <div className="guest-rule-val">{roomState.totalRounds} เพลง</div>
                        <span className="guest-rule-sub">แข่งทั้งหมด {roomState.totalRounds} ข้อ</span>
                      </div>

                      <div className="guest-rule-card">
                        <div className="guest-rule-header">
                          <span className="guest-rule-icon">⏱️</span>
                          <span className="guest-rule-label">เวลาตอบแต่ละข้อ</span>
                        </div>
                        <div className="guest-rule-val">
                          {`${roomEffectiveTimeLimit} วินาที`}
                        </div>
                        <span className="guest-rule-sub">
                          ตอบเร็วยิ่งได้คะแนนสูง
                        </span>
                      </div>

                      <div className="guest-rule-card">
                        <div className="guest-rule-header">
                          <span className="guest-rule-icon">⏩</span>
                          <span className="guest-rule-label">เลื่อนข้ออัตโนมัติ</span>
                        </div>
                        <div className="guest-rule-val">
                          {roomState.autoAdvance === false ? '⏸️ ปิด (กดเอง)' : '⚡ เปิด (6 วิ)'}
                        </div>
                        <span className="guest-rule-sub">
                          {roomState.autoAdvance === false ? 'รอทุกคนกดยืนยัน' : 'นับถอยหลัง 6 วิไปข้อถัดไป'}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* 4. Live Waiting Bottom Bar */}
                  <div className="guest-waiting-live-bar">
                    <div className="guest-live-left">
                      <div className="guest-live-pulse-dot" />
                      <div className="guest-live-message">
                        <span className="guest-live-title">
                          {hostPlayer?.status === 'viewing_summary'
                            ? `กำลังรอ 👑 ${hostPlayer?.name || 'หัวหน้าห้อง'} (กำลังดูสรุปผล)...`
                            : `กำลังรอ 👑 ${hostPlayer?.name || 'หัวหน้าห้อง'} กดเริ่มเกม...`}
                        </span>
                        <span className="guest-live-tip">
                          {hostPlayer?.status === 'viewing_summary'
                            ? 'หัวหน้าห้องกำลังตรวจสอบสรุปผลการแข่งขันรอบที่แล้ว เมื่อพร้อมจะกลับมาเริ่มเกม'
                            : 'เตรียมหูฟังและเปิดเสียงให้พร้อม การแข่งขันจะเริ่มขึ้นทันทีที่หัวหน้าห้องกดเริ่ม!'}
                        </span>
                      </div>
                    </div>
                    <div className="guest-live-spinner-wrap">
                      <Loader2 size={18} className="spinner-small-inline" style={{ color: '#16a34a' }} />
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Global Artist Multi-Select Studio Modal for Waiting Room */}
        {showGlobalPicker && (
          <GlobalArtistPickerModal
            initialSelected={roomState.category.selectedArtists || customSelectedArtists}
            presetRegion={pickerPresetRegion}
            onConfirm={handleConfirmGlobalArtists}
            onClose={() => setShowGlobalPicker(false)}
          />
        )}
      </div>
    );
  }

  return (
    <div className="modal-overlay">
      <div className="clean-modal-card dashboard-modal-card">
        {/* Top App Header */}
        <header className="dashboard-header-bar" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {onBackToLanding && (
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  onBackToLanding();
                }}
                className="btn-back-landing-pill"
                style={{
                  background: 'rgba(255, 255, 255, 0.08)',
                  border: '1px solid rgba(255, 255, 255, 0.15)',
                  color: '#e2e8f0',
                  fontSize: '0.84rem',
                  fontWeight: 700,
                  padding: '6px 14px',
                  borderRadius: '10px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '6px',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                title="กลับไปยังหน้าแรก"
              >
                <Home size={14} />
                <span>หน้าแรก</span>
              </button>
            )}
            <div 
              className="app-brand-pill" 
              onClick={onBackToLanding}
              style={{ cursor: onBackToLanding ? 'pointer' : 'default' }}
              title={onBackToLanding ? 'คลิกเพื่อกลับหน้าแรก' : undefined}
            >
              <span className="brand-icon">🎧</span>
              <strong className="brand-name">SongGuessr TH</strong>
            </div>
          </div>
        </header>

        {/* If Join Room Mode: Dedicated clean centered card (Anti-clutter, no categories/studio on right) */}
        {activeTab === 'join_room' ? (
          <div className="join-room-dedicated-wrap">
            <div className="join-room-dedicated-card">
              <div className="join-dedicated-header">
                <div className="join-dedicated-icon">
                  <Users size={30} />
                </div>
                <h2 className="join-dedicated-title">เข้าร่วมห้องออนไลน์</h2>
                <p className="join-dedicated-sub">ใส่ชื่อผู้เล่นและรหัสห้อง 4 ตัวเพื่อเข้าเล่นกับเพื่อน</p>
              </div>

              {multiplayerError && (
                <div className="clean-error-alert" style={{ margin: 0 }}>
                  ⚠️ {multiplayerError}
                </div>
              )}

              <form onSubmit={handleJoinRoomSubmit} className="join-dedicated-form">
                {/* 1. Name & Avatar */}
                <div className="join-form-group">
                  <label className="join-form-label">
                    <span>ชื่อผู้เล่นของคุณ</span>
                    <span className="join-label-tip">แตะเพื่อเปลี่ยน Avatar หรือกด 🎲 สุ่มชื่อ</span>
                  </label>
                  <div className="profile-compact-bar join-profile-bar">
                    <span
                      className="avatar-preview-badge"
                      title="คลิกเพื่อเปลี่ยน Avatar"
                      onClick={() => {
                        soundFX.playClick();
                        const nextIdx = (AVATARS.indexOf(selectedAvatar) + 1) % AVATARS.length;
                        const nextAv = AVATARS[nextIdx];
                        setSelectedAvatar(nextAv);
                        storageService.setPlayerAvatar(nextAv);
                      }}
                      style={{ cursor: 'pointer' }}
                    >
                      {selectedAvatar}
                    </span>
                    <input
                      type="text"
                      value={playerName}
                      onChange={(e) => {
                        setPlayerName(e.target.value);
                        storageService.setPlayerName(e.target.value);
                      }}
                      placeholder="ใส่ชื่อของคุณ..."
                      maxLength={35}
                      className="clean-name-input"
                      required
                    />
                    <button
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        const newName = getRandomITPlayerName();
                        setPlayerName(newName);
                        storageService.setPlayerName(newName);
                      }}
                      className="btn-random-name"
                      title="สุ่มชื่อ"
                    >
                      <Dice5 size={18} />
                    </button>
                  </div>
                </div>

                {/* 2. Room Code */}
                <div className="join-form-group">
                  <label className="join-form-label">
                    <span>รหัสห้อง (4 ตัวอักษร)</span>
                  </label>
                  <input
                    type="text"
                    value={joinCodeInput}
                    onChange={(e) => setJoinCodeInput(e.target.value.toUpperCase())}
                    placeholder="เช่น 8492 หรือ QFNX"
                    maxLength={8}
                    className="join-code-huge-field"
                    required
                    disabled={isLoading}
                    autoFocus
                  />
                </div>

                {/* 3. Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !joinCodeInput.trim() || !playerName.trim()}
                  className="btn-join-dedicated-submit"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="spinner-small-inline" />
                      <span>{loadingAction || 'กำลังเชื่อมต่อไปยังห้อง...'}</span>
                    </>
                  ) : (
                    <>
                      <span>เข้าห้องเล่นเกม</span>
                      <ArrowRight size={20} />
                    </>
                  )}
                </button>
              </form>

              {onBackToLanding && (
                <button
                  type="button"
                  onClick={() => {
                    soundFX.playClick();
                    onBackToLanding();
                  }}
                  className="btn-join-back-link"
                >
                  <ArrowLeft size={15} />
                  <span>ย้อนกลับหน้าแรก</span>
                </button>
              )}
            </div>
          </div>
        ) : (
          /* 2-Column Dashboard Main Layout for Solo and Create Room */
          <div className="dashboard-body-grid">
            {/* =========================================================
                LEFT COLUMN: Control Hub (Modes, Profile, Game Settings)
               ========================================================= */}
            <aside className="dashboard-left-hub">
              {multiplayerError && (
                <div className="clean-error-alert">
                  ⚠️ {multiplayerError}
                </div>
              )}

              {/* Profile Row (Compact Modern Bar) */}
              <div className="hub-card-section profile-box">
                <div className="profile-compact-bar">
                  <span
                    className="avatar-preview-badge"
                    title="คลิกเพื่อเปลี่ยน Avatar"
                    onClick={() => {
                      soundFX.playClick();
                      const nextIdx = (AVATARS.indexOf(selectedAvatar) + 1) % AVATARS.length;
                      const nextAv = AVATARS[nextIdx];
                      setSelectedAvatar(nextAv);
                      storageService.setPlayerAvatar(nextAv);
                    }}
                    style={{ cursor: 'pointer' }}
                  >
                    {selectedAvatar}
                  </span>
                  <input
                    type="text"
                    value={playerName}
                    onChange={(e) => {
                      setPlayerName(e.target.value);
                      storageService.setPlayerName(e.target.value);
                    }}
                    placeholder="ใส่ชื่อของคุณ..."
                    maxLength={35}
                    className="clean-name-input"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      soundFX.playClick();
                      const newName = getRandomITPlayerName();
                      setPlayerName(newName);
                      storageService.setPlayerName(newName);
                    }}
                    className="btn-random-name"
                    title="สุ่มชื่อ"
                  >
                    <Dice5 size={16} />
                  </button>
                </div>
              </div>

              {/* Answer Mode Selector (Sleek 1-Row Segmented Group) */}
              <div className="hub-card-section hub-answer-mode-section">
                  <span className="hub-section-label">รูปแบบการตอบ:</span>
                  <div className="clean-mode-pills-row">
                    <button
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        setAnswerMode('multiple_choice');
                        storageService.setAnswerMode('multiple_choice');
                        onAnswerModeChange?.('multiple_choice');
                      }}
                      className={`clean-mode-pill ${answerMode === 'multiple_choice' ? 'active' : ''}`}
                    >
                      <span className="pill-title">🔘 4 ตัวเลือก</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        setAnswerMode('text_pure');
                        storageService.setAnswerMode('text_pure');
                        onAnswerModeChange?.('text_pure');
                      }}
                      className={`clean-mode-pill ${answerMode === 'text_pure' ? 'active' : ''}`}
                    >
                      <span className="pill-title">🔤 พิมพ์เอง</span>
                    </button>

                    <button
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        setAnswerMode('autocomplete');
                        storageService.setAnswerMode('autocomplete');
                        onAnswerModeChange?.('autocomplete');
                      }}
                      className={`clean-mode-pill ${answerMode === 'autocomplete' ? 'active' : ''}`}
                    >
                      <span className="pill-title">💡 มีตัวช่วย</span>
                    </button>
                  </div>
                </div>

                {/* Rounds Selector */}
                <div className="hub-card-section hub-rounds-section">
                  <div className="rounds-header-row">
                    <span className="hub-section-label">จำนวนรอบ:</span>
                    <span className="selected-rounds-display">{roundCount} เพลง</span>
                  </div>
                  <div className="rounds-pill-group">
                    {[5, 10, 15, 20].map((cnt) => (
                      <button
                        key={cnt}
                        type="button"
                        onClick={() => {
                          soundFX.playClick();
                          setRoundCount(cnt);
                          storageService.setTotalRounds(cnt);
                          onTotalRoundsChange?.(cnt);
                        }}
                        className={`round-badge-btn ${roundCount === cnt ? 'active' : ''}`}
                      >
                        {cnt} เพลง
                      </button>
                    ))}
                  </div>
                </div>

                {/* Combined Settings: Round Time Limit Stepper & Auto-Advance */}
                <div className="hub-card-section hub-time-limit-section">
                  <div className="rounds-header-row">
                    <span className="hub-section-label">⏱️ เวลาตอบแต่ละข้อ:</span>
                    <span className="selected-rounds-display">
                      {activeTab === 'create_room'
                        ? `${(!roundTimeLimit || roundTimeLimit === 0) ? 30 : roundTimeLimit} วิ`
                        : (roundTimeLimit === 0 ? '♾️ ไม่จำกัด' : `${roundTimeLimit} วิ`)}
                    </span>
                  </div>
                  <TimeLimitStepper
                    value={activeTab === 'create_room' ? ((!roundTimeLimit || roundTimeLimit === 0) ? 30 : roundTimeLimit) : roundTimeLimit}
                    onChange={onRoundTimeLimitChange}
                    allowUnlimited={activeTab !== 'create_room'}
                  />
                  <div className="auto-advance-row-compact">
                    <span className="hub-sub-label">⏩ เลื่อนข้ออัตโนมัติ</span>
                    <button
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        onAutoAdvanceChange(!autoAdvance);
                      }}
                      className={`toggle-switch-pill ${autoAdvance ? 'enabled' : 'disabled'}`}
                      title={autoAdvance ? 'กดเพื่อปิดการเลื่อนอัตโนมัติ' : 'กดเพื่อเปิดการเลื่อนอัตโนมัติ'}
                    >
                      <span className="toggle-indicator-dot" />
                      <span>{autoAdvance ? 'เปิด' : 'ปิด'}</span>
                    </button>
                  </div>
                </div>

                {/* Solo Play Submit Button in Left Hub */}
                {activeTab === 'solo' && (
                  <button
                    type="button"
                    onClick={() => handleStartSoloGame(effectiveCategory)}
                    disabled={isLoading}
                    className="btn-hero-start-game"
                    id="start-solo-submit-btn"
                  >
                    <div className="start-btn-title">
                      {isLoading ? (
                        <>
                          <Loader2 size={18} className="spinner-small-inline white" />
                          <span>กำลังเริ่มเกม...</span>
                        </>
                      ) : (
                        <>
                          <Play size={18} fill="currentColor" />
                          <span>เริ่มเล่นเกม</span>
                        </>
                      )}
                    </div>
                    <span className="start-btn-sub-category">
                      {effectiveCategory.thaiName}
                    </span>
                  </button>
                )}

                {/* Create Room Submit Button in Left Hub */}
                {activeTab === 'create_room' && (
                  <button
                    type="button"
                    onClick={handleCreateRoomSubmit}
                    disabled={isLoading}
                    className="btn-hero-start-game green-theme"
                    id="create-room-submit-btn"
                  >
                    <div className="start-btn-title">
                      {isLoading ? (
                        <>
                          <Loader2 size={18} className="spinner-small-inline white" />
                          <span>กำลังสร้างห้อง...</span>
                        </>
                      ) : (
                        <>
                          <Users size={18} />
                          <span>สร้างห้องออนไลน์</span>
                        </>
                      )}
                    </div>
                    <span className="start-btn-sub-category">
                      {effectiveCategory.thaiName}
                    </span>
                  </button>
                )}
            </aside>

          {/* =========================================================
              RIGHT COLUMN: Main Showcase (Hero Studio + Category Cards)
             ========================================================= */}
          <main className="dashboard-right-showcase">
            {/* SongDraft 1v1 Duel Feature Banner */}
            {onStartSoloDraft && (
              <section className="song-draft-hero-card">
                <div className="hero-draft-content">
                  <div className="hero-draft-text">
                    <div className="hero-draft-title-row">
                      <div className="hero-draft-icon-wrap">
                        <Swords size={16} />
                      </div>
                      <h3 className="hero-draft-title">
                        <span>โหมดใหม่! SongDraft 1v1 Duel (Pick & Ban)</span>
                        <span className="hero-draft-badge">HOT</span>
                      </h3>
                    </div>
                    <p className="hero-draft-desc">
                      เลือก 5 ศิลปินลับๆ • ล็อคคู่ถ้าใจตรงกัน • แบนฝ่ายตรงข้าม 2 คน แล้วมาแข่งดวล 1v1!
                    </p>
                  </div>

                  <div className="hero-draft-actions">
                    <button
                      type="button"
                      onClick={() => {
                        soundFX.playVersus();
                        onStartSoloDraft();
                      }}
                      className="btn-open-song-draft"
                      title="เริ่มเล่นโหมดดวลกับ AI"
                    >
                      <Swords size={15} />
                      <span>ลองดวลกับ AI (ซ้อมมือ)</span>
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Global Artist Studio Hero Card (Compact & Modern) */}
            <section className="global-studio-hero-card">
              <div className="hero-studio-content">
                <div className="hero-studio-text">
                  <div className="hero-studio-title-row">
                    <span className="hero-studio-emoji">🎨</span>
                    <h3 className="hero-studio-title">Global Artist Studio</h3>
                  </div>
                  <p className="hero-studio-desc">
                    {customSelectedArtists.length > 0 ? (
                      <>
                        เลือกไว้ <strong className="hero-highlight">{customSelectedArtists.length} ศิลปิน</strong>:{' '}
                        {customSelectedArtists.slice(0, 3).join(', ')}
                        {customSelectedArtists.length > 3 ? ` +อีก ${customSelectedArtists.length - 3} คน` : ''}
                      </>
                    ) : (
                      'เลือกและจัดชุดศิลปินที่ชอบได้ตามต้องการ'
                    )}
                  </p>
                </div>

                <div className="hero-studio-actions">
                  <button
                    type="button"
                    onClick={() => handleOpenGlobalPicker()}
                    className="btn-open-global-studio"
                  >
                    <SlidersHorizontal size={15} />
                    <span>
                      {customSelectedArtists.length > 0
                        ? `แก้ไข (${customSelectedArtists.length})`
                        : `เลือกศิลปิน`}
                    </span>
                  </button>

                  {customSelectedArtists.length > 0 && (
                    <button
                      type="button"
                      onClick={() => {
                        soundFX.playClick();
                        if (activeTab === 'solo') {
                          handleStartSoloGame(effectiveCategory);
                        }
                      }}
                      className="btn-hero-play-direct"
                    >
                      <Play size={15} fill="currentColor" />
                      <span>เล่นกลุ่มนี้</span>
                    </button>
                  )}
                </div>
              </div>
            </section>

            {/* Categories Section Header */}
            <div className="categories-header-row">
              <div className="categories-title-group">
                <div className="cat-title-inline">
                  <h3 className="categories-title">
                    {activeTab === 'create_room' ? 'หมวดหมู่เพลงสำหรับห้อง' : 'หมวดหมู่เพลงฮิต'}
                  </h3>
                  <span className="cat-count-badge">{filteredCategoryOptions.length} หมวด</span>
                </div>
              </div>
            </div>

            {/* Region Filter Chips Row (Single Clean Toolbar) */}
            <div className="lobby-region-chips-row">
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setRegionFilter('all');
                }}
                className={`region-pill-btn ${regionFilter === 'all' ? 'active' : ''}`}
              >
                ทั้งหมด
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setRegionFilter('thai');
                }}
                className={`region-pill-btn ${regionFilter === 'thai' ? 'active' : ''}`}
              >
                <span className="region-code-badge">TH</span> เพลงไทย
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setRegionFilter('inter');
                }}
                className={`region-pill-btn ${regionFilter === 'inter' ? 'active' : ''}`}
              >
                <span className="region-dot-green">🟢</span> สากล
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setRegionFilter('kpop');
                }}
                className={`region-pill-btn ${regionFilter === 'kpop' ? 'active' : ''}`}
              >
                <span className="region-code-badge blue">KR</span> K-POP
              </button>
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  setRegionFilter('anime_jpop');
                }}
                className={`region-pill-btn ${regionFilter === 'anime_jpop' ? 'active' : ''}`}
              >
                🎌 Anime & J-POP
              </button>
            </div>

            {/* Category Grid (Clean 2-Column Grid) */}
            <div className="clean-category-grid">
              {filteredCategoryOptions.map((item) => {
                const isSelected = selectedCategoryId === item.id && !customCat;

                return (
                  <div
                    key={item.id}
                    onClick={() => handleSelectCategory(item)}
                    className={`clean-cat-card ${isSelected ? 'active' : ''}`}
                    role="button"
                    tabIndex={0}
                  >
                    <div className="cat-card-header">
                      <span className="cat-icon">{item.emoji}</span>
                      <div className="cat-card-badge-wrap">
                        <span className="cat-tag-pill">
                          {item.badge}
                        </span>
                        {isSelected && (
                          <span className="cat-selected-pill">✓ เลือกอยู่</span>
                        )}
                      </div>
                    </div>

                    <div className="cat-card-content">
                      <h4 className="cat-name" title={item.thaiName}>{item.thaiName}</h4>
                      <p className="cat-subtext" title={item.description}>
                        {item.description}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </main>
        </div>
      )}

        {/* Fullscreen Loading Modal Overlay */}
        {isLoading && (
          <div className="fullscreen-loading-modal-overlay">
            <div className="fullscreen-loading-card">
              <div className="spinning-disc-wrap">
                <Disc size={52} className="spinning-disc-icon" />
              </div>
              <h3 className="loading-card-title">
                {loadingAction || (
                  activeTab === 'join_room'
                    ? 'กำลังเชื่อมต่อไปยังห้อง...'
                    : activeTab === 'create_room'
                    ? 'กำลังเปิดห้องออนไลน์...'
                    : 'กำลังจัดเตรียมเพลงสำหรับเริ่มเกม...'
                )}
              </h3>
              <p className="loading-card-subtitle">
                {activeTab === 'join_room'
                  ? 'กำลังซิงค์ข้อมูลกับห้อง กรุณารอสักครู่'
                  : activeTab === 'create_room'
                  ? 'กำลังเปิดเซิร์ฟเวอร์ห้องและจัดเตรียมห้องเล่นสด'
                  : 'กำลังดึงเพลงคุณภาพสูงจากคลังเพลงสตรีมมิ่ง'}
              </p>
              <div className="loading-bar-track">
                <div className="loading-bar-fill" />
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Global Artist Multi-Select Studio Modal */}
      {showGlobalPicker && (
        <GlobalArtistPickerModal
          initialSelected={customSelectedArtists}
          presetRegion={pickerPresetRegion}
          onConfirm={handleConfirmGlobalArtists}
          onClose={() => setShowGlobalPicker(false)}
        />
      )}
    </div>
  );
};
