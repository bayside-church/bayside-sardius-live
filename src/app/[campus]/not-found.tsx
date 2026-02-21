import Link from "next/link";

export default function CampusNotFound() {
  return (
    <div className="flex min-h-dvh flex-col items-center justify-center bg-bs-dark px-6 text-center">
      <p className="mb-3 text-[11px] font-bold tracking-[0.3em] text-bs-accent uppercase">
        404
      </p>
      <h1 className="mb-3 text-3xl font-light text-white">
        Campus Not Found
      </h1>
      <p className="mb-10 text-[15px] text-white/40">
        We couldn&apos;t find the campus you&apos;re looking for.
      </p>
      <Link
        href="/"
        className="rounded-full bg-bs-accent px-7 py-3 text-[13px] font-bold tracking-wide text-white uppercase transition-all duration-200 hover:bg-bs-accent-hover hover:shadow-[0_4px_20px_rgba(30,58,95,0.4)]"
      >
        Choose a Campus
      </Link>
    </div>
  );
}
