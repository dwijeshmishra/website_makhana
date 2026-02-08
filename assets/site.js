const STORAGE_KEY = "samarth-overseas-products";
const DATA_URL = "data/products.json";
const PLACEHOLDER_IMAGE = "assets/images/placeholder.svg";

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

const getImage = (product) => {
  if (product && product.image && String(product.image).trim().length > 0) {
    return product.image;
  }
  return PLACEHOLDER_IMAGE;
};

const isValidProductList = (data) =>
  Array.isArray(data) && data.every((item) => item && item.name);

const loadProducts = async () => {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (stored) {
    try {
      const parsed = JSON.parse(stored);
      if (isValidProductList(parsed)) {
        return parsed;
      }
    } catch (error) {
      console.warn("Stored products could not be parsed.");
    }
  }

  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error("Failed to load products.");
    }
    const data = await response.json();
    return isValidProductList(data) ? data : [];
  } catch (error) {
    console.error("Unable to fetch products.json", error);
    return [];
  }
};

const createProductCard = (product) => {
  const idParam = encodeURIComponent(product.id || "");
  const name = escapeHtml(product.name || "Product");
  const summary = escapeHtml(product.summary || "");
  const category = escapeHtml(product.category || "");

  return `
    <article class="product-card">
      <div class="product-media">
        <img src="${escapeHtml(getImage(product))}" alt="${name}" />
      </div>
      <div class="product-body">
        <p class="eyebrow">${category || "Export item"}</p>
        <h3>${name}</h3>
        <p>${summary}</p>
        <p class="price-note">Contact us for pricing and MOQ</p>
        <a class="btn primary" href="product.html?id=${idParam}">View details</a>
      </div>
    </article>
  `;
};

const renderProductGrid = (products, target) => {
  if (!target) {
    return;
  }
  if (!products.length) {
    target.innerHTML =
      "<p>No products found. Please check back soon.</p>";
    return;
  }
  target.innerHTML = products.map(createProductCard).join("");
};

const renderProductDetail = (products) => {
  const detail = document.getElementById("product-detail");
  if (!detail) {
    return;
  }
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");
  const product = products.find((item) => item.id === id);

  if (!product) {
    detail.innerHTML = `
      <div>
        <p class="eyebrow">Product not found</p>
        <h1>We could not find that product.</h1>
        <p>Please browse the catalog to view available items.</p>
        <a class="btn primary" href="index.html#products">Back to catalog</a>
      </div>
    `;
    return;
  }

  const tags = Array.isArray(product.tags)
    ? product.tags
    : typeof product.tags === "string"
      ? product.tags.split(",").map((tag) => tag.trim()).filter(Boolean)
      : [];

  detail.innerHTML = `
    <div class="product-media">
      <img src="${escapeHtml(getImage(product))}" alt="${escapeHtml(
    product.name
  )}" />
    </div>
    <div>
      <p class="eyebrow">${escapeHtml(product.category || "Export item")}</p>
      <h1>${escapeHtml(product.name)}</h1>
      <p>${escapeHtml(product.description || product.summary || "")}</p>
      <div class="detail-meta">
        ${
          product.origin
            ? `<p><strong>Origin:</strong> ${escapeHtml(product.origin)}</p>`
            : ""
        }
        ${
          product.packaging
            ? `<p><strong>Packaging:</strong> ${escapeHtml(
                product.packaging
              )}</p>`
            : ""
        }
        ${
          product.moq
            ? `<p><strong>MOQ:</strong> ${escapeHtml(product.moq)}</p>`
            : ""
        }
        ${
          tags.length
            ? `<p><strong>Tags:</strong> ${escapeHtml(tags.join(", "))}</p>`
            : ""
        }
      </div>
      <div class="detail-actions">
        <a class="btn primary" href="mailto:info@samarthoverseasindia.com">
          Contact for pricing
        </a>
        <a class="btn ghost" href="index.html#contact">Request quote</a>
      </div>
    </div>
  `;
};

const initSite = async () => {
  const products = await loadProducts();
  const productGrid = document.getElementById("product-grid");
  renderProductGrid(products, productGrid);
  renderProductDetail(products);

  const related = document.getElementById("related-products");
  if (related) {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");
    const relatedItems = products.filter((item) => item.id !== id).slice(0, 3);
    renderProductGrid(relatedItems, related);
  }
};

document.addEventListener("DOMContentLoaded", initSite);
