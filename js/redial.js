document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".audio").forEach((audioz) => {
    audioz.addEventListener("timeupdate", (event) => {
      let orangeBar = event.currentTarget
        .closest(".auto-calls-player-wrapper")
        .querySelector("#p-orange");

      let grayBar = event.currentTarget
        .closest(".auto-calls-player-wrapper")
        .querySelector("#p-gray");

      let perzent =
        Math.floor((audioz.currentTime / audioz.duration) * 100) / 2;
      let remain = Math.floor(100 - perzent);

      if (!isNaN(perzent)) {
        orangeBar.setAttribute("offset", `${perzent}%`);
        grayBar.setAttribute("offset", `${remain}%`);
      }

      if (perzent == 50) {
        orangeBar.setAttribute("offset", "0%");
        grayBar.setAttribute("offset", `100%`);
      }
    });
  });

  document.querySelectorAll(".audio-mobile").forEach((audiom) => {
    audiom.addEventListener("timeupdate", (event) => {
      let orangeMobileBar = event.currentTarget
        .closest(".auto-calls-player-wrapper-mobile")
        .querySelector(".wave-orange");

      let percent = Math.floor((audiom.currentTime / audiom.duration) * 100);

      orangeMobileBar.style.width = `${percent}%`;

      if (percent == 100) {
        orangeMobileBar.style.width = "0%";
      }
    });
  });

  const handleTimeLineClick = (event) => {
    const { target: timeline, clientX } = event;
    const audioa = timeline
      .closest(".auto-calls-player-wrapper")
      .querySelector("audio");

    const rect = timeline.getBoundingClientRect();
    const x = clientX - rect.left;
    const pcent = Math.floor((x / rect.width) * 100);
    const to = (audioa.duration * pcent) / 100;

    audioa.currentTime = to;
  };

  document
    .querySelectorAll(".auto-calls-player-progressbar")
    .forEach((timeline) => {
      timeline.addEventListener("click", handleTimeLineClick);
    });

  document.querySelectorAll(".wave-wrapper").forEach((timeline) => {
    timeline.addEventListener("click", handleTimeLineClick);
  });

  if (document.querySelector(".players-slider")) {
    let advantagesSlider2 = new Swiper(".players-slider", {
      slidesPerView: 1.1,
      spaceBetween: 15,
      grabCursor: true,
      draggable: false,
      speed: 5000,
      loopAdditionalSlides: 5,
      onlyExternal: true,
      noSwipingSelector: "button",
      loop: true,
      watchSlidesProgress: true,
      focusableElements: "button",
      breakpoints: {
        450: {
          slidesPerView: 1.5,
        },
        720: {
          slidesPerView: 1.5,
          spaceBetween: 20,
        },
        960: {
          slidesPerView: 3,
          spaceBetween: 30,
        },
      },
    });
  }

  document.querySelector(".players-slider").addEventListener("click", (e) => {
    e.stopPropagation();
  });

  function cabinetRegisterRedirect(e) {
    let phone = e["phone"].value.replace("(", "").replace(")", "");
    window.location.href = cabinetRegisterUrl + "&" + "phone=" + phone;
  }

  cabinetRegisterUrl = "https://zvonok.com/manager/users/add/?country=ru";
});
