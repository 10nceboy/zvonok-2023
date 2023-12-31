document.addEventListener("DOMContentLoaded", () => {
  let audio;
  let played = false;

  function startAnimation(target) {
    let dialog = target.dataset.player;
    let path = `[data-dialog=${dialog}] > div > .conversation-bubble`;

    document.querySelectorAll(path).forEach((el) => {
      el.style.animationDelay = el.dataset.delay;
      el.style.webkitAnimationPlayState = "running";
      el.classList.add("animation-running");
    });
  }

  function stopAnimation() {
    if (document.querySelector(`[data-audio].active`)) {
      played = false;
      document
        .querySelectorAll(`[data-dialog] > div > .conversation-bubble`)
        .forEach(function (el) {
          el.style.webkitAnimationPlayState = "paused";
          el.classList.remove("animation-running");
        });
    }
  }

  let startBtn = document.querySelectorAll(".conversation-player");
  startBtn.forEach((elm) => {
    elm.addEventListener("click", (evt) => {
      let audio = evt.currentTarget.previousElementSibling;

      if (audio.paused) {
        audio.play();
      } else {
        played = false;
        audio.pause();
      }
    });
  });

  // Events
  document.querySelectorAll("audio[data-audio]").forEach((elm) => {
    elm.addEventListener("ended", (evt) => {
      stopAnimation();
      evt.currentTarget.classList.remove("active");
      played = false;
    });

    elm.addEventListener("pause", (evt) => {
      stopAnimation();
      evt.currentTarget.classList.remove("active");
      played = false;
    });

    elm.addEventListener("playing", (evt) => {
      startAnimation(evt.currentTarget.closest("div").querySelector("button"));
      evt.currentTarget.classList.add("active");
      played = true;
    });
  });

  // Reset all audio elements
  const audios = Array.from(document.querySelectorAll("audio"));
  let playing = false;

  audios.forEach((audio) => {
    audio.addEventListener("play", function (evt) {
      if (playing) {
        audios.forEach((el) => {
          el.pause();
        });
      }
      if (this.paused) {
        playing = false;
        this.play();
      } else {
        playing = true;
      }
    });
  });

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
});
