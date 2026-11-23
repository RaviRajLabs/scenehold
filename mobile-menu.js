const menuDialog = document.getElementById("mobile-drawer");
const openMenuButton = document.querySelector("[data-menu-open]");
const closeMenuButton = document.querySelector("[data-menu-close]");

if (menuDialog instanceof HTMLDialogElement && openMenuButton instanceof HTMLButtonElement) {
  openMenuButton.addEventListener("click", () => {
    menuDialog.showModal();
    openMenuButton.setAttribute("aria-expanded", "true");
  });

  menuDialog.addEventListener("close", () => {
    openMenuButton.setAttribute("aria-expanded", "false");
  });

  closeMenuButton?.addEventListener("click", () => menuDialog.close());

  menuDialog.addEventListener("click", (event) => {
    if (event.target === menuDialog) {
      menuDialog.close();
    }
  });

  menuDialog.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => menuDialog.close());
  });
}
