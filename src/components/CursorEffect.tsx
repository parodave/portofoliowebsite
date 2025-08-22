import React, { useEffect, useRef, useState } from 'react';
import usePrefersReducedMotion from '../hooks/usePrefersReducedMotion';

const CursorEffect: React.FC = () => {
  const [clicked, setClicked] = useState(false);
  const clickedRef = useRef(false);
  const reduceMotion = usePrefersReducedMotion();

  // Garde clickedRef synchronisé avec le state
  useEffect(() => {
    clickedRef.current = clicked;
  }, [clicked]);

  useEffect(() => {
    if (reduceMotion) return;

    const isTouchDevice = () =>
      'ontouchstart' in window || navigator.maxTouchPoints > 0;
    if (isTouchDevice()) return;

    const cursorDot = document.createElement('div');
    cursorDot.classList.add('cursor-dot');
    document.body.appendChild(cursorDot);

    const lightEffect = document.createElement('div');
    lightEffect.classList.add('light-effect');
    document.body.appendChild(lightEffect);

    const onMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      requestAnimationFrame(() => {
        cursorDot.style.left = `${clientX}px`;
        cursorDot.style.top = `${clientY}px`;
        lightEffect.style.left = `${clientX}px`;
        lightEffect.style.top = `${clientY}px`;
      });
    };

    const onMouseDown = () => {
      setClicked(true);
      cursorDot.classList.add('active');
    };

    const onMouseUp = () => {
      setClicked(false);
      cursorDot.classList.remove('active');
    };

    const selectable = 'a, button, input, textarea, [role="button"]';

    const onPointerOver = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest(selectable);
      if (target) {
        cursorDot.classList.add('active');
      }
    };

    const onPointerOut = (e: PointerEvent) => {
      const target = (e.target as HTMLElement).closest(selectable);
      if (
        target &&
        !(target as HTMLElement).contains(e.relatedTarget as Node) &&
        !clickedRef.current
      ) {
        cursorDot.classList.remove('active');
      }
    };

    document.addEventListener('mousemove', onMouseMove);
    document.addEventListener('mousedown', onMouseDown);
    document.addEventListener('mouseup', onMouseUp);
    document.addEventListener('pointerover', onPointerOver);
    document.addEventListener('pointerout', onPointerOut);

    return () => {
      document.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mousedown', onMouseDown);
      document.removeEventListener('mouseup', onMouseUp);
      document.removeEventListener('pointerover', onPointerOver);
      document.removeEventListener('pointerout', onPointerOut);

      if (cursorDot.parentElement) cursorDot.remove();
      if (lightEffect.parentElement) lightEffect.remove();
    };
  }, [reduceMotion]);

  return null;
};

export default CursorEffect;
