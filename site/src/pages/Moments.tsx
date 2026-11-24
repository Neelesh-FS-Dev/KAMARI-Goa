import { useRef, useState } from "react";
import { images, videos, type ImageAsset, type VideoAsset } from "../content/media.generated";
import { site } from "../content/site";
import { Img, LoopVideo } from "../components/Media";
import { PageHero, ReserveBand } from "../components/Page";
import { useDocumentMeta } from "../lib/meta";

type Category = "The Coast" | "Savour" | "Elixirs" | "Atelier";
type Item =
  | { kind: "image"; id: string; category: Category; asset: ImageAsset; span: string }
  | { kind: "video"; id: string; category: Category; asset: VideoAsset; span: string };

// Curated, art-directed order. Only reviewed clips with no identifiable people or overlays are used.
const items: Item[] = [
  { kind: "video", id: "v-terrace", category: "The Coast", asset: videos["terrace-sculpture-trim"], span: "gallery__item--tall" },
  { kind: "image", id: "i-shore", category: "The Coast", asset: images["shoreline"], span: "gallery__item--wide" },
  { kind: "image", id: "i-plate", category: "Savour", asset: images["plate-table"], span: "gallery__item--half" },
  { kind: "video", id: "v-plating", category: "Savour", asset: videos["plating"], span: "gallery__item--half" },
  { kind: "image", id: "i-pink", category: "Elixirs", asset: images["drink-pink"], span: "gallery__item--third" },
  { kind: "image", id: "i-bar", category: "Elixirs", asset: images["drink-bar"], span: "gallery__item--third" },
  { kind: "image", id: "i-dark", category: "Elixirs", asset: images["drink-dark"], span: "gallery__item--third" },
  { kind: "image", id: "i-sculpt", category: "Atelier", asset: images["sculpture-sea"], span: "gallery__item--wide" },
  { kind: "image", id: "i-sign", category: "Atelier", asset: images["sign-wall-night"], span: "gallery__item--tall" },
];

const filters: ("All" | Category)[] = ["All", "The Coast", "Savour", "Elixirs", "Atelier"];

export function Moments() {
  useDocumentMeta("Moments: Gallery", "A curated gallery of KAMARI Goa: ocean, food, drinks, architecture and evenings by the sea.");
  const [filter, setFilter] = useState<"All" | Category>("All");
  const [open, setOpen] = useState<Item | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const trigger = useRef<HTMLButtonElement | null>(null);
  const visible = items.filter((i) => filter === "All" || i.category === filter);

  function openItem(item: Item, el: HTMLButtonElement) {
    trigger.current = el;
    setOpen(item);
    dialogRef.current?.showModal();
  }
  function close() {
    dialogRef.current?.close();
    setOpen(null);
    trigger.current?.focus();
  }

  return (
    <>
      <PageHero
        eyebrow="Moments · Journal"
        title={<>Moments carried <em>by the tide.</em></>}
        lede="Ocean, food, drinks, the space and the evening, as seen from the table."
        image={images["shoreline"]}
      />

      <section className="section" aria-labelledby="journal-title">
        <div className="section__inner">
          <h2 id="journal-title" className="visually-hidden">Journal</h2>
          <ul className="filters" aria-label="Filter by category">
            {filters.map((f) => (
              <li key={f}>
                <button type="button" aria-pressed={filter === f} onClick={() => setFilter(f)}>{f}</button>
              </li>
            ))}
          </ul>

          <div className="gallery">
            {visible.map((item) => (
              <figure key={item.id} className={`gallery__item ${item.span}`} style={{ margin: 0 }}>
                <button
                  type="button"
                  style={{ display: "block", width: "100%", padding: 0, border: 0, background: "none", cursor: "zoom-in" }}
                  aria-label={`Open ${item.category}: ${item.asset.alt}`}
                  onClick={(e) => openItem(item, e.currentTarget)}
                >
                  {item.kind === "image" ? (
                    <Img asset={item.asset} sizes="(max-width: 767px) 100vw, 50vw" alt={item.asset.alt} />
                  ) : (
                    <LoopVideo asset={item.asset} label={item.asset.alt} />
                  )}
                </button>
                <figcaption className="gallery__caption">{item.category}</figcaption>
              </figure>
            ))}
          </div>

          <p className="lede" style={{ marginTop: "3rem" }}>
            More moments are shared on{" "}
            <a className="link-arrow" href={site.instagram} target="_blank" rel="noopener noreferrer">Instagram @kamarigoa</a>.
          </p>
        </div>
      </section>

      <dialog ref={dialogRef} className="lightbox" aria-label="Image viewer" onClose={() => setOpen(null)} onCancel={(e) => { e.preventDefault(); close(); }}>
        {open && (
          <div className="lightbox__frame">
            <div className="lightbox__bar">
              <span className="eyebrow" style={{ margin: 0, color: "rgb(245 240 229 / 0.7)" }}>{open.category}</span>
              <button type="button" onClick={close}>Close</button>
            </div>
            <div className="lightbox__stage">
              {open.kind === "image" ? (
                <Img asset={open.asset} sizes="90vw" alt={open.asset.alt} priority />
              ) : (
                <video src={open.asset.src} poster={open.asset.poster} controls playsInline autoPlay muted loop aria-label={open.asset.alt} />
              )}
            </div>
            <p className="lightbox__caption">{open.asset.alt}</p>
          </div>
        )}
      </dialog>

      <ReserveBand />
    </>
  );
}
