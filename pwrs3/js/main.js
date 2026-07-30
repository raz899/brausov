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
    'solutions.more': 'узнать больше',
    'solutions.3pl.title': '3PL фулфилмент',
    'solutions.3pl.text': 'Полный цикл: складирование, транспортировка, кросс-докинг',
    'solutions.mix.title': 'Резиновые смеси',
    'solutions.mix.text': 'Контрактное производство резиновых смесей',
    'solutions.crumb.title': 'Резиновая крошка',
    'solutions.crumb.text': 'Для строительства и благоустройства, производства новых РТИ',
    'solutions.retread.title': 'Восстановленные грузовые шины',
    'solutions.retread.text': 'Восстановленные грузовые шины INROAD',
    'solutions.wheels.title': 'Колёса в сборе',
    'solutions.wheels.text': 'Изготовление и поставка собранных колесных комплектов',
    'solutions.stud.title': 'Шипование шин',
    'solutions.stud.text': 'Заводская ошиповка всех типов шин',
    'solutions.studmatic.title': 'Автоматический шиповальный станок Studmatic',
    'solutions.studmatic.text': 'Для серийного шипования шин в заводских условиях',
    'solutions.test.title': 'Испытания шин',
    'solutions.test.text': 'Тестирование характеристик и подготовка к сертификации',
    'about.title': 'О компании',
    'about.mission': 'Наша миссия',
    'about.text': 'Предоставлять премиальный клиентский опыт приобретения, обслуживания, хранения и утилизации шин через заботу о безопасности участников дорожного движения с помощью инновационного сервиса и подтвержденной продуктовой экспертизы',
    'history.title': 'История компании',
    'history.era1.title': '№1 по объему экспорта шин из России',
    'history.era1.1993': 'Основание компании',
    'history.era1.1997': 'Начало продаж. Старт экспорта шин из России. Подписание договора о сотрудничестве с MICHELIN.',
    'history.era1.1998': 'Успешное преодоление кризисного периода',
    'history.era1.1999': '№1 по объему экспорта шин из России',
    'history.era1.2000': 'Запуск нового направления: продажи автомобильных дисков.',
    'history.era2.title': 'Стратегические партнерства и цифровизация',
    'history.era2.2001': '№1 по продажам шин MICHELIN в России.',
    'history.era2.2003': 'Старт дистрибуции шин YOKOHAMA в Россию.',
    'history.era2.2004': 'Подписание соглашений о сотрудничестве с Pirelli, Continental, Bridgestone, Goodyear, Hankook',
    'history.era2.2005': 'Запуск интернет-магазина 4Точки.',
    'history.era2.2006': 'Запуск B2B-платформы Форточки.',
    'history.era3.years': '2016 – настоящее время',
    'history.era3.title': 'Развитие федеральной сети и выход на новые рынки',
    'history.era3.lead': 'Открытие филиалов в ключевых регионах сформировало масштабную сеть присутствия по всей России.',
    'history.era3.2016': 'Открытие первого филиала в Челябинске.',
    'history.era3.2017': 'Открытие филиалов в Екатеринбурге, Тюмени, Уфе, Краснодаре и Ростове-на-Дону.',
    'history.era3.2018': 'Открытие филиалов в Санкт-Петербурге, Нижнем Новгороде, Казани, Новороссийске, Новосибирске, Омске, Пятигорске и Ярославле.',
    'history.era3.2019': 'Открытие филиалов в Великих Луках, Симферополе, Самаре, Тольятти, Воронеже и Московской области.',
    'history.era3.2021': 'Открытие филиалов в Перми и Красноярске.',
    'history.era3.2022': 'Подписание соглашений о сотрудничестве с ZC Rubber (Zhongce Rubber Group), Qingdao Landspider, Sailun Group, Shandong Hengfeng Rubber',
    'history.era3.subtitle': 'Развитие отраслевых решений и цифрового шинного сервиса',
    'history.era3.2023': 'Открытие филиала в Давыдово Московской области. Запуск шипования легковых шин. Запуск контрактного производства резиновых смесей. Открытие филиалов в Новокузнецке и Томске. Подписание соглашения с Triangle Tyre, Prinx Chengshan',
    'history.era3.2024': 'Открытие филиала в городском округе Домодедово. Запуск производства восстановленных грузовых шин торговой марки INROAD. Запуск участка шипования в Тюмени.',
    'history.era3.2025': 'Открытие филиалов в Иркутске и Домодедово.',
    'history.era3.today.year': 'Сегодня',
    'history.era3.today': 'Запуск цифровой платформы К1 для записи на шиномонтаж и покупки шин и дисков. Новый дизайн интерфейса Форточки. Запуск производства резиновой крошки.',
    'coverage.branches.title': '28 филиалов',
    'coverage.branches.text': 'Персональный менеджер, быстрая доставка, техническая поддержка от заказа до эксплуатации',
    'coverage.partners.title': '1500 партнерских сервисных центров',
    'coverage.partners.text': 'Пункты самовывоза, склады ответственного хранения, шиномонтажи',
    'footer.rights': 'Все права защищены.',
    'theme.toggle': 'Переключить тему',
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
    'solutions.more': 'learn more',
    'solutions.3pl.title': '3PL fulfillment',
    'solutions.3pl.text': 'Full cycle: warehousing, transportation, cross-docking',
    'solutions.mix.title': 'Rubber compounds',
    'solutions.mix.text': 'Contract manufacturing of rubber compounds',
    'solutions.crumb.title': 'Rubber crumb',
    'solutions.crumb.text': 'For construction and landscaping, production of new rubber goods',
    'solutions.retread.title': 'Retreaded truck tires',
    'solutions.retread.text': 'INROAD retreaded truck tires',
    'solutions.wheels.title': 'Assembled wheels',
    'solutions.wheels.text': 'Manufacturing and supply of assembled wheel kits',
    'solutions.stud.title': 'Tire studding',
    'solutions.stud.text': 'Factory studding for all tire types',
    'solutions.studmatic.title': 'Studmatic automatic studding machine',
    'solutions.studmatic.text': 'For serial tire studding in factory conditions',
    'solutions.test.title': 'Tire testing',
    'solutions.test.text': 'Performance testing and certification preparation',
    'about.title': 'About the company',
    'about.mission': 'Our mission',
    'about.text': 'To deliver a premium customer experience in purchasing, servicing, storing and recycling tires — through care for the safety of road users, innovative service and proven product expertise',
    'history.title': 'Company history',
    'history.era1.title': 'No. 1 tire exporter from Russia',
    'history.era1.1993': 'Company founded',
    'history.era1.1997': 'Sales launch. Start of tire exports from Russia. Partnership agreement with MICHELIN.',
    'history.era1.1998': 'Successfully weathered the crisis period',
    'history.era1.1999': 'No. 1 by volume of tire exports from Russia',
    'history.era1.2000': 'New direction launched: automotive wheel sales.',
    'history.era2.title': 'Strategic partnerships and digitalization',
    'history.era2.2001': 'No. 1 MICHELIN tire seller in Russia.',
    'history.era2.2003': 'Start of YOKOHAMA tire distribution in Russia.',
    'history.era2.2004': 'Partnership agreements signed with Pirelli, Continental, Bridgestone, Goodyear, Hankook',
    'history.era2.2005': '4Tochki online store launched.',
    'history.era2.2006': 'Fortochki B2B platform launched.',
    'history.era3.years': '2016 – present',
    'history.era3.title': 'Federal network growth and new markets',
    'history.era3.lead': 'Opening branches in key regions built a large-scale presence across Russia.',
    'history.era3.2016': 'First branch opened in Chelyabinsk.',
    'history.era3.2017': 'Branches opened in Yekaterinburg, Tyumen, Ufa, Krasnodar and Rostov-on-Don.',
    'history.era3.2018': 'Branches opened in St. Petersburg, Nizhny Novgorod, Kazan, Novorossiysk, Novosibirsk, Omsk, Pyatigorsk and Yaroslavl.',
    'history.era3.2019': 'Branches opened in Velikiye Luki, Simferopol, Samara, Tolyatti, Voronezh and the Moscow Region.',
    'history.era3.2021': 'Branches opened in Perm and Krasnoyarsk.',
    'history.era3.2022': 'Partnership agreements signed with ZC Rubber (Zhongce Rubber Group), Qingdao Landspider, Sailun Group, Shandong Hengfeng Rubber',
    'history.era3.subtitle': 'Industry solutions and digital tire services',
    'history.era3.2023': 'Branch opened in Davydovo, Moscow Region. Passenger tire studding launched. Contract rubber compound production started. Branches opened in Novokuznetsk and Tomsk. Agreement signed with Triangle Tyre, Prinx Chengshan',
    'history.era3.2024': 'Branch opened in Domodedovo urban district. INROAD retreaded truck tire production launched. Studding site opened in Tyumen.',
    'history.era3.2025': 'Branches opened in Irkutsk and Domodedovo.',
    'history.era3.today.year': 'Today',
    'history.era3.today': 'K1 digital platform launched for tire fitting bookings and tire & wheel purchases. New Fortochki interface design. Rubber crumb production launched.',
    'coverage.branches.title': '28 branches',
    'coverage.branches.text': 'Personal manager, fast delivery, technical support from order to operation',
    'coverage.partners.title': '1,500 partner service centers',
    'coverage.partners.text': 'Pickup points, bonded warehouses, tire fitting shops',
    'footer.rights': 'All rights reserved.',
    'theme.toggle': 'Toggle theme',
  },
};

let currentLang = localStorage.getItem('pwrs-lang') || 'ru';
let currentTheme = localStorage.getItem('pwrs-theme') || 'light';

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

  updateThemeLabel();
}

function setTheme(theme) {
  currentTheme = theme === 'dark' ? 'dark' : 'light';
  localStorage.setItem('pwrs-theme', currentTheme);
  document.documentElement.setAttribute('data-theme', currentTheme);
  updateThemeLabel();
}

function updateThemeLabel() {
  const btn = document.getElementById('themeSwitch');
  if (!btn) return;
  const label = translations[currentLang]?.['theme.toggle'] || 'Toggle theme';
  btn.setAttribute('aria-label', label);
  btn.setAttribute('title', label);
}

function toggleTheme() {
  setTheme(currentTheme === 'dark' ? 'light' : 'dark');
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
  setTheme(currentTheme);
  setLanguage(currentLang);

  document.getElementById('themeSwitch')?.addEventListener('click', toggleTheme);

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
