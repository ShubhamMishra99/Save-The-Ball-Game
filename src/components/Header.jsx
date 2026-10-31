import React, { useState } from 'react';
import sound from '../utils/audio';
import {
  Volume2,
  VolumeX,
  Music,
  ShoppingBag,
  Grid,
  Calendar,
  HelpCircle,
  Menu,
  X,
  Sparkles,
  Gamepad2,
  Info
} from 'lucide-react';

export default function Header({
  currentPage,
  onNavigate,
  onOpenStore,
  onOpenLevels,
  onOpenDaily,
  onOpenTutorial,
  coins = 0,
  soundOn = true,
  musicOn = true,
  onToggleSound,
  onToggleMusic
}) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleMobileNav = (action) => {
    sound.playClick();
    setMobileMenuOpen(false);
    action();
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/95 backdrop-blur-md border-b border-slate-800 select-none">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-2">
        {/* Brand / Logo */}
        <div
          onClick={() => onNavigate('game')}
          className="flex items-center gap-2 sm:gap-2.5 cursor-pointer group shrink-0"
        >
          <div className="relative w-8 h-8 sm:w-10 sm:h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition transform">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center overflow-hidden">
              <span className="text-xl sm:text-2xl animate-bounce">🟡</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-base sm:text-2xl font-black font-heading tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-300 to-teal-400">
                SAVE THE BALL!
              </h1>
              <span className="hidden lg:inline-block text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                v1.0
              </span>
            </div>
            <p className="text-[10px] sm:text-[11px] text-slate-400 hidden sm:block font-medium">
              One line can save a life!
            </p>
          </div>
        </div>

        {/* Center Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-1 bg-slate-800/60 p-1 rounded-2xl border border-slate-700/60">
          <button
            onClick={() => onNavigate('game')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              currentPage === 'game'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            Play Game
          </button>
          <button
            onClick={() => {
              if (onOpenTutorial) onOpenTutorial();
              else onNavigate('how-to-play');
            }}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition flex items-center gap-1.5 ${
              currentPage === 'how-to-play'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
            <span>How to Play</span>
          </button>
          <button
            onClick={() => onNavigate('about')}
            className={`px-3 py-1.5 rounded-xl text-xs font-bold transition ${
              currentPage === 'about'
                ? 'bg-emerald-500 text-slate-950 shadow-md'
                : 'text-slate-300 hover:text-white hover:bg-slate-700/60'
            }`}
          >
            About
          </button>
        </nav>

        {/* Right Section: Desktop Full Buttons & Mobile Compact Bar */}
        <div className="flex items-center gap-1.5 sm:gap-2">
          {/* Desktop-Only Action Buttons */}
          <div className="hidden md:flex items-center gap-2">
            {/* Tutorial Video Quick Button */}
            <button
              onClick={onOpenTutorial}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition shadow-sm hover:scale-105"
              title="Watch 15s Tutorial Video"
            >
              <HelpCircle className="w-4 h-4 text-cyan-400" />
              <span>Tutorial</span>
            </button>

            {/* Daily Challenge Quick Button */}
            <button
              onClick={onOpenDaily}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold transition"
              title="Daily Challenge"
            >
              <Calendar className="w-4 h-4" />
              <span>Daily</span>
            </button>

            {/* Levels Drawer Button */}
            <button
              onClick={onOpenLevels}
              className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-bold transition"
              title="Select Level"
            >
              <Grid className="w-4 h-4" />
              <span>50 Levels</span>
            </button>
          </div>

          {/* Shop / Coins Button (Visible on both Mobile & Desktop) */}
          <button
            onClick={onOpenStore}
            className="flex items-center gap-1 sm:gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition shadow-sm active:scale-95"
            title="Open Ball Shop"
          >
            <ShoppingBag className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-400" />
            <span className="font-mono">{coins}</span>
          </button>

          {/* Sound Toggle (Visible on Mobile & Desktop) */}
          <div className="flex items-center gap-0.5 sm:gap-1 bg-slate-800/80 p-0.5 sm:p-1 rounded-xl border border-slate-700/80">
            <button
              onClick={onToggleSound}
              className={`p-1.5 rounded-lg text-xs transition ${
                soundOn ? 'text-emerald-400 hover:bg-slate-700' : 'text-slate-500 hover:text-slate-400'
              }`}
              title={soundOn ? 'Mute Sound Effects' : 'Enable Sound Effects'}
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onToggleMusic}
              className={`p-1.5 rounded-lg text-xs transition hidden sm:inline-block ${
                musicOn ? 'text-purple-400 hover:bg-slate-700' : 'text-slate-500 hover:text-slate-400'
              }`}
              title={musicOn ? 'Mute Music' : 'Enable Music'}
            >
              <Music className="w-4 h-4" />
            </button>
          </div>

          {/* Mobile Menu Hamburger Button (< md) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(prev => !prev)}
            className="md:hidden p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white border border-slate-700 transition active:scale-95"
            aria-label="Toggle Navigation Menu"
          >
            {mobileMenuOpen ? <X className="w-4 h-4 text-cyan-400" /> : <Menu className="w-4 h-4" />}
          </button>
        </div>
      </div>

      {/* Mobile Slide-Down Drawer (< md) */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-slate-900/98 border-b border-slate-800 px-4 py-3 animate-fade-in shadow-2xl flex flex-col gap-2">
          {/* Quick Play & Action Grid */}
          <div className="grid grid-cols-2 gap-2 pb-2 border-b border-slate-800">
            <button
              onClick={() => handleMobileNav(() => onNavigate('game'))}
              className={`p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 border transition ${
                currentPage === 'game'
                  ? 'bg-emerald-500 text-slate-950 border-emerald-400 font-black shadow-md'
                  : 'bg-slate-800/80 text-slate-200 border-slate-700'
              }`}
            >
              <Gamepad2 className="w-4 h-4" />
              <span>Play Game</span>
            </button>

            <button
              onClick={() => handleMobileNav(onOpenLevels)}
              className="p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 bg-teal-500/15 border border-teal-500/30 text-teal-300 active:scale-95 transition"
            >
              <Grid className="w-4 h-4" />
              <span>50 Levels</span>
            </button>

            <button
              onClick={() => handleMobileNav(onOpenDaily)}
              className="p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 bg-orange-500/15 border border-orange-500/30 text-orange-400 active:scale-95 transition"
            >
              <Calendar className="w-4 h-4" />
              <span>Daily Challenge</span>
            </button>

            <button
              onClick={() => handleMobileNav(onOpenTutorial)}
              className="p-2.5 rounded-xl text-xs font-bold flex items-center justify-center gap-2 bg-cyan-500/15 border border-cyan-500/30 text-cyan-300 active:scale-95 transition"
            >
              <Sparkles className="w-4 h-4" />
              <span>15s Tutorial</span>
            </button>
          </div>

          {/* Links Row */}
          <div className="flex items-center justify-between pt-1">
            <button
              onClick={() => handleMobileNav(() => onNavigate('how-to-play'))}
              className="text-xs font-semibold text-slate-300 hover:text-cyan-300 py-1 flex items-center gap-1.5"
            >
              <HelpCircle className="w-3.5 h-3.5 text-cyan-400" />
              <span>Guide & Rules</span>
            </button>

            <button
              onClick={() => handleMobileNav(() => onNavigate('about'))}
              className="text-xs font-semibold text-slate-300 hover:text-emerald-300 py-1 flex items-center gap-1.5"
            >
              <Info className="w-3.5 h-3.5 text-emerald-400" />
              <span>About Game</span>
            </button>

            <button
              onClick={onToggleMusic}
              className="text-xs font-semibold text-slate-300 hover:text-purple-300 py-1 flex items-center gap-1.5"
            >
              <Music className={`w-3.5 h-3.5 ${musicOn ? 'text-purple-400' : 'text-slate-500'}`} />
              <span>{musicOn ? 'Music ON' : 'Music OFF'}</span>
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
