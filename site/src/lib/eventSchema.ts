import { site } from "../content/site";
import type { KamariEvent } from "../content/events";

// schema.org Event JSON-LD for one verified, published event. Times are venue local (IST, +05:30).
export function eventJsonLd(e: KamariEvent, cancelled = false): string {
  const start = `${e.date}T${e.startTime}:00+05:30`;
  const end = e.endTime ? `${e.date}T${e.endTime}:00+05:30` : undefined;
  return JSON.stringify({
    "@context": "https://schema.org",
    "@type": "Event",
    name: e.title,
    description: e.description,
    startDate: start,
    ...(end ? { endDate: end } : {}),
    eventStatus: cancelled ? "https://schema.org/EventCancelled" : "https://schema.org/EventScheduled",
    eventAttendanceMode: "https://schema.org/OfflineEventAttendanceMode",
    location: {
      "@type": "Place",
      name: site.name,
      address: { "@type": "PostalAddress", addressLocality: "Goa", addressRegion: "Goa", addressCountry: "IN" },
    },
    performer: e.performers.map((name) => ({ "@type": "PerformingGroup", name })),
  });
}
