document.querySelectorAll("[data-screenshot-gallery]").forEach((gallery) => {
  const tabs = Array.from(gallery.querySelectorAll("[data-screenshot-tab]"));
  const panels = Array.from(gallery.querySelectorAll("[data-screenshot-panel]"));

  if (!tabs.length || !panels.length) return;

  const activate = (selectedTab, moveFocus = false) => {
    const selectedName = selectedTab.dataset.screenshotTab;

    tabs.forEach((tab) => {
      const isSelected = tab === selectedTab;
      tab.classList.toggle("is-active", isSelected);
      tab.setAttribute("aria-selected", String(isSelected));
      tab.tabIndex = isSelected ? 0 : -1;
    });

    panels.forEach((panel) => {
      const isSelected = panel.dataset.screenshotPanel === selectedName;
      panel.hidden = !isSelected;
      panel.classList.toggle("is-active", isSelected);
    });

    if (moveFocus) selectedTab.focus();
  };

  tabs.forEach((tab, index) => {
    tab.addEventListener("click", () => activate(tab));
    tab.addEventListener("keydown", (event) => {
      let nextIndex = index;
      if (event.key === "ArrowRight" || event.key === "ArrowDown") nextIndex = (index + 1) % tabs.length;
      else if (event.key === "ArrowLeft" || event.key === "ArrowUp") nextIndex = (index - 1 + tabs.length) % tabs.length;
      else if (event.key === "Home") nextIndex = 0;
      else if (event.key === "End") nextIndex = tabs.length - 1;
      else return;

      event.preventDefault();
      activate(tabs[nextIndex], true);
    });
  });
});
