"use client";

import { Search, X } from "lucide-react";

export function SearchInput({
  placeholder,
  value,
  onChange,
}: {
  placeholder: string;
  value?: string;
  onChange?: (val: string) => void;
}) {
  return (
    <div className="relative min-w-0 flex-1">
      <Search className="pointer-events-none absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
      <input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange?.(e.target.value)}
        className="h-10 w-full rounded-lg border border-line bg-white pl-10 pr-9 text-sm outline-none placeholder:text-muted/70 focus:border-brand-green focus:ring-2 focus:ring-brand-green/20"
      />
      {value && onChange && (
        <button
          type="button"
          onClick={() => onChange("")}
          aria-label="Clear search input"
          className="absolute right-2.5 top-1/2 -translate-y-1/2 rounded p-1 text-muted hover:text-brand-charcoal"
        >
          <X className="size-3.5" />
        </button>
      )}
    </div>
  );
}

