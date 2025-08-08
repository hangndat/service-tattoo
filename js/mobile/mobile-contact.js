// Logic mobile cho trang Contact Us
// Đảm bảo chỉ chạy ở mobile, không ảnh hưởng desktop

function setupMobileContactActiveState() {
  if (window.innerWidth > 768) return; // Chỉ mobile

  // Lắng nghe click menu contact mobile (nếu có)
  const menu = document.getElementById('mobileVerticalMenuContact');
  if (!menu) return;

  // Setup active state for mobile contact menu
  function setupActiveState() {
    const menuItems = menu.querySelectorAll('.mobile-nav-item');
    
    // Mặc định CONTACT US tô đỏ khi mới vào trang
    const currentSection = 'contact-form';
    
    menuItems.forEach(item => {
      const section = item.getAttribute('data-section');
      if (section === currentSection) {
        item.classList.add('active');
      } else {
        item.classList.remove('active');
      }
    });
  }

  menu.querySelectorAll('.mobile-nav-item').forEach(item => {
    item.addEventListener('click', function(e) {
      e.preventDefault();
      const section = item.getAttribute('data-section');
      if (!section || !window.renderContactTab) return;

      // Update active state
      menu.querySelectorAll('.mobile-nav-item').forEach(navItem => {
        navItem.classList.remove('active');
      });
      item.classList.add('active');
      localStorage.setItem('currentContactSection', section);

      // Đóng menu overlay
      menu.classList.remove('open');
      menu.style.display = 'none';

      // Gọi hàm renderContactTab để đồng bộ hiệu ứng, style, logic với desktop
      // Map data-section sang type (giống getTabType trong contact-animate.js)
      const typeMap = {
        'contact-form': 'contact',
        'google-map': 'map',
        'review': 'review'
      };
      const type = typeMap[section] || '';
      if (type) window.renderContactTab(type);
    });
  });

  // Setup initial active state
  setupActiveState();
}

// Chạy ngay khi DOM ready
document.addEventListener('componentsLoaded', setupMobileContactActiveState);

// Chạy lại sau một chút để đảm bảo menu đã được tạo (chỉ 1 lần)
setTimeout(setupMobileContactActiveState, 500); 