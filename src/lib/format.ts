export function formatFCFA(amount: number) {
  const value = new Intl.NumberFormat("en-US", {
    maximumFractionDigits: 0,
  }).format(amount);
  return `${value} FCFA`;
}

export function formatDuration(days: number) {
  if (days === 1) return "1 day";
  return `${days} days`;
}

/** A tour's price, or a prompt to ask when the owner hasn't set one. */
export function formatPrice(amount: number | undefined) {
  return amount === undefined ? "Ask for price" : formatFCFA(amount);
}
