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

const slugify = (value) =>
  String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");

const isValidProductList = (data) =>
  Array.isArray(data) && data.every((item) => item && item.name);

const form = document.getElementById("product-form");
const fields = {
  id: document.getElementById("id"),
  name: document.getElementById("name"),
  category: document.getElementById("category"),
  origin: document.getElementById("origin"),
  packaging: document.getElementById("packaging"),
  moq: document.getElementById("moq"),
  summary: document.getElementById("summary"),
  description: document.getElementById("description"),
  image: document.getElementById("image"),
  tags: document.getElementById("tags"),
};

const listContainer = document.getElementById("admin-products");
const exportButton = document.getElementById("export-json");
const copyButton = document.getElementById("copy-json");
const importInput = document.getElementById("import-json");
const resetButton = document.getElementById("reset-json");
const cancelButton = document.getElementById("cancel-edit");

let products = [];
let editIndex = null;

const saveToStorage = () => {
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(products, null, 2));
};

const loadFromStorage = () => {
  const stored = window.localStorage.getItem(STORAGE_KEY);
  if (!stored) {
    return null;
  }
  try {
    const parsed = JSON.parse(stored);
    return isValidProductList(parsed) ? parsed : null;
  } catch (error) {
    return null;
  }
};

const loadDefaultProducts = async () => {
  try {
    const response = await fetch(DATA_URL);
    if (!response.ok) {
      throw new Error("Unable to load products.json");
    }
    const data = await response.json();
    return isValidProductList(data) ? data : [];
  } catch (error) {
    console.error(error);
    return [];
  }
};

const resetForm = () => {
  form.reset();
  editIndex = null;
};

const fillForm = (product) => {
  fields.id.value = product.id || "";
  fields.name.value = product.name || "";
  fields.category.value = product.category || "";
  fields.origin.value = product.origin || "";
  fields.packaging.value = product.packaging || "";
  fields.moq.value = product.moq || "";
  fields.summary.value = product.summary || "";
  fields.description.value = product.description || "";
  fields.image.value = product.image || "";
  fields.tags.value = product.tags ? product.tags.join(", ") : "";
};

const normalizeProduct = (raw) => {
  const name = raw.name.trim();
  const id = raw.id.trim() || slugify(name);
  const tags = raw.tags
    .split(",")
    .map((tag) => tag.trim())
    .filter(Boolean);

  return {
    id,
    name,
    category: raw.category.trim(),
    origin: raw.origin.trim(),
    packaging: raw.packaging.trim(),
    moq: raw.moq.trim(),
    summary: raw.summary.trim(),
    description: raw.description.trim(),
    image: raw.image.trim() || PLACEHOLDER_IMAGE,
    tags,
  };
};

const renderList = () => {
  if (!products.length) {
    listContainer.innerHTML =
      "<p>No products saved yet. Add your first product above.</p>";
    return;
  }

  listContainer.innerHTML = products
    .map(
      (product, index) => `
      <div class="admin-item">
        <div>
          <h3>${escapeHtml(product.name)}</h3>
          <p><strong>ID:</strong> ${escapeHtml(product.id)}</p>
          <p><strong>Category:</strong> ${escapeHtml(
            product.category || "Not set"
          )}</p>
          <p>${escapeHtml(product.summary || "")}</p>
        </div>
        <div class="admin-item-actions">
          <button class="btn ghost" data-action="edit" data-index="${index}">
            Edit
          </button>
          <button class="btn danger" data-action="delete" data-index="${index}">
            Delete
          </button>
        </div>
      </div>
    `
    )
    .join("");
};

const getFormData = () => ({
  id: fields.id.value,
  name: fields.name.value,
  category: fields.category.value,
  origin: fields.origin.value,
  packaging: fields.packaging.value,
  moq: fields.moq.value,
  summary: fields.summary.value,
  description: fields.description.value,
  image: fields.image.value,
  tags: fields.tags.value,
});

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const raw = getFormData();
  if (!raw.name.trim()) {
    window.alert("Please enter a product name.");
    return;
  }

  const product = normalizeProduct(raw);
  const duplicateIndex = products.findIndex(
    (item, index) => item.id === product.id && index !== editIndex
  );

  if (duplicateIndex >= 0) {
    window.alert("Product ID already exists. Please use a unique ID.");
    return;
  }

  if (editIndex !== null) {
    products[editIndex] = product;
  } else {
    products.push(product);
  }

  saveToStorage();
  renderList();
  resetForm();
});

listContainer.addEventListener("click", (event) => {
  const action = event.target.getAttribute("data-action");
  const index = Number(event.target.getAttribute("data-index"));
  if (Number.isNaN(index)) {
    return;
  }

  if (action === "edit") {
    editIndex = index;
    fillForm(products[index]);
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  if (action === "delete") {
    const confirmed = window.confirm(
      "Remove this product? This cannot be undone."
    );
    if (!confirmed) {
      return;
    }
    products.splice(index, 1);
    saveToStorage();
    renderList();
  }
});

cancelButton.addEventListener("click", () => {
  resetForm();
});

exportButton.addEventListener("click", () => {
  const content = JSON.stringify(products, null, 2);
  const blob = new Blob([content], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "products.json";
  link.click();
  URL.revokeObjectURL(url);
});

copyButton.addEventListener("click", async () => {
  try {
    await navigator.clipboard.writeText(JSON.stringify(products, null, 2));
    window.alert("JSON copied to clipboard.");
  } catch (error) {
    window.alert("Unable to copy. Please use the download button instead.");
  }
});

importInput.addEventListener("change", (event) => {
  const file = event.target.files[0];
  if (!file) {
    return;
  }
  const reader = new FileReader();
  reader.onload = () => {
    try {
      const parsed = JSON.parse(reader.result);
      if (!isValidProductList(parsed)) {
        throw new Error("Invalid JSON format.");
      }
      products = parsed;
      saveToStorage();
      renderList();
    } catch (error) {
      window.alert("Invalid JSON file. Please check the format.");
    }
  };
  reader.readAsText(file);
});

resetButton.addEventListener("click", async () => {
  const confirmed = window.confirm(
    "Reset to default products.json? This will replace your saved changes."
  );
  if (!confirmed) {
    return;
  }
  products = await loadDefaultProducts();
  saveToStorage();
  renderList();
});

const initAdmin = async () => {
  const stored = loadFromStorage();
  products = stored || (await loadDefaultProducts());
  renderList();
};

document.addEventListener("DOMContentLoaded", initAdmin);
