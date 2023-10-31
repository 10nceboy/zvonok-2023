document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".tabs")) {
    let lists = document.querySelectorAll(".tabs-list");
    lists.forEach((el) => {
      let list = el.closest(".tabs-list");
      let links = list.querySelectorAll("li[data-box]");
      links.forEach((el) => {
        el.addEventListener("mouseover", function (evt) {
          document
            .querySelectorAll(`li`)
            .forEach((link) => link.classList.remove("active"));
          el.classList.add("active");
          let box = el.closest(".steps-js").querySelectorAll("[data-box-item]");
          let attr = evt.currentTarget.dataset.box;
          box.forEach((pic) => pic.classList.remove("visible", "d-block"));
          document
            .querySelector(`[data-box-item="${attr}"]`)
            .classList.add("visible", "d-block");
        });
      });
    });
  }
});
