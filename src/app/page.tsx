import Link from "next/link";
import Image from "next/image";
import { campuses } from "@/lib/campuses";

export default function HomePage() {
  return (
    <main className="relative flex min-h-dvh flex-col items-center justify-center overflow-hidden px-5 py-20">
      {/* Background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-[#0e1520] via-bs-dark to-[#0a0e14]" />
      <div className="absolute -top-[20%] -left-[10%] -z-10 h-[60vh] w-[60vh] rounded-full bg-bs-accent opacity-[0.06] blur-[100px]" />
      <div className="absolute -right-[10%] bottom-0 -z-10 h-[40vh] w-[40vh] rounded-full bg-bs-accent opacity-[0.03] blur-[80px]" />

      {/* Decorative cross */}
      <div className="absolute top-1/2 left-1/2 -z-10 -translate-x-1/2 -translate-y-1/2 opacity-[0.02]">
        <svg width="500" height="500" viewBox="0 0 500 500" fill="none">
          <rect x="210" y="50" width="80" height="400" rx="6" fill="white" />
          <rect x="100" y="150" width="300" height="80" rx="6" fill="white" />
        </svg>
      </div>

      {/* Header */}
      <div className="mb-16 flex flex-col items-center gap-8 text-center">
        <Image
          src="/images/bayside-logo.svg"
          alt="Bayside Church"
          width={140}
          height={40}
          priority
          className="brightness-0 invert opacity-70"
        />
        <div>
          <h1 className="text-[clamp(3rem,8vw,5rem)] leading-[0.95] font-extralight tracking-tight text-white">
            Watch{" "}
            <span className="font-bold text-bs-accent">Live</span>
          </h1>
          <p className="mt-4 text-[15px] text-white/35">
            Select your campus to join a service
          </p>
        </div>
      </div>

      {/* Campus Grid */}
      <div className="grid w-full max-w-3xl grid-cols-2 gap-2 sm:grid-cols-4 sm:gap-3">
        {campuses.map((campus, i) => (
          <Link
            key={campus.slug}
            href={`/${campus.slug}`}
            className="group relative overflow-hidden rounded-2xl border border-white/[0.06] bg-white/[0.03] p-6 text-center transition-all duration-300 hover:border-bs-accent/30 hover:bg-bs-accent/[0.06]"
          >
            {/* Hover accent */}
            <div className="absolute inset-x-0 bottom-0 h-[2px] origin-left scale-x-0 bg-bs-accent transition-transform duration-300 group-hover:scale-x-100" />

            <span className="block text-[13px] font-semibold tracking-wide text-white/60 transition-colors duration-300 group-hover:text-white">
              {campus.label}
            </span>
          </Link>
        ))}
      </div>
    </main>
  );
}
