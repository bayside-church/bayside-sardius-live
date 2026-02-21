"use client";

import { useContext } from "react";
import { EventStateContext } from "@/components/shared/EventStateProvider";

export function useEventState() {
  const context = useContext(EventStateContext);
  if (!context) {
    throw new Error("useEventState must be used within an EventStateProvider");
  }
  return context;
}
