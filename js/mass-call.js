document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("[data-box-item]")) {
    let lists = document.querySelectorAll(".advantages-list");
    lists.forEach((el) => {
      let list = el.closest(".advantages-list");
      let links = list.querySelectorAll("li[data-box]");
      links.forEach((el) => {
        el.addEventListener("mouseover", function (evt) {
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

  const cabinetRegisterUrl = "https://zvonok.com/manager/users/add/?country=ru";
});
