"use client";

import { useCountdown } from "@/hooks/useCountdown";

interface CountdownTimerProps {
  target: Date | null;
}

export default function CountdownTimer({ target }: CountdownTimerProps) {
  const { days, hours, minutes, seconds, isExpired } = useCountdown(target);

  if (!target || isExpired) return null;

  return (
    <div className="fixed right-0 bottom-0 left-0 z-40">
      {/* Red top border */}
      <div className="h-[2px] bg-gradient-to-r from-transparent via-bs-accent/60 to-transparent" />

      <div className="bg-black/70 backdrop-blur-xl">
        <div className="mx-auto flex max-w-7xl items-center justify-center gap-6 px-5 py-4 sm:gap-8 sm:px-8">
          <span className="hidden text-[11px] font-bold tracking-[0.3em] text-bs-accent uppercase sm:block">
            Live In
          </span>

          <div className="flex items-center gap-3 sm:gap-4">
            {days > 0 && (
              <>
                <DigitBox value={days} label="Days" />
                <Colon />
              </>
            )}
            <DigitBox value={hours} label="Hrs" />
            <Colon />
            <DigitBox value={minutes} label="Min" />
            <Colon />
            <DigitBox value={seconds} label="Sec" />
          </div>
        </div>
      </div>
    </div>
  );
}

function DigitBox({ value, label }: { value: number; label: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="text-2xl font-bold tabular-nums tracking-tight text-white sm:text-3xl">
        {String(value).padStart(2, "0")}
      </span>
      <span className="text-[9px] font-semibold tracking-[0.15em] text-white/25 uppercase">
        {label}
      </span>
    </div>
  );
}

function Colon() {
  return (
    <span className="mb-4 text-xl font-light text-bs-accent/50 select-none sm:text-2xl">:</span>
  );
}
