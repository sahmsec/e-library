import Image from "next/image";
import Link from "next/link";

import BorrowButton from "@/components/BorrowButton";

export default function BookCard({
  book,
  actionLabel = "View Details",
  compact = false,
  showBorrowButton = false,
  copiesLeft = 0,
  alreadyBorrowed = false,
}) {
  return (
    <article className="library-card flex h-full flex-col overflow-hidden rounded-[2rem] border border-white/70">
      <div className="relative overflow-hidden">
        <Image
          src={book.image_url}
          alt={`${book.title} cover`}
          width={600}
          height={400}
          className={`w-full object-cover object-top transition duration-500 hover:scale-[1.03] ${
            compact ? "h-32" : "h-40"
          }`}
        />
        <span className="badge absolute left-4 top-4 border-none bg-white/85 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.28em] text-library-ink">
          {book.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-semibold uppercase tracking-[0.24em] text-library-copper">
          {book.author}
        </p>

        <h3 className="font-display mt-2 text-2xl font-semibold text-library-ink">
          {book.title}
        </h3>

        <p className="mt-3 flex-1 text-sm leading-6 text-library-ink/72">
          {compact
            ? `${book.description.slice(0, 60)}...`
            : `${book.description.slice(0, 95)}...`}
        </p>

        {showBorrowButton ? (
          <p className="mt-3 text-sm font-semibold text-library-ink/70">
            {copiesLeft} {copiesLeft === 1 ? "copy" : "copies"} left
          </p>
        ) : null}

        <div className={showBorrowButton ? "mt-4 grid grid-cols-2 gap-3" : "mt-4"}>
          <Link
            href={`/books/${book.id}`}
            className="btn h-12 min-h-12 w-full rounded-full border-none bg-library-ink px-5 text-white hover:bg-[#091626]"
          >
            {actionLabel}
          </Link>

          {showBorrowButton ? (
            <BorrowButton
              bookId={book.id}
              copiesLeft={copiesLeft}
              alreadyBorrowed={alreadyBorrowed}
              label="Borrow"
              className="w-full"
            />
          ) : null}
        </div>
      </div>
    </article>
  );
}
