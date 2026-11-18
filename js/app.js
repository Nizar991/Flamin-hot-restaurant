const $ = (s) => document.querySelector(s),
  $$ = (s) => [...document.querySelectorAll(s)],
  m = (n) => "£" + n.toFixed(2);
const calm = matchMedia("(prefers-reduced-motion:reduce)").matches;
const prefersTouch = matchMedia("(pointer: coarse)").matches;

window.addEventListener("load", () => {
  const loader = $("#loader");
  const line = $(".loader-line i");
  if (line && window.gsap) {
    gsap.to(line, {
      width: "100%",
      duration: 0.7,
      ease: "power2.out",
      onComplete: () => {
        gsap.to(loader, {
          opacity: 0,
          duration: 0.45,
          delay: 0.15,
          onComplete: () => loader?.classList.add("done"),
        });
      },
    });
  } else {
    loader?.classList.add("done");
  }
});

const cursor = $(".cursor");
if (!prefersTouch && cursor) {
  window.addEventListener("mousemove", (event) => {
    if (window.gsap) {
      window.gsap.to(cursor, {
        x: event.clientX,
        y: event.clientY,
        duration: 0.12,
        ease: "power2.out",
      });
    } else {
      cursor.style.left = `${event.clientX}px`;
      cursor.style.top = `${event.clientY}px`;
    }
  });
  document.querySelectorAll("a,button,.card").forEach((item) => {
    item.addEventListener("mouseenter", () => cursor.classList.add("big"));
    item.addEventListener("mouseleave", () => cursor.classList.remove("big"));
  });
}

window.addEventListener(
  "scroll",
  () =>
    document
      .querySelector("header")
      ?.classList.toggle("scrolled", scrollY > 30),
  { passive: true },
);
let cart = [];
try {
  cart = JSON.parse(localStorage.getItem("fh") || "[]");
} catch (e) {}
let cat = MENU.Pizzas ? "Pizzas" : Object.keys(MENU)[0],
  q = "";
const save = () => {
  try {
    localStorage.setItem("fh", JSON.stringify(cart));
  } catch (e) {}
};
$("#justLink").href = BIZ.links.just;
// Open/closed badge (London time). Motive: customers need to know instantly if we're open.
function status() {
  const p = Object.fromEntries(
    new Intl.DateTimeFormat("en-GB", {
      timeZone: "Europe/London",
      weekday: "short",
      hour: "numeric",
      minute: "numeric",
      hourCycle: "h23",
    })
      .formatToParts(new Date())
      .map((x) => [x.type, x.value]),
  );
  const t = +p.hour * 60 + +p.minute,
    end = p.weekday == "Fri" || p.weekday == "Sat" ? 1440 : 1380,
    on = t >= 720 && t < end,
    s = $("#status");
  s.className = "status " + (on ? "on" : "off");
  s.textContent = on ? "Open now" : "Closed · opens 12pm";
}
status();
setInterval(status, 60000);
// Menu rendering. Motive: all content comes from data.js so edits are one-file changes.
const FOOD_IMAGES = {
  Pizzas:
    "https://images.unsplash.com/photo-1574071318508-1cdbab80d002?auto=format&fit=crop&w=900&q=85",
  Burgers:
    "https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=900&q=85",
  Doner:
    "https://images.unsplash.com/photo-1529006557810-274b9b2fc783?auto=format&fit=crop&w=900&q=85",
  "Box Meals":
    "https://images.unsplash.com/photo-1547592180-85f173990554?auto=format&fit=crop&w=900&q=85",
  "Paninis & Wraps":
    "https://images.unsplash.com/photo-1626700051175-6818013e1d4f?auto=format&fit=crop&w=900&q=85",
  Sides:
    "https://images.unsplash.com/photo-1573080496219-bb080dd4f877?auto=format&fit=crop&w=900&q=85",
  Kids: "https://images.unsplash.com/photo-1562967914-608f82629710?auto=format&fit=crop&w=900&q=85",
  "Shakes & Sweets":
    "https://images.unsplash.com/photo-1579954115545-a95591f28bfc?auto=format&fit=crop&w=900&q=85",
  Drinks:
    "https://images.unsplash.com/photo-1544145945-f90425340c7e?auto=format&fit=crop&w=900&q=85",
};
function foodImage(category, name) {
  if (q) {
    for (const [menuCategory, items] of Object.entries(MENU)) {
      if (items.some((item) => item[0] === name))
        return FOOD_IMAGES[menuCategory];
    }
  }
  return FOOD_IMAGES[category] || FOOD_IMAGES.Pizzas;
}
function listIndex(name) {
  const list = q ? Object.values(MENU).flat() : MENU[cat] || [];
  return list.findIndex((item) => item[0] === name);
}
function card([n, d, p, t]) {
  const pz = Array.isArray(p);
  return `<article class="card"><div class="card-image"><img src="${foodImage(cat, n)}" alt="${n}" loading="lazy" onerror="this.style.display='none'"><span class="card-number">${String(listIndex(n) + 1).padStart(2, "0")}</span><span class="card-flame" aria-hidden="true">FIRE</span></div><div class="card-copy"><h3>${n}${t == "v" ? '<span class="b v">Veg</span>' : t == "h" ? '<span class="b h">Spicy</span>' : ""}</h3><p>${d || "Made fresh and served hot."}</p>
${pz ? `<div class="row"><select aria-label="Size"><option value="0">9"</option><option value="1">12"</option></select><select aria-label="Crust">${CRUSTS.map((c, i) => `<option value="${i}">${c[0]}${c[1] ? " +£1" : ""}</option>`).join("")}</select></div>` : ""}
<div class="row"><span class="price">${pz ? "from " + m(p[0]) : m(p)}</span><button class="card-add" data-n="${n}"><span>Add</span><b>+</b></button></div></div></article>`;
}
function find(n) {
  for (const c in MENU) {
    const i = MENU[c].find((x) => x[0] == n);
    if (i) return i;
  }
}
function render() {
  const list = q
    ? Object.values(MENU)
        .flat()
        .filter((i) => (i[0] + i[1]).toLowerCase().includes(q))
    : MENU[cat];
  $("#grid").innerHTML = list.length
    ? list.map(card).join("")
    : "<p>Nothing matches. Try another word.</p>";
  $$("#tabs button").forEach((b) =>
    b.classList.toggle("on", b.textContent == cat && !q),
  );
  if (!calm && window.gsap)
    gsap.from(".card", {
      y: 24,
      opacity: 1,
      duration: 0.45,
      stagger: 0.04,
      clearProps: "all",
    });
}
$("#tabs").innerHTML = Object.keys(MENU)
  .map((c) => `<button>${c}</button>`)
  .join("");
cat = MENU.Pizzas ? "Pizzas" : Object.keys(MENU)[0];
$("#tabs").onclick = (e) => {
  if (e.target.tagName == "BUTTON") {
    cat = e.target.textContent;
    q = "";
    $("#search").value = "";
    render();
  }
};
$("#search").oninput = (e) => {
  q = e.target.value.trim().toLowerCase();
  render();
};
const DEAL_IMAGES = [
  "https://images.unsplash.com/photo-1594007654729-407eedc4be65?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1565299624946-b28f40a0ae38?auto=format&fit=crop&w=1200&q=85",
  "https://images.unsplash.com/photo-1550547660-d9450f859349?auto=format&fit=crop&w=1200&q=85",
];
$("#dealGrid").innerHTML = DEALS.map(
  (d, i) =>
    `<article class="deal"><div class="deal-tab">DEAL 0${i + 1}</div><div class="deal-media"><img src="${DEAL_IMAGES[i]}" alt="${d[0]}" loading="lazy" onerror="this.style.display='none'"><div class="deal-cutout" aria-hidden="true">HOT</div></div><div class="deal-copy"><p>${d[1]}</p><h3>${d[0]}</h3><div><span class="price">${m(d[2])}</span><button data-deal="${i}"><span>Add deal</span><b>+</b></button></div></div></article>`,
).join("");
$("#revGrid").innerHTML = REVIEWS.map(
  (r) =>
    `<blockquote><p>“${r[1]}”</p><small>${r[2]} (${r[0]})</small></blockquote>`,
).join("");
// Cart. Motive: a working basket makes the demo feel like a real shop.
function add(name, price, opt = "") {
  const k = name + opt,
    x = cart.find((i) => i.k == k);
  x ? x.q++ : cart.push({ k, name, opt, price, q: 1 });
  save();
  draw();
  bump();
}
function bump() {
  if (!calm && window.gsap)
    gsap.fromTo(
      "#cartBtn",
      { scale: 1.25 },
      { scale: 1, duration: 0.5, ease: "elastic.out(1,.4)" },
    );
}
document.addEventListener("click", (e) => {
  const b = e.target.closest("button");
  if (!b) return;
  if (b.dataset.deal) {
    const d = DEALS[b.dataset.deal];
    add(d[0], d[2]);
  } else if (b.dataset.n) {
    const i = find(b.dataset.n),
      c = b.closest(".card");
    if (Array.isArray(i[2])) {
      const [s, cr] = c.querySelectorAll("select"),
        sz = +s.value,
        k = +cr.value;
      add(
        i[0],
        i[2][sz] + CRUSTS[k][1],
        ` · ${sz ? '12"' : '9"'} · ${CRUSTS[k][0]}`,
      );
    } else add(i[0], i[2]);
  } else if (b.dataset.step) {
    const x = cart[b.dataset.i];
    x.q += +b.dataset.step;
    if (x.q < 1) cart.splice(b.dataset.i, 1);
    save();
    draw();
  }
});
function draw() {
  $("#count").textContent = cart.reduce((a, i) => a + i.q, 0);
  $("#items").innerHTML = cart.length
    ? cart
        .map(
          (i, n) =>
            `<div class="li"><span>${i.name}<small>${i.opt}</small></span><span><button data-i="${n}" data-step="-1" aria-label="Less">−</button> ${i.q} <button data-i="${n}" data-step="1" aria-label="More">+</button></span><b>${m(i.price * i.q)}</b></div>`,
        )
        .join("")
    : '<p style="color:var(--mu);padding:14px 0">Your basket is empty. Pick something hot from the menu.</p>';
  $("#total").textContent = m(cart.reduce((a, i) => a + i.price * i.q, 0));
  $("#co").hidden = !cart.length;
}
const open = (v) => {
  $("#drawer").classList.toggle("open", v);
  $("#veil").classList.toggle("on", v);
  $("#drawer").setAttribute("aria-hidden", !v);
};
$("#cartBtn").onclick = () => open(true);
$("#close").onclick = $("#veil").onclick = () => open(false);
$("#again").onclick = () => {
  $("#done").hidden = true;
  open(false);
  location.hash = "#menu";
};
$("#co").onsubmit = (e) => {
  e.preventDefault();
  $("#ref").textContent =
    "Order ref FH-" +
    Math.floor(1000 + Math.random() * 9000) +
    " · " +
    $("#total").textContent;
  cart = [];
  save();
  draw();
  $("#co").hidden = true;
  $("#done").hidden = false;
};
$("#contact").onsubmit = (e) => {
  e.preventDefault();
  $("#sent").hidden = false;
  e.target.reset();
};
draw();
render();
// Motion. Motive: one big hero moment (flames + embers), then reveals that follow the scroll.
const em = $("#embers");
if (!calm)
  for (let i = 0; i < 28; i++) {
    const s = document.createElement("i");
    s.style.cssText = `left:${Math.random() * 100}%;--dx:${Math.random() * 80 - 40}px;animation-duration:${4 + Math.random() * 6}s;animation-delay:${-Math.random() * 8}s`;
    em.append(s);
  }
if (!calm && window.gsap) {
  gsap.registerPlugin(ScrollTrigger);
  gsap.set(
    [".hero-copy .eyebrow", ".hero-copy .sub", ".hero-copy .cta", ".hero-art"],
    { autoAlpha: 0 },
  );
  gsap
    .timeline({ delay: 1.05 })
    .to(".hero-copy .eyebrow", { autoAlpha: 1, y: 0, duration: 0.5 })
    .from(
      "h1 span",
      {
        yPercent: 115,
        rotate: 3,
        duration: 1,
        stagger: 0.11,
        ease: "power4.out",
      },
      "-=.2",
    )
    .from(".hero .sub", { y: 30, autoAlpha: 0, duration: 0.7 }, "-=.7")
    .from(".hero .cta", { y: 20, autoAlpha: 0, duration: 0.7 }, "-=.5")
    .to(
      ".hero-art",
      { autoAlpha: 1, scale: 1, duration: 1.1, ease: "expo.out" },
      "-=.9",
    );
  gsap.from(".heat-disc", {
    scale: 0.72,
    rotation: -12,
    duration: 1.2,
    delay: 1.05,
    ease: "back.out(1.4)",
  });

  gsap.utils.toArray(".section-heading").forEach((heading) => {
    gsap.from(heading, {
      scrollTrigger: { trigger: heading, start: "top 82%" },
      y: 50,
      autoAlpha: 0,
      duration: 0.8,
      ease: "power3.out",
    });
  });
  gsap.from(".card", {
    scrollTrigger: { trigger: ".grid", start: "top 82%" },
    y: 40,
    stagger: 0.035,
    duration: 0.55,
  });
  gsap.from(".story-panel", {
    scrollTrigger: { trigger: ".story", start: "top 68%" },
    x: -80,
    autoAlpha: 0,
    duration: 1,
    ease: "power3.out",
  });
  gsap.from(".flame-stack", {
    scrollTrigger: { trigger: ".story", start: "top 70%", scrub: 1 },
    x: 160,
    rotate: 12,
  });
  gsap.from(".rev blockquote", {
    scrollTrigger: { trigger: ".rev", start: "top 82%" },
    y: 60,
    rotate: 2,
    autoAlpha: 0,
    stagger: 0.12,
    duration: 0.75,
  });
}
