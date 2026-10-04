import React, { useState, useCallback, useEffect, useRef } from 'react';
import type { Song, Category, HintStatus, AnswerMode, RoomState, PlayerSession, PlayerRoundAnswer, RoundResult, SongDraftState, RoomGameType } from './types';
import { CATEGORIES } from './data/categories';
import { CURATED_SONGS } from './data/curatedSongs';
import { getSongsForGame, getSongsForCustomArtist, isSongMatch, cleanArtist } from './services/itunesApi';
import { generateChoicesForSong } from './services/choiceGenerator';
import { multiplayerService } from './services/multiplayerService';
import { soundFX } from './services/soundEffects';

import { Header } from './components/Header';
import { PlayerScreen } from './components/PlayerScreen';
import { HintCards } from './components/HintCards';
import { GuessBar } from './components/GuessBar';
import { MultipleChoiceBar } from './components/MultipleChoiceBar';
import { CategorySelectModal } from './components/CategorySelectModal';
import { RoundSummaryModal } from './components/RoundSummaryModal';
import { GameOverModal } from './components/GameOverModal';
import { SongDraftArena } from './components/SongDraftArena';
import { LandingPage } from './components/LandingPage';
import { storageService } from './services/storageService';
import { calculateRoundScore } from './utils/scoreCalculator';

import './App.css';

export const App: React.FC = () => {
  // Game Configuration & State (Persisted in storageService)
  const [category, setCategory] = useState<Category>(CATEGORIES[0]);
  const [totalRounds, setTotalRounds] = useState<number>(() => storageService.getTotalRounds(10));
  const [answerMode, setAnswerMode] = useState<AnswerMode>(() => storageService.getAnswerMode('multiple_choice'));
  const [songs, setSongs] = useState<Song[]>(CURATED_SONGS.thai_hits || []);
  const [currentRoundIndex, setCurrentRoundIndex] = useState<number>(0);
  const [score, setScore] = useState<number>(0);
  const [streak, setStreak] = useState<number>(0);
  const [playerName, setPlayerName] = useState<string>(() => storageService.getPlayerName('ผู้เล่นเซียนเพลง'));

  // Multiplayer State
  const [roomState, setRoomState] = useState<RoomState | null>(null);
  const [isHost, setIsHost] = useState<boolean>(false);
  const [multiplayerError, setMultiplayerError] = useState<string | null>(null);
  const [liveNotification, setLiveNotification] = useState<string | null>(null);
  const [activeDraftState, setActiveDraftState] = useState<SongDraftState | null>(null);
  const [roomGameType, setRoomGameType] = useState<RoomGameType>('standard');

  // Synchronized Round Timer & Answers State
  const [roundTimeLimit, setRoundTimeLimit] = useState<number>(() => storageService.getRoundTimeLimit(20));
  const [autoAdvance, setAutoAdvance] = useState<boolean>(() => storageService.getAutoAdvance(true));
  const [roundTimeLeft, setRoundTimeLeft] = useState<number>(20);
  const [hasAnsweredThisRound, setHasAnsweredThisRound] = useState<boolean>(false);
  const [currentRoundAnswers, setCurrentRoundAnswers] = useState<PlayerRoundAnswer[]>([]);
  const [soloGuessedCorrectly, setSoloGuessedCorrectly] = useState<boolean>(false);
  const [soloPointsEarned, setSoloPointsEarned] = useState<number>(0);
  const [gameHistory, setGameHistory] = useState<RoundResult[]>([]);

  // Round specific state
  const [hints, setHints] = useState<HintStatus>({
    artist: false,
    firstLetter: false,
    fiftyFifty: false,
    songLength: false
  });
  const [eliminatedChoices, setEliminatedChoices] = useState<string[]>([]);
  const [roundPoints, setRoundPoints] = useState<number>(100);
  const [isPlayingAudio, setIsPlayingAudio] = useState<boolean>(false);
  const [selectedChoice, setSelectedChoice] = useState<string | undefined>(undefined);

  // Modals & Navigation
  const [gameState, setGameState] = useState<'landing' | 'category_select' | 'playing' | 'round_reveal' | 'game_over'>(() => {
    if (typeof window !== 'undefined') {
      const p = new URLSearchParams(window.location.search);
      if (p.get('room')) return 'category_select';
    }
    return 'landing';
  });
  const [categorySelectInitialTab, setCategorySelectInitialTab] = useState<'solo' | 'create_room' | 'join_room'>('solo');
  const [isLoadingSongs, setIsLoadingSongs] = useState<boolean>(false);

  // Suggestions & Choices
  const [allAvailableSuggestions, setAllAvailableSuggestions] = useState<Song[]>([]);
  const [currentChoices, setCurrentChoices] = useState<string[]>([]);

  const roundTimerRef = useRef<number | null>(null);
  const roundStartTimeRef = useRef<number>(Date.now());

  // Current active song
  const currentSong: Song = songs[currentRoundIndex] || CURATED_SONGS.thai_hits[0];

  // Synchronized state refs to prevent stale closures in multiplayer callbacks
  const songsRef = useRef<Song[]>(songs);
  const currentRoundIndexRef = useRef<number>(currentRoundIndex);
  const currentSongRef = useRef<Song>(currentSong);
  const roomStateRef = useRef<RoomState | null>(roomState);
  const isHostRef = useRef<boolean>(isHost);
  const hasAnsweredThisRoundRef = useRef<boolean>(hasAnsweredThisRound);
  const currentRoundAnswersRef = useRef<PlayerRoundAnswer[]>(currentRoundAnswers);
  const roundTimeLimitRef = useRef<number>(roundTimeLimit);
  const playerNameRef = useRef<string>(playerName);

  useEffect(() => {
    songsRef.current = songs;
  }, [songs]);

  useEffect(() => {
    currentRoundIndexRef.current = currentRoundIndex;
    currentSongRef.current = songs[currentRoundIndex] || currentSong;
  }, [currentRoundIndex, songs, currentSong]);

  useEffect(() => {
    roomStateRef.current = roomState;
  }, [roomState]);

  useEffect(() => {
    isHostRef.current = isHost;
  }, [isHost]);

  useEffect(() => {
    hasAnsweredThisRoundRef.current = hasAnsweredThisRound;
  }, [hasAnsweredThisRound]);

  useEffect(() => {
    currentRoundAnswersRef.current = currentRoundAnswers;
  }, [currentRoundAnswers]);

  useEffect(() => {
    roundTimeLimitRef.current = roundTimeLimit;
  }, [roundTimeLimit]);

  useEffect(() => {
    playerNameRef.current = playerName;
  }, [playerName]);

  const handleCompleteDraftRef = useRef<((surviving: string[], rosterDetails?: { redSurviving: string[]; blueSurviving: string[]; autoMatched: string[] }) => void) | null>(null);

  const showToast = useCallback((msg: string) => {
    setLiveNotification(msg);
    setTimeout(() => {
      setLiveNotification(null);
    }, 4000);
  }, []);

  // Update choices for current song (strictly category-matched & stable)
  useEffect(() => {
    if (currentSong && answerMode === 'multiple_choice') {
      if (currentSong.choices && currentSong.choices.length === 4) {
        setCurrentChoices(currentSong.choices);
      } else {
        const choices = generateChoicesForSong(currentSong, songs, category);
        setCurrentChoices(choices);
      }
    }
  }, [currentRoundIndex, answerMode, currentSong?.id]);

  const handleAlternativeAudio = () => {
    soundFX.playClick();
    const catPool = CURATED_SONGS[category.id] || Object.values(CURATED_SONGS).flat();
    const currentTitles = new Set(songs.map((s) => s.title.toLowerCase().trim()));
    const alternatives = catPool.filter((s) => !currentTitles.has(s.title.toLowerCase().trim()));
    let replacement = alternatives[Math.floor(Math.random() * alternatives.length)] || catPool[0];

    if (!replacement) {
      showToast('ไม่พบเพลงสำรองในหมวดนี้');
      return;
    }

    if (answerMode === 'multiple_choice' && (!replacement.choices || replacement.choices.length !== 4)) {
      replacement = {
        ...replacement,
        choices: generateChoicesForSong(replacement, songs, category)
      };
    }

    const updated = [...songs];
    updated[currentRoundIndex] = replacement;
    setSongs(updated);

    if (replacement.choices && replacement.choices.length === 4) {
      setCurrentChoices(replacement.choices);
    }

    resetRoundState();
    setIsPlayingAudio(true);
    showToast('🔀 สลับเป็นเพลงใหม่เรียบร้อยแล้ว!');

    if (isHost && roomState) {
      multiplayerService.hostReplaceSong(currentRoundIndex, replacement);
    }
  };

  const resetRoundState = (customLimit?: number, _customStartTime?: number) => {
    setHints({
      artist: false,
      firstLetter: false,
      fiftyFifty: false,
      songLength: false
    });
    setEliminatedChoices([]);
    setRoundPoints(100);
    const limit = customLimit !== undefined ? customLimit : roundTimeLimitRef.current;
    setRoundTimeLeft(limit === 0 ? 0 : limit);
    setHasAnsweredThisRound(false);
    setSelectedChoice(undefined);
    setSoloGuessedCorrectly(false);
    setSoloPointsEarned(0);
    // Always use local client Date.now() to measure elapsed time accurately and prevent clock drift/skew bugs
    roundStartTimeRef.current = Date.now();
  };

  // -------------------------------------------------------------
  // SYNCHRONIZED ROUND TIMER EFFECT (Respects custom time limit & unlimited mode)
  // -------------------------------------------------------------
  useEffect(() => {
    const limit = roundTimeLimit;
    if (gameState !== 'playing' || limit === 0) {
      if (roundTimerRef.current) clearInterval(roundTimerRef.current);
      return;
    }

    const checkTime = () => {
      const elapsed = Math.floor((Date.now() - roundStartTimeRef.current) / 1000);
      const remaining = Math.max(0, limit - elapsed);
      setRoundTimeLeft(remaining);

      if (remaining <= 0) {
        if (roundTimerRef.current) clearInterval(roundTimerRef.current);
        const isMulti = !!roomStateRef.current;
        if (!isMulti || isHostRef.current) {
          triggerRoundReveal(true);
        } else {
          // Participant in multiplayer: time ran out before answering
          if (!hasAnsweredThisRoundRef.current) {
            handleGuess('หมดเวลา');
          }
        }
      }
    };

    checkTime();
    roundTimerRef.current = window.setInterval(checkTime, 500);

    return () => {
      if (roundTimerRef.current) clearInterval(roundTimerRef.current);
    };
  }, [gameState, currentRoundIndex, roundTimeLimit]);


  // Reveal Round Summary for everyone
  const triggerRoundReveal = useCallback((isTimeUp: boolean = false) => {
    setIsPlayingAudio(false);

    const isMultiplayer = !!roomStateRef.current;
    if (isMultiplayer) {
      if (isHostRef.current) {
        multiplayerService.hostRevealRound();
      }
      return;
    }

    setHasAnsweredThisRound(true);

    // In Solo Mode
    const now = Date.now();
    const limit = roundTimeLimitRef.current;
    const elapsedSec = isTimeUp && limit > 0
      ? limit
      : Number((Math.max(500, now - roundStartTimeRef.current) / 1000).toFixed(1));

    if (!hasAnsweredThisRoundRef.current) {
      const timeOutAnswer: PlayerRoundAnswer = {
        playerId: 'solo_player',
        playerName: playerNameRef.current,
        avatar: '🎧',
        answered: false,
        isCorrect: false,
        pointsEarned: 0,
        timeTaken: elapsedSec
      };
      setCurrentRoundAnswers([timeOutAnswer]);
      const activeIdx = currentRoundIndexRef.current;
      const activeSong = songsRef.current[activeIdx] || currentSongRef.current;
      const result: RoundResult = {
        round: activeIdx + 1,
        song: activeSong,
        guessedCorrectly: false,
        guessedTitle: 'หมดเวลา',
        pointsEarned: 0,
        hintsUsedCount: 0,
        timeSpent: elapsedSec,
        playerAnswers: [timeOutAnswer]
      };
      setGameHistory((prev) => [...prev, result]);
    }
    setGameState('round_reveal');
  }, []);

  // -------------------------------------------------------------
  // 1. SOLO GAME FLOW
  // -------------------------------------------------------------
  const handleStartSolo = useCallback(async (selectedCat: Category, rounds: number, mode: AnswerMode) => {
    setIsLoadingSongs(true);
    setCategory(selectedCat);
    setTotalRounds(rounds);
    setAnswerMode(mode);
    setRoomState(null);
    setIsHost(false);
    setGameHistory([]);

    try {
      const fetched = await getSongsForGame(selectedCat, rounds);
      const prepared = fetched.map((s) => ({
        ...s,
        choices: s.choices && s.choices.length === 4 ? s.choices : generateChoicesForSong(s, fetched, selectedCat)
      }));
      setSongs(prepared);

      const curatedForCat = CURATED_SONGS[selectedCat.id] || Object.values(CURATED_SONGS).flat();
      const pool = [...prepared, ...curatedForCat];
      const uniqueMap = new Map<string, Song>();
      pool.forEach((s) => uniqueMap.set(s.title.toLowerCase(), s));
      setAllAvailableSuggestions(Array.from(uniqueMap.values()));

      setCurrentRoundIndex(0);
      setScore(0);
      setStreak(0);
      resetRoundState();
      setGameState('playing');
      setIsPlayingAudio(true);
    } catch (err) {
      console.error('Failed to start solo game:', err);
    } finally {
      setIsLoadingSongs(false);
    }
  }, []);

  const handleStartCustomArtist = useCallback(async (artistName: string, rounds: number, mode: AnswerMode) => {
    setIsLoadingSongs(true);
    setGameHistory([]);
    const customCat: Category = {
      id: 'custom_' + artistName,
      name: artistName,
      thaiName: `🎤 เพลงของ ${artistName}`,
      emoji: '🎵',
      badge: 'ศิลปินที่คุณเลือก',
      description: `ทายเพลงฮิตทั้งหมดของ ${artistName}`,
      gradient: 'from-amber-500 to-orange-600',
      searchQueries: [artistName],
      selectedArtists: [artistName],
      modeType: 'custom'
    };
    setCategory(customCat);
    setTotalRounds(rounds);
    setAnswerMode(mode);
    setRoomState(null);
    setIsHost(false);

    try {
      const fetched = await getSongsForCustomArtist(artistName, rounds);
      const prepared = fetched.map((s) => ({
        ...s,
        choices: s.choices && s.choices.length === 4 ? s.choices : generateChoicesForSong(s, fetched, customCat)
      }));
      setSongs(prepared);
      setAllAvailableSuggestions(prepared);

      setCurrentRoundIndex(0);
      setScore(0);
      setStreak(0);
      resetRoundState();
      setGameState('playing');
      setIsPlayingAudio(true);
    } catch (err) {
      console.error('Failed to start custom game:', err);
    } finally {
      setIsLoadingSongs(false);
    }
  }, []);

  // -------------------------------------------------------------
  // 2. ONLINE MULTIPLAYER FLOW
  // -------------------------------------------------------------
  const handleLeaveRoom = useCallback(() => {
    soundFX.playClick();
    multiplayerService.leaveRoom();
    setRoomState(null);
    setIsHost(false);
    setMultiplayerError(null);
    setActiveDraftState(null);
    setIsPlayingAudio(false);
    setGameState('landing');
    if (typeof window !== 'undefined' && window.location.search) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  const handleKickPlayer = useCallback((targetPlayerId: string) => {
    soundFX.playClick();
    multiplayerService.hostKickPlayer(targetPlayerId);
    setRoomState((prev) => {
      if (!prev) return null;
      return {
        ...prev,
        players: prev.players.filter((p) => p.id !== targetPlayerId)
      };
    });
    showToast('👢 เตะผู้เล่นออกจากห้องเรียบร้อย');
  }, [showToast]);

  const handleCreateOnlineRoom = useCallback(async (
    hostName: string,
    selectedCat: Category,
    rounds: number,
    mode: AnswerMode
  ) => {
    setIsLoadingSongs(true);
    setMultiplayerError(null);
    setPlayerName(hostName);
    setGameHistory([]);
    setGameState('category_select');

    const myHostSession: PlayerSession = {
      id: 'host_' + Math.random().toString(36).substring(2, 8),
      name: hostName,
      avatar: '👑',
      score: 0,
      streak: 0,
      isHost: true,
      hasAnsweredThisRound: false
    };

    const effectiveTimeLimit = (!roundTimeLimit || roundTimeLimit === 0) ? 30 : roundTimeLimit;

    try {
      const code = await multiplayerService.createRoom(
        myHostSession,
        selectedCat,
        rounds,
        mode,
        {
          onRoomSync: (synced) => {
            setRoomState(synced);
            if (synced.roundTimeLimit !== undefined) {
              setRoundTimeLimit(synced.roundTimeLimit);
            }
            if (synced.autoAdvance !== undefined) {
              setAutoAdvance(synced.autoAdvance);
            }
            if (synced.currentRoundAnswers) {
              setCurrentRoundAnswers(synced.currentRoundAnswers);
            }
          },
          onGameStart: (sList, cat, rTotal, aMode, rTimeLimit, aAdvance, rStartTime) => {
            setSongs(sList);
            setCategory(cat);
            setTotalRounds(rTotal);
            setAnswerMode(aMode);
            const limit = (rTimeLimit !== undefined && rTimeLimit !== 0) ? rTimeLimit : 30;
            setRoundTimeLimit(limit);
            roundTimeLimitRef.current = limit;
            if (aAdvance !== undefined) setAutoAdvance(aAdvance);
            setCurrentRoundIndex(0);
            setCurrentRoundAnswers([]);
            resetRoundState(limit, rStartTime);
            setGameHistory([]);
            setScore(0);
            setStreak(0);
            setGameState('playing');
            setIsPlayingAudio(true);
          },
          onRevealRound: (answers, updatedScores) => {
            setIsPlayingAudio(false);
            setCurrentRoundAnswers(answers);
            setRoomState((prev) => prev ? { ...prev, players: updatedScores } : null);
            const myAns = answers.find((a: PlayerRoundAnswer) => a.playerId === multiplayerService.myPlayerId);
            if (myAns) {
              setSoloGuessedCorrectly(myAns.isCorrect);
              setSoloPointsEarned(myAns.pointsEarned);
              if (myAns.isCorrect) {
                setScore((prev) => prev + myAns.pointsEarned);
                setStreak((prev) => prev + 1);
              } else {
                setStreak(0);
              }
            }
            const activeIdx = currentRoundIndexRef.current;
            const activeSong = songsRef.current[activeIdx] || currentSongRef.current;
            const limit = roundTimeLimitRef.current;
            const result: RoundResult = {
              round: activeIdx + 1,
              song: activeSong,
              guessedCorrectly: myAns?.isCorrect ?? false,
              pointsEarned: myAns?.pointsEarned ?? 0,
              hintsUsedCount: 0,
              timeSpent: myAns?.timeTaken ?? (limit === 0 ? Number((Math.max(500, Date.now() - roundStartTimeRef.current) / 1000).toFixed(1)) : limit),
              playerAnswers: answers
            };
            setGameHistory((prev) => [...prev, result]);
            setGameState('round_reveal');
          },
          onNextRound: (rIndex, rStartTime) => {
            setCurrentRoundIndex(rIndex);
            setCurrentRoundAnswers([]);
            resetRoundState(roundTimeLimitRef.current, rStartTime);
            setGameState('playing');
            setIsPlayingAudio(true);
          },
          onPlayerAnswerSubmit: (_ans, allRoundAnswers) => {
            setCurrentRoundAnswers(allRoundAnswers);
          },
          onReplaceSong: (rIndex, newSong, rStartTime) => {
            setSongs((prev) => {
              const updated = [...prev];
              updated[rIndex] = newSong;
              return updated;
            });
            resetRoundState(roundTimeLimitRef.current, rStartTime);
            setIsPlayingAudio(true);
            showToast(`🔄 สลับเพลงใหม่: ${newSong.title}`);
          },
          onAnswerNotification: (notif) => {
            showToast(`⚡ ${notif.playerName} ตอบแล้ว!`);
          },
          onDraftStart: (dState) => {
            setActiveDraftState(dState);
          },
          onDraftPickProgress: (pId, pCount, isLock) => {
            setActiveDraftState((prev) => {
              if (!prev) return null;
              const next: SongDraftState = {
                ...prev,
                redPlayer: { ...prev.redPlayer },
                bluePlayer: { ...prev.bluePlayer }
              };
              if (next.redPlayer.playerId === pId) {
                next.redPlayer.pickedCount = pCount;
                next.redPlayer.isLocked = isLock;
              } else if (next.bluePlayer.playerId === pId) {
                next.bluePlayer.pickedCount = pCount;
                next.bluePlayer.isLocked = isLock;
              }
              return next;
            });
          },
          onDraftReveal: (redPicks, bluePicks, autoMatched) => {
            setActiveDraftState((prev) => {
              if (!prev) return null;
              return {
                ...prev,
                phase: 'reveal',
                redPlayer: { ...prev.redPlayer, picks: redPicks },
                bluePlayer: { ...prev.bluePlayer, picks: bluePicks },
                autoMatchedArtists: autoMatched
              };
            });
          },
          onDraftBanProgress: (pId, _bCount, isLock, bans) => {
            setActiveDraftState((prev) => {
              if (!prev) return null;
              const next: SongDraftState = {
                ...prev,
                redPlayer: { ...prev.redPlayer },
                bluePlayer: { ...prev.bluePlayer }
              };
              if (next.redPlayer.playerId === pId) {
                next.redPlayer.isBanLocked = isLock;
                if (bans) next.redPlayer.bans = bans;
              } else if (next.bluePlayer.playerId === pId) {
                next.bluePlayer.isBanLocked = isLock;
                if (bans) next.bluePlayer.bans = bans;
              }
              return next;
            });
          },
          onDraftPhaseChange: (phase, updatedDraftState) => {
            setActiveDraftState((prev) => {
              if (updatedDraftState) {
                return {
                  ...updatedDraftState,
                  redPlayer: { ...updatedDraftState.redPlayer },
                  bluePlayer: { ...updatedDraftState.bluePlayer }
                };
              }
              if (!prev) return null;
              return { ...prev, phase };
            });
          },
          onDraftBansComplete: (_surviving) => {
            // Note: Draft completion is handled by host after the Battle Roster preview in SongDraftArena
          },
          onDraftRosterReady: (_surviving, songsList, cat, rTotal) => {
            setSongs(songsList);
            setCategory(cat);
            setTotalRounds(rTotal);
            setCurrentRoundIndex(0);
            resetRoundState();
            setGameHistory([]);
            setActiveDraftState(null);
            setGameState('playing');
            setIsPlayingAudio(true);
            showToast('🔥 เข้าสู่สมรภูมิดวล 1v1!');
          },
          onGameOver: (finalScores) => {
            setIsPlayingAudio(false);
            setRoomState((prev) => {
              if (!prev) return null;
              return {
                ...prev,
                status: 'waiting',
                players: finalScores.map((p) => ({ ...p, status: 'viewing_summary' }))
              };
            });
            setGameState('game_over');
          },
          onReturnToLobby: () => {
            setIsPlayingAudio(false);
            setRoomState((prev) => prev ? { ...prev, status: 'waiting', currentRoundAnswers: [] } : null);
            setScore(0);
            setStreak(0);
            setGameHistory([]);
            setActiveDraftState(null);
            setGameState('category_select');
          },
          onError: (err) => setMultiplayerError(err)
        },
        effectiveTimeLimit,
        autoAdvance
      );

      setIsHost(true);
      setCategory(selectedCat);
      setTotalRounds(rounds);
      setAnswerMode(mode);
      setRoundTimeLimit(effectiveTimeLimit);

      const initialRoom: RoomState = {
        code,
        hostId: myHostSession.id,
        players: [myHostSession],
        category: selectedCat,
        totalRounds: rounds,
        answerMode: mode,
        gameType: roomGameType,
        roundTimeLimit: effectiveTimeLimit,
        autoAdvance,
        currentRound: 1,
        status: 'waiting',
        songs: [],
        currentSongIndex: 0,
        roundTimeLeft: effectiveTimeLimit,
        currentRoundAnswers: []
      };
      setRoomState(initialRoom);
      setGameState('category_select');
    } catch {
      setMultiplayerError('ไม่สามารถสร้างห้องออนไลน์ได้ กรุณาลองใหม่');
    } finally {
      setIsLoadingSongs(false);
    }
  }, [showToast, roundTimeLimit, autoAdvance, roomGameType]);

  const handleJoinOnlineRoom = useCallback(async (roomCode: string, name: string) => {
    setIsLoadingSongs(true);
    setMultiplayerError(null);
    setPlayerName(name);
    setGameHistory([]);

    const clientSession: PlayerSession = {
      id: 'player_' + Math.random().toString(36).substring(2, 8),
      name,
      avatar: '🎧',
      score: 0,
      streak: 0,
      isHost: false,
      hasAnsweredThisRound: false
    };

    try {
      await multiplayerService.joinRoom(roomCode, clientSession, {
        onRoomSync: (synced) => {
          setRoomState(synced);
          setCategory(synced.category);
          setTotalRounds(synced.totalRounds);
          setAnswerMode(synced.answerMode);
          if (synced.gameType) {
            setRoomGameType(synced.gameType);
          }
          if (synced.roundTimeLimit !== undefined) {
            setRoundTimeLimit(synced.roundTimeLimit);
          }
          if (synced.autoAdvance !== undefined) {
            setAutoAdvance(synced.autoAdvance);
          }
          if (synced.songs && synced.songs.length > 0) {
            setSongs((prev) => (prev.length === 0 ? synced.songs : prev));
          }
          if (synced.currentRoundAnswers) {
            setCurrentRoundAnswers((prev) => {
              const myLocalAns = prev.find(
                (a) => a.playerId === (multiplayerService.myPlayerId || 'solo_player') ||
                       (a.playerName && a.playerName.trim().toLowerCase() === name.trim().toLowerCase())
              );
              if (myLocalAns && myLocalAns.answered) {
                const hostHasMyAns = synced.currentRoundAnswers.some(
                  (a) => a.playerId === myLocalAns.playerId || (a.playerName && a.playerName.trim().toLowerCase() === myLocalAns.playerName.trim().toLowerCase())
                );
                if (!hostHasMyAns) {
                  return [...synced.currentRoundAnswers, myLocalAns];
                }
              }
              return synced.currentRoundAnswers;
            });
          }
        },
        onGameStart: (sList, cat, rTotal, aMode, rTimeLimit, aAdvance, rStartTime) => {
          setSongs(sList);
          setCategory(cat);
          setTotalRounds(rTotal);
          setAnswerMode(aMode);
          const limit = (rTimeLimit !== undefined && rTimeLimit !== 0) ? rTimeLimit : 30;
          setRoundTimeLimit(limit);
          roundTimeLimitRef.current = limit;
          if (aAdvance !== undefined) setAutoAdvance(aAdvance);
          setCurrentRoundIndex(0);
          setCurrentRoundAnswers([]);
          resetRoundState(limit, rStartTime);
          setGameHistory([]);
          setScore(0);
          setStreak(0);
          setGameState('playing');
          setIsPlayingAudio(true);
          showToast('🚀 เริ่มเกมแล้ว! ฟังเพลงแล้วตอบเลย');
        },
        onRevealRound: (answers, updatedScores) => {
          setIsPlayingAudio(false);
          setCurrentRoundAnswers(answers);
          setRoomState((prev) => prev ? { ...prev, players: updatedScores } : null);
          const myAns = answers.find(
            (a: PlayerRoundAnswer) => a.playerId === multiplayerService.myPlayerId ||
                                     (a.playerName && a.playerName.trim().toLowerCase() === name.trim().toLowerCase())
          );
          if (myAns) {
            setSoloGuessedCorrectly(myAns.isCorrect);
            setSoloPointsEarned(myAns.pointsEarned);
            if (myAns.isCorrect) {
              setScore((prev) => prev + myAns.pointsEarned);
              setStreak((prev) => prev + 1);
            } else {
              setStreak(0);
            }
          }
          const activeIdx = currentRoundIndexRef.current;
          const activeSong = songsRef.current[activeIdx] || currentSongRef.current;
          const limit = roundTimeLimitRef.current;
          const result: RoundResult = {
            round: activeIdx + 1,
            song: activeSong,
            guessedCorrectly: myAns?.isCorrect ?? false,
            pointsEarned: myAns?.pointsEarned ?? 0,
            hintsUsedCount: 0,
            timeSpent: myAns?.timeTaken ?? (limit === 0 ? Number((Math.max(500, Date.now() - roundStartTimeRef.current) / 1000).toFixed(1)) : limit),
            playerAnswers: answers
          };
          setGameHistory((prev) => [...prev, result]);
          setGameState('round_reveal');
        },
        onNextRound: (rIndex, rStartTime) => {
          setCurrentRoundIndex(rIndex);
          setCurrentRoundAnswers([]);
          resetRoundState(roundTimeLimitRef.current, rStartTime);
          setGameState('playing');
          setIsPlayingAudio(true);
        },
        onReplaceSong: (rIndex, newSong, rStartTime) => {
          setSongs((prev) => {
            const updated = [...prev];
            updated[rIndex] = newSong;
            return updated;
          });
          resetRoundState(roundTimeLimitRef.current, rStartTime);
          setIsPlayingAudio(true);
          showToast(`🔄 หัวหน้าห้องได้สลับเพลงใหม่`);
        },
        onAnswerNotification: (notif) => {
          showToast(`⚡ ${notif.playerName} ตอบแล้ว!`);
        },
        onDraftStart: (dState) => {
          setActiveDraftState(dState);
        },
        onDraftPickProgress: (pId, pCount, isLock) => {
          setActiveDraftState((prev) => {
            if (!prev) return null;
            const next: SongDraftState = {
              ...prev,
              redPlayer: { ...prev.redPlayer },
              bluePlayer: { ...prev.bluePlayer }
            };
            if (next.redPlayer.playerId === pId) {
              next.redPlayer.pickedCount = pCount;
              next.redPlayer.isLocked = isLock;
            } else if (next.bluePlayer.playerId === pId) {
              next.bluePlayer.pickedCount = pCount;
              next.bluePlayer.isLocked = isLock;
            }
            return next;
          });
        },
        onDraftReveal: (redPicks, bluePicks, autoMatched) => {
          setActiveDraftState((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              phase: 'reveal',
              redPlayer: { ...prev.redPlayer, picks: redPicks },
              bluePlayer: { ...prev.bluePlayer, picks: bluePicks },
              autoMatchedArtists: autoMatched
            };
          });
        },
        onDraftBanProgress: (pId, _bCount, isLock, bans) => {
          setActiveDraftState((prev) => {
            if (!prev) return null;
            const next: SongDraftState = {
              ...prev,
              redPlayer: { ...prev.redPlayer },
              bluePlayer: { ...prev.bluePlayer }
            };
            if (next.redPlayer.playerId === pId) {
              next.redPlayer.isBanLocked = isLock;
              if (bans) next.redPlayer.bans = bans;
            } else if (next.bluePlayer.playerId === pId) {
              next.bluePlayer.isBanLocked = isLock;
              if (bans) next.bluePlayer.bans = bans;
            }
            return next;
          });
        },
        onDraftPhaseChange: (phase, updatedDraftState) => {
          setActiveDraftState((prev) => {
            if (updatedDraftState) {
              return {
                ...updatedDraftState,
                redPlayer: { ...updatedDraftState.redPlayer },
                bluePlayer: { ...updatedDraftState.bluePlayer }
              };
            }
            if (!prev) return null;
            return { ...prev, phase };
          });
        },
        onDraftRosterReady: (_surviving, songsList, cat, rTotal) => {
          setSongs(songsList);
          setCategory(cat);
          setTotalRounds(rTotal);
          setCurrentRoundIndex(0);
          resetRoundState();
          setGameHistory([]);
          setActiveDraftState(null);
          setGameState('playing');
          setIsPlayingAudio(true);
          showToast('🔥 เข้าสู่สมรภูมิดวล 1v1!');
        },
        onGameOver: (finalScores) => {
          setIsPlayingAudio(false);
          setRoomState((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              status: 'waiting',
              players: finalScores.map((p) => ({ ...p, status: 'viewing_summary' }))
            };
          });
          setGameState('game_over');
        },
        onReturnToLobby: () => {
          setIsPlayingAudio(false);
          setRoomState((prev) => prev ? { ...prev, status: 'waiting', currentRoundAnswers: [] } : null);
          setScore(0);
          setStreak(0);
          setGameHistory([]);
          setActiveDraftState(null);
          setGameState('category_select');
        },
        onKicked: () => {
          soundFX.playWrong();
          alert('คุณถูกหัวหน้าห้องเตะออกจากห้อง');
          handleLeaveRoom();
        },
        onRoomClosed: () => {
          soundFX.playWrong();
          alert('🚪 เจ้าของห้องได้ยุบห้องแล้ว');
          showToast('🚪 เจ้าของห้องได้ยุบห้องแล้ว');
          handleLeaveRoom();
        },
        onError: (err) => setMultiplayerError(err)
      });
      setIsHost(false);
    } catch {
      setMultiplayerError('ไม่สามารถเข้าร่วมห้องได้ โปรดตรวจสอบรหัสห้อง');
    } finally {
      setIsLoadingSongs(false);
    }
  }, [showToast, roundTimeLimit]);

  const handleCompleteDraft = useCallback(async (
    survivingArtists: string[],
    rosterDetails?: {
      redSurviving: string[];
      blueSurviving: string[];
      autoMatched: string[];
    }
  ) => {
    setIsLoadingSongs(true);
    setGameHistory([]);

    try {
      const draftCat: Category = {
        id: 'song_draft_roster',
        name: `⚔️ SongDraft 1v1 (${survivingArtists.length} ศิลปิน)`,
        thaiName: `⚔️ SongDraft 1v1 (${survivingArtists.length} ศิลปิน)`,
        emoji: '⚔️',
        badge: `${survivingArtists.length} ศิลปิน`,
        description: survivingArtists.join(', '),
        gradient: 'from-amber-500 to-red-600',
        searchQueries: survivingArtists,
        selectedArtists: survivingArtists,
        modeType: 'custom'
      };

      // 1. Determine surviving artists for Red Corner vs Blue Corner
      let redArtists = rosterDetails?.redSurviving ? [...rosterDetails.redSurviving] : [];
      let blueArtists = rosterDetails?.blueSurviving ? [...rosterDetails.blueSurviving] : [];
      const autoMatched = rosterDetails?.autoMatched ? [...rosterDetails.autoMatched] : [];

      // Fallback derivation if rosterDetails was omitted
      if (redArtists.length === 0 && blueArtists.length === 0) {
        if (activeDraftState) {
          const rPicks = activeDraftState.redPlayer?.picks || [];
          const bPicks = activeDraftState.bluePlayer?.picks || [];
          const rBans = activeDraftState.redPlayer?.bans || [];
          const bBans = activeDraftState.bluePlayer?.bans || [];
          redArtists = rPicks.filter((p) => !bBans.includes(p));
          blueArtists = bPicks.filter((p) => !rBans.includes(p));
        } else {
          const mid = Math.ceil(survivingArtists.length / 2);
          redArtists = survivingArtists.slice(0, mid);
          blueArtists = survivingArtists.slice(mid);
        }
      }

      // If one side has no surviving picks, use autoMatched or shared artists
      if (redArtists.length === 0 && autoMatched.length > 0) {
        redArtists = [...autoMatched];
      }
      if (blueArtists.length === 0 && autoMatched.length > 0) {
        blueArtists = [...autoMatched];
      }
      if (redArtists.length === 0) redArtists = [...blueArtists];
      if (blueArtists.length === 0) blueArtists = [...redArtists];

      const targetRed = Math.ceil(totalRounds / 2);
      const targetBlue = totalRounds - targetRed;

      // 2. Fetch songs in parallel for Red and Blue pools
      const redCat: Category = {
        ...draftCat,
        id: 'song_draft_roster_red',
        name: `⚔️ Red Corner`,
        searchQueries: redArtists,
        selectedArtists: redArtists
      };

      const blueCat: Category = {
        ...draftCat,
        id: 'song_draft_roster_blue',
        name: `⚔️ Blue Corner`,
        searchQueries: blueArtists,
        selectedArtists: blueArtists
      };

      const [redSongsRaw, blueSongsRaw] = await Promise.all([
        redArtists.length > 0 ? getSongsForGame(redCat, targetRed + 4) : Promise.resolve([]),
        blueArtists.length > 0 ? getSongsForGame(blueCat, targetBlue + 4) : Promise.resolve([])
      ]);

      // Deduplicate songs by ID and title+artist
      const seenKeys = new Set<string>();

      const redPool: Song[] = [];
      for (const s of redSongsRaw) {
        const key = `${cleanArtist(s.title)}___${cleanArtist(s.artist)}`;
        if (!seenKeys.has(String(s.id)) && !seenKeys.has(key)) {
          seenKeys.add(String(s.id));
          seenKeys.add(key);
          redPool.push({ ...s, draftCorner: 'red' });
        }
      }

      const bluePool: Song[] = [];
      for (const s of blueSongsRaw) {
        const key = `${cleanArtist(s.title)}___${cleanArtist(s.artist)}`;
        if (!seenKeys.has(String(s.id)) && !seenKeys.has(key)) {
          seenKeys.add(String(s.id));
          seenKeys.add(key);
          bluePool.push({ ...s, draftCorner: 'blue' });
        }
      }

      // 3. Balance allocation (50/50 target, adjusting if one pool has a deficit)
      let redCount = Math.min(targetRed, redPool.length);
      let blueCount = Math.min(targetBlue, bluePool.length);

      let remainingNeeded = totalRounds - (redCount + blueCount);
      if (remainingNeeded > 0) {
        const redSurplus = Math.max(0, redPool.length - redCount);
        const blueSurplus = Math.max(0, bluePool.length - blueCount);
        if (redCount < targetRed && blueSurplus > 0) {
          const takeBlue = Math.min(remainingNeeded, blueSurplus);
          blueCount += takeBlue;
          remainingNeeded -= takeBlue;
        } else if (blueCount < targetBlue && redSurplus > 0) {
          const takeRed = Math.min(remainingNeeded, redSurplus);
          redCount += takeRed;
          remainingNeeded -= takeRed;
        }
      }

      const selectedRed = redPool.slice(0, redCount);
      const selectedBlue = bluePool.slice(0, blueCount);

      // 4. Interleave alternating Red and Blue rounds
      const interleaved: Song[] = [];
      const rList = [...selectedRed];
      const bList = [...selectedBlue];

      const redStarts = Math.random() < 0.5;
      let currentSide: 'red' | 'blue' = redStarts ? 'red' : 'blue';

      while (rList.length > 0 || bList.length > 0) {
        if (currentSide === 'red') {
          if (rList.length > 0) interleaved.push(rList.shift()!);
          else if (bList.length > 0) interleaved.push(bList.shift()!);
          currentSide = 'blue';
        } else {
          if (bList.length > 0) interleaved.push(bList.shift()!);
          else if (rList.length > 0) interleaved.push(rList.shift()!);
          currentSide = 'red';
        }
      }

      // If still fewer than totalRounds due to sparse tracks on iTunes, backfill
      if (interleaved.length < totalRounds) {
        const fallbackSongs = await getSongsForGame(draftCat, totalRounds);
        for (const fs of fallbackSongs) {
          const key = `${cleanArtist(fs.title)}___${cleanArtist(fs.artist)}`;
          if (!seenKeys.has(String(fs.id)) && !seenKeys.has(key)) {
            seenKeys.add(String(fs.id));
            seenKeys.add(key);
            interleaved.push(fs);
            if (interleaved.length >= totalRounds) break;
          }
        }
      }

      const finalSongs = interleaved.slice(0, totalRounds);
      const preparedSongs = finalSongs.map((s) => ({
        ...s,
        choices: s.choices && s.choices.length === 4 ? s.choices : generateChoicesForSong(s, finalSongs, draftCat)
      }));

      setSongs(preparedSongs);
      setCategory(draftCat);

      if (roomState && isHost) {
        multiplayerService.hostBroadcastDraftRoster(survivingArtists, preparedSongs, draftCat, totalRounds);
      }

      setCurrentRoundIndex(0);
      resetRoundState();
      setActiveDraftState(null);
      setGameState('playing');
      setIsPlayingAudio(true);
      showToast('⚔️ เข้าสู่สมรภูมิเพลงที่รอดชีวิตจากการดวล (50/50 สมดุลสองฝั่ง)!');
    } catch (e) {
      console.error('Error preparing draft songs:', e);
      showToast('⚠️ ไม่สามารถเตรียมเพลงจากศิลปินที่รอดชีวิตได้');
    } finally {
      setIsLoadingSongs(false);
    }
  }, [totalRounds, roomState, isHost, activeDraftState, showToast]);

  useEffect(() => {
    handleCompleteDraftRef.current = handleCompleteDraft;
  }, [handleCompleteDraft]);

  const handleHostStartDraft = useCallback(() => {
    if (!roomState || !isHost) return;
    if (roomState.players.length !== 2) {
      showToast(`⚠️ โหมด SongDraft 1v1 ต้องมีผู้เล่นในห้อง 2 คนเท่านั้น (ปัจจุบันมี ${roomState.players.length} คน)`);
      return;
    }

    const redPlayer = roomState.players[0];
    const bluePlayer = roomState.players[1];

    const initialDraftState: SongDraftState = {
      phase: 'secret_pick',
      redPlayer: {
        playerId: redPlayer.id,
        playerName: redPlayer.name,
        avatar: redPlayer.avatar,
        corner: 'red',
        picks: [],
        pickedCount: 0,
        isLocked: false,
        bans: [],
        isBanLocked: false
      },
      bluePlayer: {
        playerId: bluePlayer.id,
        playerName: bluePlayer.name,
        avatar: bluePlayer.avatar,
        corner: 'blue',
        picks: [],
        pickedCount: 0,
        isLocked: false,
        bans: [],
        isBanLocked: false
      },
      autoMatchedArtists: [],
      survivingArtists: [],
      timeLeft: 60,
      isAiOpponent: false
    };

    setActiveDraftState(initialDraftState);
    multiplayerService.hostStartDraft(initialDraftState);
  }, [roomState, isHost, showToast]);

  const handleStartSoloDraft = useCallback(() => {
    const userSession: PlayerSession = {
      id: 'solo_player',
      name: playerName || 'คุณ (ผู้ท้าชิง)',
      avatar: '🎧',
      score: 0,
      streak: 0,
      isHost: true,
      hasAnsweredThisRound: false
    };

    const aiBotSession: PlayerSession = {
      id: 'ai_bot',
      name: '🤖 บอทนักดวล AI',
      avatar: '🤖',
      score: 0,
      streak: 0,
      isHost: false,
      hasAnsweredThisRound: false
    };

    const initialDraftState: SongDraftState = {
      phase: 'secret_pick',
      redPlayer: {
        playerId: userSession.id,
        playerName: userSession.name,
        avatar: userSession.avatar,
        corner: 'red',
        picks: [],
        pickedCount: 0,
        isLocked: false,
        bans: [],
        isBanLocked: false
      },
      bluePlayer: {
        playerId: aiBotSession.id,
        playerName: aiBotSession.name,
        avatar: aiBotSession.avatar,
        corner: 'blue',
        picks: [],
        pickedCount: 0,
        isLocked: false,
        bans: [],
        isBanLocked: false
      },
      autoMatchedArtists: [],
      survivingArtists: [],
      timeLeft: 60,
      isAiOpponent: true
    };

    setActiveDraftState(initialDraftState);
  }, [playerName]);

  // Landing Page Quick Action Handlers
  const handleLandingSolo = () => {
    soundFX.playClick();
    setCategorySelectInitialTab('solo');
    setGameState('category_select');
  };

  const handleLandingDraft = () => {
    soundFX.playClick();
    handleStartSoloDraft();
  };

  const handleLandingCreateRoom = () => {
    soundFX.playClick();
    setCategorySelectInitialTab('create_room');
    setGameState('category_select');
    setRoundTimeLimit(30);
    handleCreateOnlineRoom(playerName, category, totalRounds, answerMode);
  };

  const handleLandingJoinRoom = () => {
    soundFX.playClick();
    setCategorySelectInitialTab('join_room');
    setGameState('category_select');
  };

  const handleHostStartGame = async () => {
    if (!roomState || !isHost) return;
    setIsLoadingSongs(true);
    setGameHistory([]);

    try {
      const fetchedSongs = await getSongsForGame(category, totalRounds);
      const preparedSongs = fetchedSongs.map((s) => ({
        ...s,
        choices: s.choices && s.choices.length === 4 ? s.choices : generateChoicesForSong(s, fetchedSongs, category)
      }));
      setSongs(preparedSongs);

      const now = Date.now();
      const effectiveLimit = (!roomState.roundTimeLimit || roomState.roundTimeLimit === 0) ? 30 : roomState.roundTimeLimit;
      multiplayerService.hostStartGame(preparedSongs, category, totalRounds, answerMode, effectiveLimit, autoAdvance, now);

      setCurrentRoundIndex(0);
      setCurrentRoundAnswers([]);
      resetRoundState(effectiveLimit, now);
      setGameState('playing');
      setIsPlayingAudio(true);
    } catch (e) {
      console.error('Error starting game:', e);
    } finally {
      setIsLoadingSongs(false);
    }
  };

  const handleUpdateRoomSettings = useCallback((
    newCat: Category,
    newRounds: number,
    newMode: AnswerMode,
    newTimeLimit?: number,
    newAutoAdvance?: boolean
  ) => {
    const rawLimit = newTimeLimit !== undefined ? newTimeLimit : roundTimeLimit;
    const tLimit = (!rawLimit || rawLimit === 0) ? 30 : rawLimit;
    const aAdv = newAutoAdvance !== undefined ? newAutoAdvance : autoAdvance;
    setRoundTimeLimit(tLimit);
    if (newAutoAdvance !== undefined) setAutoAdvance(newAutoAdvance);
    setCategory(newCat);
    setTotalRounds(newRounds);
    setAnswerMode(newMode);
    setRoomState((prev) => (prev ? {
      ...prev,
      category: newCat,
      totalRounds: newRounds,
      answerMode: newMode,
      roundTimeLimit: tLimit,
      autoAdvance: aAdv
    } : null));
    multiplayerService.hostUpdateSettings(newCat, newRounds, newMode, tLimit, aAdv, roomState?.gameType || roomGameType);
    showToast(`⚙️ บันทึกการตั้งค่าห้องแล้ว`);
  }, [roundTimeLimit, autoAdvance, showToast, roomState?.gameType, roomGameType]);

  const handleExitGame = useCallback(() => {
    soundFX.playClick();
    setIsPlayingAudio(false);
    multiplayerService.leaveRoom();
    setRoomState(null);
    setIsHost(false);
    setActiveDraftState(null);
    setGameState('landing');
    if (typeof window !== 'undefined' && window.location.search) {
      window.history.replaceState({}, '', window.location.pathname);
    }
  }, []);

  // -------------------------------------------------------------
  // 3. GUESS & ANSWER SUBMISSION (Locks until time up or all answered)
  // -------------------------------------------------------------
  const handleGuess = (guessText: string) => {
    const myAns = roomState
      ? currentRoundAnswers.find((a) => a.playerId === (multiplayerService.myPlayerId || 'solo_player'))
      : null;
    const isAnswerLocked = roomState ? !!myAns?.answered : hasAnsweredThisRound;
    if (isAnswerLocked || gameState !== 'playing') return;

    setSelectedChoice(guessText);
    setHasAnsweredThisRound(true);

    const now = Date.now();
    const elapsedMs = Math.max(500, now - roundStartTimeRef.current);
    const timeSpent = Number((elapsedMs / 1000).toFixed(1));

    const isCorrect = isSongMatch(guessText, currentSong);
    const pointsGained = isCorrect ? calculateRoundScore(timeSpent, roundPoints) : 0;

    const isMulti = !!roomState;

    if (!isMulti) {
      if (isCorrect) {
        soundFX.playCorrect();
        setScore((prev) => prev + pointsGained);
        setStreak((prev) => prev + 1);
      } else {
        soundFX.playWrong();
        setStreak(0);
      }
    } else {
      // In multiplayer: only play click sound, do not reveal correctness sound until round reveal modal
      soundFX.playClick();
    }

    setSoloGuessedCorrectly(isCorrect);
    setSoloPointsEarned(pointsGained);

    const myAnswer: PlayerRoundAnswer = {
      playerId: multiplayerService.myPlayerId || 'solo_player',
      playerName,
      avatar: '🎧',
      answered: true,
      isCorrect,
      answerText: guessText,
      pointsEarned: pointsGained,
      timeTaken: timeSpent
    };

    // Solo Mode: immediately reveal and record history
    if (!isMulti) {
      setIsPlayingAudio(false);
      setCurrentRoundAnswers([myAnswer]);
      const result: RoundResult = {
        round: currentRoundIndex + 1,
        song: currentSong,
        guessedCorrectly: isCorrect,
        guessedTitle: guessText,
        pointsEarned: pointsGained,
        hintsUsedCount: 0,
        timeSpent: timeSpent,
        playerAnswers: [myAnswer]
      };
      setGameHistory((prev) => [...prev, result]);
      setGameState('round_reveal');
      return;
    }

    // Multiplayer Mode: send answer to room
    const newAnswers = [...currentRoundAnswers.filter((a) => a.playerId !== myAnswer.playerId), myAnswer];
    setCurrentRoundAnswers(newAnswers);

    if (isHost && roomState) {
      multiplayerService.hostRecordAnswer(myAnswer);
    } else {
      multiplayerService.submitGuestAnswer(myAnswer);
    }
  };

  const handleSkip = () => {
    handleGuess('ข้าม');
  };

  // Proceed to Next Round or Final Game Over
  const handleProceedNextRound = () => {
    const nextIndex = currentRoundIndex + 1;
    if (nextIndex >= totalRounds || nextIndex >= songs.length) {
      if (isHost && roomState) {
        multiplayerService.hostGameOver(roomState.players);
      }
      setGameState('game_over');
    } else {
      if (isHost && roomState) {
        multiplayerService.hostNextRound(nextIndex);
      } else if (!roomState) {
        setCurrentRoundIndex(nextIndex);
        resetRoundState();
        setCurrentRoundAnswers([]);
        setGameState('playing');
        setIsPlayingAudio(true);
      }
    }
  };

  return (
    <div className="app-container">
      {/* Toast Notification */}
      {liveNotification && (
        <div className="multiplayer-toast">
          {liveNotification}
        </div>
      )}

      {/* Landing Page (Initial Screen) */}
      {gameState === 'landing' && !activeDraftState && (
        <LandingPage
          onStartSolo={handleLandingSolo}
          onStartDraft={handleLandingDraft}
          onCreateRoom={handleLandingCreateRoom}
          onJoinRoom={handleLandingJoinRoom}
        />
      )}

      {/* Lobby / Category Select Modal */}
      {gameState === 'category_select' && !activeDraftState && (
        <CategorySelectModal
          initialTab={categorySelectInitialTab}
          onBackToLanding={() => setGameState('landing')}
          onStartSolo={handleStartSolo}
          onStartCustomArtist={handleStartCustomArtist}
          onCreateOnlineRoom={handleCreateOnlineRoom}
          onJoinOnlineRoom={handleJoinOnlineRoom}
          onLeaveRoom={handleLeaveRoom}
          onKickPlayer={isHost ? handleKickPlayer : undefined}
          roomState={roomState}
          isHost={isHost}
          onHostStartGame={handleHostStartGame}
          onUpdateRoomSettings={handleUpdateRoomSettings}
          isLoading={isLoadingSongs}
          multiplayerError={multiplayerError}
          roundTimeLimit={roundTimeLimit}
          onRoundTimeLimitChange={(val) => {
            setRoundTimeLimit(val);
            storageService.setRoundTimeLimit(val);
          }}
          autoAdvance={autoAdvance}
          onAutoAdvanceChange={(val) => {
            setAutoAdvance(val);
            storageService.setAutoAdvance(val);
          }}
          currentAnswerMode={answerMode}
          onAnswerModeChange={(mode) => {
            setAnswerMode(mode);
            storageService.setAnswerMode(mode);
          }}
          currentTotalRounds={totalRounds}
          onTotalRoundsChange={(cnt) => {
            setTotalRounds(cnt);
            storageService.setTotalRounds(cnt);
          }}
          onStartSoloDraft={handleStartSoloDraft}
          onHostStartDraft={handleHostStartDraft}
          roomGameType={roomState?.gameType || roomGameType}
          onRoomGameTypeChange={(type) => {
            setRoomGameType(type);
            if (roomState && isHost) {
              setRoomState((prev) => (prev ? { ...prev, gameType: type } : null));
              multiplayerService.hostUpdateSettings(
                roomState.category,
                roomState.totalRounds,
                roomState.answerMode,
                roomState.roundTimeLimit ?? roundTimeLimit,
                roomState.autoAdvance ?? autoAdvance,
                type
              );
            }
          }}
        />
      )}

      {/* SongDraft 1v1 Arena Overlay */}
      {activeDraftState && (
        <SongDraftArena
          draftState={activeDraftState}
          myPlayerId={multiplayerService.myPlayerId || 'solo_player'}
          isHost={isHost}
          onDraftPhaseChange={(newPhase) => {
            setActiveDraftState((prev) => (prev ? { ...prev, phase: newPhase } : null));
            if (roomState && isHost) {
              multiplayerService.hostChangeDraftPhase(newPhase);
            }
          }}
          onSendPickProgress={(pCount, isLock) => {
            multiplayerService.sendDraftPickProgress(pCount, isLock);
          }}
          onSendSubmitPicks={(picks) => {
            multiplayerService.sendDraftSubmitPicks(picks);
          }}
          onSendBanProgress={(bCount, isLock) => {
            multiplayerService.sendDraftBanProgress(bCount, isLock);
          }}
          onSendSubmitBans={(bans) => {
            multiplayerService.sendDraftSubmitBans(bans);
          }}
          onCompleteDraft={handleCompleteDraft}
          onExitDraft={() => {
            setActiveDraftState(null);
            if (roomState) {
              setRoomState((prev) => (prev ? { ...prev, status: 'waiting' } : null));
            } else {
              setGameState('category_select');
            }
          }}
        />
      )}

      {/* Main Playing Interface */}
      {currentSong && gameState === 'playing' && (
        <div className={`game-play-layout ${roomState && roomState.players.length > 0 ? 'has-multiplayer-sidebar' : ''}`}>
          <main className="game-card-main">
          {/* Synchronized Round Countdown Bar */}
          <div className={`round-timer-header ${roundTimeLimit === 0 ? 'unlimited' : ''}`}>
            <div className="timer-track-bar">
              <div
                className={`timer-fill-bar ${
                  roundTimeLimit === 0
                    ? 'unlimited'
                    : roundTimeLeft <= 5
                    ? 'critical'
                    : roundTimeLeft <= 10
                    ? 'warning'
                    : ''
                }`}
                style={{ width: roundTimeLimit === 0 ? '100%' : `${(roundTimeLeft / roundTimeLimit) * 100}%` }}
              />
            </div>
            <div className="timer-label-row">
              <span className={`timer-seconds-badge ${roundTimeLimit === 0 ? 'unlimited' : ''}`}>
                {roundTimeLimit === 0 ? (
                  '♾️ ไม่จำกัดเวลา (ทายเพลงตามสบาย)'
                ) : (
                  <>⏳ เหลือเวลา <strong>{roundTimeLeft}</strong> วินาที</>
                )}
              </span>
              {roomState && (
                <span className="answered-players-count">
                  ตอบแล้ว {currentRoundAnswers.filter((a) => a.answered).length}/{roomState.players.length} คน
                </span>
              )}
            </div>
          </div>

          {/* Top Status Header */}
          <Header
            currentRound={currentRoundIndex + 1}
            totalRounds={totalRounds}
            score={score}
            streak={streak}
            playerName={playerName}
            roomCode={roomState?.code}
            players={roomState?.players}
            roundHistory={gameHistory.map((r) => r.guessedCorrectly)}
            onExit={handleExitGame}
          />

          {/* 1v1 Versus Scoreboard Bar (Red vs Blue Corner) */}
          {roomState && roomState.players.length === 2 && (
            <div className="versus-duel-strip">
              <div className="v-corner-side red">
                <span className="v-avatar">{roomState.players[0].avatar || '👑'}</span>
                <div className="v-meta">
                  <strong className="v-player-name">{roomState.players[0].name}</strong>
                  <span className="v-player-score">{roomState.players[0].score} คะแนน</span>
                  {category.id === 'song_draft_roster' && currentSong.draftCorner === 'red' && (
                    <span className="v-draft-turn-badge red">🎯 ศิลปินฝั่งแดง</span>
                  )}
                </div>
              </div>
              <div className="v-badge-center">
                <span>VS</span>
              </div>
              <div className="v-corner-side blue">
                <div className="v-meta right">
                  <strong className="v-player-name">{roomState.players[1].name}</strong>
                  <span className="v-player-score">{roomState.players[1].score} คะแนน</span>
                  {category.id === 'song_draft_roster' && currentSong.draftCorner === 'blue' && (
                    <span className="v-draft-turn-badge blue">🎯 ศิลปินฝั่งน้ำเงิน</span>
                  )}
                </div>
                <span className="v-avatar">{roomState.players[1].avatar || '🎧'}</span>
              </div>
            </div>
          )}

          {/* Central Music Screen Area */}
          <PlayerScreen
            song={currentSong}
            isPlaying={isPlayingAudio}
            onTogglePlay={() => setIsPlayingAudio(!isPlayingAudio)}
            onAlternativeAudio={handleAlternativeAudio}
          />

          {/* 3 Essential Hint Cards & Lifelines */}
          <HintCards
            song={currentSong}
            hints={hints}
            currentScore={score}
            answerMode={answerMode}
            onInsufficientScore={(cost) => {
              showToast(`⚠️ คะแนนสะสมไม่พอ (ต้องใช้ ${cost} คะแนน แต่คุณมี ${score} คะแนน)`);
            }}
            onRevealHint={(type, cost) => {
              if (hints[type]) return;
              if (score < cost) {
                soundFX.playWrong();
                showToast(`⚠️ คะแนนสะสมไม่พอ (ต้องใช้ ${cost} คะแนน)`);
                return;
              }

              setHints((prev) => ({ ...prev, [type]: true }));

              // Deduct cost from accumulated score
              setScore((prevScore) => Math.max(0, (prevScore || 0) - cost));

              // If 50:50 is activated on 4 choices, eliminate 2 incorrect choices
              if (type === 'fiftyFifty' && answerMode === 'multiple_choice' && currentSong) {
                const wrongChoices = currentChoices.filter((c) => !isSongMatch(c, currentSong));
                const shuffledWrong = [...wrongChoices].sort(() => Math.random() - 0.5);
                const toEliminate = shuffledWrong.slice(0, 2);
                setEliminatedChoices(toEliminate);
              }

              // Also update room state player score if in multiplayer
              if (roomState) {
                setRoomState((prev) => {
                  if (!prev) return null;
                  const myId = multiplayerService.myPlayerId;
                  return {
                    ...prev,
                    players: prev.players.map((p) =>
                      p.id === myId ? { ...p, score: Math.max(0, p.score - cost) } : p
                    )
                  };
                });
              }

              showToast(`💡 เปิดตัวช่วย (-${cost} คะแนน)`);
            }}
          />

          {/* Answer Controls: 4 Choices vs Typing */}
          {(() => {
            const myAns = roomState
              ? currentRoundAnswers.find((a) => a.playerId === (multiplayerService.myPlayerId || 'solo_player'))
              : null;
            const isAnswerLocked = roomState ? !!myAns?.answered : hasAnsweredThisRound;

            if (isAnswerLocked) {
              return (
                <div className="has-answered-banner">
                  <div className="banner-icon">👍</div>
                  <div className="banner-text">
                    <strong>คุณส่งคำตอบแล้ว!</strong>
                    <p>
                      {roomState
                        ? 'กำลังรอเพื่อนๆ ตอบ หรือรอหมดเวลาเพื่อเฉลยพร้อมกัน...'
                        : 'กำลังรอดูเฉลย...'}
                    </p>
                  </div>
                </div>
              );
            }

            if (answerMode === 'multiple_choice') {
              return (
                <MultipleChoiceBar
                  choices={currentChoices}
                  targetTitle={currentSong.title}
                  onSelectChoice={handleGuess}
                  disabled={isAnswerLocked || gameState !== 'playing'}
                  selectedChoice={selectedChoice}
                  eliminatedChoices={eliminatedChoices}
                />
              );
            }

            return (
              <GuessBar
                availableSongs={allAvailableSuggestions}
                targetSong={currentSong}
                onGuess={handleGuess}
                onSkip={handleSkip}
                disabled={isAnswerLocked || gameState !== 'playing'}
                disableDropdown={answerMode === 'text_pure'}
              />
            );
          })()}
        </main>

        {/* Multiplayer Dedicated Players Column (Sidebar) */}
        {roomState && roomState.players.length > 0 && (
          <aside className="game-players-sidebar">
            <div className="game-sidebar-header">
              <div className="sidebar-header-title">
                <span className="sidebar-header-icon">👥</span>
                <span className="sidebar-title-text">ผู้เล่นในห้อง</span>
                <span className="sidebar-players-count">{roomState.players.length}</span>
              </div>
              <span className="sidebar-answered-badge">
                ตอบแล้ว {currentRoundAnswers.filter((a) => a.answered).length}/{roomState.players.length}
              </span>
            </div>

            <div className="game-sidebar-players-list">
              {[...roomState.players]
                .sort((a, b) => b.score - a.score)
                .map((p, idx) => {
                  const ans = currentRoundAnswers.find((a) => a.playerId === p.id);
                  const isMe = p.id === (multiplayerService.myPlayerId || 'solo_player');
                  const isHostPlayer = p.isHost;

                  return (
                    <div
                      key={p.id}
                      className={`sidebar-player-card ${ans?.answered ? 'has-answered' : 'is-answering'} ${isMe ? 'is-self' : ''}`}
                    >
                      <div className="sidebar-player-rank">
                        {idx === 0 ? '🥇' : idx === 1 ? '🥈' : idx === 2 ? '🥉' : `#${idx + 1}`}
                      </div>

                      <div className="sidebar-player-avatar-wrap">
                        <span className="sidebar-player-avatar">{p.avatar || '🎧'}</span>
                        {isHostPlayer && <span className="sidebar-crown" title="หัวหน้าห้อง">👑</span>}
                      </div>

                      <div className="sidebar-player-info">
                        <div className="sidebar-name-row">
                          <span className="sidebar-player-name" title={p.name}>{p.name}</span>
                          {isMe && <span className="sidebar-you-tag">คุณ</span>}
                        </div>
                        <span className="sidebar-player-score">{p.score} คะแนน</span>
                      </div>

                      <div className="sidebar-player-status">
                        {ans?.answered ? (
                          <span className="sidebar-status-tag answered" title="ส่งคำตอบแล้ว">
                            ✓ {typeof ans.timeTaken === 'number' && ans.timeTaken > 0 ? `${Number.isInteger(ans.timeTaken) ? ans.timeTaken : ans.timeTaken.toFixed(1)}s` : 'ตอบแล้ว'}
                          </span>
                        ) : (
                          <span className="sidebar-status-tag listening" title="กำลังคิด/ฟังเพลง">
                            กำลังฟัง...
                          </span>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>

            {roomState.code && (
              <div className="game-sidebar-footer">
                <span className="sidebar-room-pill">ห้อง: <strong>{roomState.code}</strong></span>
                <span className="sidebar-footer-hint">เฉลยพร้อมกันเมื่อครบทุกคน</span>
              </div>
            )}
          </aside>
        )}
      </div>
      )}

      {/* Round Reveal & Live Leaderboard Modal */}
      {gameState === 'round_reveal' && (
        <RoundSummaryModal
          round={currentRoundIndex + 1}
          totalRounds={totalRounds}
          song={currentSong}
          playerAnswers={currentRoundAnswers}
          players={roomState?.players || []}
          isLastRound={currentRoundIndex + 1 >= totalRounds || currentRoundIndex + 1 >= songs.length}
          isHost={isHost}
          isSolo={!roomState}
          myPlayerId={multiplayerService.myPlayerId}
          soloGuessedCorrectly={soloGuessedCorrectly}
          soloPointsEarned={soloPointsEarned}
          autoAdvance={autoAdvance}
          onToggleAutoAdvance={!roomState ? () => setAutoAdvance((prev) => !prev) : undefined}
          onProceedNextRound={handleProceedNextRound}
          onExit={handleExitGame}
        />
      )}

      {/* Final Game Over Podium Modal */}
      {gameState === 'game_over' && (
        <GameOverModal
          score={score}
          totalRounds={totalRounds}
          history={gameHistory}
          category={category}
          players={roomState?.players}
          myPlayerId={multiplayerService.myPlayerId}
          onLeaveRoom={roomState ? handleLeaveRoom : undefined}
          onPlayAgain={() => {
            if (roomState) {
              if (isHost) {
                multiplayerService.hostReturnToLobby();
              } else {
                multiplayerService.guestReturnToLobby();
              }
              setRoomState((prev) => {
                if (!prev) return null;
                return {
                  ...prev,
                  status: 'waiting',
                  currentRoundAnswers: [],
                  players: prev.players.map((p) =>
                    p.id === multiplayerService.myPlayerId ? { ...p, status: 'ready' } : p
                  )
                };
              });
              setScore(0);
              setStreak(0);
              setGameHistory([]);
              setActiveDraftState(null);
              setGameState('category_select');
            } else {
              handleStartSolo(category, totalRounds, answerMode);
            }
          }}
          onBackToLobby={() => {
            if (roomState) {
              if (isHost) {
                multiplayerService.hostReturnToLobby();
              } else {
                multiplayerService.guestReturnToLobby();
              }
              setRoomState((prev) => {
                if (!prev) return null;
                return {
                  ...prev,
                  status: 'waiting',
                  currentRoundAnswers: [],
                  players: prev.players.map((p) =>
                    p.id === multiplayerService.myPlayerId ? { ...p, status: 'ready' } : p
                  )
                };
              });
              setScore(0);
              setStreak(0);
              setGameHistory([]);
              setActiveDraftState(null);
              setGameState('category_select');
            } else {
              multiplayerService.destroy();
              setRoomState(null);
              setIsHost(false);
              setGameState('landing');
            }
          }}
        />
      )}

    </div>
  );
};

export default App;
