"use client";

import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { toast } from "sonner";

import { cn } from "@/lib/utils";

export default function BorrowButton({
  bookId,
  copiesLeft,
  alreadyBorrowed,
  label = "Borrow",
  borrowedLabel = "Borrowed",
  className,
}) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleBorrow = () => {
    startTransition(async () => {
      const response = await fetch("/api/borrow", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          bookId,
        }),
      });

      const payload = await response.json();

      if (response.status === 401) {
        toast.info("Please log in to borrow this book.");
        router.push(`/login?redirect=/books/${bookId}`);
        return;
      }

      if (!response.ok) {
        toast.error(payload.error ?? "Borrowing failed.");
        return;
      }

      toast.success(payload.message ?? "Book borrowed successfully.");
      router.refresh();
    });
  };

  const disabled = alreadyBorrowed || copiesLeft < 1 || isPending;

  return (
    <button
      type="button"
      onClick={handleBorrow}
      disabled={disabled}
      className={cn(
        "btn h-12 min-h-12 w-full rounded-full border-none bg-library-copper px-5 text-white hover:bg-[#a4572d] disabled:bg-library-ink/25 disabled:text-white",
        className,
      )}
    >
      {alreadyBorrowed
        ? borrowedLabel
        : copiesLeft < 1
          ? "Unavailable"
          : label}
    </button>
  );
}
