(function() {
  document.addEventListener('click', function(e) {
    var target = e.target;
    var link = target.closest('a');
    
    if (!link) return;
    if (!link.closest('#R-sidebar')) return;

    var li = link.closest('li');
    if (!li) return;

    // 查找属于该 li 的 checkbox
    // 结构通常是: input -> label -> a
    // 所以 checkbox 应该是 link 的前兄弟元素（隔着 label）
    var checkbox = li.querySelector('input[type="checkbox"]');
    
    // 确保 checkbox 存在且是当前 li 的直接子元素控制开关
    // 我们可以检查 checkbox 是否在 link 之前
    if (checkbox && li.contains(checkbox)) {
      // 只有当 link 是 li 的直接子元素时才处理（避免误伤子菜单里的链接）
      if (link.parentNode === li) {
        e.preventDefault();
        checkbox.checked = !checkbox.checked;
      }
    }
  });
})();
