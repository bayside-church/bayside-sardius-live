"use client";

export default function BackgroundVideo() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Deep navy gradient base */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#0e1520] via-[#0b0e13] to-[#0a0e14]" />

      {/* Large navy glow — top left */}
      <div className="absolute -top-[20%] -left-[10%] h-[70vh] w-[70vh] rounded-full bg-[#1e3a5f] opacity-[0.08] blur-[120px]" />

      {/* Secondary glow — bottom right */}
      <div className="absolute -right-[5%] -bottom-[10%] h-[50vh] w-[50vh] rounded-full bg-[#1e3a5f] opacity-[0.05] blur-[100px]" />

      {/* Decorative cross — large, subtle watermark */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.025]">
        <svg width="600" height="600" viewBox="0 0 600 600" fill="none">
          <rect x="250" y="60" width="100" height="480" rx="8" fill="white" />
          <rect x="120" y="180" width="360" height="100" rx="8" fill="white" />
        </svg>
      </div>

      {/* Horizontal rule accent */}
      <div className="absolute top-[40%] left-0 h-px w-full bg-gradient-to-r from-transparent via-[#1e3a5f]/10 to-transparent" />
    </div>
  );
}
