export interface ReservationValues {
  name: string;
  phone: string;
  date: string;
  time: string;
  guests: string;
  occasion: string;
  message: string;
  consent: boolean;
}

export type ReservationErrors = Partial<Record<keyof ReservationValues, string>>;

// Pure validation for the reservation enquiry. `today` is YYYY-MM-DD in the venue's timezone.
export function validateReservation(v: ReservationValues, today: string): ReservationErrors {
  const e: ReservationErrors = {};
  const name = v.name.trim();
  if (name.length < 2 || name.length > 80) e.name = "Enter your name (2 to 80 characters).";
  const digits = v.phone.replace(/[\s()-]/g, "");
  if (!/^(\+?91)?[6-9]\d{9}$/.test(digits)) e.phone = "Enter a valid Indian mobile number, for example +91 98xxx xxxxx.";
  if (!v.date) e.date = "Choose a preferred date.";
  else if (v.date < today) e.date = "Choose today or a later date.";
  if (!v.time) e.time = "Choose a preferred time.";
  const g = Number(v.guests);
  if (!Number.isInteger(g) || g < 1 || g > 20) e.guests = "Enter between 1 and 20 guests.";
  if (v.occasion.length > 60) e.occasion = "Keep the occasion under 60 characters.";
  if (v.message.length > 500) e.message = "Keep your message under 500 characters.";
  if (!v.consent) e.consent = "Please agree so KAMARI can reply to your enquiry.";
  return e;
}
