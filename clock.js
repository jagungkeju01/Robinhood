import { formatTime } from "./formatters.js";
export function initClock() {
  const utc = document.querySelector("#utc-clock");
  const local = document.querySelector("#local-clock");
  const update = () => {
    const now = new Date();
    if (utc) utc.textContent = `${formatTime(now, { timeZone: "UTC" })} UTC`;
    if (local) local.textContent = formatTime(now);
  };
  update();
  setInterval(update, 1000);
}