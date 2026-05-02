import { randomUUID } from "node:crypto";

import { getBookById } from "@/lib/books";
import { getCollection } from "@/lib/mongodb";

function getBorrowCollection() {
  return getCollection("borrows");
}

export async function countActiveBorrows(bookId) {
  return getBorrowCollection().countDocuments({
    bookId,
  });
}

export async function getAvailableCopies(bookId) {
  const book = await getBookById(bookId);

  if (!book) {
    return 0;
  }

  const borrowedCount = await countActiveBorrows(bookId);
  return Math.max(0, book.available_quantity - borrowedCount);
}

export async function hasActiveBorrow(userId, bookId) {
  const record = await getBorrowCollection().findOne({
    userId,
    bookId,
  });

  return Boolean(record);
}

export async function borrowBook({
  bookId,
  user,
}) {
  const book = await getBookById(bookId);

  if (!book) {
    return {
      ok: false,
      status: 404,
      error: "That book could not be found.",
    };
  }

  const alreadyBorrowed = await hasActiveBorrow(user.id, bookId);

  if (alreadyBorrowed) {
    return {
      ok: false,
      status: 409,
      error: "You already borrowed this title.",
    };
  }

  const availableCopies = await getAvailableCopies(bookId);

  if (availableCopies < 1) {
    return {
      ok: false,
      status: 409,
      error: "This title is currently unavailable.",
    };
  }

  await getBorrowCollection().insertOne({
    id: randomUUID(),
    bookId,
    userId: user.id,
    userName: user.name,
    userEmail: user.email,
    borrowedAt: new Date(),
  });

  return {
    ok: true,
    title: book.title,
    availableCopies: availableCopies - 1,
  };
}

export async function returnBorrowedBook({
  userId,
  bookId,
}) {
  const record = await getBorrowCollection().findOne({
    userId,
    bookId,
  });

  if (!record) {
    return {
      ok: false,
      status: 404,
      error: "Borrow record not found.",
    };
  }

  await getBorrowCollection().deleteOne({
    userId,
    bookId,
  });

  return {
    ok: true,
    message: "Book returned successfully.",
  };
}

export async function getBorrowedBooksForUser(userId) {
  const records = await getBorrowCollection()
    .find({
      userId,
    })
    .sort({
      borrowedAt: -1,
    })
    .toArray();

  const results = await Promise.all(
    records.map(async (record) => {
      const book = await getBookById(record.bookId);

      if (!book) {
        return null;
      }

      return {
        ...record,
        book,
      };
    }),
  );

  return results.filter(Boolean);
}
