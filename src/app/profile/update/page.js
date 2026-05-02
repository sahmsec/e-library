import { redirect } from "next/navigation";

import UpdateProfileForm from "@/components/UpdateProfileForm";
import { getAuthSession } from "@/lib/session";
import { buildLoginRedirect } from "@/lib/utils";

export default async function UpdateProfilePage() {
  const session = await getAuthSession();

  if (!session) {
    redirect(buildLoginRedirect("/profile/update"));
  }

  return (
    <section className="mx-auto w-full max-w-3xl">
      <UpdateProfileForm
        defaultName={session.user.name}
        defaultImage={session.user.image ?? ""}
      />
    </section>
  );
}
