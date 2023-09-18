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
});
