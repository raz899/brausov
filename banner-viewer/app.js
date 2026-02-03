const categoriesRoot = document.getElementById("categories");
const categoryTemplate = document.getElementById("category-template");
const bannerTemplate = document.getElementById("banner-template");
const basePath = (window.__BASE_PATH__ || "").replace(/\/$/, "");

function withBase(path) {
  if (!basePath) {
    return path;
  }
  if (path.startsWith("/")) {
    return `${basePath}${path}`;
  }
  return `${basePath}/${path}`;
}

function downloadZipUrl(url) {
  window.location.href = withBase(url);
}

function getBannerSize(banner) {
  if (banner.width && banner.height) {
    return { width: banner.width, height: banner.height };
  }

  const match = banner.name.match(/(\d+)[-xX](\d+)$/);
  if (!match) {
    return null;
  }

  return { width: Number(match[1]), height: Number(match[2]) };
}

function renderBanner(banner, categoryName) {
  const node = bannerTemplate.content.cloneNode(true);
  const card = node.querySelector(".banner-card");
  const frame = node.querySelector(".banner-frame");
  const caption = node.querySelector(".banner-caption");
  const zipButton = node.querySelector(".banner-overlay .zip-button");
  const preview = node.querySelector(".banner-preview");

  const size = getBannerSize(banner);
  if (size) {
    preview.style.setProperty("--banner-width", size.width);
    preview.style.setProperty("--banner-height", size.height);
  } else {
    preview.style.setProperty("--banner-width", 400);
    preview.style.setProperty("--banner-height", 300);
  }

  if (banner.indexUrl) {
    frame.src = withBase(banner.indexUrl);
    frame.setAttribute("scrolling", "no");
    frame.setAttribute("frameborder", "0");
    frame.setAttribute("title", banner.name);
  } else {
    frame.remove();
    const placeholder = document.createElement("div");
    placeholder.className = "banner-placeholder";
    placeholder.textContent = "Нет index.html";
    preview.appendChild(placeholder);
  }

  caption.textContent = banner.name;
  const bannerZipUrl =
    banner.zipUrl ||
    `/api/zip?path=${encodeURIComponent(`${categoryName}/${banner.name}`)}`;
  zipButton.addEventListener("click", () => downloadZipUrl(bannerZipUrl));

  return card;
}

function renderCategory(category) {
  const node = categoryTemplate.content.cloneNode(true);
  const section = node.querySelector(".category");
  const title = node.querySelector(".category-title");
  const zipButton = node.querySelector(".category-header .zip-button");
  const grid = node.querySelector(".banner-grid");

  title.textContent = category.name;
  const categoryZipUrl =
    category.zipUrl ||
    `/api/zip?path=${encodeURIComponent(category.name)}`;
  zipButton.addEventListener("click", () => downloadZipUrl(categoryZipUrl));

  category.banners.forEach((banner) => {
    grid.appendChild(renderBanner(banner, category.name));
  });

  return section;
}

async function loadStructure() {
  const staticResponse = await fetch(withBase("/data.json"), {
    cache: "no-store",
  });
  if (staticResponse.ok) {
    return staticResponse.json();
  }

  const apiResponse = await fetch(withBase("/api/structure"));
  if (!apiResponse.ok) {
    throw new Error("Не удалось получить список баннеров.");
  }

  return apiResponse.json();
}

async function init() {
  try {
    const data = await loadStructure();
    categoriesRoot.innerHTML = "";

    data.categories.forEach((category) => {
      categoriesRoot.appendChild(renderCategory(category));
    });
  } catch (error) {
    categoriesRoot.textContent =
      error.message || "Произошла ошибка загрузки.";
  }
}

init();
