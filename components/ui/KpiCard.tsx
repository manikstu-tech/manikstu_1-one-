import type { ElementType } from "react";

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
    <div className="rounded-xl border border-line bg-white p-5 shadow-xs transition hover:shadow-sm">
      <div className="flex items-center gap-3">
        <span className={`grid size-10 shrink-0 place-items-center rounded-lg ${tint}`}>
          <Icon className="size-5" strokeWidth={1.75} />
        </span>
        <p className="text-[13px] font-medium text-muted">{label}</p>
      </div>
      <p className="mt-3 text-[26px] font-bold leading-none tracking-tight text-brand-charcoal">
        {value}
      </p>
      {sub && <p className={`mt-2 text-xs font-semibold ${subClass}`}>{sub}</p>}
    </div>
  );
}

