import type { ReactNode } from "react";
import BackButton from "@/app/(workspace)/BackButton";

export function PageHeader({
  title,
  subtitle,
  actions,
  showBackButton = true,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
  showBackButton?: boolean;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex min-w-0 items-start gap-3">
        {showBackButton && <BackButton />}
        <div className="min-w-0">
          <h1 className="text-[28px] font-bold leading-tight tracking-tight text-brand-charcoal">
            {title}
          </h1>
          {subtitle && (
            <p className="mt-0.5 text-sm leading-relaxed text-muted">{subtitle}</p>
          )}
        </div>
      </div>
      {actions && (
        <div className="flex flex-wrap items-center gap-2.5">{actions}</div>
      )}
    </div>
  );
}

