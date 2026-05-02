"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import SocialLoginButton from "@/components/SocialLoginButton";
import { authClient } from "@/lib/auth-client";

export default function LoginForm({
  redirectTo,
  showRegistrationMessage = false,
}) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const email = String(formData.get("email") ?? "");
    const password = String(formData.get("password") ?? "");

    startTransition(async () => {
      const result = await authClient.signIn.email({
        email,
        password,
        rememberMe: true,
      });

      if (result.error) {
        const message = result.error.message ?? "Unable to sign in.";
        setError(message);
        toast.error(message);
        return;
      }

      toast.success("Welcome back to your reading room.");
      router.push(redirectTo);
      router.refresh();
    });
  };

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

      {showRegistrationMessage ? (
        <div className="alert mb-6 border border-library-mint/40 bg-library-mint/15 text-library-ink">
          <span>Your account is ready. Please log in to continue.</span>
        </div>
      ) : null}

      {error ? (
        <div className="alert mb-6 border border-red-300 bg-red-50 text-red-700">
          <span>{error}</span>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-5">
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
          disabled={isPending}
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

      <SocialLoginButton redirectTo={redirectTo} />

      <p className="mt-6 text-center text-sm text-library-ink/68">
        New here?{" "}
        <Link href="/register" className="font-semibold text-library-copper">
          Create an account
        </Link>
      </p>
    </div>
  );
}
