"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import SocialLoginButton from "@/components/SocialLoginButton";
import { authClient } from "@/lib/auth-client";

export default function RegisterForm({ redirectTo }) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const email = String(formData.get("email") ?? "");
    const image = String(formData.get("image") ?? "");
    const password = String(formData.get("password") ?? "");

    startTransition(async () => {
      const result = await authClient.signUp.email({
        name,
        email,
        image,
        password,
      });

      if (result.error) {
        const message = result.error.message ?? "Unable to create your account.";
        setError(message);
        toast.error(message);
        return;
      }

      toast.success("Registration complete. Please log in.");
      router.push("/login?registered=1");
      router.refresh();
    });
  };

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

      {error ? (
        <div className="alert mb-6 border border-red-300 bg-red-50 text-red-700">
          <span>{error}</span>
        </div>
      ) : null}

      <form onSubmit={handleSubmit} className="space-y-5">
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
          disabled={isPending}
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

      <SocialLoginButton redirectTo={redirectTo} />

      <p className="mt-6 text-center text-sm text-library-ink/68">
        Already have an account?{" "}
        <Link href="/login" className="font-semibold text-library-copper">
          Login
        </Link>
      </p>
    </div>
  );
}
