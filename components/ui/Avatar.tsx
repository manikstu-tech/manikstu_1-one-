const AVATAR_TINTS = [
  "bg-brand-green",
  "bg-brand-leaf",
  "bg-brand-gold",
  "bg-blue-600",
  "bg-rose-600",
  "bg-teal-600",
];

export function Avatar({ name, size = 8 }: { name: string; size?: number }) {
  const initials = name
    .split(" ")
    .map((w) => w[0])
    .filter(Boolean)
    .slice(0, 2)
    .join("")
    .toUpperCase();
  const tint = AVATAR_TINTS[name.length % AVATAR_TINTS.length];

  return (
    <span
      className={`grid shrink-0 place-items-center rounded-full text-[11px] font-bold text-white shadow-xs ${tint}`}
      style={{ width: `${size * 4}px`, height: `${size * 4}px` }}
      aria-label={name}
      title={name}
    >
      {initials}
    </span>
  );
}

