import Matter from 'matter-js';
import sound from '../utils/audio';

const {
  Engine,
  World,
  Bodies,
  Body,
  Composite,
  Events,
  Vector
} = Matter;

export class PhysicsEngine {
  constructor({ onWin, onFail, onCoinCollect, onSwitchTrigger, onPortalTeleport, onInkChange }) {
    this.onWin = onWin;
    this.onFail = onFail;
    this.onCoinCollect = onCoinCollect;
    this.onSwitchTrigger = onSwitchTrigger;
    this.onPortalTeleport = onPortalTeleport;
    this.onInkChange = onInkChange;

    this.engine = null;
    this.world = null;
    this.currentLevel = null;
    this.ballBodies = [];
    this.drawnBodies = [];
    this.movingPlatforms = [];
    this.rotatingHazards = [];
    this.hazardBodies = [];
    this.coinBodies = [];
    this.doorBodies = new Map();
    this.switchBodies = [];
    this.portals = [];
    this.goalBody = null;

    // Power-up states
    this.shieldActive = false;
    this.freezeActive = false;
    this.magnetActive = false;
    this.slowMoActive = false;

    this.ballsInGoal = new Set();
    this.isLevelEnded = false;
    this.timeInGoal = 0;
    this.lastTimestamp = 0;
  }

  init(level, selectedSkin = 'classic') {
    this.destroy();
    this.currentLevel = level;
    this.isLevelEnded = false;
    this.ballsInGoal.clear();
    this.timeInGoal = 0;

    // Create Matter Engine
    this.engine = Engine.create({
      gravity: {
        x: level.gravity ? level.gravity.x : 0,
        y: level.gravity ? level.gravity.y : 1,
        scale: 0.001
      }
    });
    this.world = this.engine.world;

    // World bounds (left, right, top - bottom is death/lava)
    const wallOpts = { isStatic: true, friction: 0.2, restitution: 0.4, render: { visible: false } };
    const leftWall = Bodies.rectangle(-15, 300, 30, 800, wallOpts);
    const rightWall = Bodies.rectangle(815, 300, 30, 800, wallOpts);
    const ceiling = Bodies.rectangle(400, -20, 900, 40, wallOpts);
    World.add(this.world, [leftWall, rightWall, ceiling]);

    // Build level platforms
    if (level.platforms) {
      level.platforms.forEach((p, idx) => {
        const body = Bodies.rectangle(p.x, p.y, p.width, p.height, {
          isStatic: true,
          angle: p.angle || 0,
          friction: 0.25,
          restitution: 0.35,
          label: 'platform'
        });
        World.add(this.world, body);

        if (p.moving) {
          this.movingPlatforms.push({
            body,
            originX: p.x,
            originY: p.y,
            axis: p.moving.axis,
            dist: p.moving.dist,
            speed: p.moving.speed,
            time: Math.random() * Math.PI * 2
          });
        }
      });
    }

    // Build doors & switches
    if (level.doors) {
      level.doors.forEach(d => {
        const doorBody = Bodies.rectangle(d.x, d.y, d.width, d.height, {
          isStatic: true,
          label: 'door',
          doorId: d.id,
          originX: d.x,
          originY: d.y,
          openOffsetY: d.openOffsetY || -120,
          isOpen: false
        });
        World.add(this.world, doorBody);
        this.doorBodies.set(d.id, doorBody);
      });
    }

    if (level.switches) {
      level.switches.forEach(sw => {
        const switchBody = Bodies.rectangle(sw.x, sw.y, sw.width, sw.height, {
          isStatic: true,
          isSensor: true,
          label: 'switch',
          targetDoorId: sw.targetDoorId,
          activated: false
        });
        World.add(this.world, switchBody);
        this.switchBodies.push(switchBody);
      });
    }

    // Build hazards (spikes, lava, saws, lasers)
    if (level.hazards) {
      level.hazards.forEach(h => {
        let hazardBody;
        if (h.type === 'saw') {
          hazardBody = Bodies.circle(h.x, h.y, h.radius || 30, {
            isStatic: true,
            isSensor: true,
            label: 'hazard_saw',
            hazardType: 'saw',
            radius: h.radius || 30
          });
          this.rotatingHazards.push({
            body: hazardBody,
            speed: h.rotating || 0.05,
            moving: h.moving ? {
              originX: h.x,
              originY: h.y,
              axis: h.moving.axis,
              dist: h.moving.dist,
              speed: h.moving.speed,
              time: 0
            } : null
          });
        } else {
          hazardBody = Bodies.rectangle(h.x, h.y, h.width || 60, h.height || 24, {
            isStatic: true,
            isSensor: true,
            label: 'hazard_' + h.type,
            hazardType: h.type
          });
        }
        World.add(this.world, hazardBody);
        this.hazardBodies.push(hazardBody);
      });
    }

    // Build Goal (Save Zone)
    if (level.goal) {
      this.goalBody = Bodies.circle(level.goal.x, level.goal.y, level.goal.radius || 42, {
        isStatic: true,
        isSensor: true,
        label: 'goal'
      });
      World.add(this.world, this.goalBody);
    }

    // Portals
    if (level.portals) {
      this.portals = level.portals.map(p => {
        const entryBody = Bodies.circle(p.entry.x, p.entry.y, p.entry.radius || 28, {
          isStatic: true,
          isSensor: true,
          label: 'portal_entry'
        });
        World.add(this.world, entryBody);
        return {
          entryBody,
          exit: p.exit,
          cooldown: 0
        };
      });
    }

    // Collectibles (Coins)
    if (level.collectibles) {
      level.collectibles.forEach((c, idx) => {
        const coinBody = Bodies.circle(c.x, c.y, c.radius || 12, {
          isStatic: true,
          isSensor: true,
          label: 'coin',
          coinIndex: idx
        });
        World.add(this.world, coinBody);
        this.coinBodies.push(coinBody);
      });
    }

    // Build Balls
    const ballConfigs = level.balls || [{ x: 140, y: 120, radius: 18 }];
    this.isBallReleased = false;
    this.ballBodies = ballConfigs.map((b, i) => {
      const ball = Bodies.circle(b.x, b.y, b.radius || 18, {
        restitution: 0.6,
        friction: 0.04,
        frictionStatic: 0,
        frictionAir: 0.001,
        density: 0.003,
        label: 'ball',
        ballIndex: i,
        skin: selectedSkin
      });
      ball.startX = b.x;
      ball.startY = b.y;
      ball.initVx = b.vx !== undefined ? b.vx : 2.2;
      ball.initVy = b.vy !== undefined ? b.vy : 0;
      ball.trail = [];
      ball.isSaved = false;
      World.add(this.world, ball);
      return ball;
    });

    // Collision listener
    this.setupCollisions();
  }

  releaseBalls() {
    if (this.isBallReleased || this.isLevelEnded) return;
    this.isBallReleased = true;
    this.ballBodies.forEach(ball => {
      Body.setVelocity(ball, { x: ball.initVx, y: ball.initVy });
      Body.setAngularVelocity(ball, ball.initVx * 0.04);
    });
    sound.playBounce(2);
  }

  setupCollisions() {
    Events.on(this.engine, 'collisionStart', event => {
      if (this.isLevelEnded) return;

      event.pairs.forEach(pair => {
        const { bodyA, bodyB } = pair;
        const ball = bodyA.label === 'ball' ? bodyA : bodyB.label === 'ball' ? bodyB : null;
        const other = ball ? (bodyA === ball ? bodyB : bodyA) : null;

        if (ball && other) {
          // 1. Hazard collision
          if (other.label && other.label.startsWith('hazard_')) {
            if (this.shieldActive) {
              this.shieldActive = false;
              sound.playShieldPop();
              // Bounce away safely
              Body.setVelocity(ball, { x: ball.velocity.x * -0.8, y: -8 });
              return;
            }
            this.handleFail(other.hazardType || 'hazard');
            return;
          }

          // 2. Coin pickup
          if (other.label === 'coin') {
            sound.playCoin();
            World.remove(this.world, other);
            this.coinBodies = this.coinBodies.filter(c => c !== other);
            if (this.onCoinCollect) this.onCoinCollect(other.coinIndex);
            return;
          }

          // 3. Switch trigger
          if (other.label === 'switch' && !other.activated) {
            other.activated = true;
            sound.playClick();
            const door = this.doorBodies.get(other.targetDoorId);
            if (door && !door.isOpen) {
              door.isOpen = true;
              Body.setPosition(door, {
                x: door.originX,
                y: door.originY + door.openOffsetY
              });
            }
            if (this.onSwitchTrigger) this.onSwitchTrigger(other.targetDoorId);
            return;
          }

          // 4. Portal entry
          if (other.label === 'portal_entry') {
            const portal = this.portals.find(p => p.entryBody === other);
            if (portal && portal.cooldown <= 0) {
              portal.cooldown = 35; // frames cooldown
              sound.playPortal();
              Body.setPosition(ball, { x: portal.exit.x, y: portal.exit.y });
              if (portal.exit.vx !== undefined || portal.exit.vy !== undefined) {
                Body.setVelocity(ball, {
                  x: portal.exit.vx !== undefined ? portal.exit.vx : ball.velocity.x,
                  y: portal.exit.vy !== undefined ? portal.exit.vy : ball.velocity.y
                });
              }
              if (this.onPortalTeleport) this.onPortalTeleport(portal.exit);
            }
            return;
          }

          // 5. Normal bounce sound on platforms/lines
          if (other.label === 'platform' || other.label === 'drawn_line') {
            const speed = Vector.magnitude(ball.velocity);
            if (speed > 1.5) {
              sound.playBounce(Math.min(speed, 10));
            }
          }
        }
      });
    });
  }

  // Add drawn lines to the physics world
  addDrawnStroke(points) {
    if (!points || points.length < 2) return null;

    const strokeBodies = [];
    const strokeThickness = 10;

    for (let i = 0; i < points.length - 1; i++) {
      const p1 = points[i];
      const p2 = points[i + 1];

      const dx = p2.x - p1.x;
      const dy = p2.y - p1.y;
      const length = Math.hypot(dx, dy);
      if (length < 3) continue;

      // Skip segments that are directly inside the ball center to prevent overlap impulse
      let insideBall = false;
      for (const b of this.ballBodies) {
        const r = b.circleRadius || 18;
        if (Math.hypot(p1.x - b.position.x, p1.y - b.position.y) < r * 0.85 &&
            Math.hypot(p2.x - b.position.x, p2.y - b.position.y) < r * 0.85) {
          insideBall = true;
          break;
        }
      }
      if (insideBall) continue;

      const angle = Math.atan2(dy, dx);
      const midX = (p1.x + p2.x) / 2;
      const midY = (p1.y + p2.y) / 2;

      const segment = Bodies.rectangle(midX, midY, length, strokeThickness, {
        isStatic: true,
        angle: angle,
        friction: 0.04,
        frictionStatic: 0,
        restitution: 0.35,
        label: 'drawn_line',
        render: { fillStyle: '#4dabf7' }
      });

      // Joint caps at vertices for smooth ball rolling without snagging corners
      const cap = Bodies.circle(p1.x, p1.y, strokeThickness / 2, {
        isStatic: true,
        friction: 0.04,
        frictionStatic: 0,
        restitution: 0.35,
        label: 'drawn_line'
      });

      strokeBodies.push(segment, cap);
    }

    if (points.length > 0) {
      const endPoint = points[points.length - 1];
      const endCap = Bodies.circle(endPoint.x, endPoint.y, strokeThickness / 2, {
        isStatic: true,
        friction: 0.04,
        frictionStatic: 0,
        restitution: 0.5,
        label: 'drawn_line'
      });
      strokeBodies.push(endCap);
    }

    if (strokeBodies.length > 0) {
      const composite = Composite.create();
      Composite.add(composite, strokeBodies);
      World.add(this.world, composite);
      this.drawnBodies.push(composite);

      // Automatically release ball when user finishes drawing their line!
      if (!this.isBallReleased) {
        this.releaseBalls();
      }

      return composite;
    }
    return null;
  }

  clearDrawnLines() {
    this.drawnBodies.forEach(composite => {
      Composite.allBodies(composite).forEach(b => World.remove(this.world, b));
      World.remove(this.world, composite);
    });
    this.drawnBodies = [];
  }

  // Power-up activation methods
  activateShield() {
    this.shieldActive = true;
    sound.playPowerup();
  }

  activateSlowMo() {
    this.slowMoActive = true;
    sound.playPowerup();
    if (this.engine) this.engine.timing.timeScale = 0.4;
    setTimeout(() => {
      this.slowMoActive = false;
      if (this.engine) this.engine.timing.timeScale = 1.0;
    }, 5000);
  }

  activateMagnet() {
    this.magnetActive = true;
    sound.playPowerup();
    setTimeout(() => {
      this.magnetActive = false;
    }, 4500);
  }

  activateFreeze() {
    this.freezeActive = true;
    sound.playPowerup();
    setTimeout(() => {
      this.freezeActive = false;
    }, 4000);
  }

  update(delta) {
    if (!this.engine || this.isLevelEnded) return;

    // If ball is not yet released, hold at start position
    if (!this.isBallReleased) {
      this.ballBodies.forEach(ball => {
        Body.setPosition(ball, { x: ball.startX, y: ball.startY });
        Body.setVelocity(ball, { x: 0, y: 0 });
      });
    }

    // Tick Matter engine
    Engine.update(this.engine, delta);

    // Update portal cooldowns
    this.portals.forEach(p => {
      if (p.cooldown > 0) p.cooldown--;
    });

    // Update moving platforms unless frozen
    if (!this.freezeActive) {
      this.movingPlatforms.forEach(mp => {
        mp.time += mp.speed;
        const offset = Math.sin(mp.time) * mp.dist;
        const newX = mp.axis === 'x' ? mp.originX + offset : mp.originX;
        const newY = mp.axis === 'y' ? mp.originY + offset : mp.originY;
        Body.setPosition(mp.body, { x: newX, y: newY });
      });

      // Update rotating hazards
      this.rotatingHazards.forEach(rh => {
        Body.setAngle(rh.body, rh.body.angle + rh.speed);
        if (rh.moving) {
          rh.moving.time += rh.moving.speed;
          const offset = Math.sin(rh.moving.time) * rh.moving.dist;
          const newX = rh.moving.axis === 'x' ? rh.moving.originX + offset : rh.moving.originX;
          const newY = rh.moving.axis === 'y' ? rh.moving.originY + offset : rh.moving.originY;
          Body.setPosition(rh.body, { x: newX, y: newY });
        }
      });
    }

    // Magnet power-up force calculation
    if (this.magnetActive && this.goalBody) {
      this.ballBodies.forEach(ball => {
        const diff = Vector.sub(this.goalBody.position, ball.position);
        const dist = Vector.magnitude(diff);
        if (dist > 10) {
          const forceDir = Vector.normalise(diff);
          const forceMag = Math.min(0.0015, 0.0006 * (500 / dist));
          Body.applyForce(ball, ball.position, Vector.mult(forceDir, forceMag));
        }
      });
    }

    // Ball checks & goal verification
    let allBallsInGoal = true;

    for (let i = 0; i < this.ballBodies.length; i++) {
      const ball = this.ballBodies[i];

      // Sanity check to prevent NaN
      if (isNaN(ball.position.x) || isNaN(ball.position.y)) {
        Body.setPosition(ball, { x: ball.startX, y: ball.startY });
        Body.setVelocity(ball, { x: ball.initVx, y: ball.initVy });
      }

      // Clamp max velocity to prevent tunneling or disappearing
      const maxSpeed = 15;
      const speed = Vector.magnitude(ball.velocity);
      if (speed > maxSpeed) {
        Body.setVelocity(ball, {
          x: (ball.velocity.x / speed) * maxSpeed,
          y: (ball.velocity.y / speed) * maxSpeed
        });
      }

      // Trail record
      if (!ball.trail) ball.trail = [];
      ball.trail.push({ x: ball.position.x, y: ball.position.y });
      if (ball.trail.length > 14) ball.trail.shift();

      // Check bounds: if ball falls off screen bottom (y > 660) -> fail
      if (ball.position.y > 660 || ball.position.x < -100 || ball.position.x > 900) {
        this.handleFail('void');
        return;
      }

      // Check distance to goal
      if (this.goalBody) {
        const goalPos = this.goalBody.position;
        const distToGoal = Math.hypot(ball.position.x - goalPos.x, ball.position.y - goalPos.y);
        const goalRadius = this.currentLevel.goal.radius || 42;

        if (distToGoal < goalRadius) {
          this.ballsInGoal.add(i);
        } else {
          this.ballsInGoal.delete(i);
          allBallsInGoal = false;
        }
      }
    }

    // If all balls are inside the goal zone, count up dwell time
    if (allBallsInGoal && this.ballBodies.length > 0 && this.ballsInGoal.size === this.ballBodies.length) {
      this.timeInGoal += delta;
      if (this.timeInGoal > 700) { // 0.7 second dwell time for decisive victory
        this.handleWin();
      }
    } else {
      this.timeInGoal = Math.max(0, this.timeInGoal - delta * 0.5);
    }
  }

  handleWin() {
    if (this.isLevelEnded) return;
    this.isLevelEnded = true;
    sound.playWin();
    if (this.onWin) this.onWin();
  }

  handleFail(cause = 'hazard') {
    if (this.isLevelEnded) return;
    this.isLevelEnded = true;
    sound.playFail();
    if (this.onFail) this.onFail(cause);
  }

  destroy() {
    if (this.engine) {
      Events.off(this.engine);
      World.clear(this.world);
      Engine.clear(this.engine);
      this.engine = null;
      this.world = null;
    }
    this.ballBodies = [];
    this.drawnBodies = [];
    this.movingPlatforms = [];
    this.rotatingHazards = [];
    this.hazardBodies = [];
    this.coinBodies = [];
    this.doorBodies.clear();
    this.switchBodies = [];
    this.portals = [];
    this.goalBody = null;
    this.ballsInGoal.clear();
    this.isLevelEnded = false;
  }
}
