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

  const quizOptions = document.querySelectorAll(".quiz-option");
  const quizFeedback = document.getElementById("quiz-feedback");
  const quizReset = document.querySelector(".quiz-reset");

  function resetQuiz() {
    quizOptions.forEach(function (option) {
      option.disabled = false;
      option.classList.remove("is-correct", "is-wrong");
      option.removeAttribute("aria-pressed");
    });
    if (quizFeedback) quizFeedback.textContent = "Choose an answer to see how architecture can become a clay pattern.";
  }

  quizOptions.forEach(function (option) {
    option.addEventListener("click", function () {
      const isCorrect = option.dataset.answer === "windows";
      quizOptions.forEach(function (answer) {
        answer.disabled = true;
        answer.setAttribute("aria-pressed", String(answer === option));
      });
      option.classList.add(isCorrect ? "is-correct" : "is-wrong");
      if (quizFeedback) {
        quizFeedback.textContent = isCorrect
          ? "Correct — the building’s repeated rectangular window grids translate naturally into a modular ceramic tile pattern."
          : "Not quite. Look for a visual feature that can repeat as a geometric pattern: the building’s window grids."
      }
    });
  });

  if (quizReset) quizReset.addEventListener("click", resetQuiz);

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
