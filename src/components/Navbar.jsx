"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { BookOpenText, Library, LogOut, Menu, User2 } from "lucide-react";
import { useTransition } from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";
import { cn } from "@/lib/utils";

const navItems = [
  {
    href: "/",
    label: "Home",
  },
  {
    href: "/books",
    label: "All Books",
  },
  {
    href: "/profile",
    label: "My Profile",
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = authClient.useSession();
  const [isSigningOut, startSigningOut] = useTransition();

  const handleSignOut = () => {
    startSigningOut(async () => {
      const result = await authClient.signOut();

      if (result.error) {
        toast.error(result.error.message);
        return;
      }

      toast.success("Signed out successfully.");
      router.push("/");
      router.refresh();
    });
  };

  return (
    <header className="sticky top-0 z-40 border-b border-library-ink/10 bg-background/85 backdrop-blur-xl">
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
        <div className="flex items-center gap-3">
          <div className="dropdown lg:hidden">
            <label
              tabIndex={0}
              className="btn btn-circle btn-ghost border border-library-ink/10"
              aria-label="Open navigation menu"
            >
              <Menu className="size-5" />
            </label>
            <ul
              tabIndex={0}
              className="menu dropdown-content z-[1] mt-3 w-64 rounded-3xl border border-library-ink/10 bg-white p-3 shadow-2xl"
            >
              {navItems.map((item) => (
                <li key={item.href}>
                  <Link href={item.href}>{item.label}</Link>
                </li>
              ))}
            </ul>
          </div>
          <Link
            href="/"
            className="group inline-flex items-center gap-3 rounded-full border border-library-ink/10 bg-white/80 px-4 py-2 shadow-sm transition hover:border-library-copper/40 hover:shadow-lg"
          >
            <span className="flex size-10 items-center justify-center rounded-full bg-library-ink text-white">
              <Library className="size-5" />
            </span>
            <span>
              <span className="font-display block text-lg font-semibold leading-none">
                E-Library
              </span>
              <span className="text-xs uppercase tracking-[0.28em] text-library-ink/55">
                Digital Reading Lounge
              </span>
            </span>
          </Link>
        </div>

        <nav className="hidden items-center gap-2 lg:flex">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "rounded-full px-4 py-2 text-sm font-semibold transition",
                pathname === item.href
                  ? "bg-library-ink text-white shadow-lg shadow-library-ink/20"
                  : "text-library-ink/70 hover:bg-white/70 hover:text-library-ink",
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-3">
          {isPending ? (
            <span className="loading loading-spinner loading-sm text-library-copper" />
          ) : session?.user ? (
            <>
              <div className="hidden items-center gap-2 rounded-full border border-library-ink/10 bg-white/80 px-4 py-2 md:flex">
                <User2 className="size-4 text-library-copper" />
                <span className="text-sm font-semibold text-library-ink">
                  {session.user.name}
                </span>
              </div>
              <button
                type="button"
                onClick={handleSignOut}
                className="btn rounded-full border-none bg-library-copper px-5 text-white shadow-lg shadow-library-copper/25 hover:bg-[#a4572d]"
                disabled={isSigningOut}
              >
                <LogOut className="size-4" />
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="btn rounded-full border-none bg-library-ink px-5 text-white shadow-lg shadow-library-ink/20 hover:bg-[#091626]"
            >
              <BookOpenText className="size-4" />
              Login
            </Link>
          )}
        </div>
      </div>
    </header>
  );
}
