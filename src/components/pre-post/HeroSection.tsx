"use client";

import { CampusConfig, UpcomingService } from "@/lib/types";
import OnDemandButton from "./OnDemandButton";
import SocialIcons from "./SocialIcons";

interface HeroSectionProps {
  campus: CampusConfig;
  upcomingEvents: UpcomingService[];
}

export default function HeroSection({ campus, upcomingEvents }: HeroSectionProps) {
  return (
    <section className="relative flex min-h-dvh items-center px-5 pt-16 pb-32 sm:px-8">
      <div className="mx-auto grid w-full max-w-7xl grid-cols-1 items-center gap-12 lg:grid-cols-2">
        {/* Left column — type-forward hero */}
        <div className="relative">
          {/* Red accent bar */}
          <div className="absolute -left-5 top-0 hidden h-full w-1 rounded-full bg-gradient-to-b from-bs-accent via-bs-accent/40 to-transparent sm:-left-8 lg:block" />

          <p className="mb-5 text-[11px] font-bold tracking-[0.3em] text-bs-accent uppercase">
            {campus.label} Campus
          </p>

          <h1 className="text-[clamp(3rem,8vw,6.5rem)] leading-[0.9] font-extralight tracking-[-0.03em] text-white">
            hope
            <span className="text-white/20"> + </span>
            <br />
            <span className="font-semibold">
              encouragement
            </span>
          </h1>

          <p className="mt-8 max-w-md text-base leading-relaxed text-white/40">
            Join us for worship and teaching at Bayside Church{" "}
            {campus.label}. Whether it&apos;s your first time or your
            hundredth, we&apos;d love to have you.
          </p>

          <div className="mt-10 flex items-center gap-5">
            <OnDemandButton url={campus.onDemandUrl} />
            <SocialIcons campus={campus} />
          </div>
        </div>

        {/* Right column — info card */}
        <div className="flex justify-center lg:justify-end">
          <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] backdrop-blur-sm">
            {/* Card header */}
            <div className="border-b border-white/[0.06] bg-bs-accent/10 px-7 py-5">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-bs-accent/20">
                  <svg className="h-5 w-5 text-bs-accent" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-sm font-semibold text-white">
                    Upcoming Events
                  </h2>
                  <p className="text-xs text-white/40">Pacific Time</p>
                </div>
              </div>
            </div>

            {/* Card body — upcoming events grouped by day */}
            <div className="px-7 py-5">
              {upcomingEvents.length > 0 ? (
                <div className="space-y-3">
                  {Object.entries(
                    upcomingEvents.reduce<Record<string, typeof upcomingEvents>>(
                      (groups, event) => {
                        (groups[event.day] ??= []).push(event);
                        return groups;
                      },
                      {}
                    )
                  ).map(([day, events]) => (
                    <div
                      key={day}
                      className="flex items-center justify-between gap-4"
                    >
                      <span className="text-sm font-medium text-white/70">
                        {day}
                      </span>
                      <span className="text-sm tabular-nums text-white/50">
                        {events.map((e) => e.time).join(" & ")}
                      </span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-white/30">
                  No upcoming events scheduled.
                </p>
              )}
            </div>

            {/* Card footer */}
            <div className="border-t border-white/[0.06] px-7 py-4">
              <a
                href={campus.website}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-medium text-white/40 transition-colors hover:text-white/70"
              >
                Visit {campus.label} website
                <svg className="h-3 w-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
