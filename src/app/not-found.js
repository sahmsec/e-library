import Link from "next/link";

export default function NotFound() {
  return (
    <section className="mx-auto flex w-full max-w-3xl flex-1 items-center justify-center py-16">
      <div className="library-card rounded-[2.25rem] border border-white/70 p-10 text-center">
        <p className="text-sm uppercase tracking-[0.28em] text-library-copper">
          Page not found
        </p>
        <h1 className="font-display mt-4 text-5xl font-semibold text-library-ink">
          This shelf does not exist.
        </h1>
        <p className="mt-4 text-sm leading-7 text-library-ink/65">
          The route you requested could not be found. Head back to the catalog
          or the home page.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Link
            href="/"
            className="btn rounded-full border-none bg-library-ink px-6 text-white hover:bg-[#091626]"
          >
            Home
          </Link>
          <Link
            href="/books"
            className="btn rounded-full border border-library-ink/10 bg-white px-6 text-library-ink hover:bg-library-cream"
          >
            All Books
          </Link>
        </div>
      </div>
    </section>
  );
}
