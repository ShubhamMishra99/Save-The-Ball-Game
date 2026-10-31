import React, { useState } from 'react';
import storage from '../utils/storage';
import sound from '../utils/audio';
import { X, Sparkles, Shield, Clock, Compass, Snowflake, Edit3, Check } from 'lucide-react';

const SKINS = [
  { id: 'classic', name: 'Sunshine Smiley', cost: 0, desc: 'The iconic cheerful bouncy companion', color: '#FFD43B' },
  { id: 'ninja', name: 'Shadow Ninja', cost: 100, desc: 'Stealth headband and relentless agility', color: '#212529' },
  { id: 'cyber', name: 'Cyberpunk Neon', cost: 150, desc: 'Futuristic digital pulse aura', color: '#22B8CF' },
  { id: 'kitty', name: 'Playful Kitty', cost: 200, desc: 'Cute cat ears and rosy whiskers', color: '#FCC2D7' },
  { id: 'alien', name: 'Cosmic Invader', cost: 250, desc: '3-eyed Martian adventurer', color: '#51CF66' },
  { id: 'crown', name: 'Royal Majesty', cost: 350, desc: 'Golden imperial crown with rubies', color: '#FFD43B' },
  { id: 'fire', name: 'Blazing Ember', cost: 500, desc: 'Superheated flaming aura', color: '#FF6B00' }
];

const INK_COLORS = [
  { hex: '#38D9A9', name: 'Neon Mint', cost: 0 },
  { hex: '#4DABF7', name: 'Electric Cyan', cost: 80 },
  { hex: '#FF6B6B', name: 'Hot Coral', cost: 120 },
  { hex: '#FCC419', name: 'Solar Gold', cost: 150 },
  { hex: '#BE4BDB', name: 'Cosmic Violet', cost: 200 }
];

const TRAILS = [
  { id: 'rainbow', name: 'Rainbow Prism', cost: 0, icon: '🌈' },
  { id: 'starlight', name: 'Stardust Sparkles', cost: 100, icon: '✨' },
  { id: 'fire', name: 'Blaze Comet', cost: 180, icon: '🔥' },
  { id: 'neon', name: 'Cyber Neon', cost: 220, icon: '⚡' }
];

const POWERUP_ITEMS = [
  { type: 'shield', name: 'Energy Shield', cost: 50, icon: Shield, desc: 'Protects ball from 1 deadly impact' },
  { type: 'slowMo', name: 'Chronos Slow-Mo', cost: 50, icon: Clock, desc: 'Slows physics to 40% speed for 5s' },
  { type: 'magnet', name: 'Save Zone Magnet', cost: 50, icon: Compass, desc: 'Pulls the ball towards the goal' },
  { type: 'freeze', name: 'Frost Freeze', cost: 50, icon: Snowflake, desc: 'Halts saws and moving platforms for 4s' },
  { type: 'extraInk', name: 'Ink Boost', cost: 50, icon: Edit3, desc: 'Adds +50% drawing capacity' }
];

export default function StoreModal({ isOpen, onClose, onUpdate }) {
  const [activeTab, setActiveTab] = useState('skins');
  const [coins, setCoins] = useState(storage.get('coins') || 0);

  if (!isOpen) return null;

  const unlockedSkins = storage.get('unlockedSkins') || ['classic'];
  const selectedSkin = storage.get('selectedSkin') || 'classic';

  const unlockedInks = storage.get('unlockedInkColors') || ['#38D9A9'];
  const selectedInk = storage.get('selectedInkColor') || '#38D9A9';

  const unlockedTrails = storage.get('unlockedTrails') || ['rainbow'];
  const selectedTrail = storage.get('selectedTrail') || 'rainbow';

  const powerupCounts = storage.get('powerups') || {};

  const handleBuySkin = (skin) => {
    if (storage.unlockSkin(skin.id, skin.cost)) {
      sound.playCoin();
      setCoins(storage.get('coins'));
      if (onUpdate) onUpdate();
    }
  };

  const handleEquipSkin = (skinId) => {
    storage.selectSkin(skinId);
    sound.playClick();
    if (onUpdate) onUpdate();
  };

  const handleBuyInk = (ink) => {
    if (storage.unlockInkColor(ink.hex, ink.cost)) {
      sound.playCoin();
      setCoins(storage.get('coins'));
      if (onUpdate) onUpdate();
    }
  };

  const handleEquipInk = (hex) => {
    storage.selectInkColor(hex);
    sound.playClick();
    if (onUpdate) onUpdate();
  };

  const handleBuyTrail = (trail) => {
    if (storage.unlockTrail(trail.id, trail.cost)) {
      sound.playCoin();
      setCoins(storage.get('coins'));
      if (onUpdate) onUpdate();
    }
  };

  const handleEquipTrail = (id) => {
    storage.selectTrail(id);
    sound.playClick();
    if (onUpdate) onUpdate();
  };

  const handleBuyPowerup = (item) => {
    if (storage.buyPowerup(item.type, item.cost)) {
      sound.playCoin();
      setCoins(storage.get('coins'));
      if (onUpdate) onUpdate();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md">
      <div className="relative w-full max-w-2xl bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 border border-slate-700/80 rounded-3xl p-6 shadow-2xl text-white max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between pb-4 border-b border-slate-700/80">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center text-amber-400">
              <Sparkles className="w-6 h-6 animate-pulse" />
            </div>
            <div>
              <h2 className="text-2xl font-bold font-heading text-transparent bg-clip-text bg-gradient-to-r from-amber-300 via-yellow-200 to-amber-400">
                Ball Shop & Locker
              </h2>
              <p className="text-xs text-slate-400">Customize your hero and stock up on powers</p>
            </div>
          </div>

          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 px-3.5 py-1.5 rounded-full">
              <span className="text-lg">🪙</span>
              <span className="font-bold text-amber-300">{coins}</span>
            </div>
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 my-4 border-b border-slate-700/60 pb-2 overflow-x-auto">
          {[
            { id: 'skins', label: 'Ball Skins' },
            { id: 'inks', label: 'Ink Colors' },
            { id: 'trails', label: 'Particle Trails' },
            { id: 'powerups', label: 'Power-Ups' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.id);
                sound.playClick();
              }}
              className={`px-4 py-2 rounded-xl text-sm font-semibold transition-all whitespace-nowrap ${
                activeTab === tab.id
                  ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-white shadow-lg shadow-emerald-500/20'
                  : 'bg-slate-800/80 text-slate-400 hover:text-slate-200 hover:bg-slate-800'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-y-auto pr-1 space-y-4">
          {/* SKINS TAB */}
          {activeTab === 'skins' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {SKINS.map(skin => {
                const isOwned = unlockedSkins.includes(skin.id);
                const isEquipped = selectedSkin === skin.id;

                return (
                  <div
                    key={skin.id}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      isEquipped
                        ? 'border-emerald-400 bg-emerald-950/20 shadow-md shadow-emerald-500/10'
                        : isOwned
                        ? 'border-slate-700 bg-slate-800/60'
                        : 'border-slate-800 bg-slate-900/60 opacity-90'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-12 h-12 rounded-full border-2 border-white/20 shadow-inner flex items-center justify-center text-xl"
                        style={{ backgroundColor: skin.color }}
                      >
                        {skin.id === 'ninja' ? '🥷' : skin.id === 'crown' ? '👑' : skin.id === 'kitty' ? '🐱' : skin.id === 'alien' ? '👽' : skin.id === 'fire' ? '🔥' : skin.id === 'cyber' ? '🤖' : '😊'}
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm">{skin.name}</div>
                        <div className="text-xs text-slate-400 leading-tight">{skin.desc}</div>
                      </div>
                    </div>

                    <div>
                      {isEquipped ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1.5 rounded-xl border border-emerald-500/40">
                          <Check className="w-3.5 h-3.5" /> Equipped
                        </span>
                      ) : isOwned ? (
                        <button
                          onClick={() => handleEquipSkin(skin.id)}
                          className="text-xs font-bold text-slate-200 bg-slate-700 hover:bg-slate-600 px-3.5 py-1.5 rounded-xl transition"
                        >
                          Equip
                        </button>
                      ) : (
                        <button
                          disabled={coins < skin.cost}
                          onClick={() => handleBuySkin(skin)}
                          className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl transition ${
                            coins >= skin.cost
                              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950 shadow-md'
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                          }`}
                        >
                          <span>🪙</span>
                          <span>{skin.cost}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* INKS TAB */}
          {activeTab === 'inks' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {INK_COLORS.map(ink => {
                const isOwned = unlockedInks.includes(ink.hex);
                const isEquipped = selectedInk === ink.hex;

                return (
                  <div
                    key={ink.hex}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      isEquipped
                        ? 'border-emerald-400 bg-emerald-950/20'
                        : isOwned
                        ? 'border-slate-700 bg-slate-800/60'
                        : 'border-slate-800 bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-10 h-10 rounded-xl shadow-lg border-2 border-white/30"
                        style={{ backgroundColor: ink.hex }}
                      />
                      <div>
                        <div className="font-bold text-white text-sm">{ink.name}</div>
                        <div className="text-xs text-slate-400">Stroke Glow Palette</div>
                      </div>
                    </div>

                    <div>
                      {isEquipped ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1.5 rounded-xl border border-emerald-500/40">
                          <Check className="w-3.5 h-3.5" /> Equipped
                        </span>
                      ) : isOwned ? (
                        <button
                          onClick={() => handleEquipInk(ink.hex)}
                          className="text-xs font-bold text-slate-200 bg-slate-700 hover:bg-slate-600 px-3.5 py-1.5 rounded-xl transition"
                        >
                          Equip
                        </button>
                      ) : (
                        <button
                          disabled={coins < ink.cost}
                          onClick={() => handleBuyInk(ink)}
                          className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl transition ${
                            coins >= ink.cost
                              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                          }`}
                        >
                          <span>🪙</span>
                          <span>{ink.cost}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* TRAILS TAB */}
          {activeTab === 'trails' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {TRAILS.map(trail => {
                const isOwned = unlockedTrails.includes(trail.id);
                const isEquipped = selectedTrail === trail.id;

                return (
                  <div
                    key={trail.id}
                    className={`p-4 rounded-2xl border transition-all flex items-center justify-between ${
                      isEquipped
                        ? 'border-emerald-400 bg-emerald-950/20'
                        : isOwned
                        ? 'border-slate-700 bg-slate-800/60'
                        : 'border-slate-800 bg-slate-900/60'
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <span className="text-3xl">{trail.icon}</span>
                      <div>
                        <div className="font-bold text-white text-sm">{trail.name}</div>
                        <div className="text-xs text-slate-400">Dynamic Particle Stream</div>
                      </div>
                    </div>

                    <div>
                      {isEquipped ? (
                        <span className="flex items-center gap-1 text-xs font-bold text-emerald-400 bg-emerald-500/20 px-3 py-1.5 rounded-xl border border-emerald-500/40">
                          <Check className="w-3.5 h-3.5" /> Equipped
                        </span>
                      ) : isOwned ? (
                        <button
                          onClick={() => handleEquipTrail(trail.id)}
                          className="text-xs font-bold text-slate-200 bg-slate-700 hover:bg-slate-600 px-3.5 py-1.5 rounded-xl transition"
                        >
                          Equip
                        </button>
                      ) : (
                        <button
                          disabled={coins < trail.cost}
                          onClick={() => handleBuyTrail(trail)}
                          className={`flex items-center gap-1 text-xs font-bold px-3 py-1.5 rounded-xl transition ${
                            coins >= trail.cost
                              ? 'bg-amber-500 hover:bg-amber-400 text-slate-950'
                              : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                          }`}
                        >
                          <span>🪙</span>
                          <span>{trail.cost}</span>
                        </button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          )}

          {/* POWERUPS TAB */}
          {activeTab === 'powerups' && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
              {POWERUP_ITEMS.map(item => {
                const count = powerupCounts[item.type] || 0;
                const Icon = item.icon;

                return (
                  <div
                    key={item.type}
                    className="p-4 rounded-2xl border border-slate-700/80 bg-slate-800/60 flex items-center justify-between"
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-400/40 flex items-center justify-center text-blue-400">
                        <Icon className="w-5 h-5" />
                      </div>
                      <div>
                        <div className="font-bold text-white text-sm flex items-center gap-2">
                          {item.name}
                          <span className="text-xs font-mono bg-slate-700 px-2 py-0.5 rounded-md text-slate-300">
                            x{count}
                          </span>
                        </div>
                        <div className="text-xs text-slate-400 leading-tight">{item.desc}</div>
                      </div>
                    </div>

                    <button
                      disabled={coins < item.cost}
                      onClick={() => handleBuyPowerup(item)}
                      className={`flex items-center gap-1 text-xs font-bold px-3 py-2 rounded-xl transition shrink-0 ${
                        coins >= item.cost
                          ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 shadow-md'
                          : 'bg-slate-800 text-slate-500 cursor-not-allowed border border-slate-700'
                      }`}
                    >
                      <span>🪙</span>
                      <span>{item.cost}</span>
                    </button>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
