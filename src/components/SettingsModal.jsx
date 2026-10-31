import React, { useState } from 'react';
import storage from '../utils/storage';
import sound from '../utils/audio';
import { X, Volume2, VolumeX, Music, RotateCcw, Keyboard, ShieldAlert } from 'lucide-react';

export default function SettingsModal({ isOpen, onClose, onSettingsChange }) {
  const [soundOn, setSoundOn] = useState(storage.get('soundEnabled') ?? true);
  const [musicOn, setMusicOn] = useState(storage.get('musicEnabled') ?? true);
  const [volume, setVolume] = useState(storage.get('volume') ?? 0.7);

  if (!isOpen) return null;

  const handleToggleSound = () => {
    const val = sound.toggleSound();
    setSoundOn(val);
    storage.set('soundEnabled', val);
    if (onSettingsChange) onSettingsChange();
  };

  const handleToggleMusic = () => {
    const val = sound.toggleMusic();
    setMusicOn(val);
    storage.set('musicEnabled', val);
    if (onSettingsChange) onSettingsChange();
  };

  const handleVolumeChange = (e) => {
    const val = parseFloat(e.target.value);
    setVolume(val);
    sound.setVolume(val);
    storage.set('volume', val);
    if (onSettingsChange) onSettingsChange();
  };

  const handleResetProgress = () => {
    if (window.confirm('Are you sure you want to reset all game progress, stars, and coins? This cannot be undone.')) {
      storage.resetAll();
      window.location.reload();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-3xl p-4 sm:p-6 shadow-2xl text-white flex flex-col max-h-[92vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between pb-3 sm:pb-4 border-b border-slate-700/80 mb-4 shrink-0">
          <h2 className="text-xl sm:text-2xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-teal-300">
            Audio & Settings
          </h2>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Audio Toggles */}
        <div className="space-y-4">
          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-blue-500/20 text-blue-400 flex items-center justify-center">
                {soundOn ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5" />}
              </div>
              <div>
                <div className="font-bold text-sm text-white">Sound Effects</div>
                <div className="text-xs text-slate-400">Bounces, scribbles, pops, fanfares</div>
              </div>
            </div>
            <button
              onClick={handleToggleSound}
              className={`w-12 h-7 rounded-full transition-colors relative p-1 ${
                soundOn ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  soundOn ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          <div className="flex items-center justify-between p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-xl bg-purple-500/20 text-purple-400 flex items-center justify-center">
                <Music className="w-5 h-5" />
              </div>
              <div>
                <div className="font-bold text-sm text-white">Arcade Music</div>
                <div className="text-xs text-slate-400">Procedural joyful chiptune loop</div>
              </div>
            </div>
            <button
              onClick={handleToggleMusic}
              className={`w-12 h-7 rounded-full transition-colors relative p-1 ${
                musicOn ? 'bg-emerald-500' : 'bg-slate-700'
              }`}
            >
              <div
                className={`w-5 h-5 rounded-full bg-white transition-transform ${
                  musicOn ? 'translate-x-5' : 'translate-x-0'
                }`}
              />
            </button>
          </div>

          {/* Volume Slider */}
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex justify-between text-xs font-semibold text-slate-300 mb-2">
              <span>Master Volume</span>
              <span>{Math.round(volume * 100)}%</span>
            </div>
            <input
              type="range"
              min="0"
              max="1"
              step="0.05"
              value={volume}
              onChange={handleVolumeChange}
              className="w-full accent-emerald-400 cursor-pointer"
            />
          </div>

          {/* Keyboard Shortcuts */}
          <div className="p-3.5 rounded-2xl bg-slate-800/60 border border-slate-700/60">
            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 mb-2">
              <Keyboard className="w-4 h-4 text-emerald-400" /> Desktop Controls:
            </div>
            <div className="grid grid-cols-2 gap-2 text-xs text-slate-400">
              <div><kbd className="bg-slate-700 text-slate-200 px-1.5 py-0.5 rounded">R</kbd> Restart Level</div>
              <div><kbd className="bg-slate-700 text-slate-200 px-1.5 py-0.5 rounded">Space</kbd> Pause Game</div>
              <div><kbd className="bg-slate-700 text-slate-200 px-1.5 py-0.5 rounded">Esc</kbd> Close Modals</div>
              <div><kbd className="bg-slate-700 text-slate-200 px-1.5 py-0.5 rounded">Mouse</kbd> Draw Lines</div>
            </div>
          </div>

          {/* Reset progress */}
          <button
            onClick={handleResetProgress}
            className="w-full flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-rose-400 hover:text-rose-300 bg-rose-500/10 hover:bg-rose-500/20 border border-rose-500/30 rounded-xl transition"
          >
            <ShieldAlert className="w-4 h-4" /> Reset All Save Data
          </button>
        </div>
      </div>
    </div>
  );
}
