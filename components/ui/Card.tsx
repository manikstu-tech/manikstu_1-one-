import type { ReactNode } from "react";

export function Card({
  title,
  action,
  children,
  className = "",
  padded = true,
}: {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  padded?: boolean;
}) {
  return (
    <section
      className={`min-w-0 rounded-xl border border-line bg-white shadow-xs ${
        padded ? "p-5" : ""
      } ${className}`}
    >
      {(title || action) && (
        <div
          className={`flex items-center justify-between gap-3 ${
            padded ? "mb-4" : "border-b border-line px-5 py-3.5"
          }`}
        >
          {title && <h2 className="text-base font-bold text-brand-charcoal">{title}</h2>}
          {action && <div className="shrink-0">{action}</div>}
        </div>
      )}
      {children}
    </section>
  );
}

