function createIcons() {
  if (window.lucide) {
    window.lucide.createIcons({
      attrs: {
        "stroke-width": 1.9,
      },
    });
  }
}

function setupPrintButton() {
  const printButton = document.querySelector("[data-print]");
  if (!printButton) return;

  printButton.addEventListener("click", () => window.print());

  if (window.location.hash === "#print") {
    window.setTimeout(() => window.print(), 300);
  }
}

function setupMobileMenu() {
  const menuButtons = document.querySelectorAll("[data-menu-toggle]");
  if (!menuButtons.length) return;

  menuButtons.forEach((menuButton) => {
    const header = menuButton.closest(".site-header");
    const navId = menuButton.getAttribute("aria-controls");
    const nav = navId ? document.getElementById(navId) : null;
    if (!header || !nav) return;

    function setOpen(isOpen) {
      header.classList.toggle("menu-open", isOpen);
      menuButton.setAttribute("aria-expanded", String(isOpen));
    }

    menuButton.addEventListener("click", () => {
      setOpen(!header.classList.contains("menu-open"));
    });

    nav.addEventListener("click", (event) => {
      if (event.target.closest("a")) {
        setOpen(false);
      }
    });

    document.addEventListener("keydown", (event) => {
      if (event.key === "Escape") {
        setOpen(false);
      }
    });

    document.addEventListener("click", (event) => {
      if (!header.contains(event.target)) {
        setOpen(false);
      }
    });
  });
}

createIcons();
setupPrintButton();
setupMobileMenu();
