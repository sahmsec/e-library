import Image from "next/image";
import { notFound, redirect } from "next/navigation";

import BorrowButton from "@/components/BorrowButton";
import { getBookById } from "@/lib/books";
import { getAvailableCopies, hasActiveBorrow } from "@/lib/borrows";
import { getAuthSession } from "@/lib/session";
import { buildLoginRedirect } from "@/lib/utils";

export default async function BookDetailsPage({ params }) {
  const { id } = await params;
  const book = await getBookById(id);

  if (!book) {
    notFound();
  }

  const session = await getAuthSession();

  if (!session) {
    redirect(buildLoginRedirect(`/books/${id}`));
  }

  const [copiesLeft, alreadyBorrowed] = await Promise.all([
    getAvailableCopies(id),
    hasActiveBorrow(session.user.id, id),
  ]);

  return (
    <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="library-card h-fit rounded-[2.5rem] border border-white/70 p-5 lg:sticky lg:top-28">
        {book.image_url ? (
          <Image
            src={book.image_url}
            alt={`${book.title} cover`}
            width={600}
            height={900}
            className="w-full rounded-[2rem] object-cover"
          />
        ) : (
          <div className="flex aspect-[2/3] w-full items-center justify-center rounded-[2rem] bg-white text-sm font-semibold text-library-ink/60">
            No cover available
          </div>
        )}
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
                Borrowed
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
              Borrowed titles appear instantly in your profile, helping you keep
              track of what is already on your shelf.
            </p>
          </div>

          <div className="library-card rounded-[1.75rem] border border-white/70 p-6">
            <p className="text-sm uppercase tracking-[0.28em] text-library-copper">
              Private Route
            </p>
            <p className="mt-3 text-sm leading-7 text-library-ink/70">
              This page is protected so only authenticated readers can review
              sensitive availability and borrow actions.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
