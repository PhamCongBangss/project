export function createNavbar() {
  return `
    <header>
        <nav class="navbar">
            <a class="nav-logo" href="./homePage.html"><p class="logo-text">☕BangCoffee</p></a>
            <div class="nav-menu">
                <div class="nav-item">
                    <a href="./homePage.html" class="nav-link">Trang chủ</a>
                </div>
                <div class="nav-item">
                    <a href="./aboutUs.html" class="nav-link">Về chúng tôi</a>
                </div>
                <div class="nav-item">
                    <a href="./menu.html" class="nav-link">Thực đơn</a>
                </div>
                <div class="nav-item">
                    <a href="./recruitment.html" class="nav-link">Tuyển dụng</a>
                </div>
            </div>
        </nav>
    </header>`;
}
