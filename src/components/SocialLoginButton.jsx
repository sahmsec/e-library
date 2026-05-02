"use client";

import { useTransition } from "react";
import { toast } from "sonner";

import { authClient } from "@/lib/auth-client";

export default function SocialLoginButton({ redirectTo }) {
  const [isPending, startTransition] = useTransition();
  const googleEnabled = process.env.NEXT_PUBLIC_GOOGLE_AUTH_ENABLED === "true";

  const handleGoogleSignIn = () => {
    if (!googleEnabled) {
      toast.info("Google login will work after you add the Google env values.");
      return;
    }

    startTransition(async () => {
      await authClient.signIn.social({
        provider: "google",
        callbackURL: redirectTo,
      });
    });
  };

  return (
    <button
      type="button"
      onClick={handleGoogleSignIn}
      className="btn btn-outline w-full rounded-full border-library-ink/15 bg-white text-library-ink hover:border-library-copper hover:bg-library-cream"
      disabled={isPending}
    >
      <span className="flex size-6 items-center justify-center rounded-full bg-library-ink text-xs font-bold text-white">
        G
      </span>
      Continue with Google
    </button>
  );
}
