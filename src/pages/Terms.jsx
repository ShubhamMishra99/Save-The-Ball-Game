import React from 'react';
import AdBanner from '../components/AdSense/AdBanner';
import { FileText } from 'lucide-react';

export default function Terms() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-slate-300">
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-blue-400 bg-blue-500/10 border border-blue-500/30 rounded-full">
          <FileText className="w-3.5 h-3.5" /> Legal Terms
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-heading text-white">
          Terms & Conditions
        </h1>
        <p className="text-xs text-slate-400">Last Revised: October 31, 2026</p>
      </div>

      <AdBanner slot="4455667788" format="horizontal" />

      <div className="space-y-6 text-xs sm:text-sm leading-relaxed bg-slate-800/40 p-6 sm:p-8 rounded-3xl border border-slate-700/60">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Acceptance of Terms</h2>
          <p>
            By accessing and playing <strong>Save the Ball Online</strong>, you agree to comply with and be bound by these Terms and Conditions and all applicable laws and regulations.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. License & Intellectual Property</h2>
          <p>
            All game assets, physics engine configurations, level layouts, visual rendering routines, character skin concepts, audio synthesizers, and branding are the intellectual property of Save The Ball Studio. You are granted a personal, non-exclusive, non-transferable license to play the game in your browser for recreational purposes.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. User Conduct</h2>
          <p>
            Users agree not to attempt to reverse engineer, disrupt the website, inject malicious automated scripts, or falsely impersonate the service.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. Disclaimer of Warranties</h2>
          <p>
            The game is provided &ldquo;as is&rdquo; without warranties of any kind. We strive for 100% uptime and smooth 60fps physics across all supported browsers, but cannot guarantee uninterrupted service on unsupported older hardware.
          </p>
        </section>
      </div>
    </div>
  );
}
