import { Link } from "react-router-dom";
import { images, videos } from "../content/media.generated";
import { site } from "../content/site";
import { publishedEvents } from "../content/events";
import { Img, LoopVideo } from "../components/Media";
import { Reveal } from "../components/Reveal";
import { ReserveBand } from "../components/Page";
import { useDocumentMeta } from "../lib/meta";

export function Home() {
  useDocumentMeta(
    "Sunsets. Sounds. Sensations.",
    "KAMARI Goa, a coastal dining and lifestyle concept in Goa. Independent creative proposal; not an official KAMARI website.",
  );
  const { upcoming } = publishedEvents();

  return (
    <>
      <section className="hero is-home" aria-labelledby="hero-title">
        <div className="hero__media" aria-hidden="true">
          <LoopVideo asset={videos["terrace-sculpture-trim"]} label="" eager />
        </div>
        <div className="hero__scrim" aria-hidden="true" />
        <div className="hero__content">
          <p className="hero__location">{site.location}</p>
          <h1 id="hero-title">
            <Reveal as="span">Sunsets.</Reveal>
            <Reveal as="span" delay={0.1}><em>Sounds.</em></Reveal>
            <Reveal as="span" delay={0.2}>Sensations.</Reveal>
          </h1>
          <p className="hero__copy">Where the sea sets the rhythm.</p>
          <div className="hero__ctas">
            <Link to="/reservations" className="button">Reserve your experience</Link>
            <Link to="/aura" className="button button--ghost" style={{ color: "var(--c-ivory)" }}>Discover KAMARI</Link>
          </div>
        </div>
        <a className="scroll-cue" href="#intro">Scroll</a>
      </section>

      <section id="intro" className="section" aria-labelledby="intro-title">
        <div className="section__inner intro">
          <div className="intro__text">
            <p className="eyebrow">The coast, the room, the evening</p>
            <h2 id="intro-title"><Reveal as="span">A little closer to the sea.</Reveal></h2>
            <p className="lede" style={{ marginTop: "1.5rem" }}>
              KAMARI brings together the view, the table, the cocktail hour and the music that follows the sunset.
              Come for the view. Stay for the evening.
            </p>
            <p style={{ marginTop: "2rem" }}>
              <Link to="/aura" className="link-arrow">Explore Aura</Link>
            </p>
          </div>
          <div className="intro__media">
            <Img asset={images["courtyard"]} sizes="(max-width: 1024px) 100vw, 50vw" />
            <div className="intro__inset">
              <Img asset={images["pattern-toile"]} sizes="20vw" />
            </div>
          </div>
        </div>
      </section>

      <section className="band" aria-labelledby="sunset-title">
        <div className="band__media" aria-hidden="true">
          <Img asset={images["sign-wall-night"]} sizes="100vw" alt="" priority={false} />
        </div>
        <div className="band__scrim" aria-hidden="true" />
        <div className="band__content">
          <p className="eyebrow" style={{ color: "rgb(245 240 229 / 0.85)" }}>Golden hour</p>
          <h2 id="sunset-title"><Reveal as="span">Follow the sun. <em>Stay for the sound.</em></Reveal></h2>
          <p style={{ marginTop: "1.5rem" }}>
            <Link to="/aura" className="button">See the evening</Link>
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="savour-title">
        <div className="section__inner split">
          <div className="split__media">
            <Img asset={images["plate-table"]} sizes="(max-width: 767px) 100vw, 50vw" />
          </div>
          <div>
            <p className="eyebrow">Savour</p>
            <h2 id="savour-title">Made to be <em>savoured.</em></h2>
            <p className="lede" style={{ marginTop: "1.5rem" }}>
              Shared plates and contemporary plating, served the way the afternoon unfolds.
              The menu is published by KAMARI when confirmed.
            </p>
            <p style={{ marginTop: "2rem" }}>
              <Link to="/savour" className="link-arrow">Explore the menu</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section section--night" aria-labelledby="elixirs-title">
        <div className="section__inner split split--reverse">
          <div>
            <p className="eyebrow">Elixirs</p>
            <h2 id="elixirs-title">A sip of <em>the coast.</em></h2>
            <p className="lede" style={{ marginTop: "1.5rem" }}>
              Crafted drinks for the hour before dark. The verified beverage list is available on request.
            </p>
            <p style={{ marginTop: "2rem" }}>
              <Link to="/elixirs" className="link-arrow">Explore drinks</Link>
            </p>
          </div>
          <div className="split__media">
            <Img asset={images["drink-bar"]} sizes="(max-width: 767px) 100vw, 50vw" />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="atelier-title">
        <div className="section__inner">
          <p className="eyebrow">Atelier</p>
          <h2 id="atelier-title">Details worth <em>discovering.</em></h2>
          <div className="gallery" style={{ marginTop: "3rem" }}>
            <figure className="gallery__item gallery__item--wide" style={{ margin: 0 }}>
              <Img asset={images["sculpture-sea"]} sizes="(max-width: 767px) 100vw, 58vw" />
            </figure>
            <figure className="gallery__item gallery__item--tall" style={{ margin: 0 }}>
              <Img asset={images["sign-wall-night"]} sizes="(max-width: 767px) 100vw, 40vw" />
            </figure>
          </div>
          <p style={{ marginTop: "2rem" }}>
            <Link to="/atelier" className="link-arrow">Walk through the space</Link>
          </p>
        </div>
      </section>

      <section className="section section--teal" aria-labelledby="events-title">
        <div className="section__inner">
          <p className="eyebrow">Events</p>
          <h2 id="events-title">Find your <em>rhythm.</em></h2>
          {upcoming.length === 0 ? (
            <div className="empty-state" style={{ marginTop: "2rem" }}>
              <p className="lede">
                No upcoming events are confirmed yet. Follow KAMARI on Instagram for announcements, or call to ask what is planned.
              </p>
              <p>
                <a className="link-arrow" href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram @kamarigoa</a>
                {" · "}
                <Link className="link-arrow" to="/events">Events page</Link>
              </p>
            </div>
          ) : null}
        </div>
      </section>

      <section className="section" aria-labelledby="moments-title">
        <div className="section__inner">
          <p className="eyebrow">Moments</p>
          <h2 id="moments-title">Moments carried by <em>the tide.</em></h2>
          <div className="gallery" style={{ marginTop: "3rem" }}>
            <figure className="gallery__item gallery__item--tall" style={{ margin: 0 }}>
              <LoopVideo asset={videos["plating"]} label="Gloved hands plating a dish on a patterned board" />
            </figure>
            <figure className="gallery__item gallery__item--wide" style={{ margin: 0 }}>
              <Img asset={images["shoreline"]} sizes="(max-width: 767px) 100vw, 58vw" />
            </figure>
          </div>
          <p style={{ marginTop: "2rem" }}>
            <Link to="/moments" className="link-arrow">Open the journal</Link>
          </p>
        </div>
      </section>

      <ReserveBand />

      <section className="section" aria-labelledby="find-title">
        <div className="section__inner split">
          <div>
            <p className="eyebrow">Find KAMARI</p>
            <h2 id="find-title">Find KAMARI</h2>
            <p className="lede" style={{ marginTop: "1.5rem" }}>
              {site.address.line}. {site.address.note}
            </p>
            <p style={{ marginTop: "1rem" }}>Opening hours: to be confirmed by KAMARI.</p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "2rem" }}>
              <a className="button" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">Get directions</a>
              <Link className="button button--ghost" to="/contact">Contact KAMARI</Link>
            </div>
          </div>
          <Img asset={images["courtyard"]} sizes="(max-width: 767px) 100vw, 50vw" />
        </div>
      </section>
    </>
  );
}
