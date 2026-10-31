// LocalStorage persistence for player progress, stars, coins, skins, achievements, daily challenges

const STORAGE_KEY = 'save_the_ball_v1_data';

const DEFAULT_DATA = {
  unlockedLevel: 1,
  stars: {}, // { levelId: starsCount }
  highScores: {}, // { levelId: { score, inkUsed, timeTaken } }
  coins: 50, // Initial bonus welcome coins!
  selectedSkin: 'classic',
  unlockedSkins: ['classic'],
  selectedInkColor: '#38D9A9',
  unlockedInkColors: ['#38D9A9'],
  selectedTrail: 'rainbow',
  unlockedTrails: ['rainbow'],
  powerups: {
    shield: 2,
    slowMo: 2,
    magnet: 2,
    freeze: 2,
    extraInk: 2
  },
  soundEnabled: true,
  musicEnabled: true,
  volume: 0.7,
  daily: {
    streak: 0,
    lastCompletedDate: null,
    history: {}
  },
  achievements: []
};

class StorageManager {
  constructor() {
    this.data = this.load();
  }

  load() {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (!raw) return { ...DEFAULT_DATA };
      const parsed = JSON.parse(raw);
      return {
        ...DEFAULT_DATA,
        ...parsed,
        powerups: { ...DEFAULT_DATA.powerups, ...(parsed.powerups || {}) },
        daily: { ...DEFAULT_DATA.daily, ...(parsed.daily || {}) }
      };
    } catch (e) {
      console.warn('Failed to parse localStorage, resetting to default', e);
      return { ...DEFAULT_DATA };
    }
  }

  save() {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(this.data));
    } catch (e) {
      console.warn('Failed to save to localStorage', e);
    }
  }

  get(key) {
    return this.data[key];
  }

  set(key, value) {
    this.data[key] = value;
    this.save();
  }

  recordLevelWin(levelId, inkUsed, timeTaken, maxInk, threeStarInk, twoStarInk) {
    const lvl = Number(levelId);

    // Calculate Stars (1 to 3 stars based on ink conservation)
    let starsAwarded = 1;
    if (inkUsed <= threeStarInk) {
      starsAwarded = 3;
    } else if (inkUsed <= twoStarInk) {
      starsAwarded = 2;
    }

    // Previous stars
    const prevStars = this.data.stars[lvl] || 0;
    if (starsAwarded > prevStars) {
      this.data.stars[lvl] = starsAwarded;
    }

    // Unlock next level up to 50
    if (lvl >= this.data.unlockedLevel && lvl < 50) {
      this.data.unlockedLevel = lvl + 1;
    }

    // Calculate score: base 1000 + ink efficiency bonus + time bonus
    const inkSaved = Math.max(0, maxInk - inkUsed);
    const score = Math.round(1000 + inkSaved * 2 + Math.max(0, (60 - timeTaken)) * 25);

    const prevHigh = this.data.highScores[lvl];
    if (!prevHigh || score > prevHigh.score) {
      this.data.highScores[lvl] = {
        score,
        inkUsed: Math.round(inkUsed),
        timeTaken: Math.round(timeTaken)
      };
    }

    // Award coins (e.g. 15 for 1 star, 25 for 2 stars, 40 for 3 stars)
    const coinsWon = starsAwarded * 15;
    this.data.coins += coinsWon;

    // Check achievements
    this.checkAchievements(lvl);

    this.save();

    return {
      stars: starsAwarded,
      coinsWon,
      score,
      isNewUnlock: lvl + 1 === this.data.unlockedLevel
    };
  }

  recordDailyWin(dateStr, inkUsed, timeTaken) {
    const today = dateStr || new Date().toISOString().slice(0, 10);
    const daily = this.data.daily;

    if (daily.lastCompletedDate !== today) {
      // Check if yesterday was completed for streak continuation
      const yesterday = new Date(Date.now() - 86400000).toISOString().slice(0, 10);
      if (daily.lastCompletedDate === yesterday) {
        daily.streak += 1;
      } else {
        daily.streak = 1;
      }
      daily.lastCompletedDate = today;
      daily.history[today] = { inkUsed, timeTaken };

      // Reward bonus coins for daily challenge!
      this.data.coins += 100;
      this.save();
      return { streak: daily.streak, bonusCoins: 100, isNewToday: true };
    }

    return { streak: daily.streak, bonusCoins: 0, isNewToday: false };
  }

  addCoins(amount) {
    this.data.coins = Math.max(0, this.data.coins + amount);
    this.save();
    return this.data.coins;
  }

  usePowerup(type) {
    if (this.data.powerups[type] > 0) {
      this.data.powerups[type]--;
      this.save();
      return true;
    }
    return false;
  }

  buyPowerup(type, cost = 50) {
    if (this.data.coins >= cost) {
      this.data.coins -= cost;
      this.data.powerups[type] = (this.data.powerups[type] || 0) + 1;
      this.save();
      return true;
    }
    return false;
  }

  unlockSkin(skinId, cost) {
    if (this.data.coins >= cost && !this.data.unlockedSkins.includes(skinId)) {
      this.data.coins -= cost;
      this.data.unlockedSkins.push(skinId);
      this.data.selectedSkin = skinId;
      this.save();
      return true;
    }
    return false;
  }

  selectSkin(skinId) {
    if (this.data.unlockedSkins.includes(skinId)) {
      this.data.selectedSkin = skinId;
      this.save();
      return true;
    }
    return false;
  }

  unlockInkColor(colorHex, cost) {
    if (this.data.coins >= cost && !this.data.unlockedInkColors.includes(colorHex)) {
      this.data.coins -= cost;
      this.data.unlockedInkColors.push(colorHex);
      this.data.selectedInkColor = colorHex;
      this.save();
      return true;
    }
    return false;
  }

  selectInkColor(colorHex) {
    if (this.data.unlockedInkColors.includes(colorHex)) {
      this.data.selectedInkColor = colorHex;
      this.save();
      return true;
    }
    return false;
  }

  unlockTrail(trailId, cost) {
    if (this.data.coins >= cost && !this.data.unlockedTrails.includes(trailId)) {
      this.data.coins -= cost;
      this.data.unlockedTrails.push(trailId);
      this.data.selectedTrail = trailId;
      this.save();
      return true;
    }
    return false;
  }

  selectTrail(trailId) {
    if (this.data.unlockedTrails.includes(trailId)) {
      this.data.selectedTrail = trailId;
      this.save();
      return true;
    }
    return false;
  }

  checkAchievements(currentLevel) {
    const list = this.data.achievements || [];
    const addAch = (id) => {
      if (!list.includes(id)) list.push(id);
    };

    if (currentLevel >= 1) addAch('first_save');
    if (currentLevel >= 10) addAch('world_1_clear');
    if (currentLevel >= 20) addAch('world_2_clear');
    if (currentLevel >= 30) addAch('world_3_clear');
    if (currentLevel >= 40) addAch('world_4_clear');
    if (currentLevel >= 50) addAch('world_5_clear');

    const totalStars = Object.values(this.data.stars).reduce((a, b) => a + b, 0);
    if (totalStars >= 30) addAch('star_collector_30');
    if (totalStars >= 100) addAch('star_master_100');
    if (this.data.coins >= 500) addAch('rich_ball');

    this.data.achievements = list;
  }

  resetAll() {
    this.data = { ...DEFAULT_DATA };
    this.save();
  }
}

export const storage = new StorageManager();
export default storage;
