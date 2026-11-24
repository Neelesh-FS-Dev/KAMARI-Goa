import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { navLinks, site } from "../content/site";
import { images } from "../content/media.generated";
import { Img } from "./Media";
import { setSmoothScrollPaused } from "../lib/smoothScroll";

export function Wordmark() {
  return (
    <Link to="/" className="wordmark">
      <span className="wordmark__name">KAMARI</span>
      <span className="wordmark__place">Goa</span>
    </Link>
  );
}

export function Header() {
  const [open, setOpen] = useState(false);
  const toggleRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const location = useLocation();

  // Body scroll lock, Escape, focus trap, and focus return while the overlay is open.
  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    setSmoothScrollPaused(true);
    const panel = panelRef.current;
    const toggle = toggleRef.current;
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>("a[href], button:not([disabled])") ?? []);
    focusables()[0]?.focus();

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        return;
      }
      if (e.key !== "Tab") return;
      const items = focusables();
      if (items.length === 0) return;
      const first = items[0]!;
      const last = items[items.length - 1]!;
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.body.style.overflow = prevOverflow;
      setSmoothScrollPaused(false);
      toggle?.focus();
    };
  }, [open]);

  return (
    <>
      <header className={`site-header${location.pathname === "/" ? "" : " is-solid"}`}>
        <Wordmark />
        <nav aria-label="Primary" className="site-header__nav">
          {navLinks.map((l) => (
            <NavLink key={l.to} to={l.to} className="site-header__link">
              {l.label}
            </NavLink>
          ))}
        </nav>
        <div className="site-header__actions">
          <Link to="/reservations" className="button button--small">
            Reserve
          </Link>
          <button
            ref={toggleRef}
            type="button"
            className="menu-toggle"
            aria-expanded={open}
            aria-controls="site-menu"
            onClick={() => setOpen((v) => !v)}
          >
            <span className="visually-hidden">{open ? "Close menu" : "Open menu"}</span>
            <span aria-hidden="true" className="menu-toggle__bars" />
          </button>
        </div>
      </header>

      <div
        id="site-menu"
        ref={panelRef}
        className={`menu-overlay${open ? " is-open" : ""}`}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        aria-hidden={!open}
        inert={!open}
      >
        <button type="button" className="menu-overlay__close" onClick={() => setOpen(false)} aria-label="Close menu">
          Close
        </button>
        <div className="menu-overlay__media" aria-hidden="true">
          <Img asset={images["courtyard"]} sizes="40vw" />
        </div>
        <div className="menu-overlay__inner">
          <ul className="menu-overlay__links">
            {navLinks.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="menu-overlay__link" onClick={() => setOpen(false)}>
                  <span>{l.label}</span>
                  <small>{l.sub}</small>
                </Link>
              </li>
            ))}
          </ul>
          <div className="menu-overlay__meta">
            <p>{site.positioning}</p>
            <ul>
              {site.phones.map((p) => (
                <li key={p.href}>
                  <a href={p.href}>{p.display}</a>
                </li>
              ))}
              <li>
                <a href={site.instagram} target="_blank" rel="noopener noreferrer">
                  Instagram
                </a>
              </li>
              <li>
                <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer">
                  Directions
                </a>
              </li>
            </ul>
            <Link to="/reservations" className="button" onClick={() => setOpen(false)}>
              Reserve your experience
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
