import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { borrowBook } from "@/lib/borrows";

export async function POST(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json(
      {
        error: "Please log in to borrow this book.",
      },
      {
        status: 401,
      },
    );
  }

  const body = await request.json();

  if (!body.bookId) {
    return NextResponse.json(
      {
        error: "A book id is required.",
      },
      {
        status: 400,
      },
    );
  }

  const result = await borrowBook({
    bookId: body.bookId,
    user: session.user,
  });

  if (!result.ok) {
    return NextResponse.json(
      {
        error: result.error,
      },
      {
        status: result.status,
      },
    );
  }

  return NextResponse.json({
    message: `${result.title} has been added to your borrowed shelf.`,
    availableCopies: result.availableCopies,
  });
}
