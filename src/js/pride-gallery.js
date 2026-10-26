const lightbox = document.querySelector(".pride-lightbox");

if (lightbox instanceof HTMLDialogElement) {
  const lightboxImage = lightbox.querySelector(".pride-lightbox-image");
  const closeButton = lightbox.querySelector(".pride-lightbox-close");
  const lightboxTitle = lightbox.querySelector(".pride-lightbox-title");
  const lightboxCaption = lightbox.querySelector(".pride-lightbox-caption-text");
  const imageButtons = [];
  let activeImageButton = null;

  document.querySelectorAll(".pride-year-images").forEach((row) => {
    if (row.querySelectorAll("figure").length > 4) {
      row.classList.add("has-many-images");
    }
  });

  document.querySelectorAll(".pride-gallery img").forEach((image) => {
    const button = document.createElement("button");
    button.className = "pride-image-button";
    button.type = "button";
    button.setAttribute("aria-label", `Enlarge image: ${image.alt || "Pride photo"}`);
    image.before(button);
    button.append(image);
    imageButtons.push(button);
  });

  imageButtons.forEach((button) => {
    button.addEventListener("click", () => {
      const image = button.querySelector("img");
      const card = button.closest(".pride-card");
      activeImageButton = button;
      lightboxImage.src = image.currentSrc || image.src;
      lightboxImage.alt = image.alt;
      lightboxTitle.textContent = card.querySelector("h3").textContent.trim();
      lightboxCaption.textContent = button.closest("figure").querySelector("figcaption").textContent.trim();
      lightbox.showModal();
      closeButton.focus();
    });
  });

  closeButton.addEventListener("click", () => lightbox.close());

  lightbox.addEventListener("cancel", (event) => {
    event.preventDefault();
    lightbox.close();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && lightbox.open) {
      event.preventDefault();
      lightbox.close();
    }
  });

  lightbox.addEventListener("click", (event) => {
    if (event.target === lightbox) {
      lightbox.close();
    }
  });

  lightbox.addEventListener("close", () => {
    lightboxImage.removeAttribute("src");
    lightboxTitle.textContent = "";
    lightboxCaption.textContent = "";
    activeImageButton?.focus();
    activeImageButton = null;
  });
}
