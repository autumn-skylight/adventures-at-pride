const menu = document.querySelector(".site-menu");

if (menu) {
  const toggle = menu.querySelector(".site-menu-toggle");
  const panel = menu.querySelector(".site-menu-panel");
  const backdrop = menu.querySelector(".site-menu-backdrop");
  const links = [...panel.querySelectorAll("a")];
  let previouslyFocused = null;

  const closeMenu = (returnFocus = true) => {
    menu.classList.remove("is-open");
    toggle.setAttribute("aria-expanded", "false");
    toggle.setAttribute("aria-label", "Open navigation menu");
    toggle.querySelector(".site-menu-toggle-label").textContent = "Menu";
    panel.setAttribute("aria-hidden", "true");
    panel.inert = true;
    document.body.classList.remove("site-menu-open");

    if (returnFocus && previouslyFocused instanceof HTMLElement) {
      previouslyFocused.focus();
    }
  };

  const openMenu = () => {
    previouslyFocused = document.activeElement;
    menu.classList.add("is-open");
    toggle.setAttribute("aria-expanded", "true");
    toggle.setAttribute("aria-label", "Close navigation menu");
    toggle.querySelector(".site-menu-toggle-label").textContent = "Close";
    panel.setAttribute("aria-hidden", "false");
    panel.inert = false;
    document.body.classList.add("site-menu-open");
    links[0].focus();
  };

  toggle.addEventListener("click", () => {
    if (toggle.getAttribute("aria-expanded") === "true") {
      closeMenu();
    } else {
      openMenu();
    }
  });

  backdrop.addEventListener("click", () => closeMenu());
  links.forEach((link) => link.addEventListener("click", () => closeMenu(false)));

  document.addEventListener("keydown", (event) => {
    if (!menu.classList.contains("is-open")) {
      return;
    }

    if (event.key === "Escape") {
      event.preventDefault();
      closeMenu();
      return;
    }

    if (event.key !== "Tab") {
      return;
    }

    if (event.shiftKey && document.activeElement === links[0]) {
      event.preventDefault();
      toggle.focus();
    } else if (event.shiftKey && document.activeElement === toggle) {
      event.preventDefault();
      links[links.length - 1].focus();
    } else if (!event.shiftKey && document.activeElement === links[links.length - 1]) {
      event.preventDefault();
      toggle.focus();
    }
  });
}
