"use client";

import { ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";

export default function BackButton() {
  const router = useRouter();

  function goBack() {
    // Go back one step if there's in-app history, else fall back to the dashboard.
    if (typeof window !== "undefined" && window.history.length > 1) {
      router.back();
    } else {
      router.push("/dashboard");
    }
  }

  return (
    <button
      type="button"
      onClick={goBack}
      aria-label="Go back"
      className="flex h-9 shrink-0 items-center gap-1.5 rounded-lg border border-line bg-white px-3 text-sm font-medium text-brand-charcoal/80 transition hover:bg-brand-cream"
    >
      <ArrowLeft className="size-4" />
      Back
    </button>
  );
}
