import type { ElementType, ReactNode } from "react";
import type { Tone } from "@/types";

export type { Tone };

const TONE: Record<Tone, string> = {
  green: "bg-success-bg text-brand-leaf border border-green-200/50",
  amber: "bg-amber-50 text-amber-800 border border-amber-200/60",
  red: "bg-red-50 text-brand-red border border-red-200/50",
  gray: "bg-gray-100 text-gray-700 border border-gray-200/60",
  blue: "bg-blue-50 text-blue-700 border border-blue-200/60",
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
      className={`inline-flex items-center gap-1.5 whitespace-nowrap rounded-md px-2 py-0.75 text-xs font-medium tracking-tight ${TONE[tone]}`}
    >
      {dot && <span className={`size-1.5 rounded-full ${DOT[tone]}`} />}
      {Icon && <Icon className="size-3.5" />}
      {children}
    </span>
  );
}

