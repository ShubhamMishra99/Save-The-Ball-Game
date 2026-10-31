// World 3: SPIKE CITY (Levels 21 to 30)
// Theme: Mechanical industrial labyrinth, razor-sharp steel spikes, whirring buzzsaws, crushing pistons

export const world3 = [
  {
    id: 21,
    world: 3,
    worldName: 'SPIKE CITY',
    title: 'Razor Alley',
    hint: 'Draw an arch high over the wall of vertical spikes.',
    inkLimit: 750,
    threeStarInk: 320,
    twoStarInk: 510,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 120, y: 120, radius: 18 }],
    goal: { x: 680, y: 460, radius: 44 },
    platforms: [
      { x: 120, y: 190, width: 130, height: 20 },
      { x: 680, y: 520, width: 130, height: 20 }
    ],
    hazards: [
      { type: 'spike', x: 400, y: 350, width: 36, height: 260 },
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 400, y: 140, radius: 12 }
    ]
  },
  {
    id: 22,
    world: 3,
    worldName: 'SPIKE CITY',
    title: 'Sawmill Gauntlet',
    hint: 'Two synchronized saws guard the channel. Time your roll!',
    inkLimit: 800,
    threeStarInk: 340,
    twoStarInk: 550,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 130, y: 90, radius: 18 }],
    goal: { x: 670, y: 480, radius: 44 },
    platforms: [
      { x: 130, y: 160, width: 130, height: 20 },
      { x: 670, y: 540, width: 130, height: 20 }
    ],
    hazards: [
      { type: 'saw', x: 320, y: 260, radius: 36, rotating: 0.07 },
      { type: 'saw', x: 480, y: 380, radius: 36, rotating: -0.07 },
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 400, y: 190, radius: 12 }
    ]
  },
  {
    id: 23,
    world: 3,
    worldName: 'SPIKE CITY',
    title: 'The Steel Needle',
    hint: 'A delicate descent between two threatening walls of thorns.',
    inkLimit: 750,
    threeStarInk: 300,
    twoStarInk: 490,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 400, y: 60, radius: 18 }],
    goal: { x: 400, y: 520, radius: 42 },
    platforms: [
      { x: 400, y: 120, width: 100, height: 18 },
      { x: 400, y: 575, width: 140, height: 18 }
    ],
    hazards: [
      { type: 'spike', x: 250, y: 320, width: 30, height: 320 },
      { type: 'spike', x: 550, y: 320, width: 30, height: 320 },
      { type: 'spike', x: 120, y: 585, width: 230, height: 25 },
      { type: 'spike', x: 680, y: 585, width: 230, height: 25 }
    ],
    collectibles: [
      { x: 400, y: 320, radius: 12 }
    ]
  },
  {
    id: 24,
    world: 3,
    worldName: 'SPIKE CITY',
    title: 'Cogwheel Turnpike',
    hint: 'Bouncing over a motorized cogwheel.',
    inkLimit: 750,
    threeStarInk: 310,
    twoStarInk: 500,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 120, y: 110, radius: 18 }],
    goal: { x: 680, y: 440, radius: 44 },
    platforms: [
      { x: 120, y: 180, width: 120, height: 20 },
      { x: 400, y: 360, width: 130, height: 20 },
      { x: 680, y: 500, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'saw', x: 260, y: 250, radius: 32, rotating: 0.08 },
      { type: 'saw', x: 540, y: 250, radius: 32, rotating: -0.08 },
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 400, y: 270, radius: 12 }
    ]
  },
  {
    id: 25,
    world: 3,
    worldName: 'SPIKE CITY',
    title: 'Pendulum Trap',
    hint: 'Watch the swinging hazard! Build a sloped ramp below it.',
    inkLimit: 800,
    threeStarInk: 330,
    twoStarInk: 530,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 110, y: 100, radius: 18 }],
    goal: { x: 690, y: 470, radius: 44 },
    platforms: [
      { x: 110, y: 170, width: 120, height: 20 },
      { x: 690, y: 530, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'saw', x: 400, y: 240, radius: 36, moving: { axis: 'x', dist: 130, speed: 0.045 }, rotating: 0.08 },
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 280, y: 300, radius: 12 },
      { x: 520, y: 300, radius: 12 }
    ]
  },
  {
    id: 26,
    world: 3,
    worldName: 'SPIKE CITY',
    title: 'Spike Pit Bridge',
    hint: 'A massive chasm full of spikes! Draw a continuous suspension line.',
    inkLimit: 850,
    threeStarInk: 370,
    twoStarInk: 580,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 100, y: 80, radius: 18 }],
    goal: { x: 700, y: 360, radius: 44 },
    platforms: [
      { x: 100, y: 150, width: 110, height: 20 },
      { x: 700, y: 420, width: 110, height: 20 }
    ],
    hazards: [
      { type: 'spike', x: 400, y: 560, width: 780, height: 40 },
      { type: 'saw', x: 400, y: 280, radius: 28, rotating: 0.06 }
    ],
    collectibles: [
      { x: 300, y: 220, radius: 12 },
      { x: 500, y: 220, radius: 12 }
    ]
  },
  {
    id: 27,
    world: 3,
    worldName: 'SPIKE CITY',
    title: 'The Meat Grinder',
    hint: 'Tri-saw arrangement: slide right above the central rotor.',
    inkLimit: 800,
    threeStarInk: 340,
    twoStarInk: 540,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 130, y: 90, radius: 18 }],
    goal: { x: 670, y: 490, radius: 44 },
    platforms: [
      { x: 130, y: 160, width: 120, height: 20 },
      { x: 670, y: 550, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'saw', x: 290, y: 300, radius: 30, rotating: 0.06 },
      { type: 'saw', x: 400, y: 360, radius: 36, rotating: -0.07 },
      { type: 'saw', x: 510, y: 300, radius: 30, rotating: 0.06 },
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 400, y: 200, radius: 12 }
    ]
  },
  {
    id: 28,
    world: 3,
    worldName: 'SPIKE CITY',
    title: 'Guillotine Staircase',
    hint: 'Step down while avoiding vertical reciprocating spikes.',
    inkLimit: 850,
    threeStarInk: 360,
    twoStarInk: 570,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 120, y: 80, radius: 18 }],
    goal: { x: 680, y: 490, radius: 44 },
    platforms: [
      { x: 120, y: 150, width: 120, height: 20 },
      { x: 380, y: 280, width: 110, height: 20 },
      { x: 680, y: 550, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'spike', x: 260, y: 220, width: 24, height: 160 },
      { type: 'spike', x: 520, y: 360, width: 24, height: 160 },
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 380, y: 200, radius: 12 },
      { x: 560, y: 440, radius: 12 }
    ]
  },
  {
    id: 29,
    world: 3,
    worldName: 'SPIKE CITY',
    title: 'Iron Fortress',
    hint: 'A tight tunnel between rows of razor spikes.',
    inkLimit: 850,
    threeStarInk: 380,
    twoStarInk: 590,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 110, y: 110, radius: 18 }],
    goal: { x: 690, y: 460, radius: 44 },
    platforms: [
      { x: 110, y: 180, width: 120, height: 20 },
      { x: 400, y: 280, width: 180, height: 20 },
      { x: 690, y: 520, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'spike', x: 400, y: 230, width: 180, height: 24 },
      { type: 'saw', x: 250, y: 380, radius: 34, rotating: 0.08 },
      { type: 'saw', x: 550, y: 380, radius: 34, rotating: -0.08 },
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 400, y: 150, radius: 12 },
      { x: 600, y: 200, radius: 12 }
    ]
  },
  {
    id: 30,
    world: 3,
    worldName: 'SPIKE CITY',
    title: 'Spike Metropolis Overlord',
    hint: 'World 3 Finale: Whirlwinds of steel, saw corridors, and razor floors!',
    inkLimit: 950,
    threeStarInk: 420,
    twoStarInk: 660,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 100, y: 80, radius: 18 }],
    goal: { x: 700, y: 500, radius: 42 },
    platforms: [
      { x: 100, y: 150, width: 110, height: 20 },
      { x: 400, y: 260, width: 110, height: 20, moving: { axis: 'x', dist: 90, speed: 0.04 } },
      { x: 700, y: 560, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'saw', x: 250, y: 290, radius: 36, rotating: 0.08 },
      { type: 'saw', x: 550, y: 380, radius: 36, rotating: -0.08 },
      { type: 'spike', x: 400, y: 440, width: 30, height: 160 },
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 250, y: 180, radius: 12 },
      { x: 400, y: 180, radius: 12 },
      { x: 550, y: 260, radius: 12 }
    ]
  }
];
