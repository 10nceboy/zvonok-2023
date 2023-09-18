document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".audio").forEach((audioz) => {
    audioz.addEventListener("timeupdate", (event) => {
      let orangeBar = event.currentTarget
        .closest(".redial-player-wrapper")
        .querySelector("#p-orange");

      let grayBar = event.currentTarget
        .closest(".redial-player-wrapper")
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
        .closest(".redial-player-wrapper-mobile")
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
      .closest(".redial-player-wrapper")
      .querySelector("audio");

    const rect = timeline.getBoundingClientRect();
    const x = clientX - rect.left;
    const pcent = Math.floor((x / rect.width) * 100);
    const to = (audioa.duration * pcent) / 100;

    audioa.currentTime = to;
  };

  document
    .querySelectorAll(".redial-player-progressbar")
    .forEach((timeline) => {
      timeline.addEventListener("click", handleTimeLineClick);
    });

  document.querySelectorAll(".wave-wrapper").forEach((timeline) => {
    timeline.addEventListener("click", handleTimeLineClick);
  });
});
