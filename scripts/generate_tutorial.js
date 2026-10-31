import fs from 'fs';
import path from 'path';
import { spawn } from 'child_process';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const projectRoot = path.resolve(__dirname, '..');
const publicDir = path.resolve(projectRoot, 'public');

const WIDTH = 800;
const HEIGHT = 500;
const FPS = 30;
const DURATION_SEC = 15;
const TOTAL_FRAMES = FPS * DURATION_SEC; // 450 frames

// Simple software 2D canvas for fast pixel buffer generation
class SoftwareCanvas {
  constructor(w, h) {
    this.w = w;
    this.h = h;
    this.data = new Uint8Array(w * h * 4); // RGBA
  }

  clear(r, g, b) {
    const data = this.data;
    const len = data.length;
    for (let i = 0; i < len; i += 4) {
      data[i] = r;
      data[i + 1] = g;
      data[i + 2] = b;
      data[i + 3] = 255;
    }
  }

  setPixel(x, y, r, g, b, a = 1.0) {
    x = Math.round(x);
    y = Math.round(y);
    if (x < 0 || x >= this.w || y < 0 || y >= this.h) return;
    const idx = (y * this.w + x) * 4;
    if (a >= 0.99) {
      this.data[idx] = r;
      this.data[idx + 1] = g;
      this.data[idx + 2] = b;
      this.data[idx + 3] = 255;
    } else if (a > 0) {
      const inv = 1 - a;
      this.data[idx] = Math.round(r * a + this.data[idx] * inv);
      this.data[idx + 1] = Math.round(g * a + this.data[idx + 1] * inv);
      this.data[idx + 2] = Math.round(b * a + this.data[idx + 2] * inv);
      this.data[idx + 3] = 255;
    }
  }

  drawLinearGradient(x1, y1, x2, y2, stops) {
    // vertical gradient optimization
    if (x1 === x2) {
      for (let y = 0; y < this.h; y++) {
        const t = Math.max(0, Math.min(1, (y - y1) / (y2 - y1)));
        // interpolate stops
        let r = 0, g = 0, b = 0;
        for (let s = 0; s < stops.length - 1; s++) {
          if (t >= stops[s].pos && t <= stops[s + 1].pos) {
            const range = stops[s + 1].pos - stops[s].pos;
            const factor = range > 0 ? (t - stops[s].pos) / range : 0;
            r = stops[s].r + (stops[s + 1].r - stops[s].r) * factor;
            g = stops[s].g + (stops[s + 1].g - stops[s].g) * factor;
            b = stops[s].b + (stops[s + 1].b - stops[s].b) * factor;
            break;
          }
        }
        const rowStart = y * this.w * 4;
        const rowEnd = rowStart + this.w * 4;
        const ri = Math.round(r), gi = Math.round(g), bi = Math.round(b);
        for (let i = rowStart; i < rowEnd; i += 4) {
          this.data[i] = ri;
          this.data[i + 1] = gi;
          this.data[i + 2] = bi;
          this.data[i + 3] = 255;
        }
      }
    }
  }

  fillRect(x, y, w, h, r, g, b, a = 1.0) {
    const x0 = Math.max(0, Math.floor(x));
    const y0 = Math.max(0, Math.floor(y));
    const x1 = Math.min(this.w, Math.ceil(x + w));
    const y1 = Math.min(this.h, Math.ceil(y + h));
    for (let py = y0; py < y1; py++) {
      for (let px = x0; px < x1; px++) {
        this.setPixel(px, py, r, g, b, a);
      }
    }
  }

  fillCircle(cx, cy, radius, r, g, b, a = 1.0) {
    const r2 = radius * radius;
    const x0 = Math.max(0, Math.floor(cx - radius));
    const y0 = Math.max(0, Math.floor(cy - radius));
    const x1 = Math.min(this.w, Math.ceil(cx + radius));
    const y1 = Math.min(this.h, Math.ceil(cy + radius));
    for (let py = y0; py < y1; py++) {
      const dy = py - cy;
      const dy2 = dy * dy;
      for (let px = x0; px < x1; px++) {
        const dx = px - cx;
        const d2 = dx * dx + dy2;
        if (d2 <= r2) {
          // Antialias boundary
          const dist = Math.sqrt(d2);
          const edgeAlpha = dist > radius - 1 ? (radius - dist) : 1.0;
          this.setPixel(px, py, r, g, b, a * Math.max(0, edgeAlpha));
        }
      }
    }
  }

  strokeCircle(cx, cy, radius, strokeW, r, g, b, a = 1.0) {
    const innerR = radius - strokeW / 2;
    const outerR = radius + strokeW / 2;
    const in2 = innerR * innerR;
    const out2 = outerR * outerR;
    const x0 = Math.max(0, Math.floor(cx - outerR));
    const y0 = Math.max(0, Math.floor(cy - outerR));
    const x1 = Math.min(this.w, Math.ceil(cx + outerR));
    const y1 = Math.min(this.h, Math.ceil(cy + outerR));
    for (let py = y0; py < y1; py++) {
      const dy = py - cy;
      const dy2 = dy * dy;
      for (let px = x0; px < x1; px++) {
        const dx = px - cx;
        const d2 = dx * dx + dy2;
        if (d2 >= in2 && d2 <= out2) {
          this.setPixel(px, py, r, g, b, a);
        }
      }
    }
  }

  fillEllipse(cx, cy, rx, ry, r, g, b, a = 1.0) {
    const x0 = Math.max(0, Math.floor(cx - rx));
    const y0 = Math.max(0, Math.floor(cy - ry));
    const x1 = Math.min(this.w, Math.ceil(cx + rx));
    const y1 = Math.min(this.h, Math.ceil(cy + ry));
    const rx2 = rx * rx;
    const ry2 = ry * ry;
    for (let py = y0; py < y1; py++) {
      const dy = py - cy;
      const dyTerm = (dy * dy) / ry2;
      for (let px = x0; px < x1; px++) {
        const dx = px - cx;
        if ((dx * dx) / rx2 + dyTerm <= 1.0) {
          this.setPixel(px, py, r, g, b, a);
        }
      }
    }
  }

  fillTriangle(x1, y1, x2, y2, x3, y3, r, g, b, a = 1.0) {
    const minX = Math.max(0, Math.floor(Math.min(x1, x2, x3)));
    const maxX = Math.min(this.w - 1, Math.ceil(Math.max(x1, x2, x3)));
    const minY = Math.max(0, Math.floor(Math.min(y1, y2, y3)));
    const maxY = Math.min(this.h - 1, Math.ceil(Math.max(y1, y2, y3)));

    const area = 0.5 * (-y2 * x3 + y1 * (-x2 + x3) + x1 * (y2 - y3) + x2 * y3);
    if (Math.abs(area) < 0.001) return;

    for (let y = minY; y <= maxY; y++) {
      for (let x = minX; x <= maxX; x++) {
        const s = 1 / (2 * area) * (y1 * x3 - x1 * y3 + (y3 - y1) * x + (x1 - x3) * y);
        const t = 1 / (2 * area) * (x1 * y2 - y1 * x2 + (y1 - y2) * x + (x2 - x1) * y);
        if (s >= 0 && t >= 0 && (1 - s - t) >= 0) {
          this.setPixel(x, y, r, g, b, a);
        }
      }
    }
  }

  drawLine(x0, y0, x1, y1, width, r, g, b, a = 1.0) {
    const dx = x1 - x0;
    const dy = y1 - y0;
    const len = Math.hypot(dx, dy);
    if (len === 0) return;
    const steps = Math.ceil(len * 1.5);
    const radius = width / 2;
    for (let i = 0; i <= steps; i++) {
      const t = i / steps;
      const px = x0 + dx * t;
      const py = y0 + dy * t;
      this.fillCircle(px, py, radius, r, g, b, a);
    }
  }

  fillRoundedRect(x, y, w, h, radius, r, g, b, a = 1.0) {
    this.fillRect(x + radius, y, w - radius * 2, h, r, g, b, a);
    this.fillRect(x, y + radius, radius, h - radius * 2, r, g, b, a);
    this.fillRect(x + w - radius, y + radius, radius, h - radius * 2, r, g, b, a);
    this.fillCircle(x + radius, y + radius, radius, r, g, b, a);
    this.fillCircle(x + w - radius, y + radius, radius, r, g, b, a);
    this.fillCircle(x + radius, y + h - radius, radius, r, g, b, a);
    this.fillCircle(x + w - radius, y + h - radius, radius, r, g, b, a);
  }

  // Draw simple 5x7 bitmap characters for crisp text without external fonts
  drawChar(c, x, y, scale = 2, r = 255, g = 255, b = 255) {
    const glyphs = {
      ' ': [],
      'A': [0x7C, 0x12, 0x11, 0x12, 0x7C],
      'B': [0x7F, 0x49, 0x49, 0x49, 0x36],
      'C': [0x3E, 0x41, 0x41, 0x41, 0x22],
      'D': [0x7F, 0x41, 0x41, 0x22, 0x1C],
      'E': [0x7F, 0x49, 0x49, 0x49, 0x41],
      'F': [0x7F, 0x09, 0x09, 0x09, 0x01],
      'G': [0x3E, 0x41, 0x49, 0x49, 0x7A],
      'H': [0x7F, 0x08, 0x08, 0x08, 0x7F],
      'I': [0x00, 0x41, 0x7F, 0x41, 0x00],
      'J': [0x20, 0x40, 0x41, 0x3F, 0x01],
      'K': [0x7F, 0x08, 0x14, 0x22, 0x41],
      'L': [0x7F, 0x40, 0x40, 0x40, 0x40],
      'M': [0x7F, 0x02, 0x0C, 0x02, 0x7F],
      'N': [0x7F, 0x04, 0x08, 0x10, 0x7F],
      'O': [0x3E, 0x41, 0x41, 0x41, 0x3E],
      'P': [0x7F, 0x09, 0x09, 0x09, 0x06],
      'Q': [0x3E, 0x41, 0x51, 0x21, 0x5E],
      'R': [0x7F, 0x09, 0x19, 0x29, 0x46],
      'S': [0x46, 0x49, 0x49, 0x49, 0x31],
      'T': [0x01, 0x01, 0x7F, 0x01, 0x01],
      'U': [0x3F, 0x40, 0x40, 0x40, 0x3F],
      'V': [0x1F, 0x20, 0x40, 0x20, 0x1F],
      'W': [0x7F, 0x20, 0x18, 0x20, 0x7F],
      'X': [0x63, 0x14, 0x08, 0x14, 0x63],
      'Y': [0x07, 0x08, 0x70, 0x08, 0x07],
      'Z': [0x61, 0x51, 0x49, 0x45, 0x43],
      '!': [0x00, 0x00, 0x5F, 0x00, 0x00],
      '?': [0x02, 0x01, 0x51, 0x09, 0x06],
      '.': [0x00, 0x60, 0x60, 0x00, 0x00],
      ':': [0x00, 0x36, 0x36, 0x00, 0x00],
      '-': [0x08, 0x08, 0x08, 0x08, 0x08],
      '\'': [0x00, 0x05, 0x03, 0x00, 0x00],
      '1': [0x00, 0x42, 0x7F, 0x40, 0x00],
      '2': [0x42, 0x61, 0x51, 0x49, 0x46],
      '3': [0x21, 0x41, 0x45, 0x4B, 0x31],
      '4': [0x18, 0x14, 0x12, 0x7F, 0x10],
      '5': [0x27, 0x45, 0x45, 0x45, 0x39],
      '0': [0x3E, 0x51, 0x49, 0x45, 0x3E]
    };

    const cols = glyphs[c.toUpperCase()] || glyphs['?'];
    for (let col = 0; col < 5; col++) {
      const bits = cols[col];
      for (let row = 0; row < 7; row++) {
        if ((bits >> row) & 1) {
          this.fillRect(x + col * scale, y + row * scale, scale, scale, r, g, b);
        }
      }
    }
    return 6 * scale;
  }

  drawText(text, x, y, scale = 2, r = 255, g = 255, b = 255) {
    let curX = x;
    for (let i = 0; i < text.length; i++) {
      curX += this.drawChar(text[i], curX, y, scale, r, g, b);
    }
  }

  getTextWidth(text, scale = 2) {
    return text.length * 6 * scale;
  }

  toPPMBuffer() {
    const header = `P6\n${this.w} ${this.h}\n255\n`;
    const headerBuf = Buffer.from(header, 'ascii');
    const rgbBuf = Buffer.alloc(this.w * this.h * 3);
    const data = this.data;
    let rgbIdx = 0;
    const len = data.length;
    for (let i = 0; i < len; i += 4) {
      rgbBuf[rgbIdx++] = data[i];
      rgbBuf[rgbIdx++] = data[i + 1];
      rgbBuf[rgbIdx++] = data[i + 2];
    }
    return Buffer.concat([headerBuf, rgbBuf]);
  }
}

// Generate the 15-second simulation
console.log('Generating 15-second tutorial gameplay video frames...');

const canvas = new SoftwareCanvas(WIDTH, HEIGHT);

// Render background (Level 1 Green Valley)
function drawWorldBackground(t) {
  // Sunny sky
  canvas.drawLinearGradient(0, 0, 0, HEIGHT, [
    { pos: 0, r: 86, g: 204, b: 242 },
    { pos: 0.65, r: 224, g: 247, b: 250 },
    { pos: 1.0, r: 200, g: 230, b: 201 }
  ]);

  // Distant Mountain
  canvas.fillTriangle(0, HEIGHT, 160, 290, 340, HEIGHT, 168, 218, 220);

  // Rolling hills back
  canvas.fillEllipse(250, HEIGHT + 80, 480, 260, 129, 199, 132);

  // Rolling hill front
  canvas.fillEllipse(650, HEIGHT + 100, 520, 280, 102, 187, 106);

  // Clouds
  const c1x = 120 + Math.sin(t * 0.5) * 20;
  canvas.fillCircle(c1x, 70, 26, 255, 255, 255, 0.9);
  canvas.fillCircle(c1x + 22, 65, 34, 255, 255, 255, 0.9);
  canvas.fillCircle(c1x + 50, 72, 24, 255, 255, 255, 0.9);

  const c2x = 620 + Math.sin(t * 0.4 + 2) * 25;
  canvas.fillCircle(c2x, 90, 28, 255, 255, 255, 0.85);
  canvas.fillCircle(c2x + 26, 84, 38, 255, 255, 255, 0.85);
  canvas.fillCircle(c2x + 58, 92, 26, 255, 255, 255, 0.85);
}

// Draw static platforms
function drawPlatforms() {
  // Left platform cliff
  canvas.fillRoundedRect(40, 175, 170, 24, 6, 73, 80, 87);
  canvas.fillRect(40, 175, 170, 6, 43, 138, 62); // Green grass strip

  // Right platform cliff
  canvas.fillRoundedRect(600, 435, 170, 26, 6, 73, 80, 87);
  canvas.fillRect(600, 435, 170, 6, 43, 138, 62);
}

// Draw dangerous bottom spikes
function drawSpikes(t) {
  const spikeStartX = 100;
  const spikeEndX = 590;
  const spikeY = 485;
  const spikeH = 28;
  const numSpikes = 26;
  const w = (spikeEndX - spikeStartX) / numSpikes;

  for (let i = 0; i < numSpikes; i++) {
    const sx = spikeStartX + i * w;
    // Dark red spike with glow
    canvas.fillTriangle(sx, spikeY, sx + w / 2, spikeY - spikeH, sx + w, spikeY, 224, 49, 49);
    // Inner fiery highlight
    canvas.fillTriangle(sx + w * 0.25, spikeY, sx + w / 2, spikeY - spikeH * 0.85, sx + w * 0.75, spikeY, 255, 146, 43);
  }

  // Spikes base plate
  canvas.fillRect(spikeStartX - 10, spikeY - 2, (spikeEndX - spikeStartX) + 20, 20, 130, 0, 0);
}

// Draw Save Zone (Goal)
function drawGoal(t) {
  const gx = 680;
  const gy = 385;
  const radius = 44;

  // Pulsing energy rings
  const p1 = (t * 30) % (radius * 1.3);
  const p2 = ((t * 30) + radius * 0.65) % (radius * 1.3);
  canvas.strokeCircle(gx, gy, radius + p1, 3, 64, 192, 87, 0.4);
  canvas.strokeCircle(gx, gy, radius + p2, 3, 81, 207, 102, 0.35);

  // Core glowing circle
  canvas.fillCircle(gx, gy, radius, 81, 207, 102, 0.85);
  canvas.fillCircle(gx, gy, radius * 0.75, 211, 249, 216, 0.95);

  // SAVE ZONE label
  const txt1 = "SAVE";
  const w1 = canvas.getTextWidth(txt1, 2);
  canvas.drawText(txt1, gx - w1 / 2, gy - 12, 2, 43, 138, 62);

  const txt2 = "ZONE";
  const w2 = canvas.getTextWidth(txt2, 1);
  canvas.drawText(txt2, gx - w2 / 2, gy + 8, 1, 43, 138, 62);
}

// Draw Ball
function drawBall(x, y, radius, isScared, isHappy, t, vx = 0, vy = 0) {
  // Ball shadow
  canvas.fillCircle(x + 2, y + 4, radius, 0, 0, 0, 0.2);

  // Main vibrant yellow/orange ball
  canvas.fillCircle(x, y, radius, 255, 212, 59);
  canvas.fillCircle(x - radius * 0.2, y - radius * 0.2, radius * 0.75, 255, 243, 191);

  // Specular shine
  canvas.fillCircle(x - radius * 0.35, y - radius * 0.35, radius * 0.25, 255, 255, 255, 0.95);

  // Face
  const eyeOffsetY = -2;
  if (isHappy) {
    // Starry/Smiling closed eyes: ^ ^
    canvas.drawLine(x - 9, y + eyeOffsetY + 2, x - 5, y + eyeOffsetY - 3, 2, 33, 37, 41);
    canvas.drawLine(x - 5, y + eyeOffsetY - 3, x - 1, y + eyeOffsetY + 2, 2, 33, 37, 41);

    canvas.drawLine(x + 2, y + eyeOffsetY + 2, x + 6, y + eyeOffsetY - 3, 2, 33, 37, 41);
    canvas.drawLine(x + 6, y + eyeOffsetY - 3, x + 10, y + eyeOffsetY + 2, 2, 33, 37, 41);

    // Big happy open smile
    canvas.fillCircle(x + 2, y + 6, 5, 224, 49, 49);
    canvas.fillCircle(x + 2, y + 4, 3, 255, 168, 168);

    // Cute blush
    canvas.fillCircle(x - 9, y + 6, 3, 255, 107, 107, 0.6);
    canvas.fillCircle(x + 12, y + 6, 3, 255, 107, 107, 0.6);
  } else if (isScared) {
    // Big wide trembling eyes
    canvas.fillCircle(x - 6, y + eyeOffsetY, 5, 255, 255, 255);
    canvas.fillCircle(x - 6, y + eyeOffsetY + 1, 2.5, 33, 37, 41);

    canvas.fillCircle(x + 6, y + eyeOffsetY, 5, 255, 255, 255);
    canvas.fillCircle(x + 6, y + eyeOffsetY + 1, 2.5, 33, 37, 41);

    // Scared 'O' mouth
    canvas.strokeCircle(x, y + 7, 4, 2, 33, 37, 41);

    // Sweat drop
    canvas.fillCircle(x + radius * 0.7, y - radius * 0.5, 3, 77, 171, 247);
  } else {
    // Normal cute smiling face
    canvas.fillCircle(x - 6, y + eyeOffsetY, 4, 33, 37, 41);
    canvas.fillCircle(x - 7, y + eyeOffsetY - 1, 1.5, 255, 255, 255);

    canvas.fillCircle(x + 6, y + eyeOffsetY, 4, 33, 37, 41);
    canvas.fillCircle(x + 5, y + eyeOffsetY - 1, 1.5, 255, 255, 255);

    // Gentle smile
    canvas.fillCircle(x, y + 5, 3, 33, 37, 41);
    canvas.fillCircle(x, y + 4, 3, 255, 212, 59); // carve out top to make smile curve
  }
}

// Draw glowing cyan line
function drawCyanLine(points, glow = true) {
  if (!points || points.length < 2) return;
  for (let i = 0; i < points.length - 1; i++) {
    const p1 = points[i];
    const p2 = points[i + 1];
    if (glow) {
      // Outer cyan aura
      canvas.drawLine(p1.x, p1.y, p2.x, p2.y, 14, 56, 217, 169, 0.3);
      canvas.drawLine(p1.x, p1.y, p2.x, p2.y, 10, 34, 184, 207, 0.5);
    }
    // Solid core line
    canvas.drawLine(p1.x, p1.y, p2.x, p2.y, 6, 227, 250, 252, 0.95);
  }
}

// Draw finger/cursor pointer
function drawCursor(x, y) {
  // Shadow
  canvas.fillCircle(x + 3, y + 3, 14, 0, 0, 0, 0.25);

  // White hand / arrow cursor
  canvas.fillCircle(x, y, 12, 255, 255, 255, 0.95);
  canvas.strokeCircle(x, y, 12, 2.5, 34, 184, 207, 1.0);

  // Pointer tip
  canvas.fillTriangle(x - 4, y + 14, x, y - 8, x + 8, y + 4, 255, 255, 255);
  canvas.fillCircle(x, y - 8, 4, 34, 184, 207);

  // Sparkles from pen
  canvas.fillCircle(x - 12, y - 10, 2, 255, 212, 59);
  canvas.fillCircle(x + 10, y - 14, 2, 56, 217, 169);
}

// Draw dynamic particles / confetti
const confettiParticles = [];
for (let i = 0; i < 70; i++) {
  const angle = (i / 70) * Math.PI * 2 + Math.random() * 0.3;
  const speed = 2 + Math.random() * 5.5;
  confettiParticles.push({
    vx: Math.cos(angle) * speed,
    vy: Math.sin(angle) * speed - 1.5,
    r: [255, 56, 255, 77, 255][i % 5],
    g: [212, 217, 107, 171, 146][i % 5],
    b: [59, 169, 107, 247, 43][i % 5],
    size: 3 + Math.random() * 4
  });
}

function drawConfetti(gx, gy, progress) {
  for (let i = 0; i < confettiParticles.length; i++) {
    const p = confettiParticles[i];
    const px = gx + p.vx * progress * 40;
    const py = gy + p.vy * progress * 40 + (progress * progress * 35); // gravity
    canvas.fillCircle(px, py, p.size, p.r, p.g, p.b, 1.0 - progress * 0.5);
  }
}

// Subtitle Overlay Banner (at bottom of canvas)
function drawSubtitleBanner(text, phaseNum) {
  // Dark navy frosted bar
  canvas.fillRoundedRect(40, HEIGHT - 68, WIDTH - 80, 52, 14, 11, 15, 25, 0.92);
  // Cyan glowing border
  canvas.strokeCircle(50, HEIGHT - 42, 6, 2, 56, 217, 169, 0.8);
  canvas.strokeCircle(WIDTH - 50, HEIGHT - 42, 6, 2, 56, 217, 169, 0.8);

  // Step indicator
  const stepText = `STEP ${phaseNum}/5`;
  canvas.drawText(stepText, 64, HEIGHT - 52, 1, 56, 217, 169);

  // Main text
  const w = canvas.getTextWidth(text, 2);
  const startX = Math.max(64, (WIDTH - w) / 2);
  canvas.drawText(text, startX, HEIGHT - 38, 2, 255, 255, 255);
}

// Top Brand Badge
function drawHeaderBadge() {
  canvas.fillRoundedRect(WIDTH / 2 - 130, 16, 260, 32, 10, 15, 23, 42, 0.85);
  const title = "SAVE THE BALL! TUTORIAL";
  const tw = canvas.getTextWidth(title, 1.5);
  canvas.drawText(title, (WIDTH - tw) / 2, 24, 1.5, 255, 212, 59);
}

// Synthesize a 15-second PCM WAV audio track with sound effects for the 5 phases
function generateTutorialAudioWav() {
  const sampleRate = 44100;
  const numSamples = sampleRate * DURATION_SEC;
  const numChannels = 2; // stereo
  const byteRate = sampleRate * numChannels * 2;
  const blockAlign = numChannels * 2;
  const dataSize = numSamples * blockAlign;
  const buffer = Buffer.alloc(44 + dataSize);

  // RIFF header
  buffer.write('RIFF', 0);
  buffer.writeUInt32LE(36 + dataSize, 4);
  buffer.write('WAVE', 8);
  buffer.write('fmt ', 12);
  buffer.writeUInt32LE(16, 16); // Subchunk1Size (16 for PCM)
  buffer.writeUInt16LE(1, 20); // AudioFormat (1 for PCM)
  buffer.writeUInt16LE(numChannels, 22);
  buffer.writeUInt32LE(sampleRate, 24);
  buffer.writeUInt32LE(byteRate, 28);
  buffer.writeUInt16LE(blockAlign, 32);
  buffer.writeUInt16LE(16, 34); // BitsPerSample
  buffer.write('data', 36);
  buffer.writeUInt32LE(dataSize, 40);

  let offset = 44;
  for (let i = 0; i < numSamples; i++) {
    const t = i / sampleRate;
    let sample = 0;

    if (t < 3.0) {
      // 0-3s: Gentle dramatic falling whoosh & soft warning pulses
      const pulse = Math.sin(2 * Math.PI * 3 * t);
      const tone = Math.sin(2 * Math.PI * (350 - t * 40) * t);
      sample = 0.15 * tone * (0.5 + 0.5 * pulse);
    } else if (t < 6.0) {
      // 3-6s: Pencil drawing scribble sound (brush texture + high gentle chime)
      const st = t - 3.0;
      const noise = (Math.random() * 2 - 1) * 0.08;
      const tone = Math.sin(2 * Math.PI * (700 + Math.sin(st * 25) * 150) * t) * 0.08;
      sample = (noise + tone) * Math.min(1.0, st * 3);
    } else if (t < 9.0) {
      // 6-9s: Bouncy boing sound at bounce impact (t = 6.4s) & cute chime
      const st = t - 6.0;
      if (st >= 0.35 && st < 1.4) {
        const decay = Math.exp(-(st - 0.35) * 5);
        const freq = 320 + Math.sin((st - 0.35) * 40) * 180;
        sample = 0.35 * Math.sin(2 * Math.PI * freq * t) * decay;
      } else {
        sample = 0.08 * Math.sin(2 * Math.PI * 523.25 * t);
      }
    } else if (t < 12.0) {
      // 9-12s: Rolling melody chord (C - E - G)
      const st = t - 9.0;
      const note = Math.floor(st * 4) % 3;
      const freq = [523.25, 659.25, 783.99][note];
      const env = 1.0 - ((st * 4) % 1);
      sample = 0.18 * Math.sin(2 * Math.PI * freq * t) * env;
    } else {
      // 12-15s: Victory celebration fanfare!
      const st = t - 12.0;
      const fanfareFreqs = [523.25, 659.25, 783.99, 1046.5];
      const noteIdx = Math.min(3, Math.floor(st * 3));
      const freq = fanfareFreqs[noteIdx];
      const decay = Math.exp(-st * 0.8);
      sample = 0.28 * Math.sin(2 * Math.PI * freq * t) * decay;
    }

    // Clamp 16-bit PCM (-32768 to 32767)
    const val = Math.max(-32767, Math.min(32767, Math.round(sample * 32767)));
    buffer.writeInt16LE(val, offset);
    buffer.writeInt16LE(val, offset + 2); // stereo
    offset += 4;
  }

  return buffer;
}

// Main generation pipeline
async function renderAll() {
  const mp4Path = path.join(publicDir, 'tutorial.mp4');
  const webmPath = path.join(publicDir, 'tutorial.webm');
  const posterPath = path.join(publicDir, 'tutorial-poster.jpg');
  const tempWavPath = path.join(publicDir, 'temp_audio.wav');

  console.log('Generating synchronized 15-second WAV audio track...');
  const wavBuffer = generateTutorialAudioWav();
  fs.writeFileSync(tempWavPath, wavBuffer);

  // Spawn ffmpeg child process to encode MP4
  console.log('Spawning ffmpeg to generate MP4 with synchronized audio...');
  const ffmpegMp4 = spawn('ffmpeg', [
    '-y',
    '-f', 'image2pipe',
    '-vcodec', 'ppm',
    '-r', FPS.toString(),
    '-i', '-',
    '-i', tempWavPath,
    '-c:v', 'libx264',
    '-pix_fmt', 'yuv420p',
    '-preset', 'fast',
    '-crf', '24',
    '-movflags', '+faststart',
    '-c:a', 'aac',
    '-b:a', '96k',
    '-shortest',
    mp4Path
  ]);

  ffmpegMp4.stderr.on('data', d => console.log('ffmpeg:', d.toString().trim()));

  let posterBufferSaved = false;

  // Keyframe points for the drawn protective cyan line
  const drawnLineFull = [
    { x: 195, y: 340 },
    { x: 250, y: 355 },
    { x: 310, y: 375 },
    { x: 380, y: 395 },
    { x: 460, y: 415 },
    { x: 540, y: 428 },
    { x: 615, y: 435 }
  ];

  // Feed frames
  for (let frame = 0; frame < TOTAL_FRAMES; frame++) {
    const t = frame / FPS; // 0.0 to 15.0

    // 1. Draw World Background
    drawWorldBackground(t);

    // 2. Draw Platforms & Level Elements
    drawPlatforms();
    drawSpikes(t);
    drawGoal(t);

    // 3. Storyboard Logic across 5 phases
    if (frame < 90) {
      // PHASE 1 (0-3s): Ball falling toward dangerous spikes
      // Subtitle: "Your ball is in danger!"
      const p = frame / 90; // 0 to 1
      // Ball rolls off cliff (140, 150) and drops towards (210, 430)
      const bx = 140 + p * 80;
      const by = 150 + (p * p) * 270; // accelerating gravity drop

      // Danger pulse on spikes
      const warnAlpha = 0.3 + 0.3 * Math.sin(t * 12);
      canvas.fillRoundedRect(160, 440, 320, 30, 8, 224, 49, 49, warnAlpha);
      const warnTxt = "DANGER!";
      const ww = canvas.getTextWidth(warnTxt, 1.5);
      canvas.drawText(warnTxt, (WIDTH - ww) / 2, 446, 1.5, 255, 255, 255);

      drawBall(bx, by, 20, true, false, t, 1, 6);
      drawSubtitleBanner("YOUR BALL IS IN DANGER!", 1);
    } else if (frame < 180) {
      // PHASE 2 (3-6s): Drawing a protective line
      // Subtitle: "Draw a line to protect it!"
      const p = (frame - 90) / 90; // 0 to 1
      // Ball is frozen in air at (220, 310) with slow float
      const bx = 220;
      const by = 310 + Math.sin(t * 4) * 3;

      // Draw partial cyan line based on progress p
      const visibleCount = Math.max(2, Math.floor(drawnLineFull.length * p));
      const partialLine = drawnLineFull.slice(0, visibleCount);
      drawCyanLine(partialLine, true);

      // Pointer cursor moves along line
      const currPt = partialLine[partialLine.length - 1];
      drawCursor(currPt.x, currPt.y);

      // Ball looks down with anticipation
      drawBall(bx, by, 20, true, false, t, 0, 0);
      drawSubtitleBanner("DRAW A LINE TO PROTECT IT!", 2);
    } else if (frame < 270) {
      // PHASE 3 (6-9s): Ball bouncing safely on the drawn line
      // Subtitle: "Use physics to guide the ball!"
      const p = (frame - 180) / 90; // 0 to 1

      // Fully drawn cyan line
      drawCyanLine(drawnLineFull, true);

      // Ball drops onto line at (250, 355), squashes, bounces up to (330, 290), lands at (390, 400)
      let bx, by;
      if (p < 0.4) {
        // Drop to line
        const subP = p / 0.4;
        bx = 220 + subP * 30;
        by = 310 + subP * 45;
      } else if (p < 0.8) {
        // Bounce arc!
        const subP = (p - 0.4) / 0.4;
        bx = 250 + subP * 90;
        const arc = Math.sin(subP * Math.PI) * 65;
        by = 355 + subP * 40 - arc;
      } else {
        // Rolling contact
        const subP = (p - 0.8) / 0.2;
        bx = 340 + subP * 70;
        by = 395 + subP * 15;
      }

      // Sparkles at bounce point
      if (p >= 0.35 && p <= 0.6) {
        canvas.fillCircle(250, 360, 16, 255, 212, 59, 0.4);
        canvas.fillCircle(250, 360, 8, 255, 255, 255, 0.9);
      }

      drawBall(bx, by, 20, false, false, t, 3, -1);
      drawSubtitleBanner("USE PHYSICS TO GUIDE THE BALL!", 3);
    } else if (frame < 360) {
      // PHASE 4 (9-12s): Ball moving toward the green safe zone
      // Subtitle: "Reach the SAVE ZONE!"
      const p = (frame - 270) / 90; // 0 to 1

      drawCyanLine(drawnLineFull, true);

      // Ball rolls off line (410, 410) down to (610, 435) towards the Save Zone (680, 385)
      const bx = 410 + p * 240;
      const by = 410 + p * 20 - Math.sin(p * Math.PI) * 15;

      // Rainbow trail behind ball
      canvas.fillCircle(bx - 14, by + 1, 8, 255, 107, 107, 0.4);
      canvas.fillCircle(bx - 26, by + 2, 6, 255, 212, 59, 0.3);
      canvas.fillCircle(bx - 38, by + 3, 4, 56, 217, 169, 0.2);

      drawBall(bx, by, 20, false, false, t, 4, 1);
      drawSubtitleBanner("REACH THE SAVE ZONE!", 4);
    } else {
      // PHASE 5 (12-15s): Ball safely entering the goal with a victory animation
      // Subtitle: "SAVE THE BALL! YOU GOT THIS!"
      const p = (frame - 360) / 90; // 0 to 1

      drawCyanLine(drawnLineFull, true);

      // Ball enters center of goal (680, 385) and celebrates!
      const bx = 650 + Math.min(1.0, p * 2) * 30;
      const jumpY = Math.abs(Math.sin(p * Math.PI * 4)) * 24;
      const by = 385 - jumpY;

      // Confetti burst
      drawConfetti(680, 385, p);

      // Star-eyed happy ball!
      drawBall(bx, by, 22, false, true, t, 0, 0);

      // Golden Victory Banner
      canvas.fillRoundedRect(WIDTH / 2 - 180, 120, 360, 46, 12, 11, 15, 25, 0.95);
      canvas.strokeCircle(WIDTH / 2 - 160, 143, 8, 2, 255, 212, 59);
      canvas.strokeCircle(WIDTH / 2 + 160, 143, 8, 2, 255, 212, 59);
      const vicTitle = "LEVEL COMPLETE!";
      const vtw = canvas.getTextWidth(vicTitle, 2);
      canvas.drawText(vicTitle, (WIDTH - vtw) / 2, 134, 2, 255, 212, 59);

      drawSubtitleBanner("SAVE THE BALL! YOU GOT THIS!", 5);
    }

    // Top Header Badge
    drawHeaderBadge();

    // Export frame as PPM to ffmpeg
    const ppmBuf = canvas.toPPMBuffer();
    ffmpegMp4.stdin.write(ppmBuf);

    // Save frame 200 (Phase 3 bounce) as poster image
    if (frame === 200 && !posterBufferSaved) {
      posterBufferSaved = true;
      const tempPpmPath = path.join(publicDir, 'temp_poster.ppm');
      fs.writeFileSync(tempPpmPath, ppmBuf);
      console.log('Saved poster frame PPM. Converting to JPEG...');
    }
  }

  ffmpegMp4.stdin.end();

  await new Promise((resolve, reject) => {
    ffmpegMp4.on('close', code => {
      if (code === 0) {
        console.log(`Successfully generated MP4 video at: ${mp4Path}`);
        resolve();
      } else {
        reject(new Error(`ffmpeg MP4 exited with code ${code}`));
      }
    });
    ffmpegMp4.on('error', reject);
  });

  // Convert poster frame to JPEG
  const tempPpmPath = path.join(publicDir, 'temp_poster.ppm');
  if (fs.existsSync(tempPpmPath)) {
    const posterConv = spawn('ffmpeg', [
      '-y',
      '-i', tempPpmPath,
      '-q:v', '2',
      posterPath
    ]);
    await new Promise(res => posterConv.on('close', () => {
      try { fs.unlinkSync(tempPpmPath); } catch (e) {}
      console.log(`Poster image created at: ${posterPath}`);
      res();
    }));
  }

  // Convert MP4 to WebM for maximum cross-browser web compatibility
  console.log('Generating WebM version...');
  const webmConv = spawn('ffmpeg', [
    '-y',
    '-i', mp4Path,
    '-c:v', 'libvpx-vp9',
    '-b:v', '500k',
    '-crf', '30',
    '-c:a', 'libopus',
    '-b:a', '64k',
    webmPath
  ]);
  await new Promise(res => webmConv.on('close', code => {
    console.log(`WebM video generated (code ${code}) at: ${webmPath}`);
    res();
  }));

  console.log('ALL TUTORIAL MEDIA GENERATED SUCCESSFULLY!');
}

renderAll().catch(err => {
  console.error('Error generating tutorial:', err);
  process.exit(1);
});
