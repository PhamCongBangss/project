import menuItems from "./data.js";
import { createNavbar } from "./components/navbar.js";

document.addEventListener("DOMContentLoaded", () => {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));
  const product = menuItems.find((item) => item.id === productId);
  const cartCounter = document.querySelector(".cart-counter");
  const title = document.querySelector("title");
  title.innerText = `${product.name} -  Coffee`;

  document.body.insertAdjacentHTML("afterbegin", createNavbar());

  const hasSizes = Array.isArray(product.price);
  const initialPrice = hasSizes ? product.price[0].price : product.price;
  let quantity = 1;

  const productDetailHTML = `
            <div class="product-content" data-aos="fade-up">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <span class="category-tag">${product.category}</span>
                </div>
                <div class="product-info">
                    <h1>${product.name}</h1>
                    <p class="price" id="productPrice">${initialPrice.toLocaleString()}đ</p>
                    ${
                      hasSizes
                        ? `<div class="size-selection">
                            <h2>Chọn kích cỡ</h2>
                            <div class="size-options">
                                ${product.price
                                  .map(
                                    (size) => `
                                        <span class="size-label ${
                                          size.size === "S"
                                            ? "size-chossen"
                                            : ""
                                        }">${size.size}</span>
                                    </label>`
                                  )
                                  .join("")}
                            </div>
                        </div>`
                        : ""
                    }
                    <div class="description">
                        <h2>Mô tả sản phẩm</h2>
                        <p>${product.description}</p>
                    </div>

                      <div class="quantity-control">
                        <button class="minus">-</button>
                        <div class="quantity-input">1</div>
                        <button class="add">+</button>
                      </div>

                    <div class="buy-btn">
                      <button class="add-to-cart">
                          <i class="fas fa-shopping-cart"></i>
                          Thêm vào giỏ hàng
                      </button>
                    </div>
                </div>
            </div>
        `;
  if (hasSizes) {
  }
  document.getElementById("productDetail").innerHTML = productDetailHTML;
  let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
  cartCounter.innerText = cartItems.length;

  const plusBtn = document.querySelector(".add");
  const minusBtn = document.querySelector(".minus");
  const quantityInput = document.querySelector(".quantity-input");
  const addToCartBtn = document.querySelector(".add-to-cart");
  const sizeBtn = document.querySelectorAll(".size-label");

  sizeBtn.forEach((btn) => {
    btn.addEventListener("click", (e) => {
      sizeBtn.forEach((btn) => {
        btn.classList.remove("size-chossen");
      });
      e.target.classList.add("size-chossen");
      document.getElementById("productPrice").innerText =
        product.price
          .find((size) => size.size === e.target.innerText)
          .price.toLocaleString() + "đ";
    });
  });

  minusBtn.addEventListener("click", () => {
    let value = Number(quantityInput.innerText);
    if (value > 1) {
      quantityInput.innerText = value - 1;
      quantity = value - 1;
    }
  });

  plusBtn.addEventListener("click", () => {
    let value = Number(quantityInput.innerText);
    if (value < 99) {
      quantityInput.innerText = value + 1;
      quantity = value + 1;
    }
  });

  addToCartBtn.addEventListener("click", () => {
    const chosenSize = hasSizes
      ? document.querySelector(".size-chossen").innerText
      : "no";
    const selectedItem = {
      id: productId,
      size: chosenSize,
      quantity: quantity,
    };

    let cartItems = JSON.parse(localStorage.getItem("cart")) || [];
    cartItems.push(selectedItem);
    cartCounter.innerText = cartItems.length;

    localStorage.setItem("cart", JSON.stringify(cartItems));

    const toast = document.createElement("div");
    toast.className = "toast";
    toast.innerHTML = `
        <i class="fas fa-check-circle"></i>
        Đã thêm vào giỏ hàng!
    `;
    document.body.appendChild(toast);

    setTimeout(() => toast.classList.add("show"), 100);

    setTimeout(() => {
      toast.classList.remove("show");
      setTimeout(() => toast.remove(), 300);
    }, 3000);
  });
});
