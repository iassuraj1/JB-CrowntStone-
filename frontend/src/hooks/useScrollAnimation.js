import { useEffect } from 'react';

export function useScrollAnimation() {
  useEffect(() => {
    const els = document.querySelectorAll('.animate');
    if (!els.length) return;

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (reduceMotion) {
      els.forEach((el) => el.classList.add('in-view'));
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        e.target.classList.toggle('in-view', e.isIntersecting && e.intersectionRatio > 0.08);
      }),
      { threshold: [0, 0.08, 0.18], rootMargin: '0px 0px -10% 0px' }
    );

    els.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);
}
