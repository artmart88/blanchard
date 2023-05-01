// Слайдер галереи
const gallerySlider = new Swiper(".gallery-swiper", {
  // Настройки слайдера
  slidesPerView: 1, // Количество слайдов, видимых одновременно
  grid: {
    rows: 1,
    fill: "row"
  }, // Определяет, сколько строк должно быть в гриде
  spaceBetween: 20, // Расстояние между слайдами
  pagination: {
    el: ".gallery-pagination",
    type: "fraction"
  }, // Опции пагинации
  navigation: {
    nextEl: ".gallery-next",
    prevEl: ".gallery-prev"
  }, // Опции навигации
  breakpoints: {
    441: {
      slidesPerView: 2,
      spaceBetween: 30
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 50
    }
  }, // Брейкпоинты для адаптивности
  a11y: false, // Отключает доступность для слайдера (для пользователей, пользующихся чтением экрана и других вспомогательных технологий)
  keyboard: {
    enabled: true,
    onlyInViewport: true
  }, // Включает управление с клавиатуры
  // Надстройки делают слайды вне области видимости не фокусируемыми
  watchSlidesProgress: true,
  watchSlidesVisibility: true,
  slideVisibleClass: "slide-visible",
  on: {
    // Настройки событий слайдера
    init: function () {
      // Функция, которая вызывается при инициализации слайдера
      this.slides.forEach((slide) => {
        if (!slide.classList.contains("slide-visible")) {
          slide.tabIndex = "-1";
        } else {
          slide.tabIndex = "";
        }
      });
    },
    slideChange: function () {
      // Функция, которая вызывается при смене слайда
      this.slides.forEach((slide) => {
        if (!slide.classList.contains("slide-visible")) {
          slide.tabIndex = "-1";
        } else {
          slide.tabIndex = "";
        }
      });
    }
  }
});

// Слайдер карточек
const cardSlider = new Swiper('.swiper-container', {
  // Настройки слайдера
  direction: 'horizontal', // Направление скролла (горизонтальное)
  slidesPerView: 3, // Количество слайдов, видимых одновременно
  grid: {
    rows: 2,
    fill: 'row',
  }, // Определяет, сколько строк должно быть в гриде
  spaceBetween: 30, // Расстояние между слайдами
  pagination: {
    el: ".gallery-pagination",
    type: "bullets"
  }, // Опции пагинации
  navigation: {
    nextEl: ".gallery-next",
    prevEl: ".gallery-prev"
  }, // Опции навигации
});



const heroSwiper = new Swiper('.js-hero-swiper', {
  allowTouchMove: false,
  loop: true,
  effect: 'fade',
  speed: 10000,
  autoplay: {
    delay: 10000
  }
});

const productSwiper = new Swiper('.projects__swiper', {
  speed: 300,
  slidesPerView: 3,
  spaceBetween: 100,
  navigation: {
    nextEl: '.swiper-button-next', 
    prevEl: '.swiper-button-prev',
  },
});

const eventsSwiper = new Swiper('#events', {
  speed: 300,
  slidesPerView: 3,
  spaceBetween: 100,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
});



const params = {
  btnClassName: "js-header-dropdown-btn",
  dropClassName: "js-header-drop",
  activeClassName: "is-active",
  disabledClassName: "is-disabled"
};

function onDisable(evt) {
  if (evt.target.classList.contains(params.disabledClassName)) {
    evt.target.classList.remove(
      params.disabledClassName,
      params.activeClassName
    );
    evt.target.removeEventListener("animationend", onDisable);
  }
}

function setMenuListener() {
  document.body.addEventListener("click", (evt) => {
    const activeElements = document.querySelectorAll(
      `.${params.btnClassName}.${params.activeClassName}, .${params.dropClassName}.${params.activeClassName}`
    );

    if (
      activeElements.length &&
      !evt.target.closest(`.${params.activeClassName}`)
    ) {
      activeElements.forEach((current) => {
        if (current.classList.contains(params.btnClassName)) {
          current.classList.remove(params.activeClassName);
        } else {
          current.classList.add(params.disabledClassName);
        }
      });
    }

    if (evt.target.closest(`.${params.btnClassName}`)) {
      const btn = evt.target.closest(`.${params.btnClassName}`);
      const path = btn.dataset.path;
      const drop = document.querySelector(
        `.${params.dropClassName}[data-target="${path}"]`
      );

      btn.classList.toggle(params.activeClassName);

      if (!drop.classList.contains(params.activeClassName)) {
        drop.classList.add(params.activeClassName);
        drop.addEventListener("animationend", onDisable);
      } else {
        drop.classList.add(params.disabledClassName);
      }
    }
  });
}

setMenuListener();


document.addEventListener("DOMContentLoaded", function () {
  const selector = document.querySelector(".choices")

  const choices = new Choices(selector, {
    searchEnabled: false,
    classNames: {
      containerOuter: 'choices gallery__choices',
    },
  });

});


(() => {
  new Accordion(".js-accordion-container", {
    openOnInit: [0]
  });
})();


// Табы
const param = {
  tabsClass: "js-tab-btn",
  wrap: "js-tabs-wrap",
  content: "js-tab-content",
  active: "active"
};

function setTabs(param) {
  const tabBtns = document.querySelectorAll(`.${param.tabsClass}`);

  function onTabClick(e) {
    e.preventDefault();
    const path = this.dataset.path;
    const wrap = this.closest(`.${param.wrap}`);
    const currentContent = wrap.querySelector(`.${param.content}[data-target="${path}"]`);
    const contents = wrap.querySelectorAll(`.${param.content}`);

    contents.forEach((el) => {
      el.classList.remove(param.active);
    });

    currentContent.classList.add(param.active);
    
    tabBtns.forEach((el) => {
      el.classList.remove(param.active);
    });
    
    this.classList.add(param.active);
  }

  tabBtns.forEach(function (el) {
    el.addEventListener("click", onTabClick);
  });
}

setTabs(param);


ymaps.ready(init);
function init(){
    var myMap = new ymaps.Map("map", {
        center: [55.760563, 37.615295],
        zoom: 14,
        controls: ['smallMapDefaultSet']
        
    });
    var myPlacemark = new ymaps.Placemark([55.760563, 37.615295], {}, {
      iconLayout: 'default#image',
      iconImageHref: '/img/my-map.svg',
      iconImageSize: [20, 20],
      iconImageOffset: [-3, -42]
  });
  myMap.behaviors
  .disable(['drag','scrollZoom','rightMouseButtonMagnifier'])

  myMap.geoObjects.add(myPlacemark);
  }