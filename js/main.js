import { profile, heroStack, projects, experience, skills, certs, education, i18n } from "./data.js";
import { initRobot } from "./robot.js";

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
let lang = localStorage.getItem("lang") || "es";

const chip = (t) => `<span class="chip"><i style="--c:${t.c}"></i>${t.name}</span>`;
const arrow = `<svg viewBox="0 0 24 24"><path d="M5 12h14M13 6l6 6-6 6"/></svg>`;
const icons = [
  `<svg viewBox="0 0 24 24"><path d="m12 2 9 5-9 5-9-5zM3 12l9 5 9-5M3 17l9 5 9-5"/></svg>`,
  `<svg viewBox="0 0 24 24"><path d="M12 2 4 6v6c0 5 3.5 8.5 8 10 4.5-1.5 8-5 8-10V6zM9 12l2 2 4-4"/></svg>`,
  `<svg viewBox="0 0 24 24"><path d="M9 18h6M10 22h4M12 2a7 7 0 0 0-4 12.7c.6.5 1 1.3 1 2.3h6c0-1 .4-1.8 1-2.3A7 7 0 0 0 12 2z"/></svg>`,
];

function render() {
  const t = i18n[lang];
  document.documentElement.lang = lang;

  $$("[data-i18n]").forEach((el) => { const v = t[el.dataset.i18n]; if (v) el.textContent = v; });
  $$("[data-i18n-html]").forEach((el) => { const v = t[el.dataset.i18nHtml]; if (v) el.innerHTML = v; });

  const f = projects[0][lang];
  $("#featTitle").textContent = f.title;
  $("#featDesc").textContent = f.desc;
  $("#heroStack").innerHTML = heroStack.map(chip).join("");

  $("#aboutCards").innerHTML = t["about.cards"].map(([h, p], i) =>
    `<div class="acard" data-reveal style="--d:${i * .1}s"><span class="ico">${icons[i]}</span><div><h4>${h}</h4><p>${p}</p></div></div>`).join("");

  $("#projectList").innerHTML = projects.map((p, i) => `
    <a class="proj" href="${p.href}" ${p.href.startsWith("http") ? 'target="_blank" rel="noopener"' : ""} data-reveal style="--d:${i * .1}s">
      <span class="mono tag">${p[lang].tag}</span>
      <h3>${p[lang].title}</h3><p>${p[lang].desc}</p>
      <div class="chips">${p.stack.map(chip).join("")}</div>
      <span class="go">${t["projects.go"]} ${arrow}</span>
    </a>`).join("");

  $("#timeline").innerHTML = experience.map((e, i) => `
    <li class="tl ${e.now ? "now" : ""}" data-reveal style="--d:${i * .08}s">
      <div class="tl-top"><div><h3>${e[lang].role}${e.now ? '<span class="badge-now">ACTUAL</span>' : ""}</h3><p class="org">${e[lang].org}</p></div><span class="when">${e[lang].when}</span></div>
      <ul>${e[lang].bullets.map((b) => `<li>${b}</li>`).join("")}</ul>
      <div class="chips">${e.stack.map(chip).join("")}</div>
    </li>`).join("");

  $("#skillGroups").innerHTML = skills.map((g, i) => `
    <div class="sk" data-reveal style="--d:${i * .07}s"><h4>${g[lang]}</h4>
      <div class="chips">${g.items.map(([n, lv, c]) => `<span class="chip" title="${["", t["skills.learning"], t["skills.exp"], t["skills.daily"]][lv]}"><i class="lv l${lv}"></i>${n}</span>`).join("")}</div>
    </div>`).join("");

  $("#eduList").innerHTML = education.map((e) => `
    <div class="ecard" data-reveal>
      <h3>${e[lang].title}</h3><p class="org">${e[lang].org}</p>
      <div class="bar"><u data-w="${e.pct}"></u></div><small>${e[lang].progress}</small>
      <ul>${e[lang].courses.map((c) => `<li>${c}</li>`).join("")}</ul>
    </div>`).join("");

  $("#certList").innerHTML = certs.map((c, i) => `
    <div class="ecard" data-reveal style="--d:${i * .07}s"><span class="mono tag">${c[lang].when}</span>
      <h3>${c[lang].title}</h3><p class="org">${c[lang].org}</p><p class="cdesc">${c[lang].desc}</p></div>`).join("");

  $$("[data-lang]").forEach((b) => b.classList.toggle("on", b.dataset.lang === lang));
  observeReveals();
}

const io = new IntersectionObserver((entries) => {
  entries.forEach((e) => {
    if (!e.isIntersecting) return;
    e.target.classList.add("in");
    $$("u[data-w]", e.target).forEach((u) => (u.style.width = u.dataset.w + "%"));
    io.unobserve(e.target);
  });
}, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
function observeReveals() { $$("[data-reveal]:not(.in)").forEach((el) => io.observe(el)); }

function setupLinks() {
  ["", "2", "3"].forEach((s) => {
    const g = $("#lnkGithub" + s), l = $("#lnkLinkedin" + s);
    if (g) g.href = profile.github; if (l) l.href = profile.linkedin;
  });
  $("#emailText").textContent = profile.email;
  $("#introUrl").textContent = profile.domain;
  $("#year").textContent = new Date().getFullYear();

  const copy = async (btn, labelSel) => {
    try { await navigator.clipboard.writeText(profile.email); } catch { /* sin permiso */ }
    const span = labelSel ? $(labelSel, btn) : btn.firstChild;
    const old = span.textContent; span.textContent = i18n[lang]["hero.copied"];
    setTimeout(() => (span.textContent = old), 1600);
  };
  $("#copyEmail").addEventListener("click", (e) => copy(e.currentTarget, "span"));
  $("#copyEmail2").addEventListener("click", (e) => copy(e.currentTarget, "em"));

  const tick = () => ($("#clock").textContent = new Date().toLocaleTimeString("es-PE", { hour: "2-digit", minute: "2-digit", hour12: false, timeZone: profile.timezone }));
  tick(); setInterval(tick, 15000);

  $("#form").addEventListener("submit", (e) => {
    e.preventDefault();
    const f = new FormData(e.target);
    const subject = encodeURIComponent(`Portafolio: mensaje de ${f.get("name")}`);
    const body = encodeURIComponent(`${f.get("msg")}\n\n— ${f.get("name")} (${f.get("email")})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
    $("#formNote").textContent = i18n[lang]["contact.ok"];
  });
}

$$("[data-lang]").forEach((b) => b.addEventListener("click", () => { lang = b.dataset.lang; localStorage.setItem("lang", lang); render(); }));

const spy = new IntersectionObserver((es) => es.forEach((e) => {
  if (e.isIntersecting) $$("[data-link]").forEach((a) => a.classList.toggle("active", a.dataset.link === e.target.id));
}), { rootMargin: "-45% 0px -50% 0px" });
["top", "about", "projects", "experience"].forEach((id) => spy.observe($("#" + id)));
document.addEventListener("pointermove", (e) => {
  const p = e.target.closest?.(".proj"); if (!p) return;
  const r = p.getBoundingClientRect(); p.style.setProperty("--mx", e.clientX - r.left + "px"); p.style.setProperty("--my", e.clientY - r.top + "px");
});

function runIntro(robot) {
  const intro = $("#intro"), pct = $("#introPct"), bar = $("#introBar");
  document.body.classList.add("locked");
  let done = false, start = performance.now();
  const DURATION = 3800;
  const finish = () => {
    if (done) return; done = true;
    intro.classList.add("done");
    document.body.classList.remove("locked");
    document.body.classList.add("ready");
    robot?.setMode("widget");
    sessionStorage.setItem("introSeen", "1");
    setTimeout(() => intro.remove(), 1100);
  };
  const step = (now) => {
    if (done) return;
    const p = Math.min(1, (now - start) / DURATION);
    const eased = 1 - Math.pow(1 - p, 3);
    pct.textContent = Math.round(eased * 100) + "%"; bar.style.width = eased * 100 + "%";
    p < 1 ? requestAnimationFrame(step) : setTimeout(finish, 250);
  };
  requestAnimationFrame(step);
  $("#skipIntro").addEventListener("click", finish);
  addEventListener("keydown", (e) => { if (e.key === "Escape" || e.key === "Enter") finish(); });
}

setupLinks();
render();
let robot = null;
try { robot = initRobot($("#robot")); } catch (err) { console.warn("WebGL no disponible:", err); }
if (sessionStorage.getItem("introSeen")) {
  $("#intro").remove(); document.body.classList.add("ready"); robot?.setMode("widget", true);
} else runIntro(robot);
