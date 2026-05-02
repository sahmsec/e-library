import Image from "next/image";
import { notFound } from "next/navigation";

import { getBookById } from "@/lib/books";

export default async function BookDetailsPage({ params }) {
  const { id } = await params;
  const book = getBookById(id);

  if (!book) {
    notFound();
  }

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
              {book.available_quantity}{" "}
              {book.available_quantity === 1 ? "copy" : "copies"} left
            </div>
            <div className="rounded-full bg-library-mint/25 px-5 py-3 text-sm font-semibold text-library-ink">
              Borrow feature coming next
            </div>
          </div>

          <div className="mt-8">
            <button
              type="button"
              className="btn h-13 rounded-full border-none bg-library-copper px-6 text-white hover:bg-[#a4572d]"
            >
              Borrow This Book
            </button>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="library-card rounded-[1.75rem] border border-white/70 p-6">
            <p className="text-sm uppercase tracking-[0.28em] text-library-copper">
              Borrowing Note
            </p>
            <p className="mt-3 text-sm leading-7 text-library-ink/70">
              Borrowed titles will later appear in the profile page for each
              logged-in user.
            </p>
          </div>

          <div className="library-card rounded-[1.75rem] border border-white/70 p-6">
            <p className="text-sm uppercase tracking-[0.28em] text-library-copper">
              Book Access
            </p>
            <p className="mt-3 text-sm leading-7 text-library-ink/70">
              This details page is ready now, and authentication can be added
              after the UI is fully complete.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
