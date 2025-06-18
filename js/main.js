const popupForm = document.querySelector(".div__popup-form");
const sectionForm = document.querySelector(".section-form");
const body = document.querySelector("body");

// Задаем секунду, на которой показывается форма
const timing = 1031;

let video = document.querySelector("video");
let flagFormTimeUpdate = false;

if (video) {
  console.log("video найден при загрузке:", video);
  setupVideoEvents(video);
} else {
  const observer = new MutationObserver((mutationsList) => {
    mutationsList.forEach((mutation) => {
      if (mutation.type === "childList") {
        mutation.addedNodes.forEach((node) => {
          if (node.tagName === "VIDEO") {
            console.log("video было добавлено:", node);
            video = node;
            setupVideoEvents(video);
            observer.disconnect(); // Останавливаем наблюдатель
          }
        });
      }
    });
  });

  observer.observe(document.body, { childList: true, subtree: true });
}

function setupVideoEvents(video) {
  video.addEventListener("ended", () => {
    sectionForm.classList.remove("none");
    popupForm.classList.remove("none");
    body.style.overflow = "hidden";

    const btnClose = document.querySelector(".popup-form__btn-close");
    btnClose.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      popupForm.classList.add("none");
      body.style.overflow = "auto";
    });

    popupForm.addEventListener("click", (e) => {
      if (e.target.classList.contains("div__popup-form")) {
        popupForm.classList.add("none");
        body.style.overflow = "auto";
      }
    });
  });

  // video.addEventListener("timeupdate", () => {
  //    const timeVideo = Math.floor(video.currentTime);
  //    if (timeVideo > timing && !flagFormTimeUpdate) {
  //       sectionForm.classList.remove("none");
  //       flagFormTimeUpdate = true;
  //    }
  // });
}

const coments = Array.from(document.querySelectorAll(".coment"));
const placeComent = document.querySelector(".place-coment");

// function showComent() {
//   coments.forEach((elem) => {
//     elem.style.display = "none";
//   });

//   placeComent.style.flexDirection = "column-reverse";

//   let timeShow = 3000;
//   coments.forEach((elem) => {
//     setTimeout(() => {
//       elem.style.display = "flex";
//       elem.classList.add("animate-show");
//       setTimeout(() => {
//         elem.classList.remove("animate-show");
//       }, 300);
//     }, timeShow);
//     timeShow = timeShow + 3000;
//   });
// }

// showComent();

// Функция для форматирования даты
// function formatDate(date) {
//   const day = date.getDate().toString().padStart(2, "0");
//   const month = (date.getMonth() + 1).toString().padStart(2, "0");
//   const year = date.getFullYear().toString();
//   return `${day}/${month}/${year}`;
// }

// const currentDate = new Date();
// document.querySelectorAll(".date-now").forEach((element) => {
//   element.textContent = formatDate(currentDate);
// });
