const burger = document.querySelector(".burger");
const menu = document.querySelector(".menu");

burger.addEventListener("click", () => {
  const open = menu.hasAttribute("hidden");
  menu.toggleAttribute("hidden", !open);
  burger.setAttribute("aria-expanded", String(open));
});

menu.addEventListener("click", (event) => {
  if (event.target.closest("a")) {
    menu.hidden = true;
    burger.setAttribute("aria-expanded", "false");
  }
});

const links = [...document.querySelectorAll(".sidenav__link")];
const sections = links.map((link) => document.querySelector(link.getAttribute("href")));
const activeIcon = "assets/nav-active.svg";
const idleIcon = "assets/nav-dot.svg";

const scroller = document.querySelector("main");
const desktop = window.matchMedia("(min-width: 1101px)");

const mark = document.querySelector(".mark");
const markScreens = ["hero", "about", "partners"];

function syncMark(id) {
  const step = markScreens.indexOf(id);
  mark.classList.toggle("is-hidden", step < 0);
  if (step >= 0) mark.dataset.step = String(step);
}

const spy = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    links.forEach((link) => {
      const on = link.getAttribute("href") === `#${entry.target.id}`;
      link.classList.toggle("is-active", on);
      link.querySelector("img").src = on ? activeIcon : idleIcon;
    });
    if (!desktop.matches) syncMark(entry.target.id);
  });
}, { root: desktop.matches ? scroller : null, threshold: 0.6 });

sections.forEach((section) => spy.observe(section));

function currentIndex() {
  const top = scroller.scrollTop;
  let index = 0;
  sections.forEach((section, i) => {
    if (section.offsetTop <= top + window.innerHeight * 0.4) index = i;
  });
  return index;
}

function goTo(index) {
  const next = Math.max(0, Math.min(sections.length - 1, index));
  syncMark(sections[next].id);
  sections[next].scrollIntoView({ behavior: "smooth", block: "start" });
}

const historySection = document.querySelector("#history");
const historyIndex = sections.indexOf(historySection);
const historyLast = 3;
let historyStep = 0;

function setHistoryStep(step) {
  historyStep = step;
  const timeline = historySection.querySelector(".timeline");
  timeline.dataset.step = String(step);
  timeline.querySelectorAll(".timeline__point").forEach((point) => {
    point.classList.toggle("is-active", Number(point.dataset.step) === step);
  });
  historySection.querySelectorAll(".history-pane").forEach((pane) => {
    pane.classList.toggle("is-active", Number(pane.dataset.step) === step);
  });
}

function moveHistory(direction) {
  const index = currentIndex();
  if (index === historyIndex) {
    const next = historyStep + direction;
    if (next >= 0 && next <= historyLast) {
      setHistoryStep(next);
      return true;
    }
    return false;
  }
  if (direction > 0 && index + 1 === historyIndex) setHistoryStep(0);
  if (direction < 0 && index - 1 === historyIndex) setHistoryStep(historyLast);
  return false;
}

const solutionsSection = document.querySelector("#solutions");
const solutionsIndex = sections.indexOf(solutionsSection);
const solutionsLast = 2;
let solutionsStep = 0;

function setSolutionsStep(step) {
  solutionsStep = step;
  const board = solutionsSection.querySelector(".solutions");
  board.dataset.step = String(step);
  board.querySelectorAll(".solutions__row").forEach((row) => {
    row.classList.toggle("is-active", Number(row.dataset.step) === step);
  });
}

function moveSolutions(direction) {
  const index = currentIndex();
  if (index === solutionsIndex) {
    const next = solutionsStep + direction;
    if (next >= 0 && next <= solutionsLast) {
      setSolutionsStep(next);
      return true;
    }
    return false;
  }
  if (direction > 0 && index + 1 === solutionsIndex) setSolutionsStep(0);
  if (direction < 0 && index - 1 === solutionsIndex) setSolutionsStep(solutionsLast);
  return false;
}

const clientsSection = document.querySelector("#clients");
const clientsIndex = sections.indexOf(clientsSection);
let clientsSide = "retail";

function setClientsSide(side, animate = true) {
  const changed = clientsSection.dataset.side !== side;
  if (!animate) clientsSection.classList.add("is-instant");
  else if (changed) clientsSection.classList.add("is-animated");
  clientsSide = side;
  clientsSection.dataset.side = side;
  clientsSection.querySelectorAll(".clients__idle").forEach((button) => {
    const open = button.closest(".clients__pane").dataset.pane === side;
    button.tabIndex = open ? -1 : 0;
    button.setAttribute("aria-expanded", String(open));
  });
  if (!animate) {
    void clientsSection.offsetWidth;
    clientsSection.classList.remove("is-instant");
  }
}

function moveClients(direction) {
  const index = currentIndex();
  if (index === clientsIndex) {
    if (direction > 0 && clientsSide === "retail") {
      setClientsSide("wholesale");
      return true;
    }
    if (direction < 0 && clientsSide === "wholesale") {
      setClientsSide("retail");
      return true;
    }
    return false;
  }
  if (direction > 0 && index + 1 === clientsIndex) setClientsSide("retail", false);
  if (direction < 0 && index - 1 === clientsIndex) setClientsSide("wholesale", false);
  return false;
}

function moveScreen(direction) {
  if (moveClients(direction)) return 900;
  if (moveSolutions(direction)) return 700;
  if (moveHistory(direction)) return 700;
  return 0;
}

let wheelLock = false;
scroller.addEventListener("scrollend", () => {
  if (!desktop.matches) return;
  syncMark(sections[currentIndex()].id);
});

scroller.addEventListener("wheel", (event) => {
  if (!desktop.matches || Math.abs(event.deltaY) < 8) return;
  event.preventDefault();
  if (wheelLock) return;
  wheelLock = true;
  const direction = event.deltaY > 0 ? 1 : -1;
  const hold = moveScreen(direction);
  if (!hold) goTo(currentIndex() + direction);
  window.setTimeout(() => { wheelLock = false; }, hold || 700);
}, { passive: false });

let touchStartX = 0;
let touchStartY = 0;
let touchInGallery = false;
scroller.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
  touchInGallery = Boolean(event.target.closest(".gallery"));
}, { passive: true });
scroller.addEventListener("touchend", (event) => {
  if (!desktop.matches) return;
  const dx = touchStartX - event.changedTouches[0].clientX;
  const dy = touchStartY - event.changedTouches[0].clientY;
  if (touchInGallery && Math.abs(dx) > Math.abs(dy)) return;
  if (Math.abs(dy) < 48) return;
  const direction = dy > 0 ? 1 : -1;
  if (!moveScreen(direction)) goTo(currentIndex() + direction);
});

window.addEventListener("keydown", (event) => {
  if (!desktop.matches) return;
  if (event.key === "ArrowDown" || event.key === "PageDown") {
    event.preventDefault();
    if (!moveScreen(1)) goTo(currentIndex() + 1);
  }
  if (event.key === "ArrowUp" || event.key === "PageUp") {
    event.preventDefault();
    if (!moveScreen(-1)) goTo(currentIndex() - 1);
  }
});

document.querySelectorAll(".sidenav__link, .menu a, .hero-actions a").forEach((link) => {
  link.addEventListener("click", (event) => {
    const id = link.getAttribute("href");
    if (!id || !id.startsWith("#") || !desktop.matches) return;
    const section = document.querySelector(id);
    if (!section) return;
    if (id === "#history") setHistoryStep(0);
    if (id === "#solutions") setSolutionsStep(0);
    if (id === "#clients") setClientsSide("retail");
    syncMark(id.slice(1));
    event.preventDefault();
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

syncMark(location.hash.replace("#", "") || "hero");

document.querySelector(".lang").addEventListener("click", (event) => {
  const button = event.target.closest("button");
  if (!button) return;
  document.querySelectorAll(".lang button").forEach((item) => {
    item.classList.toggle("is-active", item === button);
  });
  document.documentElement.lang = button.dataset.lang === "en" ? "en" : "ru";
});

document.querySelectorAll(".clients__idle").forEach((button) => {
  button.addEventListener("click", () => {
    setClientsSide(button.closest(".clients__pane").dataset.pane);
  });
});

historySection.querySelectorAll(".timeline__point").forEach((point) => {
  point.addEventListener("click", () => setHistoryStep(Number(point.dataset.step)));
});
const galleryEl = document.querySelector(".gallery");
const gallery = new Swiper(galleryEl, {
  slidesPerView: "auto",
  spaceBetween: 12,
  loop: true,
  speed: 700,
  grabCursor: true,
  keyboard: { enabled: true, onlyInViewport: true },
  a11y: {
    prevSlideMessage: "Предыдущее фото",
    nextSlideMessage: "Следующее фото",
  },
  navigation: {
    nextEl: ".gallery__next",
    prevEl: ".gallery__prev",
  },
});

document.querySelector(".tabs").addEventListener("click", (event) => {
  const tab = event.target.closest("button");
  if (!tab) return;
  document.querySelectorAll(".tabs button").forEach((item) => {
    const on = item === tab;
    item.classList.toggle("is-active", on);
    item.setAttribute("aria-selected", String(on));
  });
  const photo = tab.dataset.tab === "photo";
  document.querySelector('[data-panel="photo"]').hidden = !photo;
  document.querySelector('[data-panel="video"]').hidden = photo;
  if (photo) gallery.update();
});
