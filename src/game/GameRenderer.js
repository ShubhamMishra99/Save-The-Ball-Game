// Canvas 2D Game Renderer with cute expressive ball animations,
// vibrant world backgrounds, dynamic particle systems, and glow effects!

export class GameRenderer {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.particles = [];
    this.screenShake = 0;
    this.time = 0;
    this.blinkTimer = 0;
    this.isBlinking = false;
  }

  triggerShake(intensity = 8) {
    this.screenShake = intensity;
  }

  addParticles({ x, y, count = 10, color = '#FFD43B', speed = 3, type = 'sparkle' }) {
    for (let i = 0; i < count; i++) {
      const angle = Math.random() * Math.PI * 2;
      const spd = (0.5 + Math.random() * 0.8) * speed;
      this.particles.push({
        x,
        y,
        vx: Math.cos(angle) * spd,
        vy: Math.sin(angle) * spd,
        color,
        size: 2.5 + Math.random() * 4,
        alpha: 1,
        life: 1,
        decay: 0.02 + Math.random() * 0.03,
        type
      });
    }
  }

  render({
    physics,
    level,
    drawingPoints,
    currentStroke,
    inkRemaining,
    maxInk,
    inkColor = '#38D9A9',
    ballSkin = 'classic',
    trailType = 'rainbow'
  }) {
    if (!this.ctx || !physics) return;

    this.time += 0.016;
    const ctx = this.ctx;
    const width = this.canvas.width;
    const height = this.canvas.height;

    // Handle screen shake
    ctx.save();
    if (this.screenShake > 0) {
      const shakeX = (Math.random() - 0.5) * this.screenShake;
      const shakeY = (Math.random() - 0.5) * this.screenShake;
      ctx.translate(shakeX, shakeY);
      this.screenShake = Math.max(0, this.screenShake - 0.4);
    }

    // 1. Draw World Themed Background
    this.drawBackground(level ? level.world : 1, width, height);

    // 2. Draw Level Platforms
    this.drawPlatforms(physics);

    // 3. Draw Doors and Switches
    this.drawDoorsAndSwitches(physics);

    // 4. Draw Hazards (Spikes, Lava, Saws, Lasers)
    this.drawHazards(physics);

    // 5. Draw Portals
    this.drawPortals(physics);

    // 6. Draw Collectible Coins
    this.drawCoins(physics);

    // 7. Draw Glowing Save Zone (Goal)
    this.drawGoal(physics);

    // 8. Draw Completed Drawn Lines
    this.drawCommittedLines(physics, inkColor);

    // 9. Draw Active In-Progress Stroke
    if (currentStroke && currentStroke.length > 1) {
      this.drawStroke(currentStroke, inkColor, true);
    }

    // 10. Draw Particles
    this.updateAndDrawParticles();

    // 11. Draw Balls with Expressive Eyes & Trails
    this.drawBalls(physics, ballSkin, trailType);

    // 12. Draw Power-up Visual Overlays (Shield, Magnet, Slow-Mo)
    this.drawPowerupAuras(physics);

    ctx.restore();
  }

  // --- BACKGROUND DRAWING ---
  drawBackground(worldNum, width, height) {
    const ctx = this.ctx;

    if (worldNum === 1) {
      // World 1: GREEN VALLEY - Sunny sky, rolling hills, clouds
      const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
      skyGrad.addColorStop(0, '#56CCF2');
      skyGrad.addColorStop(0.65, '#E0F7FA');
      skyGrad.addColorStop(1, '#C8E6C9');
      ctx.fillStyle = skyGrad;
      ctx.fillRect(0, 0, width, height);

      // Distant mountain
      ctx.fillStyle = '#A8DADC';
      ctx.beginPath();
      ctx.moveTo(0, height);
      ctx.lineTo(160, 360);
      ctx.lineTo(340, height);
      ctx.fill();

      // Rolling hill back
      ctx.fillStyle = '#81C784';
      ctx.beginPath();
      ctx.ellipse(250, height + 80, 480, 260, 0, 0, Math.PI * 2);
      ctx.fill();

      // Rolling hill front
      ctx.fillStyle = '#66BB6A';
      ctx.beginPath();
      ctx.ellipse(650, height + 100, 520, 280, 0, 0, Math.PI * 2);
      ctx.fill();

      // Stylized Clouds
      this.drawCloud(120 + Math.sin(this.time * 0.2) * 20, 80, 48);
      this.drawCloud(620 + Math.sin(this.time * 0.15 + 2) * 25, 120, 56);
    } else if (worldNum === 2) {
      // World 2: FIRE LAND - Volcanic red/orange glow, dark stalactites
      const fireGrad = ctx.createLinearGradient(0, 0, 0, height);
      fireGrad.addColorStop(0, '#1E0608');
      fireGrad.addColorStop(0.5, '#3D0C11');
      fireGrad.addColorStop(1, '#8A151B');
      ctx.fillStyle = fireGrad;
      ctx.fillRect(0, 0, width, height);

      // Magma ambient glow on bottom
      const magmaAura = ctx.createRadialGradient(400, height, 50, 400, height, 400);
      magmaAura.addColorStop(0, 'rgba(255, 107, 0, 0.45)');
      magmaAura.addColorStop(1, 'rgba(255, 0, 0, 0)');
      ctx.fillStyle = magmaAura;
      ctx.fillRect(0, 0, width, height);

      // Dark jagged cavern rocks
      ctx.fillStyle = '#140507';
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.lineTo(100, 120);
      ctx.lineTo(190, 0);
      ctx.lineTo(340, 160);
      ctx.lineTo(460, 0);
      ctx.lineTo(620, 130);
      ctx.lineTo(720, 0);
      ctx.lineTo(width, 0);
      ctx.lineTo(width, height);
      ctx.lineTo(0, height);
      ctx.fill();

      // Floating ember particles
      if (Math.random() < 0.2) {
        this.addParticles({
          x: Math.random() * width,
          y: height - 10,
          count: 1,
          color: '#FFA94D',
          speed: 1.5,
          type: 'ember'
        });
      }
    } else if (worldNum === 3) {
      // World 3: SPIKE CITY - Industrial cyberpunk grid, steel pillars
      const indGrad = ctx.createLinearGradient(0, 0, 0, height);
      indGrad.addColorStop(0, '#111827');
      indGrad.addColorStop(1, '#1F2937');
      ctx.fillStyle = indGrad;
      ctx.fillRect(0, 0, width, height);

      // Tech Grid
      ctx.strokeStyle = 'rgba(239, 68, 68, 0.08)';
      ctx.lineWidth = 1;
      const gridSize = 40;
      for (let x = 0; x < width; x += gridSize) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 0; y < height; y += gridSize) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }

      // Background silhouettes of industrial beams
      ctx.fillStyle = 'rgba(15, 23, 42, 0.7)';
      ctx.fillRect(80, 0, 40, height);
      ctx.fillRect(520, 0, 50, height);
      ctx.fillRect(0, 420, width, 30);
    } else if (worldNum === 4) {
      // World 4: SPACE WORLD - Deep space, cosmic stars, nebula
      const spaceGrad = ctx.createLinearGradient(0, 0, width, height);
      spaceGrad.addColorStop(0, '#090A1A');
      spaceGrad.addColorStop(0.5, '#160E36');
      spaceGrad.addColorStop(1, '#050314');
      ctx.fillStyle = spaceGrad;
      ctx.fillRect(0, 0, width, height);

      // Glowing Purple Cosmic Nebula
      const nebula = ctx.createRadialGradient(280, 220, 20, 280, 220, 320);
      nebula.addColorStop(0, 'rgba(155, 89, 182, 0.25)');
      nebula.addColorStop(0.6, 'rgba(52, 152, 219, 0.15)');
      nebula.addColorStop(1, 'rgba(0,0,0,0)');
      ctx.fillStyle = nebula;
      ctx.fillRect(0, 0, width, height);

      // Distant stars
      ctx.fillStyle = '#FFFFFF';
      for (let i = 0; i < 40; i++) {
        const sx = ((i * 137.5) % width);
        const sy = ((i * 91.3) % height);
        const sz = (i % 3 === 0) ? 2 : 1;
        const opacity = 0.3 + 0.7 * Math.sin(this.time * 2 + i);
        ctx.globalAlpha = Math.max(0.1, opacity);
        ctx.fillRect(sx, sy, sz, sz);
      }
      ctx.globalAlpha = 1.0;
    } else {
      // World 5: CRAZY LAB - High tech neon teal laboratory, scientific lines
      const labGrad = ctx.createLinearGradient(0, 0, 0, height);
      labGrad.addColorStop(0, '#0B1E28');
      labGrad.addColorStop(1, '#031018');
      ctx.fillStyle = labGrad;
      ctx.fillRect(0, 0, width, height);

      // Hexagonal / circuit matrix
      ctx.strokeStyle = 'rgba(34, 184, 207, 0.12)';
      ctx.lineWidth = 1.5;
      for (let x = 30; x < width; x += 60) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, height);
        ctx.stroke();
      }
      for (let y = 30; y < height; y += 60) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(width, y);
        ctx.stroke();
      }
    }
  }

  drawCloud(cx, cy, r) {
    const ctx = this.ctx;
    ctx.fillStyle = 'rgba(255, 255, 255, 0.75)';
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.7, 0, Math.PI * 2);
    ctx.arc(cx + r * 0.5, cy - r * 0.2, r * 0.6, 0, Math.PI * 2);
    ctx.arc(cx + r, cy, r * 0.65, 0, Math.PI * 2);
    ctx.arc(cx + r * 0.5, cy + r * 0.15, r * 0.5, 0, Math.PI * 2);
    ctx.fill();
  }

  // --- PLATFORMS ---
  drawPlatforms(physics) {
    const ctx = this.ctx;
    const bodies = physics.world ? physics.world.bodies : [];

    bodies.forEach(body => {
      if (body.label === 'platform') {
        const { vertices } = body;
        ctx.save();
        ctx.fillStyle = '#2C3E50';
        ctx.strokeStyle = '#60A5FA';
        ctx.lineWidth = 3;

        ctx.beginPath();
        ctx.moveTo(vertices[0].x, vertices[0].y);
        for (let i = 1; i < vertices.length; i++) {
          ctx.lineTo(vertices[i].x, vertices[i].y);
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Platform top highlight
        ctx.strokeStyle = 'rgba(255,255,255,0.45)';
        ctx.lineWidth = 2;
        ctx.beginPath();
        ctx.moveTo(vertices[0].x, vertices[0].y + 2);
        ctx.lineTo(vertices[1].x, vertices[1].y + 2);
        ctx.stroke();

        ctx.restore();
      }
    });
  }

  // --- DOORS & SWITCHES ---
  drawDoorsAndSwitches(physics) {
    const ctx = this.ctx;

    // Doors
    physics.doorBodies.forEach(door => {
      ctx.save();
      const vertices = door.vertices;
      ctx.fillStyle = '#D9480F';
      ctx.strokeStyle = '#FFA94D';
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.moveTo(vertices[0].x, vertices[0].y);
      for (let i = 1; i < vertices.length; i++) {
        ctx.lineTo(vertices[i].x, vertices[i].y);
      }
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Warning stripes on door
      ctx.strokeStyle = 'rgba(0,0,0,0.3)';
      ctx.lineWidth = 4;
      const bY = door.position.y - 40;
      for (let s = -40; s <= 40; s += 16) {
        ctx.beginPath();
        ctx.moveTo(door.position.x - 10, bY + s);
        ctx.lineTo(door.position.x + 10, bY + s + 10);
        ctx.stroke();
      }
      ctx.restore();
    });

    // Switches
    physics.switchBodies.forEach(sw => {
      ctx.save();
      ctx.fillStyle = sw.activated ? '#40C057' : '#FA5252';
      ctx.strokeStyle = '#FFFFFF';
      ctx.lineWidth = 2;

      const halfW = 22;
      const halfH = 8;
      ctx.beginPath();
      ctx.roundRect(sw.position.x - halfW, sw.position.y - halfH, halfW * 2, halfH * 2, 4);
      ctx.fill();
      ctx.stroke();

      // Little indicator bulb
      ctx.fillStyle = sw.activated ? '#8CE99A' : '#FFA8A8';
      ctx.beginPath();
      ctx.arc(sw.position.x, sw.position.y - 1, 4, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });
  }

  // --- HAZARDS ---
  drawHazards(physics) {
    const ctx = this.ctx;

    physics.hazardBodies.forEach(h => {
      const type = h.hazardType;
      ctx.save();

      if (type === 'spike') {
        const bounds = h.bounds;
        const w = bounds.max.x - bounds.min.x;
        const hVal = bounds.max.y - bounds.min.y;
        const numSpikes = Math.max(3, Math.floor(w / 18));
        const spikeW = w / numSpikes;

        ctx.fillStyle = '#E03131';
        ctx.strokeStyle = '#820000';
        ctx.lineWidth = 1.5;

        for (let i = 0; i < numSpikes; i++) {
          const sx = bounds.min.x + i * spikeW;
          ctx.beginPath();
          ctx.moveTo(sx, bounds.max.y);
          ctx.lineTo(sx + spikeW / 2, bounds.min.y);
          ctx.lineTo(sx + spikeW, bounds.max.y);
          ctx.closePath();
          ctx.fill();
          ctx.stroke();
        }
      } else if (type === 'lava') {
        const bounds = h.bounds;
        const w = bounds.max.x - bounds.min.x;
        const hVal = bounds.max.y - bounds.min.y;

        const lavaGrad = ctx.createLinearGradient(0, bounds.min.y, 0, bounds.max.y);
        lavaGrad.addColorStop(0, '#FFE066');
        lavaGrad.addColorStop(0.3, '#FF6B00');
        lavaGrad.addColorStop(1, '#C92A2A');

        ctx.fillStyle = lavaGrad;
        ctx.fillRect(bounds.min.x, bounds.min.y, w, hVal);

        // Animated lava surface waves
        ctx.fillStyle = '#FFF3BF';
        ctx.beginPath();
        ctx.moveTo(bounds.min.x, bounds.min.y);
        for (let x = bounds.min.x; x <= bounds.max.x; x += 15) {
          const wave = Math.sin(this.time * 4 + x * 0.05) * 4;
          ctx.lineTo(x, bounds.min.y + wave);
        }
        ctx.lineTo(bounds.max.x, bounds.min.y + 6);
        ctx.lineTo(bounds.min.x, bounds.min.y + 6);
        ctx.fill();
      } else if (type === 'saw') {
        const { x, y } = h.position;
        const r = h.radius || 30;
        const angle = h.angle || 0;

        ctx.translate(x, y);
        ctx.rotate(angle);

        // Saw blade body
        ctx.fillStyle = '#CED4DA';
        ctx.strokeStyle = '#495057';
        ctx.lineWidth = 2;

        // Serrated teeth
        const teeth = 12;
        ctx.beginPath();
        for (let i = 0; i < teeth; i++) {
          const a1 = (i / teeth) * Math.PI * 2;
          const a2 = ((i + 0.5) / teeth) * Math.PI * 2;
          ctx.lineTo(Math.cos(a1) * r, Math.sin(a1) * r);
          ctx.lineTo(Math.cos(a2) * (r * 0.78), Math.sin(a2) * (r * 0.78));
        }
        ctx.closePath();
        ctx.fill();
        ctx.stroke();

        // Inner saw disk
        ctx.fillStyle = '#E03131';
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.45, 0, Math.PI * 2);
        ctx.fill();

        // Center nut
        ctx.fillStyle = '#FFFFFF';
        ctx.beginPath();
        ctx.arc(0, 0, r * 0.18, 0, Math.PI * 2);
        ctx.fill();
      } else if (type === 'laser') {
        const bounds = h.bounds;
        const w = bounds.max.x - bounds.min.x;
        const hVal = bounds.max.y - bounds.min.y;

        // Pulsating glowing laser beam
        const pulse = 0.7 + 0.3 * Math.sin(this.time * 12);
        ctx.shadowColor = '#F03E3E';
        ctx.shadowBlur = 14 * pulse;
        ctx.fillStyle = '#FF8787';
        ctx.fillRect(bounds.min.x, bounds.min.y, w, hVal);

        // Core bright white laser line
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(bounds.min.x + w * 0.35, bounds.min.y, w * 0.3, hVal);
        ctx.shadowBlur = 0;
      }

      ctx.restore();
    });
  }

  // --- PORTALS ---
  drawPortals(physics) {
    const ctx = this.ctx;

    physics.portals.forEach(portal => {
      const entryPos = portal.entryBody.position;
      const exitPos = portal.exit;

      // Draw Entry Portal (Electric Cyan Swirl)
      ctx.save();
      ctx.translate(entryPos.x, entryPos.y);
      ctx.rotate(this.time * 3);
      const gradEntry = ctx.createRadialGradient(0, 0, 4, 0, 0, 28);
      gradEntry.addColorStop(0, '#FFFFFF');
      gradEntry.addColorStop(0.5, '#3BC9DB');
      gradEntry.addColorStop(1, 'rgba(12, 133, 153, 0.2)');

      ctx.fillStyle = gradEntry;
      ctx.beginPath();
      ctx.arc(0, 0, 26, 0, Math.PI * 2);
      ctx.fill();

      // Portal rings
      ctx.strokeStyle = '#E3FAFC';
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      ctx.arc(0, 0, 22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();

      // Draw Exit Portal (Cosmic Orange / Gold Swirl)
      ctx.save();
      ctx.translate(exitPos.x, exitPos.y);
      ctx.rotate(-this.time * 3);
      const gradExit = ctx.createRadialGradient(0, 0, 4, 0, 0, 28);
      gradExit.addColorStop(0, '#FFFFFF');
      gradExit.addColorStop(0.5, '#FF922B');
      gradExit.addColorStop(1, 'rgba(217, 72, 15, 0.2)');

      ctx.fillStyle = gradExit;
      ctx.beginPath();
      ctx.arc(0, 0, 26, 0, Math.PI * 2);
      ctx.fill();

      ctx.strokeStyle = '#FFF3BF';
      ctx.lineWidth = 3;
      ctx.setLineDash([8, 6]);
      ctx.beginPath();
      ctx.arc(0, 0, 22, 0, Math.PI * 2);
      ctx.stroke();
      ctx.restore();
    });
  }

  // --- COINS ---
  drawCoins(physics) {
    const ctx = this.ctx;
    const coinScale = Math.abs(Math.sin(this.time * 4));

    physics.coinBodies.forEach(coin => {
      ctx.save();
      const { x, y } = coin.position;
      const bob = Math.sin(this.time * 5 + x) * 4;

      ctx.translate(x, y + bob);
      ctx.scale(Math.max(0.2, coinScale), 1);

      ctx.shadowColor = '#FCC419';
      ctx.shadowBlur = 8;
      ctx.fillStyle = '#FFD43B';
      ctx.strokeStyle = '#F59F00';
      ctx.lineWidth = 2.5;

      ctx.beginPath();
      ctx.arc(0, 0, 12, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();

      // Star emblem in center of coin
      ctx.fillStyle = '#FFE066';
      ctx.beginPath();
      ctx.arc(0, 0, 6, 0, Math.PI * 2);
      ctx.fill();

      ctx.restore();
    });
  }

  // --- GOAL (SAVE ZONE) ---
  drawGoal(physics) {
    if (!physics.goalBody) return;
    const ctx = this.ctx;
    const { x, y } = physics.goalBody.position;
    const radius = physics.currentLevel ? physics.currentLevel.goal.radius || 42 : 42;

    ctx.save();
    // Pulsating energy ring waves
    const pulse1 = (this.time * 35) % (radius * 1.3);
    const pulse2 = ((this.time * 35) + radius * 0.65) % (radius * 1.3);

    ctx.strokeStyle = 'rgba(64, 192, 87, 0.4)';
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.arc(x, y, radius + pulse1, 0, Math.PI * 2);
    ctx.stroke();

    ctx.strokeStyle = 'rgba(81, 207, 102, 0.3)';
    ctx.beginPath();
    ctx.arc(x, y, radius + pulse2, 0, Math.PI * 2);
    ctx.stroke();

    // Core Glowing Safe Zone
    const goalGrad = ctx.createRadialGradient(x, y, 4, x, y, radius);
    goalGrad.addColorStop(0, 'rgba(211, 249, 216, 0.95)');
    goalGrad.addColorStop(0.4, 'rgba(81, 207, 102, 0.85)');
    goalGrad.addColorStop(0.85, 'rgba(43, 138, 62, 0.7)');
    goalGrad.addColorStop(1, 'rgba(43, 138, 62, 0.2)');

    ctx.shadowColor = '#51CF66';
    ctx.shadowBlur = 18;
    ctx.fillStyle = goalGrad;
    ctx.beginPath();
    ctx.arc(x, y, radius, 0, Math.PI * 2);
    ctx.fill();

    // Cute Saving Heart or Star Badge in center
    ctx.shadowBlur = 0;
    ctx.fillStyle = '#FFFFFF';
    ctx.font = 'bold 22px Fredoka, sans-serif';
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.fillText('SAVE', x, y - 2);

    ctx.font = '10px Fredoka, sans-serif';
    ctx.fillText('ZONE', x, y + 14);

    ctx.restore();
  }

  // --- DRAWN LINES ---
  drawCommittedLines(physics, color) {
    const ctx = this.ctx;
    if (!physics.world) return;

    physics.drawnBodies.forEach(composite => {
      const bodies = composite.bodies || [];
      bodies.forEach(b => {
        ctx.save();
        ctx.fillStyle = color;
        ctx.strokeStyle = '#FFFFFF';
        ctx.lineWidth = 1;

        if (b.circleRadius) {
          ctx.beginPath();
          ctx.arc(b.position.x, b.position.y, b.circleRadius, 0, Math.PI * 2);
          ctx.fill();
        } else if (b.vertices) {
          ctx.beginPath();
          ctx.moveTo(b.vertices[0].x, b.vertices[0].y);
          for (let i = 1; i < b.vertices.length; i++) {
            ctx.lineTo(b.vertices[i].x, b.vertices[i].y);
          }
          ctx.closePath();
          ctx.fill();
        }
        ctx.restore();
      });
    });
  }

  drawStroke(points, color, isDotted = false) {
    if (!points || points.length < 2) return;
    const ctx = this.ctx;
    ctx.save();
    ctx.strokeStyle = color;
    ctx.lineWidth = 10;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';

    ctx.shadowColor = color;
    ctx.shadowBlur = 10;

    ctx.beginPath();
    ctx.moveTo(points[0].x, points[0].y);
    for (let i = 1; i < points.length; i++) {
      ctx.lineTo(points[i].x, points[i].y);
    }
    ctx.stroke();
    ctx.restore();
  }

  // --- BALL CHARACTER & EXPRESSIVE FACES ---
  drawBalls(physics, skin = 'classic', trailType = 'rainbow') {
    const ctx = this.ctx;

    // Manage blinking
    this.blinkTimer += 0.016;
    if (this.blinkTimer > 3.5) {
      this.isBlinking = true;
      if (this.blinkTimer > 3.65) {
        this.isBlinking = false;
        this.blinkTimer = 0;
      }
    }

    physics.ballBodies.forEach(ball => {
      const { x, y } = ball.position;
      const radius = ball.circleRadius || 18;
      const vx = ball.velocity.x;
      const vy = ball.velocity.y;
      const speed = Math.hypot(vx, vy);

      // 1. Draw Ball Trail
      if (ball.trail && ball.trail.length > 1) {
        for (let i = 0; i < ball.trail.length; i++) {
          const pt = ball.trail[i];
          const trailAlpha = (i + 1) / ball.trail.length * 0.45;
          const trailSize = radius * (0.3 + (i / ball.trail.length) * 0.6);

          ctx.save();
          ctx.globalAlpha = trailAlpha;
          if (trailType === 'rainbow') {
            const hue = (i * 25 + this.time * 100) % 360;
            ctx.fillStyle = `hsl(${hue}, 90%, 65%)`;
          } else if (trailType === 'fire') {
            ctx.fillStyle = i % 2 === 0 ? '#FF6B00' : '#FFD43B';
          } else if (trailType === 'neon') {
            ctx.fillStyle = '#22B8CF';
          } else {
            ctx.fillStyle = '#FFE066';
          }

          ctx.beginPath();
          ctx.arc(pt.x, pt.y, trailSize, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        }
      }

      // 2. Squash and Stretch based on velocity
      ctx.save();
      ctx.translate(x, y);

      let angle = Math.atan2(vy, vx);
      if (speed < 0.5) angle = 0;
      ctx.rotate(angle);

      const stretch = Math.min(1.35, 1 + speed * 0.02);
      const squash = 1 / stretch;
      ctx.scale(stretch, squash);
      ctx.rotate(-angle); // Keep face oriented upright

      // 3. Render Ball Body based on Skin
      this.renderBallSkin(ctx, radius, skin, ball.angle);

      // 4. Render Cute Expressive Face
      const isScared = speed > 10;
      const isHappy = physics.ballsInGoal.has(ball.ballIndex);
      this.renderBallFace(ctx, radius, isScared, isHappy, this.isBlinking, vx, vy);

      ctx.restore();

      // 5. Floating "Draw line to release!" cue if waiting
      if (!physics.isBallReleased && ball.ballIndex === 0) {
        ctx.save();
        const bobY = Math.sin(this.time * 6) * 4;
        ctx.translate(x, y - radius - 26 + bobY);

        ctx.fillStyle = 'rgba(15, 23, 42, 0.88)';
        ctx.strokeStyle = '#38D9A9';
        ctx.lineWidth = 1.5;
        ctx.shadowColor = 'rgba(56, 217, 169, 0.4)';
        ctx.shadowBlur = 8;

        ctx.beginPath();
        ctx.roundRect(-64, -13, 128, 24, 12);
        ctx.fill();
        ctx.stroke();

        ctx.shadowBlur = 0;
        ctx.fillStyle = '#E2E8F0';
        ctx.font = 'bold 11px Fredoka, sans-serif';
        ctx.textAlign = 'center';
        ctx.textBaseline = 'middle';
        ctx.fillText('✏️ Draw to roll!', 0, 0);

        ctx.restore();
      }
    });
  }

  renderBallSkin(ctx, r, skin, rotation) {
    let baseGrad = ctx.createRadialGradient(-r * 0.35, -r * 0.35, r * 0.1, 0, 0, r);

    if (skin === 'ninja') {
      baseGrad.addColorStop(0, '#495057');
      baseGrad.addColorStop(0.7, '#212529');
      baseGrad.addColorStop(1, '#000000');
    } else if (skin === 'cyber') {
      baseGrad.addColorStop(0, '#E3FAFC');
      baseGrad.addColorStop(0.5, '#22B8CF');
      baseGrad.addColorStop(1, '#0B7285');
    } else if (skin === 'kitty') {
      baseGrad.addColorStop(0, '#FFF0F6');
      baseGrad.addColorStop(0.6, '#FCC2D7');
      baseGrad.addColorStop(1, '#F06595');
    } else if (skin === 'alien') {
      baseGrad.addColorStop(0, '#D3F9D8');
      baseGrad.addColorStop(0.5, '#51CF66');
      baseGrad.addColorStop(1, '#2B8A3E');
    } else if (skin === 'crown') {
      baseGrad.addColorStop(0, '#FFF9DB');
      baseGrad.addColorStop(0.5, '#FFD43B');
      baseGrad.addColorStop(1, '#F59F00');
    } else if (skin === 'fire') {
      baseGrad.addColorStop(0, '#FFE8CC');
      baseGrad.addColorStop(0.4, '#FF922B');
      baseGrad.addColorStop(1, '#E8590C');
    } else {
      // Classic Happy Sunshine
      baseGrad.addColorStop(0, '#FFF3BF');
      baseGrad.addColorStop(0.45, '#FFD43B');
      baseGrad.addColorStop(1, '#FD7E14');
    }

    ctx.fillStyle = baseGrad;
    ctx.shadowColor = 'rgba(0,0,0,0.2)';
    ctx.shadowBlur = 8;
    ctx.beginPath();
    ctx.arc(0, 0, r, 0, Math.PI * 2);
    ctx.fill();
    ctx.shadowBlur = 0;

    // Highlight shine
    ctx.fillStyle = 'rgba(255, 255, 255, 0.65)';
    ctx.beginPath();
    ctx.ellipse(-r * 0.3, -r * 0.35, r * 0.35, r * 0.2, -0.4, 0, Math.PI * 2);
    ctx.fill();

    // Skin special accessories
    if (skin === 'ninja') {
      // Red headband
      ctx.fillStyle = '#FA5252';
      ctx.fillRect(-r, -r * 0.45, r * 2, r * 0.35);
      // Headband knot
      ctx.beginPath();
      ctx.arc(r * 0.85, -r * 0.3, 4, 0, Math.PI * 2);
      ctx.fill();
    } else if (skin === 'crown') {
      // Golden Crown
      ctx.fillStyle = '#FFE066';
      ctx.strokeStyle = '#F59F00';
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(-r * 0.6, -r * 0.8);
      ctx.lineTo(-r * 0.6, -r * 1.3);
      ctx.lineTo(-r * 0.2, -r * 1.0);
      ctx.lineTo(0, -r * 1.4);
      ctx.lineTo(r * 0.2, -r * 1.0);
      ctx.lineTo(r * 0.6, -r * 1.3);
      ctx.lineTo(r * 0.6, -r * 0.8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // Rubies on crown tips
      ctx.fillStyle = '#E03131';
      ctx.beginPath();
      ctx.arc(0, -r * 1.35, 3, 0, Math.PI * 2);
      ctx.arc(-r * 0.6, -r * 1.25, 2.5, 0, Math.PI * 2);
      ctx.arc(r * 0.6, -r * 1.25, 2.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (skin === 'kitty') {
      // Cat ears
      ctx.fillStyle = '#FCC2D7';
      ctx.strokeStyle = '#F06595';
      ctx.lineWidth = 2;
      // Left ear
      ctx.beginPath();
      ctx.moveTo(-r * 0.8, -r * 0.4);
      ctx.lineTo(-r * 0.9, -r * 1.1);
      ctx.lineTo(-r * 0.3, -r * 0.8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
      // Right ear
      ctx.beginPath();
      ctx.moveTo(r * 0.8, -r * 0.4);
      ctx.lineTo(r * 0.9, -r * 1.1);
      ctx.lineTo(r * 0.3, -r * 0.8);
      ctx.closePath();
      ctx.fill();
      ctx.stroke();
    }
  }

  renderBallFace(ctx, r, isScared, isHappy, isBlinking, vx, vy) {
    // Eye look direction offset based on velocity
    const lookX = Math.max(-3, Math.min(3, vx * 0.4));
    const lookY = Math.max(-3, Math.min(3, vy * 0.3));

    const eyeOffsetX = r * 0.36;
    const eyeOffsetY = -r * 0.08;

    if (isBlinking) {
      // Blinking slits
      ctx.strokeStyle = '#1A1523';
      ctx.lineWidth = 2.5;
      ctx.beginPath();
      ctx.moveTo(-eyeOffsetX - 4, eyeOffsetY);
      ctx.lineTo(-eyeOffsetX + 4, eyeOffsetY);
      ctx.moveTo(eyeOffsetX - 4, eyeOffsetY);
      ctx.lineTo(eyeOffsetX + 4, eyeOffsetY);
      ctx.stroke();
    } else if (isScared) {
      // Wide alarmed eyes
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(-eyeOffsetX, eyeOffsetY, 6.5, 0, Math.PI * 2);
      ctx.arc(eyeOffsetX, eyeOffsetY, 6.5, 0, Math.PI * 2);
      ctx.fill();

      // Tiny pupils
      ctx.fillStyle = '#1A1523';
      ctx.beginPath();
      ctx.arc(-eyeOffsetX + lookX, eyeOffsetY + lookY, 2.2, 0, Math.PI * 2);
      ctx.arc(eyeOffsetX + lookX, eyeOffsetY + lookY, 2.2, 0, Math.PI * 2);
      ctx.fill();

      // O mouth
      ctx.fillStyle = '#1A1523';
      ctx.beginPath();
      ctx.arc(0, r * 0.35, 4.5, 0, Math.PI * 2);
      ctx.fill();
    } else if (isHappy) {
      // Curved joyous eyes ^ ^
      ctx.strokeStyle = '#1A1523';
      ctx.lineWidth = 2.5;
      ctx.lineCap = 'round';

      ctx.beginPath();
      ctx.arc(-eyeOffsetX, eyeOffsetY + 2, 4.5, Math.PI, 0);
      ctx.stroke();

      ctx.beginPath();
      ctx.arc(eyeOffsetX, eyeOffsetY + 2, 4.5, Math.PI, 0);
      ctx.stroke();

      // Big happy smile
      ctx.fillStyle = '#E03131';
      ctx.beginPath();
      ctx.arc(0, r * 0.28, 6, 0, Math.PI);
      ctx.fill();
    } else {
      // Normal cute big eyes
      const eyeR = 4.5;
      ctx.fillStyle = '#1A1523';
      ctx.beginPath();
      ctx.arc(-eyeOffsetX + lookX, eyeOffsetY + lookY, eyeR, 0, Math.PI * 2);
      ctx.arc(eyeOffsetX + lookX, eyeOffsetY + lookY, eyeR, 0, Math.PI * 2);
      ctx.fill();

      // Sparkles in eyes
      ctx.fillStyle = '#FFFFFF';
      ctx.beginPath();
      ctx.arc(-eyeOffsetX + lookX - 1.2, eyeOffsetY + lookY - 1.2, 1.8, 0, Math.PI * 2);
      ctx.arc(eyeOffsetX + lookX - 1.2, eyeOffsetY + lookY - 1.2, 1.8, 0, Math.PI * 2);
      ctx.fill();

      // Rosy blush cheeks
      ctx.fillStyle = 'rgba(255, 107, 107, 0.45)';
      ctx.beginPath();
      ctx.ellipse(-eyeOffsetX - 2, eyeOffsetY + 8, 4, 2.5, 0, 0, Math.PI * 2);
      ctx.ellipse(eyeOffsetX + 2, eyeOffsetY + 8, 4, 2.5, 0, 0, Math.PI * 2);
      ctx.fill();

      // Gentle smile
      ctx.strokeStyle = '#1A1523';
      ctx.lineWidth = 2.2;
      ctx.lineCap = 'round';
      ctx.beginPath();
      ctx.arc(0, eyeOffsetY + 8, 5, 0.2, Math.PI - 0.2);
      ctx.stroke();
    }
  }

  // --- POWER-UP VISUAL EFFECTS ---
  drawPowerupAuras(physics) {
    const ctx = this.ctx;

    // Shield bubble
    if (physics.shieldActive) {
      physics.ballBodies.forEach(ball => {
        const { x, y } = ball.position;
        const r = (ball.circleRadius || 18) + 9;
        ctx.save();
        ctx.strokeStyle = '#4DABF7';
        ctx.fillStyle = 'rgba(77, 171, 247, 0.2)';
        ctx.lineWidth = 3;
        ctx.shadowColor = '#4DABF7';
        ctx.shadowBlur = 12;

        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
        ctx.stroke();
        ctx.restore();
      });
    }

    // Magnet beam
    if (physics.magnetActive && physics.goalBody) {
      const goalPos = physics.goalBody.position;
      physics.ballBodies.forEach(ball => {
        const { x, y } = ball.position;
        ctx.save();
        ctx.strokeStyle = 'rgba(255, 192, 203, 0.5)';
        ctx.lineWidth = 3;
        ctx.setLineDash([6, 6]);
        ctx.beginPath();
        ctx.moveTo(x, y);
        ctx.lineTo(goalPos.x, goalPos.y);
        ctx.stroke();
        ctx.restore();
      });
    }

    // Slow-Mo clock / visual tint
    if (physics.slowMoActive) {
      ctx.save();
      ctx.fillStyle = 'rgba(100, 200, 255, 0.08)';
      ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
      ctx.restore();
    }
  }

  // --- PARTICLES ---
  updateAndDrawParticles() {
    const ctx = this.ctx;
    for (let i = this.particles.length - 1; i >= 0; i--) {
      const p = this.particles[i];
      p.x += p.vx;
      p.y += p.vy;
      p.life -= p.decay;

      if (p.type === 'ember') {
        p.vy -= 0.05; // float upwards
      }

      if (p.life <= 0) {
        this.particles.splice(i, 1);
        continue;
      }

      ctx.save();
      ctx.globalAlpha = p.life;
      ctx.fillStyle = p.color;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
      ctx.fill();
      ctx.restore();
    }
  }
}
