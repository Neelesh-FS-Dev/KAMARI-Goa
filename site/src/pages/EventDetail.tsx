import { useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { eventJsonLd } from "../lib/eventSchema";
import { eventStatus, events } from "../content/events";
import { images, videos } from "../content/media.generated";
import { site } from "../content/site";
import { Img, LoopVideo } from "../components/Media";
import { useDocumentMeta } from "../lib/meta";
import { formatEventDate } from "../lib/format";
import { NotFound } from "./NotFound";

export function EventDetail() {
  const { slug } = useParams();
  const event = events.find((e) => e.slug === slug && e.publication === "published");
  useDocumentMeta(event?.title ?? "Event", event?.description.slice(0, 155) ?? "KAMARI Goa event");

  // Event structured data is added only for a published event and removed when the page unmounts.
  useEffect(() => {
    if (!event) return;
    const tag = document.createElement("script");
    tag.type = "application/ld+json";
    tag.textContent = eventJsonLd(event);
    document.head.appendChild(tag);
    return () => tag.remove();
  }, [event]);

  if (!event) return <NotFound />;

  const status = eventStatus(event);
  const past = status === "past";
  const image = event.image ? images[event.image as keyof typeof images] : undefined;
  const video = event.video ? videos[event.video as keyof typeof videos] : undefined;

  return (
    <>
      <section className="band" aria-labelledby="event-title">
        <div className="band__media" aria-hidden="true">
          {video ? <LoopVideo asset={video} label="" eager /> : image ? <Img asset={image} priority alt="" /> : null}
        </div>
        <div className="band__scrim" aria-hidden="true" />
        <div className="band__content">
          <p className="eyebrow" style={{ color: "rgb(245 240 229 / 0.85)" }}>
            {past ? "Past event" : "Upcoming event"}
          </p>
          <h1 id="event-title">{event.title}</h1>
          <p className="lede" style={{ color: "rgb(245 240 229 / 0.85)", margin: "1.5rem auto 0" }}>
            {formatEventDate(event)}
          </p>
        </div>
      </section>

      <section className="section" aria-labelledby="about-title">
        <div className="section__inner split">
          <div>
            <h2 id="about-title">About the evening</h2>
            <p className="lede" style={{ marginTop: "1.5rem" }}>{event.description}</p>
            {event.performers.length > 0 && (
              <>
                <h3 style={{ marginTop: "2rem", font: "600 0.8125rem / 1 var(--font-ui)", letterSpacing: "0.16em", textTransform: "uppercase" }}>Performers</h3>
                <ul>{event.performers.map((p) => <li key={p}>{p}</li>)}</ul>
              </>
            )}
            {event.ticketInfo && <p>{event.ticketInfo}</p>}
            <p style={{ marginTop: "2rem" }}>
              <a className="link-arrow" href={site.mapsUrl} target="_blank" rel="noopener noreferrer">Get directions</a>
            </p>
          </div>
          <div>
            {past ? (
              <div className="empty-state">
                <p className="lede">This event has passed. Bookings are closed.</p>
                <Link className="link-arrow" to="/events">Back to the events journal</Link>
              </div>
            ) : event.booking ? (
              <a className="button" href={event.booking.href} target="_blank" rel="noopener noreferrer">{event.booking.label}</a>
            ) : (
              <div className="empty-state">
                <p className="lede">Booking details are not published for this event. Call KAMARI to ask.</p>
                <a className="button" href={site.phones[0]!.href}>Call {site.phones[0]!.display}</a>
              </div>
            )}
          </div>
        </div>
      </section>

      <p className="section" style={{ paddingTop: 0 }}>
        <Link className="link-arrow" to="/events">All events</Link>
      </p>
    </>
  );
}
