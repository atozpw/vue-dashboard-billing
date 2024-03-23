export function numberFormat(number, decimal = 0) {
  return new Intl.NumberFormat("de-DE", {
    minimumFractionDigits: decimal,
    maximumFractionDigits: decimal,
  }).format(number);
}
