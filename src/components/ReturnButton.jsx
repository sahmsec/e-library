"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

export default function ReturnButton({ bookId }) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleReturn = () => {
    startTransition(async () => {
      const response = await fetch("/api/borrow/return", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ bookId }),
      });

      const payload = await response.json();

      if (!response.ok) {
        toast.error(payload.error || "Return failed.");
        return;
      }

      toast.success(payload.message || "Book returned.");
      router.refresh();
    });
  };

  return (
    <button
      type="button"
      onClick={handleReturn}
      disabled={isPending}
      className="btn rounded-full border-none bg-library-copper px-5 text-white hover:bg-[#a4572d]"
    >
      {isPending ? "Returning..." : "Return Book"}
    </button>
  );
}
