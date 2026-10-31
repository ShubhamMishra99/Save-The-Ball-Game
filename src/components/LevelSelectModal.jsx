import React, { useState } from 'react';
import { worlds, allLevels } from '../levels';
import storage from '../utils/storage';
import sound from '../utils/audio';
import { X, Lock, Star, ChevronRight } from 'lucide-react';

export default function LevelSelectModal({ isOpen, onClose, currentLevelId, onSelectLevel }) {
  const [activeWorldId, setActiveWorldId] = useState(
    Math.ceil((currentLevelId || 1) / 10)
  );

  if (!isOpen) return null;

  const unlockedLevel = storage.get('unlockedLevel') || 1;
  const starsMap = storage.get('stars') || {};

  const activeWorld = worlds.find(w => w.id === activeWorldId) || worlds[0];
  const worldLevels = allLevels.filter(lvl => lvl.world === activeWorldId);

  // Compute stars won in current world
  let worldStars = 0;
  worldLevels.forEach(lvl => {
    worldStars += starsMap[lvl.id] || 0;
  });

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl text-white max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-700/80">
          <div>
            <h2 className="text-2xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-teal-300 via-emerald-300 to-cyan-300">
              Select Level
            </h2>
            <p className="text-xs text-slate-400">
              5 Worlds &bull; 50 Physics Brain-Teasers
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* World Selection Tabs */}
        <div className="flex gap-2 my-4 overflow-x-auto pb-2">
          {worlds.map(w => {
            const isWorldUnlocked = unlockedLevel >= w.range[0];
            const isSelected = activeWorldId === w.id;

            return (
              <button
                key={w.id}
                onClick={() => {
                  setActiveWorldId(w.id);
                  sound.playClick();
                }}
                className={`flex items-center gap-2 px-3.5 py-2 rounded-2xl text-xs font-bold transition-all whitespace-nowrap ${
                  isSelected
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-lg shadow-emerald-500/20'
                    : 'bg-slate-800/80 text-slate-300 hover:bg-slate-800'
                }`}
              >
                <span>{w.icon}</span>
                <span>W{w.id}: {w.name}</span>
                {!isWorldUnlocked && <Lock className="w-3 h-3 text-slate-500" />}
              </button>
            );
          })}
        </div>

        {/* World Info Banner */}
        <div className="bg-slate-800/60 border border-slate-700/60 rounded-2xl p-3 mb-4 flex items-center justify-between">
          <div>
            <div className="text-sm font-bold text-white flex items-center gap-2">
              <span>{activeWorld.icon}</span> {activeWorld.name}
            </div>
            <div className="text-xs text-slate-400">{activeWorld.desc}</div>
          </div>
          <div className="flex items-center gap-1.5 bg-amber-500/10 border border-amber-500/30 px-3 py-1 rounded-xl text-amber-300 text-xs font-bold">
            <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
            <span>{worldStars} / 30 Stars</span>
          </div>
        </div>

        {/* Levels Grid */}
        <div className="flex-1 overflow-y-auto pr-1">
          <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
            {worldLevels.map(lvl => {
              const isUnlocked = lvl.id <= unlockedLevel;
              const isCurrent = lvl.id === currentLevelId;
              const stars = starsMap[lvl.id] || 0;

              return (
                <button
                  key={lvl.id}
                  disabled={!isUnlocked}
                  onClick={() => {
                    if (isUnlocked) {
                      sound.playClick();
                      onSelectLevel(lvl.id);
                      onClose();
                    }
                  }}
                  className={`relative p-3.5 rounded-2xl flex flex-col items-center justify-center gap-1.5 transition-all border ${
                    isCurrent
                      ? 'border-emerald-400 bg-emerald-500/20 ring-2 ring-emerald-400/50 shadow-lg'
                      : isUnlocked
                      ? 'border-slate-700 bg-slate-800/80 hover:bg-slate-700/80 hover:border-slate-500 hover:scale-[1.02]'
                      : 'border-slate-800/60 bg-slate-900/40 opacity-50 cursor-not-allowed'
                  }`}
                >
                  <span className="text-xs font-mono font-bold text-slate-400">LVL</span>
                  <span className="text-2xl font-black font-heading text-white">{lvl.id}</span>

                  {isUnlocked ? (
                    <div className="flex gap-0.5 mt-0.5">
                      {[1, 2, 3].map(s => (
                        <Star
                          key={s}
                          className={`w-3.5 h-3.5 ${
                            s <= stars
                              ? 'fill-amber-400 text-amber-400'
                              : 'fill-slate-700 text-slate-700'
                          }`}
                        />
                      ))}
                    </div>
                  ) : (
                    <div className="mt-1">
                      <Lock className="w-4 h-4 text-slate-500" />
                    </div>
                  )}

                  <div className="text-[10px] text-slate-400 truncate w-full text-center mt-1">
                    {lvl.title}
                  </div>
                </button>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
