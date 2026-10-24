"use client";

import type { ElementType, ReactNode } from "react";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  icon?: ElementType;
  title?: string;
  description?: string;
  action?: ReactNode;
  onReset?: () => void;
}

export function EmptyState({
  icon: Icon = SearchX,
  title = "No records found",
  description = "No results match your current search and filter criteria. Try adjusting your query or resetting filters.",
  action,
  onReset,
}: EmptyStateProps) {
  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="grid size-14 place-items-center rounded-2xl bg-brand-cream text-muted shadow-xs">
        <Icon className="size-7 text-muted/80" strokeWidth={1.5} />
      </div>
      <h3 className="mt-4 text-base font-semibold text-brand-charcoal">{title}</h3>
      <p className="mt-1.5 max-w-md text-xs leading-relaxed text-muted">
        {description}
      </p>
      {onReset && (
        <button
          type="button"
          onClick={onReset}
          className="mt-4 inline-flex items-center gap-1.5 rounded-lg border border-line bg-white px-3.5 py-1.5 text-xs font-semibold text-brand-charcoal transition hover:bg-brand-cream focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
        >
          Reset Filters
        </button>
      )}
      {action && <div className="mt-4">{action}</div>}
    </div>
  );
}

