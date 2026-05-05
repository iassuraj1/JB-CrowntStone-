import { useRef, useEffect } from 'react';

const BLOBS = [
  { cx: 0.20, cy: 0.30, r: 0.60, color: [201, 148, 40],  spd: 0.00038, phase: 0.0 },
  { cx: 0.78, cy: 0.22, r: 0.52, color: [30,  60, 160],  spd: 0.00028, phase: 2.1 },
  { cx: 0.55, cy: 0.78, r: 0.50, color: [120, 80,  10],  spd: 0.00048, phase: 4.2 },
  { cx: 0.08, cy: 0.65, r: 0.42, color: [10,  25, 100],  spd: 0.00033, phase: 1.0 },
  { cx: 0.88, cy: 0.58, r: 0.38, color: [180, 130, 40],  spd: 0.00042, phase: 3.5 },
  { cx: 0.50, cy: 0.10, r: 0.35, color: [80,  40, 160],  spd: 0.00050, phase: 5.8 },
];

const getCanvasScale = () => Math.min(window.devicePixelRatio || 1, 1.25);

export default function AuroraCanvas() {
  const ref = useRef(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas.getContext('2d');
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    let id;
    let dpr = 1;
    let t = 0;
    let running = false;

    const resize = () => {
      const parent = canvas.parentElement;
      const width = parent.offsetWidth;
      const height = parent.offsetHeight;
      dpr = getCanvasScale();
      canvas.width  = Math.max(1, Math.floor(width * dpr));
      canvas.height = Math.max(1, Math.floor(height * dpr));
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const draw = () => {
      if (!running) return;
      t++;
      const W = canvas.parentElement.offsetWidth;
      const H = canvas.parentElement.offsetHeight;
      ctx.setTransform(1, 0, 0, 1, 0, 0);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      BLOBS.forEach((b) => {
        const x = (b.cx + Math.sin(t * b.spd + b.phase) * 0.24) * W;
        const y = (b.cy + Math.cos(t * b.spd * 0.75 + b.phase) * 0.20) * H;
        const r = b.r * Math.min(W, H);
        const g = ctx.createRadialGradient(x, y, 0, x, y, r);
        const [cr, cg, cb] = b.color;
        g.addColorStop(0,    `rgba(${cr},${cg},${cb},0.42)`);
        g.addColorStop(0.45, `rgba(${cr},${cg},${cb},0.14)`);
        g.addColorStop(1,    `rgba(${cr},${cg},${cb},0)`);
        ctx.fillStyle = g;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      });

      id = requestAnimationFrame(draw);
    };

    resize();
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
    const onVisibility = () => { if (document.hidden) stop(); else start(); };

    start();
    window.addEventListener('resize', resize);
    document.addEventListener('visibilitychange', onVisibility);
    return () => {
      stop();
      window.removeEventListener('resize', resize);
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  return (
    <canvas
      ref={ref}
      style={{
        position: 'absolute', inset: 0,
        width: '100%', height: '100%',
        opacity: 0.54,
        pointerEvents: 'none', zIndex: 1,
      }}
    />
  );
}
