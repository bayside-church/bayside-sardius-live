import { NextRequest, NextResponse } from "next/server";
import { fetchCampusEvents } from "@/lib/sardius-api";

export async function GET(request: NextRequest) {
  const campusCode = request.nextUrl.searchParams.get("campus");

  if (!campusCode) {
    return NextResponse.json(
      { error: "Missing campus parameter" },
      { status: 400 }
    );
  }

  const events = await fetchCampusEvents(campusCode);
  return NextResponse.json({ events });
}
