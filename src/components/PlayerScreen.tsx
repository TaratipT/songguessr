import React, { useEffect, useRef, useState } from 'react';
import { Volume2, Volume1, VolumeX, RotateCcw, Shuffle, Play, Pause, Disc } from 'lucide-react';
import type { Song } from '../types';
import { soundFX } from '../services/soundEffects';

interface PlayerScreenProps {
  song: Song;
  isPlaying: boolean;
  onTogglePlay: () => void;
  onAlternativeAudio: () => void;
}

export const PlayerScreen: React.FC<PlayerScreenProps> = ({
  song,
  isPlaying,
  onTogglePlay,
  onAlternativeAudio
}) => {
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState<number>(() => {
    try {
      const saved = localStorage.getItem('songguessr_player_vol');
      return saved !== null ? parseFloat(saved) : 0.85;
    } catch {
      return 0.85;
    }
  });
  const [audioError, setAudioError] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);
  const [playbackProgress, setPlaybackProgress] = useState(0);

  const audioRef = useRef<HTMLAudioElement | null>(null);
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animFrameRef = useRef<number | null>(null);

  useEffect(() => {
    setAudioError(false);
    setAutoplayBlocked(false);
    setPlaybackProgress(0);

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = song.previewUrl;
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch((err: any) => {
          if (err && (err.name === 'NotAllowedError' || err.name === 'AbortError')) {
            setAutoplayBlocked(true);
          }
        });
      }
    }
  }, [song]);

  useEffect(() => {
    if (!audioRef.current) return;
    if (isPlaying) {
      audioRef.current.play().catch((err: any) => {
        if (err && err.name === 'NotAllowedError') {
          setAutoplayBlocked(true);
        }
      });
    } else {
      audioRef.current.pause();
    }
  }, [isPlaying]);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      if (audio.duration) {
        setPlaybackProgress((audio.currentTime / audio.duration) * 100);
      }
    };

    const handleEnded = () => {
      audio.currentTime = 0;
      audio.play().catch(() => {});
    };

    const handleError = () => {
      const audioEl = audioRef.current;
      const err = audioEl?.error;
      // Code 1 is MEDIA_ERR_ABORTED (fired when stopping or switching previous track) - ignore it
      if (!err || err.code === 1) return;
      console.warn('Audio playback error on song:', song.title, 'code:', err.code, err.message);
      setAudioError(true);
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
      audio.pause();
      audio.currentTime = 0;
    };
  }, [song]);

  // Visualizer Animation
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let step = 0;

    const render = () => {
      const width = canvas.width;
      const height = canvas.height;
      ctx.clearRect(0, 0, width, height);

      const numBars = 40;
      const barWidth = width / numBars - 3;

      for (let i = 0; i < numBars; i++) {
        let barHeight = 3;
        if (isPlaying) {
          const wave1 = Math.sin(step * 0.14 + i * 0.28);
          const wave2 = Math.cos(step * 0.1 + i * 0.16);
          const factor = Math.abs(wave1 * wave2);
          barHeight = 4 + factor * (height * 0.75);
        }

        const x = i * (barWidth + 3) + 3;
        const y = height - barHeight - 4;

        const grad = ctx.createLinearGradient(0, y, 0, height);
        grad.addColorStop(0, '#f97316');
        grad.addColorStop(1, 'rgba(249, 115, 22, 0.12)');

        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.roundRect(x, y, barWidth, barHeight, 2.5);
        ctx.fill();
      }

      step++;
      animFrameRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      if (animFrameRef.current) {
        cancelAnimationFrame(animFrameRef.current);
      }
    };
  }, [isPlaying]);

  // Sync volume & muted state with audio element
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume;
    }
  }, [volume, isMuted]);

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    if (val > 0 && isMuted) {
      setIsMuted(false);
    }
    try {
      localStorage.setItem('songguessr_player_vol', val.toString());
    } catch {}
  };

  const handleMainButtonClick = () => {
    soundFX.playClick();
    onTogglePlay();
  };

  const handleMuteToggle = () => {
    soundFX.playClick();
    if (audioRef.current) {
      const nextMuted = !isMuted;
      setIsMuted(nextMuted);
      audioRef.current.muted = nextMuted;
    }
  };

  const handleRestartAudio = () => {
    soundFX.playClick();
    if (audioRef.current) {
      audioRef.current.currentTime = 0;
      audioRef.current.play().catch(() => {});
    }
  };

  return (
    <div className="player-section-wrapper">
      <audio
        ref={audioRef}
        preload="auto"
        playsInline
      />

      {/* Turntable Deck Player */}
      <div className="turntable-deck-box">
        {/* Top-Right: Broken / Issue Audio Swapper with explicit warning */}
        <button
          type="button"
          onClick={() => {
            soundFX.playClick();
            onAlternativeAudio();
          }}
          className="screen-top-swap-btn"
          title="หากเพลงมีปัญหา เสียงไม่ออก หรือโหลดไม่ติด กดปุ่มนี้เพื่อสลับเพลงใหม่ได้ทันที"
        >
          <Shuffle size={12} />
          <span>เพลงมีปัญหา? สลับเพลง</span>
        </button>

        {/* Background Visualizer Soundwave */}
        <canvas
          ref={canvasRef}
          width={600}
          height={90}
          className="visualizer-canvas"
        />

        {/* Vinyl Disc & Tonearm Setup */}
        <div className="turntable-stage">
          {/* Vinyl Record */}
          <div className={`vinyl-disc-container ${isPlaying ? 'is-spinning' : 'is-paused'}`}>
            <div className="vinyl-groove-outer">
              <div className="vinyl-groove-middle">
                <div className="vinyl-groove-inner">
                  {/* Center Label */}
                  <div className="vinyl-center-label">
                    <div className="vinyl-center-art">
                      <Disc size={26} className="vinyl-disc-icon" />
                    </div>
                    <div className="vinyl-spindle-hole" />
                  </div>
                </div>
              </div>
            </div>
            {/* Gloss light reflection */}
            <div className="vinyl-sheen-reflection" />
          </div>

          {/* Tonearm Arm Assembly */}
          <div className="turntable-tonearm-assembly">
            <div className="tonearm-base-pivot" />
            <div className={`tonearm-arm ${isPlaying ? 'arm-on-record' : 'arm-at-rest'}`}>
              <div className="tonearm-weight" />
              <div className="tonearm-shaft" />
              <div className="tonearm-cartridge" />
            </div>
          </div>
        </div>

        {/* Center Prominent Playback Controller */}
        <div className="player-center-content">
          <button
            onClick={handleMainButtonClick}
            className={`main-audio-btn ${isPlaying ? 'is-playing' : 'animate-pulse-subtle'}`}
            id="play-audio-btn"
            title={isPlaying ? 'หยุดชั่วคราว' : 'กดเพื่อเปิดเสียง'}
          >
            {isPlaying ? <Pause size={20} /> : <Play size={20} fill="currentColor" />}
            <span>{isPlaying ? 'หยุดชั่วคราว' : 'กดเพื่อเริ่มฟัง'}</span>
          </button>

          <p className="browser-notice-text">
            {autoplayBlocked
              ? '🔇 เบราว์เซอร์บล็อกเสียงอัตโนมัติ — กดปุ่มเพื่อฟังเพลง'
              : isPlaying
              ? 'กำลังเล่นตัวอย่างเพลงปริศนา 30 วินาที 🎵'
              : 'ทายซิว่าเพลงอะไร? กดปุ่มเพื่อฟังเสียง'}
          </p>
        </div>

        {/* Progress bar */}
        <div className="audio-progress-track">
          <div 
            className="audio-progress-bar"
            style={{ width: `${playbackProgress}%` }}
          />
        </div>

        {/* Floating audio tools & volume control */}
        <div className="screen-bottom-controls">
          <button 
            type="button"
            onClick={handleRestartAudio} 
            className="control-icon-btn btn-restart-audio" 
            title="เริ่มฟังเพลงนี้ใหม่ตั้งแต่ต้น (0:00)"
          >
            <RotateCcw size={13} />
            <span className="ctrl-btn-text">เริ่มใหม่</span>
          </button>

          {/* Volume Control Strip */}
          <div className="volume-slider-box" title={`ปรับระดับเสียงเพลง (${Math.round((isMuted ? 0 : volume) * 100)}%)`}>
            <button 
              type="button"
              onClick={handleMuteToggle} 
              className="volume-icon-btn"
              title={isMuted ? 'เปิดเสียง' : 'ปิดเสียง'}
            >
              {isMuted || volume === 0 ? (
                <VolumeX size={15} />
              ) : volume < 0.5 ? (
                <Volume1 size={15} />
              ) : (
                <Volume2 size={15} />
              )}
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.02"
              value={isMuted ? 0 : volume}
              onChange={handleVolumeChange}
              className="volume-range-slider"
              aria-label="ปรับความดังเสียง"
            />
            <span className="volume-percent-label">
              {Math.round((isMuted ? 0 : volume) * 100)}%
            </span>
          </div>
        </div>
      </div>

      {audioError && (
        <div className="audio-error-notice">
          <span>⚠️ โหลดตัวอย่างเพลงนี้ไม่สำเร็จจากสโตร์</span>
          <button onClick={onAlternativeAudio} className="btn-inline-retry">
            สลับเพลงใหม่
          </button>
        </div>
      )}
    </div>
  );
};
