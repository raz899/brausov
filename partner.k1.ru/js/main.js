(function () {
  const e = document.createElement("link").relList;
  if (e && e.supports && e.supports("modulepreload")) return;
  for (const t of document.querySelectorAll('link[rel="modulepreload"]')) n(t);
  new MutationObserver((t) => {
    for (const a of t)
      if (a.type === "childList")
        for (const i of a.addedNodes)
          i.tagName === "LINK" && i.rel === "modulepreload" && n(i);
  }).observe(document, { childList: !0, subtree: !0 });
  function s(t) {
    const a = {};
    return (
      t.integrity && (a.integrity = t.integrity),
      t.referrerPolicy && (a.referrerPolicy = t.referrerPolicy),
      t.crossOrigin === "use-credentials"
        ? (a.credentials = "include")
        : t.crossOrigin === "anonymous"
          ? (a.credentials = "omit")
          : (a.credentials = "same-origin"),
      a
    );
  }
  function n(t) {
    if (t.ep) return;
    t.ep = !0;
    const a = s(t);
    fetch(t.href, a);
  }
})();
const o = (u, e = document) => e.querySelector(u),
  f = (u, e = document) => Array.from(e.querySelectorAll(u)),
  h = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
(function () {
  const e = o("#hero-video"),
    s = o("#video-toggle");
  if (!e || !s || h) return;
  const n = () => {
    const t = e.paused;
    (s.setAttribute("aria-pressed", String(t)),
      s.setAttribute(
        "aria-label",
        t ? "Продолжить воспроизведение видео" : "Поставить видео на паузу",
      ));
  };
  (s.addEventListener("click", async () => {
    if (e.paused)
      try {
        await e.play();
      } catch {
        return;
      }
    else e.pause();
    n();
  }),
    e.addEventListener("play", n),
    e.addEventListener("pause", n),
    n());
})();
(function () {
  const e = o("#app-recording"),
    s = o("#app-recording-toggle"),
    n = o(".phone-video-controls");
  if (!e || !s || !n) return;
  const t = () => {
    const a = e.paused;
    (s.setAttribute("aria-pressed", String(a)),
      s.setAttribute(
        "aria-label",
        a ? "Воспроизвести запись экрана" : "Поставить запись на паузу",
      ),
      n.classList.toggle("is-paused", a));
  };
  (s.addEventListener("click", async () => {
    if (e.paused)
      try {
        await e.play();
      } catch {
        return;
      }
    else e.pause();
    t();
  }),
    e.addEventListener("play", t),
    e.addEventListener("pause", t),
    h ||
      new IntersectionObserver(
        ([i]) => {
          i.isIntersecting ? e.play().catch(() => {}) : e.pause();
        },
        { threshold: 0.35 },
      ).observe(e),
    t());
})();
(function () {
  const e = o("#k1-pay-video"),
    s = o("#k1-pay-video-toggle");
  if (!e || !s) return;
  const n = () => {
    const a = e.paused;
    (s.setAttribute("aria-pressed", String(a)),
      s.setAttribute(
        "aria-label",
        a ? "Воспроизвести видео K1 Пэй" : "Приостановить видео K1 Пэй",
      ));
  };
  if (
    (s.addEventListener("click", () => {
      e.paused ? e.play().catch(() => {}) : e.pause();
    }),
    e.addEventListener("play", n),
    e.addEventListener("pause", n),
    h)
  ) {
    (e.pause(), n());
    return;
  }
  (new IntersectionObserver(
    ([a]) => {
      a.isIntersecting ? e.play().catch(() => {}) : e.pause();
    },
    { threshold: 0.3 },
  ).observe(e),
    n());
})();
(function () {
  const e = o("#network-video"),
    s = o("#network-video-toggle"),
    n = o(".network-copy"),
    t = f("[data-network-stage]");
  if (!e || !s) return;
  const a = () => {
      const l = e.paused;
      (s.setAttribute("aria-pressed", String(l)),
        s.setAttribute(
          "aria-label",
          l
            ? "Воспроизвести федеральное видео"
            : "Приостановить федеральное видео",
        ));
    },
    i = () => {
      const l = e.currentTime < 7.5 ? 0 : e.currentTime < 15 ? 1 : 2;
      (t.forEach((p, d) => p.classList.toggle("is-active", d === l)),
        n == null || n.classList.toggle("is-secondary", l > 0));
    };
  if (
    (s.addEventListener("click", () => {
      e.paused ? e.play().catch(() => {}) : e.pause();
    }),
    e.addEventListener("play", a),
    e.addEventListener("pause", a),
    e.addEventListener("timeupdate", i),
    h)
  ) {
    (e.pause(), a());
    return;
  }
  (new IntersectionObserver(
    ([l]) => {
      l.isIntersecting ? e.play().catch(() => {}) : e.pause();
    },
    { threshold: 0.2 },
  ).observe(e),
    a(),
    i());
})();
(function () {
  const e = o(".t-blocks");
  if (!e) return;
  const s = "http://www.w3.org/2000/svg";
  for (let n = 0; n < 36; n++) {
    const t = document.createElementNS(s, "rect"),
      a = n % 3 === 0 ? 26 : 16;
    (t.setAttribute("x", 200 - a / 2),
      t.setAttribute("y", 8),
      t.setAttribute("width", a),
      t.setAttribute("height", 34),
      t.setAttribute("rx", 3),
      t.setAttribute("transform", `rotate(${n * 10} 200 200)`),
      e.appendChild(t));
  }
})();
(function () {
  const e = o("#theme-toggle"),
    s = document.documentElement,
    n = window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light";
  s.setAttribute("data-theme", n);
  const t = () => {
    const a = s.getAttribute("data-theme") === "dark";
    (e.setAttribute("aria-pressed", String(a)),
      e.setAttribute(
        "aria-label",
        a ? "Включить светлую тему" : "Включить тёмную тему",
      ));
  };
  (t(),
    e.addEventListener("click", () => {
      (s.setAttribute(
        "data-theme",
        s.getAttribute("data-theme") === "dark" ? "light" : "dark",
      ),
        t());
    }));
})();
(function () {
  const e = o("#burger"),
    s = o("#mobile-menu"),
    n = () => {
      ((s.hidden = !0),
        document.body.classList.remove("is-locked"),
        e.setAttribute("aria-expanded", "false"),
        e.setAttribute("aria-label", "Открыть меню"));
    };
  (e.addEventListener("click", () => {
    if (e.getAttribute("aria-expanded") === "true") return n();
    ((s.hidden = !1),
      document.body.classList.add("is-locked"),
      e.setAttribute("aria-expanded", "true"),
      e.setAttribute("aria-label", "Закрыть меню"));
  }),
    f("a", s).forEach((t) => t.addEventListener("click", n)),
    document.addEventListener("keydown", (t) => {
      t.key === "Escape" && !s.hidden && (n(), e.focus());
    }),
    window.addEventListener("resize", () => {
      window.innerWidth >= 900 && !s.hidden && n();
    }));
})();
(function () {
  const e = o("#site-header"),
    s = () => e.classList.toggle("is-stuck", window.scrollY > 12);
  (s(), window.addEventListener("scroll", s, { passive: !0 }));
  const n = f(".nav-desktop a"),
    t = new Map(n.map((r) => [r.getAttribute("href").slice(1), r])),
    a = Array.from(t.keys())
      .map((r) => document.getElementById(r))
      .filter(Boolean),
    i = new IntersectionObserver(
      (r) => {
        r.forEach((l) => {
          var p;
          l.isIntersecting &&
            (n.forEach((d) => d.classList.remove("is-active")),
            (p = t.get(l.target.id)) == null || p.classList.add("is-active"));
        });
      },
      { rootMargin: "-45% 0px -50% 0px" },
    );
  a.forEach((r) => i.observe(r));
})();
const w = {
  express: {
    key: "express",
    name: "ПУШ Экспресс",
    kicker: "Старт без склада",
    image: "./img/express.webp",
    video: "./video/express.webm",
    videoMp4: "./video/express.mp4",
    stages: [
      { label: "Авто подъезжает", time: 0 },
      { label: "Машина на посту", time: 2.6 },
      { label: "Шиномонтаж", time: 5.2 },
    ],
    imageAlt:
      "Фирменное оформление пункта удобного шиномонтажа формата ПУШ Экспресс",
    imageCaption: "Как работает ПУШ Экспресс",
    lead: "Формат для шиномонтажа без склада и выдачи заказов. Вы подключаете онлайн-запись, оказываете услуги по собственному тарифу и управляете загрузкой постов в К1 Про.",
    badges: [
      "склад не требуется",
      "без обеспечительного платежа",
      "приложение бесплатно",
    ],
    req: [
      "Склад и свободная площадь хранения не требуются",
      "Категория программы — легковые шины и диски",
      "Шиномонтаж легковых шин — обязательно",
      "Юридическое лицо или ИП",
    ],
    income: [
      "Доход от оказания услуг по вашему тарифу",
      "Комиссия платформы — 2% от фактически оказанных услуг",
      "Стоимость K1 Пэй входит в комиссию платформы",
      "Вознаграждение за выдачу товара не предусмотрено",
    ],
    gain: [
      "Новые клиенты с площадок К1",
      "Единый календарь и управление постами",
      "Бесплатное приложение К1 Про и дистанционное обучение",
    ],
  },
  profi: {
    key: "profi",
    name: "ПУШ Профи",
    kicker: "Услуги + выдача",
    image: "./img/profi.webp",
    video: "./video/profi.webm",
    videoMp4: "./video/profi.mp4",
    stages: [
      { label: "Авто приезжает", time: 0 },
      { label: "Шины из ПУШ", time: 2.6 },
      { label: "Услуги на посту", time: 5.2 },
    ],
    imageAlt:
      "Фирменное оформление пункта удобного шиномонтажа формата ПУШ Профи",
    imageCaption: "Как работает ПУШ Профи",
    lead: "Формат для центра, который совмещает шиномонтаж с выдачей заказов. Нужна зона хранения от 15 м²; товарные категории и дополнительные услуги зависят от специализации точки.",
    badges: ["хранение от 15 м²", "выдача 2–5%", "депозит 25 000 ₽"],
    req: [
      "Склад выдачи заказов — от 15 м²",
      "Легковые, грузовые и специальные шины и диски — по специализации",
      "Шиномонтаж легковых шин — обязательно",
      "Пункт выдачи заказов К1, 4точки и Форточки",
    ],
    income: [
      "Вознаграждение за выдачу товара — от 2 до 5%",
      "Доход от оказания услуг по вашему тарифу",
      "Комиссия платформы — 2% от фактически оказанных услуг",
      "Стоимость K1 Пэй входит в комиссию платформы",
    ],
    gain: [
      "Оформление: панель-кронштейн, плакат, наклейка на дверь",
      "Приложение К1 Про бесплатно",
      "Сезонное хранение и утилизация шин — в разработке",
    ],
  },
  business: {
    key: "business",
    name: "ПУШ Бизнес",
    kicker: "Максимальная товарная программа",
    image: "./img/business.webp",
    video: "./video/business.webm",
    videoMp4: "./video/business.mp4",
    stages: [
      { label: "Фура подъезжает", time: 0 },
      { label: "Разгрузка шин", time: 2.6 },
      { label: "Выдача и монтаж", time: 5.2 },
    ],
    imageAlt:
      "Фирменное оформление пункта удобного шиномонтажа формата ПУШ Бизнес",
    imageCaption: "Как работает ПУШ Бизнес",
    lead: "Формат для крупного шинного центра с ответственным хранением от 100 м² и отдельной зоной выдачи от 15 м². Максимальная товарная программа и повышенное вознаграждение.",
    badges: ["хранение от 100 м²", "выдача 3–10%", "депозит 25 000 ₽"],
    req: [
      "Склад ответственного хранения — от 100 м²; склад выдачи — от 15 м²",
      "Легковые шины и диски — обязательно; грузовые и специальные — по согласованию",
      "Шиномонтаж легковых шин — обязательно; грузовых и специальных — по специализации",
      "Доставка клиенту — опционально",
    ],
    income: [
      "Вознаграждение за выдачу товара — от 3 до 10%",
      "Доход от оказания услуг по вашему тарифу",
      "Комиссия платформы — 2% от фактически оказанных услуг",
      "Стоимость K1 Пэй входит в комиссию платформы",
    ],
    gain: [
      "Оформление: панель-кронштейн, плакат, наклейка на дверь",
      "Приложение К1 Про бесплатно",
      "Сезонное хранение и утилизация шин — в разработке",
    ],
  },
};
(function () {
  const e = o("#format-panels"),
    s = f(".tab");
  if (!e) return;
  e.innerHTML = Object.values(w)
    .map(
      (t, a) => `
      <section class="panel${a === 0 ? " is-active" : ""}" id="panel-${t.key}"
        role="tabpanel" aria-labelledby="tab-${t.key}" tabindex="0"
        data-testid="panel-${t.key}"${a === 0 ? "" : " hidden"}>
        <div class="panel-hero">
          <figure class="panel-photo panel-motion" data-format-motion="${t.key}">
            <video muted loop playsinline${h ? "" : " autoplay"} preload="metadata"
              poster="${t.image}" aria-label="${t.imageAlt}" data-testid="video-format-${t.key}">
              <source src="${t.video}" type="video/webm">
              <source src="${t.videoMp4}" type="video/mp4">
            </video>
            <figcaption>${t.imageCaption}</figcaption>
            <button class="motion-toggle media-toggle" type="button" data-motion-toggle
              aria-label="Поставить анимацию на паузу" aria-pressed="false"
              data-testid="button-motion-${t.key}"><span class="media-toggle-icon" aria-hidden="true"></span></button>
            <div class="motion-steps" aria-label="Этапы процесса">
              ${t.stages
                .map(
                  (
                    i,
                    r,
                  ) => `<button class="${r === 0 ? "is-active" : ""}" type="button"
                      data-motion-stage="${i.time}" data-stage-index="${r}"
                      data-testid="button-motion-stage-${t.key}-${r}">${i.label}</button>`,
                )
                .join("")}
            </div>
          </figure>
          <div class="panel-top">
            <h3><small>${t.kicker}</small>${t.name}</h3>
            <p>${t.lead}</p>
            <div class="panel-badges">${t.badges.map((i) => `<span>${i}</span>`).join("")}</div>
          </div>
        </div>
        <div class="panel-cols">
          <div class="panel-col"><h4>Требования</h4><ul>${t.req.map((i) => `<li>${i}</li>`).join("")}</ul></div>
          <div class="panel-col"><h4>Доход</h4><ul>${t.income.map((i) => `<li>${i}</li>`).join("")}</ul></div>
          <div class="panel-col"><h4>Что даём</h4><ul>${t.gain.map((i) => `<li>${i}</li>`).join("")}</ul></div>
        </div>
        <div class="panel-foot">
          <p>Точный формат платформа рекомендует после заявки — по площади, услугам и локации центра.</p>
          <button class="btn btn-primary" type="button" data-open-modal data-testid="button-format-cta-${t.key}">Подобрать формат</button>
        </div>
      </section>`,
    )
    .join("");
  const n = (t, a = !1) => {
    (s.forEach((i, r) => {
      const l = r === t;
      (i.classList.toggle("is-active", l),
        i.setAttribute("aria-selected", String(l)),
        (i.tabIndex = l ? 0 : -1));
      const p = o("#" + i.getAttribute("aria-controls"));
      (p.classList.toggle("is-active", l), (p.hidden = !l));
      const d = o("video", p);
      d && (l && !h ? d.play().catch(() => {}) : d.pause());
    }),
      a && s[t].focus());
  };
  (s.forEach((t, a) => {
    (t.addEventListener("click", () => n(a)),
      t.addEventListener("keydown", (i) => {
        const r = i.key;
        if (
          r !== "ArrowRight" &&
          r !== "ArrowLeft" &&
          r !== "Home" &&
          r !== "End"
        )
          return;
        i.preventDefault();
        const l =
          r === "Home"
            ? 0
            : r === "End"
              ? s.length - 1
              : (a + (r === "ArrowRight" ? 1 : -1) + s.length) % s.length;
        n(l, !0);
      }));
  }),
    f("[data-format-motion]", e).forEach((t) => {
      const a = o("video", t),
        i = o("[data-motion-toggle]", t),
        r = f("[data-motion-stage]", t);
      if (!a || !i) return;
      const l = () => {
          const d = a.paused;
          (i.setAttribute("aria-pressed", String(d)),
            i.setAttribute(
              "aria-label",
              d ? "Продолжить анимацию" : "Поставить анимацию на паузу",
            ));
        },
        p = () => {
          let d = 0;
          (r.forEach((c, m) => {
            a.currentTime >= Number(c.dataset.motionStage) && (d = m);
          }),
            r.forEach((c, m) => c.classList.toggle("is-active", m === d)));
        };
      (i.addEventListener("click", async () => {
        if (a.paused)
          try {
            await a.play();
          } catch {
            return;
          }
        else a.pause();
        l();
      }),
        r.forEach((d) => {
          d.addEventListener("click", async () => {
            if (((a.currentTime = Number(d.dataset.motionStage)), p(), !h))
              try {
                await a.play();
              } catch {
                return;
              }
          });
        }),
        a.addEventListener("timeupdate", p),
        a.addEventListener("play", l),
        a.addEventListener("pause", l),
        l(),
        p());
    }));
})();
const $ = [
  {
    q: "К1 Про — это франшиза?",
    a: "Нет. К1 Про работает с партнёрами по агентским и лицензионным договорам: паушального взноса и роялти по франшизной модели нет.",
  },
  {
    q: "Сколько стоит приложение К1 Про?",
    a: "Плата за использование приложения отсутствует. Обеспечительный платёж не требуется, если вы уже клиент b2b.4tochki.ru; для новых клиентов форматов с выдачей он составляет до 25 000 ₽.",
  },
  {
    q: "Может ли партнёром стать физическое лицо?",
    a: "Нет. Партнёром программы становится юридическое лицо или индивидуальный предприниматель.",
  },
  {
    q: "Помещение склада должно быть в собственности?",
    a: "Нет. Достаточно, чтобы у вас была необходимая для выбранного формата свободная площадь — арендованное помещение подходит.",
  },
  {
    q: "Какую поддержку получает партнёр?",
    a: "Технологическую (автоматизация записи, аналитика, интеграция по API с вашей онлайн-записью), техническую (чат со специалистами и бот), маркетинговую (видимость, брендинг, рейтинг, промо и бонусные программы), а также базу знаний и бесплатное дистанционное обучение.",
  },
  {
    q: "Не будет ли конфликта записей с моими клиентами?",
    a: "Нет: и ваши клиенты, и заказы с платформы попадают в один календарь К1 Про. Распределение слотов по постам и сменам остаётся за вами.",
  },
  {
    q: "Сколько заказов будет приходить?",
    a: "Количество заказов зависит от локации, конкуренции, сезонности и рейтинга центра — программа не обещает гарантированный объём или доход.",
  },
];
(function () {
  const e = o("#faq-acc");
  e &&
    ((e.innerHTML = $.map(
      (s, n) => `
    <div class="acc-item">
      <h3>
        <button class="acc-btn" type="button" id="acc-btn-${n}" aria-expanded="false"
          aria-controls="acc-panel-${n}" data-testid="button-faq-${n}">
          <span>${s.q}</span><span class="acc-sign" aria-hidden="true"></span>
        </button>
      </h3>
      <div class="acc-panel" id="acc-panel-${n}" role="region" aria-labelledby="acc-btn-${n}"
        data-testid="panel-faq-${n}"><div>${s.a}</div></div>
    </div>`,
    ).join("")),
    f(".acc-btn", e).forEach((s) => {
      const n = o("#" + s.getAttribute("aria-controls"));
      s.addEventListener("click", () => {
        const t = s.getAttribute("aria-expanded") === "true";
        (f(".acc-btn", e).forEach((a) => {
          a !== s &&
            (a.setAttribute("aria-expanded", "false"),
            (o("#" + a.getAttribute("aria-controls")).style.height = "0px"));
        }),
          s.setAttribute("aria-expanded", String(!t)),
          (n.style.height = t ? "0px" : n.scrollHeight + "px"));
      });
    }),
    window.addEventListener("resize", () => {
      f(".acc-btn", e).forEach((s) => {
        if (s.getAttribute("aria-expanded") !== "true") return;
        const n = o("#" + s.getAttribute("aria-controls"));
        n.style.height = n.scrollHeight + "px";
      });
    }));
})();
(function () {
  const e = o("#modal-root"),
    s = o(".modal-sheet", e),
    n = o("#modal-body"),
    t = n.innerHTML;
  let a = null;
  const i = () =>
      f("button, [href], input, select, textarea", s).filter(
        (c) => !c.disabled,
      ),
    r = () => {
      var m, g;
      ((a = document.activeElement),
        (e.hidden = !1),
        document.body.classList.add("is-locked"),
        (g = (m = o("input, select, button", s) || s).focus) == null ||
          g.call(m));
    },
    l = () => {
      var c;
      ((e.hidden = !0),
        document.body.classList.remove("is-locked"),
        (n.innerHTML = t),
        p(),
        (c = a == null ? void 0 : a.focus) == null || c.call(a));
    };
  (document.addEventListener("click", (c) => {
    c.target.closest("[data-open-modal]")
      ? (c.preventDefault(), r())
      : c.target.closest("[data-close-modal]") && l();
  }),
    document.addEventListener("keydown", (c) => {
      if (e.hidden) return;
      if (c.key === "Escape") return l();
      if (c.key !== "Tab") return;
      const m = i();
      if (!m.length) return;
      const g = m[0],
        b = m[m.length - 1];
      c.shiftKey && document.activeElement === g
        ? (c.preventDefault(), b.focus())
        : !c.shiftKey &&
          document.activeElement === b &&
          (c.preventDefault(), g.focus());
    }));
  function p() {
    const c = o("#lead-form");
    c &&
      c.addEventListener("submit", (m) => {
        var L;
        m.preventDefault();
        let g = !0;
        if (
          (f(".field", c).forEach((k) => {
            const y = o("input, select", k),
              A = o("[data-err]", k);
            let v = "";
            const E = y.value.trim();
            (E
              ? y.name === "phone" && E.replace(/\D/g, "").length < 10
                ? (v = "Укажите телефон полностью")
                : y.name === "name" &&
                  E.length < 2 &&
                  (v = "Слишком короткое имя")
              : (v = "Заполните поле"),
              k.classList.toggle("has-error", !!v),
              y.setAttribute("aria-invalid", v ? "true" : "false"),
              (A.textContent = v),
              v && g && (y.focus(), (g = !1)));
          }),
          !g)
        )
          return;
        const b = new FormData(c);
        ((n.innerHTML = `
        <div class="modal-success" data-testid="modal-success">
          <span class="success-badge" aria-hidden="true">
            <svg viewBox="0 0 24 24"><path d="M4 12.5l5 5L20 6.5" fill="none"/></svg>
          </span>
          <h2 id="modal-title">Форма заполнена</h2>
          <ul>
            <li>Имя: ${d(b.get("name"))}</li>
            <li>Телефон: ${d(b.get("phone"))}</li>
            <li>Город: ${d(b.get("city"))}</li>
            <li>Тип центра: ${d(b.get("type"))}</li>
          </ul>
          <p>Актуальные условия — на
            <a href="https://pro.k1.ru/" target="_blank" rel="noopener noreferrer">pro.k1.ru</a>.</p>
          <button class="btn btn-primary btn-block btn-lg" type="button" data-close-modal
            data-testid="button-success-close">Понятно, закрыть</button>
        </div>`),
          (L = o('[data-testid="button-success-close"]')) == null || L.focus());
      });
  }
  const d = (c) =>
    String(c ?? "").replace(
      /[&<>"']/g,
      (m) =>
        ({
          "&": "&amp;",
          "<": "&lt;",
          ">": "&gt;",
          '"': "&quot;",
          "'": "&#39;",
        })[m],
    );
  p();
})();
(function () {
  const e = f(
    ".num-row, .route-step, .app-copy, .app-mock, .step-line li, .acc-item, .final-copy, .hero-proof",
  );
  if (h) return;
  e.forEach((n) => n.classList.add("reveal"));
  const s = new IntersectionObserver(
    (n) => {
      n.forEach((t) => {
        t.isIntersecting &&
          (t.target.classList.add("is-in"), s.unobserve(t.target));
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
  );
  e.forEach((n) => s.observe(n));
})();
(function () {
  const e = f(".num-val[data-count]");
  if (h || !e.length) return;
  const s = (t) => t.toLocaleString("ru-RU"),
    n = new IntersectionObserver(
      (t) => {
        t.forEach((a) => {
          if (!a.isIntersecting) return;
          const i = a.target;
          n.unobserve(i);
          const r = Number(i.dataset.count),
            l = i.dataset.suffix || "",
            p = 1100,
            d = performance.now(),
            c = (m) => {
              const g = Math.min(1, (m - d) / p),
                b = 1 - Math.pow(1 - g, 3);
              ((i.textContent = s(Math.round(r * b)) + l),
                g < 1 && requestAnimationFrame(c));
            };
          requestAnimationFrame(c);
        });
      },
      { threshold: 0.5 },
    );
  e.forEach((t) => n.observe(t));
})();
