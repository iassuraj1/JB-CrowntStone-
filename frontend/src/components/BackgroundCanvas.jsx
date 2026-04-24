import { useRef, useEffect } from 'react';

const GOLD  = { r: 212, g: 175, b: 55 };
const N     = 80;
const CONN  = 160;
const MOUSE_R = 140;

class Star {
  constructor(w, h) { this.w = w; this.h = h; this.init(); }
  init() {
    this.x  = Math.random() * this.w;
    this.y  = Math.random() * this.h;
    this.vx = (Math.random() - 0.5) * 0.35;
    this.vy = (Math.random() - 0.5) * 0.35;
    this.ox = this.vx;
    this.oy = this.vy;
    this.r  = Math.random() * 1.6 + 0.4;
    this.ba = Math.random() * 0.45 + 0.12;
    this.a  = this.ba;
    this.ps = Math.random() * 0.014 + 0.005;
    this.pp = Math.random() * Math.PI * 2;
  }
  update(t, mx, my) {
    const dx = this.x - mx, dy = this.y - my;
    const d  = Math.sqrt(dx * dx + dy * dy);
    if (d < MOUSE_R && d > 0) {
      const f = (MOUSE_R - d) / MOUSE_R;
      this.vx += (dx / d) * f * 1.1;
      this.vy += (dy / d) * f * 1.1;
    }
    this.vx = this.vx * 0.97 + this.ox * 0.03;
    this.vy = this.vy * 0.97 + this.oy * 0.03;
    const spd = Math.sqrt(this.vx * this.vx + this.vy * this.vy);
    if (spd > 3) { this.vx = (this.vx / spd) * 3; this.vy = (this.vy / spd) * 3; }
    this.x += this.vx; this.y += this.vy;
    if (this.x < 0)      { this.x = 0;      this.vx *= -1; this.ox *= -1; }
    if (this.x > this.w) { this.x = this.w; this.vx *= -1; this.ox *= -1; }
    if (this.y < 0)      { this.y = 0;      this.vy *= -1; this.oy *= -1; }
    if (this.y > this.h) { this.y = this.h; this.vy *= -1; this.oy *= -1; }
    this.a = this.ba + Math.sin(t * this.ps + this.pp) * 0.1;
  }
  draw(ctx) {
    const { r, g, b } = GOLD;
    if (this.r > 1.1) {
      const grd = ctx.createRadialGradient(this.x, this.y, 0, this.x, this.y, this.r * 5);
      grd.addColorStop(0, `rgba(${r},${g},${b},${this.a * 0.45})`);
      grd.addColorStop(1, `rgba(${r},${g},${b},0)`);
      ctx.fillStyle = grd;
      ctx.beginPath();
      ctx.arc(this.x, this.y, this.r * 5, 0, Math.PI * 2);
      ctx.fill();
    }
    ctx.fillStyle = `rgba(${r},${g},${b},${this.a})`;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
    ctx.fill();
  }
}

export default function BackgroundCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    let id, t = 0;
    let stars = [];
    const mouse = { x: -9999, y: -9999 };

    const resize = () => {
      canvas.width  = window.innerWidth;
      canvas.height = window.innerHeight;
      stars = Array.from({ length: N }, () => new Star(canvas.width, canvas.height));
    };

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { r, g, b } = GOLD;

      // Draw constellation lines
      for (let i = 0; i < stars.length; i++) {
        for (let j = i + 1; j < stars.length; j++) {
          const dx   = stars[i].x - stars[j].x;
          const dy   = stars[i].y - stars[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONN) {
            ctx.strokeStyle = `rgba(${r},${g},${b},${0.18 * (1 - dist / CONN)})`;
            ctx.lineWidth   = 0.55;
            ctx.beginPath();
            ctx.moveTo(stars[i].x, stars[i].y);
            ctx.lineTo(stars[j].x, stars[j].y);
            ctx.stroke();
          }
        }
      }

      stars.forEach((s) => { s.update(t, mouse.x, mouse.y); s.draw(ctx); });
      id = requestAnimationFrame(draw);
    };

    resize();
    draw();

    const onMove  = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = ()  => { mouse.x = -9999; mouse.y = -9999; };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', resize);

    return () => {
      cancelAnimationFrame(id);
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: 'fixed', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none',
        zIndex: 2,
      }}
    />
  );
}
