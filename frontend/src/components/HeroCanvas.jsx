import { useRef, useEffect } from 'react';

const GOLD        = { r: 220, g: 178, b: 80 };
const BASE_COUNT  = 82;
const CONNECT     = 155;
const MOUSE_R     = 130;
const CONNECT_SQ  = CONNECT * CONNECT;

const getCanvasScale = () => Math.min(window.devicePixelRatio || 1, 1.5);
const getParticleCount = () => {
  if (window.innerWidth < 540) return 38;
  if (window.innerWidth < 900) return 58;
  return BASE_COUNT;
};

class Particle {
  constructor(w, h) {
    this.w = w; this.h = h;
    this.init();
  }
  init() {
    this.x  = Math.random() * this.w;
    this.y  = Math.random() * this.h;
    this.vx = (Math.random() - 0.5) * 0.45;
    this.vy = (Math.random() - 0.5) * 0.45;
    this.ox = this.vx;
    this.oy = this.vy;
    this.r  = Math.random() * 1.9 + 0.5;
    this.ba = Math.random() * 0.55 + 0.15;
    this.a  = this.ba;
    this.ps = Math.random() * 0.018 + 0.007;
    this.pp = Math.random() * Math.PI * 2;
  }
  update(t, mx, my) {
    const dx = this.x - mx;
    const dy = this.y - my;
    const d  = Math.sqrt(dx * dx + dy * dy);
    if (d < MOUSE_R && d > 0) {
      const f = (MOUSE_R - d) / MOUSE_R;
      this.vx += (dx / d) * f * 1.2;
      this.vy += (dy / d) * f * 1.2;
    }
    this.vx = this.vx * 0.97 + this.ox * 0.03;
    this.vy = this.vy * 0.97 + this.oy * 0.03;
    const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (spd > 3.5) { this.vx = (this.vx / spd) * 3.5; this.vy = (this.vy / spd) * 3.5; }

    this.x += this.vx; this.y += this.vy;
    if (this.x < 0)      { this.x = 0;       this.vx *= -1; this.ox *= -1; }
    if (this.x > this.w) { this.x = this.w;  this.vx *= -1; this.ox *= -1; }
    if (this.y < 0)      { this.y = 0;       this.vy *= -1; this.oy *= -1; }
    if (this.y > this.h) { this.y = this.h;  this.vy *= -1; this.oy *= -1; }
    this.a = this.ba + Math.sin(t * this.ps + this.pp) * 0.12;
  }
  draw(ctx) {
    const { r, g, b } = GOLD;
    if (this.r > 1.3) {
      const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 5.5);
      grd.addColorStop(0, `rgba(${r},${g},${b},${this.a * 0.55})`);
      grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * 5.5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = `rgba(${r},${g},${b},${this.a})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function HeroCanvas() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx    = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let id;
    let dpr = 1;
    let t = 0;
    let running = false;
    let particles = [];
    const mouse = { x: -9999, y: -9999 };

    const init = () => {
      const parent = canvas.parentElement;
      const width = parent.offsetWidth;
      const height = parent.offsetHeight;
      dpr = getCanvasScale();
      canvas.width  = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      particles = Array.from({ length: getParticleCount() }, () => new Particle(width, height));
    };

    const draw = () => {
      if (!running) return;
      t++;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const { r, g, b } = GOLD;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const distSq = dx * dx + dy * dy;
          if (distSq < CONNECT_SQ) {
            const dist = Math.sqrt(distSq);
            ctx.strokeStyle = `rgba(${r},${g},${b},${0.2 * (1 - dist / CONNECT)})`;
            ctx.lineWidth   = 0.65;
            ctx.beginPath();
            ctx.moveTo(particles[i].x, particles[i].y);
            ctx.lineTo(particles[j].x, particles[j].y);
            ctx.stroke();
          }
        }
      }

      particles.forEach((p) => { p.update(t, mouse.x, mouse.y); p.draw(ctx); });
      id = requestAnimationFrame(draw);
    };

    init();
    if (reduceMotion) return undefined;

    const start = () => {
      if (running) return;
      running = true;
      id = requestAnimationFrame(draw);
    };
    const stop = () => {
      running = false;
      cancelAnimationFrame(id);
    };

    const parent = canvas.parentElement;
    const onMove  = (e) => { const rc = parent.getBoundingClientRect(); mouse.x = e.clientX - rc.left; mouse.y = e.clientY - rc.top; };
    const onLeave = ()  => { mouse.x = -9999; mouse.y = -9999; };
    const onVisibility = () => { if (document.hidden) stop(); else start(); };

    start();

    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', init);
    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      stop();
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', init);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        opacity: 0.78,
        pointerEvents: 'none', zIndex: 2,
      }}
    />
  );
}
