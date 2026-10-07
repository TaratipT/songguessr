import React, { useState, useEffect, useMemo, useRef } from 'react';
import {
  Swords,
  Shield,
  Sparkles,
  Flame,
  Check,
  X,
  Search,
  Dice5,
  Lock,
  Clock,
  Ban,
  HelpCircle,
  ArrowLeft
} from 'lucide-react';
import type { SongDraftState, SongDraftPhase } from '../types';
import { GLOBAL_ARTISTS, getArtistAliases, type GlobalArtist, type ArtistRegion } from '../data/artistsData';
import { soundFX } from '../services/soundEffects';
import './SongDraftArena.css';

interface SongDraftArenaProps {
  draftState: SongDraftState;
  myPlayerId: string;
  isHost?: boolean;
  onDraftPhaseChange?: (phase: SongDraftPhase) => void;
  onSendPickProgress: (pickedCount: number, isLocked: boolean) => void;
  onSendSubmitPicks: (picks: string[]) => void;
  onSendBanProgress: (bannedCount: number, isBanLocked: boolean) => void;
  onSendSubmitBans: (bans: string[]) => void;
  onCompleteDraft: (
    survivingArtists: string[],
    rosterDetails?: {
      redSurviving: string[];
      blueSurviving: string[];
      autoMatched: string[];
    }
  ) => void;
  onExitDraft?: () => void;
}

const PHASE_ORDER: Record<SongDraftPhase, number> = {
  secret_pick: 0,
  reveal: 1,
  ban_phase: 2,
  battle_roster: 3,
  completed: 4
};

const REGION_SECTIONS: { key: ArtistRegion; title: string; sub: string; icon: string }[] = [
  { key: 'thai', title: 'เพลงไทย (Thai Music)', sub: 'ศิลปินไทยยอดนิยม & เพลงฮิตตลอดกาล', icon: '🇹🇭' },
  { key: 'inter', title: 'เพลงสากล / อังกฤษ (International)', sub: 'Global Billboard Hits & World Pop / Rock Stars', icon: '🌐' },
  { key: 'kpop', title: 'เพลงเกาหลี (K-POP)', sub: 'ไอดอลเกาหลี บอยแบนด์ เกิร์ลกรุ๊ป & OST ซีรีส์', icon: '🇰🇷' },
  { key: 'anime_jpop', title: 'เพลงญี่ปุ่น & อนิเมะ (Anime & J-POP)', sub: 'เพลงประกอบอนิเมะ, J-Rock, City Pop & Vocaloid', icon: '🎌' }
];

export const SongDraftArena: React.FC<SongDraftArenaProps> = ({
  draftState,
  myPlayerId,
  isHost = false,
  onDraftPhaseChange,
  onSendPickProgress,
  onSendSubmitPicks,
  onSendBanProgress,
  onSendSubmitBans,
  onCompleteDraft,
  onExitDraft
}) => {
  // Determine which corner the local player belongs to
  const myCorner: 'red' | 'blue' = useMemo(() => {
    if (draftState.bluePlayer.playerId === myPlayerId) return 'blue';
    return 'red';
  }, [draftState.bluePlayer.playerId, myPlayerId]);

  const opponentCorner: 'red' | 'blue' = myCorner === 'red' ? 'blue' : 'red';
  const myData = myCorner === 'red' ? draftState.redPlayer : draftState.bluePlayer;
  const opponentData = opponentCorner === 'red' ? draftState.redPlayer : draftState.bluePlayer;

  // Local draft phase & state
  const [phase, setPhase] = useState<SongDraftPhase>(draftState.phase || 'secret_pick');
  const [timerSeconds, setTimerSeconds] = useState<number>(45);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [regionFilter, setRegionFilter] = useState<ArtistRegion | 'all'>('all');

  // Local selections
  const [myPicks, setMyPicks] = useState<string[]>(myData.picks || []);
  const myPicksRef = useRef<string[]>(myData.picks || []);
  useEffect(() => {
    myPicksRef.current = myPicks;
  }, [myPicks]);
  const [isMyPickLocked, setIsMyPickLocked] = useState<boolean>(myData.isLocked || false);
  const [myBans, setMyBans] = useState<string[]>(myData.bans || []);
  const [isMyBanLocked, setIsMyBanLocked] = useState<boolean>(myData.isBanLocked || false);

  // Sync from props if state changes remotely
  const [opponentPickCount, setOpponentPickCount] = useState<number>(opponentData.pickedCount || 0);
  const [isOpponentPickLocked, setIsOpponentPickLocked] = useState<boolean>(opponentData.isLocked || false);
  const [opponentPicksRevealed, setOpponentPicksRevealed] = useState<string[]>(opponentData.picks || []);
  const [autoMatched, setAutoMatched] = useState<string[]>(draftState.autoMatchedArtists || []);
  const [opponentBans, setOpponentBans] = useState<string[]>(opponentData.bans || []);
  const [isOpponentBanLocked, setIsOpponentBanLocked] = useState<boolean>(opponentData.isBanLocked || false);

  // AI bot handling if solo mode
  const isAiOpponent = Boolean(draftState.isAiOpponent || draftState.bluePlayer.playerId === 'ai_bot');
  const aiPicksRef = useRef<string[]>([]);
  const aiBansRef = useRef<string[]>([]);

  // Fast artist lookup
  const artistMap = useMemo(() => {
    const map = new Map<string, GlobalArtist>();
    for (const a of GLOBAL_ARTISTS) {
      map.set(a.name.toLowerCase().trim(), a);
    }
    return map;
  }, []);

  // Set of all banned artist names (normalized lowercase) across all sources
  const allBannedNamesSet = useMemo(() => {
    const raw = [
      ...myBans,
      ...opponentBans,
      ...(draftState.redPlayer?.bans || []),
      ...(draftState.bluePlayer?.bans || []),
      ...(isAiOpponent ? aiBansRef.current : [])
    ];
    return new Set(raw.map((b) => b.trim().toLowerCase()).filter(Boolean));
  }, [myBans, opponentBans, draftState.redPlayer?.bans, draftState.bluePlayer?.bans, isAiOpponent]);

  // Filtered artists for selection drawer
  const filteredArtists = useMemo(() => {
    let list = GLOBAL_ARTISTS;
    if (regionFilter !== 'all') {
      list = list.filter((a) => a.region === regionFilter);
    }
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      list = list.filter((a) => {
        if (a.name.toLowerCase().includes(q)) return true;
        if (a.genreLabel && a.genreLabel.toLowerCase().includes(q)) return true;
        if (a.hitsHint && a.hitsHint.toLowerCase().includes(q)) return true;
        const aliases = getArtistAliases(a.name);
        return aliases.some((al) => al.toLowerCase().includes(q));
      });
    }
    return list;
  }, [regionFilter, searchQuery]);

  // Synchronize when remote draftState changes (Multiplayer only)
  useEffect(() => {
    if (isAiOpponent) return;

    if (draftState.phase && PHASE_ORDER[draftState.phase] > PHASE_ORDER[phase]) {
      setPhase(draftState.phase);
    }
    if (draftState.autoMatchedArtists && draftState.autoMatchedArtists.length > 0) {
      setAutoMatched(draftState.autoMatchedArtists);
    }
    const opp = opponentCorner === 'red' ? draftState.redPlayer : draftState.bluePlayer;
    setOpponentPickCount(opp.pickedCount);
    setIsOpponentPickLocked(opp.isLocked);
    if (opp.picks && opp.picks.length > 0) {
      setOpponentPicksRevealed(opp.picks);
    }
    if (opp.bans && opp.bans.length > 0) {
      setOpponentBans(opp.bans);
    }
    setIsOpponentBanLocked(opp.isBanLocked);
  }, [
    isAiOpponent,
    draftState,
    phase,
    opponentCorner
  ]);

  // Play introductory versus sound on mount
  useEffect(() => {
    soundFX.playVersus();
  }, []);

  // Initialize AI Bot picks if playing vs Bot
  useEffect(() => {
    if (isAiOpponent && aiPicksRef.current.length === 0) {
      // Pick 5 random popular artists
      const shuffled = [...GLOBAL_ARTISTS].sort(() => Math.random() - 0.5);
      const chosen = shuffled.slice(0, 5).map((a) => a.name);
      aiPicksRef.current = chosen;

      // Simulate AI bot progressive picking
      const interval = setInterval(() => {
        setOpponentPickCount((prev) => {
          const next = prev + 1;
          if (next >= 5) {
            setIsOpponentPickLocked(true);
            clearInterval(interval);
            return 5;
          }
          return next;
        });
      }, 1100);

      return () => clearInterval(interval);
    }
  }, [isAiOpponent]);

  // -------------------------------------------------------------
  // Phase 1: Secret Pick Timer (60s - 1 minute)
  // -------------------------------------------------------------
  useEffect(() => {
    if (phase !== 'secret_pick') return;
    setTimerSeconds(60);

    const timer = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          // Auto-fill and auto-lock if time runs out, preserving chosen picks!
          handleAutoLockPicks();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  // Auto-fill remaining picks and lock in (Preserves user's manual picks)
  const handleAutoLockPicks = () => {
    const current = [...myPicksRef.current];
    let finalPicks = current;
    if (current.length < 5) {
      const remainingNeed = 5 - current.length;
      // Filter candidates ensuring none of the already picked artists are picked again (case-insensitive)
      const candidates = GLOBAL_ARTISTS.filter(
        (a) => !current.some((c) => c.toLowerCase().trim() === a.name.toLowerCase().trim())
      );
      const shuffled = candidates.sort(() => Math.random() - 0.5).slice(0, remainingNeed);
      const added = shuffled.map((a) => a.name);
      finalPicks = [...current, ...added];
    }
    setMyPicks(finalPicks);
    myPicksRef.current = finalPicks;
    setIsMyPickLocked(true);
    soundFX.playLockIn();
    onSendSubmitPicks(finalPicks);

    // If vs AI bot, bot locks immediately
    if (isAiOpponent) {
      if (aiPicksRef.current.length === 0) {
        const shuffled = [...GLOBAL_ARTISTS].sort(() => Math.random() - 0.5);
        aiPicksRef.current = shuffled.slice(0, 5).map((a) => a.name);
      }
      setIsOpponentPickLocked(true);
      setOpponentPickCount(5);
      triggerRevealPhase(finalPicks, aiPicksRef.current);
    }
  };

  // Manual Pick / Remove
  const handleTogglePick = (artistName: string) => {
    if (isMyPickLocked || phase !== 'secret_pick') return;

    if (myPicks.includes(artistName)) {
      soundFX.playClick();
      const next = myPicks.filter((a) => a !== artistName);
      setMyPicks(next);
      myPicksRef.current = next;
      onSendPickProgress(next.length, false);
    } else {
      if (myPicks.length >= 5) {
        soundFX.playWrong();
        return;
      }
      soundFX.playClick();
      const next = [...myPicks, artistName];
      setMyPicks(next);
      myPicksRef.current = next;
      onSendPickProgress(next.length, false);
    }
  };

  const handleRandomFillPicks = () => {
    soundFX.playClick();
    if (isMyPickLocked || phase !== 'secret_pick') return;
    const current = [...myPicksRef.current];
    const needed = 5 - current.length;
    if (needed <= 0) return;

    const candidates = GLOBAL_ARTISTS.filter(
      (a) => !current.some((c) => c.toLowerCase().trim() === a.name.toLowerCase().trim())
    );
    const randomPicks = candidates.sort(() => Math.random() - 0.5).slice(0, needed).map((a) => a.name);
    const result = [...current, ...randomPicks];
    setMyPicks(result);
    myPicksRef.current = result;
    onSendPickProgress(result.length, false);
  };

  const handleConfirmLockPicks = () => {
    if (myPicks.length < 5) return;
    soundFX.playLockIn();
    setIsMyPickLocked(true);
    onSendSubmitPicks(myPicks);

    if (isAiOpponent) {
      if (aiPicksRef.current.length === 0) {
        const shuffled = [...GLOBAL_ARTISTS].sort(() => Math.random() - 0.5);
        aiPicksRef.current = shuffled.slice(0, 5).map((a) => a.name);
      }
      setIsOpponentPickLocked(true);
      setOpponentPickCount(5);
      triggerRevealPhase(myPicks, aiPicksRef.current);
    }
  };

  // Trigger Phase 1.5 (Reveal)
  const triggerRevealPhase = (userPicks: string[], botPicks: string[]) => {
    const red = myCorner === 'red' ? userPicks : botPicks;
    const blue = myCorner === 'blue' ? userPicks : botPicks;
    const matched = red.filter((r) => blue.some((b) => b.toLowerCase().trim() === r.toLowerCase().trim()));

    setPhase('reveal');
    onDraftPhaseChange?.('reveal');
    setAutoMatched(matched);
    setOpponentPicksRevealed(botPicks);

    soundFX.playCardFlip();
    if (matched.length > 0) {
      setTimeout(() => soundFX.playAutoMatch(), 400);
    }
  };

  // Reveal countdown effect (transitions to ban_phase)
  useEffect(() => {
    if (phase !== 'reveal') return;

    soundFX.playCardFlip();
    if (autoMatched.length > 0) {
      setTimeout(() => soundFX.playAutoMatch(), 400);
    }

    const t = setTimeout(() => {
      setPhase('ban_phase');
      onDraftPhaseChange?.('ban_phase');
      soundFX.playVersus();
    }, 3500);

    return () => clearTimeout(t);
  }, [phase]);

  // -------------------------------------------------------------
  // Phase 2: Ban Phase Timer (30s)
  // -------------------------------------------------------------
  useEffect(() => {
    if (phase !== 'ban_phase') return;
    setTimerSeconds(30);

    const timer = setInterval(() => {
      setTimerSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          handleAutoLockBans();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phase]);

  // Toggle Ban on Opponent's Pick
  const handleToggleBan = (artistName: string) => {
    if (isMyBanLocked || phase !== 'ban_phase') return;
    // Cannot ban auto-matched artists!
    if (autoMatched.some((m) => m.toLowerCase().trim() === artistName.toLowerCase().trim())) {
      soundFX.playWrong();
      return;
    }

    if (myBans.includes(artistName)) {
      soundFX.playClick();
      const next = myBans.filter((a) => a !== artistName);
      setMyBans(next);
      onSendBanProgress(next.length, false);
    } else {
      if (myBans.length >= 1) {
        soundFX.playWrong();
        return;
      }
      soundFX.playSlash();
      const next = [...myBans, artistName];
      setMyBans(next);
      onSendBanProgress(next.length, false);
    }
  };

  const handleAutoLockBans = () => {
    // สละสิทธิ์การแบนที่เหลือ: ล็อคเฉพาะที่เลือกไว้จริง ไม่สุ่มแบนมั่วให้
    soundFX.playLockIn();
    setIsMyBanLocked(true);
    onSendSubmitBans(myBans);

    if (isAiOpponent) {
      // AI bans up to 1 of player's picks
      const userBannable = myPicks.filter(
        (a) => !autoMatched.some((m) => m.toLowerCase().trim() === a.toLowerCase().trim())
      );
      const aiBanned = [...userBannable].sort(() => Math.random() - 0.5).slice(0, 1);
      aiBansRef.current = aiBanned;
      setOpponentBans(aiBanned);
      setIsOpponentBanLocked(true);

      triggerBattleRosterPhase(myPicks, aiPicksRef.current, myBans, aiBanned, autoMatched);
    }
  };

  const handleConfirmLockBans = () => {
    soundFX.playLockIn();
    setIsMyBanLocked(true);
    onSendSubmitBans(myBans);

    if (isAiOpponent) {
      const userBannable = myPicks.filter(
        (a) => !autoMatched.some((m) => m.toLowerCase().trim() === a.toLowerCase().trim())
      );
      const aiBanned = [...userBannable].sort(() => Math.random() - 0.5).slice(0, 1);
      aiBansRef.current = aiBanned;
      setOpponentBans(aiBanned);
      setIsOpponentBanLocked(true);

      triggerBattleRosterPhase(myPicks, aiPicksRef.current, myBans, aiBanned, autoMatched);
    }
  };

  // Transition to Phase 3 (Battle Roster)
  const triggerBattleRosterPhase = (
    _uPicks: string[],
    _oppPicks: string[],
    _uBans: string[],
    _oppBans: string[],
    _matched: string[]
  ) => {
    setPhase('battle_roster');
    onDraftPhaseChange?.('battle_roster');
    soundFX.playVersus();
  };

  // Trigger draft completion from Battle Roster screen after preview
  useEffect(() => {
    if (phase !== 'battle_roster') return;

    // Only host (multiplayer) or solo player initiates song preparation
    if (isAiOpponent || isHost) {
      const redPicks = isAiOpponent ? (myCorner === 'red' ? myPicks : aiPicksRef.current) : (draftState.redPlayer.picks || []);
      const bluePicks = isAiOpponent ? (myCorner === 'blue' ? myPicks : aiPicksRef.current) : (draftState.bluePlayer.picks || []);

      const allBansRaw = [
        ...myBans,
        ...opponentBans,
        ...(draftState.redPlayer?.bans || []),
        ...(draftState.bluePlayer?.bans || []),
        ...(isAiOpponent ? aiBansRef.current : [])
      ];
      const bannedSet = new Set(allBansRaw.map((b) => b.trim().toLowerCase()).filter(Boolean));
      const isArtistBanned = (name: string) => bannedSet.has(name.trim().toLowerCase());

      const redSurv = redPicks.filter((p) => !isArtistBanned(p));
      const blueSurv = bluePicks.filter((p) => !isArtistBanned(p));
      const surviving = Array.from(new Set([...redSurv, ...blueSurv, ...autoMatched]))
        .filter((p) => !isArtistBanned(p));

      const t = setTimeout(() => {
        onCompleteDraft(
          surviving.length > 0 ? surviving : ['Three Man Down', 'Tilly Birds'],
          {
            redSurviving: redSurv,
            blueSurviving: blueSurv,
            autoMatched
          }
        );
      }, 4200);
      return () => clearTimeout(t);
    }
  }, [phase, isAiOpponent, isHost, myPicks, myBans, opponentBans, myCorner, draftState, autoMatched, onCompleteDraft]);

  // Compute surviving lists for display in battle roster
  const survivingPicks = useMemo(() => {
    const redPicks = myCorner === 'red'
      ? myPicks
      : (opponentPicksRevealed.length > 0 ? opponentPicksRevealed : (draftState.redPlayer.picks || []));
    const bluePicks = myCorner === 'blue'
      ? myPicks
      : (opponentPicksRevealed.length > 0 ? opponentPicksRevealed : (draftState.bluePlayer.picks || []));

    const allBansRaw = [
      ...myBans,
      ...opponentBans,
      ...(draftState.redPlayer?.bans || []),
      ...(draftState.bluePlayer?.bans || []),
      ...(isAiOpponent ? aiBansRef.current : [])
    ];
    const bannedSet = new Set(allBansRaw.map((b) => b.trim().toLowerCase()).filter(Boolean));
    const isArtistBanned = (name: string) => bannedSet.has(name.trim().toLowerCase());

    const redSurv = redPicks.filter((p) => !isArtistBanned(p));
    const blueSurv = bluePicks.filter((p) => !isArtistBanned(p));
    const combined = Array.from(new Set([...redSurv, ...blueSurv, ...autoMatched]))
      .filter((p) => !isArtistBanned(p));
    return { redSurv, blueSurv, combined };
  }, [
    myCorner,
    myPicks,
    opponentPicksRevealed,
    myBans,
    opponentBans,
    autoMatched,
    draftState.redPlayer.picks,
    draftState.bluePlayer.picks,
    draftState.redPlayer.bans,
    draftState.bluePlayer.bans,
    isAiOpponent
  ]);

  return (
    <div className="song-draft-arena-overlay">
      <div className="draft-arena-container">
        {/* Top Header & VS Status Bar */}
        <header className="draft-top-bar">
          <div className="draft-brand-group">
            <Swords size={24} className="draft-sword-icon" />
            <div>
              <h2 className="draft-main-title">SONGDRAFT 1v1 DUEL</h2>
              <span className="draft-sub-tag">ระบบดวลเลือก & แบนศิลปินสุดมันส์</span>
            </div>
          </div>

          {/* Phase Badge & Timer */}
          <div className="draft-phase-tracker">
            <div className={`phase-pill ${phase === 'secret_pick' ? 'active' : 'done'}`}>
              <Lock size={12} />
              <span>1. เลือก 5 ศิลปิน</span>
            </div>
            <div className={`phase-pill ${phase === 'reveal' ? 'active' : phase === 'ban_phase' || phase === 'battle_roster' ? 'done' : ''}`}>
              <Sparkles size={12} />
              <span>2. เผยการ์ด</span>
            </div>
            <div className={`phase-pill ${phase === 'ban_phase' ? 'active' : phase === 'battle_roster' ? 'done' : ''}`}>
              <Ban size={12} />
              <span>3. แบน 2 ศิลปิน</span>
            </div>
            <div className={`phase-pill ${phase === 'battle_roster' ? 'active' : ''}`}>
              <Flame size={12} />
              <span>4. สรุปสมรภูมิ</span>
            </div>

            {/* Countdown Badge */}
            {(phase === 'secret_pick' || phase === 'ban_phase') && (
              <div className={`draft-timer-bubble ${timerSeconds <= 7 ? 'danger' : ''}`}>
                <Clock size={14} className="timer-tick-icon" />
                <span>{timerSeconds}s</span>
              </div>
            )}
          </div>

          {onExitDraft && (
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                onExitDraft();
              }}
              className="btn-draft-back"
              title="ย้อนกลับ / ออกจากโหมดดวล"
            >
              <ArrowLeft size={16} />
              <span>ย้อนกลับ</span>
            </button>
          )}
        </header>

        {/* ========================================================= */}
        {/* PROMINENT COUNTDOWN TIMER BAR (User requested!)           */}
        {/* ========================================================= */}
        {(phase === 'secret_pick' || phase === 'ban_phase') && (
          <div className={`draft-prominent-timer-strip ${timerSeconds <= 7 ? 'danger-pulse' : timerSeconds <= 12 ? 'warning-glow' : ''}`}>
            <div className="timer-strip-header">
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                {onExitDraft && (
                  <button
                    type="button"
                    onClick={() => {
                      soundFX.playClick();
                      onExitDraft();
                    }}
                    className="btn-draft-back"
                    title="ย้อนกลับ / ออกจากโหมดดวล"
                  >
                    <ArrowLeft size={16} />
                    <span>ย้อนกลับ</span>
                  </button>
                )}
                <div className="timer-badge-big">
                  <Clock size={20} className={timerSeconds <= 7 ? 'clock-shake' : 'clock-spin'} />
                  <span className="timer-big-label">
                    เวลาที่เหลือ: <strong className="timer-huge-number">{timerSeconds}</strong> วินาที
                  </span>
                </div>
              </div>
              <div className="timer-phase-hint-box">
                {phase === 'secret_pick' ? (
                  <span>🔒 รอบเลือก 5 ศิลปินของคุณอย่างลับๆ (หมดเวลาจะสุ่มและล็อคอินให้อัตโนมัติ)</span>
                ) : (
                  <span>🚫 รอบแบนศิลปินฝ่ายตรงข้าม (หมดเวลาจะสละสิทธิ์การแบนที่ยังไม่ได้เลือก)</span>
                )}
              </div>
            </div>
            {/* 100% -> 0% Animated Progress Bar */}
            <div className="timer-progress-track">
              <div
                className={`timer-progress-fill ${timerSeconds <= 7 ? 'danger' : timerSeconds <= 12 ? 'warning' : 'safe'}`}
                style={{ width: `${Math.min(100, Math.max(0, (timerSeconds / 30) * 100))}%` }}
              />
            </div>
          </div>
        )}

        {/* ========================================================= */}
        {/* MOBA-STYLE 3-COLUMN LAYOUT                                */}
        {/* Left sidebar: Red picks | Center: Content | Right sidebar: Blue picks */}
        {/* ========================================================= */}
        <section className="draft-moba-layout">

          {/* ===== LEFT SIDEBAR: RED CORNER ===== */}
          <aside className={`moba-sidebar moba-sidebar-red ${myCorner === 'red' ? 'my-side' : 'opponent-side'}`}>
            <div className="sidebar-player-header red">
              <div className="sidebar-avatar-ring red">
                <span className="sidebar-avatar">{draftState.redPlayer.avatar || '👑'}</span>
              </div>
              <div className="sidebar-player-info">
                <div className="sidebar-name-row">
                  <strong className="sidebar-player-name">{draftState.redPlayer.playerName}</strong>
                  {myCorner === 'red' && <span className="my-corner-tag">คุณ</span>}
                </div>
                <span className="sidebar-corner-label red">RED CORNER</span>
              </div>
              <div className="sidebar-status-pill red">
                {phase === 'secret_pick' && (
                  myCorner === 'red' ? (
                    isMyPickLocked ? '🔒' : `${myPicks.length}/5`
                  ) : (
                    isOpponentPickLocked ? '🔒' : `${opponentPickCount}/5`
                  )
                )}
                {phase === 'ban_phase' && (
                  myCorner === 'red' ? (
                    isMyBanLocked ? '🚫' : `แบน ${myBans.length}/1`
                  ) : (
                    isOpponentBanLocked ? '🚫' : '...'
                  )
                )}
                {phase === 'battle_roster' && `⚔️ ${survivingPicks.redSurv.length}`}
              </div>
            </div>

            {/* Red Picks - Vertical Stack */}
            <div className="sidebar-picks-list">
              {Array.from({ length: 5 }).map((_, index) => {
                const isMine = myCorner === 'red';
                const artistName = isMine
                  ? myPicks[index]
                  : (phase !== 'secret_pick' ? (opponentPicksRevealed[index] || draftState.redPlayer.picks?.[index]) : null);
                const hasCard = Boolean(artistName);
                const isAutoMatch = artistName && autoMatched.some((m) => m.toLowerCase().trim() === artistName.toLowerCase().trim());
                const isBanned = Boolean(artistName && allBannedNamesSet.has(artistName.trim().toLowerCase()));
                const artistObj = artistName ? artistMap.get(artistName.toLowerCase().trim()) : null;

                // Mystery slot (opponent during secret pick)
                if (!isMine && phase === 'secret_pick') {
                  const isOpponentSlotFilled = index < opponentPickCount;
                  return (
                    <div
                      key={`red_mystery_${index}`}
                      className={`sidebar-pick-slot mystery-slot ${isOpponentSlotFilled ? 'filled' : 'empty'}`}
                    >
                      <div className="slot-index-num">{index + 1}</div>
                      <div className="slot-mystery-content">
                        {isOpponentSlotFilled ? <Lock size={14} className="mystery-lock-icon" /> : <HelpCircle size={14} />}
                        <span>{isOpponentSlotFilled ? 'เลือกแล้ว' : 'รอเลือก...'}</span>
                      </div>
                    </div>
                  );
                }

                const isSelectedForBan = Boolean(
                  phase === 'ban_phase' &&
                  !isMine &&
                  artistName &&
                  myBans.some((b) => b.trim().toLowerCase() === artistName.trim().toLowerCase())
                );

                return (
                  <div
                    key={`red_pick_${index}`}
                    className={`sidebar-pick-slot ${hasCard ? 'has-pick' : 'empty-pick'} ${
                      isAutoMatch ? 'auto-matched' : ''
                    } ${isBanned ? 'is-banned' : ''} ${
                      phase === 'ban_phase' && !isMine && !isAutoMatch && !isMyBanLocked && hasCard ? 'bannable-target' : ''
                    } ${isSelectedForBan ? 'selected-for-ban' : ''}`}
                    onClick={() => {
                      if (phase === 'ban_phase' && !isMine && artistName) {
                        handleToggleBan(artistName);
                      } else if (phase === 'secret_pick' && isMine && artistName && !isMyPickLocked) {
                        handleTogglePick(artistName);
                      }
                    }}
                  >
                    <div className="slot-index-num">{index + 1}</div>
                    {hasCard ? (
                      <div className="slot-artist-content">
                        <span className="slot-emoji">{artistObj?.emoji || '🎤'}</span>
                        <div className="slot-artist-info">
                          <strong className="slot-artist-name">{artistName}</strong>
                          {artistObj?.genreLabel && (
                            <span className="slot-genre">{artistObj.genreLabel}</span>
                          )}
                        </div>

                        {/* Status badges */}
                        {isAutoMatch && (
                          <div className="slot-badge auto-match-badge" title="ล็อคคู่ใจตรงกัน!">
                            <Shield size={11} />
                          </div>
                        )}
                        {isBanned && (
                          <div className="slot-badge banned-badge">
                            <Ban size={13} />
                          </div>
                        )}
                        {phase === 'ban_phase' && !isMine && artistName && myBans.includes(artistName) && (
                          <div className="slot-badge ban-selected-badge">
                            <Ban size={11} />
                          </div>
                        )}

                        {/* Remove pick button */}
                        {phase === 'secret_pick' && isMine && !isMyPickLocked && (
                          <button
                            type="button"
                            className="slot-remove-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (artistName) handleTogglePick(artistName);
                            }}
                            title="ยกเลิกการเลือก"
                          >
                            <X size={11} />
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="slot-empty-content">
                        <span>{isMine ? 'เลือกศิลปิน' : 'รอเลือก'}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>

          {/* ===== CENTER CONTENT ===== */}
          <div className="moba-center-content">

            {/* Phase 1: Secret Pick Artist Selection Drawer */}
            {phase === 'secret_pick' && (
              <section className="draft-drawer-panel">
                <div className="drawer-header-row">
                  <div className="drawer-title-group">
                    <span className="drawer-title">
                      🎧 ค้นหาและเลือก 5 ศิลปินของคุณ ({myPicks.length}/5) • มีทั้งหมด {filteredArtists.length} คน
                    </span>
                    <span className="drawer-hint">
                      ฝ่ายตรงข้ามจะไม่เห็นว่าคุณเลือกใครจนกว่าจะหมดเวลา • ค้นหาชื่อศิลปิน แนวเพลง หรือเพลงฮิตได้
                    </span>
                  </div>
                </div>

                {/* Filter Bar */}
                <div className="drawer-filter-bar">
                  <div className="drawer-search-box">
                    <Search size={14} className="search-icon-dim" />
                    <input
                      type="text"
                      placeholder="พิมพ์ค้นหาชื่อศิลปิน, แนวเพลง, เพลงฮิต..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="drawer-search-input"
                    />
                    {searchQuery && (
                      <button type="button" onClick={() => setSearchQuery('')} className="btn-clear-search">
                        <X size={12} />
                      </button>
                    )}
                  </div>

                  {/* Region Pills */}
                  <div className="drawer-region-pills">
                    <button
                      type="button"
                      onClick={() => setRegionFilter('all')}
                      className={`pill-btn ${regionFilter === 'all' ? 'active' : ''}`}
                    >
                      ทั้งหมด (449)
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegionFilter('thai')}
                      className={`pill-btn ${regionFilter === 'thai' ? 'active' : ''}`}
                    >
                      🇹🇭 เพลงไทย
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegionFilter('inter')}
                      className={`pill-btn ${regionFilter === 'inter' ? 'active' : ''}`}
                    >
                      🌐 เพลงสากล (อังกฤษ)
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegionFilter('kpop')}
                      className={`pill-btn ${regionFilter === 'kpop' ? 'active' : ''}`}
                    >
                      🇰🇷 เกาหลี (K-POP)
                    </button>
                    <button
                      type="button"
                      onClick={() => setRegionFilter('anime_jpop')}
                      className={`pill-btn ${regionFilter === 'anime_jpop' ? 'active' : ''}`}
                    >
                      🎌 ญี่ปุ่น & อนิเมะ
                    </button>
                  </div>
                </div>

                {/* Artist Selection Sections with Region Grouping */}
                <div className="drawer-sections-scroll">
                  {REGION_SECTIONS.filter((sec) => regionFilter === 'all' || regionFilter === sec.key).map((sec) => {
                    const sectionArtists = filteredArtists.filter((a) => a.region === sec.key);
                    if (sectionArtists.length === 0) return null;

                    return (
                      <div key={sec.key} className="region-section-block">
                        <div className="region-section-header">
                          <div className="region-section-title-group">
                            <span className="region-section-icon">{sec.icon}</span>
                            <h4 className="region-section-heading">{sec.title}</h4>
                            <span className="region-section-count">{sectionArtists.length} คน</span>
                          </div>
                          <span className="region-section-sub">{sec.sub}</span>
                        </div>

                        <div className="drawer-artists-grid">
                          {sectionArtists.map((artist) => {
                            const isSelected = myPicks.includes(artist.name);
                            const isLimitReached = !isSelected && myPicks.length >= 5;

                            return (
                              <div
                                key={artist.id}
                                onClick={() => {
                                  if (!isMyPickLocked && (!isLimitReached || isSelected)) {
                                    handleTogglePick(artist.name);
                                  }
                                }}
                                className={`global-artist-card region-${artist.region} ${isSelected ? 'selected' : ''} ${
                                  isLimitReached || isMyPickLocked ? 'disabled-pick' : ''
                                }`}
                                role="checkbox"
                                aria-checked={isSelected}
                                tabIndex={0}
                                onKeyDown={(e) => {
                                  if (e.key === ' ' || e.key === 'Enter') {
                                    e.preventDefault();
                                    if (!isMyPickLocked && (!isLimitReached || isSelected)) {
                                      handleTogglePick(artist.name);
                                    }
                                  }
                                }}
                                title={
                                  isMyPickLocked
                                    ? 'ล็อคศิลปินแล้ว'
                                    : isLimitReached
                                    ? 'เลือกครบ 5 คนแล้ว (แตะคนที่เลือกไว้เพื่อยกเลิก)'
                                    : `เลือก ${artist.name}`
                                }
                              >
                                <div className="global-artist-card-top">
                                  <div className="global-artist-name-wrap">
                                    <span className="artist-emoji">{artist.emoji}</span>
                                    <strong className="artist-name" title={artist.name}>
                                      {artist.name}
                                    </strong>
                                  </div>
                                  <div className={`card-checkbox-circle ${isSelected ? 'checked' : ''}`}>
                                    {isSelected ? <Check size={13} strokeWidth={3} /> : null}
                                  </div>
                                </div>

                                <div className="artist-badge-row">
                                  <span className={`artist-region-tag region-${artist.region}`}>
                                    {artist.region === 'thai'
                                      ? 'TH ไทย'
                                      : artist.region === 'inter'
                                      ? 'EN สากล'
                                      : artist.region === 'kpop'
                                      ? 'KR K-POP'
                                      : 'JP Anime'}
                                  </span>
                                  {artist.genreLabel && (
                                    <span className="artist-genre-tag" title={artist.genreLabel}>
                                      {artist.genreLabel}
                                    </span>
                                  )}
                                </div>
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    );
                  })}

                  {filteredArtists.length === 0 && (
                    <div className="drawer-empty-search">
                      <span>🔍 ไม่พบศิลปินที่ตรงกับคำค้นหา "{searchQuery}"</span>
                    </div>
                  )}
                </div>

                {/* Sticky Bottom Bar: Random Auto-Fill & Lock In */}
                <div className="drawer-bottom-bar">
                  <div className="drawer-pick-progress">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <div
                        key={i}
                        className={`pick-dot ${i < myPicks.length ? 'filled' : 'empty'}`}
                      />
                    ))}
                    <span className="pick-progress-label">{myPicks.length}/5 คน</span>
                  </div>

                  <div className="drawer-action-buttons">
                    {!isMyPickLocked && myPicks.length < 5 && (
                      <button
                        type="button"
                        onClick={handleRandomFillPicks}
                        className="btn-draft-secondary"
                      >
                        <Dice5 size={15} />
                        <span>สุ่มให้ครบ 5 คน</span>
                      </button>
                    )}

                    <button
                      type="button"
                      disabled={myPicks.length < 5 || isMyPickLocked}
                      onClick={handleConfirmLockPicks}
                      className={`btn-draft-lock-in ${isMyPickLocked ? 'locked' : ''}`}
                    >
                      <Lock size={16} />
                      <span>
                        {isMyPickLocked
                          ? '✓ ล็อค 5 ศิลปินแล้ว (รอฝ่ายตรงข้าม)'
                          : `ล็อคอิน 5 ศิลปิน (${myPicks.length}/5)`}
                      </span>
                    </button>
                  </div>
                </div>
              </section>
            )}

            {/* Phase 1.5: The Reveal & Auto-Match Screen */}
            {phase === 'reveal' && (
              <section className="draft-reveal-banner">
                <div className="reveal-badge-header">
                  <Sparkles size={24} className="sparkle-bounce" />
                  <h3>THE REVEAL: เผยการ์ดศิลปินพร้อมกัน!</h3>
                </div>
                {autoMatched.length > 0 ? (
                  <div className="auto-match-alert">
                    <Shield size={20} className="shield-glow" />
                    <div>
                      <strong>✨ ล็อคคู่ใจตรงกัน (AUTO-MATCH): {autoMatched.join(', ')}</strong>
                      <p>ศิลปินเหล่านี้จะได้รับการคุ้มกัน และ <u>ไม่สามารถถูกแบนได้</u> ในรอบถัดไป!</p>
                    </div>
                  </div>
                ) : (
                  <p className="no-match-alert">ทั้งสองฝ่ายเลือกศิลปินไม่ซ้ำกัน เตรียมเข้าสู่รอบแบน 2 คน!</p>
                )}
                <div className="reveal-countdown-bar">
                  <span>กำลังเตรียมเข้าสู่รอบแบน (BAN PHASE) ใน 3 วินาที...</span>
                </div>
              </section>
            )}

            {/* Phase 2: Ban Phase Panel */}
            {phase === 'ban_phase' && (
              <section className="draft-ban-panel">
                <div className="ban-instructions-row">
                  <div className="ban-title-group">
                    <Ban size={22} className="ban-icon-alert" />
                    <div>
                      <h3 className="ban-main-title">
                        รอบแบนศิลปินของฝ่ายตรงข้าม ({myBans.length}/1 คน)
                      </h3>
                      <p className="ban-sub-title">
                        คลิกที่การ์ดของฝ่ายตรงข้ามทางด้านข้างเพื่อแบน 1 ศิลปินที่คุณไม่อยากให้เพลงออก (การ์ดที่มีโล่ AUTO-MATCH ไม่สามารถแบนได้)
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    disabled={isMyBanLocked}
                    onClick={handleConfirmLockBans}
                    className={`btn-confirm-bans ${isMyBanLocked ? 'confirmed' : ''}`}
                  >
                    <Ban size={16} />
                    <span>
                      {isMyBanLocked
                        ? '✓ ยืนยันการแบนแล้ว (รอฝ่ายตรงข้าม)'
                        : myBans.length === 1
                        ? '✓ ยืนยันการแบน (1/1)'
                        : 'สละสิทธิ์การแบน (ไม่แบนใคร)'}
                    </span>
                  </button>
                </div>

                <div className="ban-status-strip">
                  <div className="ban-target-tag">
                    <span>เป้าหมายที่คุณเลือกแบน:</span>
                    <strong>{myBans.length > 0 ? myBans.join(', ') : 'ยังไม่ได้เลือก (คลิกที่การ์ดฝ่ายตรงข้าม)'}</strong>
                  </div>
                </div>
              </section>
            )}

            {/* Phase 3: Final Battle Roster Summary */}
            {phase === 'battle_roster' && (
              <section className="draft-battle-roster-panel">
                <div className="roster-header">
                  <Flame size={24} className="flame-glow" />
                  <h3>BATTLE ROSTER: รายชื่อศิลปินที่รอดสู่สมรภูมิ</h3>
                  <span className="roster-count-badge">รวม {survivingPicks.combined.length} ศิลปิน</span>
                </div>

                <div className="roster-chips-container">
                  {survivingPicks.combined.map((artistName) => {
                    const isAuto = autoMatched.some((m) => m.toLowerCase().trim() === artistName.toLowerCase().trim());
                    const artistObj = artistMap.get(artistName.toLowerCase().trim());
                    return (
                      <div key={artistName} className={`roster-artist-chip ${isAuto ? 'gold-auto' : ''}`}>
                        <span className="chip-emoji">{artistObj?.emoji || '🎵'}</span>
                        <strong className="chip-name">{artistName}</strong>
                        {isAuto && <span className="chip-auto-tag">✨ ล็อคคู่</span>}
                      </div>
                    );
                  })}
                </div>

                <div className="roster-loading-status">
                  <div className="pulsing-spinner" />
                  <span>กำลังดึงเพลงฮิตของศิลปินที่รอดชีวิตเข้าสู่การดวล 1v1...</span>
                </div>
              </section>
            )}
          </div>

          {/* ===== RIGHT SIDEBAR: BLUE CORNER ===== */}
          <aside className={`moba-sidebar moba-sidebar-blue ${myCorner === 'blue' ? 'my-side' : 'opponent-side'}`}>
            <div className="sidebar-player-header blue">
              <div className="sidebar-avatar-ring blue">
                <span className="sidebar-avatar">{draftState.bluePlayer.avatar || '🎧'}</span>
              </div>
              <div className="sidebar-player-info">
                <div className="sidebar-name-row">
                  <strong className="sidebar-player-name">{draftState.bluePlayer.playerName}</strong>
                  {myCorner === 'blue' && <span className="my-corner-tag">คุณ</span>}
                </div>
                <span className="sidebar-corner-label blue">BLUE CORNER</span>
              </div>
              <div className="sidebar-status-pill blue">
                {phase === 'secret_pick' && (
                  myCorner === 'blue' ? (
                    isMyPickLocked ? '🔒' : `${myPicks.length}/5`
                  ) : (
                    isOpponentPickLocked ? '🔒' : `${opponentPickCount}/5`
                  )
                )}
                {phase === 'ban_phase' && (
                  myCorner === 'blue' ? (
                    isMyBanLocked ? '🚫' : `แบน ${myBans.length}/1`
                  ) : (
                    isOpponentBanLocked ? '🚫' : '...'
                  )
                )}
                {phase === 'battle_roster' && `⚔️ ${survivingPicks.blueSurv.length}`}
              </div>
            </div>

            {/* Blue Picks - Vertical Stack */}
            <div className="sidebar-picks-list">
              {Array.from({ length: 5 }).map((_, index) => {
                const isMine = myCorner === 'blue';
                const artistName = isMine
                  ? myPicks[index]
                  : (phase !== 'secret_pick' ? (opponentPicksRevealed[index] || draftState.bluePlayer.picks?.[index]) : null);
                const hasCard = Boolean(artistName);
                const isAutoMatch = artistName && autoMatched.some((m) => m.toLowerCase().trim() === artistName.toLowerCase().trim());
                const isBanned = Boolean(artistName && allBannedNamesSet.has(artistName.trim().toLowerCase()));
                const artistObj = artistName ? artistMap.get(artistName.toLowerCase().trim()) : null;

                // Mystery slot
                if (!isMine && phase === 'secret_pick') {
                  const isOpponentSlotFilled = index < opponentPickCount;
                  return (
                    <div
                      key={`blue_mystery_${index}`}
                      className={`sidebar-pick-slot mystery-slot ${isOpponentSlotFilled ? 'filled' : 'empty'}`}
                    >
                      <div className="slot-index-num">{index + 1}</div>
                      <div className="slot-mystery-content">
                        {isOpponentSlotFilled ? <Lock size={14} className="mystery-lock-icon" /> : <HelpCircle size={14} />}
                        <span>{isOpponentSlotFilled ? 'เลือกแล้ว' : 'รอเลือก...'}</span>
                      </div>
                    </div>
                  );
                }

                const isSelectedForBan = Boolean(
                  phase === 'ban_phase' &&
                  !isMine &&
                  artistName &&
                  myBans.some((b) => b.trim().toLowerCase() === artistName.trim().toLowerCase())
                );

                return (
                  <div
                    key={`blue_pick_${index}`}
                    className={`sidebar-pick-slot ${hasCard ? 'has-pick' : 'empty-pick'} ${
                      isAutoMatch ? 'auto-matched' : ''
                    } ${isBanned ? 'is-banned' : ''} ${
                      phase === 'ban_phase' && !isMine && !isAutoMatch && !isMyBanLocked && hasCard ? 'bannable-target' : ''
                    } ${isSelectedForBan ? 'selected-for-ban' : ''}`}
                    onClick={() => {
                      if (phase === 'ban_phase' && !isMine && artistName) {
                        handleToggleBan(artistName);
                      } else if (phase === 'secret_pick' && isMine && artistName && !isMyPickLocked) {
                        handleTogglePick(artistName);
                      }
                    }}
                  >
                    <div className="slot-index-num">{index + 1}</div>
                    {hasCard ? (
                      <div className="slot-artist-content">
                        <span className="slot-emoji">{artistObj?.emoji || '🎤'}</span>
                        <div className="slot-artist-info">
                          <strong className="slot-artist-name">{artistName}</strong>
                          {artistObj?.genreLabel && (
                            <span className="slot-genre">{artistObj.genreLabel}</span>
                          )}
                        </div>

                        {/* Status badges */}
                        {isAutoMatch && (
                          <div className="slot-badge auto-match-badge" title="ล็อคคู่ใจตรงกัน!">
                            <Shield size={11} />
                          </div>
                        )}
                        {isBanned && (
                          <div className="slot-badge banned-badge">
                            <Ban size={13} />
                          </div>
                        )}
                        {phase === 'ban_phase' && !isMine && artistName && myBans.includes(artistName) && (
                          <div className="slot-badge ban-selected-badge">
                            <Ban size={11} />
                          </div>
                        )}

                        {/* Remove pick button */}
                        {phase === 'secret_pick' && isMine && !isMyPickLocked && (
                          <button
                            type="button"
                            className="slot-remove-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (artistName) handleTogglePick(artistName);
                            }}
                            title="ยกเลิกการเลือก"
                          >
                            <X size={11} />
                          </button>
                        )}
                      </div>
                    ) : (
                      <div className="slot-empty-content">
                        <span>{isMine ? 'เลือกศิลปิน' : 'รอเลือก'}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </aside>

        </section>
      </div>
    </div>
  );
};
