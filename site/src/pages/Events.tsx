import { Link } from "react-router-dom";
import { publishedEvents, type KamariEvent } from "../content/events";
import { images } from "../content/media.generated";
import { site } from "../content/site";
import { PageHero } from "../components/Page";
import { useDocumentMeta } from "../lib/meta";
import { formatEventDate } from "../lib/format";

export function Events() {
  useDocumentMeta("Events: Music & Performances", "Music, performances and special evenings at KAMARI Goa. Only confirmed events are listed.");
  const { upcoming, past } = publishedEvents();

  return (
    <>
      <PageHero
        eyebrow="Events · Sounds"
        title={<>Find your <em>rhythm.</em></>}
        lede="Music, performances and special evenings. Only events KAMARI has confirmed appear here."
        image={images["sign-wall-night"]}
      />

      <section className="section" aria-labelledby="upcoming-title">
        <div className="section__inner">
          <p className="eyebrow">Upcoming</p>
          <h2 id="upcoming-title">Coming up</h2>
          {upcoming.length === 0 ? (
            <div className="empty-state" style={{ marginTop: "2rem" }}>
              <p className="lede">
                No upcoming events are confirmed yet. Follow KAMARI on Instagram for announcements, or call to ask what is planned.
              </p>
              <p>
                <a className="button" href={site.instagram} target="_blank" rel="noopener noreferrer">Follow @kamarigoa</a>{" "}
                <a className="button button--ghost" href={site.phones[0]!.href}>Call {site.phones[0]!.display}</a>
              </p>
            </div>
          ) : (
            <EventList events={upcoming} />
          )}
        </div>
      </section>

      <section className="section section--night" aria-labelledby="past-title">
        <div className="section__inner">
          <p className="eyebrow">Past events</p>
          <h2 id="past-title">The journal</h2>
          {past.length === 0 ? (
            <p className="lede" style={{ marginTop: "1.5rem" }}>
              No past events are listed yet. Earlier evenings are shared on Instagram.
            </p>
          ) : (
            <EventList events={past} />
          )}
        </div>
      </section>
    </>
  );
}

export function EventList({ events }: { events: KamariEvent[] }) {
  return (
    <ul className="index-list" style={{ marginTop: "2rem" }}>
      {events.map((e) => (
        <li key={e.slug}>
          <Link to={`/events/${e.slug}`}>
            <span>{e.title}</span>
            <small>{formatEventDate(e)}</small>
          </Link>
        </li>
      ))}
    </ul>
  );
}
