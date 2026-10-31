import React, { useState, useEffect } from 'react';
import Header from './components/Header';
import Footer from './components/Footer';
import GameView from './components/GameView';
import HowToPlay from './pages/HowToPlay';
import About from './pages/About';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import Contact from './pages/Contact';
import Disclaimer from './pages/Disclaimer';

import StoreModal from './components/StoreModal';
import LevelSelectModal from './components/LevelSelectModal';
import DailyChallengeModal from './components/DailyChallengeModal';
import SettingsModal from './components/SettingsModal';
import TutorialModal from './components/TutorialModal';

import storage from './utils/storage';
import sound from './utils/audio';

export default function App() {
  const [currentPage, setCurrentPage] = useState('game');
  const [coins, setCoins] = useState(() => storage.get('coins') || 0);

  const [soundOn, setSoundOn] = useState(() => storage.get('soundEnabled') ?? true);
  const [musicOn, setMusicOn] = useState(() => storage.get('musicEnabled') ?? true);

  // Modals controlled from Header & Gameplay
  const [isStoreOpen, setIsStoreOpen] = useState(false);
  const [isLevelsOpen, setIsLevelsOpen] = useState(false);
  const [isDailyOpen, setIsDailyOpen] = useState(false);
  const [isSettingsOpen, setIsSettingsOpen] = useState(false);
  const [isTutorialOpen, setIsTutorialOpen] = useState(false);
  const [isFirstTimeTutorial, setIsFirstTimeTutorial] = useState(false);

  // Check first-time visitor experience for tutorial modal
  useEffect(() => {
    try {
      const tutorialSeen = localStorage.getItem('save_the_ball_tutorial_seen');
      if (!tutorialSeen) {
        const timer = setTimeout(() => {
          setIsTutorialOpen(true);
          setIsFirstTimeTutorial(true);
        }, 300);
        return () => clearTimeout(timer);
      }
    } catch (e) {
      console.warn('LocalStorage unavailable for tutorial state', e);
    }
  }, []);

  // Sync title and metadata on page change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });

    let title = 'Save the Ball Online – Free Physics Puzzle Game | Draw to Save';
    let metaDesc = 'Play Save the Ball for free! Draw lines, solve physics puzzles, avoid spikes and lava, and save your bouncing ball. Play instantly on mobile and PC.';

    if (currentPage === 'how-to-play') {
      title = 'How to Play Save the Ball – Physics Drawing Rules & 3-Star Guide';
      metaDesc = 'Learn how to master Save the Ball physics! Complete guide on drawing protective bridges, dodging hazards, and earning 3 stars on all 50 levels.';
    } else if (currentPage === 'about') {
      title = 'About Save the Ball Studio – Physics Game Origins & Story';
      metaDesc = 'Discover the story behind Save the Ball! Built with Matter.js precision physics for web and mobile browsers.';
    } else if (currentPage === 'privacy') {
      title = 'Privacy Policy – Save the Ball Online';
      metaDesc = 'Read our transparent privacy policy. Save the Ball uses local-first browser storage and complies with GDPR, CCPA, and Google AdSense guidelines.';
    } else if (currentPage === 'terms') {
      title = 'Terms and Conditions – Save the Ball Online';
      metaDesc = 'Terms of service and user agreements for playing Save the Ball online puzzle game.';
    } else if (currentPage === 'contact') {
      title = 'Contact & Support – Save the Ball Online';
      metaDesc = 'Get in touch with the Save the Ball development team for feedback, bug reports, and level design suggestions.';
    } else if (currentPage === 'disclaimer') {
      title = 'Website Disclaimer – Save the Ball Online';
      metaDesc = 'Important disclosures and fair play terms for Save the Ball.';
    }

    document.title = title;
    const descElem = document.querySelector('meta[name="description"]');
    if (descElem) {
      descElem.setAttribute('content', metaDesc);
    }
  }, [currentPage]);

  const handleNavigate = (page) => {
    sound.playClick();
    setCurrentPage(page);
  };

  const handleOpenTutorial = () => {
    sound.playClick();
    setIsFirstTimeTutorial(false);
    setIsTutorialOpen(true);
  };

  const handleToggleSound = () => {
    const val = sound.toggleSound();
    setSoundOn(val);
    storage.set('soundEnabled', val);
  };

  const handleToggleMusic = () => {
    const val = sound.toggleMusic();
    setMusicOn(val);
    storage.set('musicEnabled', val);
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#0B0F19] text-slate-200">
      {/* Top Navigation */}
      <Header
        currentPage={currentPage}
        onNavigate={handleNavigate}
        onOpenStore={() => {
          sound.playClick();
          setIsStoreOpen(true);
        }}
        onOpenLevels={() => {
          sound.playClick();
          setIsLevelsOpen(true);
        }}
        onOpenDaily={() => {
          sound.playClick();
          setIsDailyOpen(true);
        }}
        onOpenTutorial={handleOpenTutorial}
        coins={coins}
        soundOn={soundOn}
        musicOn={musicOn}
        onToggleSound={handleToggleSound}
        onToggleMusic={handleToggleMusic}
      />

      {/* Main Content Area */}
      <main className="flex-1">
        {currentPage === 'game' && (
          <GameView
            onNavigate={handleNavigate}
            onOpenTutorial={handleOpenTutorial}
          />
        )}

        {currentPage === 'how-to-play' && (
          <HowToPlay
            onPlayNow={() => handleNavigate('game')}
            onOpenTutorial={handleOpenTutorial}
          />
        )}

        {currentPage === 'about' && (
          <About onPlayNow={() => handleNavigate('game')} />
        )}

        {currentPage === 'privacy' && <PrivacyPolicy />}
        {currentPage === 'terms' && <Terms />}
        {currentPage === 'contact' && <Contact />}
        {currentPage === 'disclaimer' && <Disclaimer />}
      </main>

      {/* SEO & Policy Footer */}
      <Footer
        onNavigate={handleNavigate}
        onOpenLevels={() => {
          sound.playClick();
          setIsLevelsOpen(true);
        }}
        onOpenDaily={() => {
          sound.playClick();
          setIsDailyOpen(true);
        }}
        onOpenTutorial={handleOpenTutorial}
      />

      {/* 15-Second Gameplay Tutorial Modal */}
      <TutorialModal
        isOpen={isTutorialOpen}
        onClose={() => setIsTutorialOpen(false)}
        isFirstTime={isFirstTimeTutorial}
        onPlayNow={() => {
          setIsTutorialOpen(false);
          if (currentPage !== 'game') setCurrentPage('game');
        }}
      />

      {/* Global Modals triggered from Header */}
      <StoreModal
        isOpen={isStoreOpen}
        onClose={() => setIsStoreOpen(false)}
        onUpdate={() => setCoins(storage.get('coins'))}
      />

      <LevelSelectModal
        isOpen={isLevelsOpen}
        onClose={() => setIsLevelsOpen(false)}
        currentLevelId={storage.get('unlockedLevel') || 1}
        onSelectLevel={() => {
          if (currentPage !== 'game') setCurrentPage('game');
        }}
      />

      <DailyChallengeModal
        isOpen={isDailyOpen}
        onClose={() => setIsDailyOpen(false)}
        onStartDaily={() => {
          if (currentPage !== 'game') setCurrentPage('game');
        }}
      />

      <SettingsModal
        isOpen={isSettingsOpen}
        onClose={() => setIsSettingsOpen(false)}
        onSettingsChange={() => {
          setSoundOn(sound.soundEnabled);
          setMusicOn(sound.musicEnabled);
        }}
      />
    </div>
  );
}
