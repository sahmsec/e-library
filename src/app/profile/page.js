import Image from "next/image";
import Link from "next/link";
import { Mail, PencilLine, UserRound } from "lucide-react";
import { redirect } from "next/navigation";

import { getBorrowedBooksForUser } from "@/lib/borrows";
import { getAuthSession } from "@/lib/session";
import { buildLoginRedirect, formatDate } from "@/lib/utils";

export default async function ProfilePage() {
  const session = await getAuthSession();

  if (!session) {
    redirect(buildLoginRedirect("/profile"));
  }

  const borrowedBooks = await getBorrowedBooksForUser(session.user.id);

  return (
    <div className="space-y-8">
      <section className="grid gap-6 lg:grid-cols-[0.85fr_1.15fr]">
        <div className="library-card rounded-[2.25rem] border border-white/70 p-8">
          <div className="flex items-center gap-4">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={session.user.image || "https://placehold.co/160x160?text=EL"}
              alt={`${session.user.name} avatar`}
              className="size-24 rounded-full object-cover ring-4 ring-white"
            />
            <div>
              <p className="text-sm uppercase tracking-[0.28em] text-library-copper">
                My Profile
              </p>
              <h1 className="font-display text-4xl font-semibold text-library-ink">
                {session.user.name}
              </h1>
            </div>
          </div>

          <div className="mt-8 grid gap-4">
            <div className="rounded-[1.5rem] bg-white/90 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-library-ink/45">
                Email
              </p>
              <p className="mt-2 text-sm font-semibold text-library-ink">
                {session.user.email}
              </p>
            </div>
            <div className="rounded-[1.5rem] bg-white/90 p-5">
              <p className="text-xs uppercase tracking-[0.28em] text-library-ink/45">
                User ID
              </p>
              <p className="mt-2 break-all text-sm font-semibold text-library-ink">
                {session.user.id}
              </p>
            </div>
          </div>

          <Link
            href="/profile/update"
            className="btn mt-8 rounded-full border-none bg-library-ink px-6 text-white hover:bg-[#091626]"
          >
            <PencilLine className="size-4" />
            Update Information
          </Link>
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="library-card rounded-[2rem] border border-white/70 p-6">
            <UserRound className="size-8 text-library-copper" />
            <p className="mt-5 text-sm uppercase tracking-[0.28em] text-library-ink/45">
              Member Status
            </p>
            <p className="font-display mt-2 text-3xl font-semibold text-library-ink">
              Active Reader
            </p>
          </div>
          <div className="library-card rounded-[2rem] border border-white/70 p-6">
            <Mail className="size-8 text-library-copper" />
            <p className="mt-5 text-sm uppercase tracking-[0.28em] text-library-ink/45">
              Borrowed Titles
            </p>
            <p className="font-display mt-2 text-3xl font-semibold text-library-ink">
              {borrowedBooks.length}
            </p>
          </div>
          <div className="library-card rounded-[2rem] border border-white/70 p-6 sm:col-span-2">
            <p className="text-sm uppercase tracking-[0.28em] text-library-copper">
              Reader Snapshot
            </p>
            <p className="mt-4 text-sm leading-7 text-library-ink/70">
              Your profile stores personal details and the books currently
              borrowed by your account.
            </p>
          </div>
        </div>
      </section>

      <section className="library-card rounded-[2.25rem] border border-white/70 p-8">
        <div>
          <p className="text-sm uppercase tracking-[0.28em] text-library-copper">
            Borrowed Shelf
          </p>
          <h2 className="font-display mt-2 text-4xl font-semibold text-library-ink">
            Titles currently attached to your account.
          </h2>
        </div>

        {borrowedBooks.length ? (
          <div className="mt-8 grid gap-4">
            {borrowedBooks.map((record) => (
              <article
                key={record.id}
                className="grid gap-4 rounded-[1.75rem] border border-library-ink/10 bg-white/90 p-4 sm:grid-cols-[96px_minmax(0,1fr)] sm:p-5"
              >
                <Image
                  src={record.book.image_url}
                  alt={`${record.book.title} cover`}
                  width={96}
                  height={144}
                  className="h-32 w-full rounded-[1.25rem] object-cover sm:h-full"
                />
                <div className="space-y-3">
                  <div>
                    <p className="text-sm uppercase tracking-[0.24em] text-library-copper">
                      {record.book.category}
                    </p>
                    <h3 className="font-display text-3xl font-semibold text-library-ink">
                      {record.book.title}
                    </h3>
                    <p className="text-sm text-library-ink/65">
                      by {record.book.author}
                    </p>
                  </div>
                  <p className="text-sm leading-7 text-library-ink/70">
                    Borrowed on {formatDate(record.borrowedAt)}
                  </p>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="mt-8 rounded-[1.75rem] border border-library-ink/10 bg-white/90 p-8 text-center">
            <h3 className="font-display text-3xl font-semibold text-library-ink">
              Your shelf is empty.
            </h3>
            <p className="mt-3 text-sm leading-7 text-library-ink/65">
              Borrow a title from the catalog and it will appear here.
            </p>
          </div>
        )}
      </section>
    </div>
  );
}
