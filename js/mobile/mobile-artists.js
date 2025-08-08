// Chỉ thay nội dung .hero-content khi ở mobile, không ảnh hưởng desktop

function setupMobileArtistsActiveState() {
  if (window.innerWidth > 768) return; // Chỉ mobile

  const menu = document.getElementById('mobileVerticalMenuArtists');
  if (!menu) return;

  // Setup active state for mobile artists menu
  function setupActiveState() {
    const menuItems = menu.querySelectorAll('.mobile-nav-item');
    
    // Mặc định BANH tô đỏ khi mới vào trang
    const currentArtist = 'banh';
    
    menuItems.forEach(item => {
      const artist = item.getAttribute('data-section');
      if (artist === currentArtist) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  // Lắng nghe click từng artist
  menu.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const artist = item.getAttribute('data-section');
      if (!artist || !window.artistsData || !window.artistsData[artist]) return;

      // Update active state
      menu.querySelectorAll('.mobile-nav-item').forEach(navItem => {
        navItem.classList.remove('active');
      });
      item.classList.add('active');
      localStorage.setItem('currentArtist', artist);

      // Đóng menu overlay
      menu.classList.remove('open');
      menu.style.display = 'none';

      // Đổi banner artist (dùng instance banner đã có)
      if (window.banner && typeof window.banner.switchArtist === 'function') {
        window.banner.switchArtist(artist);
      }

      // Gọi hàm renderArtistInfo để đồng bộ hiệu ứng, style, logic với desktop
      if (window.renderArtistInfo) {
        window.renderArtistInfo(artist);
      }
    });
  });

  // Setup initial active state
  setupActiveState();
}

// Chạy ngay khi DOM ready
document.addEventListener('componentsLoaded', setupMobileArtistsActiveState);

// Chạy lại sau một chút để đảm bảo menu đã được tạo (chỉ 1 lần)
setTimeout(setupMobileArtistsActiveState, 500); 