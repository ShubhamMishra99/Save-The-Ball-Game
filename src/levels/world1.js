// World 1: GREEN VALLEY (Levels 1 to 10)
// Theme: Lush rolling hills, gentle breezes, tutorial to intermediate drawing physics

export const world1 = [
  {
    id: 1,
    world: 1,
    worldName: 'GREEN VALLEY',
    title: 'First Step',
    hint: 'Draw a gentle slope to roll the ball into the safe zone!',
    inkLimit: 600,
    threeStarInk: 280,
    twoStarInk: 450,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 140, y: 120, radius: 18, vx: 2.2 }],
    goal: { x: 660, y: 480, radius: 44 },
    platforms: [
      { x: 130, y: 190, width: 140, height: 20, angle: 0.16 },
      { x: 660, y: 535, width: 150, height: 20 }
    ],
    hazards: [
      { type: 'spike', x: 400, y: 580, width: 700, height: 24 }
    ],
    collectibles: [
      { x: 380, y: 320, radius: 12 }
    ]
  },
  {
    id: 2,
    world: 1,
    worldName: 'GREEN VALLEY',
    title: 'Bridge the Chasm',
    hint: 'Draw a straight bridge connecting the two cliffs.',
    inkLimit: 650,
    threeStarInk: 300,
    twoStarInk: 480,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 120, y: 100, radius: 18, vx: 2.4 }],
    goal: { x: 700, y: 380, radius: 44 },
    platforms: [
      { x: 120, y: 180, width: 150, height: 24, angle: 0.14 },
      { x: 700, y: 430, width: 160, height: 24 }
    ],
    hazards: [
      { type: 'spike', x: 410, y: 580, width: 500, height: 26 }
    ],
    collectibles: [
      { x: 410, y: 250, radius: 12 }
    ]
  },
  {
    id: 3,
    world: 1,
    worldName: 'GREEN VALLEY',
    title: 'Bouncy Funnel',
    hint: 'Draw a funnel (V-shape) to catch the falling ball.',
    inkLimit: 700,
    threeStarInk: 320,
    twoStarInk: 500,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 400, y: 80, radius: 18 }],
    goal: { x: 400, y: 500, radius: 44 },
    platforms: [
      { x: 150, y: 300, width: 160, height: 20, angle: 0.3 },
      { x: 650, y: 300, width: 160, height: 20, angle: -0.3 }
    ],
    hazards: [
      { type: 'spike', x: 220, y: 580, width: 220, height: 24 },
      { type: 'spike', x: 580, y: 580, width: 220, height: 24 }
    ],
    collectibles: [
      { x: 400, y: 320, radius: 12 }
    ]
  },
  {
    id: 4,
    world: 1,
    worldName: 'GREEN VALLEY',
    title: 'The Wall Block',
    hint: 'Draw a wall or roof to deflect the ball from tumbling left into danger.',
    inkLimit: 600,
    threeStarInk: 260,
    twoStarInk: 420,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 300, y: 100, radius: 18 }],
    goal: { x: 650, y: 450, radius: 44 },
    platforms: [
      { x: 300, y: 180, width: 140, height: 20, angle: -0.2 },
      { x: 650, y: 510, width: 160, height: 20 }
    ],
    hazards: [
      { type: 'spike', x: 120, y: 580, width: 240, height: 24 },
      { type: 'spike', x: 400, y: 400, width: 30, height: 180 }
    ],
    collectibles: [
      { x: 500, y: 280, radius: 12 }
    ]
  },
  {
    id: 5,
    world: 1,
    worldName: 'GREEN VALLEY',
    title: 'Zig-Zag Path',
    hint: 'Direct the ball through alternating switchbacks.',
    inkLimit: 800,
    threeStarInk: 360,
    twoStarInk: 560,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 150, y: 80, radius: 18 }],
    goal: { x: 150, y: 510, radius: 44 },
    platforms: [
      { x: 200, y: 160, width: 240, height: 18, angle: 0.15 },
      { x: 550, y: 320, width: 260, height: 18, angle: -0.15 }
    ],
    hazards: [
      { type: 'spike', x: 650, y: 580, width: 260, height: 24 },
      { type: 'spike', x: 400, y: 580, width: 200, height: 24 }
    ],
    collectibles: [
      { x: 620, y: 240, radius: 12 },
      { x: 340, y: 420, radius: 12 }
    ]
  },
  {
    id: 6,
    world: 1,
    worldName: 'GREEN VALLEY',
    title: 'The Great Drop',
    hint: 'Cushion the high fall so the ball lands softly.',
    inkLimit: 700,
    threeStarInk: 290,
    twoStarInk: 470,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 400, y: 60, radius: 18 }],
    goal: { x: 680, y: 480, radius: 44 },
    platforms: [
      { x: 400, y: 120, width: 90, height: 20 },
      { x: 680, y: 540, width: 140, height: 20 }
    ],
    hazards: [
      { type: 'spike', x: 400, y: 580, width: 440, height: 24 },
      { type: 'saw', x: 280, y: 300, radius: 28, rotating: 0.05 }
    ],
    collectibles: [
      { x: 530, y: 300, radius: 12 }
    ]
  },
  {
    id: 7,
    world: 1,
    worldName: 'GREEN VALLEY',
    title: 'Moving Meadow',
    hint: 'Time your drop onto the gentle moving platform.',
    inkLimit: 650,
    threeStarInk: 280,
    twoStarInk: 450,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 120, y: 100, radius: 18 }],
    goal: { x: 680, y: 420, radius: 44 },
    platforms: [
      { x: 120, y: 170, width: 120, height: 20 },
      { x: 400, y: 320, width: 140, height: 20, moving: { axis: 'x', dist: 130, speed: 0.03 } },
      { x: 680, y: 480, width: 140, height: 20 }
    ],
    hazards: [
      { type: 'spike', x: 400, y: 580, width: 750, height: 24 }
    ],
    collectibles: [
      { x: 400, y: 220, radius: 12 }
    ]
  },
  {
    id: 8,
    world: 1,
    worldName: 'GREEN VALLEY',
    title: 'Valley Arch',
    hint: 'Draw an arched canopy to bypass the spinning saw.',
    inkLimit: 750,
    threeStarInk: 320,
    twoStarInk: 510,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 140, y: 140, radius: 18 }],
    goal: { x: 660, y: 420, radius: 44 },
    platforms: [
      { x: 140, y: 200, width: 120, height: 20 },
      { x: 660, y: 480, width: 140, height: 20 }
    ],
    hazards: [
      { type: 'saw', x: 400, y: 280, radius: 36, rotating: 0.04 },
      { type: 'spike', x: 400, y: 580, width: 700, height: 24 }
    ],
    collectibles: [
      { x: 400, y: 160, radius: 12 }
    ]
  },
  {
    id: 9,
    world: 1,
    worldName: 'GREEN VALLEY',
    title: 'Pinball Bounce',
    hint: 'Carom off angled platforms down to safety.',
    inkLimit: 700,
    threeStarInk: 300,
    twoStarInk: 480,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 200, y: 80, radius: 18 }],
    goal: { x: 650, y: 500, radius: 44 },
    platforms: [
      { x: 200, y: 150, width: 130, height: 20, angle: 0.3 },
      { x: 420, y: 280, width: 130, height: 20, angle: -0.35 },
      { x: 250, y: 420, width: 130, height: 20, angle: 0.3 }
    ],
    hazards: [
      { type: 'spike', x: 480, y: 580, width: 340, height: 24 },
      { type: 'spike', x: 100, y: 580, width: 180, height: 24 }
    ],
    collectibles: [
      { x: 460, y: 210, radius: 12 },
      { x: 220, y: 350, radius: 12 }
    ]
  },
  {
    id: 10,
    world: 1,
    worldName: 'GREEN VALLEY',
    title: 'Valley Finale',
    hint: 'World 1 Boss Test: Guide through a multi-tier obstacle course!',
    inkLimit: 850,
    threeStarInk: 380,
    twoStarInk: 590,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 120, y: 90, radius: 18 }],
    goal: { x: 690, y: 490, radius: 44 },
    platforms: [
      { x: 120, y: 160, width: 120, height: 20 },
      { x: 380, y: 260, width: 110, height: 20, moving: { axis: 'y', dist: 60, speed: 0.04 } },
      { x: 550, y: 400, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'saw', x: 250, y: 340, radius: 30, rotating: 0.05 },
      { type: 'spike', x: 400, y: 580, width: 750, height: 24 }
    ],
    collectibles: [
      { x: 380, y: 180, radius: 12 },
      { x: 550, y: 330, radius: 12 },
      { x: 690, y: 400, radius: 12 }
    ]
  }
];
