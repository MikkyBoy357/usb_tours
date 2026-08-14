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
