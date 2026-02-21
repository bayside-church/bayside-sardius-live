import { notFound } from "next/navigation";
import { Metadata } from "next";
import { getCampusBySlug, campuses } from "@/lib/campuses";
import { fetchCampusEvents } from "@/lib/sardius-api";
import { computeEventState } from "@/lib/event-utils";
import CampusPageClient from "./CampusPageClient";

interface CampusPageProps {
  params: Promise<{ campus: string }>;
}

export async function generateStaticParams() {
  return campuses.map((c) => ({ campus: c.slug }));
}

export async function generateMetadata({
  params,
}: CampusPageProps): Promise<Metadata> {
  const { campus: slug } = await params;
  const campus = getCampusBySlug(slug);

  if (!campus) {
    return { title: "Not Found — Bayside Church Live" };
  }

  return {
    title: `${campus.fullName} — Live`,
    description: `Watch ${campus.fullName} services live. Join us for worship, teaching, and community.`,
    openGraph: {
      title: `${campus.fullName} — Live`,
      description: `Watch ${campus.fullName} services live.`,
      type: "website",
    },
  };
}

export default async function CampusPage({ params }: CampusPageProps) {
  const { campus: slug } = await params;
  const campus = getCampusBySlug(slug);

  if (!campus) {
    notFound();
  }

  const events = await fetchCampusEvents(campus.code);
  const initialState = computeEventState(events, campus);

  return (
    <CampusPageClient
      campus={campus}
      initialState={initialState}
      initialEvents={events}
    />
  );
}
