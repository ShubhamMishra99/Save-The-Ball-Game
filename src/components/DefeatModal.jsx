import React, { useState } from 'react';
import sound from '../utils/audio';
import { RotateCcw, HelpCircle, Shield, AlertTriangle } from 'lucide-react';

export default function DefeatModal({
  isOpen,
  level,
  cause = 'hazard',
  onRetry,
  onUseShield,
  shieldCount = 0
}) {
  const [showHint, setShowHint] = useState(false);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border border-red-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white text-center flex flex-col items-center">
        {/* Defeat Icon */}
        <div className="w-16 h-16 rounded-full bg-red-500/20 border-2 border-red-400 flex items-center justify-center text-red-400 mb-3 shadow-lg shadow-red-500/20 animate-bounce">
          <span className="text-3xl">🥺</span>
        </div>

        <h2 className="text-3xl font-black font-heading tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-red-400 via-rose-300 to-orange-400">
          OOPS! BALL CRASHED!
        </h2>
        <p className="text-sm text-slate-300 font-medium mt-1">
          {cause === 'lava'
            ? 'The ball dipped into boiling lava!'
            : cause === 'saw'
            ? 'A spinning buzzsaw popped the ball!'
            : cause === 'spike'
            ? 'Watch out for those razor-sharp spikes!'
            : cause === 'laser'
            ? 'Vaporized by high-energy laser!'
            : 'The ball fell into the abyss!'}
        </p>

        {/* Level Hint Box */}
        {showHint ? (
          <div className="w-full bg-amber-500/10 border border-amber-500/30 rounded-2xl p-4 my-5 text-left text-xs sm:text-sm text-amber-200 flex items-start gap-2.5 animate-fade-in">
            <HelpCircle className="w-5 h-5 text-amber-400 shrink-0 mt-0.5" />
            <div>
              <span className="font-bold block text-amber-300">Level Hint:</span>
              {level.hint || 'Draw a smooth downward slope to catch the ball safely!'}
            </div>
          </div>
        ) : (
          <button
            onClick={() => {
              sound.playClick();
              setShowHint(true);
            }}
            className="flex items-center gap-1.5 text-xs text-amber-400 hover:text-amber-300 font-semibold my-4 py-1 px-3 rounded-full bg-amber-500/10 border border-amber-500/20 transition"
          >
            <HelpCircle className="w-4 h-4" /> Need a hint?
          </button>
        )}

        {/* Action Buttons */}
        <div className="flex flex-col gap-2.5 w-full mt-2">
          <button
            onClick={() => {
              sound.playClick();
              onRetry();
            }}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-base shadow-lg shadow-emerald-500/30 transition transform hover:scale-[1.01]"
          >
            <RotateCcw className="w-5 h-5" /> Instant Retry (Press R)
          </button>

          {shieldCount > 0 && onUseShield && (
            <button
              onClick={() => {
                sound.playClick();
                onUseShield();
              }}
              className="w-full flex items-center justify-center gap-2 py-2.5 px-4 rounded-xl bg-blue-600/30 hover:bg-blue-600/40 border border-blue-500/40 text-blue-300 font-bold text-xs transition"
            >
              <Shield className="w-4 h-4" /> Retry with Energy Shield ({shieldCount} left)
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
