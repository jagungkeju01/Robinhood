import { CONFIG } from "./config.js";
import { getJSON } from "./api.js";
export async function loadWeather() {
  const temp = document.querySelector("#weather-temp");
  const desc = document.querySelector("#weather-description");
  const loc = document.querySelector("#weather-location");
  try {
    const { latitude, longitude, name } = CONFIG.defaultLocation;
    const url = `${CONFIG.weatherUrl}?latitude=${latitude}&longitude=${longitude}&current=temperature_2m,relative_humidity_2m,apparent_temperature,weather_code,wind_speed_10m&timezone=auto`;
    const data = await getJSON(url);
    const current = data.current;
    temp.innerHTML = `${Math.round(current.temperature_2m)}<span>°C</span>`;
    desc.textContent = `${weatherLabel(current.weather_code)} · Wind ${Math.round(current.wind_speed_10m)} km/h · Humidity ${current.relative_humidity_2m}%`;
    loc.textContent = name;
    return current;
  } catch (error) {
    temp.innerHTML = `N/A<span></span>`;
    desc.textContent = "Data cuaca tidak tersedia. Periksa koneksi internet.";
    loc.textContent = "Open-Meteo · unavailable";
    console.warn("Weather API:", error);
    return null;
  }
}
function weatherLabel(code) {
  if (code === 0) return "Clear sky";
  if ([1,2,3].includes(code)) return "Cloudy conditions";
  if ([45,48].includes(code)) return "Fog";
  if ([51,53,55,56,57].includes(code)) return "Drizzle";
  if ([61,63,65,66,67,80,81,82].includes(code)) return "Rain";
  if ([71,73,75,77,85,86].includes(code)) return "Snow";
  if ([95,96,99].includes(code)) return "Thunderstorm";
  return "Current conditions";
}