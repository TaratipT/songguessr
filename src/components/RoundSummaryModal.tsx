import React, { useEffect, useState, useMemo } from 'react';
import type { Song, PlayerRoundAnswer, PlayerSession } from '../types';
import { CheckCircle2, XCircle, Clock, Trophy, Music, ArrowRight, LogOut, Pause, Play, Zap } from 'lucide-react';
import { soundFX } from '../services/soundEffects';
import { getThaiTitleTranslation } from '../data/thaiSongTitleAliases';

interface RoundSummaryModalProps {
  round: number;
  totalRounds: number;
  song: Song;
  playerAnswers: PlayerRoundAnswer[];
  players: PlayerSession[];
  isLastRound: boolean;
  isHost: boolean;
  isSolo: boolean;
  myPlayerId?: string;
  soloGuessedCorrectly?: boolean;
  soloPointsEarned?: number;
  autoAdvance?: boolean;
  onToggleAutoAdvance?: () => void;
  onProceedNextRound: () => void;
  onExit?: () => void;
}

export const RoundSummaryModal: React.FC<RoundSummaryModalProps> = ({
  round,
  totalRounds,
  song,
  playerAnswers,
  players,
  isLastRound,
  isHost,
  isSolo,
  myPlayerId,
  soloGuessedCorrectly,
  soloPointsEarned = 0,
  autoAdvance = true,
  onToggleAutoAdvance,
  onProceedNextRound,
  onExit
}) => {
  const [secondsRemaining, setSecondsRemaining] = useState(6);

  // In multiplayer (!isSolo), auto-advance is ALWAYS ACTIVE and cannot be paused
  const effectiveAutoAdvance = isSolo ? autoAdvance : true;

  // Reset timer on new round
  useEffect(() => {
    setSecondsRemaining(6);
  }, [round]);

  // Ensure all room players are represented in the round answers
  const allPlayerRoundAnswers: PlayerRoundAnswer[] = useMemo(() => {
    if (isSolo) return playerAnswers;
    if (!players || players.length === 0) return playerAnswers;

    return players.map((p) => {
      const found = playerAnswers.find((a) => a.playerId === p.id);
      if (found) return found;
      return {
        playerId: p.id,
        playerName: p.name,
        avatar: p.avatar,
        answered: false,
        isCorrect: false,
        pointsEarned: 0,
        timeTaken: 20
      };
    });
  }, [isSolo, playerAnswers, players]);

  // Sort round answers: correct answers at top (sorted by points/speed descending), then wrong/timeout
  const sortedRoundAnswers = useMemo(() => {
    return [...allPlayerRoundAnswers].sort((a, b) => {
      if (a.isCorrect && !b.isCorrect) return -1;
      if (!a.isCorrect && b.isCorrect) return 1;
      if (a.isCorrect && b.isCorrect) {
        return (b.pointsEarned || 0) - (a.pointsEarned || 0);
      }
      if (a.answered && !b.answered) return -1;
      if (!a.answered && b.answered) return 1;
      return 0;
    });
  }, [allPlayerRoundAnswers]);

  // Identify fastest correct player
  const fastestCorrectPlayerId = useMemo(() => {
    const corrects = allPlayerRoundAnswers.filter(
      (a) => a.isCorrect && typeof a.timeTaken === 'number' && a.timeTaken > 0
    );
    if (corrects.length === 0) return null;
    return corrects.reduce((fastest, curr) => (curr.timeTaken < fastest.timeTaken ? curr : fastest)).playerId;
  }, [allPlayerRoundAnswers]);

  // Play sound upon round reveal (correct/wrong chimes here instead of during guessing)
  useEffect(() => {
    if (isSolo) {
      if (soloGuessedCorrectly) soundFX.playCorrect();
      else soundFX.playWrong();
    } else {
      const myAns = allPlayerRoundAnswers.find((a) => a.playerId === myPlayerId);
      if (myAns) {
        if (myAns.isCorrect) soundFX.playCorrect();
        else soundFX.playWrong();
      } else {
        if (soloGuessedCorrectly) soundFX.playCorrect();
        else soundFX.playWrong();
      }
    }
  }, [isSolo, soloGuessedCorrectly, allPlayerRoundAnswers, myPlayerId]);

  // Auto-countdown to advance to next round (always runs in multiplayer)
  useEffect(() => {
    if (!effectiveAutoAdvance) return;

    const timer = setInterval(() => {
      setSecondsRemaining((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          if (isHost || isSolo) {
            onProceedNextRound();
          }
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [effectiveAutoAdvance, isHost, isSolo, onProceedNextRound]);

  // Sort players by cumulative score
  const rankedPlayers = [...players].sort((a, b) => b.score - a.score);

  return (
    <div className="modal-overlay">
      <div className="clean-modal-card round-summary-card">
        {/* Header Badge */}
        <div className="summary-top-tag">
          <span>เฉลยคำตอบรอบที่ {round}/{totalRounds}</span>
        </div>

        {/* Song Answer Showcase */}
        <div className="revealed-song-banner">
          <img
            src={song.artworkUrl || 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300'}
            alt={song.title}
            className="revealed-artwork"
          />
          <div className="revealed-text-group">
            <span className="revealed-label">คำตอบที่ถูกต้องคือ:</span>
            <h2 className="revealed-song-name">{getThaiTitleTranslation(song.title, song.artist) || song.title}</h2>
            <p className="revealed-artist-name">
              <Music size={16} />
              <strong>{song.artist}</strong> • ปี {song.year} ({song.genre})
            </p>
          </div>
        </div>

        {/* Solo Mode Result */}
        {isSolo && (
          <div className={`solo-round-badge ${soloGuessedCorrectly ? 'is-correct' : 'is-wrong'}`}>
            {soloGuessedCorrectly ? (
              <>
                <CheckCircle2 size={24} className="icon-status" />
                <div className="status-desc">
                  <strong>คุณตอบถูกต้อง! 🎉</strong>
                  <span>รับ +{soloPointsEarned} คะแนน</span>
                </div>
              </>
            ) : (
              <>
                <XCircle size={24} className="icon-status" />
                <div className="status-desc">
                  <strong>คุณยังไม่ถูกต้อง 😢</strong>
                  <span>+0 คะแนนในรอบนี้</span>
                </div>
              </>
            )}
          </div>
        )}

        {/* Multiplayer 2-Column Split: Round breakdown (Left) + Cumulative Ranking (Right) */}
        {!isSolo && (
          <div className="round-summary-split-grid">
            {/* Left Column: Round Points & Verdict (Hero Column) */}
            <div className="round-summary-col round-summary-col-hero">
              <div className="subhead-title round-hero-title">
                <div className="hero-title-badge">
                  <Zap size={14} className="hero-zap-icon" />
                  <span>คะแนนที่ได้รับในเพลงนี้</span>
                </div>
                <span className="hero-title-sub">ผลรอบที่ {round}</span>
              </div>

              <div className="answers-breakdown-list">
                {sortedRoundAnswers.map((ans) => {
                  const isFastest = ans.playerId === fastestCorrectPlayerId;
                  return (
                    <div
                      key={ans.playerId}
                      className={`round-verdict-card ${ans.isCorrect ? 'is-correct' : ans.answered ? 'is-wrong' : 'is-timeout'}`}
                    >
                      <div className="verdict-player-info">
                        <span className="verdict-avatar">{ans.avatar}</span>
                        <span className="verdict-name" title={ans.playerName}>{ans.playerName}</span>
                      </div>

                      <div className="verdict-badge-group">
                        {ans.isCorrect ? (
                          <>
                            {isFastest && sortedRoundAnswers.filter(a => a.isCorrect).length > 1 && (
                              <span className="fastest-flash-pill">⚡ ไวสุด!</span>
                            )}
                            <span className="speed-time-pill">
                              ⏱️ {typeof ans.timeTaken === 'number' && ans.timeTaken > 0
                                ? (Number.isInteger(ans.timeTaken) ? ans.timeTaken : ans.timeTaken.toFixed(1))
                                : 1}s
                            </span>
                            <span className="points-gain-badge">+{ans.pointsEarned} คะแนน</span>
                          </>
                        ) : ans.answered ? (
                          <span className="wrong-miss-badge">❌ ตอบผิด (+0)</span>
                        ) : (
                          <span className="timeout-miss-badge">⏳ หมดเวลา (+0)</span>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Right Column: Cumulative Leaderboard (Overall Tournament Standings) */}
            <div className="round-summary-col round-summary-col-overall">
              <div className="subhead-title overall-title">
                <div className="overall-title-badge">
                  <Trophy size={14} className="overall-trophy-icon" />
                  <span>ตารางคะแนนสะสมรวม</span>
                </div>
                <span className="overall-title-sub">รวมทุกข้อ</span>
              </div>

              <div className="ranking-table">
                {rankedPlayers.map((p, idx) => (
                  <div key={p.id} className={`ranking-row rank-row-${idx + 1}`}>
                    <span className="rank-podium-num">
                      {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                    </span>
                    <span className="rank-avatar">{p.avatar}</span>
                    <span className="rank-name" title={p.name}>
                      {p.name}
                      {p.isHost && <span className="rank-crown-pill" title="หัวหน้าห้อง">👑</span>}
                    </span>
                    <span className="rank-total-pill">รวม <strong>{p.score}</strong> คะแนน</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Countdown & Action */}
        <div className="summary-advance-footer">
          <div className="countdown-subtext-group">
            {effectiveAutoAdvance ? (
              <div className="countdown-subtext">
                <Clock size={15} />
                <span>
                  {isLastRound ? 'กำลังไปหน้าสรุปผลใน' : 'กำลังไปข้อถัดไปใน'} <strong>{secondsRemaining}</strong> วินาที...
                </span>
              </div>
            ) : (
              <div className="countdown-subtext paused">
                <Pause size={15} />
                <span>ปิดเลื่อนอัตโนมัติ (กดปุ่มเมื่อพร้อมไปต่อ)</span>
              </div>
            )}

            {isSolo && onToggleAutoAdvance && (
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  onToggleAutoAdvance();
                }}
                className={`btn-toggle-autoadvance ${autoAdvance ? 'active' : 'inactive'}`}
                title={autoAdvance ? 'กดเพื่อหยุดเวลาและอ่านผลคะแนนสบายๆ' : 'กดเพื่อเปิดการนับถอยหลังอัตโนมัติ'}
              >
                {autoAdvance ? (
                  <>
                    <Pause size={13} />
                    <span>หยุดนับถอยหลัง</span>
                  </>
                ) : (
                  <>
                    <Play size={13} />
                    <span>เปิดเลื่อนออโต้</span>
                  </>
                )}
              </button>
            )}
          </div>

          <div className="summary-footer-btns">
            {onExit && (
              <button
                type="button"
                onClick={() => {
                  soundFX.playClick();
                  if (window.confirm('คุณต้องการออกจากเกมและกลับไปหน้าหลักใช่หรือไม่?')) {
                    onExit();
                  }
                }}
                className="btn-exit-summary-link"
                title="ออกจากเกม"
              >
                <LogOut size={14} />
                <span>ออกจากเกม</span>
              </button>
            )}

            {(isHost || isSolo) && (
              <button
                onClick={() => {
                  soundFX.playClick();
                  onProceedNextRound();
                }}
                className="btn-proceed-now"
              >
                <span>{isLastRound ? 'ดูสรุปผู้ชนะ' : 'ไปข้อถัดไปทันที'}</span>
                <ArrowRight size={16} />
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
