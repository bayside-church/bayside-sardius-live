export default function CampusLoading() {
  return (
    <div className="flex min-h-dvh items-center justify-center bg-bs-dark">
      <div className="flex flex-col items-center gap-5">
        <div className="h-8 w-8 animate-spin rounded-full border-2 border-white/10 border-t-bs-accent" />
      </div>
    </div>
  );
}
