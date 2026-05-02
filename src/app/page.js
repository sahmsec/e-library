import Image from "next/image";
import Link from "next/link";
import { ArrowRight, Sparkles } from "lucide-react";

import BookCard from "@/components/BookCard";
import MemberStoriesCarousel from "@/components/MemberStoriesCarousel";
import {
  bookCategories,
  getFeaturedBooks,
  marqueeItems,
  memberStories,
  readerHighlights,
} from "@/lib/books";
import { getAvailableCopies, hasActiveBorrow } from "@/lib/borrows";
import { getAuthSession } from "@/lib/session";

export default async function Home() {
  const session = await getAuthSession();

  const featuredBooks = await Promise.all(
    getFeaturedBooks().map(async (book) => {
      const [copiesLeft, alreadyBorrowed] = await Promise.all([
        getAvailableCopies(book.id),
        session ? hasActiveBorrow(session.user.id, book.id) : false,
      ]);

      return {
        ...book,
        copiesLeft,
        alreadyBorrowed,
      };
    }),
  );

  const heroBook = featuredBooks[0] ?? null;
  const supportingBooks = featuredBooks.slice(1, 4);

  return (
    <div className="space-y-10 pb-6">
      <section className="hero-panel relative overflow-hidden rounded-[2.5rem] px-6 py-10 text-white sm:px-10 sm:py-14 lg:px-14 lg:py-16">
        <div className="absolute -right-8 top-8 h-44 w-44 rounded-full bg-white/10 blur-2xl" />
        <div className="absolute bottom-0 left-0 h-52 w-52 rounded-full bg-library-copper/25 blur-3xl" />

        <div className="relative grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-center">
          <div className="space-y-6 self-center">
            <span className="inline-flex rounded-full border border-white/15 bg-white/10 px-4 py-2 text-xs uppercase tracking-[0.34em] text-library-sand">
              Digital library
            </span>

            <div className="space-y-4">
              <h1 className="font-display max-w-3xl text-5xl font-semibold leading-tight sm:text-6xl">
                Browse, borrow, and manage books online.
              </h1>
              <p className="max-w-2xl text-base leading-8 text-white/78 sm:text-lg">
                Search the catalog, check availability, and keep track of your
                borrowed titles from one secure account.
              </p>
            </div>

            <div className="flex flex-wrap gap-4">
              <Link
                href="/books"
                className="btn h-14 rounded-full border-none bg-library-copper px-6 text-white shadow-xl shadow-library-copper/30 hover:bg-[#a4572d]"
              >
                Browse Books
                <ArrowRight className="size-4" />
              </Link>

              <Link
                href="/profile"
                className="btn h-14 rounded-full border border-white/15 bg-white/10 px-6 text-white hover:bg-white/15"
              >
                My Profile
              </Link>
            </div>
          </div>

          <div className="mx-auto w-full max-w-md">
            {heroBook ? (
              <div className="rounded-[2rem] border border-white/10 bg-white/10 p-5 shadow-2xl shadow-black/15 backdrop-blur-sm">
                <div className="flex items-center justify-between gap-4">
                  <div>
                    <p className="text-xs uppercase tracking-[0.28em] text-white/55">
                      Featured Title
                    </p>
                    <h2 className="font-display mt-2 text-3xl font-semibold text-white">
                      Available now
                    </h2>
                  </div>

                  <span className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-xs font-semibold uppercase tracking-[0.24em] text-library-sand">
                    {heroBook.category}
                  </span>
                </div>

                <div className="mt-5 grid gap-5 sm:grid-cols-[148px_minmax(0,1fr)]">
                  <Image
                    src={heroBook.image_url}
                    alt={`${heroBook.title} cover`}
                    width={148}
                    height={220}
                    className="h-56 w-full rounded-[1.5rem] object-cover shadow-lg shadow-black/20"
                  />

                  <div className="space-y-3">
                    <p className="text-xs uppercase tracking-[0.24em] text-library-sand">
                      {heroBook.author}
                    </p>
                    <h3 className="font-display text-3xl font-semibold text-white">
                      {heroBook.title}
                    </h3>
                    <p className="text-sm leading-7 text-white/68">
                      {heroBook.description.slice(0, 140)}...
                    </p>

                    <div className="flex flex-wrap gap-2 pt-1">
                      <span className="rounded-full bg-library-sand px-4 py-2 text-sm font-semibold text-library-ink">
                        {heroBook.copiesLeft}{" "}
                        {heroBook.copiesLeft === 1 ? "copy" : "copies"} available
                      </span>
                      <Link
                        href={`/books/${heroBook.id}`}
                        className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-semibold text-white transition hover:bg-white/15"
                      >
                        View details
                        <ArrowRight className="size-4" />
                      </Link>
                    </div>
                  </div>
                </div>

                {supportingBooks.length ? (
                  <div className="mt-5 border-t border-white/10 pt-4">
                    <p className="text-xs uppercase tracking-[0.28em] text-white/50">
                      Readers also explore
                    </p>
                    <div className="mt-3 grid gap-2">
                      {supportingBooks.map((book) => (
                        <Link
                          key={book.id}
                          href={`/books/${book.id}`}
                          className="flex items-center justify-between rounded-[1.25rem] border border-white/10 bg-white/8 px-4 py-3 text-sm transition hover:bg-white/12"
                        >
                          <span className="font-semibold text-white">
                            {book.title}
                          </span>
                          <span className="text-library-sand">
                            {book.category}
                          </span>
                        </Link>
                      ))}
                    </div>
                  </div>
                ) : null}
              </div>
            ) : null}
          </div>
        </div>
      </section>

      <section className="marquee-shell rounded-full border border-library-ink/10 bg-white/85 px-4 py-3 shadow-sm">
        <div className="marquee-track gap-8 text-sm font-semibold uppercase tracking-[0.28em] text-library-ink/70">
          {[...marqueeItems, ...marqueeItems].map((item, index) => (
            <span key={`${item}-${index}`} className="shrink-0">
              {item}
            </span>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-3">
            <p className="text-sm uppercase tracking-[0.28em] text-library-copper">
              Featured Books
            </p>
            <h2 className="font-display text-4xl font-semibold text-library-ink">
              Four shelf picks readers keep returning to.
            </h2>
          </div>

          <Link
            href="/books"
            className="inline-flex items-center gap-2 text-sm font-semibold text-library-ink"
          >
            View the full collection
            <ArrowRight className="size-4" />
          </Link>
        </div>

        <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
          {featuredBooks.map((book) => (
            <BookCard
              key={book.id}
              book={book}
              compact
              actionLabel="Details"
              showBorrowButton
              copiesLeft={book.copiesLeft}
              alreadyBorrowed={book.alreadyBorrowed}
            />
          ))}
        </div>
      </section>

      <section className="grid gap-6 lg:grid-cols-[0.95fr_1.05fr]">
        <div className="library-card rounded-[2.25rem] border border-white/70 p-8">
          <p className="text-sm uppercase tracking-[0.28em] text-library-copper">
            Reading Paths
          </p>
          <h2 className="font-display mt-4 text-4xl font-semibold text-library-ink">
            Filter shelves by the mood or mindset you’re in.
          </h2>

          <div className="mt-8 grid gap-4">
            {bookCategories
              .filter((category) => category !== "All")
              .map((category) => (
                <Link
                  key={category}
                  href={`/books?category=${category}`}
                  className="group flex items-center justify-between rounded-[1.5rem] border border-library-ink/10 bg-white px-5 py-4 transition hover:border-library-copper/40 hover:shadow-lg"
                >
                  <div>
                    <p className="font-display text-2xl font-semibold text-library-ink">
                      {category}
                    </p>
                    <p className="text-sm text-library-ink/65">
                      Explore the latest {category.toLowerCase()} titles.
                    </p>
                  </div>
                  <ArrowRight className="size-5 text-library-copper transition group-hover:translate-x-1" />
                </Link>
              ))}
          </div>
        </div>

        <div className="grid gap-4">
          {readerHighlights.map((item) => (
            <article
              key={item.title}
              className="library-card rounded-[2rem] border border-white/70 p-7"
            >
              <div className="flex items-center gap-3">
                <span className="flex size-11 items-center justify-center rounded-full bg-library-ink text-white">
                  <Sparkles className="size-5" />
                </span>
                <h3 className="font-display text-3xl font-semibold text-library-ink">
                  {item.title}
                </h3>
              </div>
              <p className="mt-4 text-sm leading-7 text-library-ink/70">
                {item.description}
              </p>
            </article>
          ))}
        </div>
      </section>

      <section className="space-y-6">
        <div className="space-y-3">
          <p className="text-sm uppercase tracking-[0.28em] text-library-copper">
            Member Notes
          </p>
          <h2 className="font-display text-4xl font-semibold text-library-ink">
            A few words from the people already using the shelves.
          </h2>
        </div>
        <MemberStoriesCarousel stories={memberStories} />
      </section>
    </div>
  );
}
