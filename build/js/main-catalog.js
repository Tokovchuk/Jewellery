'use strict';
// CATALOG.HTML


const body = document.querySelector('body');
const header = document.querySelector('.header');
const headerMenu = document.querySelector('.header__menu');
const headerForm = document.querySelector('.header__form');
const logo = document.querySelector('.header__logo');
const headerNav = document.querySelector('.header__nav');
const headerSearch = document.querySelector('.header__form input');
const login = document.querySelector('.header__login');
const mainNav = document.querySelector('.main-nav');
const headerUser = document.querySelector('.header__user');
const burger = document.querySelector('.header__burger');
const cart = document.querySelector('.header__cart');

// Replace Header
const replaceHeader = () => {
  headerForm.cloneNode(true);
  headerForm.style.margin = '0 0 55px 0';
  mainNav.insertBefore(headerForm, mainNav.firstChild);
  login.cloneNode(true);
  login.style.display = 'block';
  mainNav.appendChild(login);
  headerSearch.removeAttribute('placeholder');
};

if (body.clientWidth < 1024) {
  replaceHeader();
}

window.addEventListener('resize', function () {
  if (window.matchMedia('(max-width: 1023px)').matches) {
    replaceHeader();
  } else {
    headerMenu.insertBefore(headerForm, logo);
    headerUser.prepend(login);
    headerSearch.setAttribute('placeholder', 'Type here for search');
  }
});

// Activate MENU
logo.classList.remove('header__logo--nojs');
burger.classList.remove('header__burger--nojs');
headerNav.classList.remove('header__nav--nojs');
burger.classList.add('header__burger--close');
cart.classList.add('header__cart--close');
header.classList.add('header--close');
headerForm.classList.add('header__form--close');
logo.classList.add('header__logo--close');
headerNav.classList.add('header__nav--close');

burger.addEventListener('click', (evt) => {
  evt.preventDefault();
  header.classList.toggle('header--close');
  headerForm.classList.toggle('header__form--close');
  logo.classList.toggle('header__logo--close');
  headerNav.classList.toggle('header__nav--close');
  burger.classList.toggle('header__burger--close');
  cart.classList.toggle('header__cart--close');
});

// Filter
const filter = document.querySelector('.filter');
const filterForm = document.querySelector('.filter__form');
const filterItems = filterForm.querySelectorAll('fieldset');
const openBtn = document.querySelector('.filter__open');
const closeBtn = document.querySelector('.filter__close');

filterItems.forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('filter__active');
  });
});

openBtn.addEventListener('click', () => {
  openBtn.classList.add('filter__open--hide');
  filter.classList.add('filter--fixed');
  filterForm.classList.add('filter__form--active');
  closeBtn.classList.add('filter__close--active');
  body.style.overflow = 'hidden';
});

closeBtn.addEventListener('click', () => {
  openBtn.classList.remove('filter__open--hide');
  filter.classList.remove('filter--fixed');
  filterForm.classList.remove('filter__form--active');
  closeBtn.classList.remove('filter__close--active');
  body.style.overflow = 'auto';
});


