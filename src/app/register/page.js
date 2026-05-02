import RegisterForm from "@/components/RegisterForm";

export default function RegisterPage() {
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
          Create your account with email and password or continue with Google.
        </p>
      </div>

      <RegisterForm />
    </section>
  );
}
