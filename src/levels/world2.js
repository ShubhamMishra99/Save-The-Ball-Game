// World 2: FIRE LAND (Levels 11 to 20)
// Theme: Volcanic caverns, bubbling lava lakes, falling embers, moving heat lifts

export const world2 = [
  {
    id: 11,
    world: 2,
    worldName: 'FIRE LAND',
    title: 'Lava River',
    hint: 'Draw an elevated bridge above the scorching lava bed.',
    inkLimit: 700,
    threeStarInk: 310,
    twoStarInk: 490,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 130, y: 110, radius: 18 }],
    goal: { x: 670, y: 440, radius: 44 },
    platforms: [
      { x: 130, y: 180, width: 140, height: 20 },
      { x: 670, y: 500, width: 140, height: 20 }
    ],
    hazards: [
      { type: 'lava', x: 400, y: 580, width: 780, height: 35 }
    ],
    collectibles: [
      { x: 400, y: 280, radius: 12 }
    ]
  },
  {
    id: 12,
    world: 2,
    worldName: 'FIRE LAND',
    title: 'Magma Geyser',
    hint: 'Protect the ball from the volcanic fireball cannon.',
    inkLimit: 750,
    threeStarInk: 330,
    twoStarInk: 520,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 140, y: 90, radius: 18 }],
    goal: { x: 670, y: 460, radius: 44 },
    platforms: [
      { x: 140, y: 160, width: 130, height: 20 },
      { x: 670, y: 520, width: 130, height: 20 }
    ],
    hazards: [
      { type: 'lava', x: 400, y: 585, width: 780, height: 30 },
      { type: 'saw', x: 400, y: 350, radius: 32, rotating: -0.06 }
    ],
    collectibles: [
      { x: 300, y: 220, radius: 12 },
      { x: 500, y: 220, radius: 12 }
    ]
  },
  {
    id: 13,
    world: 2,
    worldName: 'FIRE LAND',
    title: 'Ash Peak Slopes',
    hint: 'Slide down the hot slopes into the sheltered cavern.',
    inkLimit: 700,
    threeStarInk: 290,
    twoStarInk: 470,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 650, y: 80, radius: 18 }],
    goal: { x: 140, y: 500, radius: 44 },
    platforms: [
      { x: 650, y: 150, width: 140, height: 20, angle: -0.2 },
      { x: 380, y: 320, width: 180, height: 20, angle: 0.25 }
    ],
    hazards: [
      { type: 'lava', x: 550, y: 585, width: 450, height: 30 },
      { type: 'spike', x: 280, y: 440, width: 25, height: 90 }
    ],
    collectibles: [
      { x: 480, y: 240, radius: 12 }
    ]
  },
  {
    id: 14,
    world: 2,
    worldName: 'FIRE LAND',
    title: 'Crucible Elevator',
    hint: 'Use the moving magma elevator to traverse the chamber.',
    inkLimit: 750,
    threeStarInk: 320,
    twoStarInk: 510,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 120, y: 120, radius: 18 }],
    goal: { x: 680, y: 220, radius: 44 },
    platforms: [
      { x: 120, y: 190, width: 120, height: 20 },
      { x: 400, y: 380, width: 130, height: 20, moving: { axis: 'y', dist: 130, speed: 0.035 } },
      { x: 680, y: 280, width: 130, height: 20 }
    ],
    hazards: [
      { type: 'lava', x: 400, y: 585, width: 780, height: 30 }
    ],
    collectibles: [
      { x: 400, y: 190, radius: 12 }
    ]
  },
  {
    id: 15,
    world: 2,
    worldName: 'FIRE LAND',
    title: 'Split Lava Islands',
    hint: 'Build stepping ramps across the isolated rock pillars.',
    inkLimit: 800,
    threeStarInk: 360,
    twoStarInk: 570,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 100, y: 100, radius: 18 }],
    goal: { x: 700, y: 490, radius: 44 },
    platforms: [
      { x: 100, y: 170, width: 110, height: 20 },
      { x: 300, y: 290, width: 80, height: 20 },
      { x: 500, y: 390, width: 80, height: 20 },
      { x: 700, y: 545, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'lava', x: 400, y: 585, width: 780, height: 30 }
    ],
    collectibles: [
      { x: 300, y: 220, radius: 12 },
      { x: 500, y: 320, radius: 12 }
    ]
  },
  {
    id: 16,
    world: 2,
    worldName: 'FIRE LAND',
    title: 'Fire Shield',
    hint: 'Create a roof to shield the ball from the dual magma wheels.',
    inkLimit: 750,
    threeStarInk: 310,
    twoStarInk: 500,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 130, y: 80, radius: 18 }],
    goal: { x: 670, y: 460, radius: 44 },
    platforms: [
      { x: 130, y: 150, width: 130, height: 20 },
      { x: 670, y: 520, width: 130, height: 20 }
    ],
    hazards: [
      { type: 'saw', x: 330, y: 270, radius: 34, rotating: 0.05 },
      { type: 'saw', x: 480, y: 270, radius: 34, rotating: -0.05 },
      { type: 'lava', x: 400, y: 585, width: 780, height: 30 }
    ],
    collectibles: [
      { x: 405, y: 170, radius: 12 }
    ]
  },
  {
    id: 17,
    world: 2,
    worldName: 'FIRE LAND',
    title: 'The Magma Funnel',
    hint: 'Catch the ball at speed and slow it before the lava pool.',
    inkLimit: 700,
    threeStarInk: 290,
    twoStarInk: 470,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 400, y: 70, radius: 18 }],
    goal: { x: 400, y: 480, radius: 44 },
    platforms: [
      { x: 200, y: 240, width: 140, height: 20, angle: 0.4 },
      { x: 600, y: 240, width: 140, height: 20, angle: -0.4 }
    ],
    hazards: [
      { type: 'lava', x: 150, y: 585, width: 260, height: 30 },
      { type: 'lava', x: 650, y: 585, width: 260, height: 30 }
    ],
    collectibles: [
      { x: 400, y: 310, radius: 12 }
    ]
  },
  {
    id: 18,
    world: 2,
    worldName: 'FIRE LAND',
    title: 'Bouncing on Flame',
    hint: 'A tiny safe zone surrounded by boiling lava.',
    inkLimit: 800,
    threeStarInk: 340,
    twoStarInk: 540,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 140, y: 100, radius: 18 }],
    goal: { x: 680, y: 480, radius: 38 },
    platforms: [
      { x: 140, y: 170, width: 120, height: 20 },
      { x: 400, y: 320, width: 110, height: 20, moving: { axis: 'x', dist: 140, speed: 0.04 } }
    ],
    hazards: [
      { type: 'lava', x: 400, y: 585, width: 780, height: 30 },
      { type: 'spike', x: 680, y: 360, width: 100, height: 20 }
    ],
    collectibles: [
      { x: 400, y: 220, radius: 12 },
      { x: 580, y: 390, radius: 12 }
    ]
  },
  {
    id: 19,
    world: 2,
    worldName: 'FIRE LAND',
    title: 'Infernal Canyon',
    hint: 'Navigate around jagged volcanic spikes and bubbling molten rock.',
    inkLimit: 850,
    threeStarInk: 370,
    twoStarInk: 590,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 120, y: 90, radius: 18 }],
    goal: { x: 690, y: 450, radius: 44 },
    platforms: [
      { x: 120, y: 160, width: 120, height: 20 },
      { x: 380, y: 330, width: 120, height: 20 },
      { x: 690, y: 510, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'lava', x: 400, y: 585, width: 780, height: 30 },
      { type: 'spike', x: 380, y: 280, width: 110, height: 22 },
      { type: 'saw', x: 530, y: 220, radius: 30, rotating: 0.06 }
    ],
    collectibles: [
      { x: 260, y: 220, radius: 12 },
      { x: 530, y: 130, radius: 12 }
    ]
  },
  {
    id: 20,
    world: 2,
    worldName: 'FIRE LAND',
    title: 'Heart of the Volcano',
    hint: 'World 2 Finale: The ultimate test across an infernal cauldron!',
    inkLimit: 900,
    threeStarInk: 400,
    twoStarInk: 630,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 110, y: 80, radius: 18 }],
    goal: { x: 700, y: 480, radius: 42 },
    platforms: [
      { x: 110, y: 150, width: 110, height: 20 },
      { x: 320, y: 280, width: 100, height: 20, moving: { axis: 'y', dist: 70, speed: 0.04 } },
      { x: 520, y: 390, width: 100, height: 20, moving: { axis: 'x', dist: 80, speed: 0.035 } }
    ],
    hazards: [
      { type: 'lava', x: 400, y: 585, width: 780, height: 30 },
      { type: 'saw', x: 220, y: 380, radius: 32, rotating: 0.05 },
      { type: 'saw', x: 610, y: 220, radius: 32, rotating: -0.05 }
    ],
    collectibles: [
      { x: 320, y: 180, radius: 12 },
      { x: 520, y: 270, radius: 12 },
      { x: 700, y: 370, radius: 12 }
    ]
  }
];
