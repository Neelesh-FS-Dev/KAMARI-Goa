import { Link } from "react-router-dom";
import { useDocumentMeta } from "../lib/meta";

export function NotFound() {
  useDocumentMeta("Page not found", "This page could not be found.");
  return (
    <section className="section" aria-labelledby="nf-title" style={{ minHeight: "70vh", display: "grid", alignContent: "center" }}>
      <div className="section__inner">
        <p className="eyebrow">404</p>
        <h1 id="nf-title">This page has <em>drifted out.</em></h1>
        <p className="lede" style={{ marginTop: "1.5rem" }}>The page may have moved or never existed.</p>
        <p style={{ marginTop: "2rem" }}>
          <Link className="button" to="/">Back to the coast</Link>
        </p>
      </div>
    </section>
  );
}
