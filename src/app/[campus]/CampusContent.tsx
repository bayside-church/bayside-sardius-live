"use client";

import { useRef } from "react";
import { CampusConfig } from "@/lib/types";
import { useEventState } from "@/hooks/useEventState";
import Navbar from "@/components/layout/Navbar";
import BackgroundVideo from "@/components/shared/BackgroundVideo";
import HeroSection from "@/components/pre-post/HeroSection";
import CountdownTimer from "@/components/pre-post/CountdownTimer";
import SardiusPlayer from "@/components/live/SardiusPlayer";
import MetadataOverlay from "@/components/live/MetadataOverlay";
import SermonResources from "@/components/live/SermonResources";

interface CampusContentProps {
  campus: CampusConfig;
}

export default function CampusContent({ campus }: CampusContentProps) {
  const { state, activeEvent, playerUrl, countdownTarget, upcomingEvents, resources } =
    useEventState();
  const chatVer = useRef(Date.now());

  return (
    <>
      <Navbar currentCampus={campus} />

      {state === "live" && activeEvent && playerUrl ? (
        <main className="min-h-dvh bg-bs-dark px-5 pt-20 pb-12 sm:px-8">
          <div className="mx-auto max-w-7xl">
            {/* Player + Chat row */}
            <div className={`flex flex-col gap-4 ${campus.chatUrl ? "lg:flex-row" : ""}`}>
              {/* Player column */}
              <div className={`min-w-0 ${campus.chatUrl ? "lg:flex-1" : "mx-auto max-w-5xl w-full"}`}>
                <div className="group relative">
                  <SardiusPlayer playerUrl={playerUrl} title={activeEvent.title} />
                  <MetadataOverlay event={activeEvent} />
                </div>
              </div>

              {/* Chat column */}
              {campus.chatUrl && (
                <div className="h-[400px] overflow-hidden rounded-xl border border-white/[0.06] lg:h-auto lg:w-[340px] lg:flex-shrink-0">
                  <iframe
                    src={`${campus.chatUrl}?ver=${chatVer.current}`}
                    title="Live Chat"
                    className="h-full w-full border-0"
                    allow="clipboard-write"
                  />
                </div>
              )}
            </div>

            {/* Below player — event info */}
            <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
              <div>
                <div className="mb-2 flex items-center gap-3">
                  <div className="live-dot h-2.5 w-2.5 rounded-full bg-bs-accent" />
                  <span className="text-[11px] font-bold tracking-[0.2em] text-bs-accent uppercase">
                    Live Now
                  </span>
                </div>
                <h1 className="text-xl font-semibold text-white sm:text-2xl">
                  {activeEvent.title}
                </h1>
                <p className="mt-1 text-sm text-white/40">
                  {campus.fullName}
                </p>
              </div>

              <div className="flex gap-2">
                <a
                  href={campus.website}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="rounded-full bg-white/10 px-5 py-2 text-[13px] font-medium text-white/80 transition-all duration-200 hover:bg-white/15"
                >
                  Connect
                </a>
              </div>
            </div>

            {/* Resources */}
            {resources.length > 0 && (
              <div className="mt-8 border-t border-white/[0.06] pt-8">
                <SermonResources resources={resources} />
              </div>
            )}
          </div>
        </main>
      ) : (
        <main className="min-h-dvh">
          <BackgroundVideo />
          <HeroSection campus={campus} upcomingEvents={upcomingEvents} />
          <CountdownTimer target={countdownTarget} />
        </main>
      )}
    </>
  );
}
