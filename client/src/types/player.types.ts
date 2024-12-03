export interface PlayerState {
  isPlaying: boolean;
  currentTime: number;
  duration: number;
  volume: number;
  isMuted: boolean;
  playbackRate: number;
}

export interface AudioTrack {
  id: string;
  title: string;
  artist: string;
  coverImage: string;
  audioUrl: string;
  duration: number;
}

export type PlaybackRate = 0.5 | 0.75 | 1 | 1.25 | 1.5 | 2;
