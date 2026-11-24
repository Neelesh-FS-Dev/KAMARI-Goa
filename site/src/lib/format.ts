import { site } from "../content/site";
import type { KamariEvent } from "../content/events";

// Formats a verified event date and time in the venue's timezone.
export function formatEventDate(e: Pick<KamariEvent, "date" | "startTime" | "endTime">): string {
  const day = new Intl.DateTimeFormat("en-IN", {
    timeZone: site.timezone,
    weekday: "short",
    day: "numeric",
    month: "short",
    year: "numeric",
  }).format(new Date(`${e.date}T00:00:00+05:30`));
  return `${day} · ${e.startTime}${e.endTime ? `–${e.endTime}` : ""} IST`;
}
