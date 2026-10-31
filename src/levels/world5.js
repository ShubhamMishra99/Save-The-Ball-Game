// World 5: CRAZY LAB (Levels 41 to 50)
// Theme: High-tech mad science laboratory, multi-ball rescue, switch-activated blast doors, laser barriers

export const world5 = [
  {
    id: 41,
    world: 5,
    worldName: 'CRAZY LAB',
    title: 'Twin Protocol',
    hint: 'Multi-ball! Guide BOTH balls into the safe zone together!',
    inkLimit: 850,
    threeStarInk: 360,
    twoStarInk: 570,
    gravity: { x: 0, y: 1 },
    balls: [
      { x: 140, y: 100, radius: 18 },
      { x: 220, y: 100, radius: 18 }
    ],
    goal: { x: 670, y: 460, radius: 48 },
    platforms: [
      { x: 180, y: 170, width: 180, height: 20 },
      { x: 670, y: 520, width: 140, height: 20 }
    ],
    hazards: [
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 },
      { type: 'saw', x: 420, y: 320, radius: 32, rotating: 0.05 }
    ],
    collectibles: [
      { x: 420, y: 200, radius: 12 },
      { x: 550, y: 360, radius: 12 }
    ]
  },
  {
    id: 42,
    world: 5,
    worldName: 'CRAZY LAB',
    title: 'Switch & Gate',
    hint: 'Roll a ball over the red switch to open the blast door.',
    inkLimit: 800,
    threeStarInk: 340,
    twoStarInk: 540,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 120, y: 90, radius: 18 }],
    goal: { x: 700, y: 480, radius: 44 },
    switches: [
      { id: 'sw1', x: 300, y: 360, width: 44, height: 16, targetDoorId: 'door1' }
    ],
    doors: [
      { id: 'door1', x: 540, y: 380, width: 22, height: 180, openOffsetY: -160 }
    ],
    platforms: [
      { x: 120, y: 160, width: 120, height: 20 },
      { x: 300, y: 380, width: 100, height: 20 },
      { x: 700, y: 540, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 420, y: 320, radius: 12 }
    ]
  },
  {
    id: 43,
    world: 5,
    worldName: 'CRAZY LAB',
    title: 'Split Twins',
    hint: 'Balls start on opposite sides. Create a shared funnel to the center!',
    inkLimit: 900,
    threeStarInk: 390,
    twoStarInk: 610,
    gravity: { x: 0, y: 1 },
    balls: [
      { x: 120, y: 90, radius: 18 },
      { x: 680, y: 90, radius: 18 }
    ],
    goal: { x: 400, y: 500, radius: 48 },
    platforms: [
      { x: 120, y: 160, width: 120, height: 20 },
      { x: 680, y: 160, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'laser', x: 260, y: 380, width: 18, height: 200 },
      { type: 'laser', x: 540, y: 380, width: 18, height: 200 },
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 250, y: 220, radius: 12 },
      { x: 550, y: 220, radius: 12 }
    ]
  },
  {
    id: 44,
    world: 5,
    worldName: 'CRAZY LAB',
    title: 'Quantum Splitter',
    hint: 'Use the central portal to safely transport the lower ball.',
    inkLimit: 850,
    threeStarInk: 360,
    twoStarInk: 560,
    gravity: { x: 0, y: 1 },
    balls: [
      { x: 130, y: 90, radius: 18 },
      { x: 130, y: 300, radius: 18 }
    ],
    goal: { x: 690, y: 460, radius: 48 },
    portals: [
      { entry: { x: 300, y: 460, radius: 26 }, exit: { x: 560, y: 220, vx: 2, vy: 1 } }
    ],
    platforms: [
      { x: 130, y: 160, width: 120, height: 20 },
      { x: 130, y: 370, width: 120, height: 20 },
      { x: 690, y: 520, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'saw', x: 430, y: 350, radius: 34, rotating: 0.06 },
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 420, y: 200, radius: 12 }
    ]
  },
  {
    id: 45,
    world: 5,
    worldName: 'CRAZY LAB',
    title: 'Laser Security Grid',
    hint: 'Active laser barriers cycle across the corridor. Find the safe angle!',
    inkLimit: 850,
    threeStarInk: 370,
    twoStarInk: 580,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 120, y: 90, radius: 18 }],
    goal: { x: 690, y: 470, radius: 44 },
    platforms: [
      { x: 120, y: 160, width: 120, height: 20 },
      { x: 400, y: 310, width: 120, height: 20 },
      { x: 690, y: 530, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'laser', x: 260, y: 260, width: 18, height: 260 },
      { type: 'laser', x: 540, y: 380, width: 18, height: 240 },
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 400, y: 220, radius: 12 }
    ]
  },
  {
    id: 46,
    world: 5,
    worldName: 'CRAZY LAB',
    title: 'The Triumvirate',
    hint: 'TRIPLE BALL RESCUE! Keep all 3 test subjects intact!',
    inkLimit: 950,
    threeStarInk: 420,
    twoStarInk: 660,
    gravity: { x: 0, y: 1 },
    balls: [
      { x: 100, y: 100, radius: 18 },
      { x: 160, y: 100, radius: 18 },
      { x: 220, y: 100, radius: 18 }
    ],
    goal: { x: 680, y: 470, radius: 52 },
    platforms: [
      { x: 160, y: 170, width: 190, height: 20 },
      { x: 680, y: 540, width: 150, height: 20 }
    ],
    hazards: [
      { type: 'saw', x: 380, y: 340, radius: 36, rotating: 0.07 },
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 380, y: 200, radius: 12 },
      { x: 520, y: 360, radius: 12 }
    ]
  },
  {
    id: 47,
    world: 5,
    worldName: 'CRAZY LAB',
    title: 'Dual Switch Matrix',
    hint: 'Trigger the switch to drop the barrier while saving both spheres.',
    inkLimit: 900,
    threeStarInk: 390,
    twoStarInk: 620,
    gravity: { x: 0, y: 1 },
    balls: [
      { x: 120, y: 90, radius: 18 },
      { x: 200, y: 90, radius: 18 }
    ],
    goal: { x: 690, y: 470, radius: 48 },
    switches: [
      { id: 'sw2', x: 360, y: 330, width: 44, height: 16, targetDoorId: 'door2' }
    ],
    doors: [
      { id: 'door2', x: 530, y: 360, width: 22, height: 190, openOffsetY: -170 }
    ],
    platforms: [
      { x: 160, y: 160, width: 160, height: 20 },
      { x: 360, y: 350, width: 100, height: 20 },
      { x: 690, y: 530, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 360, y: 260, radius: 12 },
      { x: 610, y: 410, radius: 12 }
    ]
  },
  {
    id: 48,
    world: 5,
    worldName: 'CRAZY LAB',
    title: 'The Centrifuge',
    hint: 'Twin spinning saw hazards flank the narrow passage.',
    inkLimit: 900,
    threeStarInk: 390,
    twoStarInk: 620,
    gravity: { x: 0, y: 1 },
    balls: [{ x: 120, y: 90, radius: 18 }],
    goal: { x: 680, y: 480, radius: 44 },
    platforms: [
      { x: 120, y: 160, width: 120, height: 20 },
      { x: 400, y: 320, width: 100, height: 20, moving: { axis: 'y', dist: 80, speed: 0.04 } },
      { x: 680, y: 540, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'saw', x: 260, y: 320, radius: 36, rotating: 0.08 },
      { type: 'saw', x: 540, y: 320, radius: 36, rotating: -0.08 },
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 400, y: 190, radius: 12 },
      { x: 610, y: 390, radius: 12 }
    ]
  },
  {
    id: 49,
    world: 5,
    worldName: 'CRAZY LAB',
    title: 'Particle Accelerator',
    hint: 'Use the high-speed portal relay to sling both balls past danger!',
    inkLimit: 950,
    threeStarInk: 420,
    twoStarInk: 660,
    gravity: { x: 0, y: 1 },
    balls: [
      { x: 120, y: 80, radius: 18 },
      { x: 200, y: 80, radius: 18 }
    ],
    goal: { x: 700, y: 460, radius: 48 },
    portals: [
      { entry: { x: 300, y: 480, radius: 28 }, exit: { x: 540, y: 180, vx: 3, vy: 1 } }
    ],
    platforms: [
      { x: 160, y: 150, width: 160, height: 20 },
      { x: 700, y: 520, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'saw', x: 420, y: 340, radius: 38, rotating: 0.07 },
      { type: 'laser', x: 420, y: 180, width: 18, height: 150 },
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 300, y: 360, radius: 12 },
      { x: 610, y: 260, radius: 12 }
    ]
  },
  {
    id: 50,
    world: 5,
    worldName: 'CRAZY LAB',
    title: 'The Mastermind Escape',
    hint: 'GRAND FINALE! 3 Balls, blast door switch, lasers, and rotating hazard core!',
    inkLimit: 1050,
    threeStarInk: 460,
    twoStarInk: 720,
    gravity: { x: 0, y: 1 },
    balls: [
      { x: 100, y: 80, radius: 18 },
      { x: 160, y: 80, radius: 18 },
      { x: 220, y: 80, radius: 18 }
    ],
    goal: { x: 710, y: 470, radius: 52 },
    switches: [
      { id: 'sw_final', x: 340, y: 370, width: 44, height: 16, targetDoorId: 'door_final' }
    ],
    doors: [
      { id: 'door_final', x: 560, y: 380, width: 24, height: 190, openOffsetY: -170 }
    ],
    platforms: [
      { x: 160, y: 150, width: 190, height: 20 },
      { x: 340, y: 390, width: 110, height: 20 },
      { x: 710, y: 535, width: 120, height: 20 }
    ],
    hazards: [
      { type: 'saw', x: 440, y: 230, radius: 36, rotating: 0.08 },
      { type: 'laser', x: 240, y: 440, width: 18, height: 170 },
      { type: 'spike', x: 400, y: 585, width: 780, height: 25 }
    ],
    collectibles: [
      { x: 340, y: 290, radius: 12 },
      { x: 500, y: 460, radius: 12 },
      { x: 650, y: 330, radius: 12 }
    ]
  }
];
