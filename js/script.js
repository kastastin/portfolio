const hamburger = document.querySelector(".hamburger"),
  menu = document.querySelector(".menu"),
  closeBtn = document.querySelector(".menu__close"),
  menuOverlay = document.querySelector(".menu__overlay"),
  menuLink = document.querySelectorAll(".menu__link");

const changeMenuDisplay = () => menu.classList.toggle("active");

[hamburger, closeBtn, menuOverlay, ...menuLink].forEach((elem) =>
  elem.addEventListener("click", changeMenuDisplay)
);

// <-- Skills counter -->
const counters = document.querySelectorAll(".skills__ratings-counter"),
  lines = document.querySelectorAll(".skills__ratings-line span");

counters.forEach((item, i) => {
  lines[i].style.width = item.innerHTML;
});

// <-- Send form to Telegram -->
const form = document.querySelector(".contacts__form"),
  userName = document.querySelector("#name"),
  userEmail = document.querySelector("#email"),
  userText = document.querySelector("#text"),
  modal = document.querySelector(".modal");

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const chatId = "342013084";
  const botToken = "6618612381:AAHhdDR51mVS-NV3Jmhgn1UlW3nGp32mJVw";
  const text = `Portfolio Form:%0A%0AName: ${userName.value}%0AEmail: ${userEmail.value}%0AMessage: ${userText.value}`;

  const closeModal = () => {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
    form.reset();
  };

  const openModal = () => {
    setTimeout(closeModal, 5000);
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    modal.addEventListener("click", (e) => {
      if (!e.target.classList.contains("modal__box")) closeModal();
    });
  };

  fetch(
    `https://api.telegram.org/bot${botToken}/sendMessage?chat_id=${chatId}&text=${text}`
  )
    .then((response) => response.json())
    .then((data) => {
      if (data.ok) {
        openModal();
      } else {
        alert("Помилка відправлення повідомлення.");
      }
    });
});
