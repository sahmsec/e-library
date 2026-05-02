import Image from "next/image";
import { notFound } from "next/navigation";

import BorrowButton from "@/components/BorrowButton";
import { getBookById } from "@/lib/books";
import { getAvailableCopies, hasActiveBorrow } from "@/lib/borrows";
import { getAuthSession } from "@/lib/session";

export default async function BookDetailsPage({ params }) {
  const { id } = await params;
  const book = getBookById(id);

  if (!book) {
    notFound();
  }

  const session = await getAuthSession();
  const copiesLeft = await getAvailableCopies(id);
  const alreadyBorrowed = session
    ? await hasActiveBorrow(session.user.id, id)
    : false;

  return (
    <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="library-card h-fit rounded-[2.5rem] border border-white/70 p-5 lg:sticky lg:top-28">
        <Image
          src={book.image_url}
          alt={`${book.title} cover`}
          width={600}
          height={900}
          className="w-full rounded-[2rem] object-cover"
        />
      </div>

      <div className="space-y-6">
        <div className="space-y-4">
          <span className="badge border-none bg-library-mint/30 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.28em] text-library-ink">
            {book.category}
          </span>

          <div>
            <p className="text-sm uppercase tracking-[0.28em] text-library-copper">
              {book.author}
            </p>
            <h1 className="font-display mt-3 text-5xl font-semibold text-library-ink">
              {book.title}
            </h1>
          </div>
        </div>

        <div className="library-card rounded-[2rem] border border-white/70 p-7">
          <p className="text-sm leading-8 text-library-ink/78">
            {book.description}
          </p>

          <div className="mt-6 flex flex-wrap items-center gap-4">
            <div className="rounded-full bg-library-ink px-5 py-3 text-sm font-semibold text-white">
              {copiesLeft} {copiesLeft === 1 ? "copy" : "copies"} left
            </div>
            {alreadyBorrowed ? (
              <div className="rounded-full bg-library-mint/25 px-5 py-3 text-sm font-semibold text-library-ink">
                Already in your borrowed shelf
              </div>
            ) : null}
          </div>

          <div className="mt-8">
            <BorrowButton
              bookId={book.id}
              copiesLeft={copiesLeft}
              alreadyBorrowed={alreadyBorrowed}
            />
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="library-card rounded-[1.75rem] border border-white/70 p-6">
            <p className="text-sm uppercase tracking-[0.28em] text-library-copper">
              Borrowing Note
            </p>
            <p className="mt-3 text-sm leading-7 text-library-ink/70">
              Borrowed titles appear instantly in your profile after a
              successful borrow.
            </p>
          </div>

          <div className="library-card rounded-[1.75rem] border border-white/70 p-6">
            <p className="text-sm uppercase tracking-[0.28em] text-library-copper">
              Account Check
            </p>
            <p className="mt-3 text-sm leading-7 text-library-ink/70">
              If a visitor is not logged in, clicking borrow sends them to the
              login page first.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
