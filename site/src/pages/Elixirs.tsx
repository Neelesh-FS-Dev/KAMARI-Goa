import { Link } from "react-router-dom";
import { images } from "../content/media.generated";
import { site } from "../content/site";
import { Img } from "../components/Media";
import { PageHero, ReserveBand } from "../components/Page";
import { useDocumentMeta } from "../lib/meta";

export function Elixirs() {
  useDocumentMeta("Elixirs: Drinks", "Crafted drinks at KAMARI Goa, served with the sea in view. Ask for the current beverage menu.");
  return (
    <>
      <PageHero
        eyebrow="Elixirs · Drinks"
        title={<>Good things come <em>with the tide.</em></>}
        lede="Cocktails and crafted drinks for the hour before dark. Names, descriptions and prices come from KAMARI's verified beverage menu."
        image={images["drink-bar"]}
      />

      <section className="section section--night" aria-labelledby="pour-title">
        <div className="section__inner split">
          <Img asset={images["drink-pink"]} sizes="(max-width: 767px) 100vw, 50vw" />
          <div>
            <p className="eyebrow">In the glass</p>
            <h2 id="pour-title">Poured <em>slowly.</em></h2>
            <p className="lede" style={{ marginTop: "1.5rem" }}>
              For the current drinks list, or to ask about ingredients and alcohol content, call KAMARI or send an enquiry.
            </p>
            <p style={{ marginTop: "2rem" }}>
              <Link className="button" to="/reservations">Ask about the drinks menu</Link>
            </p>
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="portraits-title">
        <div className="section__inner">
          <p className="eyebrow">Portraits</p>
          <h2 id="portraits-title">A <em>sip</em> of the coast.</h2>
          <div className="gallery" style={{ marginTop: "3rem" }}>
            <figure className="gallery__item gallery__item--tall" style={{ margin: 0 }}>
              <Img asset={images["drink-pink"]} sizes="(max-width: 767px) 100vw, 40vw" />
            </figure>
            <figure className="gallery__item gallery__item--wide" style={{ margin: 0 }}>
              <Img asset={images["drink-bar"]} sizes="(max-width: 767px) 100vw, 58vw" />
            </figure>
            <figure className="gallery__item gallery__item--third" style={{ margin: 0 }}>
              <Img asset={images["drink-dark"]} sizes="(max-width: 767px) 100vw, 33vw" />
            </figure>
            <figure className="gallery__item gallery__item--third" style={{ margin: 0 }}>
              <Img asset={images["drink-bar"]} sizes="(max-width: 767px) 100vw, 33vw" />
            </figure>
            <figure className="gallery__item gallery__item--third" style={{ margin: 0 }}>
              <Img asset={images["shoreline"]} sizes="(max-width: 767px) 100vw, 33vw" />
            </figure>
          </div>
          <p className="lede" style={{ marginTop: "2rem" }}>
            Drinks are served to adults of legal drinking age. Please drink responsibly.
          </p>
          <p style={{ marginTop: "1rem" }}>
            Verified drink names are published by KAMARI when confirmed. {site.name} does not list recipes, prices or alcohol content here.
          </p>
        </div>
      </section>

      <ReserveBand title="Sea you at the bar." copy="Reserve a table for the evening." />
    </>
  );
}
