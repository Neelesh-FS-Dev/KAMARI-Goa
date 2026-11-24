import { site } from "./site";

// Editable event model. An event is shown only when `publication` is "published"
// and its details were confirmed. No event is pre-filled: none are verified yet.
export interface KamariEvent {
  slug: string;
  title: string;
  publication: "draft" | "published";
  date: string; // YYYY-MM-DD in the venue's local timezone
  startTime: string; // HH:mm (24h), venue local
  endTime?: string;
  description: string;
  image?: string; // key into media.images
  video?: string; // key into media.videos
  performers: string[]; // confirmed performers only
  ticketInfo?: string; // only when confirmed
  booking?: { label: string; href: string };
}

export const events: KamariEvent[] = [];

export type EventStatus = "upcoming" | "past";

// Classifies in the venue's timezone so "upcoming" and "past" match Goa time.
export function eventStatus(event: KamariEvent, now: Date = new Date()): EventStatus {
  const local = new Intl.DateTimeFormat("sv-SE", {
    timeZone: site.timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  }).format(now); // "YYYY-MM-DD HH:mm"
  const nowKey = local.replace(" ", "T");
  const endKey = `${event.date}T${event.endTime ?? event.startTime}`;
  return endKey < nowKey ? "past" : "upcoming";
}

export function publishedEvents(now?: Date) {
  const visible = events.filter((e) => e.publication === "published");
  return {
    upcoming: visible.filter((e) => eventStatus(e, now) === "upcoming").sort((a, b) => (a.date + a.startTime).localeCompare(b.date + b.startTime)),
    past: visible.filter((e) => eventStatus(e, now) === "past").sort((a, b) => (b.date + b.startTime).localeCompare(a.date + a.startTime)),
  };
}
