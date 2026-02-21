"use client";

interface SardiusPlayerProps {
  playerUrl: string;
  title?: string;
}

export default function SardiusPlayer({ playerUrl, title }: SardiusPlayerProps) {
  return (
    <div className="relative w-full overflow-hidden rounded-xl bg-black shadow-[0_4px_40px_rgba(0,0,0,0.5)]">
      <iframe
        src={playerUrl}
        title={title || "Live Stream"}
        className="aspect-video w-full border-0"
        allow="autoplay; fullscreen; encrypted-media"
        allowFullScreen
      />
    </div>
  );
}
