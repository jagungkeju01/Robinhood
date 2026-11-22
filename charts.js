// Grafik gempa dirender di earthquakes.js karena bergantung langsung pada hasil feed USGS.
// File ini disediakan sebagai modul untuk grafik lingkungan tambahan di pengembangan berikutnya.
export function formatChartValue(value) {
  return new Intl.NumberFormat("en-US", { maximumFractionDigits: 2 }).format(value);
}