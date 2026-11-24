import { useEffect } from "react";
import { site } from "../content/site";

// Sets a unique title and description. Robots noindex is set in index.html while the site is private.
export function useDocumentMeta(title: string, description: string) {
  useEffect(() => {
    document.title = `${title} · ${site.name}`;
    let meta = document.querySelector<HTMLMetaElement>('meta[name="description"]');
    if (!meta) {
      meta = document.createElement("meta");
      meta.name = "description";
      document.head.appendChild(meta);
    }
    meta.content = description;
  }, [title, description]);
}
