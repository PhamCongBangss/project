import menuItems from "./data.js";
function createMenuItemHTML(item) {
  return `
        <div class="menu-item" data-aos="fade-up">
            <div class="menu-img-wrapper">
                <img class="menu-img" src="${item.image}" alt="${item.name}" />
                <div class="menu-overlay">
                    <i class="fas fa-coffee"></i>
                    <a href="product-detail.html?id=${
                      item.id
                    }" class="view-details">Xem chi tiết</a>
                </div>
                <span class="menu-category">${item.category}</span>
            </div>
            <div class="menu-content">
                <h3 class="menu-name">${item.name}</h3>
                <div class="menu-info">
                    <p class="menu-price"><i class="fas fa-tag"></i> ${item.price.toLocaleString()}đ</p>
                    <button class="order-btn"><i class="fas fa-shopping-cart"></i></button>
                </div>
                <p class="menu-description">${item.description}</p>
            </div>
        </div>
    `;
}

function renderMenuItems(items) {
  const container = document.getElementById("menuContainer");
  container.innerHTML = items.map((item) => createMenuItemHTML(item)).join("");
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
      const option = priceFilter;
      if (option === "1") {
        matchesPrice = item.price < 40000;
      }
      if (option === "2") {
        matchesPrice = item.price >= 40000 && item.price < 60000;
      }

      if (option === "3") {
        matchesPrice = item.price >= 60000;
      }
    }

    const matchesCategory =
      categoryFilter === "all" || item.category === categoryFilter;

    return matchesSearch && matchesPrice && matchesCategory;
  });
  renderMenuItems(filteredItems);
  if (filteredItems.length === 0) {
    noResult.style.display = "block";
  }
}

document.addEventListener("DOMContentLoaded", () => {
  renderMenuItems(menuItems);

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
