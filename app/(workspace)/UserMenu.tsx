"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  Bell,
  ChevronDown,
  CircleHelp,
  LogOut,
  Settings,
  UserRound,
} from "lucide-react";
import type { ElementType } from "react";

const ITEMS: { icon: ElementType; label: string; href: string }[] = [
  { icon: UserRound, label: "My Profile", href: "/profile" },
  { icon: Settings, label: "Account Settings", href: "/settings" },
  { icon: Bell, label: "Notifications", href: "/notifications" },
  { icon: CircleHelp, label: "Help & Support", href: "/help" },
];

export default function UserMenu() {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    if (!open) return;
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    document.addEventListener("mousedown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("mousedown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        aria-haspopup="menu"
        aria-expanded={open}
        aria-label="User account menu for Aftab Khan"
        onClick={() => setOpen((v) => !v)}
        className="flex items-center gap-2.5 rounded-lg py-1 pl-1 pr-2 transition hover:bg-brand-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
      >
        <span className="grid size-9 shrink-0 place-items-center rounded-full bg-brand-green text-xs font-bold text-white shadow-xs">
          AK
        </span>
        <span className="hidden text-left leading-tight md:block">
          <span className="block text-sm font-semibold">Aftab Khan</span>
          <span className="block text-[11px] text-muted">Operations Manager</span>
        </span>
        <ChevronDown
          className={`hidden size-4 text-muted transition-transform md:block ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div
          role="menu"
          aria-label="User Options"
          className="absolute right-0 top-full z-50 mt-2 w-60 overflow-hidden rounded-xl border border-line bg-white shadow-xl animate-in fade-in zoom-in-95 duration-150"
        >
          <div className="flex items-center gap-3 border-b border-line bg-brand-cream/50 p-4">
            <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-green text-sm font-bold text-white">
              AK
            </span>
            <div className="min-w-0">
              <p className="truncate text-sm font-semibold">Aftab Khan</p>
              <p className="truncate text-xs text-muted">aftab.khan@manikstu.com</p>
            </div>
          </div>

          <div className="p-1.5">
            {ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                onClick={() => setOpen(false)}
                role="menuitem"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-brand-charcoal/80 transition hover:bg-brand-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              >
                <item.icon className="size-[18px] text-muted" strokeWidth={1.75} />
                {item.label}
              </Link>
            ))}
          </div>

          <div className="border-t border-line p-1.5">
            <button
              type="button"
              role="menuitem"
              onClick={() => {
                setOpen(false);
                router.push("/login");
              }}
              className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium text-brand-red transition hover:bg-red-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-red"
            >
              <LogOut className="size-[18px]" strokeWidth={1.75} />
              Sign out
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
