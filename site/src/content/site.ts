// Centralized business facts. Only documented information lives here.
// Anything not verified is typed as `null` or marked `verified: false` and is rendered as "to be confirmed".

export const site = {
  name: "KAMARI Goa",
  tagline: "Sea You at the KAMARI!",
  positioning: "Sunsets. Sounds. Sensations.",
  location: "Goa, India",
  timezone: "Asia/Kolkata",
  // Independent creative proposal. Not an official KAMARI website.
  conceptDisclosure:
    "This is an independent creative concept by a third party, not an official KAMARI website. It has not been commissioned or approved by KAMARI.",
  noindex: true, // private deployment; flip only after written authorization
  instagram: "https://www.instagram.com/kamarigoa/",
  mapsUrl: "https://maps.app.goo.gl/nzXK4AVq6rtWs9TW6",
  phones: [
    { label: "Reservations line 1", display: "+91 99999 62123", href: "tel:+919999962123" },
    { label: "Reservations line 2", display: "+91 99999 71123", href: "tel:+919999971123" },
  ],
  address: {
    line: "128/20, Dmello Vaddo, Goa",
    verified: false, // partial address; full address requires verification
    note: "Partial address. Full address to be verified with KAMARI before publication.",
  },
  // Opening hours were not supplied. Keep null so nothing is invented.
  openingHours: null as string | null,
  // Reservation destination. `demo` means nothing is sent anywhere; the form says so.
  reservations: {
    mode: "demo" as "demo" | "endpoint",
    endpoint: null as string | null,
  },
  // WhatsApp is not verified for either number, so it is not offered.
  whatsapp: null as string | null,
} as const;

export const navLinks = [
  { to: "/aura", label: "Aura", sub: "The Experience" },
  { to: "/savour", label: "Savour", sub: "Food" },
  { to: "/elixirs", label: "Elixirs", sub: "Drinks" },
  { to: "/atelier", label: "Atelier", sub: "The Space" },
  { to: "/moments", label: "Moments", sub: "Gallery" },
  { to: "/events", label: "Events", sub: "Music & performances" },
] as const;
