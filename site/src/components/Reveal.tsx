import { useLayoutEffect, useRef, type ReactNode, type RefObject } from "react";
import { gsap } from "gsap";
import { motion as tokens, usePrefersReducedMotion } from "../lib/motion";

interface RevealProps {
  children: ReactNode;
  as?: "div" | "span";
  className?: string;
  delay?: number;
}

// Horizon reveal: content rises out of a horizontal mask. Reverted on unmount via gsap.context.
// Renders a div or span so it can wrap headings and their inline content validly.
export function Reveal({ children, as = "div", className, delay = 0 }: RevealProps) {
  const ref = useRef<HTMLElement>(null);
  const reduced = usePrefersReducedMotion();

  useLayoutEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(
        el,
        { yPercent: 105, clipPath: "inset(0 0 100% 0)" },
        {
          yPercent: 0,
          clipPath: "inset(0 0 0% 0)",
          duration: tokens.duration.base,
          ease: tokens.ease.horizon,
          delay,
        },
      );
    }, el);
    return () => ctx.revert();
  }, [reduced, delay]);

  if (as === "span") {
    return (
      <span ref={ref as RefObject<HTMLSpanElement>} className={`reveal-line ${className ?? ""}`}>
        {children}
      </span>
    );
  }
  return (
    <div ref={ref as RefObject<HTMLDivElement>} className={className}>
      {children}
    </div>
  );
}
