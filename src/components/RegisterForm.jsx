"use client";

import Link from "next/link";

import SocialLoginButton from "@/components/SocialLoginButton";

export default function RegisterForm() {
  return (
    <div className="library-card w-full rounded-[2rem] border border-white/70 p-8 sm:p-10">
      <div className="mb-8 space-y-3">
        <p className="text-sm uppercase tracking-[0.28em] text-library-copper">
          User Registration
        </p>
        <h1 className="font-display text-4xl font-semibold text-library-ink">
          Create your digital borrowing identity.
        </h1>
        <p className="text-sm leading-7 text-library-ink/70">
          Set up your reader profile in a minute, then start borrowing.
        </p>
      </div>

      <form className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-library-ink">
            Name
          </span>
          <input
            type="text"
            name="name"
            required
            className="input input-bordered h-13 w-full rounded-2xl border-library-ink/10 bg-white"
            placeholder="Reader name"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-library-ink">
            Email
          </span>
          <input
            type="email"
            name="email"
            required
            className="input input-bordered h-13 w-full rounded-2xl border-library-ink/10 bg-white"
            placeholder="reader@example.com"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-library-ink">
            Photo URL
          </span>
          <input
            type="url"
            name="image"
            required
            className="input input-bordered h-13 w-full rounded-2xl border-library-ink/10 bg-white"
            placeholder="https://example.com/avatar.jpg"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-library-ink">
            Password
          </span>
          <input
            type="password"
            name="password"
            required
            minLength={8}
            className="input input-bordered h-13 w-full rounded-2xl border-library-ink/10 bg-white"
            placeholder="Minimum 8 characters"
          />
        </label>

        <button
          type="submit"
          className="btn h-13 w-full rounded-full border-none bg-library-copper text-white hover:bg-[#a4572d]"
        >
          Register
        </button>
      </form>

      <div className="my-6 flex items-center gap-4">
        <div className="h-px flex-1 bg-library-ink/10" />
        <span className="text-xs uppercase tracking-[0.28em] text-library-ink/45">
          Or
        </span>
        <div className="h-px flex-1 bg-library-ink/10" />
      </div>

      <SocialLoginButton />

      <p className="mt-6 text-center text-sm text-library-ink/68">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-library-copper">
          Login
        </Link>
      </p>
    </div>
  );
}
