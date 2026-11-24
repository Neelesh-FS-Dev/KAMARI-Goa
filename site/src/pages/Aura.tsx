import { images, videos } from "../content/media.generated";
import { Img, LoopVideo } from "../components/Media";
import { PageHero, ReserveBand } from "../components/Page";
import { useDocumentMeta } from "../lib/meta";

export function Aura() {
  useDocumentMeta("Aura: The Experience", "The coastal atmosphere at KAMARI Goa: ocean views, outdoor terraces and the move from daylight to evening.");
  return (
    <>
      <PageHero
        eyebrow="Aura · The Experience"
        title={<>Let the coast <em>set the pace.</em></>}
        lede="Ocean air, open terraces and the light that changes across the afternoon."
        image={images["courtyard"]}
      />

      <section className="section" aria-labelledby="coast-title">
        <div className="section__inner split">
          <div>
            <p className="eyebrow">01 · The Coast</p>
            <h2 id="coast-title">Where the land <em>gives way.</em></h2>
            <p className="lede" style={{ marginTop: "1.5rem" }}>
              The sea is the first thing you notice and the last thing you leave. Sit close to the water, or step back
              to the terrace shade.
            </p>
          </div>
          <Img asset={images["shoreline"]} sizes="(max-width: 767px) 100vw, 50vw" />
        </div>
      </section>

      <section className="section" aria-labelledby="space-title">
        <div className="section__inner">
          <p className="eyebrow">02 · The Space</p>
          <h2 id="space-title">Arches, <em>ceramics</em> and open air.</h2>
          <div className="gallery" style={{ marginTop: "3rem" }}>
            <figure className="gallery__item gallery__item--tall" style={{ margin: 0 }}>
              <LoopVideo asset={videos["terrace-sculpture-trim"]} label="Terrace with white sculptures, KAMARI signage and the sea beyond the railing" />
            </figure>
            <figure className="gallery__item gallery__item--wide" style={{ margin: 0 }}>
              <Img asset={images["courtyard"]} sizes="(max-width: 767px) 100vw, 58vw" />
            </figure>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="feeling-title">
        <div className="band__media" aria-hidden="true">
          <Img asset={images["sign-wall-night"]} sizes="100vw" alt="" />
        </div>
        <div className="band__scrim" aria-hidden="true" />
        <div className="band__content">
          <p className="eyebrow" style={{ color: "rgb(245 240 229 / 0.85)" }}>03 · The Feeling</p>
          <h2 id="feeling-title">The evening <em>arrives slowly.</em></h2>
          <p className="lede" style={{ color: "rgb(245 240 229 / 0.85)", margin: "1.5rem auto 0" }}>
            Lights come up, the sea goes dark, and the room fills with the sound of people staying a little longer.
          </p>
        </div>
      </section>

      <ReserveBand title="Come for the view." copy="Stay for the vibe. Reserve your experience." />
    </>
  );
}
