import { useEffect, useRef } from "react";
import blobStyles from "./blob.module.css";

const EASE_DURATION = 20;
const BUBBLE_SIZE = 1200; // match in blob.module.css
const MouseUpdater = () => {
  const mouseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!mouseRef) return;
    const bubble = mouseRef.current;
    if (!bubble) return;

    let curX = 0;
    let curY = 0;
    let targetX = 0;
    let targetY = 0;
    let translateX = Math.round(curX);
    let translateY = Math.round(curY);
    let frame = 0;

    function move() {
      if (!bubble) return;
      curX += (targetX - curX) / EASE_DURATION;
      curY += (targetY - curY) / EASE_DURATION;

      translateX = Math.round(curX) - BUBBLE_SIZE / 2;
      translateY = Math.round(curY) - BUBBLE_SIZE / 2;

      bubble.style.transform = `translate(${translateX}px, ${translateY}px)`;
      frame = requestAnimationFrame(move);
    }

    const updateCursorPosition = (event: MouseEvent) => {
      targetX = event.clientX;
      targetY = event.clientY;
    };
    window.addEventListener("mousemove", updateCursorPosition);

    move();

    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, [mouseRef]);

  return <div ref={mouseRef} className={blobStyles.blob} />;
};

export default MouseUpdater;
