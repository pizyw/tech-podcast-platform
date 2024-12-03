import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './contexts/AuthContext';
import { PlayerProvider } from './contexts/PlayerContext';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import AudioPlayer from './components/player/AudioPlayer';
import AINewsDemo from './components/demo/AINewsDemo';
import Favorites from './pages/Favorites';
import PodcastDetail from './pages/PodcastDetail';
import MainLayout from './components/layout/MainLayout';
import { usePlayer } from './contexts/PlayerContext';
import './App.css';

// 播放器包装组件
const PlayerWrapper = () => {
  const { currentTrack, playNext, playPrevious } = usePlayer();

  if (!currentTrack) return null;

  return (
    <AudioPlayer
      track={currentTrack}
      onNext={playNext}
      onPrevious={playPrevious}
      onEnded={playNext}
    />
  );
};

function App() {
  return (
    <AuthProvider>
      <PlayerProvider>
        <Router>
          <MainLayout>
            <Routes>
              <Route path="/" element={<AINewsDemo />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/favorites" element={<Favorites />} />
              <Route path="/podcast/:id" element={<PodcastDetail />} />
            </Routes>
            <PlayerWrapper />
          </MainLayout>
        </Router>
      </PlayerProvider>
    </AuthProvider>
  );
}

export default App;
