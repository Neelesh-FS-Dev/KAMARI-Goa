import { useId, useState, type FormEvent, type ReactNode } from "react";
import { site } from "../content/site";
import { validateReservation, type ReservationErrors, type ReservationValues } from "../lib/validate";

type Values = ReservationValues;
type Errors = ReservationErrors;

const empty: Values = { name: "", phone: "", date: "", time: "", guests: "2", occasion: "", message: "", consent: false };

type Status = { kind: "idle" } | { kind: "demo" } | { kind: "sent" } | { kind: "error"; text: string };

export function ReservationForm() {
  const [values, setValues] = useState<Values>(empty);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const [busy, setBusy] = useState(false);
  const id = useId();

  const set = <K extends keyof Values>(k: K, val: Values[K]) => setValues((p) => ({ ...p, [k]: val }));

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const today = new Date().toLocaleDateString("en-CA", { timeZone: site.timezone });
    const errs = validateReservation(values, today);
    setErrors(errs);
    if (Object.keys(errs).length > 0) {
      setStatus({ kind: "idle" });
      document.getElementById(`${id}-name`)?.focus();
      return;
    }
    if (site.reservations.mode === "demo" || !site.reservations.endpoint) {
      setStatus({ kind: "demo" });
      return;
    }
    setBusy(true);
    try {
      const res = await fetch(site.reservations.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...values, phone: values.phone.trim() }),
      });
      if (!res.ok) throw new Error(`Request failed (${res.status})`);
      setStatus({ kind: "sent" });
      setValues(empty);
    } catch {
      setStatus({ kind: "error", text: "We could not send your enquiry. Please call KAMARI instead." });
    } finally {
      setBusy(false);
    }
  }

  const field = (key: keyof Values) => ({
    id: `${id}-${key}`,
    "aria-invalid": errors[key] ? true : undefined,
    "aria-describedby": errors[key] ? `${id}-${key}-err` : undefined,
  });

  return (
    <form className="reserve-form" onSubmit={onSubmit} noValidate aria-labelledby={`${id}-title`}>
      <h3 id={`${id}-title`} className="reserve-form__title">Request a table</h3>
      <p className="reserve-form__note">
        Enquiry only. We do not show live availability, and a request is not a confirmed booking.
      </p>

      <div className="reserve-form__grid">
        <Field label="Guest name" err={errors.name} errId={`${id}-name-err`}>
          <input {...field("name")} name="name" autoComplete="name" value={values.name} onChange={(e) => set("name", e.target.value)} required />
        </Field>
        <Field label="Phone number" err={errors.phone} errId={`${id}-phone-err`} hint="For confirmation only.">
          <input {...field("phone")} name="phone" type="tel" autoComplete="tel" value={values.phone} onChange={(e) => set("phone", e.target.value)} required />
        </Field>
        <Field label="Preferred date" err={errors.date} errId={`${id}-date-err`}>
          <input {...field("date")} name="date" type="date" value={values.date} onChange={(e) => set("date", e.target.value)} required />
        </Field>
        <Field label="Preferred time" err={errors.time} errId={`${id}-time-err`}>
          <input {...field("time")} name="time" type="time" value={values.time} onChange={(e) => set("time", e.target.value)} required />
        </Field>
        <Field label="Number of guests" err={errors.guests} errId={`${id}-guests-err`}>
          <input {...field("guests")} name="guests" type="number" min={1} max={20} inputMode="numeric" value={values.guests} onChange={(e) => set("guests", e.target.value)} required />
        </Field>
        <Field label="Occasion (optional)" err={errors.occasion} errId={`${id}-occasion-err`}>
          <input {...field("occasion")} name="occasion" value={values.occasion} onChange={(e) => set("occasion", e.target.value)} />
        </Field>
      </div>

      <Field label="Message (optional)" err={errors.message} errId={`${id}-message-err`}>
        <textarea {...field("message")} name="message" rows={3} value={values.message} onChange={(e) => set("message", e.target.value)} />
      </Field>

      <label className="reserve-form__consent">
        <input type="checkbox" name="consent" checked={values.consent} onChange={(e) => set("consent", e.target.checked)} aria-invalid={errors.consent ? true : undefined} aria-describedby={errors.consent ? `${id}-consent-err` : undefined} />
        <span>I agree that KAMARI may contact me about this enquiry. My details are used only for that.</span>
      </label>
      {errors.consent && <p id={`${id}-consent-err`} className="field-error" role="alert">{errors.consent}</p>}

      <div className="reserve-form__actions">
        <button type="submit" className="button" disabled={busy}>
          {busy ? "Sending…" : "Send enquiry"}
        </button>
        <a className="button button--ghost" href={site.phones[0]!.href}>
          Call {site.phones[0]!.display}
        </a>
      </div>

      <div role="status" aria-live="polite" className="reserve-form__status">
        {status.kind === "demo" && (
          <p>
            <strong>Demonstration form.</strong> Nothing has been sent and no reservation exists. To reserve, please call KAMARI on{" "}
            <a href={site.phones[0]!.href}>{site.phones[0]!.display}</a> or{" "}
            <a href={site.phones[1]!.href}>{site.phones[1]!.display}</a>.
          </p>
        )}
        {status.kind === "sent" && <p>Thank you. KAMARI will reply to your enquiry. This is not a confirmed booking.</p>}
        {status.kind === "error" && <p className="field-error">{status.text}</p>}
      </div>
    </form>
  );
}

function Field({ label, err, errId, hint, children }: { label: string; err?: string; errId: string; hint?: string; children: ReactNode }) {
  return (
    <div className="field">
      <label className="field__label">
        <span>{label}</span>
        {children}
      </label>
      {hint && <span className="field__hint">{hint}</span>}
      {err && <p id={errId} className="field-error">{err}</p>}
    </div>
  );
}
