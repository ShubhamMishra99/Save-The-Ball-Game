import React from 'react';
import { Sparkles, Gamepad2, Compass, Shield, Heart, ArrowRight } from 'lucide-react';

export default function Footer({ onNavigate, onOpenLevels, onOpenDaily, onOpenTutorial }) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="w-full bg-[#060A14] border-t border-slate-800/80 text-slate-400 text-xs mt-12 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12 py-12 lg:py-16">
          
          {/* Column 1: BRAND */}
          <div className="space-y-4 sm:pr-4">
            <div
              onClick={() => onNavigate && onNavigate('game')}
              className="inline-flex items-center gap-2.5 cursor-pointer group"
            >
              <div className="w-9 h-9 rounded-2xl bg-gradient-to-tr from-amber-500 to-yellow-300 p-0.5 shadow-lg shadow-amber-500/20 group-hover:scale-105 transition transform">
                <div className="w-full h-full bg-slate-950 rounded-[14px] flex items-center justify-center">
                  <span className="text-xl">🟡</span>
                </div>
              </div>
              <div>
                <span className="text-lg font-black font-heading text-white tracking-tight group-hover:text-emerald-400 transition">
                  SAVE THE BALL!
                </span>
                <span className="block text-[10px] font-bold uppercase tracking-wider text-emerald-400">
                  Physics Puzzle
                </span>
              </div>
            </div>

            <p className="text-slate-400 text-xs leading-relaxed">
              The premier free browser-based physics puzzle adventure. Draw solid lines, construct ramps, avoid deadly spikes and lava, and save your cute bouncy ball across 50 exhilarating levels.
            </p>

            <div className="pt-1">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-bold text-emerald-300 bg-emerald-500/10 border border-emerald-500/30">
                <Sparkles className="w-3 h-3 text-emerald-400" />
                <span>One line can save a life!</span>
              </span>
            </div>
          </div>

          {/* Column 2: QUICK PLAY */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest font-heading">
                Quick Play
              </h4>
            </div>

            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('game')}
                  className="group flex items-center gap-2 text-left text-xs sm:text-sm text-slate-400 hover:text-emerald-400 transition-all duration-200 bg-transparent border-0 p-0 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-emerald-400 group-hover:scale-125 transition-all duration-200" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Play Game</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenTutorial) onOpenTutorial();
                    else if (onNavigate) onNavigate('how-to-play');
                  }}
                  className="group flex items-center gap-2 text-left text-xs sm:text-sm text-slate-400 hover:text-cyan-400 transition-all duration-200 bg-transparent border-0 p-0 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-500/60 group-hover:bg-cyan-400 group-hover:scale-125 transition-all duration-200" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200 font-medium text-cyan-300">
                    How to Play (Video Tutorial)
                  </span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenLevels) onOpenLevels();
                    else if (onNavigate) onNavigate('game');
                  }}
                  className="group flex items-center gap-2 text-left text-xs sm:text-sm text-slate-400 hover:text-emerald-400 transition-all duration-200 bg-transparent border-0 p-0 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-emerald-400 group-hover:scale-125 transition-all duration-200" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Level Selection (50 Levels)</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => {
                    if (onOpenDaily) onOpenDaily();
                    else if (onNavigate) onNavigate('game');
                  }}
                  className="group flex items-center gap-2 text-left text-xs sm:text-sm text-slate-400 hover:text-emerald-400 transition-all duration-200 bg-transparent border-0 p-0 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-emerald-400 group-hover:scale-125 transition-all duration-200" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Daily Challenge</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: INFORMATION */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-cyan-400" />
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest font-heading">
                Information
              </h4>
            </div>

            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('about')}
                  className="group flex items-center gap-2 text-left text-xs sm:text-sm text-slate-400 hover:text-cyan-400 transition-all duration-200 bg-transparent border-0 p-0 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-cyan-400 group-hover:scale-125 transition-all duration-200" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">About Us</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('privacy')}
                  className="group flex items-center gap-2 text-left text-xs sm:text-sm text-slate-400 hover:text-cyan-400 transition-all duration-200 bg-transparent border-0 p-0 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-cyan-400 group-hover:scale-125 transition-all duration-200" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Privacy Policy</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('terms')}
                  className="group flex items-center gap-2 text-left text-xs sm:text-sm text-slate-400 hover:text-cyan-400 transition-all duration-200 bg-transparent border-0 p-0 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-cyan-400 group-hover:scale-125 transition-all duration-200" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Terms &amp; Conditions</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('contact')}
                  className="group flex items-center gap-2 text-left text-xs sm:text-sm text-slate-400 hover:text-cyan-400 transition-all duration-200 bg-transparent border-0 p-0 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-cyan-400 group-hover:scale-125 transition-all duration-200" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Contact Us</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('disclaimer')}
                  className="group flex items-center gap-2 text-left text-xs sm:text-sm text-slate-400 hover:text-cyan-400 transition-all duration-200 bg-transparent border-0 p-0 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-cyan-400 group-hover:scale-125 transition-all duration-200" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Disclaimer</span>
                </button>
              </li>
            </ul>
          </div>

          {/* Column 4: EXPLORE */}
          <div className="space-y-3.5">
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-amber-400" />
              <h4 className="text-xs font-bold text-slate-200 uppercase tracking-widest font-heading">
                Explore
              </h4>
            </div>

            <ul className="space-y-2.5">
              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('how-to-play')}
                  className="group flex items-center gap-2 text-left text-xs sm:text-sm text-slate-400 hover:text-amber-400 transition-all duration-200 bg-transparent border-0 p-0 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-amber-400 group-hover:scale-125 transition-all duration-200" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Physics Puzzle</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('how-to-play')}
                  className="group flex items-center gap-2 text-left text-xs sm:text-sm text-slate-400 hover:text-amber-400 transition-all duration-200 bg-transparent border-0 p-0 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-amber-400 group-hover:scale-125 transition-all duration-200" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Drawing Games</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('game')}
                  className="group flex items-center gap-2 text-left text-xs sm:text-sm text-slate-400 hover:text-amber-400 transition-all duration-200 bg-transparent border-0 p-0 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-amber-400 group-hover:scale-125 transition-all duration-200" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Brain Games</span>
                </button>
              </li>

              <li>
                <button
                  type="button"
                  onClick={() => onNavigate && onNavigate('about')}
                  className="group flex items-center gap-2 text-left text-xs sm:text-sm text-slate-400 hover:text-amber-400 transition-all duration-200 bg-transparent border-0 p-0 cursor-pointer"
                >
                  <span className="w-1.5 h-1.5 rounded-full bg-slate-700 group-hover:bg-amber-400 group-hover:scale-125 transition-all duration-200" />
                  <span className="group-hover:translate-x-1 transition-transform duration-200">Mobile Games</span>
                </button>
              </li>
            </ul>

            <div className="pt-2">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-900/90 border border-slate-800 text-[11px] text-slate-400 font-mono">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>Matter.js Engine Active</span>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Bar: Copyright, Credits & Compatibility */}
        <div className="border-t border-slate-800/80 py-6 flex flex-col sm:flex-row items-center justify-between text-slate-400 text-xs gap-3 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-2">
            <span>&copy; {currentYear} SAVE THE BALL! Online. All rights reserved.</span>
            <span className="hidden sm:inline text-slate-600">&bull;</span>
            <span className="text-cyan-400 font-semibold">Created by Shubham mishra techworld</span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-x-3 gap-y-1 text-slate-400 text-[11px]">
            <span>Chrome</span>
            <span>&bull;</span>
            <span>Firefox</span>
            <span>&bull;</span>
            <span>Edge</span>
            <span>&bull;</span>
            <span>Safari</span>
            <span>&bull;</span>
            <span>Android</span>
            <span>&bull;</span>
            <span>iOS</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
