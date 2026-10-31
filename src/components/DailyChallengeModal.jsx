import React from 'react';
import storage from '../utils/storage';
import sound from '../utils/audio';
import { X, Flame, Calendar, Trophy, Play, CheckCircle } from 'lucide-react';

export default function DailyChallengeModal({ isOpen, onClose, onStartDaily }) {
  if (!isOpen) return null;

  const todayStr = new Date().toISOString().slice(0, 10);
  const dailyData = storage.get('daily') || { streak: 0, lastCompletedDate: null };
  const isCompletedToday = dailyData.lastCompletedDate === todayStr;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-fade-in">
      <div className="relative w-full max-w-md bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border border-orange-500/40 rounded-3xl p-6 shadow-2xl text-white text-center flex flex-col items-center">
        {/* Header */}
        <div className="w-full flex items-center justify-between pb-3 border-b border-slate-700/80 mb-4">
          <div className="flex items-center gap-2 text-orange-400">
            <Calendar className="w-5 h-5" />
            <span className="font-bold text-sm tracking-wide text-slate-300">{todayStr}</span>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white transition"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Flame Badge */}
        <div className="w-20 h-20 rounded-full bg-orange-500/20 border-2 border-orange-400 flex items-center justify-center text-orange-400 mb-3 shadow-xl shadow-orange-500/30">
          <Flame className="w-10 h-10 animate-bounce" />
        </div>

        <h2 className="text-3xl font-black font-heading text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-300 to-yellow-300">
          DAILY BRAIN PUZZLE
        </h2>
        <p className="text-xs text-slate-300 max-w-xs mt-1">
          A fresh synchronized physics puzzle every 24 hours. Complete it today to build your streak!
        </p>

        {/* Streak & Rewards Card */}
        <div className="w-full bg-slate-800/80 border border-slate-700/80 rounded-2xl p-4 my-5 flex items-center justify-around">
          <div className="flex flex-col items-center">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Current Streak</span>
            <span className="text-3xl font-black text-orange-400 flex items-center gap-1">
              🔥 {dailyData.streak} <span className="text-xs text-slate-400 font-normal">days</span>
            </span>
          </div>

          <div className="w-px h-10 bg-slate-700" />

          <div className="flex flex-col items-center">
            <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Today's Reward</span>
            <span className="text-xl font-bold text-amber-300 flex items-center gap-1">
              🪙 +100
            </span>
          </div>
        </div>

        {/* Status / Action */}
        {isCompletedToday ? (
          <div className="w-full bg-emerald-500/20 border border-emerald-500/40 rounded-2xl p-4 flex items-center justify-center gap-2 text-emerald-300 font-bold text-sm">
            <CheckCircle className="w-5 h-5" /> Today's Daily Puzzle Completed!
          </div>
        ) : (
          <button
            onClick={() => {
              sound.playClick();
              onStartDaily();
              onClose();
            }}
            className="w-full flex items-center justify-center gap-2 py-3.5 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-amber-500 hover:from-orange-400 hover:to-amber-400 text-slate-950 font-black text-base shadow-lg shadow-orange-500/30 transition transform hover:scale-[1.01]"
          >
            <Play className="w-5 h-5 fill-slate-950" /> Play Daily Puzzle
          </button>
        )}
      </div>
    </div>
  );
}
