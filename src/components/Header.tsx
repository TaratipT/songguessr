import React, { useState } from 'react';
import { LogOut, User, Trophy, Flame, Link as LinkIcon, Check } from 'lucide-react';
import type { PlayerSession } from '../types';
import { soundFX } from '../services/soundEffects';

interface HeaderProps {
  currentRound: number;
  totalRounds: number;
  score: number;
  streak: number;
  playerName: string;
  roomCode?: string;
  players?: PlayerSession[];
  roundHistory?: boolean[];
  onExit: () => void;
  onOpenStats?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentRound,
  totalRounds,
  score,
  streak,
  playerName,
  roomCode,
  players: _players = [],
  roundHistory = [],
  onExit
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopyLink = () => {
    if (!roomCode) return;
    soundFX.playClick();
    const url = `${window.location.origin}${window.location.pathname}?room=${roomCode}`;
    if (navigator.clipboard) {
      navigator.clipboard.writeText(url).then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2500);
      });
    }
  };

  const roundsArray = Array.from({ length: totalRounds }, (_, i) => i + 1);

  return (
    <div className="header-wrapper">
      <header className="game-header">
        {/* Exit Button */}
        <button 
          onClick={() => {
            soundFX.playClick();
            if (window.confirm('คุณต้องการออกจากเกมและกลับไปหน้าเลือกหมวดหมู่ใช่หรือไม่?')) {
              onExit();
            }
          }}
          className="header-pill-btn exit-btn"
          title="ออกจากเกม"
        >
          <LogOut size={18} strokeWidth={2.4} />
          <span>ออก</span>
        </button>

        {/* Round Indicator & Room Badge */}
        <div className="round-indicator">
          <span className="round-label">รอบ</span>
          <span className="round-numbers">
            <strong className="current-round">{currentRound}</strong>
            <span className="divider">/</span>
            <span className="total-rounds">{totalRounds}</span>
          </span>
          {streak > 1 && (
            <div className="streak-badge" title={`สถิติตอบถูกต่อเนื่อง ${streak} ข้อ!`}>
              <Flame size={14} className="flame-icon" />
              <span>x{streak}</span>
            </div>
          )}

          {/* Room Code with Copy Link */}
          {roomCode && (
            <button 
              onClick={handleCopyLink} 
              className="room-code-pill"
              title="คลิกเพื่อคัดลอกลิงก์ชวนเพื่อน"
            >
              {copied ? <Check size={13} /> : <LinkIcon size={13} />}
              <span>ห้อง: {roomCode}</span>
            </button>
          )}
        </div>

        {/* Score & Profile */}
        <div className="header-right">
          <div className="score-badge">
            <Trophy size={16} className="trophy-icon" />
            <span className="score-label">คะแนน</span>
            <strong className="score-value">{score}</strong>
          </div>

          <div className="profile-pill" title={`ผู้เล่น: ${playerName}`}>
            <div className="google-icon-wrapper">
              <svg width="14" height="14" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z" />
              </svg>
            </div>
            <span className="profile-name">{playerName || 'ผู้เล่น 1'}</span>
            <User size={14} className="user-icon" />
          </div>
        </div>
      </header>

      {/* 10-Round Progress Journey Track */}
      <div className="round-journey-bar" title="ความคืบหน้ารอบการเล่น">
        {roundsArray.map((r) => {
          const isCurrent = r === currentRound;
          const isPast = r < currentRound;
          const isCorrect = isPast && roundHistory[r - 1] === true;
          const isWrong = isPast && roundHistory[r - 1] === false;

          let statusClass = 'dot-upcoming';
          if (isCurrent) statusClass = 'dot-current';
          else if (isCorrect) statusClass = 'dot-correct';
          else if (isWrong) statusClass = 'dot-wrong';

          return (
            <div
              key={r}
              className={`journey-dot ${statusClass}`}
              title={`รอบที่ ${r}: ${isCurrent ? 'กำลังเล่น' : isCorrect ? 'ตอบถูก' : isWrong ? 'ตอบผิด/ข้าม' : 'ยังไม่ถึง'}`}
            >
              <span className="dot-inner">
                {isCorrect ? '✓' : isWrong ? '✕' : r}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
};
