import { SardiusEvent } from "./types";
import { SARDIUS_ACCOUNT_ID } from "./campuses";

const CALENDAR_API_BASE = "https://api.prod-api.sardius.media/calendars";

/**
 * Fetch all events from the Sardius Calendar API.
 * Looks 7 days into the future for upcoming services.
 */
export async function fetchEvents(): Promise<SardiusEvent[]> {
  const start = new Date();
  start.setHours(0, 0, 0, 0);

  const end = new Date(start.getTime() + 7 * 24 * 60 * 60 * 1000);

  const url = new URL(
    `${CALENDAR_API_BASE}/${SARDIUS_ACCOUNT_ID}/all/sites`
  );
  url.searchParams.set("start", start.toISOString());
  url.searchParams.set("end", end.toISOString());
  url.searchParams.set("experience", "access_default");
  url.searchParams.set("ver", String(Date.now()));

  const res = await fetch(url.toString(), {
    next: { revalidate: 60 },
  });

  if (!res.ok) {
    console.error(`Sardius API error: ${res.status} ${res.statusText}`);
    return [];
  }

  const data = await res.json();

  // API returns a flat array of event objects
  if (Array.isArray(data)) {
    return data as SardiusEvent[];
  }

  return [];
}

/**
 * Filter events by campus code.
 * Campus is identified via the video title prefix, e.g. "GB - Livestream Primary"
 */
export function filterEventsByCampus(
  events: SardiusEvent[],
  campusCode: string
): SardiusEvent[] {
  const codeRegex = new RegExp(`\\b${campusCode}\\b`, "i");

  return events.filter((event) => {
    const videoTitle = event.settings?.experience?.video?.title || "";
    return codeRegex.test(videoTitle);
  });
}

/**
 * Fetch events filtered for a specific campus.
 */
export async function fetchCampusEvents(
  campusCode: string
): Promise<SardiusEvent[]> {
  const events = await fetchEvents();
  return filterEventsByCampus(events, campusCode);
}
