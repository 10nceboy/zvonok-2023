document.addEventListener("DOMContentLoaded", () => {
  cabinetRegisterUrl = "https://zvonok.com/manager/users/add/?country=ru";
});

if (document.querySelector(".reviews-swiper")) {
  let paginationEl = document.querySelector(".slider-pagination-review");
  let reviewSlider = new Swiper(".reviews-swiper", {
    slidesPerView: 1,
    spaceBetween: 15,
    navigation: {
      nextEl: ".review-swiper-button-next",
      prevEl: ".review-swiper-button-prev",
    },
    pagination: {
      el: paginationEl,
      type: "bullets",
      clickable: true,
    },
    grabCursor: true,
    draggable: true,
    breakpoints: {
      768: {
        slidesPerView: 2,
        spaceBetween: 20,
      },
      960: {
        slidesPerView: 3,
        spaceBetween: 10,
      },
      1200: {
        slidesPerView: 3,
        spaceBetween: 30,
      },
      1400: {
        pagination: false,
        slidesPerView: 3,
        spaceBetween: 30,
      },
    },
  });

  $(window).on("resize", function () {
    let ww = $(window).width();
    if (ww >= 1400) reviewSlider.update();
  });
  $(window).trigger("resize");
}
