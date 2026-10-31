import sound from '../utils/audio';

export class DrawingEngine {
  constructor({ canvas, onStrokeComplete, onInkUpdate, maxInk = 600 }) {
    this.canvas = canvas;
    this.onStrokeComplete = onStrokeComplete;
    this.onInkUpdate = onInkUpdate;
    this.maxInk = maxInk;
    this.usedInk = 0;

    this.isDrawing = false;
    this.currentPoints = [];
    this.allStrokes = [];
    this.soundThrottle = 0;

    this.handlePointerDown = this.handlePointerDown.bind(this);
    this.handlePointerMove = this.handlePointerMove.bind(this);
    this.handlePointerUp = this.handlePointerUp.bind(this);

    this.attachEvents();
  }

  attachEvents() {
    if (!this.canvas) return;
    this.canvas.addEventListener('pointerdown', this.handlePointerDown, { passive: false });
    window.addEventListener('pointermove', this.handlePointerMove, { passive: false });
    window.addEventListener('pointerup', this.handlePointerUp);
    window.addEventListener('pointercancel', this.handlePointerUp);
  }

  detachEvents() {
    if (!this.canvas) return;
    this.canvas.removeEventListener('pointerdown', this.handlePointerDown);
    window.removeEventListener('pointermove', this.handlePointerMove);
    window.removeEventListener('pointerup', this.handlePointerUp);
    window.removeEventListener('pointercancel', this.handlePointerUp);
  }

  setMaxInk(val) {
    this.maxInk = val;
    this.notifyInk();
  }

  addExtraInk(amount) {
    this.maxInk += amount;
    this.notifyInk();
  }

  reset() {
    this.isDrawing = false;
    this.currentPoints = [];
    this.allStrokes = [];
    this.usedInk = 0;
    this.notifyInk();
  }

  notifyInk() {
    if (this.onInkUpdate) {
      this.onInkUpdate({
        used: this.usedInk,
        max: this.maxInk,
        remaining: Math.max(0, this.maxInk - this.usedInk)
      });
    }
  }

  getCanvasPoint(e) {
    const rect = this.canvas.getBoundingClientRect();
    const scaleX = this.canvas.width / rect.width;
    const scaleY = this.canvas.height / rect.height;

    return {
      x: (e.clientX - rect.left) * scaleX,
      y: (e.clientY - rect.top) * scaleY
    };
  }

  handlePointerDown(e) {
    // Only primary button
    if (e.button !== 0 && e.pointerType === 'mouse') return;

    // Prevent scrolling on mobile
    e.preventDefault();

    if (this.usedInk >= this.maxInk) return;

    this.isDrawing = true;
    const pt = this.getCanvasPoint(e);
    this.currentPoints = [pt];
    sound.playDraw();
  }

  handlePointerMove(e) {
    if (!this.isDrawing) return;
    e.preventDefault();

    const pt = this.getCanvasPoint(e);
    const lastPt = this.currentPoints[this.currentPoints.length - 1];

    if (!lastPt) {
      this.currentPoints.push(pt);
      return;
    }

    const dist = Math.hypot(pt.x - lastPt.x, pt.y - lastPt.y);
    if (dist < 4) return; // ignore jitter

    // Check ink limit
    if (this.usedInk + dist > this.maxInk) {
      // Allow partial segment up to remaining ink
      const remaining = Math.max(0, this.maxInk - this.usedInk);
      if (remaining > 2) {
        const ratio = remaining / dist;
        const clampedPt = {
          x: lastPt.x + (pt.x - lastPt.x) * ratio,
          y: lastPt.y + (pt.y - lastPt.y) * ratio
        };
        this.currentPoints.push(clampedPt);
        this.usedInk = this.maxInk;
        this.notifyInk();
      }
      this.finishCurrentStroke();
      return;
    }

    this.usedInk += dist;
    this.currentPoints.push(pt);
    this.notifyInk();

    // Play subtle drawing sound periodically
    this.soundThrottle++;
    if (this.soundThrottle % 7 === 0) {
      sound.playDraw();
    }
  }

  handlePointerUp() {
    if (!this.isDrawing) return;
    this.finishCurrentStroke();
  }

  finishCurrentStroke() {
    this.isDrawing = false;
    if (this.currentPoints.length >= 2) {
      const stroke = [...this.currentPoints];
      this.allStrokes.push(stroke);
      if (this.onStrokeComplete) {
        this.onStrokeComplete(stroke);
      }
    }
    this.currentPoints = [];
  }
}
