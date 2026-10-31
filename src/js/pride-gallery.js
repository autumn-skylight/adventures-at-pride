document.addEventListener("DOMContentLoaded", () => {
  const accordionToggles = document.querySelectorAll(".accordion-toggle");

  accordionToggles.forEach((toggle) => {
    toggle.addEventListener("click", () => {
      const accordion = toggle.closest(".pride-accordion");
      const content = accordion.querySelector(".accordion-content");
      const icon = toggle.querySelector(".accordion-icon");
      const isCollapsed = content.classList.contains("collapsed");

      if (isCollapsed) {
        // Open the accordion
        content.classList.remove("collapsed");
        icon.textContent = "×"; // Changes to pink 'x'
        toggle.setAttribute("aria-expanded", "false");
      } else {
        // Close the accordion
        content.classList.add("collapsed");
        icon.textContent = "+"; // Changes back to pink '+'
        toggle.setAttribute("aria-expanded", "true");
      }
    });
  });
});
