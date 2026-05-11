import { useCallback, useEffect, useRef } from 'react';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

const clamp = (value, min, max) => Math.min(max, Math.max(min, value));

export function useHomeLenis(disabled, rootRef) {
  const lenisRef = useRef(null);

  useEffect(() => {
    const root = rootRef.current;
    if (disabled || !root) {
      root?.style.setProperty('--scroll-velocity', '0');
      root?.style.setProperty('--scroll-direction', '1');
      return undefined;
    }

    const lenis = new Lenis({
      autoRaf: true,
      lerp: 0.08,
      smoothWheel: true,
      anchors: true,
      stopInertiaOnNavigate: true,
    });

    lenisRef.current = lenis;
    root.classList.add('lenis-ready');

    const onScroll = ({ direction, velocity }) => {
      const normalizedVelocity = clamp(Math.abs(velocity || 0) / 1.8, 0, 1);
      const scrollDirection = direction || 1;
      root.style.setProperty('--scroll-velocity', normalizedVelocity.toFixed(3));
      root.style.setProperty('--scroll-direction', String(scrollDirection));
      root.style.setProperty('--logo-lift', `${(-22 * normalizedVelocity).toFixed(2)}px`);
      root.style.setProperty('--logo-panel-shift', `${(-10 * normalizedVelocity * scrollDirection).toFixed(2)}px`);
      root.style.setProperty('--logo-scale', (1 + normalizedVelocity * 0.035).toFixed(3));
      root.style.setProperty('--logo-scale-low', (0.98 + normalizedVelocity * 0.034).toFixed(3));
      root.style.setProperty('--logo-scale-high', (1.035 + normalizedVelocity * 0.036).toFixed(3));
      root.style.setProperty('--logo-glow', `${(24 + normalizedVelocity * 18).toFixed(2)}px`);
      window.clearTimeout(root.__vaultVelocityTimer);
      root.__vaultVelocityTimer = window.setTimeout(() => {
        root.style.setProperty('--scroll-velocity', '0');
        root.style.setProperty('--logo-lift', '0px');
        root.style.setProperty('--logo-panel-shift', '0px');
        root.style.setProperty('--logo-scale', '1');
        root.style.setProperty('--logo-scale-low', '0.98');
        root.style.setProperty('--logo-scale-high', '1.035');
        root.style.setProperty('--logo-glow', '24px');
      }, 160);
    };

    lenis.on('scroll', onScroll);

    return () => {
      window.clearTimeout(root.__vaultVelocityTimer);
      root.classList.remove('lenis-ready');
      root.style.setProperty('--scroll-velocity', '0');
      root.style.setProperty('--scroll-direction', '1');
      root.style.setProperty('--logo-lift', '0px');
      root.style.setProperty('--logo-panel-shift', '0px');
      root.style.setProperty('--logo-scale', '1');
      root.style.setProperty('--logo-scale-low', '0.98');
      root.style.setProperty('--logo-scale-high', '1.035');
      root.style.setProperty('--logo-glow', '24px');
      lenis.destroy();
      lenisRef.current = null;
    };
  }, [disabled, rootRef]);

  const scrollTo = useCallback(
    (target, options = {}) => {
      if (disabled || !lenisRef.current) {
        if (target instanceof HTMLElement) {
          target.scrollIntoView({ behavior: 'auto', block: options.block || 'start' });
        }
        return;
      }

      lenisRef.current.scrollTo(target, {
        offset: options.offset ?? -86,
        duration: options.duration ?? 1.2,
        easing: options.easing,
      });
    },
    [disabled]
  );

  return { lenis: lenisRef, scrollTo };
}
