"use client";

import { CampusConfig, ComputedEventState, SardiusEvent } from "@/lib/types";
import EventStateProvider from "@/components/shared/EventStateProvider";
import CampusContent from "./CampusContent";

interface CampusPageClientProps {
  campus: CampusConfig;
  initialState: ComputedEventState;
  initialEvents: SardiusEvent[];
}

export default function CampusPageClient({
  campus,
  initialState,
  initialEvents,
}: CampusPageClientProps) {
  return (
    <EventStateProvider
      initialState={initialState}
      initialEvents={initialEvents}
      campus={campus}
    >
      <CampusContent campus={campus} />
    </EventStateProvider>
  );
}
