import React from 'react';
import AdBanner from '../components/AdSense/AdBanner';
import { AlertCircle } from 'lucide-react';

export default function Disclaimer() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-slate-300">
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-amber-400 bg-amber-500/10 border border-amber-500/30 rounded-full">
          <AlertCircle className="w-3.5 h-3.5" /> Notice & Disclosures
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-heading text-white">
          Website Disclaimer
        </h1>
        <p className="text-xs text-slate-400">Published: October 31, 2026</p>
      </div>

      <AdBanner slot="6677889900" format="horizontal" />

      <div className="space-y-6 text-xs sm:text-sm leading-relaxed bg-slate-800/40 p-6 sm:p-8 rounded-3xl border border-slate-700/60">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">General Information Only</h2>
          <p>
            The content and games provided on <strong>Save the Ball Online</strong> (https://savetheball.game) are designed strictly for personal amusement, recreation, and mental puzzle-solving enjoyment.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">External Links & Advertisements</h2>
          <p>
            The website may contain links to external third-party websites or advertisements served through Google AdSense. We do not investigate, endorse, or verify the accuracy of information found on third-party domains. Clicking external advertisements or links is at the user&rsquo;s sole discretion.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">Fair Use & Originality</h2>
          <p>
            &ldquo;Save the Ball!&rdquo; and all associated code, visual effects, level geometries, and procedural synthesized audio routines are independently developed original creations. All trademarks and registered trademarks referenced belong to their respective owners.
          </p>
        </section>
      </div>
    </div>
  );
}
