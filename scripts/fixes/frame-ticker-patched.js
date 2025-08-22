export class FrameTicker {
  constructor(callback) {
    this.callback = callback;
    this.running = false;
    this.rafId = null;
  }

  start() {
    if (this.running) return;
    this.running = true;
    const loop = () => {
      this.callback();
      this.rafId = requestAnimationFrame(loop);
    };
    loop();
  }

  stop() {
    if (!this.running) return;
    this.running = false;
    cancelAnimationFrame(this.rafId);
    this.rafId = null;
  }
}

export { FrameTicker as default };
