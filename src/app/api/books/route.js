import { NextResponse } from "next/server";

import { filterBooks, getFeaturedBooks } from "@/lib/books";

export const dynamic = "force-dynamic";

export async function GET(request) {
  const search = request.nextUrl.searchParams.get("search") ?? "";
  const category = request.nextUrl.searchParams.get("category") ?? "All";
  const featured = request.nextUrl.searchParams.get("featured") === "true";

  const data = featured
    ? await getFeaturedBooks()
    : await filterBooks({
        search,
        category,
      });

  return NextResponse.json(data);
}
