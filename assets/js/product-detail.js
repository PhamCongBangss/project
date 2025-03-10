import menuItems from "./data.js";

document.addEventListener("DOMContentLoaded", () => {
  // Get product ID from URL
  const urlParams = new URLSearchParams(window.location.search);
  const productId = parseInt(urlParams.get("id"));

  // Fetch product data (you can import from menu.js or make an API call)
  const product = menuItems.find((item) => item.id === productId);

  if (product) {
    const productDetailHTML = `
            <div class="product-content" data-aos="fade-up">
                <div class="product-image">
                    <img src="${product.image}" alt="${product.name}">
                    <span class="category-tag">${product.category}</span>
                </div>
                <div class="product-info">
                    <h1>${product.name}</h1>
                    <p class="price">${product.price.toLocaleString()}đ</p>
                    <div class="description">
                        <h2>Mô tả sản phẩm</h2>
                        <p>${product.description}</p>
                    </div>
                    <div class="additional-info">
                        <h2>Thông tin thêm</h2>
                        <ul>
                            <li>Phục vụ: Nóng/Lạnh</li>
                            <li>Dung tích: 350ml</li>
                            <li>Thời gian phục vụ: 5-10 phút</li>
                        </ul>
                    </div>
                    <button class="add-to-cart">
                        <i class="fas fa-shopping-cart"></i>
                        Thêm vào giỏ hàng
                    </button>
                </div>
            </div>
        `;

    document.getElementById("productDetail").innerHTML = productDetailHTML;
  } else {
    document.getElementById("productDetail").innerHTML =
      '<p class="error">Không tìm thấy sản phẩm</p>';
  }
});
