import { useEffect, useRef, useState } from "react";
import type { ImageAsset, VideoAsset } from "../content/media.generated";
import { usePrefersReducedMotion } from "../lib/motion";

interface ImgProps {
  asset: ImageAsset;
  sizes?: string;
  priority?: boolean;
  className?: string;
  alt?: string; // override; decorative images pass ""
}

// Responsive image with explicit dimensions to prevent layout shift.
export function Img({ asset, sizes = "100vw", priority = false, className, alt }: ImgProps) {
  return (
    <img
      className={className}
      src={asset.small}
      srcSet={`${asset.small} 640w, ${asset.src} 1080w`}
      sizes={sizes}
      width={asset.width}
      height={asset.height}
      alt={alt ?? asset.alt}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
    />
  );
}

interface LoopVideoProps {
  asset: VideoAsset;
  className?: string;
  label: string; // accessible name; empty for purely decorative loops
  eager?: boolean;
}

// Muted, looping, no audio. Pauses off-screen; shows the poster only for reduced motion.
export function LoopVideo({ asset, className, label, eager = false }: LoopVideoProps) {
  const ref = useRef<HTMLVideoElement>(null);
  const reduced = usePrefersReducedMotion();
  const [active, setActive] = useState(eager);

  useEffect(() => {
    const el = ref.current;
    if (!el || reduced) return;
    const io = new IntersectionObserver(
      ([entry]) => {
        if (!entry) return;
        if (entry.isIntersecting) {
          setActive(true);
          void el.play().catch(() => undefined);
        } else {
          el.pause();
        }
      },
      { threshold: 0.25 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, [reduced]);

  if (reduced) {
    return (
      <img
        className={className}
        src={asset.poster}
        width={asset.width}
        height={asset.height}
        alt={label}
        loading="lazy"
        decoding="async"
      />
    );
  }

  return (
    <video
      ref={ref}
      className={className}
      poster={asset.poster}
      preload={active ? "auto" : "none"}
      muted
      loop
      playsInline
      autoPlay={eager}
      aria-label={label || undefined}
      aria-hidden={label ? undefined : true}
      width={asset.width}
      height={asset.height}
    >
      {active && <source src={asset.src} type="video/mp4" />}
    </video>
  );
}
