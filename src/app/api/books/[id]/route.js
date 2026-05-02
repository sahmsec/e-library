import { NextResponse } from "next/server";

import { getBookById } from "@/lib/books";

export const dynamic = "force-dynamic";

export async function GET(_request, { params }) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) {
    return NextResponse.json(
      {
        error: "Book not found.",
      },
      {
        status: 404,
      },
    );
  }

  return NextResponse.json(book);
}
