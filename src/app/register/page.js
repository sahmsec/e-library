import { redirect } from "next/navigation";

import RegisterForm from "@/components/RegisterForm";
import { getAuthSession } from "@/lib/session";
import { safeRedirectPath } from "@/lib/utils";

export default async function RegisterPage({ searchParams }) {
  const params = await searchParams;
  const redirectTo = safeRedirectPath(params.redirect);
  const session = await getAuthSession();

  if (session) {
    redirect(redirectTo);
  }

  return (
    <section className="mx-auto grid w-full max-w-6xl gap-8 lg:grid-cols-[0.95fr_1.05fr] lg:items-center">
      <div className="space-y-6">
        <p className="text-sm uppercase tracking-[0.28em] text-library-copper">
          Start your membership
        </p>
        <h1 className="font-display text-5xl font-semibold text-library-ink">
          Build a reader profile that moves with every borrowed story.
        </h1>
        <p className="max-w-xl text-sm leading-8 text-library-ink/70">
          Create your account with email and password or continue with Google,
          then head straight into the collection.
        </p>
      </div>

      <RegisterForm redirectTo={redirectTo} />
    </section>
  );
}
