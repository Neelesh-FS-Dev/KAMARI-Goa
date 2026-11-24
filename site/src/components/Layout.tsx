import { useEffect } from "react";
import { initSmoothScroll, resetScroll } from "../lib/smoothScroll";
import { Outlet, useLocation } from "react-router-dom";
import { Header, Wordmark } from "./Header";
import { MobileBar } from "./MobileBar";
import { site } from "../content/site";
import { ErrorBoundary } from "./ErrorBoundary";

// Scroll to top on navigation, unless a hash link is used. Keeps back/forward restoration.
function ScrollReset() {
  const { pathname, hash } = useLocation();
  useEffect(() => {
    if (hash) return;
    resetScroll();
  }, [pathname, hash]);
  return null;
}

export function Layout() {
  const location = useLocation();
  useEffect(() => initSmoothScroll(), []);
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <ScrollReset />
      <Header />
      <main id="main" tabIndex={-1}>
        <ErrorBoundary key={location.pathname}>
          <Outlet />
        </ErrorBoundary>
      </main>
      <Footer />
      <MobileBar />
    </>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      {/* Decorative oversized wordmark. Text comes from CSS (::before) so it is not read or audited as content. */}
      <div className="site-footer__wordmark" aria-hidden="true" />
      <div className="site-footer__grid">
        <div>
          <Wordmark />
          <p className="site-footer__tagline">{site.tagline}</p>
          <p className="site-footer__disclosure">{site.conceptDisclosure}</p>
        </div>
        <nav aria-label="Footer">
          <ul>
            <li><a href="/aura">Aura</a></li>
            <li><a href="/savour">Savour</a></li>
            <li><a href="/elixirs">Elixirs</a></li>
            <li><a href="/atelier">Atelier</a></li>
            <li><a href="/moments">Moments</a></li>
            <li><a href="/events">Events</a></li>
            <li><a href="/reservations">Reservations</a></li>
            <li><a href="/contact">Contact</a></li>
          </ul>
        </nav>
        <div>
          <ul>
            {site.phones.map((p) => (
              <li key={p.href}><a href={p.href}>{p.display}</a></li>
            ))}
            <li><a href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram</a></li>
            <li><a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">Directions</a></li>
          </ul>
        </div>
      </div>
      <p className="site-footer__sign">Sea You at the KAMARI!</p>
    </footer>
  );
}
