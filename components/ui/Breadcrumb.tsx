import Link from "next/link";
import { ChevronRight, Home } from "lucide-react";

export type BreadcrumbItem = string | { label: string; href?: string };

const KNOWN_ROUTES: Record<string, string> = {
  Home: "/dashboard",
  Dashboard: "/dashboard",
  Projects: "/projects",
  Beneficiaries: "/beneficiaries",
  Sites: "/sites",
  "Shed Register": "/sites",
  "Work Orders": "/work-orders",
  Materials: "/materials",
  Finance: "/finance",
  "Tasks & Issues": "/tasks",
  Inspections: "/inspections",
  Documents: "/documents",
  Reports: "/reports",
  "Users & Roles": "/users",
  Settings: "/settings",
  Communications: "/notifications",
  "Help & Support": "/help",
  Profile: "/profile",
};

export function Breadcrumb({ items }: { items: BreadcrumbItem[] }) {
  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5 text-[13px] text-muted">
      <Link
        href="/dashboard"
        aria-label="Dashboard Home"
        className="rounded p-0.5 text-muted hover:text-brand-charcoal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
      >
        <Home className="size-4" />
      </Link>
      {items.map((item, i) => {
        const isLast = i === items.length - 1;
        const label = typeof item === "string" ? item : item.label;
        const href =
          typeof item === "object" && item.href
            ? item.href
            : !isLast
            ? KNOWN_ROUTES[label] || "#"
            : undefined;

        return (
          <span key={label} className="flex items-center gap-1.5">
            <ChevronRight className="size-3.5 text-muted/60" />
            {isLast || !href || href === "#" ? (
              <span
                aria-current={isLast ? "page" : undefined}
                className={isLast ? "font-semibold text-brand-charcoal" : ""}
              >
                {label}
              </span>
            ) : (
              <Link
                href={href}
                className="transition hover:text-brand-charcoal hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green"
              >
                {label}
              </Link>
            )}
          </span>
        );
      })}
    </nav>
  );
}

