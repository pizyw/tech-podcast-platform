import React, { createContext, useContext, useState, useCallback } from 'react';
import { AudioTrack, PlayerState } from '../types/player.types';

interface PlayerContextType {
  currentTrack: AudioTrack | null;
  queue: AudioTrack[];
  playerState: PlayerState;
  playTrack: (track: AudioTrack) => void;
  addToQueue: (track: AudioTrack) => void;
  removeFromQueue: (trackId: string) => void;
  clearQueue: () => void;
  playNext: () => void;
  playPrevious: () => void;
  updatePlayerState: (state: Partial<PlayerState>) => void;
}

const PlayerContext = createContext<PlayerContextType | undefined>(undefined);

export const PlayerProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentTrack, setCurrentTrack] = useState<AudioTrack | null>(null);
  const [queue, setQueue] = useState<AudioTrack[]>([]);
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    playbackRate: 1,
  });

  const playTrack = useCallback((track: AudioTrack) => {
    setCurrentTrack(track);
    setPlayerState(prev => ({
      ...prev,
      isPlaying: true,
      currentTime: 0,
    }));
  }, []);

  const addToQueue = useCallback((track: AudioTrack) => {
    setQueue(prev => [...prev, track]);
  }, []);

  const removeFromQueue = useCallback((trackId: string) => {
    setQueue(prev => prev.filter(track => track.id !== trackId));
  }, []);

  const clearQueue = useCallback(() => {
    setQueue([]);
  }, []);

  const playNext = useCallback(() => {
    if (queue.length === 0) return;
    
    const nextTrack = queue[0];
    setQueue(prev => prev.slice(1));
    playTrack(nextTrack);
  }, [queue, playTrack]);

  const playPrevious = useCallback(() => {
    // 实现播放历史功能
  }, []);

  const updatePlayerState = useCallback((state: Partial<PlayerState>) => {
    setPlayerState(prev => ({
      ...prev,
      ...state,
    }));
  }, []);

  return (
    <PlayerContext.Provider
      value={{
        currentTrack,
        queue,
        playerState,
        playTrack,
        addToQueue,
        removeFromQueue,
        clearQueue,
        playNext,
        playPrevious,
        updatePlayerState,
      }}
    >
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => {
  const context = useContext(PlayerContext);
  if (context === undefined) {
    throw new Error('usePlayer must be used within a PlayerProvider');
  }
  return context;
};
