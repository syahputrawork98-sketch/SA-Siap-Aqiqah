import PublicCard from "./PublicCard";

export default function PublicStat({
  label,
  value,
  helper,
  className = "",
}) {
  return (
    <PublicCard className={`p-5 text-center ${className}`.trim()}>
      <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--color-public-accent)]">
        {label}
      </p>
      <p className="mt-2 font-heading text-3xl font-bold text-[var(--color-public-primary)]">
        {value}
      </p>
      {helper && (
        <p className="mt-1 text-sm text-[var(--color-public-text-muted)]">
          {helper}
        </p>
      )}
    </PublicCard>
  );
}
