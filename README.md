# 🟡 SAVE THE BALL!
> *"One line can save a life!"*

**SAVE THE BALL!** is a high-octane, brain-teasing 2D physics puzzle browser game built with **React**, **Vite**, and **Matter.js**. Players use their creativity and spatial intelligence to draw solid protective lines, construct ramps, divert trajectories, activate switches, and guide their cute bouncing ball to the glowing green **SAVE ZONE** while avoiding spikes, bubbling lava pits, rotating buzzsaws, and laser grids across **50 fully playable levels** in 5 unique worlds.

---

## 🎮 Key Features

- **Real 2D Rigid-Body Physics (Matter.js)**:
  - Realistic gravity, friction, bouncing (restitution), and collision detection.
  - Drawn lines convert instantly into static rigid-body colliders with rounded vertices to prevent snagging.
  - Moving platforms, swinging pendulums, reciprocating hazards, and portal teleportation.
- **50 Hand-Crafted Playable Levels across 5 Worlds**:
  - **World 1: Green Valley (Levels 1–10)**: Gentle slopes, cliffs, chasm bridging, and tutorial mechanics.
  - **World 2: Fire Land (Levels 11–20)**: Boiling lava lakes, magma geysers, and falling volcanic blocks.
  - **World 3: Spike City (Levels 21–30)**: Motorized buzzsaws, spike corridors, and precision descents.
  - **World 4: Space World (Levels 31–40)**: Low lunar gravity (0.38g), wormhole teleportation portals, and pulsar lasers.
  - **World 5: Crazy Lab (Levels 41–50)**: Multi-ball rescues (save 2 or 3 balls simultaneously!), switch-activated blast doors, and mastermind puzzles.
- **Expressive Character Animation**:
  - Cute animated ball character with dynamic squash-and-stretch physics.
  - Reactive eyes that blink, look ahead in the direction of velocity, smile joyfully in the Save Zone, and look terrified when falling at high speeds or nearing hazards.
- **Power-Ups System**:
  - 🛡️ **Energy Shield**: Absorbs a lethal impact and grants temporary invulnerability.
  - ⏳ **Chronos Slow-Mo**: Dilates physics time to 40% speed for 5 seconds.
  - 🧲 **Save Zone Magnet**: Exerts physical gravitational attraction pulling the ball toward the goal.
  - ❄️ **Frost Freeze**: Freezes all saws and moving platforms in place for 4 seconds.
  - ✏️ **Ink Boost**: Adds +50% drawing length.
- **Shop & Unlockables**:
  - **Ball Skins**: Sunshine Smiley, Shadow Ninja, Cyberpunk Neon, Playful Kitty, Cosmic Invader, Royal Majesty, and Blazing Ember.
  - **Drawing Ink Colors**: Neon Mint, Electric Cyan, Hot Coral, Solar Gold, Cosmic Violet.
  - **Particle Trails**: Rainbow Prism, Stardust Sparkles, Blaze Comet, Cyber Neon.
- **Daily Challenge & Viral Sharing**:
  - Synchronized daily puzzle for all players globally based on the calendar date.
  - Streak tracking (🔥 days) and bonus coin rewards.
  - One-click Web Share API integration (with clipboard fallback) to challenge friends.
- **Procedural Web Audio API Synthesizer**:
  - 100% self-contained audio engine generating bounces, scribbles, pops, star chimes, fanfares, and an upbeat procedural chiptune arcade background music loop with zero external asset dependencies!
- **Mobile & Desktop Responsive Controls**:
  - Mouse drawing on desktop, touch dragging on Android/iOS.
  - Canvas touch scroll cancellation (`touch-action: none` and `preventDefault()`).
  - Keyboard shortcuts: `R` to restart, `Space` to pause, `1`–`5` to activate power-ups, `Esc` to close modals.
- **SEO & AdSense Ready**:
  - Semantic HTML5, JSON-LD Schema markup (`VideoGame`, `WebSite`), meta tags, Open Graph, and Twitter Cards.
  - Dedicated pages: *How to Play*, *About Us*, *Privacy Policy* (GDPR/CCPA compliant), *Terms & Conditions*, *Contact*, and *Disclaimer*.
  - Policy-compliant AdSense wrapper components with placeholders ready for your publisher ID.

---

## 📁 Project Structure

```
save-the-ball/
├── public/
│   ├── favicon.svg          # High-resolution vector favicon
│   ├── robots.txt           # Search crawler directives
│   └── sitemap.xml          # XML sitemap with all subpages
├── src/
│   ├── components/
│   │   ├── AdSense/
│   │   │   └── AdBanner.jsx # Reusable, non-intrusive AdSense banner
│   │   ├── DailyChallengeModal.jsx
│   │   ├── DefeatModal.jsx
│   │   ├── Footer.jsx       # SEO footer with internal linking
│   │   ├── GameView.jsx     # Canvas HUD, event loop, controls
│   │   ├── Header.jsx       # Navigation bar, shop button, audio toggles
│   │   ├── LevelSelectModal.jsx
│   │   ├── SettingsModal.jsx
│   │   ├── StoreModal.jsx   # Locker for skins, ink colors, trails, powerups
│   │   └── VictoryModal.jsx # 1-3 animated stars, coins, share card
│   ├── game/
│   │   ├── DrawingEngine.js # Pointer/touch stroke capture & ink measurement
│   │   ├── GameRenderer.js  # 60fps Canvas 2D visual renderer & particles
│   │   └── PhysicsEngine.js # Matter.js engine, bodies, constraints, collisions
│   ├── levels/
│   │   ├── world1.js        # Levels 1 to 10: Green Valley
│   │   ├── world2.js        # Levels 11 to 20: Fire Land
│   │   ├── world3.js        # Levels 21 to 30: Spike City
│   │   ├── world4.js        # Levels 31 to 40: Space World
│   │   ├── world5.js        # Levels 41 to 50: Crazy Lab
│   │   └── index.js         # Level aggregation & daily challenge generator
│   ├── pages/
│   │   ├── About.jsx
│   │   ├── Contact.jsx
│   │   ├── Disclaimer.jsx
│   │   ├── HowToPlay.jsx
│   │   ├── PrivacyPolicy.jsx
│   │   └── Terms.jsx
│   ├── styles/
│   │   └── index.css        # Modern arcade theme & utility classes
│   ├── utils/
│   │   ├── audio.js         # Procedural Web Audio synthesizer & music loop
│   │   └── storage.js       # LocalStorage progress, inventory & streak manager
│   ├── App.jsx              # Root application router & state
│   └── main.jsx             # React entry point
├── index.html               # Main HTML with SEO meta tags & JSON-LD
├── package.json
├── vercel.json              # Vercel deployment & cache headers config
└── vite.config.js
```

---

## 🚀 Installation & Local Development

### Prerequisites
- Node.js version 18 or higher (v22+ recommended)
- npm version 9 or higher

### Steps

1. **Clone or navigate to the project directory**:
   ```bash
   cd c:/Shubham_Personal/game
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000/`.

4. **Test production build**:
   ```bash
   npm run build
   npm run preview
   ```

---

## 🌐 Vercel Deployment Instructions

Deploying **Save the Ball!** to Vercel takes less than 2 minutes:

### Option A: Via Vercel CLI

1. Install the Vercel CLI globally (if not already installed):
   ```bash
   npm install -g vercel
   ```

2. Run `vercel` in the project root:
   ```bash
   vercel
   ```
   Follow the prompts to link your project and deploy.

3. To deploy directly to production:
   ```bash
   vercel --prod
   ```

### Option B: Via GitHub & Vercel Dashboard

1. Push your repository to GitHub:
   ```bash
   git init
   git add .
   git commit -m "feat: complete Save The Ball physics game with 50 levels"
   git remote add origin https://github.com/your-username/save-the-ball.git
   git push -u origin main
   ```

2. Log in to [vercel.com](https://vercel.com).
3. Click **Add New...** &rarr; **Project**.
4. Import your `save-the-ball` repository.
5. In the build settings:
   - **Framework Preset**: `Vite`
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
   - **Install Command**: `npm install`
6. Click **Deploy**. Your game will be live globally on a free `.vercel.app` domain!

---

## 🏷️ Custom Domain Setup

1. In your Vercel Dashboard, select your project &rarr; **Settings** &rarr; **Domains**.
2. Enter your custom domain (e.g., `savetheball.game` or `www.savetheball.game`).
3. Add the DNS records provided by Vercel to your domain registrar (GoDaddy, Namecheap, Cloudflare, etc.):
   - **Type**: `CNAME` | **Name**: `www` | **Value**: `cname.vercel-dns.com`
   - **Type**: `A` | **Name**: `@` | **Value**: `76.76.21.21`
4. Vercel will automatically provision free SSL certificates (HTTPS).

---

## 🔍 Google Search Console & Sitemap Submission

1. Go to [Google Search Console](https://search.google.com/search-console).
2. Click **Add Property** and enter your production URL (e.g., `https://savetheball.game`).
3. Verify ownership using the DNS TXT record or HTML tag method.
4. In the left navigation, click **Sitemaps**.
5. In the **Add a new sitemap** input, enter:
   ```
   sitemap.xml
   ```
6. Click **Submit**. Google will index the homepage, How to Play guide, About page, and legal notices.

---

## 💰 Google AdSense Integration Instructions

The application includes compliant, reusable advertisement slots placed strictly **outside** the game canvas:

1. Apply for an account at [Google AdSense](https://www.google.com/adsense/).
2. Once your site is submitted, retrieve your **Publisher ID** (format: `ca-pub-XXXXXXXXXXXXXXXX`).
3. In `index.html`, add the official AdSense script tag inside `<head>`:
   ```html
   <script async src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXX" crossorigin="anonymous"></script>
   ```
4. In `src/components/AdSense/AdBanner.jsx`, replace the default placeholder with your approved Client ID and Slot IDs:
   ```jsx
   client = 'ca-pub-XXXXXXXXXXXXXXXX'
   ```
5. Ensure your website adheres to Google AdSense Policies:
   - ✅ Ads are located below the game and between informational sections.
   - ✅ No ads obscure or overlap interactive canvas controls.
   - ✅ Advertisements are clearly labeled with an *"Advertisement"* header.
   - ✅ No fake game buttons or deceptive click incentives.

---

## 📄 License
This project is open-source and available under the **MIT License**.
