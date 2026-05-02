import Link from "next/link";
import { Search } from "lucide-react";

import BookCard from "@/components/BookCard";
import { bookCategories, filterBooks } from "@/lib/books";
import { cn } from "@/lib/utils";

function buildFilterHref(category, search) {
  const query = new URLSearchParams();

  if (category !== "All") {
    query.set("category", category);
  }

  if (search) {
    query.set("search", search);
  }

  const queryString = query.toString();
  return queryString ? `/books?${queryString}` : "/books";
}

export default async function BooksPage({ searchParams }) {
  const resolvedSearchParams = await searchParams;
  const search = resolvedSearchParams.search ?? "";
  const category = resolvedSearchParams.category ?? "All";
  const books = filterBooks({
    search,
    category,
  });

  return (
    <div className="space-y-8">
      <section className="library-card rounded-[2.25rem] border border-white/70 px-6 py-8 sm:px-8">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.28em] text-library-copper">
              All Books
            </p>
            <h1 className="font-display text-4xl font-semibold text-library-ink">
              Search the full digital catalog.
            </h1>
          </div>

          <form action="/books" className="flex w-full max-w-2xl gap-3">
            <input type="hidden" name="category" value={category} />
            <label className="input input-bordered flex h-14 flex-1 items-center gap-3 rounded-full border-library-ink/10 bg-white px-5">
              <Search className="size-4 text-library-copper" />
              <input
                type="text"
                name="search"
                defaultValue={search}
                className="grow"
                placeholder="Search for a book title"
              />
            </label>
            <button
              type="submit"
              className="btn h-14 rounded-full border-none bg-library-ink px-6 text-white hover:bg-[#091626]"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      <section className="grid gap-8 lg:grid-cols-[250px_minmax(0,1fr)]">
        <aside className="library-card h-fit rounded-[2rem] border border-white/70 p-6">
          <p className="text-sm uppercase tracking-[0.28em] text-library-copper">
            Categories
          </p>
          <div className="mt-5 grid gap-3">
            {bookCategories.map((item) => (
              <Link
                key={item}
                href={buildFilterHref(item, search)}
                className={cn(
                  "rounded-full px-4 py-3 text-sm font-semibold transition",
                  item === category
                    ? "bg-library-ink text-white shadow-lg shadow-library-ink/20"
                    : "border border-library-ink/10 bg-white text-library-ink/70 hover:border-library-copper/35 hover:text-library-ink",
                )}
              >
                {item}
              </Link>
            ))}
          </div>
        </aside>

        <div className="space-y-5">
          <p className="text-sm uppercase tracking-[0.28em] text-library-ink/55">
            {books.length} result{books.length === 1 ? "" : "s"} found
          </p>

          {books.length ? (
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-3">
              {books.map((book) => (
                <BookCard key={book.id} book={book} actionLabel="Details" />
              ))}
            </div>
          ) : (
            <div className="library-card rounded-[2rem] border border-white/70 p-10 text-center">
              <h2 className="font-display text-3xl font-semibold text-library-ink">
                No books matched that search.
              </h2>
              <p className="mt-3 text-sm leading-7 text-library-ink/65">
                Try another title or switch back to a broader category.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
