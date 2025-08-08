document.addEventListener('componentsLoaded', function() {
  if (window.innerWidth > 768) return; // Chỉ mobile

  const menu = document.getElementById('mobileVerticalMenuGallery');
  if (!menu) return;

  // Render mặc định artist 'banh' khi vào gallery mobile
  window.currentArtist = 'banh';
  if (window.renderGalleryGrid) window.renderGalleryGrid('banh');
  if (window.updateGalleryHeroContent) window.updateGalleryHeroContent('banh');

  // Highlight mặc định cho BANH trong dropdown mobile khi load trang
  const artistItems = menu.querySelectorAll('.mobile-dropdown-menu[data-dropdown-menu="artist"] .mobile-dropdown-item');
  artistItems.forEach(item => {
    item.classList.toggle('active', item.getAttribute('data-section') === 'banh');
  });

  // Toggle dropdown logic
  const toggles = menu.querySelectorAll('.mobile-dropdown-toggle');
  toggles.forEach(toggle => {
    toggle.addEventListener('click', function(e) {
      e.stopPropagation();
      const dropdownMenu = menu.querySelector(`.mobile-dropdown-menu[data-dropdown-menu="${toggle.dataset.dropdown}"]`);
      const isOpen = dropdownMenu && dropdownMenu.classList.contains('open');
      menu.querySelectorAll('.mobile-dropdown-menu').forEach(menu => menu.classList.remove('open'));
      toggles.forEach(tg => tg.classList.remove('active'));
      if (!isOpen && dropdownMenu) {
        dropdownMenu.classList.add('open');
        toggle.classList.add('active');
      }
    });
  });

  // ARTIST: render đúng artist như desktop
  artistItems.forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const artistKey = item.getAttribute('data-section');
      if (!artistKey) return;
      window.currentArtist = artistKey;
      if (window.renderGalleryGrid) window.renderGalleryGrid(artistKey);
      if (window.updateGalleryHeroContent) window.updateGalleryHeroContent(artistKey);
      menu.classList.remove('open');
      menu.style.display = 'none';
      // Highlight active trong dropdown mobile
      artistItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });

  // STYLE: render đúng style như desktop
  const styleItems = menu.querySelectorAll('.mobile-dropdown-menu[data-dropdown-menu="style"] .mobile-dropdown-item');
  styleItems.forEach((item, idx) => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      window.currentStyleIndex = idx;
      if (window.renderGalleryGrid) window.renderGalleryGrid(window.currentArtist);
      if (window.updateGalleryHeroContent) window.updateGalleryHeroContent(window.currentArtist);
      menu.classList.remove('open');
      menu.style.display = 'none';
      // Highlight active trong dropdown mobile
      styleItems.forEach(i => i.classList.remove('active'));
      item.classList.add('active');
    });
  });
}); 