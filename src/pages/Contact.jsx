import React, { useState } from 'react';
import AdBanner from '../components/AdSense/AdBanner';
import { Mail, MessageSquare, Send, CheckCircle2, Linkedin } from 'lucide-react';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', category: 'feedback', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.message.trim()) return;
    // Store message locally
    try {
      const messages = JSON.parse(localStorage.getItem('user_contact_feedback') || '[]');
      messages.push({ ...formData, timestamp: new Date().toISOString() });
      localStorage.setItem('user_contact_feedback', JSON.stringify(messages));
    } catch (err) {}

    setSubmitted(true);
  };

  return (
    <div className="max-w-3xl mx-auto px-4 sm:px-6 py-10 text-slate-300">
      <div className="text-center space-y-3 mb-8">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 text-xs font-bold uppercase tracking-wider text-teal-400 bg-teal-500/10 border border-teal-500/30 rounded-full">
          <MessageSquare className="w-3.5 h-3.5" /> Support & Inquiries
        </div>
        <h1 className="text-3xl sm:text-4xl font-black font-heading text-white">
          Contact Us
        </h1>
        <p className="text-xs sm:text-sm text-slate-400 max-w-md mx-auto">
          Have an idea for a creative new level, found a physics bug, or interested in partnership? We&rsquo;d love to hear from you!
        </p>

        {/* Direct Contact Cards */}
        <div className="flex flex-wrap items-center justify-center gap-3 pt-2">
          <a
            href="mailto:systemm7878@gmail.com"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-slate-800 border border-slate-700 hover:border-emerald-500/50 text-slate-200 text-xs font-medium transition group shadow-sm"
          >
            <Mail className="w-4 h-4 text-emerald-400 group-hover:scale-110 transition-transform" />
            <span>systemm7878@gmail.com</span>
          </a>
          <a
            href="https://www.linkedin.com/in/shubham-mishra-36b468326/"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-blue-950/40 hover:bg-blue-950/60 border border-blue-800/60 hover:border-blue-400 text-blue-200 text-xs font-medium transition group shadow-sm"
          >
            <Linkedin className="w-4 h-4 text-blue-400 group-hover:scale-110 transition-transform" />
            <span>Connect on LinkedIn</span>
          </a>
        </div>
      </div>

      <AdBanner slot="5566778899" format="horizontal" />

      <div className="bg-slate-800/40 p-6 sm:p-8 rounded-3xl border border-slate-700/60 mt-6">
        {submitted ? (
          <div className="text-center py-10 space-y-3">
            <CheckCircle2 className="w-14 h-14 text-emerald-400 mx-auto animate-bounce" />
            <h3 className="text-2xl font-bold text-white font-heading">Thank You!</h3>
            <p className="text-sm text-slate-300 max-w-sm mx-auto">
              Your message has been received by the Save the Ball development team. We appreciate your feedback!
            </p>
            <button
              onClick={() => {
                setSubmitted(false);
                setFormData({ name: '', email: '', category: 'feedback', message: '' });
              }}
              className="mt-4 px-6 py-2.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-bold text-white transition"
            >
              Send Another Note
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Your Name</label>
                <input
                  type="text"
                  required
                  placeholder="Bouncing Hero"
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-slate-300 mb-1">Email Address</label>
                <input
                  type="email"
                  required
                  placeholder="hero@example.com"
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Topic</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white focus:outline-none focus:border-emerald-400"
              >
                <option value="feedback">Game Feedback & Praise</option>
                <option value="bug">Report a Level or Physics Bug</option>
                <option value="level_idea">Suggest a Level Idea</option>
                <option value="business">Partnership & Monetization</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-300 mb-1">Message</label>
              <textarea
                required
                rows={5}
                placeholder="Share your thoughts or describe what happened..."
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                className="w-full bg-slate-900/90 border border-slate-700 rounded-xl px-4 py-2.5 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-emerald-400 resize-none"
              ></textarea>
            </div>

            <button
              type="submit"
              className="w-full flex items-center justify-center gap-2 py-3 px-6 rounded-2xl bg-gradient-to-r from-emerald-500 to-teal-500 hover:from-emerald-400 hover:to-teal-400 text-slate-950 font-black text-sm shadow-lg shadow-emerald-500/20 transition transform hover:scale-[1.01]"
            >
              <Send className="w-4 h-4" /> Send Message
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
