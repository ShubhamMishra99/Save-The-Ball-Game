import React from 'react';
import AdBanner from '../components/AdSense/AdBanner';
import { Shield, Lock } from 'lucide-react';

export default function PrivacyPolicy() {
  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 py-10 text-slate-300">
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-emerald-400 bg-emerald-500/10 border border-emerald-500/30 rounded-full">
          <Shield className="w-3.5 h-3.5" /> Privacy & Transparency
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-heading text-white">
          Privacy Policy
        </h1>
        <p className="text-xs text-slate-400">Effective Date: October 31, 2026</p>
      </div>

      <AdBanner slot="3344556677" format="horizontal" />

      <div className="space-y-6 text-xs sm:text-sm leading-relaxed bg-slate-800/40 p-6 sm:p-8 rounded-3xl border border-slate-700/60">
        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">1. Introduction</h2>
          <p>
            Welcome to <strong>Save the Ball Online</strong> (&ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;). We respect your privacy and are committed to protecting any information associated with your use of our website (https://savetheball.game). This policy outlines how data is handled in compliance with global standards, including the EU General Data Protection Regulation (GDPR) and the California Consumer Privacy Act (CCPA).
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">2. Local Storage and Game Progress</h2>
          <p>
            Our game uses the standard browser <code>localStorage</code> API to save your unlocked levels, star achievements, earned coins, customized ball skins, and audio preferences directly on your device. This data never leaves your browser and is never sold or shared with any third party.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">3. Advertising and Google AdSense</h2>
          <p>
            We may use Google AdSense and third-party advertising partners to display advertisements when you visit our website. Google and other vendors use cookies and device identifiers to serve ads based on prior visits to our site or other websites on the internet.
          </p>
          <p>
            Users may opt out of personalized advertising by visiting Google's <a href="https://adssettings.google.com" target="_blank" rel="noopener noreferrer" className="text-emerald-400 underline">Ads Settings</a> or by utilizing the Digital Advertising Alliance opt-out portal.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">4. Cookies and Web Beacons</h2>
          <p>
            Cookies are small text files stored on your device. We use necessary cookies to ensure technical site operation and performance telemetry. You can control or disable cookies through your browser settings, though doing so may affect certain website convenience features.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">5. Children's Online Privacy (COPPA)</h2>
          <p>
            Save the Ball is a general-audience game. We do not knowingly collect or solicit personal identifiable information from children under 13.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="text-base font-bold text-white">6. Updates to This Policy</h2>
          <p>
            We may update this Privacy Policy from time to time. Changes become effective immediately upon posting to this page.
          </p>
        </section>
      </div>
    </div>
  );
}
