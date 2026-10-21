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
const sections = [...document.querySelectorAll("main > .screen")];
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
    const navId = entry.target.dataset.nav || entry.target.id;
    links.forEach((link) => {
      const on = link.getAttribute("href") === `#${navId}`;
      link.classList.toggle("is-active", on);
      link.querySelector("img").src = on ? activeIcon : idleIcon;
    });
    if (!desktop.matches) syncMark(navId);
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
  const target = sections[next];
  syncMark(target.dataset.nav || target.id);
  target.scrollIntoView({ behavior: "smooth", block: "start" });
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
  solutionsSection.querySelectorAll("[data-solutions-go]").forEach((item) => {
    const itemStep = Number(item.dataset.solutionsGo);
    item.classList.toggle("is-active", itemStep === step);
    item.classList.toggle("is-passed", itemStep < step);
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

const solutionStacks = [...document.querySelectorAll(".solutions--stack")].map((board) => {
  const section = board.closest(".screen");
  return {
    board,
    section,
    index: sections.indexOf(section),
    id: `#${section.id}`,
    last: board.querySelectorAll(".solutions__row").length - 1,
    step: Number(board.dataset.step) || 0,
  };
});

function setStackStep(stack, step, mode = 0) {
  stack.step = step;
  stack.board.dataset.step = String(step);
  stack.board.querySelectorAll(".solutions__row").forEach((row) => {
    const active = Number(row.dataset.step) === step;
    row.classList.toggle("is-active", active);
    row.classList.remove("is-entering", "is-entering-back");
    if (active && mode) {
      void row.offsetWidth;
      row.classList.add(mode > 0 ? "is-entering" : "is-entering-back");
    }
  });
}

function moveStacks(direction) {
  const index = currentIndex();
  for (const stack of solutionStacks) {
    if (index !== stack.index) continue;
    const next = stack.step + direction;
    if (next >= 0 && next <= stack.last) {
      setStackStep(stack, next, direction);
      return true;
    }
  }
  for (const stack of solutionStacks) {
    if (index === stack.index) continue;
    if (direction > 0 && index + 1 === stack.index) setStackStep(stack, 0, 1);
    if (direction < 0 && index - 1 === stack.index) setStackStep(stack, stack.last, -1);
  }
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
  if (moveStacks(direction)) return 1200;
  if (moveSolutionsSlider(direction)) return 900;
  if (moveHistory(direction)) return 700;
  return 0;
}

let wheelLock = false;
scroller.addEventListener("scrollend", () => {
  if (!desktop.matches) return;
  const active = sections[currentIndex()];
  syncMark(active.dataset.nav || active.id);
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
let touchInHistory = false;
scroller.addEventListener("touchstart", (event) => {
  touchStartX = event.touches[0].clientX;
  touchStartY = event.touches[0].clientY;
  touchInGallery = Boolean(event.target.closest(".gallery"));
  touchInHistory = Boolean(event.target.closest("#history"));
}, { passive: true });
scroller.addEventListener("touchend", (event) => {
  const dx = touchStartX - event.changedTouches[0].clientX;
  const dy = touchStartY - event.changedTouches[0].clientY;
  if (!desktop.matches) {
    if (touchInHistory && Math.abs(dx) > 48 && Math.abs(dx) > Math.abs(dy)) {
      const next = historyStep + (dx > 0 ? 1 : -1);
      if (next >= 0 && next <= historyLast) setHistoryStep(next);
    }
    return;
  }
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
    const stack = solutionStacks.find((item) => item.id === id);
    if (stack) setStackStep(stack, 0, 1);
    if (id === "#solutions-alt2" && solutionsSlider) solutionsSlider.slideTo(0);
    if (id === "#clients") setClientsSide("retail");
    syncMark(id.slice(1));
    event.preventDefault();
    section.scrollIntoView({ behavior: "smooth", block: "start" });
  });
});

syncMark(location.hash.replace("#", "") || "hero");

const lang = document.querySelector(".lang");
lang.addEventListener("click", (event) => {
  const link = event.target.closest("a[data-lang]");
  if (!link) return;
  if (link.classList.contains("is-active")) {
    event.preventDefault();
    return;
  }
  if (!location.hash) return;
  event.preventDefault();
  const file = link.dataset.lang === "en" ? "index_en.html" : "index.html";
  location.href = file + location.hash;
});

document.querySelectorAll(".clients__idle").forEach((button) => {
  button.addEventListener("click", () => {
    setClientsSide(button.closest(".clients__pane").dataset.pane);
  });
});

historySection.querySelectorAll(".timeline__point").forEach((point) => {
  point.addEventListener("click", () => setHistoryStep(Number(point.dataset.step)));
});

solutionsSection.querySelectorAll("[data-solutions-go]").forEach((item) => {
  item.addEventListener("click", () => setSolutionsStep(Number(item.dataset.solutionsGo)));
});
const photoPanel = document.querySelector('[data-panel="photo"]');
const videoPanel = document.querySelector('[data-panel="video"]');
const en = document.documentElement.lang === "en";

const gallery = new Swiper(photoPanel.querySelector(".gallery"), {
  slidesPerView: "auto",
  spaceBetween: 12,
  loop: true,
  speed: 700,
  grabCursor: true,
  keyboard: { enabled: true, onlyInViewport: true },
  a11y: {
    prevSlideMessage: en ? "Previous photo" : "Предыдущее фото",
    nextSlideMessage: en ? "Next photo" : "Следующее фото",
  },
  navigation: {
    nextEl: photoPanel.querySelector(".gallery__next"),
    prevEl: photoPanel.querySelector(".gallery__prev"),
  },
});

const videoGallery = new Swiper(videoPanel.querySelector(".gallery"), {
  slidesPerView: "auto",
  spaceBetween: 12,
  loop: false,
  speed: 700,
  grabCursor: true,
  keyboard: { enabled: true, onlyInViewport: true },
  a11y: {
    prevSlideMessage: en ? "Previous video" : "Предыдущее видео",
    nextSlideMessage: en ? "Next video" : "Следующее видео",
  },
  navigation: {
    nextEl: videoPanel.querySelector(".gallery__next"),
    prevEl: videoPanel.querySelector(".gallery__prev"),
  },
});

videoPanel.querySelectorAll(".gallery__slide").forEach((slide) => {
  const video = slide.querySelector("video");
  slide.querySelector(".gallery__play").addEventListener("click", () => openVideoModal(video));
});

const solutionsSliderSection = document.querySelector("#solutions-alt2");
let solutionsSlider = null;
let solutionsSliderIndex = -1;
if (solutionsSliderSection) {
  solutionsSliderIndex = sections.indexOf(solutionsSliderSection);
  const solutionsBar = solutionsSliderSection.querySelector(".solutions-slider__bar span");
  /* Ширина полосы = (1 + progress*(страниц-1)) / страниц:
     1-я страница → 33%, 2-я → 66%, 3-я → 100% при 3 страницах. */
  const solutionsBarScale = (s) => {
    const perView = Number(s.params.slidesPerView) || 1;
    const pages = Math.max(1, Math.round(s.slides.length / perView));
    return Math.max(0.02, (1 + s.progress * (pages - 1)) / pages);
  };
  solutionsSlider = new Swiper(solutionsSliderSection.querySelector(".solutions-slider"), {
    slidesPerView: 3,
    slidesPerGroup: 3,
    spaceBetween: 8,
    speed: 700,
    grabCursor: true,
    watchOverflow: true,
    breakpoints: {
      0: { slidesPerView: 1.5, slidesPerGroup: 1 },
      1101: { slidesPerView: 3, slidesPerGroup: 3 },
    },
    keyboard: { enabled: true, onlyInViewport: true },
    a11y: {
      prevSlideMessage: en ? "Previous cards" : "Предыдущие карточки",
      nextSlideMessage: en ? "Next cards" : "Следующие карточки",
    },
    navigation: {
      prevEl: solutionsSliderSection.querySelector(".solutions-slider__prev"),
      nextEl: solutionsSliderSection.querySelector(".solutions-slider__next"),
    },
    on: {
      progress(s) {
        solutionsBar.style.transform = `scaleX(${solutionsBarScale(s)})`;
      },
    },
  });
  solutionsBar.style.transform = `scaleX(${solutionsBarScale(solutionsSlider)})`;
}

function moveSolutionsSlider(direction) {
  if (!solutionsSlider) return false;
  const index = currentIndex();
  const group = solutionsSlider.params.slidesPerGroup || 1;
  const last = solutionsSlider.slides.length - solutionsSlider.params.slidesPerView;
  if (index === solutionsSliderIndex) {
    const next = solutionsSlider.activeIndex + direction * group;
    if (next < 0 || next > last) return false;
    solutionsSlider.slideTo(next);
    return true;
  }
  if (direction > 0 && index + 1 === solutionsSliderIndex) solutionsSlider.slideTo(0);
  if (direction < 0 && index - 1 === solutionsSliderIndex) solutionsSlider.slideTo(last);
  return false;
}


const videoModal = document.querySelector('[data-modal="video"]');
const modalVideo = videoModal.querySelector(".video-modal__video");

function openVideoModal(source) {
  const src = source.querySelector("source").getAttribute("src");
  modalVideo.setAttribute("poster", source.getAttribute("poster"));
  if (!modalVideo.querySelector(`source[src="${src}"]`)) {
    const type = src.endsWith(".webm") ? "video/webm" : "video/mp4";
    const node = document.createElement("source");
    node.setAttribute("src", src);
    node.setAttribute("type", type);
    modalVideo.appendChild(node);
  }
  modalVideo.load();
  videoModal.hidden = false;
  modalVideo.play();
  videoModal.querySelector(".video-modal__close").focus();
}

function closeVideoModal() {
  videoModal.hidden = true;
  modalVideo.pause();
  modalVideo.removeAttribute("poster");
  modalVideo.querySelectorAll("source").forEach((node) => node.remove());
  modalVideo.removeAttribute("src");
  modalVideo.load();
}

videoModal.querySelector(".video-modal__close").addEventListener("click", closeVideoModal);
videoModal.addEventListener("click", (event) => {
  if (event.target === videoModal) closeVideoModal();
});
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape" && !videoModal.hidden) closeVideoModal();
});

const CITIES_ENDPOINT = "https://b2b.4tochki.ru/export_data/sto/jfp.json";
const centersPill = document.querySelector("[data-centers-pill]");
const branchNodes = document.querySelectorAll("[data-branches]");
const partnerNodes = document.querySelectorAll("[data-partner-centers]");

/* Русское склонение по числу: one/few/many */
function pluralRu(count, one, few, many) {
  const mod10 = count % 10;
  const mod100 = count % 100;
  if (mod10 === 1 && mod100 !== 11) return one;
  if (mod10 >= 2 && mod10 <= 4 && (mod100 < 12 || mod100 > 14)) return few;
  return many;
}

/* «Число + слово»: для русского берём склонение, для английского — единственное/множественное */
function withCount(count, ruForms, enForms) {
  const num = en ? count.toLocaleString("en-US") : String(count);
  return en
    ? `${num} ${count === 1 ? enForms[0] : enForms[1]}`
    : `${num} ${pluralRu(count, ruForms[0], ruForms[1], ruForms[2])}`;
}

function fillNodes(nodes, text) {
  nodes.forEach((node) => {
    node.textContent = text;
  });
}

if (centersPill || branchNodes.length || partnerNodes.length) {
  fetch(CITIES_ENDPOINT)
    .then((response) => (response.ok ? response.json() : Promise.reject(new Error(response.status))))
    .then((data) => {
      const counts = data.counts || {};
      const branches = Number(counts.branches) || 0;
      const partner = Number(counts.partnerServiceCenters) || 0;
      if (centersPill && partner) {
        centersPill.textContent = withCount(
          partner,
          ["сервисный центр", "сервисных центра", "сервисных центров"],
          ["service center", "service centers"],
        );
      }
      if (branchNodes.length && branches) {
        fillNodes(
          branchNodes,
          withCount(branches, ["филиал", "филиала", "филиалов"], ["branch", "branches"]),
        );
      }
      if (partnerNodes.length && partner) {
        fillNodes(
          partnerNodes,
          withCount(
            partner,
            [
              "партнерский сервисный центр",
              "партнерских сервисных центра",
              "партнерских сервисных центров",
            ],
            ["partner service center", "partner service centers"],
          ),
        );
      }
    })
    .catch(() => {
      /* остаётся зашитое в разметке значение */
    });
}

document.querySelector(".tabs").addEventListener("click", (event) => {
  const tab = event.target.closest("button");
  if (!tab) return;
  document.querySelectorAll(".tabs button").forEach((item) => {
    const on = item === tab;
    item.classList.toggle("is-active", on);
    item.setAttribute("aria-selected", String(on));
  });
  const photo = tab.dataset.tab === "photo";
  photoPanel.hidden = !photo;
  videoPanel.hidden = photo;
  if (photo) gallery.update();
  else videoGallery.update();
});
