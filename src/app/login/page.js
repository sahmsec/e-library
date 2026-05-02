import { redirect } from "next/navigation";

import LoginForm from "@/components/LoginForm";
import { getAuthSession } from "@/lib/session";
import { safeRedirectPath } from "@/lib/utils";

export default async function LoginPage({ searchParams }) {
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
          Quietly secure access
        </p>
        <h1 className="font-display text-5xl font-semibold text-library-ink">
          Return to your shelf, your profile, and your next borrowed title.
        </h1>
        <p className="max-w-xl text-sm leading-8 text-library-ink/70">
          Better Auth handles secure sessions while the interface stays light,
          clear, and examiner-friendly.
        </p>
      </div>

      <LoginForm
        redirectTo={redirectTo}
        showRegistrationMessage={params.registered === "1"}
      />
    </section>
  );
}
