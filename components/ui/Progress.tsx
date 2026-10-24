import type { Tone } from "@/types";

const DOT: Record<Tone, string> = {
  green: "bg-brand-green",
  amber: "bg-amber-500",
  red: "bg-brand-red",
  gray: "bg-gray-400",
  blue: "bg-blue-500",
};

export function Progress({ pct, tone = "green" }: { pct: number; tone?: Tone }) {
  const clamped = Math.min(100, Math.max(0, pct));
  return (
    <span className="flex items-center gap-2">
      <span
        className="h-2 w-20 overflow-hidden rounded-full bg-brand-cream/80"
        role="progressbar"
        aria-valuenow={clamped}
        aria-valuemin={0}
        aria-valuemax={100}
      >
        <span
          className={`block h-full rounded-full transition-all duration-300 ${DOT[tone]}`}
          style={{ width: `${clamped}%` }}
        />
      </span>
      <span className="text-xs font-semibold text-brand-charcoal">{clamped}%</span>
    </span>
  );
}

