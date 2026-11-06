(function () {
  "use strict";

  const toggle = document.querySelector(".nav-toggle");
  const menu = document.querySelector(".nav-menu");
  const menuLinks = menu ? menu.querySelectorAll("a") : [];

  function setMenu(open) {
    if (!toggle || !menu) return;
    toggle.setAttribute("aria-expanded", String(open));
    menu.classList.toggle("is-open", open);
    document.body.style.overflow = open ? "hidden" : "";
  }

  if (toggle && menu) {
    toggle.addEventListener("click", function () {
      setMenu(toggle.getAttribute("aria-expanded") !== "true");
    });

    menuLinks.forEach(function (link) {
      link.addEventListener("click", function () { setMenu(false); });
    });

    window.addEventListener("keydown", function (event) {
      if (event.key === "Escape") setMenu(false);
    });
  }

  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();

  const quizOptions = Array.from(document.querySelectorAll(".quiz-option"));
  const quizFeedback = document.getElementById("quiz-feedback");
  const quizReset = document.querySelector(".quiz-reset");
  const quizNext = document.querySelector(".quiz-next");
  const quizQuestion = document.getElementById("quiz-question");
  const quizProgress = document.getElementById("quiz-progress");

  const answerPhoto = document.getElementById("quiz-answer-photo");
  const answerImage = document.getElementById("quiz-answer-image");
  const answerCaption = document.getElementById("quiz-answer-caption");
  let photoRequest = 0;

  const quizQuestions = [
    {
      question: "Which architectural feature is the best match for a ceramic tile built around repeated rectangular lines?",
      choices: ["The building’s location on Escolta Street", "The repeated window grids", "The year 1968"],
      correct: 1,
      photo: { src: "assets/history/facade.webp", caption: "Repeated rectangular window grids on the First United Building façade.", source: "https://commons.wikimedia.org/wiki/File:First_United_Building.jpg", credit: "Fmgverzon · CC BY-SA 3.0" },
      success: "Correct — the building’s repeated rectangular window grids translate naturally into a modular ceramic tile pattern.",
      hint: "Not quite. Look for a visual feature that can repeat as a geometric pattern: the building’s window grids."
    },
    {
      question: "In what year was the Perez–Samanillo Building built?",
      choices: ["1928", "1945", "1968"],
      correct: 0,
      photo: { src: "assets/history/marker.webp", caption: "The NHCP marker records 1928 as the year the building was constructed.", source: "https://commons.wikimedia.org/wiki/File:Perez-Samanillo_Building_historical_marker.jpg", credit: "Zarate123, perspective corrected by Eugene Alvin Villar · CC BY-SA 4.0" },
      success: "Correct — the NHCP marker records that the building was built in 1928.",
      hint: "Not quite. The building was built and recognized as Manila’s most beautiful office building in 1928."
    },
    {
      question: "Who designed the Perez–Samanillo Building?",
      choices: ["Juan Nakpil", "Leandro Locsin", "Andrés Luna de San Pedro"],
      correct: 2,
      photo: { src: "assets/history/andres-luna-de-san-pedro.png", caption: "Portrait of Andrés Luna de San Pedro, architect of the Perez–Samanillo Building." },
      success: "Correct — architect Andrés Luna de San Pedro designed the building.",
      hint: "Not quite. The architect named on the NHCP marker is Andrés Luna de San Pedro."
    },
    {
      question: "What business later occupied the building’s ground floor?",
      choices: ["Berg’s Department Store", "A railway station", "The Manila Post Office"],
      correct: 0,
      photo: { src: "assets/history/escolta.webp", caption: "Archival view of the building on Escolta, where Berg’s later occupied the ground floor.", source: "https://firstunitedbuilding.com/history/", credit: "First United Building history page" },
      success: "Correct — Berg’s Department Store later operated on the ground floor.",
      hint: "Not quite. Berg’s Department Store was one of the building’s best-known commercial tenants."
    },
    {
      question: "What was the First United Building originally called?",
      choices: ["Calvo Building", "Perez–Samanillo Building", "Regina Building"],
      correct: 1,
      photo: { src: "assets/history/perez-samanillo-archival.png", caption: "Archival view of the Perez–Samanillo Building, now the First United Building." },
      success: "Correct — First United Building was originally known as the Perez–Samanillo Building.",
      hint: "Not quite. Its original name was the Perez–Samanillo Building."
    }
  ];
  let currentQuizQuestion = 0;

  function hideAnswerPhoto() {
    photoRequest += 1;
    if (!answerPhoto) return;
    answerPhoto.hidden = true;
    answerImage.replaceChildren();
    answerCaption.replaceChildren();
  }

  function showAnswerPhoto(photo) {
    if (!answerPhoto || !photo) return;
    const request = ++photoRequest;
    const image = new Image();
    image.alt = photo.caption;
    image.onload = function () {
      if (request !== photoRequest) return;
      answerCaption.textContent = photo.caption;
      if (photo.source && photo.credit) {
        const credit = document.createElement("a");
        credit.href = photo.source;
        credit.textContent = photo.credit;
        const attribution = document.createElement("span");
        attribution.append(credit);
        if (photo.credit.includes("CC BY-SA")) {
          const license = document.createElement("a");
          const version = photo.credit.endsWith("3.0") ? "3.0" : "4.0";
          license.href = "https://creativecommons.org/licenses/by-sa/" + version + "/";
          license.textContent = "license";
          attribution.append(" · ", license, " · Resized");
        }
        answerCaption.append(attribution);
      }
      answerImage.replaceChildren(image);
      answerPhoto.hidden = false;
    };
    image.src = photo.src;
  }

  function renderQuiz() {
    hideAnswerPhoto();
    const item = quizQuestions[currentQuizQuestion];
    if (!item || !quizQuestion) return;
    quizQuestion.textContent = item.question;
    if (quizProgress) quizProgress.textContent = "Question " + (currentQuizQuestion + 1) + " of " + quizQuestions.length;
    quizOptions.forEach(function (option, index) {
      const label = option.querySelector("span");
      if (label) label.textContent = item.choices[index];
      option.disabled = false;
      option.classList.remove("is-correct", "is-wrong");
      option.removeAttribute("aria-pressed");
    });
    if (quizFeedback) quizFeedback.textContent = "Choose an answer to reveal the story.";
    if (quizNext) {
      quizNext.disabled = true;
      quizNext.firstChild.textContent = currentQuizQuestion === quizQuestions.length - 1 ? "Back to first " : "Next question ";
    }
  }

  function resetQuiz() {
    currentQuizQuestion = 0;
    renderQuiz();
  }

  quizOptions.forEach(function (option) {
    option.addEventListener("click", function () {
      const item = quizQuestions[currentQuizQuestion];
      const selected = Number(option.dataset.choice);
      const isCorrect = selected === item.correct;
      quizOptions.forEach(function (answer, index) {
        answer.disabled = true;
        answer.setAttribute("aria-pressed", String(answer === option));
        if (index === item.correct) answer.classList.add("is-correct");
      });
      if (!isCorrect) option.classList.add("is-wrong");
      if (quizFeedback) {
        quizFeedback.textContent = isCorrect ? item.success : item.hint;
      }
      if (isCorrect) showAnswerPhoto(item.photo);
      if (quizNext) quizNext.disabled = false;
    });
  });

  if (quizReset) quizReset.addEventListener("click", resetQuiz);
  if (quizNext) {
    quizNext.addEventListener("click", function () {
      currentQuizQuestion = (currentQuizQuestion + 1) % quizQuestions.length;
      renderQuiz();
    });
  }
  renderQuiz();

  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    const observer = new IntersectionObserver(function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12 });
    revealItems.forEach(function (item) { observer.observe(item); });
  } else {
    revealItems.forEach(function (item) { item.classList.add("is-visible"); });
  }
})();
