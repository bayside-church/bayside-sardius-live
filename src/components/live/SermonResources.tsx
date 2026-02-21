import { EventResource } from "@/lib/types";

interface SermonResourcesProps {
  resources: EventResource[];
}

export default function SermonResources({ resources }: SermonResourcesProps) {
  if (!resources || resources.length === 0) return null;

  return (
    <div>
      <h3 className="mb-4 text-[11px] font-bold tracking-[0.3em] text-white/25 uppercase">
        Resources
      </h3>
      <div className="flex flex-wrap gap-2">
        {resources.map((resource) => (
          <a
            key={resource.url}
            href={resource.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 rounded-full bg-white/[0.06] px-4 py-2 text-[13px] font-medium text-white/60 transition-all duration-200 hover:bg-white/10 hover:text-white"
          >
            {resource.type === "pdf" && (
              <svg className="h-3.5 w-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m2.25 0H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
              </svg>
            )}
            {resource.title}
          </a>
        ))}
      </div>
    </div>
  );
}
