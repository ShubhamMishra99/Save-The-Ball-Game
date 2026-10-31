import React from 'react';
import sound from '../utils/audio';
import { Volume2, VolumeX, Music, ShoppingBag, Grid, Calendar, HelpCircle, Info } from 'lucide-react';

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
  return (
    <header className="sticky top-0 z-40 w-full bg-slate-900/90 backdrop-blur-md border-b border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between">
        {/* Brand / Logo */}
        <div
          onClick={() => onNavigate('game')}
          className="flex items-center gap-2.5 cursor-pointer group"
        >
          <div className="relative w-10 h-10 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition transform">
            <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center overflow-hidden">
              <span className="text-2xl animate-bounce">🟡</span>
            </div>
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <h1 className="text-xl sm:text-2xl font-black font-heading tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-emerald-300 to-teal-400">
                SAVE THE BALL!
              </h1>
              <span className="hidden sm:inline-block text-[10px] font-bold uppercase tracking-wider bg-emerald-500/20 text-emerald-300 px-2 py-0.5 rounded-full border border-emerald-500/30">
                v1.0
              </span>
            </div>
            <p className="text-[11px] text-slate-400 hidden sm:block font-medium">
              One line can save a life!
            </p>
          </div>
        </div>

        {/* Center Navigation Links */}
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

        {/* Right Action Buttons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* How to Play / Video Tutorial Quick Button (Mobile & Desktop) */}
          <button
            onClick={onOpenTutorial}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 border border-cyan-500/30 text-cyan-300 text-xs font-bold transition shadow-sm hover:scale-105"
            title="Watch 15s Tutorial Video"
          >
            <HelpCircle className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Tutorial</span>
          </button>

          {/* Daily Challenge Quick Button */}
          <button
            onClick={onOpenDaily}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-orange-500/10 hover:bg-orange-500/20 border border-orange-500/30 text-orange-400 text-xs font-bold transition"
            title="Daily Challenge"
          >
            <Calendar className="w-4 h-4" />
            <span className="hidden sm:inline">Daily</span>
          </button>

          {/* Levels Drawer Button */}
          <button
            onClick={onOpenLevels}
            className="flex items-center gap-1 px-2.5 py-1.5 rounded-xl bg-teal-500/10 hover:bg-teal-500/20 border border-teal-500/30 text-teal-300 text-xs font-bold transition"
            title="Select Level"
          >
            <Grid className="w-4 h-4" />
            <span className="hidden sm:inline">50 Levels</span>
          </button>

          {/* Shop Button */}
          <button
            onClick={onOpenStore}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-amber-500/20 to-yellow-500/20 hover:from-amber-500/30 hover:to-yellow-500/30 border border-amber-500/40 text-amber-300 text-xs font-bold transition shadow-sm"
          >
            <ShoppingBag className="w-4 h-4" />
            <span>{coins}</span>
          </button>

          {/* Audio Toggles */}
          <div className="flex items-center gap-1 bg-slate-800/80 p-1 rounded-xl border border-slate-700/80">
            <button
              onClick={onToggleSound}
              className={`p-1.5 rounded-lg text-xs transition ${
                soundOn ? 'text-emerald-400 hover:bg-slate-700' : 'text-slate-500 hover:text-slate-400'
              }`}
              title="Toggle Sound Effects"
            >
              {soundOn ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
            </button>
            <button
              onClick={onToggleMusic}
              className={`p-1.5 rounded-lg text-xs transition ${
                musicOn ? 'text-purple-400 hover:bg-slate-700' : 'text-slate-500 hover:text-slate-400'
              }`}
              title="Toggle Background Music"
            >
              <Music className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}
