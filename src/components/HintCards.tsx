import React from 'react';
import { Music, Sparkles, Scissors, FileText, Lock } from 'lucide-react';
import type { Song, HintStatus, AnswerMode } from '../types';
import { soundFX } from '../services/soundEffects';

interface HintCardsProps {
  song: Song;
  hints: HintStatus;
  currentScore: number;
  answerMode: AnswerMode;
  onRevealHint: (hintType: keyof HintStatus, cost: number) => void;
  onInsufficientScore?: (cost: number) => void;
}

export const HintCards: React.FC<HintCardsProps> = ({
  song,
  hints,
  currentScore,
  answerMode,
  onRevealHint,
  onInsufficientScore
}) => {
  const isMultipleChoice = answerMode === 'multiple_choice';

  const handleCardClick = (type: keyof HintStatus, cost: number) => {
    if (hints[type]) return;

    if (currentScore < cost) {
      soundFX.playWrong();
      onInsufficientScore?.(cost);
      return;
    }

    soundFX.playHint();
    onRevealHint(type, cost);
  };

  const ARTIST_COST = 20;
  const FIRST_LETTER_COST = 10;
  const FIFTY_FIFTY_COST = 20;
  const SONG_LENGTH_COST = 15;

  const canAffordArtist = currentScore >= ARTIST_COST;
  const canAffordLetter = currentScore >= FIRST_LETTER_COST;
  const canAffordFifty = currentScore >= FIFTY_FIFTY_COST;
  const canAffordLength = currentScore >= SONG_LENGTH_COST;

  // Character & word count calculation for typing mode
  const cleanTitle = song.title.trim();
  const charCount = cleanTitle.replace(/\s+/g, '').length;
  const wordCount = cleanTitle.split(/\s+/).filter(Boolean).length;

  return (
    <div className={`hint-cards-grid ${isMultipleChoice ? 'choice-mode-grid' : 'typing-mode-grid'}`}>
      {/* 1. Artist Hint Card (Available in both modes) */}
      <button
        type="button"
        onClick={() => handleCardClick('artist', ARTIST_COST)}
        className={`hint-card card-brown ${hints.artist ? 'is-revealed' : ''} ${!hints.artist && !canAffordArtist ? 'is-locked' : ''}`}
        title={
          hints.artist
            ? 'เปิดเผยศิลปินแล้ว'
            : !canAffordArtist
            ? `🔒 คะแนนสะสมไม่พอ (ต้องใช้ ${ARTIST_COST} คะแนน แต่คุณมี ${currentScore} คะแนน)`
            : `เปิดคำใบ้ศิลปิน (ใช้ ${ARTIST_COST} คะแนน)`
        }
      >
        <div className="hint-icon-wrap">
          <Music size={18} />
        </div>
        <div className="hint-text-area">
          {hints.artist ? (
            <div className="revealed-content">
              <span className="revealed-tag">ศิลปิน</span>
              <strong className="revealed-value">{song.artist}</strong>
            </div>
          ) : (
            <>
              <span className="hint-title">ศิลปิน</span>
              <span className={`hint-cost-badge ${!canAffordArtist ? 'insufficient' : ''}`}>
                {!canAffordArtist ? <Lock size={10} /> : null}
                {canAffordArtist ? `-${ARTIST_COST} แต้ม` : `ต้องมี ${ARTIST_COST} แต้ม`}
              </span>
            </>
          )}
        </div>
      </button>

      {/* Mode-Specific Cards */}
      {isMultipleChoice ? (
        /* In 4-Choice Mode: 50:50 Lifeline (Notice: First Letter is hidden in choice mode to prevent spoiling choice elimination) */
        <button
          type="button"
          onClick={() => handleCardClick('fiftyFifty', FIFTY_FIFTY_COST)}
          className={`hint-card card-amber ${hints.fiftyFifty ? 'is-revealed' : ''} ${!hints.fiftyFifty && !canAffordFifty ? 'is-locked' : ''}`}
          title={
            hints.fiftyFifty
              ? 'ตัด 2 ช้อยส์ที่ผิดออกแล้ว'
              : !canAffordFifty
              ? `🔒 คะแนนสะสมไม่พอ (ต้องใช้ ${FIFTY_FIFTY_COST} คะแนน แต่คุณมี ${currentScore} คะแนน)`
              : `ตัด 2 ช้อยส์ที่ไม่ใช่ออก (ใช้ ${FIFTY_FIFTY_COST} คะแนน)`
          }
        >
          <div className="hint-icon-wrap">
            <Scissors size={18} />
          </div>
          <div className="hint-text-area">
            {hints.fiftyFifty ? (
              <div className="revealed-content">
                <span className="revealed-tag">ตัวช่วย 50:50</span>
                <strong className="revealed-value">ตัด 2 ช้อยส์ผิดออกแล้ว</strong>
              </div>
            ) : (
              <>
                <span className="hint-title">50:50 ตัด 2 ช้อยส์</span>
                <span className={`hint-cost-badge ${!canAffordFifty ? 'insufficient' : ''}`}>
                  {!canAffordFifty ? <Lock size={10} /> : null}
                  {canAffordFifty ? `-${FIFTY_FIFTY_COST} แต้ม` : `ต้องมี ${FIFTY_FIFTY_COST} แต้ม`}
                </span>
              </>
            )}
          </div>
        </button>
      ) : (
        /* In Typing Mode: First Letter Card & Song Length Card */
        <>
          {/* 2. First Letter Hint Card */}
          <button
            type="button"
            onClick={() => handleCardClick('firstLetter', FIRST_LETTER_COST)}
            className={`hint-card card-purple ${hints.firstLetter ? 'is-revealed' : ''} ${!hints.firstLetter && !canAffordLetter ? 'is-locked' : ''}`}
            title={
              hints.firstLetter
                ? 'เปิดเผยอักษรแรกแล้ว'
                : !canAffordLetter
                ? `🔒 คะแนนสะสมไม่พอ (ต้องใช้ ${FIRST_LETTER_COST} คะแนน แต่คุณมี ${currentScore} คะแนน)`
                : `เปิดคำใบ้อักษรแรก (ใช้ ${FIRST_LETTER_COST} คะแนน)`
            }
          >
            <div className="hint-icon-wrap">
              <Sparkles size={18} />
            </div>
            <div className="hint-text-area">
              {hints.firstLetter ? (
                <div className="revealed-content">
                  <span className="revealed-tag">อักษรแรก</span>
                  <strong className="revealed-value">ขึ้นต้นด้วย "{song.firstCharHint || song.title.charAt(0)}"</strong>
                </div>
              ) : (
                <>
                  <span className="hint-title">อักษรแรก</span>
                  <span className={`hint-cost-badge ${!canAffordLetter ? 'insufficient' : ''}`}>
                    {!canAffordLetter ? <Lock size={10} /> : null}
                    {canAffordLetter ? `-${FIRST_LETTER_COST} แต้ม` : `ต้องมี ${FIRST_LETTER_COST} แต้ม`}
                  </span>
                </>
              )}
            </div>
          </button>

          {/* 3. Song Length Hint Card */}
          <button
            type="button"
            onClick={() => handleCardClick('songLength', SONG_LENGTH_COST)}
            className={`hint-card card-teal ${hints.songLength ? 'is-revealed' : ''} ${!hints.songLength && !canAffordLength ? 'is-locked' : ''}`}
            title={
              hints.songLength
                ? 'เปิดเผยความยาวชื่อเพลงแล้ว'
                : !canAffordLength
                ? `🔒 คะแนนสะสมไม่พอ (ต้องใช้ ${SONG_LENGTH_COST} คะแนน แต่คุณมี ${currentScore} คะแนน)`
                : `เปิดเผยความยาวชื่อเพลง (ใช้ ${SONG_LENGTH_COST} คะแนน)`
            }
          >
            <div className="hint-icon-wrap">
              <FileText size={18} />
            </div>
            <div className="hint-text-area">
              {hints.songLength ? (
                <div className="revealed-content">
                  <span className="revealed-tag">ความยาวชื่อเพลง</span>
                  <strong className="revealed-value">
                    {charCount} ตัวอักษร ({wordCount} คำ)
                  </strong>
                </div>
              ) : (
                <>
                  <span className="hint-title">ความยาวชื่อเพลง</span>
                  <span className={`hint-cost-badge ${!canAffordLength ? 'insufficient' : ''}`}>
                    {!canAffordLength ? <Lock size={10} /> : null}
                    {canAffordLength ? `-${SONG_LENGTH_COST} แต้ม` : `ต้องมี ${SONG_LENGTH_COST} แต้ม`}
                  </span>
                </>
              )}
            </div>
          </button>
        </>
      )}
    </div>
  );
};
