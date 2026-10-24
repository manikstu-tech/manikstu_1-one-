"use client";

import { useState, useRef, useEffect, type ReactNode } from "react";
import { ChevronDown } from "lucide-react";

export function FilterSelect({
  label,
  value,
  options = [],
  onChange,
}: {
  label: string;
  value?: string;
  options?: string[];
  onChange?: (val: string) => void;
}) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  // If no interactive options provided, fallback to standard select display
  if (options.length === 0) {
    return (
      <button
        type="button"
        className="flex h-10 shrink-0 items-center gap-2 rounded-lg border border-line bg-white px-3 text-[13px] font-medium text-brand-charcoal/80 transition hover:bg-brand-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
      >
        {label}
        <ChevronDown className="size-4 text-muted" />
      </button>
    );
  }

  const activeLabel = value || label;

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className={`flex h-10 shrink-0 items-center gap-2 rounded-lg border px-3 text-[13px] font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
          value && value !== options[0]
            ? "border-brand-green bg-success-bg/40 text-brand-leaf font-semibold"
            : "border-line bg-white text-brand-charcoal/80 hover:bg-brand-cream"
        }`}
      >
        <span>{activeLabel}</span>
        <ChevronDown
          className={`size-4 text-muted transition-transform ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>

      {open && (
        <div className="absolute left-0 top-full z-40 mt-1 max-h-56 min-w-[160px] overflow-y-auto rounded-xl border border-line bg-white p-1 shadow-lg animate-in fade-in zoom-in-95 duration-100">
          {options.map((opt) => (
            <button
              key={opt}
              type="button"
              onClick={() => {
                onChange?.(opt);
                setOpen(false);
              }}
              className={`flex w-full items-center justify-between rounded-lg px-3 py-1.5 text-left text-xs transition ${
                value === opt
                  ? "bg-brand-green font-semibold text-white"
                  : "text-brand-charcoal hover:bg-brand-cream"
              }`}
            >
              {opt}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

export function FilterBar({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-white p-3 shadow-xs">
      {children}
    </div>
  );
}

