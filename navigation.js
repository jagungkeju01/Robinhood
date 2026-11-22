export function initNavigation() {
  const toggle = document.querySelector("#mobile-menu");
  const nav = document.querySelector("#main-nav");
  toggle?.addEventListener("click", () => {
    const open = nav.classList.toggle("open");
    toggle.setAttribute("aria-expanded", String(open));
    toggle.innerHTML = open ? '<i data-lucide="x"></i>' : '<i data-lucide="menu"></i>';
    window.lucide?.createIcons();
  });
  nav?.querySelectorAll("a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));
  document.querySelectorAll('a[href^="#"]').forEach(link => link.addEventListener("click", event => {
    const target = document.querySelector(link.getAttribute("href"));
    if (target) { event.preventDefault(); target.scrollIntoView({ behavior: "smooth", block: "start" }); }
  }));
}