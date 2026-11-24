import { Link } from "react-router-dom";
import { images, videos } from "../content/media.generated";
import { menu, menuDownloadUrl, type MenuCategory } from "../content/menu";
import { site } from "../content/site";
import { Img, LoopVideo } from "../components/Media";
import { PageHero, ReserveBand } from "../components/Page";
import { useDocumentMeta } from "../lib/meta";

const categories: MenuCategory[] = ["small plates", "mains", "desserts", "drinks"];

export function Savour() {
  useDocumentMeta("Savour: Food", "Coastal dining at KAMARI Goa. The verified menu is shared when confirmed; reservations by phone.");
  const hasMenu = menu.length > 0;

  return (
    <>
      <PageHero
        eyebrow="Savour · Food"
        title={<>Made to be <em>savoured.</em></>}
        lede="Shared plates and contemporary plating, by the coast. Menu details come directly from KAMARI."
        image={images["dishes-overhead"]}
      />

      <section className="section" aria-labelledby="menu-title">
        <div className="section__inner">
          <p className="eyebrow">The menu</p>
          <h2 id="menu-title">Current menu</h2>

          {hasMenu ? (
            <>
              <nav aria-label="Menu categories">
                <ul className="filters">
                  {categories.map((c) => (
                    <li key={c}><a href={`#cat-${c.replace(/\s+/g, "-")}`}>{c}</a></li>
                  ))}
                </ul>
              </nav>
              {categories.map((c) => {
                const items = menu.filter((m) => m.category === c && m.available);
                if (items.length === 0) return null;
                return (
                  <section key={c} id={`cat-${c.replace(/\s+/g, "-")}`} aria-labelledby={`h-${c}`} style={{ marginTop: "3rem" }}>
                    <h3 id={`h-${c}`} style={{ textTransform: "capitalize" }}>{c}</h3>
                    <ul className="index-list" style={{ marginTop: "1rem" }}>
                      {items.map((m) => (
                        <li key={m.id}>
                          <div style={{ padding: "1.25rem 0" }}>
                            <strong style={{ font: "400 1.75rem / 1.1 var(--font-display)" }}>{m.name}</strong>
                            <p style={{ margin: "0.5rem 0 0", color: "var(--fg-muted)" }}>{m.description}</p>
                            {m.dietary && m.dietary.length > 0 && <small>{m.dietary.join(" · ")}</small>}
                          </div>
                          {m.price && <small>{m.price}</small>}
                        </li>
                      ))}
                    </ul>
                  </section>
                );
              })}
              {menuDownloadUrl && (
                <p style={{ marginTop: "2rem" }}>
                  <a className="link-arrow" href={menuDownloadUrl}>Download the official menu (PDF)</a>
                </p>
              )}
            </>
          ) : (
            <div className="empty-state">
              <p className="lede">
                The full menu is not published here yet. To ask about today's dishes, dietary needs or allergens,
                please call KAMARI directly.
              </p>
              <p>
                <a className="button" href={site.phones[0]!.href}>Call {site.phones[0]!.display}</a>{" "}
                <Link className="button button--ghost" to="/reservations">Reserve a table</Link>
              </p>
            </div>
          )}
        </div>
      </section>

      <section className="section section--night" aria-labelledby="showcase-title">
        <div className="section__inner">
          <p className="eyebrow">A showcase of the table</p>
          <h2 id="showcase-title">Plates, <em>shared.</em></h2>
          <div className="gallery" style={{ marginTop: "3rem" }}>
            <figure className="gallery__item gallery__item--wide" style={{ margin: 0 }}>
              <Img asset={images["plate-table"]} sizes="(max-width: 767px) 100vw, 58vw" />
            </figure>
            <figure className="gallery__item gallery__item--tall" style={{ margin: 0 }}>
              <LoopVideo asset={videos["plating"]} label="Hands plating a dish on a board" />
            </figure>
            <figure className="gallery__item gallery__item--half" style={{ margin: 0 }}>
              <Img asset={images["curries-overhead"]} sizes="(max-width: 767px) 100vw, 50vw" />
            </figure>
            <figure className="gallery__item gallery__item--half" style={{ margin: 0 }}>
              <Img asset={images["bowl-wicker"]} sizes="(max-width: 767px) 100vw, 50vw" />
            </figure>
          </div>
        </div>
      </section>

      <ReserveBand title="Made to be savoured." copy="Reserve a table by phone or send an enquiry." />
    </>
  );
}
