// Helpers de agenda: combinan la grilla horaria fija con lo que la admin
// configure desde el panel (días cerrados, feriados, horarios puntuales
// bloqueados y horarios extra) para saber qué se puede reservar.

import { BASE_TIME_SLOTS } from "../data/initialData";

// Día de la semana (0=Domingo ... 6=Sábado) de una fecha "YYYY-MM-DD",
// calculado en horario local para evitar el corrimiento de un día que da
// `new Date("YYYY-MM-DD")` al interpretarse como UTC.
export function getWeekday(dateStr) {
  if (!dateStr) return null;
  const [y, m, d] = dateStr.split("-").map(Number);
  return new Date(y, m - 1, d).getDay();
}

export function isWeekdayBlocked(dateStr, settings) {
  const weekday = getWeekday(dateStr);
  return (settings?.blockedWeekdays || []).includes(weekday);
}

export function isDateFullyBlocked(dateStr, settings) {
  return (settings?.blockedDates || []).includes(dateStr);
}

// ¿Se puede reservar algo ese día? (día habilitado y no es feriado/cierre puntual)
export function isDateBookable(dateStr, settings) {
  if (!dateStr || !settings) return false;
  if (isWeekdayBlocked(dateStr, settings)) return false;
  if (isDateFullyBlocked(dateStr, settings)) return false;
  return true;
}

// Arma los horarios finales disponibles para una fecha: la grilla base cada 2hs
// menos los horarios puntuales bloqueados, más los horarios extra habilitados.
export function getSlotsForDate(dateStr, settings) {
  if (!dateStr || !settings || !isDateBookable(dateStr, settings)) return [];

  const blockedSet = new Set(settings.blockedSlots || []);
  const base = BASE_TIME_SLOTS.filter((time) => !blockedSet.has(`${dateStr}_${time}`));

  const extra = (settings.extraSlots || [])
    .filter((key) => key.startsWith(`${dateStr}_`))
    .map((key) => key.split("_")[1])
    .filter((time) => time && !base.includes(time) && !blockedSet.has(`${dateStr}_${time}`));

  return [...base, ...extra].sort();
}
