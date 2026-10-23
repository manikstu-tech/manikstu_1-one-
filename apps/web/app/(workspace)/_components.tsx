import type { ElementType, ReactNode } from "react";
import { ChevronDown, ChevronRight, Home, Search } from "lucide-react";
import BackButton from "./BackButton";

/* ---------- Breadcrumb ---------- */
export function Breadcrumb({ items }: { items: string[] }) {
  return (
    <nav className="flex items-center gap-1.5 text-[13px] text-muted">
      <Home className="size-4" />
      {items.map((item, i) => (
        <span key={item} className="flex items-center gap-1.5">
          <ChevronRight className="size-3.5 text-muted/70" />
          <span className={i === items.length - 1 ? "font-medium text-brand-charcoal" : ""}>
            {item}
          </span>
        </span>
      ))}
    </nav>
  );
}

/* ---------- Page header ---------- */
export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="flex flex-wrap items-start justify-between gap-4">
      <div className="flex min-w-0 items-start gap-3">
        <BackButton />
        <div className="min-w-0">
          <h1 className="text-[28px] font-bold leading-tight">{title}</h1>
          {subtitle && <p className="mt-0.5 text-sm text-muted">{subtitle}</p>}
        </div>
      </div>
      {actions && <div className="flex flex-wrap items-center gap-2.5">{actions}</div>}
    </div>
  );
}

/* ---------- Buttons ---------- */
export function PrimaryButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="flex h-10 items-center gap-2 rounded-lg bg-brand-green px-4 text-sm font-semibold text-white transition hover:bg-brand-leaf"
    >
      {children}
    </button>
  );
}

export function GhostButton({ children }: { children: ReactNode }) {
  return (
    <button
      type="button"
      className="flex h-10 items-center gap-2 rounded-lg border border-line bg-white px-3.5 text-sm font-medium text-brand-charcoal/80 transition hover:bg-brand-cream"
    >
      {children}
    </button>
  );
}

/* ---------- Status chip ---------- */
export type Tone = "green" | "amber" | "red" | "gray" | "blue";

const TONE: Record<Tone, string> = {
  green: "bg-success-bg text-brand-leaf",
  amber: "bg-amber-50 text-amber-700",
  red: "bg-red-50 text-brand-red",
  gray: "bg-gray-100 text-gray-600",
  blue: "bg-blue-50 text-blue-700",
};

const DOT: Record<Tone, string> = {
  green: "bg-brand-green",
  amber: "bg-amber-500",
  red: "bg-brand-red",
  gray: "bg-gray-400",
  blue: "bg-blue-500",
};

export function Chip({
  tone = "gray",
  icon: Icon,
  dot,
  children,
}: {
  tone?: Tone;
  icon?: ElementType;
  dot?: boolean;
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-1 text-xs font-medium ${TONE[tone]}`}
    >
      {dot && <span className={`size-1.5 rounded-full ${DOT[tone]}`} />}
      {Icon && <Icon className="size-3.5" />}
      {children}
    </span>
  );
}

/* ---------- KPI card ---------- */
export function Kpi({
  icon: Icon,
  tint,
  label,
  value,
  sub,
  subTone,
}: {
  icon: ElementType;
  tint: string;
  label: string;
  value: string;
  sub?: string;
  subTone?: "green" | "red" | "muted";
}) {
  const subClass =
    subTone === "red"
      ? "text-brand-red"
      : subTone === "muted"
        ? "text-muted"
        : "text-brand-green";
  return (
    <div className="rounded-xl border border-line bg-white p-5 shadow-sm">
      <div className="flex items-center gap-3">
        <span className={`grid size-10 shrink-0 place-items-center rounded-lg ${tint}`}>
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
        <p className="text-[13px] text-muted">{label}</p>
      </div>
      <p className="mt-3 text-[26px] font-bold leading-none">{value}</p>
      {sub && <p className={`mt-2 text-sm font-medium ${subClass}`}>{sub}</p>}
    </div>
  );
}

/* ---------- Section card ---------- */
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
      className={`min-w-0 rounded-xl border border-line bg-white shadow-sm ${padded ? "p-5" : ""} ${className}`}
    >
      {title && (
        <div className={`mb-4 flex items-center justify-between gap-3 ${padded ? "" : "px-5 pt-5"}`}>
          <h2 className="text-base font-bold">{title}</h2>
          {action}
        </div>
      )}
      {children}
    </section>
  );
}

/* ---------- Avatar (initials) ---------- */
const AVATAR_TINTS = [
  "bg-brand-green",
  "bg-brand-leaf",
  "bg-brand-gold",
  "bg-blue-500",
  "bg-rose-500",
  "bg-teal-600",
];

export function Avatar({ name, size = 8 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const tint = AVATAR_TINTS[name.length % AVATAR_TINTS.length];
  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full text-[11px] font-bold text-white ${tint}`}
      style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
    >
      {initials}
    </span>
  );
}

/* ---------- Progress bar ---------- */
export function Progress({ pct, tone = "green" }: { pct: number; tone?: Tone }) {
  return (
    <span className="flex items-center gap-2">
      <span className="h-2 w-20 overflow-hidden rounded-full bg-brand-cream">
        <span
          className={`block h-full rounded-full ${DOT[tone]}`}
          style={{ width: `${pct}%` }}
        />
      </span>
      <span className="text-xs font-medium">{pct}%</span>
    </span>
  );
}

/* ---------- Filter bar (static) ---------- */
export function SearchInput({ placeholder }: { placeholder: string }) {
  return (
    <div className="relative min-w-0 flex-1">
      <Search className="absolute left-3.5 top-1/2 size-4 -translate-y-1/2 text-muted" />
      <input
        type="text"
        placeholder={placeholder}
        className="h-10 w-full rounded-lg border border-line bg-white pl-10 pr-4 text-sm outline-none placeholder:text-muted/80 focus:border-brand-green"
      />
    </div>
  );
}

export function FilterSelect({ label }: { label: string }) {
  return (
    <button
      type="button"
      className="flex h-10 shrink-0 items-center gap-2 rounded-lg border border-line bg-white px-3 text-[13px] font-medium text-brand-charcoal/80"
    >
      {label}
      <ChevronDown className="size-4 text-muted" />
    </button>
  );
}

export function FilterBar({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-wrap items-center gap-3 rounded-xl border border-line bg-white p-3 shadow-sm">
      {children}
    </div>
  );
}

/* ---------- Tabs (static) ---------- */
export function Tabs({
  tabs,
}: {
  tabs: { label: string; count?: string | number; active?: boolean }[];
}) {
  return (
    <div className="flex flex-wrap gap-1 border-b border-line">
      {tabs.map((t) => (
        <button
          key={t.label}
          type="button"
          className={`flex items-center gap-2 border-b-2 px-4 py-2.5 text-sm font-medium transition ${
            t.active
              ? "border-brand-green text-brand-green"
              : "border-transparent text-muted hover:text-brand-charcoal"
          }`}
        >
          {t.label}
          {t.count !== undefined && (
            <span
              className={`grid min-w-5 place-items-center rounded-full px-1.5 text-[11px] font-bold ${
                t.active ? "bg-brand-green text-white" : "bg-gray-100 text-gray-600"
              }`}
            >
              {t.count}
            </span>
          )}
        </button>
      ))}
    </div>
  );
}

/* ---------- Table wrapper ---------- */
export function TableWrap({ children }: { children: ReactNode }) {
  return <div className="overflow-x-auto">{children}</div>;
}

export function Th({ children, right }: { children: ReactNode; right?: boolean }) {
  return (
    <th className={`whitespace-nowrap py-2.5 pr-3 font-medium ${right ? "text-right" : "text-left"}`}>
      {children}
    </th>
  );
}

export function PaginationNote({ children }: { children: ReactNode }) {
  return (
    <div className="mt-4 flex flex-wrap items-center justify-between gap-3 text-[13px] text-muted">
      <span>{children}</span>
      <div className="flex items-center gap-1">
        <button className="grid size-8 place-items-center rounded-lg border border-line text-muted">
          <ChevronRight className="size-4 rotate-180" />
        </button>
        <button className="grid size-8 place-items-center rounded-lg bg-brand-green text-sm font-semibold text-white">
          1
        </button>
        <button className="grid size-8 place-items-center rounded-lg border border-line text-sm">
          2
        </button>
        <button className="grid size-8 place-items-center rounded-lg border border-line text-muted">
          <ChevronRight className="size-4" />
        </button>
      </div>
    </div>
  );
}
