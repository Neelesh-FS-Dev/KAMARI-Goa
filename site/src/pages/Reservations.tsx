import { images } from "../content/media.generated";
import { site } from "../content/site";
import { ReservationForm } from "../components/ReservationForm";
import { PageHero } from "../components/Page";
import { useDocumentMeta } from "../lib/meta";

export function Reservations() {
  useDocumentMeta("Reservations", "Request a table at KAMARI Goa. Enquiry form and direct phone lines.");
  return (
    <>
      <PageHero
        eyebrow="Reservations"
        title={<>Sea you at <em>KAMARI.</em></>}
        lede="Make your way to the coast. Call KAMARI for the fastest answer, or send an enquiry."
        image={images["courtyard"]}
      />

      <section className="section section--night" aria-labelledby="call-title">
        <div className="section__inner split">
          <div>
            <p className="eyebrow">Call KAMARI</p>
            <h2 id="call-title">Speak to the team</h2>
            <ul style={{ listStyle: "none", padding: 0, margin: "2rem 0", display: "grid", gap: "1rem" }}>
              {site.phones.map((p) => (
                <li key={p.href}>
                  <a className="button button--ghost" href={p.href} style={{ color: "var(--c-ivory)" }}>{p.display}</a>
                </li>
              ))}
            </ul>
            <p className="lede">
              Live availability is not shown on this site. Your enquiry is a request, and a table is only booked when KAMARI confirms it.
            </p>
          </div>
          <ReservationForm />
        </div>
      </section>
    </>
  );
}
