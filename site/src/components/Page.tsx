import type { ReactNode } from "react";
import { Link } from "react-router-dom";
import type { ImageAsset, VideoAsset } from "../content/media.generated";
import { site } from "../content/site";
import { Img, LoopVideo } from "./Media";
import { Reveal } from "./Reveal";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  lede: string;
  image?: ImageAsset;
  video?: VideoAsset;
}

// Inner-page opener: full-bleed media, editorial headline.
export function PageHero({ eyebrow, title, lede, image, video }: PageHeroProps) {
  return (
    <section className="band page-hero" aria-labelledby="page-title">
      <div className="band__media" aria-hidden="true">
        {video ? (
          <LoopVideo asset={video} label="" eager className="" />
        ) : image ? (
          <Img asset={image} priority sizes="100vw" alt="" />
        ) : null}
      </div>
      <div className="band__scrim" aria-hidden="true" />
      <div className="band__content">
        <p className="eyebrow" style={{ color: "rgb(245 240 229 / 0.85)" }}>{eyebrow}</p>
        <Reveal>
          <h1 id="page-title">{title}</h1>
        </Reveal>
        <p className="lede" style={{ color: "rgb(245 240 229 / 0.85)", margin: "1.5rem auto 0" }}>
          {lede}
        </p>
      </div>
    </section>
  );
}

// Reservation CTA used as a closing band on most pages.
export function ReserveBand({ title = "Sea you at KAMARI.", copy = "Make your way to the coast." }: { title?: string; copy?: string }) {
  return (
    <section className="section section--teal reserve-band" aria-labelledby="reserve-title">
      <div className="section__inner split">
        <div>
          <p className="eyebrow">Reservations</p>
          <h2 id="reserve-title">{title}</h2>
          <p className="lede">{copy}</p>
        </div>
        <div className="reserve-band__actions">
          <Link to="/reservations" className="button">Reserve your experience</Link>
          <a className="button button--ghost" href={site.phones[0]!.href}>
            Call {site.phones[0]!.display}
          </a>
          <a className="button button--ghost" href={site.phones[1]!.href}>
            Call {site.phones[1]!.display}
          </a>
        </div>
      </div>
    </section>
  );
}
