// Mobile menu script - chỉ chạy cho mobile
// Thêm logic mở/đóng menu hamburger ở đây

// Wait for the 'componentsLoaded' event, which is dispatched by component-loader.js
// This ensures that the header and its buttons are in the DOM before we attach listeners.
document.addEventListener('componentsLoaded', function() {
  const menuButton = document.getElementById('mobileMenuToggle');
  const closeButton = document.getElementById('mobileMenuClose');
  const mobileNav = document.getElementById('mobileOnlyNav');

  if (menuButton && mobileNav && closeButton) {
    // Open the menu
    menuButton.addEventListener('click', debounce(function() {
      mobileNav.classList.add('open');
    }, 200));

    // Close the menu
    closeButton.addEventListener('click', debounce(function() {
      mobileNav.classList.remove('open');
    }, 200));
  } else {
    // This will help us debug if the elements are still not found for some reason.
    console.error('Mobile menu elements could not be found even after componentsLoaded event.');
  }
});

// --- Mobile vertical overlay menu logic ---
// Combined with main menu logic to avoid duplicate listeners
function initVerticalMenuOverlay() {
  if (window.innerWidth > 768) return;
  const page = document.body.dataset.page;
  const allowedPages = ['artists', 'gallery', 'contact'];
  if (!allowedPages.includes(page)) return;

  // Xác định id menu overlay cho từng trang
  const menuMap = {
    artists: 'mobileVerticalMenuArtists',
    gallery: 'mobileVerticalMenuGallery',
    contact: 'mobileVerticalMenuContact'
  };
  const menuId = menuMap[page];
  const menuOverlay = document.getElementById(menuId);

  // Tạo nút mũi tên nếu chưa có
  if (!document.getElementById('mobileArrowBtn')) {
    const arrowBtn = document.createElement('button');
    arrowBtn.id = 'mobileArrowBtn';
    arrowBtn.className = 'mobile-arrow-btn';
    arrowBtn.setAttribute('aria-label', 'Open menu');
    arrowBtn.innerHTML = '<svg width="22" height="22" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="11" cy="11" r="11" fill="#111"/><path d="M14.5 11H7.5M7.5 11L10 8.5M7.5 11L10 13.5" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';
    arrowBtn.style.position = 'fixed';
    arrowBtn.style.right = '6px';
    arrowBtn.style.top = '50%';
    arrowBtn.style.transform = 'translateY(-50%)';
    arrowBtn.style.zIndex = '10001';
    arrowBtn.style.width = '32px';
    arrowBtn.style.height = '32px';
    arrowBtn.style.background = 'transparent';
    arrowBtn.style.border = 'none';
    arrowBtn.style.padding = '0';
    arrowBtn.style.display = 'flex';
    arrowBtn.style.alignItems = 'center';
    arrowBtn.style.justifyContent = 'center';
    arrowBtn.style.cursor = 'pointer';
    arrowBtn.style.userSelect = 'none';
    arrowBtn.style.touchAction = 'none';
    document.body.appendChild(arrowBtn);

    // Kéo/thả mượt mà theo trục dọc (touch + mouse)
    let isDragging = false;
    let startY = 0;
    let startTop = 0;
    let animationFrame = null;
    let lastTop = null;
    function setBtnTop(newTop) {
      arrowBtn.style.top = newTop + 'px';
      lastTop = newTop;
    }
    function onMove(clientY) {
      const deltaY = clientY - startY;
      let newTop = startTop + deltaY;
      newTop = Math.max(12, Math.min(window.innerHeight - 44, newTop));
      if (lastTop !== newTop) {
        cancelAnimationFrame(animationFrame);
        animationFrame = requestAnimationFrame(() => setBtnTop(newTop));
      }
    }
    arrowBtn.addEventListener('touchstart', function(e) {
      isDragging = true;
      startY = e.touches[0].clientY;
      startTop = parseInt(arrowBtn.style.top) || window.innerHeight/2;
      arrowBtn.style.transition = 'none';
    });
    arrowBtn.addEventListener('touchmove', function(e) {
      if (!isDragging) return;
      onMove(e.touches[0].clientY);
    });
    arrowBtn.addEventListener('touchend', function() {
      isDragging = false;
      arrowBtn.style.transition = '';
    });
    arrowBtn.addEventListener('mousedown', function(e) {
      isDragging = true;
      startY = e.clientY;
      startTop = parseInt(arrowBtn.style.top) || window.innerHeight/2;
      arrowBtn.style.transition = 'none';
      document.body.style.userSelect = 'none';
    });
    window.addEventListener('mousemove', function(e) {
      if (!isDragging) return;
      onMove(e.clientY);
    });
    window.addEventListener('mouseup', function() {
      if (isDragging) {
        isDragging = false;
        arrowBtn.style.transition = '';
        document.body.style.userSelect = '';
      }
    });

    // Khi bấm vào nút, mở menu overlay đúng trang với hiệu ứng mượt
    arrowBtn.addEventListener('click', function(e) {
      e.stopPropagation();
      if (!menuOverlay) return;
      menuOverlay.style.display = 'flex';
      // Đảm bảo hiệu ứng trượt vào giống menu ☰
      requestAnimationFrame(() => {
        menuOverlay.classList.add('open');
      });
    });
  }

  // Đóng menu khi bấm nút close hoặc ra ngoài, có hiệu ứng mượt
  if (menuOverlay) {
    // Nút close
    menuOverlay.querySelectorAll('.mobile-menu-close').forEach(btn => {
      btn.addEventListener('click', function() {
        menuOverlay.classList.remove('open');
        // Chờ hiệu ứng xong mới ẩn
        menuOverlay.addEventListener('transitionend', function handler() {
          if (!menuOverlay.classList.contains('open')) {
            menuOverlay.style.display = 'none';
            menuOverlay.removeEventListener('transitionend', handler);
          }
        });
      });
    });
    // Bấm ra ngoài
    document.addEventListener('click', function(e) {
      if (window.innerWidth > 768) return;
      if (!menuOverlay.classList.contains('open')) return;
      if (!menuOverlay.contains(e.target) && e.target.id !== 'mobileArrowBtn') {
        menuOverlay.classList.remove('open');
        menuOverlay.addEventListener('transitionend', function handler() {
          if (!menuOverlay.classList.contains('open')) {
            menuOverlay.style.display = 'none';
            menuOverlay.removeEventListener('transitionend', handler);
          }
        });
      }
    });
    // Vuốt sang phải để đóng menu
    let touchStartX = null;
    menuOverlay.addEventListener('touchstart', function(e) {
      touchStartX = e.touches[0].clientX;
    });
    menuOverlay.addEventListener('touchmove', function(e) {
      if (touchStartX === null) return;
      const touchCurrentX = e.touches[0].clientX;
      if (touchCurrentX - touchStartX > 60) {
        menuOverlay.classList.remove('open');
        menuOverlay.addEventListener('transitionend', function handler() {
          if (!menuOverlay.classList.contains('open')) {
            menuOverlay.style.display = 'none';
            menuOverlay.removeEventListener('transitionend', handler);
          }
        });
        touchStartX = null;
      }
    });
    menuOverlay.addEventListener('touchend', function() {
      touchStartX = null;
    });
  }

  // Ẩn nút mũi tên khi menu ☰ mở (bằng JS, dự phòng nếu CSS không đủ)
  const mobileOnlyNav = document.getElementById('mobileOnlyNav');
  const arrowBtn = document.getElementById('mobileArrowBtn');
  if (mobileOnlyNav && arrowBtn) {
    const observer = new MutationObserver(() => {
      if (mobileOnlyNav.classList.contains('open')) {
        arrowBtn.style.display = 'none';
      } else {
        arrowBtn.style.display = 'flex';
      }
    });
    observer.observe(mobileOnlyNav, { attributes: true, attributeFilter: ['class'] });
  }

}

// Đảm bảo khi load trang ở desktop, nút mobileArrowBtn sẽ bị xóa nếu có
if (window.innerWidth > 768) {
  const arrowBtn = document.getElementById('mobileArrowBtn');
  if (arrowBtn) arrowBtn.remove();
}

// Đảm bảo nút mobileArrowBtn không xuất hiện trên desktop khi resize
window.addEventListener('resize', function() {
  if (window.innerWidth > 768) {
    const arrowBtn = document.getElementById('mobileArrowBtn');
    if (arrowBtn) arrowBtn.remove();
  }
});

// Initialize vertical menu overlay when components loaded
document.addEventListener('componentsLoaded', initVerticalMenuOverlay);

// Debounce helper
function debounce(fn, delay) {
  let timeout;
  return function(...args) {
    if (timeout) return;
    fn.apply(this, args);
    timeout = setTimeout(() => { timeout = null; }, delay);
  };
} 
