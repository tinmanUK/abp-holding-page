const products = [
  { name: "White Replacement Fascia", detail: "18mm × 175mm · 5m length", category: "Fascia", price: 34.80, stock: "In stock", style: "fascia" },
  { name: "Black Ash Fascia Board", detail: "18mm × 225mm · 5m length", category: "Fascia", price: 59.40, stock: "In stock", style: "black-fascia" },
  { name: "White Vented Soffit", detail: "10mm × 300mm · 5m length", category: "Soffit", price: 38.10, stock: "Low stock", style: "soffit" },
  { name: "Deepflow Gutter Length", detail: "Black · 4m length", category: "Guttering", price: 21.60, stock: "In stock", style: "gutter" },
  { name: "Anthracite Shiplap Cladding", detail: "150mm × 5m · Woodgrain", category: "Cladding", price: 27.48, stock: "In stock", style: "cladding" },
  { name: "Dry Verge Unit Pack", detail: "Universal fit · Pack of 10", category: "Roofing", price: 42.00, stock: "In stock", style: "roofing" }
];

let category = "All products";
let quoteCount = 0;
const search = document.querySelector("#search");
const grid = document.querySelector("#product-grid");
const empty = document.querySelector("#empty");

function renderProducts() {
  const query = search.value.trim().toLowerCase();
  const visible = products.filter(product =>
    (category === "All products" || product.category === category) &&
    `${product.name} ${product.detail}`.toLowerCase().includes(query)
  );
  grid.innerHTML = visible.map(product => `
    <article class="product-card">
      <div class="product-visual ${product.style}"><span>${product.category}</span></div>
      <div class="product-info">
        <p class="stock ${product.stock === "Low stock" ? "low" : ""}">● ${product.stock}</p>
        <h3>${product.name}</h3><p>${product.detail}</p>
        <div class="price"><strong>£${product.price.toFixed(2)}</strong><span>inc VAT<br>£${(product.price / 1.2).toFixed(2)} ex VAT</span></div>
        <button class="add-quote">Add to quote <span>+</span></button>
      </div>
    </article>`).join("");
  empty.hidden = visible.length !== 0;
  document.querySelectorAll(".add-quote").forEach(button => button.addEventListener("click", () => {
    quoteCount += 1;
    document.querySelector("#quote-count").textContent = quoteCount;
  }));
}

document.querySelectorAll("[data-category]").forEach(button => button.addEventListener("click", () => {
  category = button.dataset.category;
  document.querySelectorAll(".filter-row button").forEach(item => item.classList.toggle("active", item.dataset.category === category));
  renderProducts();
  document.querySelector("#catalogue").scrollIntoView({ behavior: "smooth" });
}));
search.addEventListener("input", renderProducts);
renderProducts();
