import menuItems from "./data.js";
import { createNavbar } from "./components/navbar.js";
const cartCounter = document.querySelector(".cart-counter");

function createMenuItem(item) {
  const displayPrice = Array.isArray(item.price)
    ? item.price.find((p) => p.size === "S").price
    : item.price;

  return `
        <div class="menu-item" data-aos="fade-up">
            <div class="menu-img-wrapper">
                <img class="menu-img" src="${item.image}" alt="${item.name}" />
                <div class="menu-overlay">
                    <i class="fas fa-coffee"></i>
                    <a href="productDetail.html?id=${
                      item.id
                    }" class="view-details">Xem chi tiết</a>
                </div>
                <span class="menu-category">${item.category}</span>
            </div>
            <div class="menu-content">
                <div class="menu-header">
                    <h3 class="menu-name">${item.name}</h3>
                    <p class="menu-price"><i class="fas fa-tag"></i> ${displayPrice.toLocaleString()}đ</p>
                </div>
                <p class="menu-description">${item.description}</p>
            </div>
        </div>
    `;
}

document.addEventListener("DOMContentLoaded", () => {
  document.body.insertAdjacentHTML("afterbegin", createNavbar());
  const menu = document.querySelector(".menu-icon");
  renderMenuItems(menuItems);
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartCounter.innerText = cartItems.length;

  document
    .getElementById("searchInput")
    .addEventListener("input", filterMenuItems);
  document
    .getElementById("priceFilter")
    .addEventListener("change", filterMenuItems);
  document
    .getElementById("categoryFilter")
    .addEventListener("change", filterMenuItems);
});

function renderMenuItems(items) {
  const container = document.getElementById("menuContainer");
  container.innerHTML = items.map((item) => createMenuItem(item)).join("");
}

function filterMenuItems() {
  const searchTerm = document.getElementById("searchInput").value.toLowerCase();
  const priceFilter = document.getElementById("priceFilter").value;
  const categoryFilter = document.getElementById("categoryFilter").value;
  const noResult = document.querySelector(".no-results");

  const filteredItems = menuItems.filter((item) => {
    const matchesSearch =
      item.name.toLowerCase().includes(searchTerm) ||
      item.description.toLowerCase().includes(searchTerm);

    let matchesPrice = true;
    if (priceFilter !== "all") {
      const basePrice = Array.isArray(item.price)
        ? item.price.find((p) => p.size === "S").price
        : item.price;

      const option = priceFilter;
      if (option === "1") {
        matchesPrice = basePrice < 40000;
      }
      if (option === "2") {
        matchesPrice = basePrice >= 40000 && basePrice < 60000;
      }
      if (option === "3") {
        matchesPrice = basePrice >= 60000;
      }
    }

    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;

    return matchesSearch && matchesPrice && matchesCategory;
  });

  renderMenuItems(filteredItems);
  if (filteredItems.length === 0) {
    noResult.style.display = "block";
  } else {
    noResult.style.display = "none";
  }
}
