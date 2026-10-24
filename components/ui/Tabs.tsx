"use client";

import type { TabDefinition } from "@/types";

export type TabDef = TabDefinition;

export function Tabs({
  tabs,
  activeTab,
  onChange,
}: {
  tabs: TabDef[];
  activeTab?: string;
  onChange?: (tab: string) => void;
}) {
  return (
    <div
      role="tablist"
      aria-label="Filter views"
      className="flex flex-wrap gap-1 border-b border-line"
    >
      {tabs.map((t) => {
        const isCurrent =
          activeTab !== undefined ? activeTab === t.label : t.active;

        return (
          <button
            key={t.label}
            type="button"
            role="tab"
            aria-selected={isCurrent}
            onClick={() => onChange?.(t.label)}
            className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${
              isCurrent
                ? "border-brand-green text-brand-green font-semibold"
                : "border-transparent text-muted hover:text-brand-charcoal"
            }`}
          >
            {t.label}
            {t.count !== undefined && (
              <span
                className={`grid min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-bold ${
                  isCurrent
                    ? "bg-brand-green text-white"
                    : "bg-gray-100 text-gray-600"
                }`}
              >
                {t.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}

