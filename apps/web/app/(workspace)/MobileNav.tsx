"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, Sprout, X } from "lucide-react";
import { NavList } from "./nav-data";

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  // Lock body scroll while the drawer is open.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-label="Open menu"
        onClick={() => setOpen(true)}
        className="grid size-10 shrink-0 place-items-center rounded-lg border border-line text-brand-charcoal/70 hover:bg-brand-cream"
      >
        <Menu className="size-5" strokeWidth={1.75} />
      </button>

      {open && (
        <div className="fixed inset-0 z-50" role="dialog" aria-modal="true">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setOpen(false)}
          />
          <aside className="absolute inset-y-0 left-0 flex w-64 max-w-[82%] flex-col bg-brand-deep shadow-xl">
            <div className="flex items-center justify-between px-4 pb-4 pt-5">
              <div className="flex items-center gap-2.5">
                <span className="rounded-lg bg-white px-1.5 py-1">
                  <Image
                    src="/brand/Logo.jpeg"
                    alt="Manikstu"
                    width={80}
                    height={48}
                    className="h-8 w-auto"
                  />
                </span>
                <span className="text-xl font-bold text-white">Manikstu</span>
              </div>
              <button
                type="button"
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="grid size-9 place-items-center rounded-lg text-white/70 hover:bg-white/10 hover:text-white"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="flex-1 space-y-1 overflow-y-auto px-3 py-2">
              <NavList onNavigate={() => setOpen(false)} />
            </nav>

            <p className="flex shrink-0 items-start gap-2 border-t border-white/15 px-5 py-4 text-xs leading-5 text-white/85">
              <Sprout className="mt-0.5 size-5 shrink-0" strokeWidth={1.5} />
              Better Infrastructure
              <br />
              for Rural Communities
            </p>
          </aside>
        </div>
      )}
    </div>
  );
}
