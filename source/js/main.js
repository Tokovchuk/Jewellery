'use strict';
(function () {
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

  if (slider !== null) {

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

    let mobileNumbers = document.createElement('span');

    const setMobileNumbers = () => {
      mobileNumbers.textContent = `${index + 1} of ${maxIndex + 1}`;
    };

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

    window.addEventListener('resize', function () {
      if (window.matchMedia('(max-width: 767px)').matches) {
        slider.append(mobileNumbers);
        deletePageNumbers();
        setMobileNumbers();
        prev.classList.add('slider__btn--hide');
        next.classList.add('slider__btn--hide');
        if (index >= 0 && index <= maxIndex) {
          slider.addEventListener('touchstart', handleTouchStart, false);
          slider.addEventListener('touchmove', handleTouchMove, false);
        }
      } else {
        mobileNumbers.remove();
        prev.classList.remove('slider__btn--hide');
        next.classList.remove('slider__btn--hide');
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

    const nextSlide = () => {
      index++;
      setPosition();
      activeNumber();
      setMobileNumbers();
    };

    const nextSlideMobile = () => {
      if (index < maxIndex) {
        index++;
        setPosition();
        setMobileNumbers();
      }
    };

    const prevSlide = () => {
      index--;
      setPosition();
      activeNumber();
      setMobileNumbers();
    };

    const prevSlideMobile = () => {
      if (index > 0) {
        index--;
        setPosition();
        setMobileNumbers();
      }
    };

    next.addEventListener('click', nextSlide);
    prev.addEventListener('click', prevSlide);

    let xDown = null;
    let yDown = null;

    const handleTouchStart = (evt) => {
      xDown = evt.touches[0].pageX;
      yDown = evt.touches[0].pageY;
    };

    const handleTouchMove = (evt) => {
      if (!xDown || !yDown) {
        return;
      }

      let xUp = evt.touches[0].pageX;
      let yUp = evt.touches[0].pageY;

      let xDiff = xDown - xUp;
      let yDiff = yDown - yUp;
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          nextSlideMobile();
        } else {
          prevSlideMobile();
        }
      }
      xDown = null;
      yDown = null;
    };
  }

  // Modal LOGIN

  const modalLogin = document.querySelector('.modal-login');
  const btnClose = document.querySelector('.modal-login__close');
  const overlay = document.querySelector('.modal-login__overlay');
  const email = document.querySelector('#email');

  login.addEventListener('click', (evt) => {
    evt.preventDefault();
    email.focus();
    modalLogin.classList.remove('visually-hidden');
    body.style.overflow = 'hidden';
    window.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        modalLogin.classList.add('visually-hidden');
        body.style.overflow = 'visible';
      }
    });
    btnClose.addEventListener('click', (e) => {
      e.preventDefault();
      if (e.button === 0) {
        modalLogin.classList.add('visually-hidden');
        body.style.overflow = 'visible';
      }
    });
    overlay.addEventListener('click', (e) => {
      if (e.button === 0) {
        modalLogin.classList.add('visually-hidden');
        body.style.overflow = 'visible';
      }
    });
  });

  // Табы CART.HTML

  const link = document.querySelectorAll('.info__link');
  const card = document.querySelectorAll('.info__item');

  const changeActive = function (e) {
    e.preventDefault();
    const id = e.target.getAttribute('href');

    link.forEach(function (child) {
      child.classList.remove('info__link--active');
    });
    card.forEach(function (child) {
      child.classList.remove('info__item--active');
    });

    e.target.classList.add('info__link--active');
    document.querySelector(id).classList.add('info__item--active');
  };

  if (link.length !== 0) {

    link.forEach(function (item) {
      item.addEventListener('click', changeActive);
    });
    link[1].click();
  }

  // Slider CART.HTML

  const firstImg = document.querySelector('.image-box__big picture');
  const imageBoxBig = document.querySelector('.image-box__big');
  const imageBoxSmall = document.querySelector('.image-box__small');
  let images = document.querySelectorAll('.image-box__small picture');
  const sliderContainer = document.querySelector('.image-box__wrapper');
  let indexPage = 0;

  if (sliderContainer !== null) {
    const cloneImg = firstImg.cloneNode(true);

    window.addEventListener('resize', function () {
      if (window.matchMedia('(max-width: 767px)').matches) {
        firstImg.remove();
        images = document.querySelectorAll('.image-box__small picture');
        imageBoxSmall.insertBefore(cloneImg, images[0]);
        sliderContainer.append(counter);
        setCounter();
        sliderContainer.addEventListener('touchstart', handleTouchStart, false);
        sliderContainer.addEventListener('touchmove', handleTouchMoveM, false);
      } else {
        cloneImg.remove();
        imageBoxBig.append(firstImg);
        counter.remove();
        indexPage = 0;
        setMobileSlider();
        sliderContainer.removeEventListener('touchstart', handleTouchStart, false);
        sliderContainer.removeEventListener('touchmove', handleTouchMoveM, false);
      }
    });

    const counter = document.createElement('span');

    const setCounter = () => {
      images = document.querySelectorAll('.image-box__small picture');
      counter.textContent = `${indexPage + 1}  of  ${images.length}`;
    };

    const setMobileSlider = () => {
      let moveSlider = imageBoxSmall.clientWidth * indexPage;
      imageBoxSmall.style.transform = `translateX(-${moveSlider}px)`;
      imageBoxSmall.style.transition = '0.2s';
    };

    const swipeLeft = () => {
      if (indexPage < images.length - 1) {
        indexPage++;
        setCounter();
        setMobileSlider();
      }
    };

    const swipeRight = () => {
      if (indexPage > 0) {
        indexPage--;
        setCounter();
        setMobileSlider();
      }
    };

    let xDown = null;
    let yDown = null;

    const handleTouchStart = (evt) => {
      xDown = evt.touches[0].pageX;
      yDown = evt.touches[0].pageY;
    };

    const handleTouchMoveM = (evt) => {
      if (!xDown || !yDown) {
        return;
      }

      let xUp = evt.touches[0].pageX;
      let yUp = evt.touches[0].pageY;

      let xDiff = xDown - xUp;
      let yDiff = yDown - yUp;
      if (Math.abs(xDiff) > Math.abs(yDiff)) {
        if (xDiff > 0) {
          swipeLeft();
        } else {
          swipeRight();
        }
      }
      xDown = null;
      yDown = null;
    };
  }

  // Modal cart

  const modalCart = document.querySelector('.modal-cart');
  const btnCloseCart = document.querySelector('.modal-cart__close');
  const overlayCart = document.querySelector('.modal-cart__overlay');
  const modalCartOpen = document.querySelector('.product__button');
  const checkout = document.querySelector('#checkout');

  if (modalCart !== null) {
    modalCartOpen.addEventListener('click', (evt) => {
      evt.preventDefault();
      modalCart.classList.remove('visually-hidden');
      body.style.overflow = 'hidden';
      window.addEventListener('keydown', (e) => {
        if (e.key === 'Escape') {
          modalCart.classList.add('visually-hidden');
          body.style.overflow = 'visible';
        }
      });
      btnCloseCart.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.button === 0) {
          modalCart.classList.add('visually-hidden');
          body.style.overflow = 'visible';
        }
      });
      checkout.addEventListener('click', (e) => {
        e.preventDefault();
        if (e.button === 0) {
          modalCart.classList.add('visually-hidden');
          body.style.overflow = 'visible';
        }
      });
      overlayCart.addEventListener('click', (e) => {
        if (e.button === 0) {
          modalCart.classList.add('visually-hidden');
          body.style.overflow = 'visible';
        }
      });
    });
  }

  // Filter CATALOG.HTML

  const filter = document.querySelector('.filter');
  const filterForm = document.querySelector('.filter__form');
  const filterItems = document.querySelectorAll('fieldset');
  const openBtn = document.querySelector('.filter__open');
  const closeBtn = document.querySelector('.filter__close');

  if (filter !== null) {
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
      body.style.overflow = 'visible';
    });
  }
})();
