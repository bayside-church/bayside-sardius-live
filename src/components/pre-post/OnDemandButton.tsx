interface OnDemandButtonProps {
  url: string;
}

export default function OnDemandButton({ url }: OnDemandButtonProps) {
  return (
    <a
      href={url}
      target="_blank"
      rel="noopener noreferrer"
      className="group inline-flex items-center gap-3 rounded-full bg-white px-6 py-3 text-[13px] font-bold tracking-wide text-bs-dark uppercase transition-all duration-200 hover:bg-bs-cream hover:shadow-[0_4px_24px_rgba(255,255,255,0.15)]"
    >
      <svg
        className="h-4 w-4 text-bs-accent transition-transform duration-200 group-hover:scale-110"
        fill="currentColor"
        viewBox="0 0 20 20"
      >
        <path
          fillRule="evenodd"
          d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z"
          clipRule="evenodd"
        />
      </svg>
      Watch On Demand
    </a>
  );
}
