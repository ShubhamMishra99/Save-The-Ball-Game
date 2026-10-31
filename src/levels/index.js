import { world1 } from './world1';
import { world2 } from './world2';
import { world3 } from './world3';
import { world4 } from './world4';
import { world5 } from './world5';

export const allLevels = [
  ...world1,
  ...world2,
  ...world3,
  ...world4,
  ...world5
];

export const worlds = [
  { id: 1, name: 'GREEN VALLEY', range: [1, 10], color: '#40C057', icon: '🌱', desc: 'Lush pastures and rolling beginner slopes' },
  { id: 2, name: 'FIRE LAND', range: [11, 20], color: '#FD7E14', icon: '🌋', desc: 'Boiling magma rivers and fiery geysers' },
  { id: 3, name: 'SPIKE CITY', range: [21, 30], color: '#FA5252', icon: '⚙️', desc: 'Mechanical mazes and razor-sharp cogs' },
  { id: 4, name: 'SPACE WORLD', range: [31, 40], color: '#7950F2', icon: '🚀', desc: 'Lunar gravity, lasers, and quantum portals' },
  { id: 5, name: 'CRAZY LAB', range: [41, 50], color: '#22B8CF', icon: '🧪', desc: 'Multi-ball rescues, explosive switches, and puzzle madness' }
];

export function getLevelById(id) {
  const found = allLevels.find(lvl => lvl.id === Number(id));
  return found || allLevels[0];
}

// Deterministic daily challenge generator: picks a level with modified parameters based on today's date
export function getDailyChallenge(dateStr) {
  const today = dateStr || new Date().toISOString().slice(0, 10);
  let hash = 0;
  for (let i = 0; i < today.length; i++) {
    hash = (hash << 5) - hash + today.charCodeAt(i);
    hash |= 0;
  }
  const positiveHash = Math.abs(hash);
  // Pick a level between 10 and 45 for an interesting daily puzzle
  const baseLevelId = 10 + (positiveHash % 35);
  const baseLevel = getLevelById(baseLevelId);

  return {
    ...baseLevel,
    isDaily: true,
    dailyDate: today,
    title: `Daily Puzzle (${today})`,
    hint: `Special daily modifier! Complete this challenge today to keep your streak alive.`,
    inkLimit: Math.floor(baseLevel.inkLimit * 0.95), // slightly tighter ink for a fun challenge!
    threeStarInk: Math.floor(baseLevel.threeStarInk * 0.95)
  };
}
