import React, { useEffect, useRef, useState, useCallback } from 'react';
import { PhysicsEngine } from '../game/PhysicsEngine';
import { GameRenderer } from '../game/GameRenderer';
import { DrawingEngine } from '../game/DrawingEngine';
import { allLevels, getLevelById, getDailyChallenge } from '../levels';
import storage from '../utils/storage';
import sound from '../utils/audio';
import VictoryModal from './VictoryModal';
import DefeatModal from './DefeatModal';
import LevelSelectModal from './LevelSelectModal';
import StoreModal from './StoreModal';
import SettingsModal from './SettingsModal';
import DailyChallengeModal from './DailyChallengeModal';
import AdBanner from './AdSense/AdBanner';

import {
  RotateCcw,
  Pause,
  Play,
  Grid,
  Settings,
  HelpCircle,
  Shield,
  Clock,
  Compass,
  Snowflake,
  Edit3,
  Sparkles,
  Volume2,
  VolumeX,
  Star
} from 'lucide-react';

export default function GameView({ onNavigate, onOpenTutorial }) {
  const canvasRef = useRef(null);
  const physicsRef = useRef(null);
  const rendererRef = useRef(null);
  const drawingRef = useRef(null);
  const animFrameIdRef = useRef(null);
  const lastTimeRef = useRef(0);

  // Level & Game State
  const [currentLevelId, setCurrentLevelId] = useState(() => storage.get('unlockedLevel') || 1);
  const [currentLevel, setCurrentLevel] = useState(() => getLevelById(currentLevelId));
  const [isPaused, setIsPaused] = useState(false);
  const [isBallReleased, setIsBallReleased] = useState(false);
  const [inkState, setInkState] = useState({ used: 0, max: 600, remaining: 600 });
  const [coins, setCoins] = useState(() => storage.get('coins') || 0);

  // Victory / Defeat modals
  const [victoryState, setVictoryState] = useState(null);
  const [defeatState, setDefeatState] = useState(null);

  // UI Modals
  const [showLevelSelect, setShowLevelSelect] = useState(false);
  const [showStore, setShowStore] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showDaily, setShowDaily] = useState(false);
  const [hintVisible, setHintVisible] = useState(false);

  // Active power-up indicators
  const [activeEffects, setActiveEffects] = useState({
    shield: false,
    slowMo: false,
    magnet: false,
    freeze: false
  });

  const levelStartTimeRef = useRef(Date.now());

  // Load level into physics engine
  const loadLevel = useCallback((lvl) => {
    setCurrentLevel(lvl);
    setIsBallReleased(false);
    levelStartTimeRef.current = Date.now();
    setVictoryState(null);
    setDefeatState(null);
    setHintVisible(false);

    if (drawingRef.current) {
      drawingRef.current.setMaxInk(lvl.inkLimit || 600);
      drawingRef.current.reset();
    }

    if (physicsRef.current) {
      const skin = storage.get('selectedSkin') || 'classic';
      physicsRef.current.init(lvl, skin);
    }

    setInkState({
      used: 0,
      max: lvl.inkLimit || 600,
      remaining: lvl.inkLimit || 600
    });
  }, []);

  // Initialize Canvas, Physics, Drawing, and Renderer
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set internal resolution
    canvas.width = 800;
    canvas.height = 600;

    const renderer = new GameRenderer(canvas);
    rendererRef.current = renderer;

    const physics = new PhysicsEngine({
      onWin: () => {
        const timeTaken = (Date.now() - levelStartTimeRef.current) / 1000;
        const inkUsed = drawingRef.current ? drawingRef.current.usedInk : 0;
        const lvl = currentLevel;

        if (lvl.isDaily) {
          const result = storage.recordDailyWin(lvl.dailyDate, inkUsed, timeTaken);
          setCoins(storage.get('coins'));
          setVictoryState({
            level: lvl,
            stars: 3,
            coinsWon: result.bonusCoins,
            score: Math.round(1500 + Math.max(0, 800 - inkUsed)),
            inkUsed,
            timeTaken
          });
        } else {
          const result = storage.recordLevelWin(
            lvl.id,
            inkUsed,
            timeTaken,
            lvl.inkLimit,
            lvl.threeStarInk,
            lvl.twoStarInk
          );
          setCoins(storage.get('coins'));
          setVictoryState({
            level: lvl,
            stars: result.stars,
            coinsWon: result.coinsWon,
            score: result.score,
            inkUsed,
            timeTaken
          });
        }
      },
      onFail: (cause) => {
        renderer.triggerShake(12);
        const shieldCount = (storage.get('powerups') || {}).shield || 0;
        setDefeatState({
          cause,
          level: currentLevel,
          shieldCount
        });
      },
      onCoinCollect: () => {
        storage.addCoins(10);
        setCoins(storage.get('coins'));
      },
      onSwitchTrigger: () => {
        renderer.triggerShake(5);
      },
      onPortalTeleport: (exit) => {
        renderer.addParticles({
          x: exit.x,
          y: exit.y,
          count: 14,
          color: '#38D9A9',
          speed: 4,
          type: 'sparkle'
        });
      }
    });
    physicsRef.current = physics;

    const drawing = new DrawingEngine({
      canvas,
      maxInk: currentLevel.inkLimit || 600,
      onStrokeComplete: (stroke) => {
        physics.addDrawnStroke(stroke);
        setIsBallReleased(true);
      },
      onInkUpdate: (data) => {
        setInkState(data);
      }
    });
    drawingRef.current = drawing;

    // Load initial level
    loadLevel(currentLevel);

    // Main animation loop
    let lastTime = performance.now();
    const loop = (now) => {
      const delta = Math.min(now - lastTime, 40);
      lastTime = now;

      if (!isPaused) {
        physics.update(delta);
      }

      const inkColor = storage.get('selectedInkColor') || '#38D9A9';
      const ballSkin = storage.get('selectedSkin') || 'classic';
      const trailType = storage.get('selectedTrail') || 'rainbow';

      renderer.render({
        physics,
        level: currentLevel,
        currentStroke: drawing.currentPoints,
        inkRemaining: inkState.remaining,
        maxInk: inkState.max,
        inkColor,
        ballSkin,
        trailType
      });

      animFrameIdRef.current = requestAnimationFrame(loop);
    };

    animFrameIdRef.current = requestAnimationFrame(loop);

    // Tab visibility handling
    const handleVisibility = () => {
      if (document.hidden) {
        setIsPaused(true);
      }
    };
    document.addEventListener('visibilitychange', handleVisibility);

    return () => {
      cancelAnimationFrame(animFrameIdRef.current);
      document.removeEventListener('visibilitychange', handleVisibility);
      drawing.detachEvents();
      physics.destroy();
    };
  }, []);

  // Release ball helper
  const handleReleaseBall = useCallback(() => {
    if (physicsRef.current) {
      physicsRef.current.releaseBalls();
      setIsBallReleased(true);
    }
  }, []);

  // Keyboard controls
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.target.tagName === 'INPUT' || e.target.tagName === 'TEXTAREA') return;

      if (e.key === 'r' || e.key === 'R') {
        handleRestart();
      } else if (e.key === ' ' || e.code === 'Space') {
        e.preventDefault();
        if (!isBallReleased) {
          handleReleaseBall();
        } else {
          setIsPaused(prev => !prev);
        }
      } else if (e.key === 'Escape') {
        setShowLevelSelect(false);
        setShowStore(false);
        setShowSettings(false);
        setShowDaily(false);
      } else if (e.key === '1') {
        handleUsePowerup('shield');
      } else if (e.key === '2') {
        handleUsePowerup('slowMo');
      } else if (e.key === '3') {
        handleUsePowerup('magnet');
      } else if (e.key === '4') {
        handleUsePowerup('freeze');
      } else if (e.key === '5') {
        handleUsePowerup('extraInk');
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [currentLevel, isBallReleased, handleReleaseBall]);

  // Restart level
  const handleRestart = () => {
    sound.playClick();
    loadLevel(currentLevel);
  };

  // Switch level
  const handleSelectLevel = (lvlId) => {
    const lvl = getLevelById(lvlId);
    setCurrentLevelId(lvl.id);
    loadLevel(lvl);
  };

  // Next level
  const handleNextLevel = () => {
    const nextId = currentLevel.id >= 50 ? 1 : currentLevel.id + 1;
    handleSelectLevel(nextId);
  };

  // Start daily challenge
  const handleStartDaily = () => {
    const dailyLvl = getDailyChallenge();
    loadLevel(dailyLvl);
  };

  // Power-up activation handler
  const handleUsePowerup = (type) => {
    if (!storage.usePowerup(type)) {
      setShowStore(true);
      return;
    }

    if (type === 'shield' && physicsRef.current) {
      physicsRef.current.activateShield();
      setActiveEffects(prev => ({ ...prev, shield: true }));
      setTimeout(() => setActiveEffects(prev => ({ ...prev, shield: false })), 6000);
    } else if (type === 'slowMo' && physicsRef.current) {
      physicsRef.current.activateSlowMo();
      setActiveEffects(prev => ({ ...prev, slowMo: true }));
      setTimeout(() => setActiveEffects(prev => ({ ...prev, slowMo: false })), 5000);
    } else if (type === 'magnet' && physicsRef.current) {
      physicsRef.current.activateMagnet();
      setActiveEffects(prev => ({ ...prev, magnet: true }));
      setTimeout(() => setActiveEffects(prev => ({ ...prev, magnet: false })), 4500);
    } else if (type === 'freeze' && physicsRef.current) {
      physicsRef.current.activateFreeze();
      setActiveEffects(prev => ({ ...prev, freeze: true }));
      setTimeout(() => setActiveEffects(prev => ({ ...prev, freeze: false })), 4000);
    } else if (type === 'extraInk' && drawingRef.current) {
      sound.playPowerup();
      drawingRef.current.addExtraInk(250);
    }
  };

  // Compute ink percentage
  const inkPercent = Math.max(0, Math.min(100, (inkState.remaining / inkState.max) * 100));
  const threeStarPercent = currentLevel ? (currentLevel.threeStarInk / currentLevel.inkLimit) * 100 : 50;

  return (
    <div className="w-full flex flex-col items-center justify-center py-4 px-2 sm:px-4 select-none">
      {/* Level Header Info & Controls (Fully Responsive on Mobile) */}
      <div className="w-full max-w-4xl bg-slate-900/90 border border-slate-800 rounded-2xl p-2.5 sm:px-4 sm:py-2.5 mb-2.5 shadow-lg flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2.5">
        {/* Left: Level Badge & Title */}
        <div className="flex items-center justify-between sm:justify-start gap-2.5">
          <div className="flex items-center gap-2.5 min-w-0">
            <button
              onClick={() => {
                sound.playClick();
                setShowLevelSelect(true);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 active:scale-95 text-xs font-bold text-slate-200 transition border border-slate-700 shrink-0"
            >
              <Grid className="w-4 h-4 text-emerald-400" />
              <span>LVL {currentLevel.id}</span>
            </button>

            <div className="min-w-0">
              <h2 className="text-sm sm:text-base font-extrabold text-white flex items-center gap-1.5 font-heading truncate">
                <span className="truncate">{currentLevel.title}</span>
                {currentLevel.isDaily && (
                  <span className="text-[9px] bg-orange-500/20 text-orange-400 border border-orange-500/40 px-1.5 py-0.5 rounded-full font-sans shrink-0">
                    DAILY
                  </span>
                )}
              </h2>
              <div className="text-[10px] text-slate-400 font-medium hidden md:block">
                {currentLevel.worldName} &bull; 3-Star Target: {currentLevel.threeStarInk} px ink
              </div>
            </div>
          </div>

          {/* Release Ball button on mobile header row if not released */}
          {!isBallReleased && (
            <button
              onClick={handleReleaseBall}
              className="sm:hidden flex items-center gap-1 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/30 active:scale-95 transition shrink-0"
              title="Release Ball"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>Roll 🚀</span>
            </button>
          )}
        </div>

        {/* Right: Action Toolbar */}
        <div className="flex items-center justify-end gap-1 sm:gap-1.5">
          {/* Release Ball button on desktop */}
          {!isBallReleased && (
            <button
              onClick={handleReleaseBall}
              className="hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 hover:from-emerald-400 hover:to-teal-300 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/30 transition transform hover:scale-105 active:scale-95 animate-pulse mr-1"
              title="Release Ball (Space)"
            >
              <Play className="w-3.5 h-3.5 fill-slate-950" />
              <span>Release Ball 🚀</span>
            </button>
          )}

          {/* Tutorial Video Quick Button */}
          <button
            onClick={() => {
              if (onOpenTutorial) {
                if (!isPaused) setIsPaused(true);
                onOpenTutorial();
              }
            }}
            className="p-2 sm:px-2.5 sm:py-1.5 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 transition flex items-center gap-1 active:scale-95"
            title="Watch 15s Tutorial Video"
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="text-[11px] font-bold hidden md:inline">Tutorial</span>
          </button>

          {/* Hint Toggle */}
          <button
            onClick={() => setHintVisible(prev => !prev)}
            className={`p-2 rounded-xl transition active:scale-95 ${
              hintVisible ? 'bg-amber-500/20 text-amber-300 border border-amber-500/40' : 'bg-slate-800 text-slate-400 hover:text-white'
            }`}
            title="Level Hint"
          >
            <HelpCircle className="w-4 h-4" />
          </button>

          {/* Restart Button */}
          <button
            onClick={handleRestart}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition active:scale-95"
            title="Restart Level (R)"
          >
            <RotateCcw className="w-4 h-4" />
          </button>

          {/* Pause Button */}
          <button
            onClick={() => setIsPaused(prev => !prev)}
            className={`p-2 rounded-xl transition active:scale-95 ${
              isPaused ? 'bg-amber-500 text-slate-950 font-bold' : 'bg-slate-800 text-slate-300 hover:text-white'
            }`}
            title="Pause Game (Space)"
          >
            {isPaused ? <Play className="w-4 h-4 fill-slate-950" /> : <Pause className="w-4 h-4" />}
          </button>

          {/* Settings Button */}
          <button
            onClick={() => setShowSettings(true)}
            className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition active:scale-95"
            title="Settings"
          >
            <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Hint Banner */}
      {hintVisible && (
        <div className="w-full max-w-4xl bg-amber-500/10 border border-amber-500/30 rounded-2xl p-3 mb-3 text-xs text-amber-200 flex items-center justify-between animate-fade-in">
          <div className="flex items-center gap-2">
            <HelpCircle className="w-4 h-4 text-amber-400 shrink-0" />
            <span><strong>Hint:</strong> {currentLevel.hint}</span>
          </div>
          <button
            onClick={() => setHintVisible(false)}
            className="text-xs font-bold text-amber-400 hover:underline ml-2"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Canvas Container */}
      <div className="relative w-full max-w-4xl rounded-3xl overflow-hidden border-2 border-slate-800 shadow-2xl bg-black aspect-[4/3] touch-none">
        <canvas
          ref={canvasRef}
          className="w-full h-full block cursor-crosshair"
          style={{ touchAction: 'none' }}
        />

        {/* Pause Overlay */}
        {isPaused && (
          <div className="absolute inset-0 bg-black/70 backdrop-blur-sm flex flex-col items-center justify-center text-white z-20">
            <h3 className="text-3xl font-black font-heading mb-2 text-emerald-400">GAME PAUSED</h3>
            <p className="text-xs text-slate-300 mb-4">Press Space or click Resume to continue</p>
            <button
              onClick={() => setIsPaused(false)}
              className="px-6 py-2.5 rounded-2xl bg-emerald-500 text-slate-950 font-bold text-sm shadow-lg hover:scale-105 transition transform"
            >
              Resume Game
            </button>
          </div>
        )}

        {/* Ink Gauge Overlay on Canvas Top */}
        <div className="absolute top-3 left-4 right-4 pointer-events-none flex items-center justify-between">
          <div className="bg-slate-900/80 backdrop-blur-md border border-slate-700/80 px-3.5 py-1.5 rounded-2xl flex items-center gap-3 shadow-lg">
            <span className="text-xs font-bold text-slate-300 flex items-center gap-1.5">
              <Edit3 className="w-3.5 h-3.5 text-emerald-400" />
              <span>Ink:</span>
            </span>

            {/* Ink Progress Bar */}
            <div className="relative w-28 sm:w-44 h-3 bg-slate-950 rounded-full overflow-hidden border border-slate-700">
              <div
                className={`h-full transition-all duration-75 ${
                  inkPercent > 50
                    ? 'bg-gradient-to-r from-emerald-500 to-teal-400'
                    : inkPercent > 20
                    ? 'bg-gradient-to-r from-amber-500 to-yellow-400'
                    : 'bg-gradient-to-r from-rose-500 to-red-400 animate-pulse'
                }`}
                style={{ width: `${inkPercent}%` }}
              />

              {/* 3-Star Marker Indicator */}
              <div
                className="absolute top-0 bottom-0 w-0.5 bg-amber-300 shadow-md"
                style={{ left: `${100 - threeStarPercent}%` }}
                title="3-Star Ink Limit"
              />
            </div>

            <span className="text-xs font-mono font-bold text-slate-300">
              {Math.round(inkState.remaining)} px
            </span>
          </div>

          {/* Active Powerup Badges */}
          <div className="flex gap-1.5">
            {activeEffects.shield && (
              <span className="bg-blue-500/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                🛡️ Shield Active
              </span>
            )}
            {activeEffects.slowMo && (
              <span className="bg-purple-500/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                ⏳ Slow-Mo Active
              </span>
            )}
            {activeEffects.freeze && (
              <span className="bg-cyan-500/80 text-white text-[10px] font-bold px-2 py-0.5 rounded-full animate-pulse">
                ❄️ Hazards Frozen
              </span>
            )}
          </div>
        </div>
      </div>

      {/* In-Game Power-Ups Bar */}
      <div className="w-full max-w-4xl bg-slate-900/95 border border-slate-800/90 rounded-2xl p-2 sm:p-2.5 mt-3 flex items-center justify-between gap-2 shadow-lg backdrop-blur-md">
        <div className="text-xs font-bold text-slate-400 px-2 hidden md:block shrink-0">
          Power-Ups:
        </div>

        {/* Scrollable / Flexible Power-ups Container */}
        <div className="flex items-center gap-1.5 sm:gap-2 overflow-x-auto py-1 px-0.5 no-scrollbar flex-1 min-w-0">
          {[
            { type: 'shield', label: 'Shield', icon: Shield, key: '1' },
            { type: 'slowMo', label: 'Slow-Mo', icon: Clock, key: '2' },
            { type: 'magnet', label: 'Magnet', icon: Compass, key: '3' },
            { type: 'freeze', label: 'Freeze', icon: Snowflake, key: '4' },
            { type: 'extraInk', label: '+Ink', icon: Edit3, key: '5' }
          ].map(p => {
            const count = (storage.get('powerups') || {})[p.type] || 0;
            const Icon = p.icon;

            return (
              <button
                key={p.type}
                type="button"
                onClick={() => handleUsePowerup(p.type)}
                className="shrink-0 min-h-[36px] flex items-center gap-1.5 px-2.5 sm:px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 active:scale-95 text-xs font-bold text-slate-200 transition-all border border-slate-700/80 group select-none cursor-pointer"
                title={`Use ${p.label} (Press ${p.key})`}
              >
                <Icon className="w-3.5 h-3.5 text-cyan-400 group-hover:scale-110 transition-transform shrink-0" />
                <span className="text-xs font-semibold whitespace-nowrap">{p.label}</span>
                <span className="bg-slate-950 text-emerald-400 font-mono text-[10px] font-bold px-1.5 py-0.5 rounded border border-emerald-500/20 shrink-0">
                  x{count}
                </span>
                <span className="hidden lg:inline text-[9px] text-slate-500 font-normal">
                  [{p.key}]
                </span>
              </button>
            );
          })}
        </div>

        {/* Fixed Non-Clipped Shop Button */}
        <button
          type="button"
          onClick={() => setShowStore(true)}
          className="shrink-0 min-h-[36px] flex items-center gap-1.5 text-xs font-bold text-amber-300 hover:text-amber-200 bg-gradient-to-r from-amber-500/15 to-yellow-500/15 hover:from-amber-500/25 hover:to-yellow-500/25 border border-amber-500/30 px-3 sm:px-3.5 py-1.5 rounded-xl transition-all shadow-sm active:scale-95 cursor-pointer whitespace-nowrap"
          title="Open Locker & Power Shop"
        >
          <Sparkles className="w-3.5 h-3.5 text-amber-400 shrink-0" />
          <span>Shop</span>
        </button>
      </div>

      {/* Single Responsive AdSense Unit Below Game Canvas */}
      <AdBanner slot="7788990011" format="horizontal" />

      {/* Modals */}
      <VictoryModal
        isOpen={Boolean(victoryState)}
        level={victoryState ? victoryState.level : currentLevel}
        stars={victoryState ? victoryState.stars : 3}
        coinsWon={victoryState ? victoryState.coinsWon : 45}
        score={victoryState ? victoryState.score : 1200}
        inkUsed={victoryState ? victoryState.inkUsed : 150}
        timeTaken={victoryState ? victoryState.timeTaken : 6}
        onNextLevel={handleNextLevel}
        onReplay={handleRestart}
      />

      <DefeatModal
        isOpen={Boolean(defeatState)}
        level={defeatState ? defeatState.level : currentLevel}
        cause={defeatState ? defeatState.cause : 'hazard'}
        shieldCount={defeatState ? defeatState.shieldCount : 0}
        onRetry={handleRestart}
        onUseShield={() => {
          handleUsePowerup('shield');
          handleRestart();
        }}
      />

      <LevelSelectModal
        isOpen={showLevelSelect}
        onClose={() => setShowLevelSelect(false)}
        currentLevelId={currentLevel.id}
        onSelectLevel={handleSelectLevel}
      />

      <StoreModal
        isOpen={showStore}
        onClose={() => setShowStore(false)}
        onUpdate={() => setCoins(storage.get('coins'))}
      />

      <SettingsModal
        isOpen={showSettings}
        onClose={() => setShowSettings(false)}
      />

      <DailyChallengeModal
        isOpen={showDaily}
        onClose={() => setShowDaily(false)}
        onStartDaily={handleStartDaily}
      />
    </div>
  );
}
