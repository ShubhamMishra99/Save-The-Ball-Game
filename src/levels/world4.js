// World 4: SPACE WORLD (Levels 31 to 40)
// Theme: Cosmic starlight, low lunar gravity, teleportation portals, orbital asteroids, energy beams

export const world4 = [
  {
    id: 31,
    world: 4,
    worldName: 'SPACE WORLD',
    title: 'Zero-G Drift',
    hint: 'Low gravity makes the ball float! Draw gentle walls to guide the drift.',
    inkLimit: 700,
    threeStarInk: 290,
    twoStarInk: 470,
    gravity: { x: 0, y: 0.38 },
    balls: [{ x: 130, y: 120, radius: 18 }],
    goal: { x: 670, y: 460, radius: 46 },
    platforms: [
      { x: 130, y: 190, width: 130, height: 20 },
      { x: 670, y: 530, width: 130, height: 20 }
    ],
    hazards: [
      { type: 'laser', x: 400, y: 350, width: 24, height: 260 }
    ],
    collectibles: [
      { x: 400, y: 150, radius: 12 }
    ]
  },
  {
    id: 32,
    world: 4,
    worldName: 'SPACE WORLD',
    title: 'Wormhole Alpha',
    hint: 'Enter the blue portal to warp through space and bypass the laser!',
    inkLimit: 650,
    threeStarInk: 270,
    twoStarInk: 430,
    gravity: { x: 0, y: 0.4 },
    balls: [{ x: 130, y: 100, radius: 18 }],
    goal: { x: 700, y: 460, radius: 44 },
    portals: [
      { entry: { x: 260, y: 350, radius: 28 }, exit: { x: 540, y: 180, vx: 2, vy: 1 } }
    ],
    platforms: [
      { x: 130, y: 170, width: 120, height: 20 },
      { x: 700, y: 520, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'laser', x: 400, y: 300, width: 40, height: 400 },
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 620, y: 300, radius: 12 }
    ]
  },
  {
    id: 33,
    world: 4,
    worldName: 'SPACE WORLD',
    title: 'Asteroid Orbit',
    hint: 'A rotating asteroid cluster blocks the path. Draw an orbital slingshot.',
    inkLimit: 750,
    threeStarInk: 320,
    twoStarInk: 510,
    gravity: { x: 0, y: 0.38 },
    balls: [{ x: 120, y: 110, radius: 18 }],
    goal: { x: 680, y: 440, radius: 44 },
    platforms: [
      { x: 120, y: 180, width: 120, height: 20 },
      { x: 680, y: 500, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'saw', x: 400, y: 260, radius: 44, rotating: 0.04 },
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 400, y: 130, radius: 12 },
      { x: 400, y: 400, radius: 12 }
    ]
  },
  {
    id: 34,
    world: 4,
    worldName: 'SPACE WORLD',
    title: 'Double Warp Jump',
    hint: 'Chain through two portals to reach the isolated observation pod.',
    inkLimit: 750,
    threeStarInk: 310,
    twoStarInk: 500,
    gravity: { x: 0, y: 0.4 },
    balls: [{ x: 110, y: 90, radius: 18 }],
    goal: { x: 690, y: 150, radius: 44 },
    portals: [
      { entry: { x: 260, y: 400, radius: 26 }, exit: { x: 440, y: 140, vx: 1, vy: 1 } },
      { entry: { x: 520, y: 440, radius: 26 }, exit: { x: 690, y: 320, vx: 0, vy: -3 } }
    ],
    platforms: [
      { x: 110, y: 160, width: 110, height: 20 },
      { x: 690, y: 210, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'laser', x: 350, y: 320, width: 20, height: 350 },
      { type: 'laser', x: 600, y: 320, width: 20, height: 350 },
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 440, y: 240, radius: 12 }
    ]
  },
  {
    id: 35,
    world: 4,
    worldName: 'SPACE WORLD',
    title: 'Cosmic Floating Islands',
    hint: 'Delicate low-gravity hops across floating lunar platforms.',
    inkLimit: 800,
    threeStarInk: 340,
    twoStarInk: 540,
    gravity: { x: 0, y: 0.35 },
    balls: [{ x: 120, y: 80, radius: 18 }],
    goal: { x: 680, y: 460, radius: 44 },
    platforms: [
      { x: 120, y: 150, width: 110, height: 20 },
      { x: 300, y: 240, width: 90, height: 20 },
      { x: 500, y: 330, width: 90, height: 20 },
      { x: 680, y: 520, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'laser', x: 400, y: 480, width: 180, height: 20 },
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 300, y: 180, radius: 12 },
      { x: 500, y: 270, radius: 12 }
    ]
  },
  {
    id: 36,
    world: 4,
    worldName: 'SPACE WORLD',
    title: 'Planetary Slingshot',
    hint: 'Use the curve of space to glide past the dual laser barriers.',
    inkLimit: 800,
    threeStarInk: 330,
    twoStarInk: 520,
    gravity: { x: 0, y: 0.38 },
    balls: [{ x: 120, y: 90, radius: 18 }],
    goal: { x: 680, y: 480, radius: 44 },
    platforms: [
      { x: 120, y: 160, width: 120, height: 20 },
      { x: 400, y: 320, width: 100, height: 20, moving: { axis: 'x', dist: 120, speed: 0.03 } },
      { x: 680, y: 540, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'laser', x: 250, y: 250, width: 18, height: 220 },
      { type: 'laser', x: 550, y: 390, width: 18, height: 220 },
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 400, y: 200, radius: 12 }
    ]
  },
  {
    id: 37,
    world: 4,
    worldName: 'SPACE WORLD',
    title: 'Quantum Gateway',
    hint: 'Teleport from deep below right into the upper sanctuary.',
    inkLimit: 750,
    threeStarInk: 300,
    twoStarInk: 480,
    gravity: { x: 0, y: 0.4 },
    balls: [{ x: 130, y: 80, radius: 18 }],
    goal: { x: 680, y: 140, radius: 44 },
    portals: [
      { entry: { x: 380, y: 500, radius: 30 }, exit: { x: 560, y: 160, vx: 2, vy: -1 } }
    ],
    platforms: [
      { x: 130, y: 150, width: 120, height: 20 },
      { x: 680, y: 200, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'saw', x: 380, y: 280, radius: 42, rotating: 0.05 },
      { type: 'spike', x: 200, y: 585, width: 380, height: 25 },
      { type: 'spike', x: 600, y: 585, width: 380, height: 25 }
    ],
    collectibles: [
      { x: 240, y: 340, radius: 12 },
      { x: 620, y: 100, radius: 12 }
    ]
  },
  {
    id: 38,
    world: 4,
    worldName: 'SPACE WORLD',
    title: 'Gravity Well',
    hint: 'Counteract the low gravity with a steep downward ramp.',
    inkLimit: 850,
    threeStarInk: 360,
    twoStarInk: 570,
    gravity: { x: 0, y: 0.35 },
    balls: [{ x: 400, y: 60, radius: 18 }],
    goal: { x: 400, y: 510, radius: 44 },
    platforms: [
      { x: 150, y: 240, width: 140, height: 20, angle: 0.25 },
      { x: 650, y: 240, width: 140, height: 20, angle: -0.25 }
    ],
    hazards: [
      { type: 'saw', x: 300, y: 360, radius: 32, rotating: 0.06 },
      { type: 'saw', x: 500, y: 360, radius: 32, rotating: -0.06 },
      { type: 'laser', x: 400, y: 240, width: 120, height: 16 }
    ],
    collectibles: [
      { x: 400, y: 350, radius: 12 }
    ]
  },
  {
    id: 39,
    world: 4,
    worldName: 'SPACE WORLD',
    title: 'Nebula Passage',
    hint: 'Navigate between crossfire pulsar beams.',
    inkLimit: 850,
    threeStarInk: 370,
    twoStarInk: 590,
    gravity: { x: 0, y: 0.4 },
    balls: [{ x: 110, y: 90, radius: 18 }],
    goal: { x: 690, y: 470, radius: 44 },
    platforms: [
      { x: 110, y: 160, width: 120, height: 20 },
      { x: 380, y: 300, width: 120, height: 20 },
      { x: 690, y: 530, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'laser', x: 250, y: 220, width: 16, height: 240 },
      { type: 'laser', x: 520, y: 370, width: 16, height: 240 },
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 380, y: 220, radius: 12 },
      { x: 560, y: 460, radius: 12 }
    ]
  },
  {
    id: 40,
    world: 4,
    worldName: 'SPACE WORLD',
    title: 'Cosmic Supernova',
    hint: 'World 4 Finale: Portal jump across an active pulsar field in zero-G!',
    inkLimit: 950,
    threeStarInk: 410,
    twoStarInk: 650,
    gravity: { x: 0, y: 0.35 },
    balls: [{ x: 100, y: 80, radius: 18 }],
    goal: { x: 700, y: 480, radius: 42 },
    portals: [
      { entry: { x: 260, y: 440, radius: 28 }, exit: { x: 520, y: 160, vx: 2, vy: 0 } }
    ],
    platforms: [
      { x: 100, y: 150, width: 110, height: 20 },
      { x: 700, y: 540, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'saw', x: 400, y: 280, radius: 44, rotating: 0.07 },
      { type: 'laser', x: 380, y: 480, width: 18, height: 180 },
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 260, y: 220, radius: 12 },
      { x: 520, y: 240, radius: 12 },
      { x: 680, y: 380, radius: 12 }
    ]
  }
];
