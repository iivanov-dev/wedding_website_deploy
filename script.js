import { SCRIPT_URL } from "./config.js";

const form = document.getElementById("rsvpForm");
const submitBtn = document.getElementById("submitBtn");
const originalText = submitBtn.textContent;

form.addEventListener("submit", async (e) => {
  e.preventDefault();

  submitBtn.textContent = "Отправка...";
  submitBtn.disabled = true;

  const formData = new FormData(form);
  const data = {
    name: formData.get("name"),
    attendance: formData.get("attendance"),
    alcohol: formData.getAll("alcohol"),
  };

  try {
    await fetch(SCRIPT_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    submitBtn.textContent = "ОТПРАВЛЕНО!";
    form.reset();

    setTimeout(() => {
      submitBtn.textContent = originalText;
      submitBtn.disabled = false;
    }, 3000);
  } catch (error) {
    console.error("Ошибка!", error.message);
    submitBtn.textContent = "Ошибка, попробуйте снова";
    submitBtn.disabled = false;

    setTimeout(() => {
      submitBtn.textContent = originalText;
    }, 3000);
  }
});

document.addEventListener("DOMContentLoaded", () => {
  const observerOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.15,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  const sectionsToAnimate = document.querySelectorAll(
    ".polaroid-start, .event-date, .event-location, .event-timeline, .dress-code, .rsvp-title, .rsvp-form-wrapper, .organizers-contacts, .polaroid-end",
  );

  sectionsToAnimate.forEach((section) => {
    section.classList.add("fade-in-section");
    observer.observe(section);
  });
});
