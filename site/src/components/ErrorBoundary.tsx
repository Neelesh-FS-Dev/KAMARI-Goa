import { Component, type ErrorInfo, type ReactNode } from "react";
import { site } from "../content/site";

interface Props {
  children: ReactNode;
}
interface State {
  failed: boolean;
}

// Catches render errors on a route so the rest of the site (header, footer, contact) still works.
// Mounted with key={pathname} in Layout, so a failure never sticks across navigation.
export class ErrorBoundary extends Component<Props, State> {
  state: State = { failed: false };

  static getDerivedStateFromError(): State {
    return { failed: true };
  }

  componentDidCatch(error: Error, info: ErrorInfo) {
    // Production logging hook. Keep it free of personal data.
    console.error("Route render failed", error.message, info.componentStack?.split("\n")[1]?.trim());
  }

  render() {
    if (!this.state.failed) return this.props.children;
    return (
      <section className="section" aria-labelledby="err-title" style={{ minHeight: "60vh", display: "grid", alignContent: "center" }}>
        <div className="section__inner">
          <p className="eyebrow">Something went wrong</p>
          <h1 id="err-title">This page could not load.</h1>
          <p className="lede" style={{ marginTop: "1.5rem" }}>
            Please try again, or call KAMARI on {site.phones[0]!.display}.
          </p>
          <p style={{ marginTop: "2rem", display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
            <a className="button" href="/">Back to the coast</a>
            <a className="button button--ghost" href={site.phones[0]!.href}>Call KAMARI</a>
          </p>
        </div>
      </section>
    );
  }
}
