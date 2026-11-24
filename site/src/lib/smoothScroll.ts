import Lenis from "lenis";

// One Lenis instance for the whole site. Skipped entirely for reduced-motion users (native scrolling).
let lenis: Lenis | null = null;

export function initSmoothScroll(): () => void {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return () => undefined;
  lenis = new Lenis({ lerp: 0.1, smoothWheel: true, anchors: true, autoRaf: true });
  return () => {
    lenis?.destroy();
    lenis = null;
  };
}

// Pause while the full-screen menu is open so the page underneath does not move.
export function setSmoothScrollPaused(paused: boolean) {
  if (paused) lenis?.stop();
  else lenis?.start();
}

// Jump to the top on route change, respecting the active scroll engine.
export function resetScroll() {
  if (lenis) lenis.scrollTo(0, { immediate: true });
  else window.scrollTo({ top: 0, left: 0, behavior: "instant" });
}
