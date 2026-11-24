import { site } from "../content/site";

// Discreet bottom action bar for small screens. Respects safe-area insets via CSS.
export function MobileBar() {
  const call = site.phones[0]!;
  return (
    <nav className="mobile-bar" aria-label="Quick actions">
      <a href={call.href} className="mobile-bar__item">Call</a>
      <a href={site.mapsUrl} target="_blank" rel="noopener noreferrer" className="mobile-bar__item">Directions</a>
      <a href="/reservations" className="mobile-bar__item mobile-bar__item--primary">Reserve</a>
    </nav>
  );
}
