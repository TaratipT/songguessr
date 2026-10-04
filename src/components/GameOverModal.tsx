import React, { useEffect, useState, useRef, useMemo } from 'react';
import confetti from 'canvas-confetti';
import type { RoundResult, Category, PlayerSession } from '../types';
import {
  Trophy,
  Share2,
  RotateCcw,
  Home,
  Check,
  X,
  Sparkles,
  Medal,
  Target,
  Zap,
  Flame,
  Play,
  Pause,
  ExternalLink,
  Download,
  Copy,
  CheckCheck,
  Music2,
  LogOut
} from 'lucide-react';
import { soundFX } from '../services/soundEffects';
import { getThaiTitleTranslation } from '../data/thaiSongTitleAliases';

const formatSeconds = (sec: number | undefined): string => {
  if (typeof sec !== 'number' || sec <= 0) return '1';
  return Number.isInteger(sec) ? sec.toString() : sec.toFixed(1);
};

interface GameOverModalProps {
  score: number;
  totalRounds: number;
  history: RoundResult[];
  category: Category;
  players?: PlayerSession[];
  myPlayerId?: string;
  onPlayAgain: () => void;
  onBackToLobby: () => void;
  onLeaveRoom?: () => void;
}

export const GameOverModal: React.FC<GameOverModalProps> = ({
  score,
  totalRounds,
  history,
  category,
  players = [],
  myPlayerId,
  onPlayAgain,
  onBackToLobby,
  onLeaveRoom
}) => {
  const [copied, setCopied] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);
  const [isGeneratingImage, setIsGeneratingImage] = useState(false);
  const [imageDownloadSuccess, setImageDownloadSuccess] = useState(false);
  const [filterType, setFilterType] = useState<'all' | 'correct' | 'wrong'>('all');
  const [playingSongIndex, setPlayingSongIndex] = useState<number | null>(null);

  const audioRef = useRef<HTMLAudioElement | null>(null);

  const isMultiplayer = players.length > 1;
  const sortedPlayers = useMemo(() => [...players].sort((a, b) => b.score - a.score), [players]);

  const myRank = useMemo(() => {
    if (!myPlayerId || sortedPlayers.length === 0) return null;
    const idx = sortedPlayers.findIndex((p) => p.id === myPlayerId);
    return idx !== -1 ? idx + 1 : null;
  }, [myPlayerId, sortedPlayers]);

  const correctCount = useMemo(() => history.filter((h) => h.guessedCorrectly).length, [history]);
  const wrongCount = history.length - correctCount;
  const maxScore = totalRounds * 100;
  const scorePercentage = Math.round((score / Math.max(1, maxScore)) * 100);
  const accuracyPercentage = Math.round((correctCount / Math.max(1, totalRounds)) * 100);

  // Compute average speed
  const avgTime = useMemo(() => {
    if (history.length === 0) return '0.0';
    const total = history.reduce((sum, h) => sum + (h.timeSpent || 0), 0);
    return (total / history.length).toFixed(1);
  }, [history]);

  // Compute maximum streak
  const maxStreak = useMemo(() => {
    let current = 0;
    let maxS = 0;
    history.forEach((h) => {
      if (h.guessedCorrectly) {
        current++;
        if (current > maxS) maxS = current;
      } else {
        current = 0;
      }
    });
    return maxS;
  }, [history]);

  // Audio snippet playback cleanup
  useEffect(() => {
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, []);

  const handleTogglePlayPreview = (idx: number, previewUrl?: string) => {
    soundFX.playClick();
    if (!previewUrl) return;

    if (playingSongIndex === idx) {
      audioRef.current?.pause();
      setPlayingSongIndex(null);
    } else {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      const audio = new Audio(previewUrl);
      audio.volume = 0.5;
      audio.play().catch(() => {});
      audio.onended = () => setPlayingSongIndex(null);
      audioRef.current = audio;
      setPlayingSongIndex(idx);
    }
  };

  const handleOpenYouTube = (title: string, artist: string) => {
    soundFX.playClick();
    const query = encodeURIComponent(`${title} ${artist}`);
    window.open(`https://www.youtube.com/results?search_query=${query}`, '_blank');
  };

  // Trigger celebratory confetti on mount
  useEffect(() => {
    soundFX.playCorrect();
    try {
      confetti({
        particleCount: 160,
        spread: 100,
        origin: { y: 0.55 },
        colors: ['#ea580c', '#f59e0b', '#3b82f6', '#10b981', '#ec4899']
      });
    } catch {}
  }, []);

  // Compute Rank Badge Details
  const rankInfo = useMemo(() => {
    if (isMultiplayer) {
      const winner = sortedPlayers[0];
      return {
        tier: 'multiplayer',
        title: `🏆 ${winner?.name || 'ผู้ชนะ'} คว้าแชมป์รอบนี้!`,
        desc: `คว้าอันดับ 1 ด้วยคะแนนสูงสุด ${winner?.score || 0} คะแนน`,
        badgeClass: 'badge-gold',
        icon: '👑'
      };
    }
    if (accuracyPercentage >= 80 || scorePercentage >= 80) {
      return {
        tier: 'legend',
        title: 'ระดับหูทองคำในตำนาน! 👑✨',
        desc: 'คุณคือสุดยอดกูรูดนตรีตัวจริง! หูทิพย์ทายแม่นระดับพระกาฬ',
        badgeClass: 'badge-gold',
        icon: '👑'
      };
    }
    if (accuracyPercentage >= 60 || scorePercentage >= 60) {
      return {
        tier: 'master',
        title: 'แฟนพันธุ์แท้เสียงเพลง 🎧🔥',
        desc: 'ความรู้เรื่องเพลงแน่นปึ้ก! จังหวะมาแค่เสี้ยววิก็รู้ทันที',
        badgeClass: 'badge-purple',
        icon: '🎧'
      };
    }
    if (accuracyPercentage >= 40 || scorePercentage >= 40) {
      return {
        tier: 'skilled',
        title: 'นักฟังเพลงตัวยง 🎵⚡',
        desc: 'เซนส์ดนตรียอดเยี่ยม ทายได้เกินครึ่งอย่างมั่นใจ!',
        badgeClass: 'badge-teal',
        icon: '🎵'
      };
    }
    return {
      tier: 'rookie',
      title: 'ผู้เริ่มต้นฟังเพลง 🌱',
      desc: 'เริ่มจับทางได้แล้ว! ลองเล่นอีกสักสองสามรอบรับรองเซียนแน่',
      badgeClass: 'badge-amber',
      icon: '🌱'
    };
  }, [isMultiplayer, accuracyPercentage, scorePercentage, sortedPlayers]);

  // Filtered song recap
  const filteredHistory = useMemo(() => {
    if (filterType === 'correct') return history.filter((h) => h.guessedCorrectly);
    if (filterType === 'wrong') return history.filter((h) => !h.guessedCorrectly);
    return history;
  }, [history, filterType]);

  // Formatted share text (Wordle style)
  const formattedShareText = useMemo(() => {
    if (isMultiplayer) {
      const ranksText = sortedPlayers
        .slice(0, 5)
        .map((p, i) => `${['🥇', '🥈', '🥉', '4️⃣', '5️⃣'][i] || '•'} ${p.name}: ${p.score} คะแนน`)
        .join('\n');
      return `🎵 ผลการแข่งขัน SongGuessr TH (${category.thaiName})\n${ranksText}\nมาประลองความแม่นกันที่ https://songguessr-c21.pages.dev`;
    }

    const emojiBlocks = history
      .map((h) => (h.guessedCorrectly ? '🟩' : '🟥'))
      .join('');

    const modeLabel = category.modeType === 'random'
      ? '🎲 สุ่มอัตโนมัติ'
      : category.modeType === 'preset'
      ? '⚡ จัดชุดด่วน'
      : category.modeType === 'custom' || (category.selectedArtists && category.selectedArtists.length > 0)
      ? '🎨 เลือกศิลปินเอง'
      : category.modeType === 'combined'
      ? '🔀 ผสมหลายหมวด'
      : `🎵 ${category.badge || 'หมวดเพลง'}`;

    return `🎵 SongGuessr TH — ${category.thaiName}
หมวด: ${category.thaiName} (${modeLabel})
${rankInfo.title}
🏆 คะแนนรวม: ${score}/${maxScore} (${correctCount}/${totalRounds} เพลง · แม่นยำ ${accuracyPercentage}%)
⚡ ความเร็วเฉลี่ย: ${avgTime}s | 🔥 คอมโบ: ${maxStreak} เพลง
${emojiBlocks}

ลองมาทายเพลงกันได้ที่: https://songguessr-c21.pages.dev`;
  }, [isMultiplayer, sortedPlayers, category.thaiName, category.modeType, category.badge, category.selectedArtists, history, rankInfo.title, score, maxScore, correctCount, totalRounds, accuracyPercentage, avgTime, maxStreak]);

  // Handle text copy
  const handleCopyShareText = async () => {
    soundFX.playClick();
    if (navigator.clipboard) {
      try {
        await navigator.clipboard.writeText(formattedShareText);
        setCopied(true);
        setTimeout(() => setCopied(false), 3000);
      } catch (err) {
        console.error('Clipboard copy failed:', err);
      }
    }
  };

  // Generate visual scorecard canvas as downloadable image
  const handleDownloadScorecardImage = async () => {
    soundFX.playClick();
    setIsGeneratingImage(true);

    try {
      const canvas = document.createElement('canvas');
      canvas.width = 1080;
      canvas.height = 1080;
      const ctx = canvas.getContext('2d');

      if (!ctx) throw new Error('Canvas not supported');

      // 1. Background Gradient
      const bgGrad = ctx.createLinearGradient(0, 0, 1080, 1080);
      bgGrad.addColorStop(0, '#0f172a');
      bgGrad.addColorStop(0.5, '#1e1b4b');
      bgGrad.addColorStop(1, '#0f172a');
      ctx.fillStyle = bgGrad;
      ctx.fillRect(0, 0, 1080, 1080);

      // Glow Accents
      const glow = ctx.createRadialGradient(540, 260, 40, 540, 260, 480);
      glow.addColorStop(0, 'rgba(234, 88, 12, 0.28)');
      glow.addColorStop(1, 'rgba(234, 88, 12, 0)');
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, 1080, 1080);

      // Outer Border
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 4;
      ctx.strokeRect(32, 32, 1016, 1016);

      // Header Tag: App Title
      ctx.fillStyle = '#ea580c';
      ctx.font = 'bold 32px sans-serif';
      ctx.textAlign = 'center';
      ctx.fillText('🎵 SONGGUESSR THAILAND', 540, 95);

      // Category Subtitle
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 24px sans-serif';
      ctx.fillText(`หมวดหมู่: ${category.thaiName}`, 540, 140);

      // Rank Title
      ctx.fillStyle = '#ffffff';
      ctx.font = 'bold 44px sans-serif';
      ctx.fillText(rankInfo.title, 540, 215);

      // Main Score Big Box
      ctx.fillStyle = 'rgba(255, 255, 255, 0.05)';
      ctx.beginPath();
      ctx.roundRect(140, 260, 800, 200, 20);
      ctx.fill();
      ctx.strokeStyle = 'rgba(234, 88, 12, 0.35)';
      ctx.lineWidth = 2;
      ctx.stroke();

      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 22px sans-serif';
      ctx.fillText('คะแนนรวมของคุณ', 540, 310);

      ctx.fillStyle = '#f97316';
      ctx.font = 'bold 84px sans-serif';
      ctx.fillText(`${score}`, 540, 395);

      ctx.fillStyle = '#94a3b8';
      ctx.font = '500 22px sans-serif';
      ctx.fillText(`จากคะแนนเต็ม ${maxScore} คะแนน`, 540, 435);

      // 3 Mini Stat Boxes
      const statY = 490;
      const boxW = 250;
      const boxH = 120;
      const spacing = 25;
      const startX = (1080 - (boxW * 3 + spacing * 2)) / 2;

      const statData = [
        { label: 'ทายถูกต้อง', val: `${correctCount}/${totalRounds}`, color: '#22c55e' },
        { label: 'ความแม่นยำ', val: `${accuracyPercentage}%`, color: '#38bdf8' },
        { label: 'ความเร็วเฉลี่ย', val: `${avgTime}s`, color: '#fbbf24' }
      ];

      statData.forEach((st, i) => {
        const bx = startX + i * (boxW + spacing);
        ctx.fillStyle = 'rgba(255, 255, 255, 0.04)';
        ctx.beginPath();
        ctx.roundRect(bx, statY, boxW, boxH, 16);
        ctx.fill();
        ctx.strokeStyle = 'rgba(255, 255, 255, 0.08)';
        ctx.stroke();

        ctx.fillStyle = '#94a3b8';
        ctx.font = '500 20px sans-serif';
        ctx.fillText(st.label, bx + boxW / 2, statY + 40);

        ctx.fillStyle = st.color;
        ctx.font = 'bold 40px sans-serif';
        ctx.fillText(st.val, bx + boxW / 2, statY + 90);
      });

      // Emoji Grid Matrix
      const gridY = 655;
      ctx.fillStyle = '#94a3b8';
      ctx.font = '600 22px sans-serif';
      ctx.fillText('ผลการทายแต่ละข้อ:', 540, gridY);

      const cellSize = 54;
      const cellGap = 14;
      const cols = Math.min(10, history.length);
      const gridW = cols * cellSize + (cols - 1) * cellGap;
      const gxStart = 540 - gridW / 2;

      history.forEach((h, i) => {
        const cx = gxStart + (i % cols) * (cellSize + cellGap);
        const cy = gridY + 28 + Math.floor(i / cols) * (cellSize + cellGap);

        ctx.fillStyle = h.guessedCorrectly ? '#16a34a' : '#dc2626';
        ctx.beginPath();
        ctx.roundRect(cx, cy, cellSize, cellSize, 10);
        ctx.fill();

        ctx.fillStyle = '#ffffff';
        ctx.font = 'bold 26px sans-serif';
        ctx.fillText(h.guessedCorrectly ? '✓' : '✕', cx + cellSize / 2, cy + cellSize / 2 + 9);
      });

      // Footer callout
      ctx.fillStyle = '#64748b';
      ctx.font = '500 22px sans-serif';
      ctx.fillText('เล่นเกมทายเพลงฮิตได้ฟรีที่ songguessr-c21.pages.dev', 540, 1010);

      // Trigger download
      const imageUri = canvas.toDataURL('image/png');
      const link = document.createElement('a');
      link.download = `songguessr-score-${Date.now()}.png`;
      link.href = imageUri;
      link.click();

      setImageDownloadSuccess(true);
      setTimeout(() => setImageDownloadSuccess(false), 3500);
    } catch (err) {
      console.error('Image generation error:', err);
    } finally {
      setIsGeneratingImage(false);
    }
  };

  // Handle native Web Share API
  const handleNativeShare = async () => {
    soundFX.playClick();
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'ผลคะแนน SongGuessr TH',
          text: formattedShareText,
          url: 'https://songguessr-c21.pages.dev'
        });
      } catch (err) {
        if ((err as Error).name !== 'AbortError') {
          handleCopyShareText();
        }
      }
    } else {
      handleCopyShareText();
    }
  };

  return (
    <div className="modal-overlay">
      <div className="game-over-card">
        {/* Top Trophy & Rank Badge Header */}
        <div className="game-over-header">
          <div className="trophy-glow-wrapper">
            <div className="trophy-circle">
              <Trophy size={42} className="trophy-svg" />
            </div>
            <div className="trophy-halo-shimmer" />
          </div>

          <div className="game-over-title-group">
            <span className="game-over-tag">
              {isMultiplayer ? 'สรุปผลการแข่งขันออนไลน์' : 'สรุปผลการเล่นจบเกม'}
            </span>
            <h2 className="rank-title">{rankInfo.title}</h2>
            <p className="rank-desc">{rankInfo.desc}</p>
          </div>
        </div>

        {/* 2-Column Main Content Body */}
        <div className="game-over-body-grid">
          {/* LEFT COLUMN: Category, Stats, Action Buttons */}
          <div className="game-over-left-col">
            {/* Category & Mode Summary Card */}
            <div className="game-over-category-card">
              <div className="category-card-top-row">
                <span className="category-card-badge">
                  {category.modeType === 'random'
                    ? '🎲 สุ่มศิลปินอัตโนมัติ'
                    : category.modeType === 'preset'
                    ? '⚡ จัดชุดด่วน'
                    : category.modeType === 'custom' || (category.selectedArtists && category.selectedArtists.length > 0)
                    ? '🎨 เลือกศิลปินเอง'
                    : category.modeType === 'combined'
                    ? '🔀 ผสมหลายหมวด'
                    : category.badge || 'หมวดหลัก'}
                </span>
                {category.selectedArtists && category.selectedArtists.length > 0 && (
                  <span className="category-card-count-pill">
                    {category.selectedArtists.length} ศิลปินในรอบนี้
                  </span>
                )}
              </div>

              <div className="category-card-main">
                <span className="category-card-emoji">{category.emoji || '🎵'}</span>
                <div className="category-card-text">
                  <h3 className="category-card-title">{category.thaiName || category.name}</h3>
                  {category.description && (
                    <p className="category-card-desc">{category.description}</p>
                  )}
                </div>
              </div>

              {category.selectedArtists && category.selectedArtists.length > 0 && (
                <div className="category-artists-tags-wrap">
                  {category.selectedArtists.slice(0, 12).map((artistName, idx) => (
                    <span key={idx} className="category-artist-tag">
                      {artistName}
                    </span>
                  ))}
                  {category.selectedArtists.length > 12 && (
                    <span className="category-artist-tag more-tag">
                      +{category.selectedArtists.length - 12} ศิลปิน
                    </span>
                  )}
                </div>
              )}
            </div>

            {/* MULTIPLAYER PODIUM & PLAYER STATS */}
            {isMultiplayer ? (
              <div className="multiplayer-results-wrap">
                {/* Personal Performance Stats in Multiplayer */}
                <div className="my-perf-stats-card">
                  <div className="my-perf-header">
                    <div className="my-perf-title-row">
                      <Sparkles size={14} className="my-perf-sparkle" />
                      <span className="my-perf-title">สถิติของคุณในรอบนี้</span>
                    </div>
                    {myRank && (
                      <span className={`my-perf-rank-pill rank-${myRank <= 3 ? myRank : 'other'}`}>
                        {myRank === 1 ? '👑 แชมป์รอบนี้' : myRank === 2 ? '🥈 อันดับ 2' : myRank === 3 ? '🥉 อันดับ 3' : `อันดับ #${myRank}`}
                      </span>
                    )}
                  </div>
                  <div className="my-perf-grid">
                    <div className="my-perf-chip">
                      <span className="my-perf-chip-label">🎯 ทายถูก</span>
                      <span className="my-perf-chip-val text-green">{correctCount}/{totalRounds} <small>({accuracyPercentage}%)</small></span>
                    </div>
                    <div className="my-perf-chip">
                      <span className="my-perf-chip-label">⚡ เวลาเฉลี่ย</span>
                      <span className="my-perf-chip-val text-amber">{avgTime}s</span>
                    </div>
                    <div className="my-perf-chip">
                      <span className="my-perf-chip-label">🔥 คอมโบ</span>
                      <span className="my-perf-chip-val text-red">{maxStreak} <small>เพลง</small></span>
                    </div>
                    <div className="my-perf-chip">
                      <span className="my-perf-chip-label">⭐ คะแนน</span>
                      <span className="my-perf-chip-val text-orange">{score.toLocaleString()} <small>pt</small></span>
                    </div>
                  </div>
                </div>

                <div className="podium-section">
                  <div className="podium-section-header">
                    <Trophy size={16} className="podium-header-icon" />
                    <span>อันดับผู้เล่นในห้อง ({sortedPlayers.length} คน)</span>
                  </div>

                  <div className="podium-stage">
                    {/* 2nd Place */}
                    {sortedPlayers[1] && (
                      <div className="podium-pillar rank-2">
                        <div className="podium-player-meta">
                          <span className="podium-avatar">{sortedPlayers[1].avatar || '🎧'}</span>
                          <span className="podium-name" title={sortedPlayers[1].name}>
                            {sortedPlayers[1].name}
                            {sortedPlayers[1].id === myPlayerId && <span className="podium-you-tag"> (คุณ)</span>}
                          </span>
                          <span className="podium-score-pill">{sortedPlayers[1].score.toLocaleString()} pt</span>
                        </div>
                        <div className="podium-block block-2">
                          <Medal size={18} className="silver-medal" />
                          <span className="podium-rank-num">2</span>
                        </div>
                      </div>
                    )}

                    {/* 1st Place */}
                    {sortedPlayers[0] && (
                      <div className="podium-pillar rank-1">
                        <div className="crown-icon">👑</div>
                        <div className="podium-player-meta">
                          <span className="podium-avatar winner-avatar">{sortedPlayers[0].avatar || '👑'}</span>
                          <span className="podium-name winner-name" title={sortedPlayers[0].name}>
                            {sortedPlayers[0].name}
                            {sortedPlayers[0].id === myPlayerId && <span className="podium-you-tag"> (คุณ)</span>}
                          </span>
                          <span className="podium-score-pill winner-score">{sortedPlayers[0].score.toLocaleString()} pt</span>
                        </div>
                        <div className="podium-block block-1">
                          <Trophy size={22} className="gold-cup" />
                          <span className="podium-rank-num">1</span>
                        </div>
                      </div>
                    )}

                    {/* 3rd Place */}
                    {sortedPlayers[2] && (
                      <div className="podium-pillar rank-3">
                        <div className="podium-player-meta">
                          <span className="podium-avatar">{sortedPlayers[2].avatar || '🎧'}</span>
                          <span className="podium-name" title={sortedPlayers[2].name}>
                            {sortedPlayers[2].name}
                            {sortedPlayers[2].id === myPlayerId && <span className="podium-you-tag"> (คุณ)</span>}
                          </span>
                          <span className="podium-score-pill">{sortedPlayers[2].score.toLocaleString()} pt</span>
                        </div>
                        <div className="podium-block block-3">
                          <Medal size={18} className="bronze-medal" />
                          <span className="podium-rank-num">3</span>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* All Players Standings List */}
                  <div className="multiplayer-standings-card">
                    {sortedPlayers.map((p, idx) => {
                      const isMe = p.id === myPlayerId;
                      return (
                        <div
                          key={p.id}
                          className={`standings-item ${idx === 0 ? 'top-winner' : ''} ${isMe ? 'is-current-user' : ''}`}
                        >
                          <div className="standings-left">
                            <span className="standings-rank-badge">
                              {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                            </span>
                            <span className="standings-avatar">{p.avatar || '🎧'}</span>
                            <span className="standings-name" title={p.name}>
                              {p.name}
                              {isMe && <span className="standings-you-badge">คุณ</span>}
                            </span>
                          </div>
                          <div className="standings-right" style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            {p.status === 'ready' ? (
                              <span className="standings-status-pill ready-pill" title="กลับมารอที่ล็อบบี้แล้ว">
                                🟢 ในล็อบบี้
                              </span>
                            ) : (
                              <span className="standings-status-pill viewing-pill" title="กำลังดูสรุปผล">
                                📊 ดูสรุปผล
                              </span>
                            )}
                            <span className="standings-score-val">{p.score.toLocaleString()} pt</span>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              </div>
            ) : (
              /* SOLO MODE: 4 RICH STAT CARDS + RANK CARD */
              <div className="solo-results-wrap">
                <div className="stats-dashboard-grid">
                  {/* Card 1: Score */}
                  <div className="stat-card stat-score">
                    <div className="stat-card-top">
                      <span className="stat-icon-wrapper score-icon">
                        <Trophy size={18} />
                      </span>
                      <span className="stat-label">คะแนนรวม</span>
                    </div>
                    <div className="stat-main-val">
                      <span className="stat-number accent-score">{score.toLocaleString()}</span>
                      <span className="stat-unit">/ {maxScore.toLocaleString()}</span>
                    </div>
                    <div className="stat-progress-bar-wrap">
                      <div
                        className="stat-progress-bar-fill score-bar"
                        style={{ width: `${Math.min(100, scorePercentage)}%` }}
                      />
                    </div>
                  </div>

                  {/* Card 2: Accuracy */}
                  <div className="stat-card stat-accuracy">
                    <div className="stat-card-top">
                      <span className="stat-icon-wrapper accuracy-icon">
                        <Target size={18} />
                      </span>
                      <span className="stat-label">ความแม่นยำ</span>
                    </div>
                    <div className="stat-main-val">
                      <span className="stat-number">{accuracyPercentage}%</span>
                      <span className="stat-unit">({correctCount}/{totalRounds})</span>
                    </div>
                    <div className="stat-progress-bar-wrap">
                      <div
                        className="stat-progress-bar-fill accuracy-bar"
                        style={{ width: `${Math.min(100, accuracyPercentage)}%` }}
                      />
                    </div>
                  </div>

                  {/* Card 3: Speed */}
                  <div className="stat-card stat-speed">
                    <div className="stat-card-top">
                      <span className="stat-icon-wrapper speed-icon">
                        <Zap size={18} />
                      </span>
                      <span className="stat-label">ความเร็วเฉลี่ย</span>
                    </div>
                    <div className="stat-main-val">
                      <span className="stat-number">{avgTime}</span>
                      <span className="stat-unit">วินาที/ข้อ</span>
                    </div>
                    <span className="stat-card-subtext">ทายไวคะแนนยิ่งสูง</span>
                  </div>

                  {/* Card 4: Max Streak */}
                  <div className="stat-card stat-streak">
                    <div className="stat-card-top">
                      <span className="stat-icon-wrapper streak-icon">
                        <Flame size={18} />
                      </span>
                      <span className="stat-label">คอมโบสูงสุด</span>
                    </div>
                    <div className="stat-main-val">
                      <span className="stat-number">{maxStreak}</span>
                      <span className="stat-unit">เพลงติด</span>
                    </div>
                    <span className="stat-card-subtext">ต่อเนื่องไม่มีสะดุด</span>
                  </div>
                </div>

                {/* Solo Rank Evaluation Card */}
                <div className="solo-rank-evaluation-card">
                  <div className="rank-eval-left">
                    <span className="rank-eval-icon">{rankInfo.icon}</span>
                  </div>
                  <div className="rank-eval-body">
                    <span className="rank-eval-title">{rankInfo.title}</span>
                    <span className="rank-eval-desc">{rankInfo.desc}</span>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* RIGHT COLUMN: Round by Round Song Recap Section */}
          <div className="game-over-right-col">
            <div className="history-recap-section">
              <div className="recap-header-row">
                <div className="recap-title-group">
                  <Sparkles size={16} className="recap-sparkle" />
                  <h4>รายชื่อเพลงในรอบนี้:</h4>
                  <span className="recap-total-badge">{history.length} เพลง</span>
                </div>

                {/* Filter Tabs */}
                <div className="recap-filter-tabs">
                  <button
                    type="button"
                    onClick={() => setFilterType('all')}
                    className={`btn-recap-tab ${filterType === 'all' ? 'active' : ''}`}
                  >
                    ทั้งหมด ({history.length})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterType('correct')}
                    className={`btn-recap-tab correct-tab ${filterType === 'correct' ? 'active' : ''}`}
                  >
                    ✓ ถูก ({correctCount})
                  </button>
                  <button
                    type="button"
                    onClick={() => setFilterType('wrong')}
                    className={`btn-recap-tab wrong-tab ${filterType === 'wrong' ? 'active' : ''}`}
                  >
                    ✕ ผิด ({wrongCount})
                  </button>
                </div>
              </div>

              {/* Song Recap Scrollable List */}
              <div className="history-list">
                {filteredHistory.length > 0 ? (
                  filteredHistory.map((item, idx) => {
                    const isPlaying = playingSongIndex === idx;
                    return (
                      <div
                        key={idx}
                        className={`history-item ${item.guessedCorrectly ? 'is-correct' : 'is-wrong'}`}
                      >
                        {/* Status Badge */}
                        <div
                          className={`history-status-icon ${
                            item.guessedCorrectly ? 'icon-bg-green' : 'icon-bg-red'
                          }`}
                        >
                          {item.guessedCorrectly ? (
                            <Check size={16} className="icon-green" strokeWidth={3} />
                          ) : (
                            <X size={16} className="icon-red" strokeWidth={3} />
                          )}
                        </div>

                        {/* Artwork & Playable Preview */}
                        <div
                          className="history-thumb-wrap"
                          onClick={() => handleTogglePlayPreview(idx, item.song.previewUrl)}
                          title={item.song.previewUrl ? 'คลิกเพื่อฟังตัวอย่างเพลง' : undefined}
                        >
                          <img
                            src={
                              item.song.artworkUrl ||
                              'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=120'
                            }
                            alt={item.song.title}
                            className="history-thumb"
                          />
                          {item.song.previewUrl && (
                            <div className={`thumb-play-overlay ${isPlaying ? 'is-playing' : ''}`}>
                              {isPlaying ? <Pause size={14} /> : <Play size={14} />}
                            </div>
                          )}
                        </div>

                        {/* Song Details */}
                        <div className="history-song-meta">
                          <div className="history-title-row">
                            <span className="history-title">{getThaiTitleTranslation(item.song.title, item.song.artist) || item.song.title}</span>
                            {item.song.year && (
                              <span className="history-year-tag">{item.song.year}</span>
                            )}
                          </div>

                          <span className="history-artist">{item.song.artist}</span>

                          {/* Guess vs Answer details */}
                          <div className="history-guess-detail">
                            {item.guessedCorrectly ? (
                              <span className="meta-correct-tag">
                                ⚡ ตอบถูกใน {formatSeconds(item.timeSpent)} วินาที
                              </span>
                            ) : (
                              <span className="meta-wrong-tag">
                                เดา: <strong>"{item.guessedTitle || 'หมดเวลา'}"</strong>
                              </span>
                            )}
                          </div>
                        </div>

                        {/* Points & Interactive Tools */}
                        <div className="history-actions-col">
                          <span className={`history-points ${item.guessedCorrectly ? 'points-plus' : 'points-zero'}`}>
                            +{item.pointsEarned} pt
                          </span>

                          <div className="history-item-buttons">
                            {item.song.previewUrl && (
                              <button
                                type="button"
                                onClick={() => handleTogglePlayPreview(idx, item.song.previewUrl)}
                                className={`btn-preview-listen ${isPlaying ? 'playing' : ''}`}
                                title={isPlaying ? 'หยุดฟัง' : 'ลองฟังตัวอย่าง'}
                              >
                                {isPlaying ? <Pause size={12} /> : <Play size={12} />}
                                <span>{isPlaying ? 'หยุด' : 'ฟัง'}</span>
                              </button>
                            )}

                            <button
                              type="button"
                              onClick={() => handleOpenYouTube(item.song.title, item.song.artist)}
                              className="btn-open-youtube"
                              title="ค้นหาและฟังเพลงเต็มบน YouTube"
                            >
                              <ExternalLink size={12} />
                              <span>YouTube</span>
                            </button>
                          </div>
                        </div>
                      </div>
                    );
                  })
                ) : (
                  <div className="history-empty-filter">
                    <Music2 size={24} className="empty-filter-icon" />
                    <span>ไม่มีรายการเพลงในหมวดตัวกรองนี้</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Multiplayer Lobby Readiness Hint */}
        {players && players.length > 1 && (
          <div className="game-over-multiplayer-status-hint">
            <span>👀 สมาชิกในห้องกลับสู่ล็อบบี้แล้ว {players.filter((p) => p.status === 'ready').length}/{players.length} คน — คุณสามารถดูผลหรือฟังเพลงต่อได้ เมื่อพร้อมแล้วกด <b>"เล่นอีกครั้ง"</b> หรือ <b>"กลับสู่ล็อบบี้"</b></span>
          </div>
        )}

        {/* Full-width Modal Action Footer */}
        <div className="game-over-footer-actions">
          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              setShowShareModal(true);
            }}
            className="action-btn share-btn"
            title="เปิดเมนูแชร์คะแนน & บันทึกรูปภาพ"
          >
            <Share2 size={18} />
            <span>แชร์ผลคะแนน</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onPlayAgain();
            }}
            className="action-btn replay-btn"
          >
            <RotateCcw size={18} />
            <span>เล่นอีกครั้ง</span>
          </button>

          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onBackToLobby();
            }}
            className="action-btn lobby-btn"
          >
            <Home size={18} />
            <span>กลับสู่ล็อบบี้</span>
          </button>

          {onLeaveRoom && (
            <button
              type="button"
              onClick={() => {
                soundFX.playClick();
                if (window.confirm('คุณต้องการออกจากห้องเล่นหลายคนใช่หรือไม่?')) {
                  onLeaveRoom();
                }
              }}
              className="action-btn leave-room-action-btn"
              title="ออกจากห้องนี้"
              style={{
                background: '#fee2e2',
                color: '#dc2626',
                borderColor: '#fca5a5'
              }}
            >
              <LogOut size={18} />
              <span>ออกจากห้อง</span>
            </button>
          )}
        </div>
      </div>

      {/* =========================================================================
          SUPERCHARGED SHARE MODAL (Graphic Card, Wordle Text, PNG Download, Native Share)
          ========================================================================= */}
      {showShareModal && (
        <div className="share-modal-backdrop" onClick={() => setShowShareModal(false)}>
          <div className="share-modal-sheet" onClick={(e) => e.stopPropagation()}>
            <div className="share-sheet-header">
              <div className="share-sheet-title-group">
                <h3 className="share-sheet-title">🌟 แชร์ผลการเล่นของคุณ</h3>
                <p className="share-sheet-desc">อวดความเซียนให้เพื่อนรู้ บันทึกรูป หรือแชร์ลงโซเชียลได้ทันที</p>
              </div>
              <button
                type="button"
                onClick={() => setShowShareModal(false)}
                className="btn-close-share"
                title="ปิดหน้าต่าง"
              >
                <X size={18} />
              </button>
            </div>

            {/* Visual Card Live Preview */}
            <div className="share-card-preview">
              <div className="preview-top-badge">
                <span>🎵 SongGuessr TH · {category.thaiName}</span>
              </div>
              <h4 className="preview-rank-title">{rankInfo.title}</h4>
              <div className="preview-score-box">
                <span className="preview-score-label">คะแนนรวม</span>
                <span className="preview-score-val">{score.toLocaleString()}</span>
                <span className="preview-score-sub">จากเต็ม {maxScore.toLocaleString()} pt</span>
              </div>

              {/* Stats pills */}
              <div className="preview-stats-row">
                <span className="preview-stat-pill">🎯 แม่นยำ {accuracyPercentage}%</span>
                <span className="preview-stat-pill">⚡ เฉลี่ย {avgTime}s</span>
                <span className="preview-stat-pill">🔥 คอมโบ {maxStreak}</span>
              </div>

              {/* Emoji matrix preview */}
              <div className="preview-emoji-matrix">
                {history.map((h, i) => (
                  <span
                    key={i}
                    className={`preview-cell ${h.guessedCorrectly ? 'is-correct' : 'is-wrong'}`}
                  >
                    {h.guessedCorrectly ? '✓' : '✕'}
                  </span>
                ))}
              </div>
            </div>

            {/* Action Buttons in Share Sheet */}
            <div className="share-sheet-actions">
              {/* 1. Download PNG Image */}
              <button
                type="button"
                onClick={handleDownloadScorecardImage}
                disabled={isGeneratingImage}
                className="share-action-btn btn-download-img"
              >
                <Download size={18} />
                <span>
                  {isGeneratingImage
                    ? 'กำลังสร้างรูป...'
                    : imageDownloadSuccess
                    ? 'บันทึกรูปแล้ว! 🎉'
                    : 'บันทึกรูปภาพการ์ด (PNG)'}
                </span>
              </button>

              {/* 2. Copy Formatted Wordle Text */}
              <button
                type="button"
                onClick={handleCopyShareText}
                className="share-action-btn btn-copy-text"
              >
                {copied ? <CheckCheck size={18} /> : <Copy size={18} />}
                <span>{copied ? 'คัดลอกข้อความแล้ว! ✅' : 'คัดลอกข้อความผลลัพธ์'}</span>
              </button>

              {/* 3. Native Device Share */}
              {typeof navigator !== 'undefined' && 'share' in navigator && (
                <button
                  type="button"
                  onClick={handleNativeShare}
                  className="share-action-btn btn-native-share"
                >
                  <Share2 size={18} />
                  <span>แชร์ไปยังแอป (LINE / IG / X)</span>
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
