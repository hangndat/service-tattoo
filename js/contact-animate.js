// Contact page animations and tab switching
function animateSlideInLeft(selector = '.slide-in-left', stagger = 80) {
  const animatedEls = document.querySelectorAll(selector);
  animatedEls.forEach((el, idx) => {
    setTimeout(() => {
      el.classList.add('is-animated');
    }, idx * stagger);
  });
}

// Contact tab switching logic
document.addEventListener('componentsLoaded', () => {
  animateSlideInLeft();

  // Only run on contact page
  if (document.body.dataset.page !== 'contact') return;

  const tabButtons = Array.from(document.querySelectorAll('.contact-menu-items .menu-item'));
  const contactInfo = document.querySelector('.contact-info');
  const originalContactInfo = contactInfo ? contactInfo.innerHTML : '';

  // Tab content definitions
  const tabContents = {
    contact: originalContactInfo,
    map: `<div class="contact-block contact-map"><iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.252393698736!2d106.6783237142876!3d10.77277679232647!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x31752f214120f7c7%3A0x735eb1ab0ec1860d!2zMjcgxJAuIMSQxrDhu51uZyBz4buRIDIsIFBoxrDhu51uZyA0LCBDxrDhu51uZyB4w6MgxJDDtCBUaMOhbmgsIFF14bqtbiAzLCBI4buTIENow60gTWluaCA3MDAwMDAsIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1717570000000!5m2!1svi!2s" allowfullscreen="" loading="lazy" referrerpolicy="no-referrer-when-downgrade"></iframe></div>`,
    review: `<div class="contact-block contact-review"><div class="review-placeholder">Đánh giá của khách hàng sẽ hiển thị ở đây.<br>(Chức năng đang phát triển)</div></div>`
  };

  // Tab type mapping
  const getTabType = (section) => {
    const typeMap = {
      'contact-form': 'contact',
      'google-map': 'map',
      'review': 'review'
    };
    return typeMap[section] || '';
  };

  // Render tab content
  function renderContactTab(type) {
    if (contactInfo) {
      contactInfo.innerHTML = tabContents[type] || '';
      animateSlideInLeft();
    }
    tabButtons.forEach(btn => {
      const btnType = getTabType(btn.getAttribute('data-section'));
      btn.classList.toggle('active', btnType === type);
    });
  }
  window.renderContactTab = renderContactTab;

  // Add click event listeners
  tabButtons.forEach(btn => {
    const btnType = getTabType(btn.getAttribute('data-section'));
    if (btnType) {
      btn.addEventListener('click', () => renderContactTab(btnType));
    }
  });

  // Initialize with contact tab
  try {
    const savedTab = localStorage.getItem('contactTab');
    renderContactTab(savedTab || 'contact');
  } catch (e) {
    try {
    const savedTab = localStorage.getItem('contactTab');
    renderContactTab(savedTab || 'contact');
  } catch (e) {
    renderContactTab('contact');
  }
  }
}); 