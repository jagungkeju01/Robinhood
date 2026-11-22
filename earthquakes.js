import { CONFIG } from "./config.js";
import { getJSON } from "./api.js";
import { relativeTime, escapeHTML } from "./formatters.js";
let quakeChart;
export let earthquakeFeatures = [];
export async function loadEarthquakes(map) {
  const list = document.querySelector("#earthquake-list");
  const count = document.querySelector("#quake-count");
  const updated = document.querySelector("#quake-updated");
  const status = document.querySelector("#event-feed-status");
  try {
    const data = await getJSON(CONFIG.earthquakeUrl);
    earthquakeFeatures = (data.features || []).filter(f => f.properties && f.geometry).slice(0, 100);
    count.innerHTML = `${data.metadata?.count ?? earthquakeFeatures.length}<span> events</span>`;
    updated.textContent = `Updated ${relativeTime(Date.now())}`;
    status.textContent = `Updated ${new Date().toLocaleTimeString()}`;
    if (!earthquakeFeatures.length) {
      list.innerHTML = '<tr><td colspan="5" class="table-loading">No events returned by the feed.</td></tr>';
      return;
    }
    list.innerHTML = earthquakeFeatures.slice(0, 8).map(feature => {
      const p = feature.properties;
      const coords = feature.geometry.coordinates;
      const mag = Number(p.mag || 0);
      const localTime = new Date(p.time).toLocaleString(undefined, { month:"short", day:"2-digit", hour:"2-digit", minute:"2-digit" });
      return `<tr><td><span class="magnitude ${mag >= 4.5 ? "high" : ""}">${mag.toFixed(1)}</span></td><td>${escapeHTML(p.place || "Unknown location")}</td><td>${Math.round(coords[2] || 0)} km</td><td><span class="event-time">${localTime}</span></td><td><a class="event-link" href="${p.url}" target="_blank" rel="noreferrer">Open report ↗</a></td></tr>`;
    }).join("");
    if (map) drawQuakes(map, earthquakeFeatures);
    drawChart(earthquakeFeatures);
    const note = document.querySelector("#chart-note");
    if (note) note.textContent = `${earthquakeFeatures.length} events loaded from USGS GeoJSON feed. Counts represent this feed, not all seismic events worldwide.`;
  } catch (error) {
    list.innerHTML = '<tr><td colspan="5" class="table-loading">USGS feed is currently unavailable. Try refreshing later.</td></tr>';
    status.textContent = "Feed unavailable";
    count.innerHTML = `N/A<span> events</span>`;
    updated.textContent = "Connection error";
    console.warn("Earthquake API:", error);
  }
}
function drawQuakes(map, features) {
  if (window.quakeLayer) map.removeLayer(window.quakeLayer);
  window.quakeLayer = L.layerGroup();
  features.slice(0, 50).forEach(f => {
    const [lng, lat, depth] = f.geometry.coordinates;
    const p = f.properties;
    const mag = Number(p.mag || 0);
    const size = Math.max(7, Math.min(18, 6 + mag * 2));
    const marker = L.marker([lat, lng], { icon: L.divIcon({ className:"", html:`<div class="quake-marker ${mag >= 4.5 ? "high" : ""}" style="width:${size}px;height:${size}px"></div>`, iconSize:[size,size], iconAnchor:[size/2,size/2] }) });
    marker.bindPopup(`<b>M ${mag.toFixed(1)} · ${escapeHTML(p.place || "Unknown location")}</b><br>Depth: ${Math.round(depth || 0)} km<br><a href="${p.url}" target="_blank" rel="noreferrer">Open USGS report ↗</a>`);
    marker.addTo(window.quakeLayer);
  });
  window.quakeLayer.addTo(map);
}
function drawChart(features) {
  const canvas = document.querySelector("#quake-chart");
  if (!canvas || !window.Chart) return;
  const buckets = ["< 1.0","1.0–1.9","2.0–2.9","3.0–3.9","4.0–4.9","5.0+"];
  const values = [0,0,0,0,0,0];
  features.forEach(f => {
    const mag = Number(f.properties.mag || 0);
    const index = mag < 1 ? 0 : mag < 2 ? 1 : mag < 3 ? 2 : mag < 4 ? 3 : mag < 5 ? 4 : 5;
    values[index]++;
  });
  if (quakeChart) quakeChart.destroy();
  quakeChart = new Chart(canvas, { type:"bar", data:{ labels:buckets, datasets:[{ label:"Events", data:values, backgroundColor:"#f06464", borderRadius:2, maxBarThickness:42 }] }, options:{ responsive:true, maintainAspectRatio:false, plugins:{ legend:{display:false}, tooltip:{displayColors:false} }, scales:{ x:{grid:{display:false},ticks:{color:"#777f80",font:{size:10}},border:{display:false}}, y:{beginAtZero:true,grid:{color:"#e9ebe7"},ticks:{color:"#777f80",precision:0,font:{size:10}},border:{display:false}} } } });
}