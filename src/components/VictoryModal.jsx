import React, { useEffect, useState } from 'react';
import confetti from 'canvas-confetti';
import sound from '../utils/audio';
import { Star, RotateCcw, ArrowRight, Share2, Check, Sparkles } from 'lucide-react';

export default function VictoryModal({
  isOpen,
  level,
  stars = 3,
  coinsWon = 45,
  score = 1250,
  inkUsed = 210,
  timeTaken = 8,
  onNextLevel,
  onReplay
}) {
  const [copied, setCopied] = useState(false);
  const [revealedStars, setRevealedStars] = useState(0);

  useEffect(() => {
    if (isOpen) {
      // Fire victory confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 }
        });
      } catch (e) {}

      // Reveal stars with sound sequence
      setRevealedStars(0);
      const timer1 = setTimeout(() => {
        setRevealedStars(1);
        sound.playStar(0);
      }, 350);

      const timer2 = setTimeout(() => {
        if (stars >= 2) {
          setRevealedStars(2);
          sound.playStar(1);
        }
      }, 700);

      const timer3 = setTimeout(() => {
        if (stars >= 3) {
          setRevealedStars(3);
          sound.playStar(2);
        }
      }, 1050);

      return () => {
        clearTimeout(timer1);
        clearTimeout(timer2);
        clearTimeout(timer3);
      };
    }
  }, [isOpen, stars]);

  if (!isOpen) return null;

  const handleShare = async () => {
    const shareText = `I just saved the ball on Level ${level.id} (${level.title}) with ${stars} ⭐ stars and ${Math.round(inkUsed)} ink! Can you beat my score? 🔴✨ Play now: https://savetheball.game`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: 'Save the Ball Online!',
          text: shareText,
          url: 'https://savetheball.game'
        });
        return;
      } catch (err) {
        // Fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareText);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch (e) {
      console.warn('Clipboard failed', e);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border border-emerald-500/40 rounded-3xl p-6 sm:p-8 shadow-2xl text-white text-center flex flex-col items-center">
        {/* Glowing Badge */}
        <div className="w-16 h-16 rounded-full bg-emerald-500/20 border-2 border-emerald-400 flex items-center justify-center text-emerald-400 mb-3 shadow-lg shadow-emerald-500/30">
          <Sparkles className="w-8 h-8 animate-spin-slow" />
        </div>

        <h2 className="text-3xl font-black font-heading tracking-wide text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-green-300">
          LEVEL SAVED!
        </h2>
        <p className="text-sm text-slate-300 font-medium mt-0.5">
          Level {level.id}: {level.title}
        </p>

        {/* Stars Container */}
        <div className="flex gap-3 my-5">
          {[1, 2, 3].map(s => (
            <div
              key={s}
              className={`p-2 rounded-2xl border transition-all duration-300 transform ${
                s <= revealedStars
                  ? 'border-amber-400/80 bg-amber-500/20 scale-110 shadow-lg shadow-amber-500/20 rotate-3'
                  : 'border-slate-700 bg-slate-800/40 scale-95 opacity-40'
              }`}
            >
              <Star
                className={`w-9 h-9 transition-colors ${
                  s <= revealedStars
                    ? 'fill-amber-400 text-amber-400'
                    : 'fill-slate-600 text-slate-600'
                }`}
              />
            </div>
          ))}
        </div>

        {/* Stats Card */}
        <div className="w-full bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 grid grid-cols-3 gap-2 mb-6">
          <div className="flex flex-col items-center">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Coins</span>
            <span className="text-xl font-bold text-amber-300 flex items-center gap-1">
              🪙 +{coinsWon}
            </span>
          </div>

          <div className="flex flex-col items-center border-x border-slate-700/80 px-2">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Ink Used</span>
            <span className="text-xl font-bold text-teal-300">
              {Math.round(inkUsed)} px
            </span>
          </div>

          <div className="flex flex-col items-center">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Score</span>
            <span className="text-xl font-bold text-emerald-300">
              {score}
            </span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 w-full">
          <button
            onClick={() => {
              sound.playClick();
              onReplay();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-bold text-sm transition"
          >
            <RotateCcw className="w-4 h-4" /> Replay
          </button>

          <button
            onClick={() => {
              sound.playClick();
              handleShare();
            }}
            className="flex items-center justify-center gap-2 py-3 px-4 rounded-2xl bg-blue-600/30 hover:bg-blue-600/50 border border-blue-500/50 text-blue-300 font-bold text-sm transition"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-400" /> : <Share2 className="w-4 h-4" />}
            {copied ? 'Copied Link!' : 'Share'}
          </button>

          <button
            onClick={() => {
              sound.playClick();
              onNextLevel();
            }}
            className="flex-1 flex items-center justify-center gap-2 py-3 px-5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/30 transition transform hover:scale-[1.02]"
          >
            Next <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
