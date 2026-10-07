import mqtt, { type MqttClient } from 'mqtt';
import type { PlayerSession, RoomState, Song, AnswerMode, Category, SongDraftState, SongDraftPhase, RoomGameType, PlayerStatus } from '../types';
import { calculateRoundScore } from '../utils/scoreCalculator';

export type MultiplayerMessage =
  | { type: 'JOIN_REQUEST'; player: PlayerSession }
  | { type: 'LEAVE_ROOM'; playerId: string }
  | { type: 'KICK_PLAYER'; targetPlayerId: string }
  | { type: 'ROOM_CLOSED' }
  | { type: 'ROOM_SYNC'; state: RoomState }
  | { type: 'START_GAME'; songs: Song[]; category: Category; totalRounds: number; answerMode: AnswerMode; roundTimeLimit?: number; autoAdvance?: boolean; roundStartTime?: number }
  | { type: 'SUBMIT_ANSWER'; playerId: string; playerName?: string; avatar?: string; guessText: string; isCorrect: boolean; pointsEarned: number; timeTaken: number }
  | { type: 'ANSWER_ACK'; playerId: string }
  | { type: 'ANSWER_NOTIFICATION'; playerName: string; isCorrect: boolean; points: number; isFirst: boolean }
  | { type: 'REVEAL_ROUND'; answers: any[]; updatedScores: PlayerSession[] }
  | { type: 'NEXT_ROUND'; roundIndex: number; roundStartTime?: number }
  | { type: 'REPLACE_CURRENT_SONG'; roundIndex: number; newSong: Song; roundStartTime?: number }
  | { type: 'GAME_OVER'; finalScores: PlayerSession[] }
  | { type: 'HEARTBEAT'; playerId: string }
  | { type: 'RETURN_TO_LOBBY' }
  | { type: 'REQUEST_RETURN_TO_LOBBY'; playerId?: string }
  | { type: 'PLAYER_STATUS_UPDATE'; playerId: string; status: PlayerStatus }
  | { type: 'DRAFT_START'; draftState: SongDraftState }
  | { type: 'DRAFT_PICK_PROGRESS'; playerId: string; pickedCount: number; isLocked: boolean }
  | { type: 'DRAFT_SUBMIT_PICKS'; playerId: string; picks: string[] }
  | { type: 'DRAFT_REVEAL'; redPicks: string[]; bluePicks: string[]; autoMatched: string[] }
  | { type: 'DRAFT_BAN_PROGRESS'; playerId: string; bannedCount: number; isBanLocked: boolean; bans?: string[] }
  | { type: 'DRAFT_SUBMIT_BANS'; playerId: string; bans: string[] }
  | { type: 'DRAFT_PHASE_CHANGE'; phase: SongDraftPhase; draftState?: SongDraftState }
  | { type: 'DRAFT_ROSTER_READY'; survivingArtists: string[]; songs: Song[]; category: Category; totalRounds: number };

export interface MultiplayerCallbacks {
  onRoomSync: (state: RoomState) => void;
  onGameStart: (songs: Song[], category: Category, totalRounds: number, answerMode: AnswerMode, roundTimeLimit?: number, autoAdvance?: boolean, roundStartTime?: number) => void;
  onRevealRound: (answers: any[], updatedScores: PlayerSession[]) => void;
  onNextRound: (roundIndex: number, roundStartTime?: number) => void;
  onAnswerNotification: (notif: { playerName: string; isCorrect: boolean; points: number; isFirst: boolean }) => void;
  onPlayerAnswerSubmit?: (answer: any, allRoundAnswers: any[]) => void;
  onReplaceSong?: (roundIndex: number, newSong: Song, roundStartTime?: number) => void;
  onGameOver: (finalScores: PlayerSession[]) => void;
  onReturnToLobby?: () => void;
  onKicked?: () => void;
  onRoomClosed?: () => void;
  onDraftStart?: (draftState: SongDraftState) => void;
  onDraftPickProgress?: (playerId: string, pickedCount: number, isLocked: boolean) => void;
  onDraftReveal?: (redPicks: string[], bluePicks: string[], autoMatched: string[]) => void;
  onDraftBanProgress?: (playerId: string, bannedCount: number, isBanLocked: boolean, bans?: string[]) => void;
  onDraftPhaseChange?: (phase: SongDraftPhase, draftState?: SongDraftState) => void;
  onDraftBansComplete?: (survivingArtists: string[]) => void;
  onDraftRosterReady?: (survivingArtists: string[], songs: Song[], category: Category, totalRounds: number) => void;
  onError: (err: string) => void;
  onConnected?: () => void;
}


class MultiplayerService {
  private client: MqttClient | null = null;
  public isHost: boolean = false;
  public roomCode: string = '';
  public myPlayerId: string = '';
  public myPlayerName: string = '';
  private answerAckCallbacks: Set<(playerId: string) => void> = new Set();
  private currentRoomState: RoomState | null = null;
  private callbacks: MultiplayerCallbacks | null = null;
  private heartbeatTimer: number | null = null;
  private banPhaseTimeout: any = null;

  // Generate 4-character room code (without SG- prefix)
  generateRoomCode(): string {
    const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
    let code = '';
    for (let i = 0; i < 4; i++) {
      code += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return code;
  }

  getTopic(code: string): string {
    const clean = code.toUpperCase().trim().replace(/^SG-?/i, '');
    return `songguessr/v1/rooms/${clean}`;
  }

  // Create Room as Host
  createRoom(
    hostPlayer: PlayerSession,
    initialCategory: Category,
    totalRounds: number,
    answerMode: AnswerMode,
    callbacks: MultiplayerCallbacks,
    roundTimeLimit: number = 30,
    autoAdvance: boolean = true
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      this.destroy();
      this.isHost = true;
      this.callbacks = callbacks;
      this.myPlayerId = hostPlayer.id;
      this.myPlayerName = hostPlayer.name;

      const code = this.generateRoomCode();
      this.roomCode = code;

      const effectiveTimeLimit = (!roundTimeLimit || roundTimeLimit === 0) ? 30 : roundTimeLimit;

      this.currentRoomState = {
        code,
        hostId: hostPlayer.id,
        players: [{ ...hostPlayer, status: 'ready' }],
        category: initialCategory,
        totalRounds,
        answerMode,
        roundTimeLimit: effectiveTimeLimit,
        autoAdvance,
        currentRound: 1,
        status: 'waiting',
        songs: [],
        currentSongIndex: 0,
        roundTimeLeft: effectiveTimeLimit,
        currentRoundAnswers: []
      };

      const brokerUrl = 'wss://broker.emqx.io:8084/mqtt';
      const clientId = `host_${hostPlayer.id}_${Math.random().toString(16).slice(2, 8)}`;
      const topic = this.getTopic(code);
      const willPayload = JSON.stringify({ type: 'ROOM_CLOSED' });

      try {
        this.client = mqtt.connect(brokerUrl, {
          clientId,
          clean: true,
          keepalive: 15,
          reschedulePings: true,
          connectTimeout: 8000,
          reconnectPeriod: 1500,
          will: {
            topic,
            payload: willPayload,
            qos: 1,
            retain: false
          }
        });

        this.client.on('connect', () => {
          this.client?.subscribe(topic, { qos: 1 }, (err) => {
            if (err) {
              callbacks.onError('ไม่สามารถสร้างห้องได้ กรุณาลองใหม่อีกครั้ง');
              reject(err);
            } else {
              if (callbacks.onConnected) callbacks.onConnected();
              if (this.currentRoomState) {
                callbacks.onRoomSync(this.currentRoomState);
              }
              resolve(code);
            }
          });
        });

        this.client.on('message', (_topic, payload) => {
          try {
            const msg: MultiplayerMessage = JSON.parse(payload.toString());
            // Drop messages echoed back from the broker that were sent by this host
            if ('playerId' in msg && msg.playerId === this.myPlayerId) {
              return;
            }
            this.handleHostMessage(msg);
          } catch (e) {
            console.warn('Malformed message:', e);
          }
        });

        this.client.on('error', (err) => {
          console.error('MQTT error:', err);
          callbacks.onError('เกิดข้อผิดพลาดในการเชื่อมต่อเซิร์ฟเวอร์');
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  // Join Room as Client
  joinRoom(
    code: string,
    player: PlayerSession,
    callbacks: MultiplayerCallbacks
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      this.destroy();
      this.isHost = false;
      const cleanCode = code.toUpperCase().trim().replace(/^SG-?/i, '');
      this.roomCode = cleanCode;
      this.callbacks = callbacks;
      this.myPlayerId = player.id;
      this.myPlayerName = player.name;

      const brokerUrl = 'wss://broker.emqx.io:8084/mqtt';
      const clientId = `client_${player.id}_${Math.random().toString(16).slice(2, 8)}`;
      const topic = this.getTopic(cleanCode);
      const willPayload = JSON.stringify({ type: 'LEAVE_ROOM', playerId: player.id });

      try {
        this.client = mqtt.connect(brokerUrl, {
          clientId,
          clean: true,
          keepalive: 15,
          reschedulePings: true,
          connectTimeout: 8000,
          reconnectPeriod: 1500,
          will: {
            topic,
            payload: willPayload,
            qos: 1,
            retain: false
          }
        });

        this.client.on('connect', () => {
          const topic = this.getTopic(cleanCode);
          this.client?.subscribe(topic, { qos: 1 }, (err) => {
            if (err) {
              callbacks.onError('ไม่สามารถเข้าร่วมห้องได้');
              reject(err);
            } else {
              // Announce join to host
              this.publish({
                type: 'JOIN_REQUEST',
                player
              });

              // Retry sending JOIN_REQUEST until ROOM_SYNC is received
              let retries = 0;
              const retryTimer = setInterval(() => {
                if (this.currentRoomState || retries >= 8 || !this.client) {
                  clearInterval(retryTimer);
                  return;
                }
                retries++;
                this.publish({
                  type: 'JOIN_REQUEST',
                  player
                });
              }, 1200);

              if (callbacks.onConnected) callbacks.onConnected();
              resolve();
            }
          });
        });

        this.client.on('message', (_topic, payload) => {
          try {
            const msg: MultiplayerMessage = JSON.parse(payload.toString());
            // Drop messages echoed back from the broker that were sent by this guest (except targeted ACKs)
            if ('playerId' in msg && msg.playerId === this.myPlayerId && msg.type !== 'ANSWER_ACK') {
              return;
            }
            this.handleClientMessage(msg);
          } catch (e) {
            console.warn('Malformed message:', e);
          }
        });

        this.client.on('error', (err) => {
          console.error('MQTT error:', err);
          callbacks.onError('เกิดข้อผิดพลาดในการเชื่อมต่อไปยังห้องนี้');
        });
      } catch (err) {
        reject(err);
      }
    });
  }

  // Host Message Processor
  private handleHostMessage(msg: MultiplayerMessage) {
    if (!this.callbacks || !this.currentRoomState) return;

    if (msg.type === 'JOIN_REQUEST') {
      const trimmedName = msg.player.name.trim().toLowerCase();
      const existingIdx = this.currentRoomState.players.findIndex(
        (p) => p.id === msg.player.id || (!p.isHost && p.name.trim().toLowerCase() === trimmedName)
      );

      if (existingIdx >= 0) {
        this.currentRoomState.players[existingIdx] = {
          ...this.currentRoomState.players[existingIdx],
          id: msg.player.id,
          name: msg.player.name,
          avatar: msg.player.avatar,
          status: this.currentRoomState.players[existingIdx].status || 'ready'
        };
      } else {
        this.currentRoomState.players.push({
          ...msg.player,
          status: msg.player.status || 'ready'
        });
      }

      // Broadcast updated room state to all clients
      this.callbacks.onRoomSync({ ...this.currentRoomState });
      this.publish({
        type: 'ROOM_SYNC',
        state: { ...this.currentRoomState }
      });
    } else if (msg.type === 'LEAVE_ROOM') {
      this.currentRoomState.players = this.currentRoomState.players.filter(
        (p) => p.id !== msg.playerId
      );
      this.callbacks.onRoomSync({ ...this.currentRoomState });
      this.publish({
        type: 'ROOM_SYNC',
        state: { ...this.currentRoomState }
      });
    } else if (msg.type === 'SUBMIT_ANSWER') {
      const trimmedMsgName = msg.playerName?.trim().toLowerCase();
      // Find player by ID or by playerName fallback
      const player = this.currentRoomState.players.find(
        (p) => p.id === msg.playerId || (trimmedMsgName && p.name.trim().toLowerCase() === trimmedMsgName)
      );
      if (player) {
        player.hasAnsweredThisRound = true;
        player.lastAnswerCorrect = msg.isCorrect;
      }

      // Authoritative score verification: enforce identical, monotonic scoring across all clients
      const verifiedTime = typeof msg.timeTaken === 'number' && msg.timeTaken > 0 ? msg.timeTaken : 1;
      const verifiedPoints = msg.isCorrect ? calculateRoundScore(verifiedTime, 100) : 0;

      const effectivePlayerId = player ? player.id : msg.playerId;
      const effectivePlayerName = player ? player.name : (msg.playerName || 'ผู้เล่น');
      const effectiveAvatar = player ? player.avatar : (msg.avatar || '🎧');

      const answerRecord = {
        playerId: effectivePlayerId,
        playerName: effectivePlayerName,
        avatar: effectiveAvatar,
        answered: true,
        isCorrect: msg.isCorrect,
        answerText: msg.guessText,
        pointsEarned: verifiedPoints,
        timeTaken: verifiedTime
      };

      if (!this.currentRoomState.currentRoundAnswers) {
        this.currentRoomState.currentRoundAnswers = [];
      }
      this.currentRoomState.currentRoundAnswers = [
        ...this.currentRoomState.currentRoundAnswers.filter(
          (a) => a.playerId !== effectivePlayerId && (!trimmedMsgName || a.playerName?.trim().toLowerCase() !== trimmedMsgName)
        ),
        answerRecord
      ];

      // Acknowledge receipt to guest so they can cancel any retries
      this.publish({
        type: 'ANSWER_ACK',
        playerId: msg.playerId
      });

      this.callbacks.onRoomSync({ ...this.currentRoomState });
      this.publish({
        type: 'ROOM_SYNC',
        state: { ...this.currentRoomState }
      });

      this.publish({
        type: 'ANSWER_NOTIFICATION',
        playerName: effectivePlayerName,
        isCorrect: false,
        points: 0,
        isFirst: true
      });

      // Notify Host App so it can update UI
      if (this.callbacks.onPlayerAnswerSubmit) {
        this.callbacks.onPlayerAnswerSubmit(answerRecord, this.currentRoomState.currentRoundAnswers);
      }

      // Automatically trigger round reveal if all players have answered!
      const answeredCount = this.currentRoomState.players.filter((p) => {
        const trimmedName = p.name.trim().toLowerCase();
        return this.currentRoomState!.currentRoundAnswers?.some(
          (a) => a.answered && (a.playerId === p.id || (a.playerName && a.playerName.trim().toLowerCase() === trimmedName))
        );
      }).length;
      const totalPlayers = this.currentRoomState.players.length;
      if (totalPlayers > 1 && answeredCount >= totalPlayers) {
        this.hostRevealRound();
      }
    } else if (msg.type === 'DRAFT_PICK_PROGRESS') {
      if (this.currentRoomState.draftState) {
        const ds = this.currentRoomState.draftState;
        if (ds.redPlayer.playerId === msg.playerId) {
          ds.redPlayer.pickedCount = msg.pickedCount;
          ds.redPlayer.isLocked = msg.isLocked;
        } else if (ds.bluePlayer.playerId === msg.playerId) {
          ds.bluePlayer.pickedCount = msg.pickedCount;
          ds.bluePlayer.isLocked = msg.isLocked;
        }
      }
      this.callbacks.onDraftPickProgress?.(msg.playerId, msg.pickedCount, msg.isLocked);
    } else if (msg.type === 'DRAFT_SUBMIT_PICKS') {
      if (this.currentRoomState.draftState) {
        const ds = this.currentRoomState.draftState;
        if (ds.redPlayer.playerId === msg.playerId) {
          ds.redPlayer.picks = msg.picks;
          ds.redPlayer.isLocked = true;
          ds.redPlayer.pickedCount = msg.picks.length;
        } else if (ds.bluePlayer.playerId === msg.playerId) {
          ds.bluePlayer.picks = msg.picks;
          ds.bluePlayer.isLocked = true;
          ds.bluePlayer.pickedCount = msg.picks.length;
        }

        this.publish({
          type: 'DRAFT_PICK_PROGRESS',
          playerId: msg.playerId,
          pickedCount: msg.picks.length,
          isLocked: true
        });
        this.callbacks.onDraftPickProgress?.(msg.playerId, msg.picks.length, true);

        // Check if both players have locked their picks!
        if (ds.redPlayer.isLocked && ds.bluePlayer.isLocked) {
          const autoMatched = ds.redPlayer.picks.filter((p) =>
            ds.bluePlayer.picks.some((bp) => bp.toLowerCase().trim() === p.toLowerCase().trim())
          );
          ds.phase = 'reveal';
          ds.autoMatchedArtists = autoMatched;

          this.publish({
            type: 'DRAFT_REVEAL',
            redPicks: ds.redPlayer.picks,
            bluePicks: ds.bluePlayer.picks,
            autoMatched
          });

          this.callbacks.onDraftReveal?.(ds.redPlayer.picks, ds.bluePlayer.picks, autoMatched);
        }
      }
    } else if (msg.type === 'DRAFT_BAN_PROGRESS') {
      if (this.currentRoomState.draftState) {
        const ds = this.currentRoomState.draftState;
        if (ds.redPlayer.playerId === msg.playerId) {
          ds.redPlayer.isBanLocked = msg.isBanLocked;
          if (msg.bans) ds.redPlayer.bans = msg.bans;
        } else if (ds.bluePlayer.playerId === msg.playerId) {
          ds.bluePlayer.isBanLocked = msg.isBanLocked;
          if (msg.bans) ds.bluePlayer.bans = msg.bans;
        }
      }
      this.callbacks.onDraftBanProgress?.(msg.playerId, msg.bannedCount, msg.isBanLocked, msg.bans);
    } else if (msg.type === 'DRAFT_SUBMIT_BANS') {
      if (this.currentRoomState?.draftState) {
        const ds = this.currentRoomState.draftState;
        if (ds.redPlayer.playerId === msg.playerId) {
          ds.redPlayer.bans = msg.bans || [];
          ds.redPlayer.isBanLocked = true;
        } else if (ds.bluePlayer.playerId === msg.playerId) {
          ds.bluePlayer.bans = msg.bans || [];
          ds.bluePlayer.isBanLocked = true;
        }

        // Broadcast ban lock progress with bans list so the other player sees banned cards
        this.publish({
          type: 'DRAFT_BAN_PROGRESS',
          playerId: msg.playerId,
          bannedCount: (msg.bans || []).length,
          isBanLocked: true,
          bans: msg.bans || []
        });
        this.callbacks.onDraftBanProgress?.(msg.playerId, (msg.bans || []).length, true, msg.bans || []);

        // Check if both players have locked bans!
        if (ds.redPlayer.isBanLocked && ds.bluePlayer.isBanLocked) {
          this.hostFinalizeBans();
        }
      }
    } else if (msg.type === 'DRAFT_PHASE_CHANGE') {
      if (msg.draftState && this.currentRoomState) {
        this.currentRoomState.draftState = msg.draftState;
      } else if (this.currentRoomState?.draftState) {
        this.currentRoomState.draftState.phase = msg.phase;
      }
      this.callbacks.onDraftPhaseChange?.(msg.phase, msg.draftState || this.currentRoomState?.draftState);
    } else if (msg.type === 'PLAYER_STATUS_UPDATE') {
      this.updatePlayerStatus(msg.playerId, msg.status);
    } else if (msg.type === 'REQUEST_RETURN_TO_LOBBY') {
      const pid = msg.playerId || '';
      if (pid) {
        this.updatePlayerStatus(pid, 'ready');
      }
    }
  }

  // Client Message Processor
  private handleClientMessage(msg: MultiplayerMessage) {
    if (!this.callbacks) return;

    switch (msg.type) {
      case 'KICK_PLAYER':
        if (msg.targetPlayerId === this.myPlayerId) {
          this.callbacks.onKicked?.();
        }
        break;

      case 'ROOM_CLOSED':
        this.callbacks.onRoomClosed?.();
        break;

      case 'ANSWER_ACK':
        this.answerAckCallbacks.forEach((cb) => cb(msg.playerId));
        break;

      case 'ROOM_SYNC':
        this.currentRoomState = msg.state;
        if (msg.state.players && this.myPlayerName) {
          const matched = msg.state.players.find(
            (p) => p.id === this.myPlayerId || p.name.trim().toLowerCase() === this.myPlayerName.trim().toLowerCase()
          );
          if (matched && matched.id) {
            this.myPlayerId = matched.id;
          }
        }
        this.callbacks.onRoomSync(msg.state);
        break;

      case 'RETURN_TO_LOBBY':
        if (this.currentRoomState) {
          this.currentRoomState.status = 'waiting';
          this.currentRoomState.currentRoundAnswers = [];
          this.currentRoomState.draftState = undefined;
          this.currentRoomState.players = this.currentRoomState.players.map((p) => ({
            ...p,
            score: 0,
            streak: 0,
            hasAnsweredThisRound: false,
            lastAnswerCorrect: undefined
          }));
        }
        this.callbacks.onReturnToLobby?.();
        break;

      case 'START_GAME':
        this.callbacks.onGameStart(
          msg.songs,
          msg.category,
          msg.totalRounds,
          msg.answerMode,
          (!msg.roundTimeLimit || msg.roundTimeLimit === 0) ? 30 : msg.roundTimeLimit,
          msg.autoAdvance,
          msg.roundStartTime
        );
        break;

      case 'REVEAL_ROUND':
        if (this.currentRoomState) {
          this.currentRoomState.status = 'round_reveal';
          this.currentRoomState.players = msg.updatedScores;
          this.currentRoomState.currentRoundAnswers = msg.answers;
        }
        this.callbacks.onRevealRound(msg.answers, msg.updatedScores);
        break;

      case 'NEXT_ROUND':
        this.callbacks.onNextRound(msg.roundIndex, msg.roundStartTime);
        break;

      case 'REPLACE_CURRENT_SONG':
        if (this.callbacks.onReplaceSong) {
          this.callbacks.onReplaceSong(msg.roundIndex, msg.newSong, msg.roundStartTime);
        }
        break;

      case 'ANSWER_NOTIFICATION':
        this.callbacks.onAnswerNotification(msg);
        break;

      case 'GAME_OVER':
        if (this.currentRoomState) {
          this.currentRoomState.status = 'waiting';
          this.currentRoomState.currentRoundAnswers = [];
          this.currentRoomState.players = msg.finalScores.map((p) => ({
            ...p,
            status: 'viewing_summary'
          }));
        }
        this.callbacks.onGameOver(msg.finalScores);
        break;

      case 'DRAFT_START':
        if (this.currentRoomState) {
          this.currentRoomState.status = 'drafting';
          this.currentRoomState.gameType = 'song_draft';
          this.currentRoomState.draftState = msg.draftState;
        }
        this.callbacks.onDraftStart?.(msg.draftState);
        break;

      case 'DRAFT_PICK_PROGRESS':
        if (this.currentRoomState?.draftState) {
          const ds = this.currentRoomState.draftState;
          if (ds.redPlayer.playerId === msg.playerId) {
            ds.redPlayer.pickedCount = msg.pickedCount;
            ds.redPlayer.isLocked = msg.isLocked;
          } else if (ds.bluePlayer.playerId === msg.playerId) {
            ds.bluePlayer.pickedCount = msg.pickedCount;
            ds.bluePlayer.isLocked = msg.isLocked;
          }
        }
        this.callbacks.onDraftPickProgress?.(msg.playerId, msg.pickedCount, msg.isLocked);
        break;

      case 'DRAFT_REVEAL':
        if (this.currentRoomState?.draftState) {
          const ds = this.currentRoomState.draftState;
          ds.phase = 'reveal';
          ds.redPlayer.picks = msg.redPicks;
          ds.bluePlayer.picks = msg.bluePicks;
          ds.autoMatchedArtists = msg.autoMatched;
        }
        this.callbacks.onDraftReveal?.(msg.redPicks, msg.bluePicks, msg.autoMatched);
        break;

      case 'DRAFT_BAN_PROGRESS':
        if (this.currentRoomState?.draftState) {
          const ds = this.currentRoomState.draftState;
          if (ds.redPlayer.playerId === msg.playerId) {
            ds.redPlayer.isBanLocked = msg.isBanLocked;
            if (msg.bans) ds.redPlayer.bans = msg.bans;
          } else if (ds.bluePlayer.playerId === msg.playerId) {
            ds.bluePlayer.isBanLocked = msg.isBanLocked;
            if (msg.bans) ds.bluePlayer.bans = msg.bans;
          }
        }
        this.callbacks.onDraftBanProgress?.(msg.playerId, msg.bannedCount, msg.isBanLocked, msg.bans);
        break;

      case 'DRAFT_PHASE_CHANGE':
        if (msg.draftState && this.currentRoomState) {
          this.currentRoomState.draftState = msg.draftState;
        } else if (this.currentRoomState?.draftState) {
          this.currentRoomState.draftState.phase = msg.phase;
        }
        this.callbacks.onDraftPhaseChange?.(msg.phase, msg.draftState || this.currentRoomState?.draftState);
        break;

      case 'DRAFT_ROSTER_READY':
        this.callbacks.onDraftRosterReady?.(msg.survivingArtists, msg.songs, msg.category, msg.totalRounds);
        break;
    }
  }

  // Draft Action Helpers
  hostChangeDraftPhase(phase: SongDraftPhase) {
    if (!this.isHost || !this.currentRoomState?.draftState) return;
    this.currentRoomState.draftState.phase = phase;

    // Clear any existing ban timeout if phase is changing
    if (this.banPhaseTimeout) {
      clearTimeout(this.banPhaseTimeout);
      this.banPhaseTimeout = null;
    }

    // Host-authoritative 32-second safety timeout for ban phase:
    // If one player idles or forgets to click, host finalizes bans automatically,
    // treating unsubmitted as forfeited (0 bans), without stalling the room!
    if (phase === 'ban_phase') {
      this.banPhaseTimeout = setTimeout(() => {
        console.log('[Multiplayer] Ban phase timer expired on host, auto-finalizing bans...');
        this.hostFinalizeBans();
      }, 32000);
    }

    this.publish({
      type: 'DRAFT_PHASE_CHANGE',
      phase,
      draftState: this.currentRoomState.draftState
    });
    this.callbacks?.onDraftPhaseChange?.(phase, this.currentRoomState.draftState);
  }

  // Finalizes ban phase safely, ensuring any artist banned by EITHER side is strictly excluded
  hostFinalizeBans() {
    if (!this.isHost || !this.currentRoomState?.draftState) return;
    if (this.banPhaseTimeout) {
      clearTimeout(this.banPhaseTimeout);
      this.banPhaseTimeout = null;
    }

    const ds = this.currentRoomState.draftState;
    if (ds.phase === 'battle_roster') return; // already finalized

    // Ensure both are marked locked
    ds.redPlayer.isBanLocked = true;
    ds.bluePlayer.isBanLocked = true;
    ds.redPlayer.bans = ds.redPlayer.bans || [];
    ds.bluePlayer.bans = ds.bluePlayer.bans || [];

    const allBansNormalized = Array.from(new Set([
      ...ds.redPlayer.bans,
      ...ds.bluePlayer.bans
    ])).map((b) => b.trim().toLowerCase()).filter(Boolean);

    const isArtistBanned = (name: string) =>
      allBansNormalized.includes(name.trim().toLowerCase());

    const redSurviving = (ds.redPlayer.picks || []).filter((p) => !isArtistBanned(p));
    const blueSurviving = (ds.bluePlayer.picks || []).filter((p) => !isArtistBanned(p));
    const surviving = Array.from(new Set([...redSurviving, ...blueSurviving, ...(ds.autoMatchedArtists || [])]))
      .filter((p) => !isArtistBanned(p));

    ds.phase = 'battle_roster';
    ds.survivingArtists = surviving;

    const updatedDraftState: SongDraftState = {
      ...ds,
      phase: 'battle_roster',
      survivingArtists: surviving,
      redPlayer: { ...ds.redPlayer, bans: ds.redPlayer.bans },
      bluePlayer: { ...ds.bluePlayer, bans: ds.bluePlayer.bans }
    };

    this.publish({
      type: 'DRAFT_PHASE_CHANGE',
      phase: 'battle_roster',
      draftState: updatedDraftState
    });

    this.callbacks?.onDraftPhaseChange?.('battle_roster', updatedDraftState);
  }
  hostStartDraft(draftState: SongDraftState) {
    if (!this.isHost || !this.currentRoomState) return;
    this.currentRoomState.status = 'drafting';
    this.currentRoomState.gameType = 'song_draft';
    this.currentRoomState.draftState = draftState;

    this.publish({
      type: 'DRAFT_START',
      draftState
    });

    if (this.callbacks?.onDraftStart) {
      this.callbacks.onDraftStart(draftState);
    }
  }

  sendDraftPickProgress(pickedCount: number, isLocked: boolean) {
    if (this.currentRoomState?.draftState) {
      const ds = this.currentRoomState.draftState;
      if (ds.redPlayer.playerId === this.myPlayerId) {
        ds.redPlayer.pickedCount = pickedCount;
        ds.redPlayer.isLocked = isLocked;
      } else if (ds.bluePlayer.playerId === this.myPlayerId) {
        ds.bluePlayer.pickedCount = pickedCount;
        ds.bluePlayer.isLocked = isLocked;
      }
    }
    this.publish({
      type: 'DRAFT_PICK_PROGRESS',
      playerId: this.myPlayerId,
      pickedCount,
      isLocked
    });
    this.callbacks?.onDraftPickProgress?.(this.myPlayerId, pickedCount, isLocked);
  }

  sendDraftSubmitPicks(picks: string[]) {
    if (this.isHost) {
      this.handleHostMessage({
        type: 'DRAFT_SUBMIT_PICKS',
        playerId: this.myPlayerId,
        picks
      });
    } else {
      this.publish({
        type: 'DRAFT_SUBMIT_PICKS',
        playerId: this.myPlayerId,
        picks
      });
    }
  }

  sendDraftBanProgress(bannedCount: number, isBanLocked: boolean) {
    if (this.currentRoomState?.draftState) {
      const ds = this.currentRoomState.draftState;
      if (ds.redPlayer.playerId === this.myPlayerId) {
        ds.redPlayer.isBanLocked = isBanLocked;
      } else if (ds.bluePlayer.playerId === this.myPlayerId) {
        ds.bluePlayer.isBanLocked = isBanLocked;
      }
    }
    this.publish({
      type: 'DRAFT_BAN_PROGRESS',
      playerId: this.myPlayerId,
      bannedCount,
      isBanLocked
    });
    this.callbacks?.onDraftBanProgress?.(this.myPlayerId, bannedCount, isBanLocked);
  }

  sendDraftSubmitBans(bans: string[]) {
    if (this.isHost) {
      this.handleHostMessage({
        type: 'DRAFT_SUBMIT_BANS',
        playerId: this.myPlayerId,
        bans
      });
    } else {
      this.publish({
        type: 'DRAFT_SUBMIT_BANS',
        playerId: this.myPlayerId,
        bans
      });
    }
  }

  hostBroadcastDraftRoster(survivingArtists: string[], songs: Song[], category: Category, totalRounds: number) {
    if (!this.isHost || !this.currentRoomState) return;

    this.currentRoomState.status = 'in_game';
    this.currentRoomState.songs = songs;
    this.currentRoomState.category = category;
    this.currentRoomState.totalRounds = totalRounds;
    this.currentRoomState.currentRound = 1;
    this.currentRoomState.currentSongIndex = 0;
    this.currentRoomState.currentRoundAnswers = [];
    this.currentRoomState.players.forEach((p) => {
      p.score = 0;
      p.streak = 0;
      p.hasAnsweredThisRound = false;
    });

    this.publish({
      type: 'DRAFT_ROSTER_READY',
      survivingArtists,
      songs,
      category,
      totalRounds
    });

    if (this.callbacks?.onDraftRosterReady) {
      this.callbacks.onDraftRosterReady(survivingArtists, songs, category, totalRounds);
    }
  }


  // Publish message to room topic
  publish(msg: MultiplayerMessage, callback?: (err?: Error) => void) {
    if (!this.client || !this.roomCode) {
      if (callback) callback(new Error('Client not connected or room code missing'));
      return;
    }
    const topic = this.getTopic(this.roomCode);
    try {
      this.client.publish(topic, JSON.stringify(msg), { qos: 1 }, (err) => {
        if (err) {
          console.warn(`[MQTT] Publish error (${msg.type}):`, err);
        }
        if (callback) callback(err);
      });
    } catch (err: any) {
      console.warn(`[MQTT] Publish exception (${msg.type}):`, err);
      if (callback) callback(err);
    }
  }

  // Alias broadcast to publish
  broadcast(msg: MultiplayerMessage) {
    this.publish(msg);
  }

  // Guaranteed guest answer delivery with auto-retry until ACK or room sync
  submitGuestAnswer(answer: {
    playerId: string;
    playerName: string;
    avatar?: string;
    guessText?: string;
    answerText?: string;
    isCorrect: boolean;
    pointsEarned: number;
    timeTaken: number;
  }) {
    if (this.isHost) {
      this.hostRecordAnswer(answer as any);
      return;
    }

    const payload: MultiplayerMessage = {
      type: 'SUBMIT_ANSWER',
      playerId: answer.playerId,
      playerName: answer.playerName,
      avatar: answer.avatar,
      guessText: answer.guessText || answer.answerText || '',
      isCorrect: answer.isCorrect,
      pointsEarned: answer.pointsEarned,
      timeTaken: answer.timeTaken
    };

    // Send immediately
    this.publish(payload);

    let ackReceived = false;
    const ackHandler = (ackId: string) => {
      if (ackId === answer.playerId) {
        ackReceived = true;
      }
    };
    this.answerAckCallbacks.add(ackHandler);

    // Auto retry sending SUBMIT_ANSWER every 600ms if not confirmed yet
    let retries = 0;
    const retryTimer = setInterval(() => {
      const hasSyncedAnswer = this.currentRoomState?.currentRoundAnswers?.some(
        (a) => a.playerId === answer.playerId || (a.playerName && a.playerName.trim().toLowerCase() === answer.playerName.trim().toLowerCase())
      );
      const isRevealed = this.currentRoomState?.status === 'round_reveal';

      if (ackReceived || hasSyncedAnswer || isRevealed || retries >= 6 || !this.client) {
        clearInterval(retryTimer);
        this.answerAckCallbacks.delete(ackHandler);
        return;
      }

      retries++;
      this.publish(payload);
    }, 600);
  }

  // Host starts game
  hostStartGame(
    songs: Song[],
    category: Category,
    totalRounds: number,
    answerMode: AnswerMode,
    roundTimeLimit: number = 30,
    autoAdvance: boolean = true,
    roundStartTime: number = Date.now()
  ) {
    if (!this.isHost || !this.currentRoomState) return;

    const effectiveTimeLimit = (!roundTimeLimit || roundTimeLimit === 0) ? 30 : roundTimeLimit;
    this.currentRoomState.status = 'in_game';
    this.currentRoomState.songs = songs;
    this.currentRoomState.category = category;
    this.currentRoomState.totalRounds = totalRounds;
    this.currentRoomState.answerMode = answerMode;
    this.currentRoomState.roundTimeLimit = effectiveTimeLimit;
    this.currentRoomState.autoAdvance = autoAdvance;
    this.currentRoomState.currentRound = 1;
    this.currentRoomState.currentSongIndex = 0;
    this.currentRoomState.currentRoundAnswers = [];
    this.currentRoomState.players.forEach((p) => {
      p.score = 0;
      p.streak = 0;
      p.hasAnsweredThisRound = false;
      p.status = 'ready';
    });

    this.publish({
      type: 'START_GAME',
      songs,
      category,
      totalRounds,
      answerMode,
      roundTimeLimit,
      autoAdvance,
      roundStartTime
    });

    this.publish({
      type: 'ROOM_SYNC',
      state: { ...this.currentRoomState }
    });
  }

  // Host advances to next round, resetting answers and answer flags
  hostNextRound(roundIndex: number) {
    if (!this.isHost || !this.currentRoomState) return;

    const roundStartTime = Date.now();
    this.currentRoomState.status = 'in_game';
    this.currentRoomState.currentRound = roundIndex + 1;
    this.currentRoomState.currentSongIndex = roundIndex;
    this.currentRoomState.currentRoundAnswers = [];
    this.currentRoomState.players.forEach((p) => {
      p.hasAnsweredThisRound = false;
    });

    this.publish({
      type: 'NEXT_ROUND',
      roundIndex,
      roundStartTime
    });

    this.publish({
      type: 'ROOM_SYNC',
      state: { ...this.currentRoomState }
    });

    // Also trigger host callback
    if (this.callbacks && this.callbacks.onNextRound) {
      this.callbacks.onNextRound(roundIndex, roundStartTime);
    }
  }

  // Host triggers round reveal to everyone
  hostRevealRound() {
    if (!this.isHost || !this.currentRoomState) return;
    if (this.currentRoomState.status === 'round_reveal') return; // Prevent double reveal

    this.currentRoomState.status = 'round_reveal';

    // Ensure all players have an answer record with name fallback
    const limit = (!this.currentRoomState.roundTimeLimit || this.currentRoomState.roundTimeLimit === 0) ? 30 : this.currentRoomState.roundTimeLimit;
    const finalizedAnswers: any[] = this.currentRoomState.players.map((p) => {
      const trimmedPName = p.name.trim().toLowerCase();
      const existing = this.currentRoomState!.currentRoundAnswers?.find(
        (a) => a.playerId === p.id || (a.playerName && a.playerName.trim().toLowerCase() === trimmedPName)
      );
      if (existing) {
        return {
          ...existing,
          playerId: p.id,
          playerName: p.name,
          avatar: p.avatar
        };
      }
      return {
        playerId: p.id,
        playerName: p.name,
        avatar: p.avatar,
        answered: false,
        isCorrect: false,
        pointsEarned: 0,
        timeTaken: limit
      };
    });

    // Finalize scores and streaks upon round reveal (authoritatively re-verify points)
    for (const ans of finalizedAnswers) {
      if (ans.answered && ans.isCorrect) {
        const verifiedTime = typeof ans.timeTaken === 'number' && ans.timeTaken > 0 ? ans.timeTaken : 1;
        ans.pointsEarned = calculateRoundScore(verifiedTime, 100);
      } else {
        ans.pointsEarned = 0;
      }
      const p = this.currentRoomState.players.find((pl) => pl.id === ans.playerId);
      if (p) {
        if (ans.isCorrect) {
          p.score += ans.pointsEarned;
          p.streak = (p.streak || 0) + 1;
          p.lastAnswerCorrect = true;
        } else {
          p.streak = 0;
          p.lastAnswerCorrect = false;
        }
      }
    }

    this.currentRoomState.currentRoundAnswers = finalizedAnswers;

    // Broadcast REVEAL_ROUND to all clients
    this.publish({
      type: 'REVEAL_ROUND',
      answers: finalizedAnswers,
      updatedScores: this.currentRoomState.players
    });

    // Also sync room state locally
    if (this.callbacks && this.callbacks.onRoomSync) {
      this.callbacks.onRoomSync({ ...this.currentRoomState });
    }

    // Also trigger host's onRevealRound callback locally!
    if (this.callbacks && this.callbacks.onRevealRound) {
      this.callbacks.onRevealRound(finalizedAnswers, this.currentRoomState.players);
    }
  }

  // Host records own answer
  hostRecordAnswer(answerRecord: any) {
    if (!this.isHost || !this.currentRoomState) return;

    const verifiedTime = typeof answerRecord.timeTaken === 'number' && answerRecord.timeTaken > 0 ? answerRecord.timeTaken : 1;
    const verifiedPoints = answerRecord.isCorrect ? calculateRoundScore(verifiedTime, 100) : 0;
    answerRecord.pointsEarned = verifiedPoints;
    answerRecord.timeTaken = verifiedTime;

    const trimmedAnsName = answerRecord.playerName?.trim().toLowerCase();
    const player = this.currentRoomState.players.find(
      (p) => p.id === answerRecord.playerId || (trimmedAnsName && p.name.trim().toLowerCase() === trimmedAnsName)
    );
    if (player) {
      player.hasAnsweredThisRound = true;
      player.lastAnswerCorrect = answerRecord.isCorrect;
      // Do NOT increment player.score here; deferred to hostRevealRound()
    }

    if (!this.currentRoomState.currentRoundAnswers) {
      this.currentRoomState.currentRoundAnswers = [];
    }
    this.currentRoomState.currentRoundAnswers = [
      ...this.currentRoomState.currentRoundAnswers.filter(
        (a) => a.playerId !== answerRecord.playerId && (!trimmedAnsName || a.playerName?.trim().toLowerCase() !== trimmedAnsName)
      ),
      answerRecord
    ];

    this.publish({
      type: 'ROOM_SYNC',
      state: { ...this.currentRoomState }
    });

    // Notify clients that Host has answered too
    this.publish({
      type: 'ANSWER_NOTIFICATION',
      playerName: player ? player.name : 'ผู้เล่น',
      isCorrect: false,
      points: 0,
      isFirst: true
    });

    // Sync host local room state
    if (this.callbacks && this.callbacks.onRoomSync) {
      this.callbacks.onRoomSync({ ...this.currentRoomState });
    }

    // Check if all players have answered!
    const answeredCount = this.currentRoomState.players.filter((p) => {
      const trimmedName = p.name.trim().toLowerCase();
      return this.currentRoomState!.currentRoundAnswers?.some(
        (a) => a.answered && (a.playerId === p.id || (a.playerName && a.playerName.trim().toLowerCase() === trimmedName))
      );
    }).length;
    const totalPlayers = this.currentRoomState.players.length;
    if (totalPlayers > 1 && answeredCount >= totalPlayers) {
      this.hostRevealRound();
    }
  }

  // Host replaces song if audio fails
  hostReplaceSong(roundIndex: number, newSong: Song) {
    if (!this.isHost || !this.currentRoomState) return;

    const roundStartTime = Date.now();
    if (this.currentRoomState.songs && this.currentRoomState.songs[roundIndex]) {
      this.currentRoomState.songs[roundIndex] = newSong;
    }

    this.publish({
      type: 'REPLACE_CURRENT_SONG',
      roundIndex,
      newSong,
      roundStartTime
    });

    if (this.callbacks && this.callbacks.onReplaceSong) {
      this.callbacks.onReplaceSong(roundIndex, newSong, roundStartTime);
    }
  }

  // Host updates room settings (category, rounds, answerMode, roundTimeLimit, autoAdvance, gameType) directly from waiting room
  hostUpdateSettings(
    category: Category,
    totalRounds: number,
    answerMode: AnswerMode,
    roundTimeLimit: number = 30,
    autoAdvance: boolean = true,
    gameType?: RoomGameType
  ) {
    if (!this.isHost || !this.currentRoomState) return;

    const effectiveTimeLimit = (!roundTimeLimit || roundTimeLimit === 0) ? 30 : roundTimeLimit;
    this.currentRoomState.category = category;
    this.currentRoomState.totalRounds = totalRounds;
    this.currentRoomState.answerMode = answerMode;
    this.currentRoomState.roundTimeLimit = effectiveTimeLimit;
    this.currentRoomState.autoAdvance = autoAdvance;
    if (gameType) {
      this.currentRoomState.gameType = gameType;
    }

    if (this.callbacks) {
      this.callbacks.onRoomSync({ ...this.currentRoomState });
    }

    this.publish({
      type: 'ROOM_SYNC',
      state: { ...this.currentRoomState }
    });
  }

  // Host triggers game over and marks all players as 'viewing_summary'
  hostGameOver(scores?: PlayerSession[]) {
    if (!this.isHost || !this.currentRoomState) return;

    this.currentRoomState.status = 'waiting';
    this.currentRoomState.currentRoundAnswers = [];
    const basePlayers = scores || this.currentRoomState.players;
    this.currentRoomState.players = basePlayers.map((p) => ({
      ...p,
      status: 'viewing_summary' as PlayerStatus,
      hasAnsweredThisRound: false,
      lastAnswerCorrect: undefined
    }));

    this.publish({
      type: 'GAME_OVER',
      finalScores: [...this.currentRoomState.players]
    });
    this.publish({
      type: 'ROOM_SYNC',
      state: { ...this.currentRoomState }
    });
    if (this.callbacks?.onRoomSync) {
      this.callbacks.onRoomSync({ ...this.currentRoomState });
    }
  }

  // Update a player's status (ready vs viewing_summary)
  updatePlayerStatus(playerId: string, status: PlayerStatus) {
    if (this.currentRoomState) {
      const p = this.currentRoomState.players.find((player) => player.id === playerId);
      if (p) {
        p.status = status;
        // When a player returns to lobby as 'ready', reset their round/game flags & score!
        if (status === 'ready') {
          p.score = 0;
          p.streak = 0;
          p.hasAnsweredThisRound = false;
          p.lastAnswerCorrect = undefined;
        }
      }

      // If any player or all players are back in lobby ('ready'), clear round answers and reset room to waiting!
      const anyReady = this.currentRoomState.players.some((pl) => pl.status === 'ready');
      if (anyReady) {
        this.currentRoomState.status = 'waiting';
        this.currentRoomState.currentRoundAnswers = [];
        this.currentRoomState.currentRound = 1;
        this.currentRoomState.currentSongIndex = 0;
      }
    }

    if (this.isHost) {
      if (this.currentRoomState) {
        this.publish({
          type: 'ROOM_SYNC',
          state: { ...this.currentRoomState }
        });
        if (this.callbacks?.onRoomSync) {
          this.callbacks.onRoomSync({ ...this.currentRoomState });
        }
      }
    } else {
      this.publish({
        type: 'PLAYER_STATUS_UPDATE',
        playerId,
        status
      });
      if (this.currentRoomState && this.callbacks?.onRoomSync) {
        this.callbacks.onRoomSync({ ...this.currentRoomState });
      }
    }
  }

  // Host returns to lobby individually
  hostReturnToLobby() {
    this.updatePlayerStatus(this.myPlayerId, 'ready');
  }

  // Guest returns to lobby individually
  guestReturnToLobby() {
    this.updatePlayerStatus(this.myPlayerId, 'ready');
  }

  // Host resets current room back to waiting lobby so players can reconfigure or draft
  hostResetToLobby() {
    this.hostReturnToLobby();
  }

  // Guest requests host to reset back to lobby
  guestRequestResetToLobby() {
    this.guestReturnToLobby();
  }

  // Host kicks a player from the room
  hostKickPlayer(targetPlayerId: string) {
    if (!this.isHost || !this.currentRoomState) return;

    this.currentRoomState.players = this.currentRoomState.players.filter(
      (p) => p.id !== targetPlayerId
    );

    this.publish({
      type: 'KICK_PLAYER',
      targetPlayerId
    });

    if (this.callbacks?.onRoomSync) {
      this.callbacks.onRoomSync({ ...this.currentRoomState });
    }

    this.publish({
      type: 'ROOM_SYNC',
      state: { ...this.currentRoomState }
    });
  }

  // Gracefully leave room notifying others before teardown
  leaveRoom(onDone?: () => void) {
    if (this.client && this.roomCode) {
      try {
        const topic = this.getTopic(this.roomCode);
        const msg: MultiplayerMessage = this.isHost
          ? { type: 'ROOM_CLOSED' }
          : { type: 'LEAVE_ROOM', playerId: this.myPlayerId };
        const payload = JSON.stringify(msg);

        let finished = false;
        const finish = () => {
          if (finished) return;
          finished = true;
          this.destroy();
          if (onDone) onDone();
        };

        const timer = setTimeout(finish, 350);

        this.client.publish(topic, payload, { qos: 1 }, () => {
          clearTimeout(timer);
          finish();
        });
        return;
      } catch (err) {
        console.warn('Error during leaveRoom publish:', err);
      }
    }
    this.destroy();
    if (onDone) onDone();
  }

  destroy() {
    if (this.heartbeatTimer) {
      clearInterval(this.heartbeatTimer);
      this.heartbeatTimer = null;
    }
    if (this.banPhaseTimeout) {
      clearTimeout(this.banPhaseTimeout);
      this.banPhaseTimeout = null;
    }
    if (this.client) {
      try {
        this.client.end(false);
      } catch {}
      this.client = null;
    }
    this.isHost = false;
    this.roomCode = '';
    this.currentRoomState = null;
    this.callbacks = null;
  }
}

export const multiplayerService = new MultiplayerService();
