"use client";

export default function UpdateProfileForm() {
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

      <form className="space-y-5">
        <label className="block">
          <span className="mb-2 block text-sm font-semibold text-library-ink">
            Name
          </span>
          <input
            type="text"
            name="name"
            defaultValue="Demo Reader"
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
            defaultValue="https://placehold.co/160x160?text=EL"
            required
            className="input input-bordered h-13 w-full rounded-2xl border-library-ink/10 bg-white"
          />
        </label>

        <button
          type="submit"
          className="btn h-13 rounded-full border-none bg-library-ink px-6 text-white hover:bg-[#091626]"
        >
          Update Information
        </button>
      </form>
    </div>
  );
}
