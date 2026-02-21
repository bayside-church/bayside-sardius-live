export interface SardiusEvent {
  id: string;
  title: string;
  start: string; // ISO date string
  end: string; // ISO date string
  timezone: string;
  categories: string[];
  tags: string[];
  metadata: {
    eventImage?: string;
    preRoll?: number;
    postRoll?: number;
    subtitle?: string;
    defaultProfile?: string;
    asset?: Record<string, unknown>;
    [key: string]: unknown;
  };
  settings: {
    eventPlayerId?: string; // "dvr" or "noDvr"
    live?: {
      subtitles?: boolean;
      subtitleLanguages?: string[];
    };
    experience: {
      hideChat?: boolean;
      video: {
        source?: string;
        id?: string;
        type?: string; // "assetUID" | "asset"
        title?: string; // e.g. "GB - Livestream Primary"
      };
      notesPdf?: string;
      notesPdfTitle?: string;
      notesWord?: string;
      wordNotesTitle?: string;
      speaker?: string[];
      adImage1?: string;
      adLink1?: string;
      adImage2?: string;
      adLink2?: string;
      adImage3?: string;
      adLink3?: string;
      adImage4?: string;
      adLink4?: string;
      announcementMessage?: string;
      [key: string]: unknown;
    };
    [key: string]: unknown;
  };
}

export interface EventResource {
  title: string;
  url: string;
  type?: string; // "pdf" | "link"
}

export interface UpcomingService {
  id: string;
  title: string;
  start: string;
  day: string;   // e.g. "Sunday, Feb 22"
  time: string;  // e.g. "9:00am"
}

export type EventState = "pre" | "live" | "post";

export interface ComputedEventState {
  state: EventState;
  activeEvent: SardiusEvent | null;
  nextEvent: SardiusEvent | null;
  assetId: string | null;
  playerUrl: string | null;
  countdownTarget: Date | null;
  upcomingEvents: UpcomingService[];
  resources: EventResource[];
}

export interface CampusConfig {
  slug: string;
  code: string;
  label: string;
  fullName: string;
  pid: string; // Sardius player ID for this campus
  chatUrl?: string; // Sardius chat-only site URL
  onDemandUrl: string;
  website: string;
  social: {
    facebook?: string;
    instagram?: string;
    youtube?: string;
  };
}
