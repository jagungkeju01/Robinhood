export function initMap() {
  const element = document.querySelector("#earth-map");
  if (!element || !window.L) return null;
  const map = L.map(element, { zoomControl:true, scrollWheelZoom:false }).setView([-2, 118], 4);
  const street = L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", { maxZoom:18, attribution:'&copy; OpenStreetMap contributors' });
  const satellite = L.tileLayer("https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}", { maxZoom:18, attribution:'Tiles &copy; Esri' });
  street.addTo(map);
  document.querySelectorAll("[data-map]").forEach(button => button.addEventListener("click", () => {
    document.querySelectorAll("[data-map]").forEach(b => b.classList.toggle("active", b === button));
    map.removeLayer(street); map.removeLayer(satellite);
    (button.dataset.map === "satellite" ? satellite : street).addTo(map);
  }));
  map.on("mousemove", event => {
    const el = document.querySelector("#map-coords");
    if (el) el.textContent = `LAT ${event.latlng.lat.toFixed(4)} / LNG ${event.latlng.lng.toFixed(4)}`;
  });
  map.on("click", event => {
    L.popup().setLatLng(event.latlng).setContent(`<b>Selected coordinates</b><br>LAT ${event.latlng.lat.toFixed(4)}<br>LNG ${event.latlng.lng.toFixed(4)}`).openOn(map);
  });
  setTimeout(() => map.invalidateSize(), 200);
  return map;
}