import { images } from "../content/media.generated";
import { site } from "../content/site";
import { Img } from "../components/Media";
import { PageHero } from "../components/Page";
import { useDocumentMeta } from "../lib/meta";

export function Contact() {
  useDocumentMeta("Contact & Find KAMARI", "Phone, Instagram and directions for KAMARI Goa, Dmello Vaddo, Goa.");
  return (
    <>
      <PageHero
        eyebrow="Contact"
        title={<>Find <em>KAMARI.</em></>}
        lede="Phone, Instagram and directions. Details marked as to be confirmed are not yet verified."
        image={images["courtyard"]}
      />

      <section className="section" aria-labelledby="visit-title">
        <div className="section__inner split">
          <div>
            <p className="eyebrow">Visit</p>
            <h2 id="visit-title">KAMARI Goa</h2>
            <address style={{ fontStyle: "normal", marginTop: "1.5rem", fontSize: "1.125rem" }}>
              {site.address.line}
            </address>
            <p className="field-error" style={{ color: "var(--fg-muted)", marginTop: "0.75rem" }}>
              {site.address.note}
            </p>
            <p style={{ marginTop: "1.5rem" }}>
              Opening hours: {site.openingHours ?? "to be confirmed by KAMARI"}.
            </p>
            <div style={{ display: "flex", flexWrap: "wrap", gap: "0.75rem", marginTop: "2rem" }}>
              <a className="button" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">Get directions</a>
              <a className="button button--ghost" href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a>
            </div>
          </div>
          <Img asset={images["courtyard"]} sizes="(max-width: 767px) 100vw, 50vw" />
        </div>
      </section>

      <section className="section section--teal" aria-labelledby="phones-title">
        <div className="section__inner">
          <p className="eyebrow">Telephone</p>
          <h2 id="phones-title">Call us</h2>
          <ul style={{ listStyle: "none", padding: 0, margin: "2rem 0 0", display: "grid", gap: "1rem", maxWidth: "32rem" }}>
            {site.phones.map((p) => (
              <li key={p.href}>
                <a className="button button--ghost phone-button" href={p.href}>
                  <span>{p.label}</span>
                  <span>{p.display}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
