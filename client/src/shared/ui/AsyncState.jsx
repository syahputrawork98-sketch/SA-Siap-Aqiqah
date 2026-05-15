export function LoadingState({ message = "Memuat data..." }) {
  return (
    <div className="w-full rounded-xl border border-[var(--color-border-default)] bg-[var(--color-bg-surface)] px-4 py-8 text-center text-sm text-[var(--color-text-secondary)]">
      {message}
    </div>
  );
}

export function ErrorState({
  message = "Terjadi kesalahan saat mengambil data.",
  onRetry,
}) {
  return (
    <div className="w-full rounded-xl border border-red-200 bg-red-50 px-4 py-8 text-center">
      <p className="text-sm text-red-700">{message}</p>
      {typeof onRetry === "function" && (
        <button
          type="button"
          onClick={onRetry}
          className="mt-3 rounded-md border border-red-300 bg-white px-3 py-1.5 text-sm text-red-700 hover:bg-red-100 transition"
        >
          Coba Lagi
        </button>
      )}
    </div>
  );
}

export function EmptyState({ message = "Data belum tersedia." }) {
  return (
    <div className="w-full rounded-xl border border-dashed border-[var(--color-border-default)] bg-[var(--color-bg-subtle)] px-4 py-8 text-center text-sm text-[var(--color-text-muted)]">
      {message}
    </div>
  );
}
