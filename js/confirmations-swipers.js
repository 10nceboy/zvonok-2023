if (document.querySelector(".feature-slider")) {
  new Swiper(".feature-slider", {
    slidesPerView: 1.1,
    spaceBetween: 15,
    grabCursor: true,
    draggable: true,
    speed: 1000,
    loop: true,
    loopAdditionalSlides: 2,
    breakpoints: {
      450: {
        slidesPerView: 1.5,
      },
      720: {
        slidesPerView: 2.1,
        spaceBetween: 20,
      },
      960: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });
}
