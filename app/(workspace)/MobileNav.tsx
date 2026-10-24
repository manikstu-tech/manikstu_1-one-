"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { MainNavList, FootNavList } from "./nav-data";
import { SidebarHero } from "../../components/navigation/SidebarHero";

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
          <aside className="absolute inset-y-0 left-0 flex w-64 max-w-[82%] flex-col bg-brand-deep shadow-xl select-none">
            {/* Header */}
            <div className="flex shrink-0 items-center justify-between px-4 pb-2.5 pt-4">
              <div className="flex items-center gap-2.5">
                <span className="rounded-lg bg-white px-1.5 py-1">
                  <Image
                    src="/brand/Logo.jpeg"
                    alt="Manikstu"
                    width={80}
                    height={48}
                    className="h-7 w-auto"
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

            {/* Single unified scroll container */}
            <div className="flex flex-1 flex-col overflow-y-auto no-scrollbar scrollbar-none">
              <nav className="space-y-0.5 px-3 py-1">
                <MainNavList onNavigate={() => setOpen(false)} />
              </nav>

              <div className="mt-auto shrink-0">
                <div className="mx-3 my-2 h-px bg-white/10" />
                <div className="space-y-0.5 px-3 pb-1">
                  <FootNavList onNavigate={() => setOpen(false)} />
                </div>
                <SidebarHero />
              </div>
            </div>
          </aside>
        </div>
      )}
    </div>
  );
}
