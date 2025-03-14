import menuItems from "./data.js";
import { createNavbar } from "./components/navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  document.body.insertAdjacentHTML("afterbegin", createNavbar());
  const menu = document.querySelector(".menu-icon");
  menu.addEventListener("click", () => {
    const nav = document.querySelector(".nav-menu");
    nav.classList.toggle("active");
  });
  renderCart();
});

function renderCart() {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  const cartList = document.getElementById("cartList");
  let total = 0;

  const cartHTML = cartItems
    .map((item, index) => {
      const product = menuItems.find((p) => p.id === item.id);
      const price = Array.isArray(product.price)
        ? product.price.find((p) => p.size === item.size).price
        : product.price;
      const itemTotal = price * item.quantity;
      total += itemTotal;

      return `
            <div class="cart-item" data-index="${index}">
                <span>${index + 1}</span>
                <img src="${product.image}" alt="${product.name}">
                <div class="item-details">
                    <h3>${product.name}</h3>
                    ${item.size ? `<span>Size: ${item.size}</span>` : ""}
                </div>
                <div class="quantity-control">
                    <button class="decrease">-</button>
                    <span>${item.quantity}</span>
                    <button class="increase">+</button>
                </div>
                <span>${itemTotal.toLocaleString()}đ</span>
                <i class="fas fa-trash remove-item"></i>
            </div>
        `;
    })
    .join("");

  cartList.innerHTML = cartHTML || "<p>Giỏ hàng trống</p>";
  document.getElementById(
    "totalPrice"
  ).textContent = `${total.toLocaleString()}đ`;

  // Add event listeners for quantity controls and remove buttons
  document.querySelectorAll(".cart-item").forEach((item) => {
    const index = item.dataset.index;

    item.querySelector(".increase")?.addEventListener("click", () => {
      updateQuantity(index, 1);
    });

    item.querySelector(".decrease")?.addEventListener("click", () => {
      updateQuantity(index, -1);
    });

    item.querySelector(".remove-item")?.addEventListener("click", () => {
      removeItem(index);
    });
  });
}

function updateQuantity(index, change) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems[index].quantity = Math.max(1, cartItems[index].quantity + change);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
}

function removeItem(index) {
  const cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartItems.splice(index, 1);
  localStorage.setItem("cart", JSON.stringify(cartItems));
  renderCart();
}

document.getElementById("shippingForm").addEventListener("submit", (e) => {
  e.preventDefault();
  const orderData = {
    items: JSON.parse(localStorage.getItem("cart")) || [],
    customer: {
      name: document.getElementById("name").value,
      phone: document.getElementById("phone").value,
      address: document.getElementById("address").value,
      note: document.getElementById("note").value,
    },
    orderDate: new Date().toISOString(),
  };

  // Here you can handle the order (send to server, etc.)
  console.log("Order placed:", orderData);
  const toast = document.createElement("div");
  toast.className = "toast";
  toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        Đã đặt hàng thành công!
    `;
  document.body.appendChild(toast);

  setTimeout(() => toast.classList.add("show"), 100);

  setTimeout(() => {
    toast.classList.remove("show");
    window.location.href = "menu.html";
    setTimeout(() => toast.remove(), 300);
  }, 3000);
  localStorage.removeItem("cart");
});
