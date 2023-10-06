document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector("[data-box-item]")) {
    let lists = document.querySelectorAll(".mass-call-steps-list");
    lists.forEach((el) => {
      let list = el.closest(".mass-call-steps-list");
      let links = list.querySelectorAll("li[data-box]");
      links.forEach((el) => {
        el.addEventListener("click", function (evt) {
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

  const cabinetRegisterUrl = "https://zvonok.com/manager/users/add/?country=ru";
});
