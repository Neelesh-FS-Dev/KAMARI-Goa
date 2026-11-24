import { lazy, Suspense } from "react";
import { Route, Routes } from "react-router-dom";
import { Layout } from "./components/Layout";
import { Home } from "./pages/Home";
import { NotFound } from "./pages/NotFound";

// Route-level code splitting: only the home page is in the initial bundle.
const Aura = lazy(() => import("./pages/Aura").then((m) => ({ default: m.Aura })));
const Savour = lazy(() => import("./pages/Savour").then((m) => ({ default: m.Savour })));
const Elixirs = lazy(() => import("./pages/Elixirs").then((m) => ({ default: m.Elixirs })));
const Atelier = lazy(() => import("./pages/Atelier").then((m) => ({ default: m.Atelier })));
const Moments = lazy(() => import("./pages/Moments").then((m) => ({ default: m.Moments })));
const Events = lazy(() => import("./pages/Events").then((m) => ({ default: m.Events })));
const EventDetail = lazy(() => import("./pages/EventDetail").then((m) => ({ default: m.EventDetail })));
const Reservations = lazy(() => import("./pages/Reservations").then((m) => ({ default: m.Reservations })));
const Contact = lazy(() => import("./pages/Contact").then((m) => ({ default: m.Contact })));

function Fallback() {
  return <div className="section" aria-busy="true" aria-live="polite" style={{ minHeight: "60vh" }} />;
}

export default function App() {
  return (
    <Suspense fallback={<Fallback />}>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="aura" element={<Aura />} />
          <Route path="savour" element={<Savour />} />
          <Route path="elixirs" element={<Elixirs />} />
          <Route path="atelier" element={<Atelier />} />
          <Route path="moments" element={<Moments />} />
          <Route path="events" element={<Events />} />
          <Route path="events/:slug" element={<EventDetail />} />
          <Route path="reservations" element={<Reservations />} />
          <Route path="contact" element={<Contact />} />
          <Route path="*" element={<NotFound />} />
        </Route>
      </Routes>
    </Suspense>
  );
}
