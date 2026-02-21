"use client";

import { SardiusEvent } from "@/lib/types";

interface MetadataOverlayProps {
  event: SardiusEvent;
}

export default function MetadataOverlay({ event }: MetadataOverlayProps) {
  return (
    <div className="absolute top-0 left-0 z-10 w-full bg-gradient-to-b from-black/70 to-transparent p-5 opacity-100 transition-opacity duration-300 sm:p-6 sm:opacity-0 sm:group-hover:opacity-100">
      <div className="flex items-center gap-4">
        {/* Live badge */}
        <div className="flex items-center gap-2 rounded-full bg-bs-accent px-4 py-1.5 shadow-[0_2px_12px_rgba(30,58,95,0.5)]">
          <div className="live-dot h-2 w-2 rounded-full bg-white" />
          <span className="text-[11px] font-bold tracking-[0.15em] text-white uppercase">
            Live
          </span>
        </div>

        <h2 className="text-sm font-medium text-white drop-shadow-lg">
          {event.title}
        </h2>
      </div>
    </div>
  );
}
