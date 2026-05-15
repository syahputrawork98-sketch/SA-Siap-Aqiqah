const idrCurrencyFormatter = new Intl.NumberFormat("id-ID", {
  style: "currency",
  currency: "IDR",
  minimumFractionDigits: 0,
});

export function formatCurrencyIdr(value) {
  const safeValue = Number.isFinite(Number(value)) ? Number(value) : 0;
  return idrCurrencyFormatter.format(safeValue);
}
