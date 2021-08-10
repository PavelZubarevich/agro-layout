"use strict";

var burger = document.querySelector(".burger"),
    headerTop = document.querySelector(".header__top"),
    headerNav = document.querySelector(".header-top__nav"),
    headerBtn = document.querySelector(".header-top__btn"),
    headerLogo = document.querySelector(".header-top__logo");
burger.addEventListener("click", function () {
  burger.classList.toggle("_active");
  headerTop.classList.toggle("_active");
  headerNav.classList.toggle("_active");
  headerBtn.classList.toggle("_active");
  headerLogo.classList.toggle("_active");
});
var list = document.querySelector(".header-nav__list");
var header = document.querySelector(".header-top__content");
var width = window.innerWidth;

if (window.innerWidth < 576) {
  list.appendChild(headerBtn);
} else {
  window.addEventListener("resize", function () {
    if (window.innerWidth < 576) {
      list.appendChild(headerBtn);
    } else {
      header.appendChild(headerBtn);
    }
  });
}