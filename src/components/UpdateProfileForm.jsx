"use client";

import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export default function UpdateProfileForm({
  defaultName,
  defaultImage,
}) {
  const router = useRouter();
  const [error, setError] = useState(null);
  const [isPending, startTransition] = useTransition();

  const handleSubmit = (event) => {
    event.preventDefault();
    setError(null);

    const formData = new FormData(event.currentTarget);
    const name = String(formData.get("name") ?? "");
    const image = String(formData.get("image") ?? "");

    startTransition(async () => {
      const result = await authClient.updateUser({
        name,
        image,
      });

      if (result.error) {
        const message =
          result.error.message ?? "Unable to update your profile right now.";
        setError(message);
        toast.error(message);
        return;
      }

      toast.success("Your profile has been updated.");
      router.push("/profile");
      router.refresh();
    });
  };

  return (
    <div className="library-card rounded-[2rem] border border-white/70 p-8 sm:p-10">
      <div className="mb-8 space-y-3">
        <p className="text-sm uppercase tracking-[0.28em] text-library-copper">
          Update Information
        </p>
        <h1 className="font-display text-4xl font-semibold text-library-ink">
          Refresh the details on your member card.
        </h1>
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
            defaultValue={defaultName}
            required
            className="input input-bordered h-13 w-full rounded-2xl border-library-ink/10 bg-white"
          />
        </label>

        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-library-ink">
            Image URL
          </span>
          <input
            type="url"
            name="image"
            defaultValue={defaultImage}
            required
            className="input input-bordered h-13 w-full rounded-2xl border-library-ink/10 bg-white"
          />
        </label>

        <button
          type="submit"
          className="btn h-13 rounded-full border-none bg-library-ink px-6 text-white hover:bg-[#091626]"
          disabled={isPending}
        >
          Update Information
        </button>
      </form>
    </div>
  );
}
