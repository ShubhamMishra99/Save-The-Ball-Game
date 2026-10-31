import React from 'react';
import AdBanner from '../components/AdSense/AdBanner';
import { Heart, ShieldCheck, Cpu, Sparkles } from 'lucide-react';

export default function About({ onPlayNow }) {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-slate-300">
      <div className="text-center space-y-4 mb-10">
        <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 border border-teal-500/30 rounded-full">
          The Origin Story
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
          About <span className="text-transparent bg-clip-text bg-gradient-to-r from-teal-400 via-emerald-300 to-cyan-400">Save the Ball!</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto leading-relaxed">
          Born from a passion for classic physics puzzlers and joyful modern web technology.
        </p>
      </div>

      <AdBanner slot="2233445566" format="horizontal" />

      <div className="space-y-8 my-8 text-sm sm:text-base leading-relaxed text-slate-300">
        <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/80 space-y-3">
          <h2 className="text-xl font-bold text-white font-heading flex items-center gap-2">
            <Heart className="w-5 h-5 text-rose-400" /> Our Mission & Vision
          </h2>
          <p>
            <strong>Save the Ball!</strong> was engineered with a singular focus: create an authentic, responsive, and genuinely charming physics puzzle game that runs effortlessly across any desktop or mobile browser.
          </p>
          <p className="text-slate-400 text-xs sm:text-sm">
            Inspired by legendary tactile physics titles such as <em>Cut the Rope</em>, <em>Where's My Water?</em>, and <em>Line Rider</em>, our game empowers players to use their imagination. There is never just one rigid solution to any puzzle—if your drawn ramp works with Matter.js physical dynamics, it's a winning strategy!
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/80 space-y-3">
          <h2 className="text-xl font-bold text-white font-heading flex items-center gap-2">
            <Cpu className="w-5 h-5 text-blue-400" /> Cutting-Edge Web Engine
          </h2>
          <p>
            Built using modern <strong>React</strong>, <strong>Vite</strong>, and <strong>Matter.js</strong>, our game runs at a fluid 60 frames per second with low battery overhead and instant load times.
          </p>
          <ul className="list-disc list-inside space-y-1 text-xs sm:text-sm text-slate-400 pl-2">
            <li>Zero bloated multi-megabyte app downloads.</li>
            <li>Self-contained procedural Web Audio synthesizer—no delayed audio streaming.</li>
            <li>Deterministic daily challenges synchronized globally.</li>
            <li>Local-first persistence via Web Storage API with zero invasive tracking.</li>
          </ul>
        </div>
      </div>

      <div className="text-center pt-6">
        <button
          onClick={onPlayNow}
          className="inline-flex items-center gap-2 px-8 py-3.5 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-base shadow-xl shadow-emerald-500/30 hover:scale-105 transition transform"
        >
          Start Rescuing Balls Now &rarr;
        </button>
      </div>
    </div>
  );
}
