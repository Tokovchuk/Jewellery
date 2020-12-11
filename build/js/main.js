'use strict';

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

// FAQ Tabs

const triggers = document.querySelectorAll('.accordion__item');

triggers.forEach((item) => {
  item.addEventListener('click', () => {
    item.classList.toggle('accordion__item--active');
  });
});

// Slider INDEX

const next = document.querySelector('#btn-next');
const prev = document.querySelector('#btn-prev');
const track = document.querySelector('.slider__track');
const slides = document.querySelectorAll('.slider__item');
const slider = document.querySelector('.slider');

const pageContainer = document.querySelector('.slider__pages');

let index = 0;
let slidesToShow = 4;
let maxIndex = (slides.length / slidesToShow) - 1;

const addPageNumber = () => {
  const maxPages = slides.length / slidesToShow;
  for (let i = 1; i <= maxPages; i++) {
    const number = document.createElement('span');
    number.className = 'slider__page';
    number.textContent = `${i}`;
    pageContainer.append(number);
  }
};

const deletePageNumbers = () => {
  while (pageContainer.firstChild) {
    pageContainer.firstChild.remove();
  }
};

addPageNumber();
let pageNumbers = document.querySelectorAll('.slider__page');

window.addEventListener('resize', function () {
  if (window.matchMedia('(max-width: 1023px)').matches) {
    deletePageNumbers();
    slidesToShow = 2;
    maxIndex = (slides.length / slidesToShow) - 1;
    addPageNumber();
    pageNumbers = document.querySelectorAll('.slider__page');
    setSlider();
  } else {
    deletePageNumbers();
    slidesToShow = 4;
    maxIndex = (slides.length / slidesToShow) - 1;
    addPageNumber();
    pageNumbers = document.querySelectorAll('.slider__page');
    if (index > 2) {
      index = 2;
      setSlider();
    } else {
      setSlider();
    }
  }
});

const setPosition = function () {
  if (index === 0) {
    prev.setAttribute('disabled', 'true');
  } else {
    prev.removeAttribute('disabled');
  }

  if (index === maxIndex) {
    next.setAttribute('disabled', 'true');
  } else {
    next.removeAttribute('disabled');
  }

  let moveSlider = slider.clientWidth * index;
  track.style.transform = `translateX(-${moveSlider}px)`;
  track.style.transition = '0.2s';
};

const activeNumber = () => {
  pageNumbers.forEach((number) => {
    number.classList.remove('slider__page--active');
  });
  pageNumbers[index].classList.add('slider__page--active');
};

const activePages = () => {
  pageNumbers.forEach((item, indexPage) => {
    item.addEventListener('click', () => {
      index = indexPage;
      setPosition(index);
      activeNumber(index);
    });
  });
  pageNumbers[0].click();
};

const setSlider = () => {
  setPosition();
  activeNumber();
  activePages();
};

setPosition();
activePages();

next.addEventListener('click', () => {
  index++;
  setPosition();
  activeNumber();
});

prev.addEventListener('click', () => {
  index--;
  setPosition();
  activeNumber();
});

