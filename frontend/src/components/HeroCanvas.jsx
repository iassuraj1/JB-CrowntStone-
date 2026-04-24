import { useRef, useEffect } from 'react';

const GOLD        = { r: 220, g: 178, b: 80 };
const N           = 85;
const CONNECT     = 155;
const MOUSE_R     = 130;

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
    let id;
    let t = 0;
    let particles = [];
    const mouse = { x: -9999, y: -9999 };

    const init = () => {
      canvas.width  = canvas.parentElement.offsetWidth;
      canvas.height = canvas.parentElement.offsetHeight;
      particles = Array.from({ length: N }, () => new Particle(canvas.width, canvas.height));
    };

    const draw = () => {
      t++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { r, g, b } = GOLD;

      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const dx   = particles[i].x - particles[j].x;
          const dy   = particles[i].y - particles[j].y;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < CONNECT) {
            ctx.strokeStyle = `rgba(${r},${g},${b},${0.24 * (1 - dist / CONNECT)})`;
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
    draw();

    const parent = canvas.parentElement;
    const onMove  = (e) => { const rc = parent.getBoundingClientRect(); mouse.x = e.clientX - rc.left; mouse.y = e.clientY - rc.top; };
    const onLeave = ()  => { mouse.x = -9999; mouse.y = -9999; };

    parent.addEventListener('mousemove', onMove);
    parent.addEventListener('mouseleave', onLeave);
    window.addEventListener('resize', init);

    return () => {
      cancelAnimationFrame(id);
      parent.removeEventListener('mousemove', onMove);
      parent.removeEventListener('mouseleave', onLeave);
      window.removeEventListener('resize', init);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        pointerEvents: 'none', zIndex: 2,
      }}
    />
  );
}
