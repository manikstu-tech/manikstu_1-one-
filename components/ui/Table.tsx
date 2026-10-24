import type { ReactNode } from "react";
import { ChevronRight } from "lucide-react";

export function TableWrap({ children }: { children: ReactNode }) {
  return <div className="overflow-x-auto">{children}</div>;
}

export function Th({
  children,
  right,
}: {
  children: ReactNode;
  right?: boolean;
}) {
  return (
    <th
      className={`whitespace-nowrap py-2.5 pr-3 font-semibold text-xs text-muted ${
        right ? "text-right" : "text-left"
      }`}
    >
      {children}
    </th>
  );
}

export function PaginationNote({
  children,
  currentPage = 1,
  totalPages = 1,
  onPageChange,
}: {
  children: ReactNode;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[13px] text-muted">
      <span>{children}</span>
      <div className="flex items-center gap-1">
        <button
          type="button"
          disabled={currentPage <= 1}
          onClick={() => onPageChange?.(currentPage - 1)}
          aria-label="Previous Page"
          className="grid size-8 place-items-center rounded-lg border border-line text-muted transition hover:bg-brand-cream disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="size-4 rotate-180" />
        </button>
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
          <button
            key={p}
            type="button"
            onClick={() => onPageChange?.(p)}
            className={`grid size-8 place-items-center rounded-lg text-sm font-semibold transition ${
              p === currentPage
                ? "bg-brand-green text-white shadow-xs"
                : "border border-line hover:bg-brand-cream"
            }`}
          >
            {p}
          </button>
        ))}
        <button
          type="button"
          disabled={currentPage >= totalPages}
          onClick={() => onPageChange?.(currentPage + 1)}
          aria-label="Next Page"
          className="grid size-8 place-items-center rounded-lg border border-line text-muted transition hover:bg-brand-cream disabled:cursor-not-allowed disabled:opacity-40"
        >
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}

