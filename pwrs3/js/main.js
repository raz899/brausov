'use strict';

/* ── i18n ── */
const translations = {
  ru: {
    'nav.company': 'Компания',
    'nav.retail': 'Розничным клиентам',
    'nav.wholesale': 'Оптовым клиентам',
    'nav.solutions': 'Отраслевые решения',
    'nav.gallery': 'Галерея',
    'hero.title': 'Более 30 лет мы занимаемся дистрибуцией шин и дисков и соединяем производителей, бизнес и миллионы автомобилистов в единой технологической экосистеме',
    'hero.about': 'О компании',
    'hero.clients': 'Клиентам',
    'advantages.years': 'Более 30 лет на рынке',
    'advantages.catalog': '40 000 позиций шин и дисков: легковые, мото, грузовые, специальные',
    'advantages.digital': 'цифровые сервисы для частных владельцев, автопарков и шинного бизнеса',
    'advantages.delivery': '24–48 часов доставки по России',
    'partners.title': 'Партнёры и бренды',
    'partners.subtitle': 'Работаем с ведущими мировыми производителями шин и дисков',
    'sections.retail': 'Розничным клиентам',
    'sections.wholesale': 'Оптовым клиентам',
    'sections.solutions': 'Отраслевые решения',
    'retail.4tochki.meta': '28 пунктов выдачи',
    'retail.4tochki.text': 'Интернет-магазин 4Точки осуществляет розничные продажи широкого ассортимента легковых, грузовых и специальных, а также мотошин и колесных дисков. Доставка в кратчайшие сроки по всей России',
    'retail.k1.badge': 'скоро',
    'retail.k1.text': 'Приложение К1 — сервис электронной коммерции, созданный, чтобы сделать профессиональный шиномонтаж доступным даже в разгар сезона, поднять стандарты сервиса и завоевать доверие автовладельцев',
    'wholesale.forto4ki.text': 'Автоматизированная система оптовой дистрибуции шин и дисков всех категорий корпоративным клиентам',
    'wholesale.forto4ki.btn': 'Вход в B2B портал',
    'wholesale.k1.text': 'Приложение К1 Про — сервис электронной коммерции для шиномонтажных центров различных форматов. Это система управления онлайн записями шиномонтажных услуг, прием и выдача заказов, оказание услуг шиномонтажа и доставки, а скоро – сезонного хранения и утилизации',
    'wholesale.k1.btn': 'Подробнее',
    'footer.rights': 'Все права защищены.',
  },
  en: {
    'nav.company': 'Company',
    'nav.retail': 'Retail Clients',
    'nav.wholesale': 'Wholesale Clients',
    'nav.solutions': 'Industry Solutions',
    'nav.gallery': 'Gallery',
    'hero.title': 'For over 30 years we have been distributing tires and wheels, connecting manufacturers, businesses and millions of motorists in a unified technological ecosystem',
    'hero.about': 'About Us',
    'hero.clients': 'For Clients',
    'advantages.years': 'Over 30 years in the market',
    'advantages.catalog': '40,000 tire and wheel products: passenger, motorcycle, truck, specialty',
    'advantages.digital': 'digital services for private owners, fleets and tire businesses',
    'advantages.delivery': '24–48 hour delivery across Russia',
    'partners.title': 'Partners & Brands',
    'partners.subtitle': 'We work with leading global tire and wheel manufacturers',
    'sections.retail': 'Retail Clients',
    'sections.wholesale': 'Wholesale Clients',
    'sections.solutions': 'Industry Solutions',
    'retail.4tochki.meta': '28 pickup points',
    'retail.4tochki.text': 'The 4Tochki online store offers retail sales of a wide range of passenger, truck, specialty and motorcycle tires and wheels. Fast delivery across Russia',
    'retail.k1.badge': 'soon',
    'retail.k1.text': 'The K1 app is an e-commerce service built to make professional tire fitting available even at the height of the season, raise service standards and earn drivers’ trust',
    'wholesale.forto4ki.text': 'An automated wholesale distribution system for tires and wheels of all categories for corporate clients',
    'wholesale.forto4ki.btn': 'Enter B2B portal',
    'wholesale.k1.text': 'The K1 Pro app is an e-commerce service for tire fitting centers of various formats. It is a system for managing online bookings of tire fitting services, order intake and handover, tire fitting and delivery, and soon — seasonal storage and recycling',
    'wholesale.k1.btn': 'Learn more',
    'footer.rights': 'All rights reserved.',
  },
};

let currentLang = localStorage.getItem('pwrs-lang') || 'ru';

function setLanguage(lang) {
  if (!translations[lang]) return;
  currentLang = lang;
  localStorage.setItem('pwrs-lang', lang);
  document.documentElement.lang = lang;

  document.querySelectorAll('[data-i18n]').forEach((el) => {
    const key = el.dataset.i18n;
    if (translations[lang][key]) {
      el.textContent = translations[lang][key];
    }
  });

  document.querySelectorAll('.lang-switch__btn').forEach((btn) => {
    btn.classList.toggle('active', btn.dataset.lang === lang);
  });
}

/* ── Scroll lines ──
 * Three parallel bouncing rays (~120° corners at side walls).
 * Drawn at viewport mid-height; path extends infinitely with page/scroll.
 */
const LINE_CONFIG = [
  { groupClass: 'scroll-line-group--1', lineClass: 'scroll-line--1', arrowClass: 'scroll-line-arrow--1', offset: -96, lengthBonus: 0 },
  { groupClass: 'scroll-line-group--2', lineClass: 'scroll-line--2', arrowClass: 'scroll-line-arrow--2', offset: 0, lengthBonus: 70 },
  { groupClass: 'scroll-line-group--3', lineClass: 'scroll-line--3', arrowClass: 'scroll-line-arrow--3', offset: 96, lengthBonus: 140 },
];

/** Travel angle from horizontal: 60° → bounce corner ≈ 120°. */
const TRAVEL_ANGLE = (60 * Math.PI) / 180;
const STROKE_WIDTH = 60;
/** How far the longer side of the bevel extends. */
const BEVEL_DEPTH = 66;
/** Along-shift between short and long side → ~45° cut. */
const BEVEL_RUN = STROKE_WIDTH;
const ARROW_OVERLAP = 5;
const EDGE_PAD = 72;

const scrollLinesContainer = document.querySelector('.scroll-lines');
const scrollLinesSvg = document.querySelector('.scroll-lines__svg');
const pathsGroup = document.querySelector('.scroll-lines__paths');

let linePaths = [];
let lineArrows = [];
let lineLengths = [];
let builtWidth = 0;
let builtHeight = 0;

function getPageHeight() {
  return Math.max(
    document.documentElement.scrollHeight,
    document.body.scrollHeight,
  );
}

/**
 * Build a polyline that travels at ±60° and reflects off vertical walls.
 * Continues until Y exceeds targetHeight (infinite strip).
 */
function buildBouncingPoints(width, targetHeight, startX, startY = -20) {
  const left = EDGE_PAD;
  const right = Math.max(left + 40, width - EDGE_PAD);
  const points = [{ x: startX, y: startY }];

  let x = startX;
  let y = startY;
  let dirX = 1;
  let guard = 0;

  const dxAbs = Math.cos(TRAVEL_ANGLE);
  const dy = Math.sin(TRAVEL_ANGLE);

  while (y < targetHeight && guard < 4000) {
    guard += 1;
    const dx = dirX * dxAbs;
    const wallX = dirX > 0 ? right : left;
    const distX = wallX - x;
    const tHit = distX / dx;
    const yHit = y + dy * tHit;

    if (yHit >= targetHeight) {
      const tEnd = (targetHeight - y) / dy;
      points.push({ x: x + dx * tEnd, y: targetHeight });
      break;
    }

    x = wallX;
    y = yHit;
    points.push({ x, y });
    dirX *= -1;
  }

  return points;
}

function offsetStartX(width, parallelOffset) {
  const mid = width * 0.5;
  return Math.min(
    width - EDGE_PAD - 8,
    Math.max(EDGE_PAD + 8, mid + parallelOffset),
  );
}

function pointsToPath(points) {
  return points
    .map((p, i) => `${i === 0 ? 'M' : 'L'}${p.x.toFixed(2)} ${p.y.toFixed(2)}`)
    .join(' ');
}

function bevelPolygon(base, angle) {
  // Trapezoid: line sides parallel to travel, front edge slanted (beveled end)
  const half = STROKE_WIDTH / 2;
  const cos = Math.cos(angle);
  const sin = Math.sin(angle);
  const px = -sin * half;
  const py = cos * half;

  const shortAlong = Math.max(2, BEVEL_DEPTH - BEVEL_RUN);
  const longAlong = BEVEL_DEPTH;

  const leftBack = { x: base.x + px, y: base.y + py };
  const rightBack = { x: base.x - px, y: base.y - py };
  const leftFront = {
    x: base.x + cos * shortAlong + px,
    y: base.y + sin * shortAlong + py,
  };
  const rightFront = {
    x: base.x + cos * longAlong - px,
    y: base.y + sin * longAlong - py,
  };

  return [leftBack, leftFront, rightFront, rightBack]
    .map((p) => `${p.x.toFixed(2)},${p.y.toFixed(2)}`)
    .join(' ');
}

function getPathLengthAtY(path, totalLength, targetY) {
  if (totalLength <= 0) return 0;
  if (path.getPointAtLength(0).y > targetY) return 0;
  if (path.getPointAtLength(totalLength).y <= targetY) return totalLength;

  let lo = 0;
  let hi = totalLength;
  for (let i = 0; i < 24; i += 1) {
    const mid = (lo + hi) / 2;
    if (path.getPointAtLength(mid).y <= targetY) lo = mid;
    else hi = mid;
  }
  return lo;
}

function setContainerHeight(height) {
  if (!scrollLinesContainer) return;
  const next = `${height}px`;
  if (scrollLinesContainer.style.height !== next) {
    scrollLinesContainer.style.height = next;
  }
}

function buildScrollLines(force = false) {
  if (!scrollLinesSvg || !pathsGroup) return;

  const width = Math.max(320, window.innerWidth);
  const height = getPageHeight() + window.innerHeight;

  if (!force && width === builtWidth && height <= builtHeight) {
    setContainerHeight(getPageHeight());
    return;
  }

  builtWidth = width;
  builtHeight = height;
  setContainerHeight(getPageHeight());
  scrollLinesSvg.setAttribute('viewBox', `0 0 ${width} ${height}`);
  scrollLinesSvg.setAttribute('width', String(width));
  scrollLinesSvg.setAttribute('height', String(height));

  pathsGroup.replaceChildren();
  linePaths = [];
  lineArrows = [];
  lineLengths = [];

  LINE_CONFIG.forEach((cfg, index) => {
    const group = document.createElementNS('http://www.w3.org/2000/svg', 'g');
    group.setAttribute('class', `scroll-line-group ${cfg.groupClass}`);

    const startX = offsetStartX(width, cfg.offset);
    const points = buildBouncingPoints(width, height, startX);
    const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
    path.setAttribute('class', `scroll-line ${cfg.lineClass}`);
    path.setAttribute('d', pointsToPath(points));

    const arrow = document.createElementNS('http://www.w3.org/2000/svg', 'polygon');
    arrow.setAttribute('class', `scroll-line-arrow ${cfg.arrowClass}`);

    // Stroke first, arrow on top covers the butt end; shared group opacity = no dark seam
    group.append(path, arrow);
    pathsGroup.append(group);

    const length = path.getTotalLength();
    path.style.strokeDasharray = `${length}`;
    path.style.strokeDashoffset = `${length}`;

    linePaths[index] = path;
    lineArrows[index] = arrow;
    lineLengths[index] = length;
  });
}

function updateScrollLines() {
  if (!scrollLinesSvg || linePaths.length === 0) return;

  const pageHeight = getPageHeight();
  setContainerHeight(pageHeight);

  if (pageHeight + window.innerHeight > builtHeight) {
    buildScrollLines(true);
  }

  const rect = scrollLinesSvg.getBoundingClientRect();
  if (rect.height <= 0) return;

  const viewBoxHeight = scrollLinesSvg.viewBox.baseVal.height || builtHeight;
  const frontierClientY = window.innerHeight * 0.5;
  const targetY = ((frontierClientY - rect.top) / rect.height) * viewBoxHeight;

  linePaths.forEach((path, i) => {
    const length = lineLengths[i];
    if (!length) return;

    const bonus = LINE_CONFIG[i].lengthBonus;
    const revealed = Math.min(length, getPathLengthAtY(path, length, targetY) + bonus);

    const tipLen = Math.max(0.1, revealed);
    const baseLen = Math.max(0, tipLen - BEVEL_DEPTH);
    const strokeLen = Math.min(length, baseLen + ARROW_OVERLAP);
    path.style.strokeDashoffset = `${Math.max(0, length - strokeLen)}`;

    const tip = path.getPointAtLength(tipLen);
    const base = path.getPointAtLength(baseLen);
    const angle = Math.atan2(tip.y - base.y, tip.x - base.x);
    lineArrows[i].setAttribute('points', bevelPolygon(base, angle));
    lineArrows[i].style.display = revealed > BEVEL_DEPTH ? 'block' : 'none';
  });
}

/* ── Header scroll state ── */
const header = document.querySelector('.site-header');

function updateHeader() {
  if (!header) return;
  header.classList.toggle('is-scrolled', window.scrollY > 40);
}

/* ── Throttled scroll handler ── */
let ticking = false;

function onScroll() {
  if (ticking) return;
  ticking = true;
  requestAnimationFrame(() => {
    updateScrollLines();
    updateHeader();
    ticking = false;
  });
}

/* ── Init ── */
function init() {
  setLanguage(currentLang);

  document.querySelectorAll('.lang-switch__btn').forEach((btn) => {
    btn.addEventListener('click', () => setLanguage(btn.dataset.lang));
  });

  document.querySelectorAll('.navbar-nav .nav-link').forEach((link) => {
    link.addEventListener('click', () => {
      const collapse = document.querySelector('#mainNav');
      if (collapse?.classList.contains('show')) {
        bootstrap.Collapse.getOrCreateInstance(collapse).hide();
      }
    });
  });

  buildScrollLines();
  updateScrollLines();
  updateHeader();

  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('resize', () => {
    buildScrollLines(true);
    onScroll();
  }, { passive: true });
}

init();
