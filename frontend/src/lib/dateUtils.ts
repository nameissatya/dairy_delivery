/** Local midnight — match server (use IST/TZ on server for India). */
export function startOfDay(d: Date) {
  const x = new Date(d);
  x.setHours(0, 0, 0, 0);
  return x;
}

/** Same rule as backend: before 9 PM on the calendar day before delivery. */
export function isWithinSkipCutoff(isoDate: string) {
  const deliveryStart = startOfDay(new Date(isoDate));
  const cutoff = new Date(deliveryStart);
  cutoff.setDate(cutoff.getDate() - 1);
  cutoff.setHours(21, 0, 0, 0);
  return Date.now() < cutoff.getTime();
}
