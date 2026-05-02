import Image from "next/image";
import Link from "next/link";

export default function BookCard({
  book,
  actionLabel = "View Details",
  compact = false,
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
            compact ? "h-40" : "h-48"
          }`}
        />
        <span className="badge absolute left-5 top-5 border-none bg-white/85 px-4 py-3 text-[11px] font-bold uppercase tracking-[0.28em] text-library-ink">
          {book.category}
        </span>
      </div>

      <div className="flex flex-1 flex-col p-6">
        <p className="text-sm font-semibold uppercase tracking-[0.24em] text-library-copper">
          {book.author}
        </p>
        <h3 className="font-display mt-3 text-3xl font-semibold text-library-ink">
          {book.title}
        </h3>
        <p className="mt-4 flex-1 text-sm leading-7 text-library-ink/72">
          {compact
            ? `${book.description.slice(0, 88)}...`
            : `${book.description.slice(0, 140)}...`}
        </p>

        <div className="mt-6">
          <Link
            href={`/books/${book.id}`}
            className="btn rounded-full border-none bg-library-ink px-5 text-white hover:bg-[#091626]"
          >
            {actionLabel}
          </Link>
        </div>
      </div>
    </article>
  );
}
