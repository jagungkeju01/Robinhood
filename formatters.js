export function formatTime(date = new Date(), options = {}) {
  return new Intl.DateTimeFormat("en-GB", { hour: "2-digit", minute: "2-digit", second: "2-digit", ...options }).format(date);
}
export function relativeTime(timestamp) {
  const minutes = Math.max(0, Math.round((Date.now() - timestamp) / 60000));
  if (minutes < 1) return "Just now";
  if (minutes < 60) return `${minutes} min ago`;
  const hours = Math.floor(minutes / 60);
  return `${hours} hr ago`;
}
export function safeText(value, fallback = "Not available") {
  return value === undefined || value === null || value === "" ? fallback : value;
}
export function escapeHTML(value = "") {
  return String(value).replace(/[&<>"']/g, char => ({ "&":"&amp;", "<":"&lt;", ">":"&gt;", '"':"&quot;", "'":"&#39;" }[char]));
}