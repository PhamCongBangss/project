import { createNavbar } from "./components/navbar.js";

document.body.insertAdjacentHTML("afterbegin", createNavbar());

const menu = document.querySelector(".menu-icon");
menu.addEventListener("click", () => {
  const nav = document.querySelector(".nav-menu");
  nav.classList.toggle("active");
});
