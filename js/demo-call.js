// Demo call player
document.addEventListener("DOMContentLoaded", () => {
  if (document.querySelector(".conversation")) {
    let audio;
    let played = false;

    const tabs = document.querySelector(".conversation-tabs");
    const tabButton = document.querySelectorAll(".conversation-tabs-btn");
    const contents = document.querySelectorAll(".conversation-slide");
    const btnPrev = document.querySelector(".conversation-prev");
    const btnNext = document.querySelector(".conversation-next");

    let tabsCount = tabs?.children.length - 1;
    let currentTab = 0;

    // Changes Fn
    function changeTab(id) {
      if (document.querySelector(`[data-tab='${id}']`)) {
        tabButton.forEach((tab) => {
          tab.classList.remove("active");
        });
        document.querySelector(`[data-tab='${id}']`).classList.add("active");
        document.querySelector(`[data-tab='${id}']`).classList.remove("hidden");
      }
    }

    function changeSlide(id) {
      if (document.querySelector(`.slide-${id}`)) {
        contents.forEach((content) => {
          content.classList.remove("active");
          content.classList.add("hidden");
        });
        document.querySelector(`.slide-${id}`).classList.remove("hidden");
        document.querySelector(`.slide-${id}`).classList.add("active");
      }
    }

    function checkAvailability(element) {
      if (!element) return;

      if (currentTab === 0 && currentTab !== tabsCount) {
        btnNext.classList.remove("disabled");
        btnPrev.classList.add("disabled");
      } else if (currentTab === tabsCount && currentTab !== 0) {
        btnPrev.classList.remove("disabled");
        btnNext.classList.add("disabled");
      } else {
        btnPrev.classList.remove("disabled");
        btnNext.classList.remove("disabled");
      }
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

    function startAnimation(target) {
      let dialog = target.dataset.player;
      let path = `[data-dialog=${dialog}] > div > .conversation-bubble`;

      document.querySelectorAll(path).forEach((el) => {
        el.style.animationDelay = el.dataset.delay;
        el.style.webkitAnimationPlayState = "running";
        el.classList.add("animation-running");
      });
    }

    function stopAudio() {
      played = false;
      document.querySelectorAll("audio").forEach((elm) => {
        elm.pause();
        elm.currentTime = 0;
      });
    }

    // Slide change events
    btnPrev?.addEventListener("click", function () {
      if (currentTab !== 0 && currentTab > 0) {
        currentTab--;
        changeTab(currentTab);
        changeSlide(currentTab);
        checkAvailability();
        stopAnimation();
        stopAudio();
        if (audio !== undefined) {
          audio.pause();
        }
      }
    });

    btnNext?.addEventListener("click", function () {
      if (currentTab !== tabsCount && currentTab < tabsCount) {
        currentTab++;
        changeTab(currentTab);
        changeSlide(currentTab);
        checkAvailability();
        stopAnimation();
        stopAudio();
        if (audio !== undefined) {
          audio.pause();
        }
      }
    });

    if (tabs) {
      // Tabs changing
      tabs.onclick = (e) => {
        stopAnimation();
        stopAudio();

        const id = e.target.dataset.id;
        if (id) {
          currentTab = parseInt(e.target.dataset.tab);
          checkAvailability();

          tabButton.forEach((btn) => {
            btn.classList.remove("active");
          });
          e.target.classList.add("active");
          e.target.classList.remove("hidden");

          contents.forEach((content) => {
            content.classList.remove("active");
            content.classList.add("hidden");
          });
          const element = document.getElementById(id);
          element.classList.add("active");
          element.classList.remove("hidden");
        }
      };
    }

    // Click on audio start btn
    let startBtn = document.querySelectorAll(".conversation-player");
    startBtn.forEach((elm) => {
      elm.addEventListener("click", (evt) => {
        let audio = evt.currentTarget.previousElementSibling;

        if (audio.paused) {
          audio.play();
        } else {
          played = false;
          audio.pause();
          audio.currentTime = 0;
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
        startAnimation(
          evt.currentTarget.closest("div").querySelector("button")
        );
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
            el.currentTime = 0;
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

    checkAvailability(tabs);
  }
});
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJkZW1vLWNhbGwuanMiXSwic291cmNlc0NvbnRlbnQiOlsiLy8gRGVtbyBjYWxsIHBsYXllclxuZG9jdW1lbnQuYWRkRXZlbnRMaXN0ZW5lcignRE9NQ29udGVudExvYWRlZCcsICgpID0+IHtcbiAgICBpZiAoZG9jdW1lbnQucXVlcnlTZWxlY3RvcihcIi5jb252ZXJzYXRpb25cIikpIHtcbiAgICAgICAgbGV0IGF1ZGlvO1xuICAgICAgICBsZXQgcGxheWVkICA9IGZhbHNlO1xuXG4gICAgICAgIGNvbnN0IHRhYnMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKFwiLmNvbnZlcnNhdGlvbi10YWJzXCIpO1xuICAgICAgICBjb25zdCB0YWJCdXR0b24gPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbnZlcnNhdGlvbi10YWJzLWJ0blwiKTtcbiAgICAgICAgY29uc3QgY29udGVudHMgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKFwiLmNvbnZlcnNhdGlvbi1zbGlkZVwiKTtcblxuICAgICAgICBjb25zdCBidG5QcmV2ID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvcignLmNvbnZlcnNhdGlvbi1wcmV2Jyk7XG4gICAgICAgIGNvbnN0IGJ0bk5leHQgPSBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKCcuY29udmVyc2F0aW9uLW5leHQnKTtcblxuICAgICAgICBsZXQgdGFic0NvdW50ID0gdGFicy5jaGlsZHJlbi5sZW5ndGggLSAxO1xuICAgICAgICBsZXQgY3VycmVudFRhYiA9IDA7XG5cblxuICAgICAgICAvLyBDaGFuZ2VzIEZuXG4gICAgICAgIGZ1bmN0aW9uIGNoYW5nZVRhYihpZCkge1xuICAgICAgICAgICAgaWYgKGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYFtkYXRhLXRhYj0nJHtpZH0nXWApKSB7XG4gICAgICAgICAgICAgICAgdGFiQnV0dG9uLmZvckVhY2godGFiID0+IHtcbiAgICAgICAgICAgICAgICAgICAgdGFiLmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgW2RhdGEtdGFiPScke2lkfSddYCkuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS10YWI9JyR7aWR9J11gKS5jbGFzc0xpc3QucmVtb3ZlKFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gY2hhbmdlU2xpZGUoaWQpIHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGAuc2xpZGUtJHtpZH1gKSkge1xuICAgICAgICAgICAgICAgIGNvbnRlbnRzLmZvckVhY2goY29udGVudCA9PiB7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICAgICAgY29udGVudC5jbGFzc0xpc3QuYWRkKFwiaGlkZGVuXCIpO1xuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3IoYC5zbGlkZS0ke2lkfWApLmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvcihgLnNsaWRlLSR7aWR9YCkuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIGNoZWNrQXZhaWxhYmlsaXR5KCkge1xuICAgICAgICAgICAgaWYgKGN1cnJlbnRUYWIgPT09IDAgJiYgY3VycmVudFRhYiAhPT0gdGFic0NvdW50KSB7XG4gICAgICAgICAgICAgICAgYnRuTmV4dC5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgICAgIGJ0blByZXYuY2xhc3NMaXN0LmFkZCgnZGlzYWJsZWQnKTtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoY3VycmVudFRhYiA9PT0gdGFic0NvdW50ICYmIGN1cnJlbnRUYWIgIT09IDApIHtcbiAgICAgICAgICAgICAgICBidG5QcmV2LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgYnRuTmV4dC5jbGFzc0xpc3QuYWRkKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBidG5QcmV2LmNsYXNzTGlzdC5yZW1vdmUoJ2Rpc2FibGVkJyk7XG4gICAgICAgICAgICAgICAgYnRuTmV4dC5jbGFzc0xpc3QucmVtb3ZlKCdkaXNhYmxlZCcpO1xuICAgICAgICAgICAgfVxuICAgICAgICB9XG5cbiAgICAgICAgZnVuY3Rpb24gc3RvcEFuaW1hdGlvbigpIHtcbiAgICAgICAgICAgIGlmIChkb2N1bWVudC5xdWVyeVNlbGVjdG9yKGBbZGF0YS1hdWRpb10uYWN0aXZlYCkpIHtcbiAgICAgICAgICAgICAgICBwbGF5ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICBkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKGBbZGF0YS1kaWFsb2ddID4gZGl2ID4gLmNvbnZlcnNhdGlvbi1idWJibGVgKS5mb3JFYWNoKGZ1bmN0aW9uIChlbCkge1xuICAgICAgICAgICAgICAgICAgICBlbC5zdHlsZS53ZWJraXRBbmltYXRpb25QbGF5U3RhdGUgPSAncGF1c2VkJztcbiAgICAgICAgICAgICAgICAgICAgZWwuY2xhc3NMaXN0LnJlbW92ZSgnYW5pbWF0aW9uLXJ1bm5pbmcnKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHN0YXJ0QW5pbWF0aW9uKHRhcmdldCkge1xuICAgICAgICAgICAgbGV0IGRpYWxvZyA9IHRhcmdldC5kYXRhc2V0LnBsYXllcjtcbiAgICAgICAgICAgIGxldCBwYXRoICAgPSBgW2RhdGEtZGlhbG9nPSR7ZGlhbG9nfV0gPiBkaXYgPiAuY29udmVyc2F0aW9uLWJ1YmJsZWA7XG5cbiAgICAgICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwocGF0aCkuZm9yRWFjaCgoZWwpID0+IHtcbiAgICAgICAgICAgICAgICBlbC5zdHlsZS5hbmltYXRpb25EZWxheSA9IGVsLmRhdGFzZXQuZGVsYXk7XG4gICAgICAgICAgICAgICAgZWwuc3R5bGUud2Via2l0QW5pbWF0aW9uUGxheVN0YXRlID0gJ3J1bm5pbmcnO1xuICAgICAgICAgICAgICAgIGVsLmNsYXNzTGlzdC5hZGQoJ2FuaW1hdGlvbi1ydW5uaW5nJyk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuXG4gICAgICAgIGZ1bmN0aW9uIHN0b3BBdWRpbygpIHtcbiAgICAgICAgICAgIHBsYXllZCA9IGZhbHNlO1xuICAgICAgICAgICAgZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnYXVkaW8nKS5mb3JFYWNoKChlbG0pID0+IHtcbiAgICAgICAgICAgICAgICBlbG0ucGF1c2UoKTtcbiAgICAgICAgICAgICAgICBlbG0uY3VycmVudFRpbWUgPSAwO1xuICAgICAgICAgICAgfSk7XG4gICAgICAgIH1cblxuXG4gICAgICAgIC8vIFNsaWRlIGNoYW5nZSBldmVudHNcbiAgICAgICAgYnRuUHJldi5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50VGFiICE9PSAwICYmIGN1cnJlbnRUYWIgPiAwKSB7XG4gICAgICAgICAgICAgICAgY3VycmVudFRhYi0tO1xuICAgICAgICAgICAgICAgIGNoYW5nZVRhYihjdXJyZW50VGFiKTtcbiAgICAgICAgICAgICAgICBjaGFuZ2VTbGlkZShjdXJyZW50VGFiKTtcbiAgICAgICAgICAgICAgICBjaGVja0F2YWlsYWJpbGl0eSgpO1xuICAgICAgICAgICAgICAgIHN0b3BBbmltYXRpb24oKTtcbiAgICAgICAgICAgICAgICBzdG9wQXVkaW8oKTtcbiAgICAgICAgICAgICAgICBpZiAoYXVkaW8gIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgICAgICAgICBhdWRpby5wYXVzZSgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgfSk7XG5cbiAgICAgICAgYnRuTmV4dC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsIGZ1bmN0aW9uICgpIHtcbiAgICAgICAgICAgIGlmIChjdXJyZW50VGFiICE9PSB0YWJzQ291bnQgJiYgY3VycmVudFRhYiA8IHRhYnNDb3VudCkge1xuICAgICAgICAgICAgICAgIGN1cnJlbnRUYWIrKztcbiAgICAgICAgICAgICAgICBjaGFuZ2VUYWIoY3VycmVudFRhYik7XG4gICAgICAgICAgICAgICAgY2hhbmdlU2xpZGUoY3VycmVudFRhYik7XG4gICAgICAgICAgICAgICAgY2hlY2tBdmFpbGFiaWxpdHkoKTtcbiAgICAgICAgICAgICAgICBzdG9wQW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgc3RvcEF1ZGlvKCk7XG4gICAgICAgICAgICAgICAgaWYgKGF1ZGlvICE9PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICAgICAgICAgICAgYXVkaW8ucGF1c2UoKTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuXG4gICAgICAgIC8vIFRhYnMgY2hhbmdpbmdcbiAgICAgICAgdGFicy5vbmNsaWNrID0gKGUpID0+IHtcbiAgICAgICAgICAgIHN0b3BBbmltYXRpb24oKTtcbiAgICAgICAgICAgIHN0b3BBdWRpbygpO1xuXG4gICAgICAgICAgICBjb25zdCBpZCA9IGUudGFyZ2V0LmRhdGFzZXQuaWQ7XG4gICAgICAgICAgICBpZiAoaWQpIHtcbiAgICAgICAgICAgICAgICBjdXJyZW50VGFiID0gcGFyc2VJbnQoZS50YXJnZXQuZGF0YXNldC50YWIpO1xuICAgICAgICAgICAgICAgIGNoZWNrQXZhaWxhYmlsaXR5KCk7XG5cbiAgICAgICAgICAgICAgICB0YWJCdXR0b24uZm9yRWFjaChidG4gPT4ge1xuICAgICAgICAgICAgICAgICAgICBidG4uY2xhc3NMaXN0LnJlbW92ZShcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBlLnRhcmdldC5jbGFzc0xpc3QuYWRkKFwiYWN0aXZlXCIpO1xuICAgICAgICAgICAgICAgIGUudGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG5cbiAgICAgICAgICAgICAgICBjb250ZW50cy5mb3JFYWNoKGNvbnRlbnQgPT4ge1xuICAgICAgICAgICAgICAgICAgICBjb250ZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJhY3RpdmVcIik7XG4gICAgICAgICAgICAgICAgICAgIGNvbnRlbnQuY2xhc3NMaXN0LmFkZChcImhpZGRlblwiKTtcbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICBjb25zdCBlbGVtZW50ID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoaWQpO1xuICAgICAgICAgICAgICAgIGVsZW1lbnQuY2xhc3NMaXN0LmFkZChcImFjdGl2ZVwiKTtcbiAgICAgICAgICAgICAgICBlbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoXCJoaWRkZW5cIik7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICAvLyBDbGljayBvbiBhdWRpbyBzdGFydCBidG5cbiAgICAgICAgbGV0IHN0YXJ0QnRuID0gZG9jdW1lbnQucXVlcnlTZWxlY3RvckFsbCgnLmNvbnZlcnNhdGlvbi1wbGF5ZXInKTtcbiAgICAgICAgc3RhcnRCdG4uZm9yRWFjaCgoZWxtKSA9PiB7XG4gICAgICAgICAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgbGV0IGF1ZGlvICA9IGV2dC5jdXJyZW50VGFyZ2V0LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7XG5cbiAgICAgICAgICAgICAgICBpZiAoYXVkaW8ucGF1c2VkKSB7XG4gICAgICAgICAgICAgICAgICAgIGF1ZGlvLnBsYXkoKTtcbiAgICAgICAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgICAgICAgICBwbGF5ZWQgPSBmYWxzZTtcbiAgICAgICAgICAgICAgICAgICAgYXVkaW8ucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAgICAgYXVkaW8uY3VycmVudFRpbWUgPSAwO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pXG4gICAgICAgIH0pO1xuXG5cbiAgICAgICAgLy8gRXZlbnRzXG4gICAgICAgIGRvY3VtZW50LnF1ZXJ5U2VsZWN0b3JBbGwoJ2F1ZGlvW2RhdGEtYXVkaW9dJykuZm9yRWFjaCgoZWxtKSA9PiB7XG4gICAgICAgICAgICBlbG0uYWRkRXZlbnRMaXN0ZW5lcignZW5kZWQnLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgc3RvcEFuaW1hdGlvbigpO1xuICAgICAgICAgICAgICAgIGV2dC5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5yZW1vdmUoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIHBsYXllZCA9IGZhbHNlO1xuICAgICAgICAgICAgfSk7XG5cbiAgICAgICAgICAgIGVsbS5hZGRFdmVudExpc3RlbmVyKCdwYXVzZScsIChldnQpID0+IHtcbiAgICAgICAgICAgICAgICBzdG9wQW5pbWF0aW9uKCk7XG4gICAgICAgICAgICAgICAgZXZ0LmN1cnJlbnRUYXJnZXQuY2xhc3NMaXN0LnJlbW92ZSgnYWN0aXZlJyk7XG4gICAgICAgICAgICAgICAgcGxheWVkID0gZmFsc2U7XG4gICAgICAgICAgICB9KTtcblxuICAgICAgICAgICAgZWxtLmFkZEV2ZW50TGlzdGVuZXIoJ3BsYXlpbmcnLCAoZXZ0KSA9PiB7XG4gICAgICAgICAgICAgICAgc3RhcnRBbmltYXRpb24oZXZ0LmN1cnJlbnRUYXJnZXQuY2xvc2VzdCgnZGl2JykucXVlcnlTZWxlY3RvcignYnV0dG9uJykpO1xuICAgICAgICAgICAgICAgIGV2dC5jdXJyZW50VGFyZ2V0LmNsYXNzTGlzdC5hZGQoJ2FjdGl2ZScpO1xuICAgICAgICAgICAgICAgIHBsYXllZCA9IHRydWU7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfSk7XG5cblxuICAgICAgICAvLyBSZXNldCBhbGwgYXVkaW8gZWxlbWVudHNcbiAgICAgICAgY29uc3QgYXVkaW9zID0gQXJyYXkuZnJvbShkb2N1bWVudC5xdWVyeVNlbGVjdG9yQWxsKCdhdWRpbycpKTtcbiAgICAgICAgbGV0IHBsYXlpbmcgPSBmYWxzZTtcblxuICAgICAgICBhdWRpb3MuZm9yRWFjaChhdWRpbyA9PiB7XG4gICAgICAgICAgICBhdWRpby5hZGRFdmVudExpc3RlbmVyKCdwbGF5JywgZnVuY3Rpb24oZXZ0KSB7XG4gICAgICAgICAgICAgICAgaWYgKHBsYXlpbmcpIHtcbiAgICAgICAgICAgICAgICAgICAgYXVkaW9zLmZvckVhY2goZWwgPT4ge1xuICAgICAgICAgICAgICAgICAgICAgICAgZWwucGF1c2UoKTtcbiAgICAgICAgICAgICAgICAgICAgICAgIGVsLmN1cnJlbnRUaW1lID0gMDtcbiAgICAgICAgICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgICAgIGlmICh0aGlzLnBhdXNlZCkge1xuICAgICAgICAgICAgICAgICAgICBwbGF5aW5nID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgICAgIHRoaXMucGxheSgpO1xuICAgICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgICAgIHBsYXlpbmcgPSB0cnVlO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0pO1xuICAgICAgICB9KTtcblxuICAgICAgICBjaGVja0F2YWlsYWJpbGl0eSgpO1xuICAgIH1cbn0pOyJdLCJmaWxlIjoiZGVtby1jYWxsLmpzIn0=
