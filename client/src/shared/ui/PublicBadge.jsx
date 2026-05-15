export default function PublicBadge({
  children,
  tone = "accent",
  className = "",
}) {
  const toneClassName = {
    accent:
      "bg-[color-mix(in_srgb,var(--color-public-accent)_18%,var(--core-white))] text-[var(--color-public-accent)] border-[color-mix(in_srgb,var(--color-public-accent)_35%,var(--core-white))]",
    primary:
      "bg-[color-mix(in_srgb,var(--color-public-primary)_12%,var(--core-white))] text-[var(--color-public-primary)] border-[color-mix(in_srgb,var(--color-public-primary)_28%,var(--core-white))]",
    light:
      "bg-[var(--core-overlay-white-80)] text-[var(--color-public-primary)] border-[var(--core-overlay-white-70)]",
  };

  return (
    <span
      className={`inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold tracking-wide ${toneClassName[tone] ?? toneClassName.accent} ${className}`.trim()}
    >
      {children}
    </span>
  );
}
