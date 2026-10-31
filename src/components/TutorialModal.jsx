import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  X,
  Play,
  Pause,
  RotateCcw,
  Volume2,
  VolumeX,
  Sparkles,
  ArrowRight,
  ShieldAlert,
  Edit3,
  Compass,
  CheckCircle2,
  Trophy
} from 'lucide-react';
import sound from '../utils/audio';

const STORYBOARD_STEPS = [
  {
    phase: 1,
    start: 0,
    end: 3,
    title: 'Your ball is in danger!',
    subtitle: 'Falling towards sharp spikes and deadly hazards.',
    icon: ShieldAlert,
    color: 'text-rose-400',
    borderColor: 'border-rose-500/40',
    badgeBg: 'bg-rose-500/20 text-rose-300 border-rose-500/40'
  },
  {
    phase: 2,
    start: 3,
    end: 6,
    title: 'Draw a line to protect it!',
    subtitle: 'Drag your finger or mouse to draw physical paths and bridges.',
    icon: Edit3,
    color: 'text-cyan-400',
    borderColor: 'border-cyan-500/40',
    badgeBg: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
  },
  {
    phase: 3,
    start: 6,
    end: 9,
    title: 'Use physics to guide the ball!',
    subtitle: 'Bounces, ramps, and gravity work naturally with your strokes.',
    icon: Compass,
    color: 'text-amber-400',
    borderColor: 'border-amber-500/40',
    badgeBg: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
  },
  {
    phase: 4,
    start: 9,
    end: 12,
    title: 'Reach the SAVE ZONE!',
    subtitle: 'Guide the ball into the glowing green circular goal.',
    icon: CheckCircle2,
    color: 'text-emerald-400',
    borderColor: 'border-emerald-500/40',
    badgeBg: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
  },
  {
    phase: 5,
    start: 12,
    end: 15,
    title: 'SAVE THE BALL! YOU GOT THIS!',
    subtitle: "You're ready to play! Jump in and save your ball.",
    icon: Trophy,
    color: 'text-yellow-300',
    borderColor: 'border-yellow-500/40',
    badgeBg: 'bg-yellow-500/20 text-yellow-300 border-yellow-500/40'
  }
];

export default function TutorialModal({
  isOpen,
  onClose,
  isFirstTime = false,
  onPlayNow
}) {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(true);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(15);
  const [isEnded, setIsEnded] = useState(false);
  const [autoplayBlocked, setAutoplayBlocked] = useState(false);

  // Determine active storyboard step
  const activeStep = STORYBOARD_STEPS.find(
    s => currentTime >= s.start && (currentTime < s.end || s.phase === 5)
  ) || STORYBOARD_STEPS[0];

  const handleFinishOrSkip = useCallback((action = 'skip') => {
    try {
      localStorage.setItem('save_the_ball_tutorial_seen', 'true');
    } catch (e) {
      console.warn('LocalStorage unavailable', e);
    }
    if (videoRef.current) {
      videoRef.current.pause();
    }
    sound.playClick();
    if (action === 'playNow') {
      if (onPlayNow) onPlayNow();
      else onClose();
    } else {
      onClose();
    }
  }, [onClose, onPlayNow]);

  // Escape key and Spacebar handler
  useEffect(() => {
    if (!isOpen) return;

    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleFinishOrSkip('skip');
      } else if (e.key === ' ' && e.target.tagName !== 'BUTTON') {
        e.preventDefault();
        togglePlayPause();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, handleFinishOrSkip]);

  // Autoplay management when modal opens
  useEffect(() => {
    if (!isOpen) {
      setIsPlaying(false);
      setCurrentTime(0);
      setIsEnded(false);
      setAutoplayBlocked(false);
      return;
    }

    const timer = setTimeout(() => {
      const vid = videoRef.current;
      if (vid) {
        vid.currentTime = 0;
        vid.muted = isMuted;
        const playPromise = vid.play();
        if (playPromise !== undefined) {
          playPromise
            .then(() => {
              setIsPlaying(true);
              setAutoplayBlocked(false);
            })
            .catch((err) => {
              console.warn('Autoplay prevented by browser:', err);
              setIsPlaying(false);
              setAutoplayBlocked(true);
            });
        }
      }
    }, 150);

    return () => clearTimeout(timer);
  }, [isOpen]);

  const togglePlayPause = () => {
    const vid = videoRef.current;
    if (!vid) return;

    if (vid.paused || vid.ended) {
      vid.play()
        .then(() => {
          setIsPlaying(true);
          setAutoplayBlocked(false);
        })
        .catch(e => console.warn('Play error:', e));
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  };

  const handleReplay = () => {
    sound.playClick();
    const vid = videoRef.current;
    if (!vid) return;
    vid.currentTime = 0;
    setCurrentTime(0);
    setIsEnded(false);
    vid.play()
      .then(() => {
        setIsPlaying(true);
        setAutoplayBlocked(false);
      })
      .catch(e => console.warn('Play error:', e));
  };

  const handleJumpToStep = (startTime) => {
    sound.playClick();
    const vid = videoRef.current;
    if (vid) {
      vid.currentTime = startTime;
      setCurrentTime(startTime);
      if (vid.paused) {
        vid.play().catch(() => {});
        setIsPlaying(true);
      }
    }
  };

  const toggleMute = () => {
    const vid = videoRef.current;
    if (!vid) return;
    const nextMuted = !isMuted;
    vid.muted = nextMuted;
    setIsMuted(nextMuted);
    sound.playClick();
  };

  const handleTimeUpdate = () => {
    if (!videoRef.current) return;
    const cur = videoRef.current.currentTime;
    setCurrentTime(cur);
    if (cur >= 14.8) {
      setIsEnded(true);
    }
  };

  const handleVideoEnded = () => {
    setIsPlaying(false);
    setIsEnded(true);
    try {
      localStorage.setItem('save_the_ball_tutorial_seen', 'true');
    } catch (e) {}
  };

  const handleProgressClick = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const ratio = Math.max(0, Math.min(1, clickX / rect.width));
    const targetTime = ratio * (duration || 15);
    if (videoRef.current) {
      videoRef.current.currentTime = targetTime;
      setCurrentTime(targetTime);
    }
  };

  if (!isOpen) return null;

  const progressPercent = Math.min(100, Math.max(0, (currentTime / (duration || 15)) * 100));

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-labelledby="tutorial-modal-title"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-5 bg-slate-950/85 backdrop-blur-md overflow-y-auto"
      onClick={(e) => {
        if (e.target === e.currentTarget) handleFinishOrSkip('skip');
      }}
    >
      {/* Modal Container: Same size as game box (max-w-4xl, rounded-3xl, border-2) */}
      <div className="relative w-full max-w-4xl bg-[#0A0F1D] border-2 border-cyan-500/40 rounded-3xl shadow-[0_0_50px_rgba(6,182,212,0.25)] overflow-hidden flex flex-col my-auto max-h-[94vh]">
        {/* Top cyan gradient accent glow line */}
        <div className="h-1.5 w-full bg-gradient-to-r from-amber-400 via-cyan-400 to-emerald-400 shrink-0" />

        {/* 1. MODAL HEADER: Clean layout, high-contrast title, close button right-aligned */}
        <div className="px-5 sm:px-6 py-3.5 bg-[#0D1527] border-b border-slate-800 flex items-center justify-between gap-4 shrink-0">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0 shadow-inner">
              <Sparkles className="w-5 h-5 text-cyan-400" />
            </div>
            <div className="min-w-0">
              <h2
                id="tutorial-modal-title"
                className="text-base sm:text-lg font-black text-white font-heading tracking-tight truncate leading-tight"
              >
                {isFirstTime ? 'NEW HERE? LEARN HOW TO PLAY!' : 'HOW TO PLAY TUTORIAL'}
              </h2>
              <p className="text-[11px] sm:text-xs text-cyan-300/80 font-medium truncate mt-0.5">
                15-second masterclass • Draw lines to save the ball
              </p>
            </div>
          </div>

          {/* Close Button: Aligned to Right */}
          <button
            type="button"
            onClick={() => handleFinishOrSkip('skip')}
            className="p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-700/50 transition shrink-0"
            aria-label="Close Tutorial"
            title="Close Tutorial (Esc)"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scrollable Main Body */}
        <div className="overflow-y-auto flex-1 flex flex-col">
          {/* 2. VIDEO SECTION: Dedicated 16:9 container matching game box width, object-contain, clean top-right overlay controls */}
          <div className="w-full aspect-video bg-black relative flex items-center justify-center overflow-hidden shrink-0 group">
            <video
              ref={videoRef}
              className="w-full h-full object-contain select-none"
              playsInline
              muted={isMuted}
              preload="metadata"
              poster="/tutorial-poster.jpg"
              onTimeUpdate={handleTimeUpdate}
              onEnded={handleVideoEnded}
              onLoadedMetadata={() => {
                if (videoRef.current && videoRef.current.duration) {
                  setDuration(videoRef.current.duration);
                }
              }}
              onClick={togglePlayPause}
            >
              <source src="/tutorial.webm" type="video/webm" />
              <source src="/tutorial.mp4" type="video/mp4" />
              Your browser does not support HTML5 video.
            </video>

              {/* Autoplay Blocked or Paused Center Overlay Button */}
              {(!isPlaying || autoplayBlocked) && (
                <div
                  onClick={togglePlayPause}
                  className="absolute inset-0 bg-slate-950/45 backdrop-blur-[2px] flex flex-col items-center justify-center cursor-pointer transition z-10"
                >
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-gradient-to-tr from-cyan-500 to-emerald-400 p-1 shadow-2xl shadow-cyan-500/40 hover:scale-105 active:scale-95 transition transform flex items-center justify-center">
                    <div className="w-full h-full bg-slate-950 rounded-full flex items-center justify-center text-cyan-300">
                      <Play className="w-8 h-8 sm:w-10 sm:h-10 ml-1 fill-cyan-300" />
                    </div>
                  </div>
                  <p className="mt-3 text-xs sm:text-sm font-bold text-white bg-slate-900/90 px-3.5 py-1 rounded-full border border-cyan-500/40 shadow-lg">
                    {autoplayBlocked ? 'Tap to Play Tutorial' : 'Paused • Tap to Resume'}
                  </p>
                </div>
              )}

              {/* Dedicated Video Controls Overlay Toolbar:
                  Placed at Top-Right so it NEVER overlaps subtitles or gameplay instructions at the bottom */}
              <div className="absolute top-2.5 right-2.5 sm:top-3 sm:right-3 flex items-center gap-1.5 sm:gap-2 bg-slate-950/85 backdrop-blur-md px-2.5 py-1.5 rounded-xl border border-cyan-500/30 shadow-xl z-20">
                {/* Play / Pause Button */}
                <button
                  type="button"
                  onClick={togglePlayPause}
                  className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-500 text-white hover:text-slate-950 transition"
                  title={isPlaying ? 'Pause' : 'Play'}
                  aria-label={isPlaying ? 'Pause' : 'Play'}
                >
                  {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                </button>

                {/* Replay Quick Button */}
                <button
                  type="button"
                  onClick={handleReplay}
                  className="p-1.5 rounded-lg bg-slate-800/80 hover:bg-cyan-500 text-cyan-300 hover:text-slate-950 transition"
                  title="Replay from Beginning"
                  aria-label="Replay Tutorial Video"
                >
                  <RotateCcw className="w-4 h-4" />
                </button>

                {/* Sound Toggle (Mute / Unmute) */}
                <button
                  type="button"
                  onClick={toggleMute}
                  className={`p-1.5 rounded-lg border transition flex items-center gap-1 text-xs font-bold ${
                    isMuted
                      ? 'bg-slate-800/80 text-slate-400 border-slate-700/60 hover:text-white'
                      : 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40 hover:bg-emerald-500/30'
                  }`}
                  title={isMuted ? 'Turn Sound ON' : 'Mute Sound'}
                  aria-label={isMuted ? 'Turn Sound ON' : 'Mute Sound'}
                >
                  {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                  <span className="text-[11px] hidden sm:inline">{isMuted ? 'Muted' : 'Sound ON'}</span>
                </button>

                {/* Timestamp Pill */}
                <div className="text-[11px] font-mono font-bold text-cyan-300 bg-slate-900/90 px-2 py-0.5 rounded-md border border-cyan-500/30 shrink-0">
                  {Math.floor(currentTime)}s / {Math.floor(duration || 15)}s
                </div>
              </div>
            </div>

          {/* 3. STEP INFORMATION: Completely separate dedicated section below the video */}
          <div className="p-4 sm:p-5 bg-[#0D1527] border-t border-b border-slate-800/80 flex flex-col gap-3 shrink-0">
            {/* Top row: STEP X OF 5 Badge, Timestamp, and Jump Dots */}
            <div className="flex items-center justify-between gap-2">
              <div className="flex items-center gap-2">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-black uppercase tracking-wider border font-mono ${activeStep.badgeBg}`}>
                  STEP {activeStep.phase} OF 5
                </span>
                <span className="text-xs font-mono font-bold text-slate-300 bg-slate-800/80 px-2.5 py-1 rounded-lg border border-slate-700/60">
                  {Math.floor(currentTime)}s / {Math.floor(duration || 15)}s
                </span>
              </div>

              {/* Step Navigation Dots (Steps 1 to 5) */}
              <div className="flex items-center gap-1.5 sm:gap-2">
                {STORYBOARD_STEPS.map((s) => {
                  const isActive = activeStep.phase === s.phase;
                  const isPast = currentTime >= s.end;
                  return (
                    <button
                      key={s.phase}
                      type="button"
                      onClick={() => handleJumpToStep(s.start)}
                      className={`transition-all duration-200 ${
                        isActive
                          ? 'w-6 h-2 rounded-full bg-cyan-400 ring-2 ring-cyan-400/40'
                          : isPast
                          ? 'w-2 h-2 rounded-full bg-emerald-500'
                          : 'w-2 h-2 rounded-full bg-slate-700 hover:bg-slate-600'
                      }`}
                      title={`Jump to Step ${s.phase}: ${s.title}`}
                      aria-label={`Jump to Step ${s.phase}`}
                    />
                  );
                })}
              </div>
            </div>

            {/* Clickable Progress Bar */}
            <div
              onClick={handleProgressClick}
              className="relative w-full h-2 bg-slate-800/90 rounded-full overflow-hidden cursor-pointer group"
              title="Click to seek"
              role="progressbar"
              aria-valuenow={Math.round(progressPercent)}
              aria-valuemin="0"
              aria-valuemax="100"
            >
              <div
                className="h-full bg-gradient-to-r from-cyan-400 via-teal-300 to-emerald-400 transition-all duration-100 rounded-full"
                style={{ width: `${progressPercent}%` }}
              />
            </div>

            {/* Instruction Title and Description (Never on top of video!) */}
            <div className="flex items-start gap-3 sm:gap-3.5 pt-0.5">
              <div
                className={`w-10 h-10 rounded-xl flex-shrink-0 flex items-center justify-center border ${activeStep.borderColor} bg-slate-900/90 shadow-sm mt-0.5`}
              >
                <activeStep.icon className={`w-5 h-5 ${activeStep.color}`} />
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="text-sm sm:text-base font-bold text-white tracking-tight leading-snug">
                  {activeStep.title}
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 font-medium leading-relaxed mt-0.5">
                  {activeStep.subtitle}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* 4. FOOTER: Separate dark navy bar, Skip on Left, Replay + Play Now on Right */}
        <div className="px-5 sm:px-6 py-3.5 bg-[#080D1A] border-t border-slate-800/90 flex flex-wrap items-center justify-between gap-3 shrink-0">
          {/* Left: Skip Tutorial */}
          <button
            type="button"
            onClick={() => handleFinishOrSkip('skip')}
            className="h-11 px-4 sm:px-5 rounded-xl text-xs sm:text-sm font-bold text-slate-400 hover:text-white bg-slate-800/60 hover:bg-slate-800 border border-slate-700/60 transition active:scale-95 flex items-center justify-center"
          >
            Skip Tutorial
          </button>

          {/* Right: Replay and Play Now */}
          <div className="flex items-center gap-2.5 sm:gap-3">
            <button
              type="button"
              onClick={handleReplay}
              className="h-11 px-3.5 sm:px-4 rounded-xl text-xs sm:text-sm font-bold text-cyan-300 hover:text-cyan-200 bg-cyan-950/40 hover:bg-cyan-900/50 border border-cyan-500/30 transition flex items-center gap-1.5 active:scale-95"
              title="Replay Video from Start"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Replay</span>
            </button>

            <button
              type="button"
              onClick={() => handleFinishOrSkip('playNow')}
              className="h-11 px-5 sm:px-7 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-cyan-400 hover:from-emerald-400 hover:to-cyan-300 text-slate-950 font-black text-xs sm:text-sm tracking-wider uppercase shadow-lg shadow-emerald-500/25 hover:shadow-cyan-500/40 hover:scale-[1.02] active:scale-[0.98] transition transform flex items-center gap-2"
            >
              <span>{isEnded ? "LET'S PLAY!" : 'PLAY NOW'}</span>
              <ArrowRight className="w-4 h-4 stroke-[3]" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
