"use client";

import { createContext, useState, useEffect, useCallback } from "react";
import { ComputedEventState, SardiusEvent, CampusConfig } from "@/lib/types";
import { computeEventState } from "@/lib/event-utils";

interface EventStateContextType extends ComputedEventState {
  events: SardiusEvent[];
  campusCode: string;
}

export const EventStateContext = createContext<EventStateContextType | null>(
  null
);

interface EventStateProviderProps {
  children: React.ReactNode;
  initialState: ComputedEventState;
  initialEvents: SardiusEvent[];
  campus: CampusConfig;
}

export default function EventStateProvider({
  children,
  initialState,
  initialEvents,
  campus,
}: EventStateProviderProps) {
  const [eventState, setEventState] =
    useState<ComputedEventState>(initialState);
  const [events, setEvents] = useState<SardiusEvent[]>(initialEvents);

  const pollEvents = useCallback(async () => {
    try {
      const res = await fetch(`/api/events?campus=${campus.code}`);
      if (!res.ok) return;

      const data = await res.json();
      const newEvents: SardiusEvent[] = data.events ?? [];
      setEvents(newEvents);

      const newState = computeEventState(newEvents, campus);
      setEventState(newState);
    } catch {
      // Silently fail — keep current state
    }
  }, [campus]);

  useEffect(() => {
    const interval = setInterval(pollEvents, 30_000);
    return () => clearInterval(interval);
  }, [pollEvents]);

  // Recompute state every second for countdown accuracy
  useEffect(() => {
    const interval = setInterval(() => {
      setEventState(computeEventState(events, campus));
    }, 1000);
    return () => clearInterval(interval);
  }, [events, campus]);

  return (
    <EventStateContext.Provider
      value={{ ...eventState, events, campusCode: campus.code }}
    >
      {children}
    </EventStateContext.Provider>
  );
}
