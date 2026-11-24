import { useEffect, useState } from "react";

const query = "(prefers-reduced-motion: reduce)";

export function usePrefersReducedMotion(): boolean {
  const [reduced, setReduced] = useState(() =>
    typeof window !== "undefined" && window.matchMedia(query).matches,
  );
  useEffect(() => {
    const mql = window.matchMedia(query);
    const onChange = () => setReduced(mql.matches);
    mql.addEventListener("change", onChange);
    return () => mql.removeEventListener("change", onChange);
  }, []);
  return reduced;
}

// Motion tokens. Every animation reads from here.
export const motion = {
  duration: { fast: 0.35, base: 0.9, slow: 1.4 },
  ease: { out: "power3.out", inOut: "power2.inOut", horizon: "expo.out" },
  stagger: 0.08,
} as const;
