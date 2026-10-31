document.addEventListener("DOMContentLoaded", () => {
  // --- 1. Accordion Logic ---
  const accordionToggles = document.querySelectorAll(".accordion-toggle");

  accordionToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const accordion = toggle.closest(".pride-accordion");
      const content = accordion.querySelector(".accordion-content");
      const icon = toggle.querySelector(".accordion-icon");
      const isCollapsed = content.classList.contains("collapsed");

      if (isCollapsed) {
        content.classList.remove("collapsed");
        icon.textContent = "×";
        toggle.setAttribute("aria-expanded", "true");
      } else {
        content.classList.add("collapsed");
        icon.textContent = "+";
        toggle.setAttribute("aria-expanded", "false");
      }
    });
  });

  // --- 2. Lightbox Logic ---
  const lightbox = document.querySelector(".pride-lightbox");
  const lightboxImg = lightbox.querySelector(".pride-lightbox-image");
  const lightboxTitle = lightbox.querySelector(".pride-lightbox-title");
  const lightboxCaption = lightbox.querySelector(
    ".pride-lightbox-caption-text",
  );
  const closeBtn = lightbox.querySelector(".pride-lightbox-close");
  const imageButtons = document.querySelectorAll(".pride-image-button");

  // Open Lightbox
  imageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const img = button.querySelector("img");
      const figure = button.closest("figure");
      const figcaption = figure ? figure.querySelector("figcaption") : null;

      // Pass image source and alt text to the lightbox
      lightboxImg.src = img.src;
      lightboxImg.alt = img.alt;

      // Set Title (from alt text) and Caption (from figcaption)
      lightboxTitle.textContent = img.alt || "Pride Memory";
      lightboxCaption.textContent = figcaption ? figcaption.textContent : "";

      lightbox.showModal();
      document.body.style.overflow = "hidden"; // Prevent background scrolling
    });
  });

  // Close Lightbox (via X button)
  closeBtn.addEventListener("click", () => {
    lightbox.close();
    document.body.style.overflow = ""; // Restore background scrolling
  });

  // Close Lightbox (via clicking outside the image)
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.close();
      document.body.style.overflow = "";
    }
  });
});
