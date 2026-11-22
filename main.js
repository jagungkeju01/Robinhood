import { initClock } from "./clock.js";
import { initNavigation } from "./navigation.js";
import { initMap } from "./map.js";
import { loadWeather } from "./weather.js";
import { loadEarthquakes } from "./earthquakes.js";
import { CONFIG } from "./config.js";

function initIcons() { window.lucide?.createIcons(); }
function initRefresh() {
  document.querySelector(".refresh-weather")?.addEventListener("click", loadWeather);
  document.querySelector("#refresh-quakes")?.addEventListener("click", () => loadEarthquakes(window.earthMap || null));
}
async function start() {
  initIcons();
  initClock();
  initNavigation();
  const map = initMap();
  window.earthMap = map;
  initRefresh();
  await Promise.allSettled([loadWeather(), loadEarthquakes(map)]);
  // Refresh data periodically; source APIs have their own update schedules.
  setInterval(() => { loadWeather(); loadEarthquakes(map); }, CONFIG.refreshIntervalMs);
}
if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", start);
else start();