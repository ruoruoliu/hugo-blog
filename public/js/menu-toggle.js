window.addEventListener("DOMContentLoaded", function() {
  const links = document.querySelectorAll('#R-sidebar .collapsible-menu input[type="checkbox"] ~ a');
  links.forEach(link => {
    link.addEventListener("click", e => {
      const li = link.closest("li");
      const checkbox = li.querySelector("input[type='checkbox']");
      if (checkbox) {
        e.preventDefault();
        checkbox.checked = !checkbox.checked;
      }
    });
  });
});
