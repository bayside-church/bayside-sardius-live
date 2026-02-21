import {
  SardiusEvent,
  EventState,
  ComputedEventState,
  UpcomingService,
  EventResource,
  CampusConfig,
} from "./types";
import { SARDIUS_ACCOUNT_ID } from "./campuses";

/**
 * Resolve the asset ID from an event's video configuration.
 */
export function resolveAssetId(event: SardiusEvent): string | null {
  const video = event.settings?.experience?.video;
  if (!video) return null;

  if (video.type === "assetUID" && video.source) {
    return video.source;
  }
  if (video.type === "asset" && video.id) {
    return video.id;
  }

  return video.source || video.id || null;
}

/**
 * Build the Sardius player iframe URL for a campus.
 * Pattern: https://players.sardius.media/{accountId}/dvr/asset/{pid}/?auto=true&muted=true
 */
export function buildPlayerUrl(campus: CampusConfig): string {
  return `https://players.sardius.media/${SARDIUS_ACCOUNT_ID}/dvr/asset/${campus.pid}/?auto=true&muted=true`;
}

/**
 * Extract resources (notes PDF, ad links) from event settings.
 */
export function extractResources(event: SardiusEvent): EventResource[] {
  const resources: EventResource[] = [];
  const exp = event.settings?.experience;
  if (!exp) return resources;

  if (exp.notesPdf && exp.notesPdf.trim() !== "" && exp.notesPdf.trim() !== " ") {
    resources.push({
      title: exp.notesPdfTitle?.trim() || "Sermon Notes",
      url: exp.notesPdf.trim(),
      type: "pdf",
    });
  }

  for (let i = 1; i <= 4; i++) {
    const link = (exp as Record<string, unknown>)[`adLink${i}`] as string | undefined;
    if (link && link.trim() !== "" && link.trim() !== " ") {
      resources.push({
        title: `Resource ${i}`,
        url: link.trim(),
        type: "link",
      });
    }
  }

  return resources;
}

/**
 * Check if an event is currently live.
 * Live = now >= (start - preRoll) && now <= end
 * Matches sibling project: preRoll only, no postRoll extension.
 */
export function isEventLive(event: SardiusEvent, now: Date = new Date()): boolean {
  const start = new Date(event.start);
  const end = new Date(event.end);
  const preRollMs = (event.metadata?.preRoll ?? 0) * 60 * 1000;

  return now >= new Date(start.getTime() - preRollMs) && now <= end;
}

/**
 * Find the next upcoming event (not yet in its live window).
 */
export function findNextEvent(
  events: SardiusEvent[],
  now: Date = new Date()
): SardiusEvent | null {
  const upcoming = events
    .filter((e) => {
      const start = new Date(e.start);
      const preRollMs = (e.metadata?.preRoll ?? 0) * 60 * 1000;
      return new Date(start.getTime() - preRollMs) > now;
    })
    .sort(
      (a, b) => new Date(a.start).getTime() - new Date(b.start).getTime()
    );

  return upcoming[0] || null;
}

/**
 * Extract individual upcoming events, filtering out past ones.
 * Sorted by start time ascending. Uses Pacific time for display.
 */
export function extractUpcomingEvents(
  events: SardiusEvent[],
  now: Date = new Date()
): UpcomingService[] {
  return events
    .filter((e) => new Date(e.end) > now)
    .sort((a, b) => new Date(a.start).getTime() - new Date(b.start).getTime())
    .map((e) => {
      const start = new Date(e.start);
      return {
        id: e.id,
        title: e.title,
        start: e.start,
        day: start.toLocaleDateString("en-US", {
          weekday: "long",
          month: "short",
          day: "numeric",
          timeZone: "America/Los_Angeles",
        }),
        time: start
          .toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "2-digit",
            hour12: true,
            timeZone: "America/Los_Angeles",
          })
          .replace(" ", "")
          .toLowerCase(),
      };
    });
}

/**
 * Compute the full event state for a campus given its events.
 */
export function computeEventState(
  events: SardiusEvent[],
  campus: CampusConfig,
  now: Date = new Date()
): ComputedEventState {
  // Check for a currently live event
  const liveEvent = events.find((e) => isEventLive(e, now));

  if (liveEvent) {
    return {
      state: "live",
      activeEvent: liveEvent,
      nextEvent: findNextEvent(
        events.filter((e) => e.id !== liveEvent.id),
        now
      ),
      assetId: resolveAssetId(liveEvent),
      playerUrl: buildPlayerUrl(campus),
      countdownTarget: null,
      upcomingEvents: extractUpcomingEvents(events, now),
      resources: extractResources(liveEvent),
    };
  }

  // Check for upcoming events
  const nextEvent = findNextEvent(events, now);

  if (nextEvent) {
    return {
      state: "pre",
      activeEvent: null,
      nextEvent,
      assetId: null,
      playerUrl: null,
      countdownTarget: new Date(nextEvent.start),
      upcomingEvents: extractUpcomingEvents(events, now),
      resources: [],
    };
  }

  // No events — post state
  return {
    state: "post",
    activeEvent: null,
    nextEvent: null,
    assetId: null,
    playerUrl: null,
    countdownTarget: null,
    upcomingEvents: extractUpcomingEvents(events, now),
    resources: [],
  };
}
