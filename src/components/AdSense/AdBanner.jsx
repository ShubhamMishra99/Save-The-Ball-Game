import React, { useEffect, useRef } from 'react';

// Google AdSense Reusable Component
// Policy-compliant: clearly separated from controls, non-intrusive, fully responsive
// No fake publisher IDs or deceptive button styling

export default function AdBanner({
  slot = '1234567890',
  format = 'horizontal',
  responsive = true,
  className = '',
  style = {},
  client = 'ca-pub-1079976856424725'
}) {
  const adRef = useRef(null);
  const isConfigured = client && client.startsWith('ca-pub-') && client !== 'ca-pub-XXXXXXXXXXXXXXXX';

  useEffect(() => {
    try {
      if (typeof window !== 'undefined' && window.adsbygoogle && isConfigured) {
        window.adsbygoogle.push({});
      }
    } catch (e) {
      // AdSense load catch
    }
  }, [slot, client, isConfigured]);

  return (
    <div
      className={`adsense-wrapper w-full max-w-4xl mx-auto px-4 my-8 text-center select-none ${className}`}
      style={style}
    >
      {/* Policy-compliant subtle label */}
      <div className="text-[10px] uppercase tracking-widest text-slate-500 font-semibold mb-2">
        Advertisement
      </div>

      {isConfigured ? (
        <div className="overflow-hidden rounded-2xl bg-slate-900/60 border border-slate-800/80 p-2 min-h-[90px] flex items-center justify-center">
          <ins
            ref={adRef}
            className="adsbygoogle"
            style={{ display: 'block', width: '100%', minHeight: '90px' }}
            data-ad-client={client}
            data-ad-slot={slot}
            data-ad-format={format}
            data-full-width-responsive={responsive ? 'true' : 'false'}
          />
        </div>
      ) : (
        /* Subtle development mode placeholder (No fake IDs, no fake content) */
        <div className="flex flex-col items-center justify-center py-6 px-4 rounded-2xl border border-dashed border-slate-800/80 bg-slate-900/40 text-slate-500 min-h-[90px] transition-all">
          <div className="flex items-center gap-2 text-xs font-medium text-slate-400">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500/80 animate-pulse" />
            <span>Responsive Ad Placement</span>
          </div>
          <p className="text-[11px] text-slate-600 mt-1 max-w-sm">
            Standard horizontal banner reserved for Google AdSense verification
          </p>
        </div>
      )}
    </div>
  );
}
