// Initialize all components when components are loaded
document.addEventListener('componentsLoaded', () => {
    // Initialize core components
    new DateTime(); // ← Real-time clock
    new VerticalMenu();
    
    // Initialize page-specific functionality
    const currentPage = document.body.dataset.page;
    
    if (currentPage === 'home') {
        initHomePage();
    } else if (currentPage === 'artists') {
        initArtistsPage();
    } else if (currentPage === 'gallery') {
        initGalleryPage();
    } else if (currentPage === 'flash-deals') {
        initFlashDealsPage();
    } else if (currentPage === 'contact') {
        initContactPage();
    }
    
    // Initialize book now button in vertical menu (MOVED FROM HOME PAGE)
    const bookNowBtn = document.getElementById('bookNowBtn');
    if (bookNowBtn) {
        bookNowBtn.addEventListener('click', () => {
            window.open('https://www.facebook.com/messages/t/500996536663693', '_blank');
        });
    }
});

// Backup initialization if components don't load
setTimeout(() => {
    if (!document.querySelector('.datetime') || !document.querySelector('.datetime').textContent.trim()) {
        new DateTime();
    }
}, 2000);

// Home page specific functionality
function initHomePage() {
    // REMOVED: bookNowBtn - moved to vertical menu
    
    // Handle gallery link in hero section
    const galleryLink = document.querySelector('.gallery-link');
    if (galleryLink) {
        galleryLink.addEventListener('click', (e) => {
            e.preventDefault();
            window.location.href = 'gallery.html';
        });
    }
    // Hiệu ứng động hero-content
    setTimeout(function() {
      var heroEls = document.querySelectorAll('.hero-content .slide-in-left');
      heroEls.forEach(function(el, idx) {
        setTimeout(function() {
          el.classList.add('is-animated');
        }, idx * 120);
      });
    }, 100);
}

// Artists page specific functionality
function initArtistsPage() {
    const bookConsultationBtn = document.querySelector('.book-consultation-btn');
    if (bookConsultationBtn) {
        bookConsultationBtn.addEventListener('click', () => {
            alert('Consultation booking will open here!');
            // Add consultation booking logic
        });
    }
}

// Gallery page specific functionality
function initGalleryPage() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const loadMoreBtn = document.querySelector('.load-more-btn');
    
    // Filter functionality
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons
            filterBtns.forEach(b => b.classList.remove('active'));
            // Add active class to clicked button
            btn.classList.add('active');
            
            const category = btn.dataset.category;
            
            // Filter gallery items
            galleryItems.forEach(item => {
                if (category === 'all' || item.dataset.category === category) {
                    item.style.display = 'block';
                } else {
                    item.style.display = 'none';
                }
            });
        });
    });
    
    // Load more functionality
    if (loadMoreBtn) {
        loadMoreBtn.addEventListener('click', () => {
            alert('Loading more gallery items...');
            // Add load more logic
        });
    }
}

// Flash deals page specific functionality
function initFlashDealsPage() {
    const claimBtns = document.querySelectorAll('.claim-deal-btn:not(:disabled)');
    
    claimBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            alert('Deal claimed! Redirecting to booking...');
            // Add deal claiming logic
        });
    });
    
    // Countdown timer
    startCountdownTimer();
}

// Contact page specific functionality
function initContactPage() {
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            // Get form data
            const formData = new FormData(contactForm);
            const data = Object.fromEntries(formData);
            // Basic validation
            if (!data.name || !data.email || !data.message) {
                alert('Please fill in all required fields.');
                return;
            }
            // Simulate form submission
            alert('Message sent successfully! We will get back to you soon.');
            contactForm.reset();
            // Add real form submission logic here
        });
    }
}

// Countdown timer for flash deals
function startCountdownTimer() {
    const daysEl = document.getElementById('days');
    const hoursEl = document.getElementById('hours');
    const minutesEl = document.getElementById('minutes');
    const secondsEl = document.getElementById('seconds');
    
    if (!daysEl || !hoursEl || !minutesEl || !secondsEl) return;
    
    // Set target date (3 days from now)
    const targetDate = new Date().getTime() + (3 * 24 * 60 * 60 * 1000);
    
    function updateCountdown() {
        const now = new Date().getTime();
        const distance = targetDate - now;
        
        if (distance < 0) {
            daysEl.textContent = '00';
            hoursEl.textContent = '00';
            minutesEl.textContent = '00';
            secondsEl.textContent = '00';
            return;
        }
        
        const days = Math.floor(distance / (1000 * 60 * 60 * 24));
        const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((distance % (1000 * 60)) / 1000);
        
        daysEl.textContent = String(days).padStart(2, '0');
        hoursEl.textContent = String(hours).padStart(2, '0');
        minutesEl.textContent = String(minutes).padStart(2, '0');
        secondsEl.textContent = String(seconds).padStart(2, '0');
    }
    
    // Update immediately and then every second
    updateCountdown();
    setInterval(updateCountdown, 1000);
}

function runPreloader() {
    const preloader = document.querySelector('.preloader');
    const logo = document.querySelector('.logo-fill');
    const mainContent = document.querySelector('#content-container');

    if (!preloader || !logo || !mainContent) return;

    const styles = window.getComputedStyle(logo);
    const animationDuration = styles.getPropertyValue('animation-duration') || '2.5s';
    const durationMs = parseFloat(animationDuration) * 1000;

    window.addEventListener('load', () => {
        setTimeout(() => {
            preloader.classList.add('preloader--hidden');
            mainContent.style.opacity = '1';
            document.body.style.overflow = 'hidden';
        }, durationMs);
    });
}

// runPreloader();

// Duplicate bookNowBtn event listener removed - already handled in componentsLoaded event