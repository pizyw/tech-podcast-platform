import React, { useRef, useState, useEffect } from 'react';
import {
  PlayCircleOutlined,
  PauseCircleOutlined,
  StepForwardOutlined,
  StepBackwardOutlined,
  SoundOutlined,
  LoadingOutlined,
} from '@ant-design/icons';
import { Slider, Button, Space, Typography, Image } from 'antd';
import { AudioTrack, PlayerState, PlaybackRate } from '../../types/player.types';
import './AudioPlayer.css';

const { Text } = Typography;

interface AudioPlayerProps {
  track: AudioTrack;
  onNext?: () => void;
  onPrevious?: () => void;
  onEnded?: () => void;
}

const AudioPlayer: React.FC<AudioPlayerProps> = ({
  track,
  onNext,
  onPrevious,
  onEnded,
}) => {
  const audioRef = useRef<HTMLAudioElement>(null);
  const [playerState, setPlayerState] = useState<PlayerState>({
    isPlaying: false,
    currentTime: 0,
    duration: 0,
    volume: 1,
    isMuted: false,
    playbackRate: 1,
  });
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => {
      setPlayerState(prev => ({
        ...prev,
        currentTime: audio.currentTime,
      }));
    };

    const handleLoadedMetadata = () => {
      setPlayerState(prev => ({
        ...prev,
        duration: audio.duration,
      }));
      setIsLoading(false);
    };

    const handleEnded = () => {
      setPlayerState(prev => ({
        ...prev,
        isPlaying: false,
      }));
      onEnded?.();
    };

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [onEnded]);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (playerState.isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }

    setPlayerState(prev => ({
      ...prev,
      isPlaying: !prev.isPlaying,
    }));
  };

  const handleTimeChange = (value: number) => {
    if (!audioRef.current) return;
    audioRef.current.currentTime = value;
    setPlayerState(prev => ({
      ...prev,
      currentTime: value,
    }));
  };

  const handleVolumeChange = (value: number) => {
    if (!audioRef.current) return;
    audioRef.current.volume = value;
    setPlayerState(prev => ({
      ...prev,
      volume: value,
      isMuted: value === 0,
    }));
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    const newMutedState = !playerState.isMuted;
    audioRef.current.muted = newMutedState;
    setPlayerState(prev => ({
      ...prev,
      isMuted: newMutedState,
    }));
  };

  const setPlaybackRate = (rate: PlaybackRate) => {
    if (!audioRef.current) return;
    audioRef.current.playbackRate = rate;
    setPlayerState(prev => ({
      ...prev,
      playbackRate: rate,
    }));
  };

  const formatTime = (time: number | undefined): string => {
    if (time === undefined) return '0:00';
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  return (
    <div className="audio-player">
      <audio
        ref={audioRef}
        src={track.audioUrl}
        preload="metadata"
      />
      
      <div className="player-content">
        <div className="track-info">
          <Image
            src={track.coverImage}
            alt={track.title}
            width={60}
            height={60}
            preview={false}
            className="cover-image"
          />
          <div className="track-details">
            <Text strong>{track.title}</Text>
            <Text type="secondary">{track.artist}</Text>
          </div>
        </div>

        <div className="player-controls">
          <Space size="middle">
            {onPrevious && (
              <Button
                type="text"
                icon={<StepBackwardOutlined />}
                onClick={onPrevious}
              />
            )}

            <Button
              type="text"
              icon={isLoading ? <LoadingOutlined /> : (
                playerState.isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />
              )}
              onClick={togglePlay}
              disabled={isLoading}
              size="large"
            />

            {onNext && (
              <Button
                type="text"
                icon={<StepForwardOutlined />}
                onClick={onNext}
              />
            )}
          </Space>

          <div className="progress-container">
            <Text className="time-display">
              {formatTime(playerState.currentTime)}
            </Text>
            
            <Slider
              className="progress-slider"
              value={playerState.currentTime}
              min={0}
              max={playerState.duration}
              onChange={handleTimeChange}
              tooltip={{ formatter: formatTime }}
            />
            
            <Text className="time-display">
              {formatTime(playerState.duration)}
            </Text>
          </div>
        </div>

        <div className="volume-controls">
          <Button
            type="text"
            icon={<SoundOutlined />}
            onClick={toggleMute}
          />
          <Slider
            className="volume-slider"
            value={playerState.isMuted ? 0 : playerState.volume}
            min={0}
            max={1}
            step={0.1}
            onChange={handleVolumeChange}
            tooltip={{ formatter: (value: number | undefined) => value ? `${Math.round(value * 100)}%` : '0%' }}
          />
          <div className="playback-rate">
            <select
              value={playerState.playbackRate}
              onChange={(e) => setPlaybackRate(Number(e.target.value) as PlaybackRate)}
            >
              <option value={0.5}>0.5x</option>
              <option value={0.75}>0.75x</option>
              <option value={1}>1x</option>
              <option value={1.25}>1.25x</option>
              <option value={1.5}>1.5x</option>
              <option value={2}>2x</option>
            </select>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AudioPlayer;
