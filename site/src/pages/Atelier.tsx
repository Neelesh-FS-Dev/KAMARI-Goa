import { useState } from "react";
import { images, videos, type ImageAsset } from "../content/media.generated";
import { Img, LoopVideo } from "../components/Media";
import { PageHero, ReserveBand } from "../components/Page";
import { useDocumentMeta } from "../lib/meta";

// Editorial details. Each entry is a real photograph from the venue's documented media.
const details: { key: keyof typeof images; title: string; note: string }[] = [
  { key: "pattern-toile", title: "Blue and white line study", note: "Blue and white toile-style drawing on ivory." },
  { key: "sculpture-sea", title: "Sculpted figure, open sea", note: "A white figure set within an arch, with the sea beyond." },
  { key: "sign-pattern-buggy", title: "Pattern wall and lettering", note: "KAMARI lettering against a blue and white patterned wall." },
  { key: "sign-wall-night", title: "Night signage", note: "Illuminated lettering above the blue wall after dark." },
  { key: "sign-wall-glow", title: "Glowing mark", note: "The brand mark lit against blue and white tiles." },
];

export function Atelier() {
  useDocumentMeta("Atelier: The Space", "Architecture, decorative patterns and the artistic details of KAMARI Goa's coastal space.");
  const [active, setActive] = useState<keyof typeof images>("sculpture-sea");
  const current = details.find((d) => d.key === active)!;
  const asset: ImageAsset = images[active];

  return (
    <>
      <PageHero
        eyebrow="Atelier · The Space"
        title={<>Details worth <em>discovering.</em></>}
        lede="Blue and white patterns, sculptural forms and the interiors that frame the sea."
        image={images["sign-wall-night"]}
      />

      <section className="section pattern-tile" aria-labelledby="explore-title">
        <div className="section__inner">
          <p className="eyebrow">Explore the details</p>
          <h2 id="explore-title">Choose a detail</h2>
          <div className="split" style={{ marginTop: "3rem", alignItems: "start" }}>
            <ul className="index-list" aria-label="Details">
              {details.map((d) => (
                <li key={d.key}>
                  <button
                    type="button"
                    aria-pressed={active === d.key}
                    onClick={() => setActive(d.key)}
                    style={{ all: "unset", cursor: "pointer", display: "flex", width: "100%", justifyContent: "space-between", padding: "1.25rem 0", boxSizing: "border-box", font: "400 clamp(1.5rem, 2.6vw, 2.25rem)/1.1 var(--font-display)" }}
                  >
                    <span>{d.title}</span>
                    <small>{active === d.key ? "Viewing" : "View"}</small>
                  </button>
                </li>
              ))}
            </ul>
            <figure style={{ margin: 0 }} aria-live="polite">
              <Img key={active} asset={asset} sizes="(max-width: 767px) 100vw, 50vw" alt={asset.alt} />
              <figcaption className="gallery__caption">{current.note}</figcaption>
            </figure>
          </div>
        </div>
      </section>

      <section className="section section--night" aria-labelledby="motion-title">
        <div className="section__inner split">
          <div>
            <p className="eyebrow">Architecture</p>
            <h2 id="motion-title">Frames within <em>frames.</em></h2>
            <p className="lede" style={{ marginTop: "1.5rem" }}>
              Organic openings and arches frame the terrace, the figure and the horizon. The architect and construction
              history are not documented here, so none are described.
            </p>
          </div>
          <LoopVideo asset={videos["terrace-sculpture-trim"]} label="Terrace with white sculptures, KAMARI signage and the sea beyond the railing" />
        </div>
      </section>

      <ReserveBand title="Details are better in person." copy="Walk the space at dusk." />
    </>
  );
}
