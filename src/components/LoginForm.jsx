"use client";

import Link from "next/link";

import SocialLoginButton from "@/components/SocialLoginButton";

export default function LoginForm() {
  return (
    <div className="library-card w-full rounded-[2rem] border border-white/70 p-8 sm:p-10">
      <div className="mb-8 space-y-3">
        <p className="text-sm uppercase tracking-[0.28em] text-library-copper">
          User Login
        </p>
        <h1 className="font-display text-4xl font-semibold text-library-ink">
          Step back into your library account.
        </h1>
        <p className="text-sm leading-7 text-library-ink/70">
          Use your email and password or continue with Google.
        </p>
      </div>

      <form className="space-y-5">
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
            Password
          </span>
          <input
            type="password"
            name="password"
            required
            className="input input-bordered h-13 w-full rounded-2xl border-library-ink/10 bg-white"
            placeholder="Enter your password"
          />
        </label>

        <button
          type="submit"
          className="btn h-13 w-full rounded-full border-none bg-library-ink text-white hover:bg-[#091626]"
        >
          Login
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
        New here?{" "}
        <Link href="/register" className="font-semibold text-library-copper">
          Create an account
        </Link>
      </p>
    </div>
  );
}
