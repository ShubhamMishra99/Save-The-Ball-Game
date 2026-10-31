import React from 'react';
import AdBanner from '../components/AdSense/AdBanner';
import { Edit3, Shield, Star, Award, Compass, Zap, HelpCircle, Play } from 'lucide-react';

export default function HowToPlay({ onPlayNow, onOpenTutorial }) {
  return (
    <div className="max-w-5xl mx-auto px-4 sm:px-6 py-10 text-slate-300">
      {/* Hero Header */}
      <div className="text-center space-y-4 mb-10">
        <span className="inline-block px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
          Official Master Guide
        </span>
        <h1 className="text-3xl sm:text-5xl font-black font-heading text-white tracking-tight">
          How to Play <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400">Save the Ball</span>
        </h1>
        <p className="text-slate-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
          Master the art of 2D physics drawing! Learn how gravity, friction, and stroke conservation come together to save your adorable bouncing ball from deadly traps.
        </p>

        <div className="pt-2 flex flex-wrap items-center justify-center gap-3">
          <button
            onClick={onOpenTutorial}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 border border-cyan-500/40 font-bold text-sm shadow-xl shadow-cyan-500/20 hover:scale-105 active:scale-95 transition transform"
          >
            <Play className="w-4 h-4 fill-cyan-300" />
            <span>Watch 15s Video Tutorial</span>
          </button>

          <button
            onClick={onPlayNow}
            className="inline-flex items-center gap-2 px-6 py-3 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/30 hover:scale-105 active:scale-95 transition transform"
          >
            <span>Jump into Level 1 Now &rarr;</span>
          </button>
        </div>
      </div>

      {/* Ad placement */}
      <AdBanner slot="1122334455" format="horizontal" />

      {/* Core Rules Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-10">
        <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/80 flex flex-col items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold text-xl">
            1
          </div>
          <h3 className="text-xl font-bold text-white font-heading">Draw Protective Lines</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Drag your mouse cursor on desktop or drag your finger on mobile touchscreen to sketch solid barriers. As soon as you draw, your lines turn into real rigid physical objects in the world that interact with gravity and the ball.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/80 flex flex-col items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-amber-500/20 text-amber-400 flex items-center justify-center font-bold text-xl">
            2
          </div>
          <h3 className="text-xl font-bold text-white font-heading">Guide into Safe Zone</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            The ball is subject to realistic gravity and begins tumbling immediately. Your objective is to bounce, slide, or funnel the ball into the glowing green circular <strong>SAVE ZONE</strong> and hold it there safely for a fraction of a second.
          </p>
        </div>

        <div className="p-6 rounded-3xl bg-slate-800/60 border border-slate-700/80 flex flex-col items-start gap-4">
          <div className="w-12 h-12 rounded-2xl bg-rose-500/20 text-rose-400 flex items-center justify-center font-bold text-xl">
            3
          </div>
          <h3 className="text-xl font-bold text-white font-heading">Dodge Lethal Hazards</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Touching razor-sharp spikes, boiling red lava, spinning buzzsaws, or high-voltage laser beams results in instant defeat. Use your drawn strokes to shield the ball, cushion drops, or build bridges high above danger!
          </p>
        </div>
      </div>

      {/* 3-Star Mastery Strategy */}
      <div className="my-12 p-8 rounded-3xl bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 border border-amber-500/30">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2.5 rounded-2xl bg-amber-500/20 text-amber-400">
            <Star className="w-6 h-6 fill-amber-400" />
          </div>
          <h2 className="text-2xl font-bold text-white font-heading">
            How to Earn 3 Stars on Every Level
          </h2>
        </div>
        <p className="text-sm text-slate-300 leading-relaxed mb-6">
          Every level provides an Ink Gauge that limits how much total stroke length you can draw. The fewer pixels of ink you use to solve the puzzle, the higher your rating:
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
          <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700/80">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm mb-1">
              <Star className="w-4 h-4 fill-amber-400" />
              <span>1 Star: Completion</span>
            </div>
            <p className="text-xs text-slate-400">
              Awarded whenever the ball reaches the save zone within the maximum ink allowance.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/90 border border-slate-700/80">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm mb-1">
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <span>2 Stars: Good Plan</span>
            </div>
            <p className="text-xs text-slate-400">
              Awarded for solving the level with efficient stroke placement and minimal waste.
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-slate-800/90 border border-amber-500/40 bg-amber-500/10">
            <div className="flex items-center gap-1.5 text-amber-400 font-bold text-sm mb-1">
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <Star className="w-4 h-4 fill-amber-400" />
              <span>3 Stars: Master Genius</span>
            </div>
            <p className="text-xs text-slate-400">
              Draw the tightest, most elegant single-stroke solution to unlock maximum coins and glory!
            </p>
          </div>
        </div>
      </div>

      {/* Physics & Special Hazards Breakdown */}
      <div className="my-12 space-y-6">
        <h2 className="text-2xl font-bold text-white font-heading">
          World Obstacles & Special Mechanics
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700">
            <h4 className="font-bold text-white text-base mb-1 flex items-center gap-2">
              🌋 Boiling Lava (World 2)
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Unlike static spikes, lava features bubbling animated surfaces. The ball sinks quickly upon touch, so draw suspension bridges well clear of the heat line.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700">
            <h4 className="font-bold text-white text-base mb-1 flex items-center gap-2">
              ⚙️ Rotating Buzzsaws (World 3)
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Whirring steel cogs with serrated edges that rotate and often patrol left-to-right. Build angled canopies over the ball to deflect it over or under their orbit.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700">
            <h4 className="font-bold text-white text-base mb-1 flex items-center gap-2">
              🚀 Low Gravity & Portals (World 4)
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              In space, gravity is reduced to ~38%, causing the ball to float gracefully. Entering a glowing blue portal immediately warps the ball to its orange exit gateway!
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/60 border border-slate-700">
            <h4 className="font-bold text-white text-base mb-1 flex items-center gap-2">
              🧪 Multi-Ball & Switches (World 5)
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Crazy Lab introduces twin and triple ball rescues. All balls must safely occupy the Save Zone together! Roll a ball over floor pads to raise blast doors.
            </p>
          </div>
        </div>
      </div>

      {/* Frequently Asked Questions (FAQ) */}
      <div className="my-12 space-y-4">
        <h2 className="text-2xl font-bold text-white font-heading mb-4 flex items-center gap-2">
          <HelpCircle className="w-6 h-6 text-emerald-400" /> Frequently Asked Questions
        </h2>

        <div className="space-y-3">
          <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700">
            <h4 className="font-bold text-white text-sm">Is Save the Ball completely free to play?</h4>
            <p className="text-xs text-slate-400 mt-1">
              Yes, 100%! All 50 levels, skins, trails, and daily challenges are playable directly in your web browser with zero paywalls or mandatory downloads.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700">
            <h4 className="font-bold text-white text-sm">Can I play on my Android phone or iPhone?</h4>
            <p className="text-xs text-slate-400 mt-1">
              Absolutely. Save the Ball is fully optimized for mobile touchscreens with responsive high-DPI canvas scaling, touch-scroll cancellation, and large touch-friendly controls.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-800/50 border border-slate-700">
            <h4 className="font-bold text-white text-sm">How does the Daily Challenge work?</h4>
            <p className="text-xs text-slate-400 mt-1">
              Every day at midnight UTC, a new brain puzzle is synchronized for all players worldwide. Completing it awards 100 bonus coins and builds your daily winning streak.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
