import React, { useState, useEffect, useRef } from 'react';
import { Search, Send, SkipForward, Music } from 'lucide-react';
import type { Song } from '../types';
import { soundFX } from '../services/soundEffects';
import { getKaraokeAliases } from '../data/thaiKaraokeMap';
import { getSongTitleAliases } from '../data/thaiSongTitleAliases';

interface GuessBarProps {
  availableSongs: Song[];
  targetSong?: Song;
  onGuess: (guessText: string) => void;
  onSkip: () => void;
  onInputChange?: (value: string) => void;
  disabled: boolean;
  disableDropdown?: boolean;
}

export const GuessBar: React.FC<GuessBarProps> = ({
  availableSongs,
  targetSong,
  onGuess,
  onSkip,
  onInputChange,
  disabled,
  disableDropdown = false
}) => {
  const [inputValue, setInputValue] = useState('');
  const [suggestions, setSuggestions] = useState<Song[]>([]);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [selectedIndex, setSelectedIndex] = useState(-1);

  const containerRef = useRef<HTMLDivElement | null>(null);
  const inputRef = useRef<HTMLInputElement | null>(null);

  // Auto-focus input and reset value when entering next song or when enabled
  useEffect(() => {
    setInputValue('');
    setIsDropdownOpen(false);
    setSelectedIndex(-1);
    if (!disabled) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 60);
      return () => clearTimeout(timer);
    }
  }, [targetSong?.id, targetSong?.title, disabled]);

  // Close dropdown on outside click
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setIsDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Filter suggestions when user types
  useEffect(() => {
    if (disableDropdown) {
      setSuggestions([]);
      setIsDropdownOpen(false);
      return;
    }

    const query = inputValue.trim().toLowerCase();
    if (!query || query.length < 1) {
      setSuggestions([]);
      setIsDropdownOpen(false);
      return;
    }

    // Filter unique titles matching query (ONLY search against song title or karaoke aliases, NOT artist name!)
    const titlesSet = new Set<string>();
    const filtered = availableSongs.filter((s) => {
      const matchTitle = s.title.toLowerCase().includes(query);
      const matchAlias = getKaraokeAliases(s.title).some((a) => a.toLowerCase().includes(query));
      const matchTitleAlias = getSongTitleAliases(s.title, s.artist).some((a) => a.toLowerCase().includes(query));
      if ((matchTitle || matchAlias || matchTitleAlias) && !titlesSet.has(s.title)) {
        titlesSet.add(s.title);
        return true;
      }
      return false;
    });

    setSuggestions(filtered.slice(0, 6));
    setIsDropdownOpen(filtered.length > 0);
    setSelectedIndex(-1);
  }, [inputValue, availableSongs]);

  const handleSubmit = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (disabled) return;

    let textToSubmit = inputValue.trim();
    if (selectedIndex >= 0 && suggestions[selectedIndex]) {
      textToSubmit = suggestions[selectedIndex].title;
    }

    if (!textToSubmit) return;

    soundFX.playClick();
    onGuess(textToSubmit);
    setInputValue('');
    onInputChange?.('');
    setIsDropdownOpen(false);
    setSelectedIndex(-1);
    inputRef.current?.focus();
  };

  const handleSelectSuggestion = (songTitle: string) => {
    soundFX.playClick();
    setInputValue(songTitle);
    setIsDropdownOpen(false);
    onGuess(songTitle);
    setInputValue('');
    onInputChange?.('');
    inputRef.current?.focus();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!isDropdownOpen || suggestions.length === 0) {
      if (e.key === 'Enter') {
        handleSubmit();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : 0));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setSelectedIndex((prev) => (prev > 0 ? prev - 1 : suggestions.length - 1));
    } else if (e.key === 'Enter') {
      e.preventDefault();
      handleSubmit();
    } else if (e.key === 'Escape') {
      setIsDropdownOpen(false);
    }
  };

  return (
    <div className="guess-bar-container" ref={containerRef}>
      <form onSubmit={handleSubmit} className="guess-input-wrapper">
        {/* Search Icon & Input */}
        <div className="input-inner">
          <Search size={20} className="search-icon" />
          <input
            ref={inputRef}
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
              onInputChange?.(e.target.value);
            }}
            onKeyDown={handleKeyDown}
            onFocus={() => {
              if (suggestions.length > 0) setIsDropdownOpen(true);
            }}
            placeholder={disableDropdown ? "พิมพ์ชื่อเพลงของคุณ (ไม่มีตัวช่วย)..." : "ทายชื่อเพลง..."}
            disabled={disabled}
            className="guess-text-input"
            autoComplete="off"
            id="guess-song-input"
          />
        </div>

        {/* Autocomplete Dropdown List */}
        {isDropdownOpen && suggestions.length > 0 && (
          <ul className="suggestions-dropdown" role="listbox">
            {suggestions.map((item, idx) => (
              <li
                key={item.id}
                onClick={() => handleSelectSuggestion(item.title)}
                className={`suggestion-item ${idx === selectedIndex ? 'is-active' : ''}`}
                role="option"
                aria-selected={idx === selectedIndex}
              >
                <div className="suggestion-item-icon-wrap">
                  <Music size={14} className="item-icon" />
                </div>
                <div className="suggestion-item-content">
                  <span className="suggestion-song-title" title={item.title}>
                    {item.title}
                  </span>
                  <span className="suggestion-artist-tag" title={`ศิลปิน: ${item.artist}`}>
                    <span className="artist-tag-icon">🎤</span>
                    <span className="artist-tag-name">{item.artist}</span>
                  </span>
                </div>
              </li>
            ))}
          </ul>
        )}

        {/* Action Buttons */}
        <div className="guess-buttons-group">
          <button
            type="submit"
            disabled={disabled || !inputValue.trim()}
            className="guess-submit-btn"
            id="submit-guess-btn"
          >
            <span>ทาย</span>
            <Send size={16} />
          </button>

          <button
            type="button"
            onClick={() => {
              soundFX.playClick();
              onSkip();
            }}
            disabled={disabled}
            className="guess-skip-btn"
            title="ข้ามข้อนี้เพื่อดูเฉลย"
          >
            <SkipForward size={16} />
            <span>ข้าม</span>
          </button>
        </div>
      </form>
    </div>
  );
};
