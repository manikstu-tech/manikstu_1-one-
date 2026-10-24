import type { ReactNode } from "react";

export interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  type?: "button" | "submit" | "reset";
  disabled?: boolean;
  className?: string;
  ariaLabel?: string;
}

export function PrimaryButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ariaLabel,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`flex h-10 items-center justify-center gap-2 rounded-lg bg-brand-green px-4 text-sm font-semibold text-white shadow-xs transition hover:bg-brand-leaf disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green focus-visible:ring-offset-1 ${className}`}
    >
      {children}
    </button>
  );
}

export function GhostButton({
  children,
  onClick,
  type = "button",
  disabled = false,
  className = "",
  ariaLabel,
}: ButtonProps) {
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      aria-label={ariaLabel}
      className={`flex h-10 items-center justify-center gap-2 rounded-lg border border-line bg-white px-3.5 text-sm font-medium text-brand-charcoal/80 transition hover:bg-brand-cream hover:text-brand-charcoal disabled:cursor-not-allowed disabled:opacity-50 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-green ${className}`}
    >
      {children}
    </button>
  );
}

