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

createIcons();
setupPrintButton();
