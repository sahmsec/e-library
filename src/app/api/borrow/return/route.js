import { NextResponse } from "next/server";

import { auth } from "@/lib/auth";
import { returnBorrowedBook } from "@/lib/borrows";

export async function POST(request) {
  const session = await auth.api.getSession({
    headers: request.headers,
  });

  if (!session) {
    return NextResponse.json(
      { error: "Please log in first." },
      { status: 401 },
    );
  }

  const body = await request.json();

  if (!body.bookId) {
    return NextResponse.json(
      { error: "Book id is required." },
      { status: 400 },
    );
  }

  const result = await returnBorrowedBook({
    userId: session.user.id,
    bookId: body.bookId,
  });

  if (!result.ok) {
    return NextResponse.json(
      { error: result.error },
      { status: result.status },
    );
  }

  return NextResponse.json({
    message: result.message,
  });
}
