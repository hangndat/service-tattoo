// Banner functionality
if (typeof Banner === 'undefined') {
    class Banner {
    constructor() {
        this.initialized = false;
        this.currentIndex = 0;
        this.slideInterval = null;
        this.currentArtist = 'banh'; // Default artist
        this.artistImages = {
            banh: [
                './images/Banh-gallery/Banh1.png',
                './images/Banh-gallery/Banh2.png',
                './images/Banh-gallery/Banh3.png',
                './images/Banh-gallery/Banh4.png',
            ],
            'nam-n2n': [
                './images/Nam-gallery/Nam1.png',
                './images/Nam-gallery/Nam2.png',
                './images/Nam-gallery/Nam3.png',
                './images/Nam-gallery/Nam4.png',
            ],
            'trinh-reklezz': [
                './images/Trinh-gallery/Trinh1.png',
                './images/Trinh-gallery/Trinh2.png',
                './images/Trinh-gallery/Trinh3.png',
                './images/Trinh-gallery/Trinh4.png',
            ]
        };
        this.imageElements = [];
        this.dotElements = [];
        this.heroImage = null;
        
        // Touch/swipe variables for mobile
        this.touchStartX = 0;
        this.touchEndX = 0;
        this.isMobile = window.innerWidth <= 768;
    }

    init() {
        if (this.initialized) return;
        this.heroImage = document.getElementById('heroImage');
        if (!this.heroImage) {
            setTimeout(() => this.init(), 100);
            return;
        }
        this.setupArtistMenu();
        this.createBannerDOM();
        this.setupTouchEvents(); // Add touch events for mobile
        this.updateBannerDisplay();
        this.startInterval();
        this.initialized = true;
    }

    setupArtistMenu() {
        const artistMenuItems = document.querySelectorAll('.artists-menu-items .menu-item');
        artistMenuItems.forEach(item => {
            if (!item._bannerClickAttached) {
                item.addEventListener('click', () => {
                    const artist = item.getAttribute('data-section');
                    if (artist && this.artistImages[artist]) {
                        document.querySelectorAll('.artists-menu-items .menu-item').forEach(menuItem => {
                            menuItem.classList.remove('active');
                        });
                        item.classList.add('active');
                        this.switchArtist(artist);
                    }
                });
                item._bannerClickAttached = true;
            }
        });
    }

    createBannerDOM() {
        this.heroImage.innerHTML = '';
        this.bannerNav = document.createElement('div');
        this.bannerNav.className = 'banner-nav';
        this.heroImage.appendChild(this.bannerNav);
        this.imageElements = this.artistImages[this.currentArtist].map((src, i) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Artist Banner ${i + 1}`;
            img.style.display = i === 0 ? 'block' : 'none';
            // Mobile: để CSS điều khiển, Desktop: set style
            if (window.innerWidth > 768) {
                img.style.width = 'auto';
                img.style.height = 'auto';
                img.style.maxWidth = '100%';
                img.style.maxHeight = '100%';
                img.style.objectFit = 'contain';
                img.style.position = 'absolute';
                img.style.top = '50%';
                img.style.left = '50%';
                img.style.transform = 'translate(-50%, -50%)';
                img.style.padding = '12px';
            }
            img.loading = 'lazy';
            // Thêm width/height thực tế của ảnh (giả sử 1200x800, có thể chỉnh lại nếu biết chính xác)
            img.width = 1200;
            img.height = 800;
            img.addEventListener('click', () => {
                openModal(this.artistImages[this.currentArtist][i], this.artistImages[this.currentArtist], i);
            });
            this.heroImage.insertBefore(img, this.bannerNav);
            return img;
        });
        this.dotElements = this.artistImages[this.currentArtist].map((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'banner-dot' + (i === 0 ? ' active' : '');
            dot.addEventListener('click', () => {
                this.currentIndex = i;
                this.updateBannerDisplay();
                this.startInterval();
            });
            this.bannerNav.appendChild(dot);
            return dot;
        });
        // Đã bỏ hoàn toàn hover event
    }

    setupTouchEvents() {
        if (!this.isMobile) return;
        
        // Touch events for swipe
        this.heroImage.addEventListener('touchstart', (e) => {
            this.touchStartX = e.changedTouches[0].screenX;
        }, { passive: true });
        
        this.heroImage.addEventListener('touchend', (e) => {
            this.touchEndX = e.changedTouches[0].screenX;
            this.handleSwipe();
        }, { passive: true });
        
        // Mouse events for desktop testing (optional)
        this.heroImage.addEventListener('mousedown', (e) => {
            if (this.isMobile) return;
            this.touchStartX = e.screenX;
        });
        
        this.heroImage.addEventListener('mouseup', (e) => {
            if (this.isMobile) return;
            this.touchEndX = e.screenX;
            this.handleSwipe();
        });
    }
    
    handleSwipe() {
        const swipeThreshold = 50; // Minimum distance for swipe
        const swipeDistance = this.touchEndX - this.touchStartX;
        
        if (Math.abs(swipeDistance) > swipeThreshold) {
            if (swipeDistance > 0) {
                // Swipe right - go to previous image
                this.currentIndex = (this.currentIndex - 1 + this.imageElements.length) % this.imageElements.length;
            } else {
                // Swipe left - go to next image
                this.currentIndex = (this.currentIndex + 1) % this.imageElements.length;
            }
            this.updateBannerDisplay();
            this.startInterval(); // Reset timer
        }
    }

    updateBannerContent(artist) {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
        this.currentIndex = 0;
        this.createBannerDOM();
        this.updateBannerDisplay();
        this.startInterval();
    }

    updateBannerDisplay() {
        this.imageElements.forEach((img, i) => {
            img.style.display = i === this.currentIndex ? 'block' : 'none';
        });
        this.dotElements.forEach((dot, i) => {
            dot.classList.toggle('active', i === this.currentIndex);
        });
    }

    startInterval() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
        }
        this.slideInterval = setInterval(() => {
            this.currentIndex = (this.currentIndex + 1) % this.imageElements.length;
            this.updateBannerDisplay();
        }, 2500);
    }

    switchArtist(artist) {
        if (this.artistImages[artist]) {
            this.currentArtist = artist;
            this.updateBannerContent(artist);
        }
    }
    
    // Update mobile detection on window resize
    updateMobileDetection() {
        this.isMobile = window.innerWidth <= 768;
    }
}

// Create banner instance
const banner = new Banner();
window.banner = banner;

// Initialize only once to avoid conflicts
let bannerInitialized = false;

function initializeBanner() {
    if (bannerInitialized) return;
    banner.init();
    bannerInitialized = true;
    
    // Add Instagram button animation after banner is ready
    setTimeout(() => {
        var igBtn = document.querySelector('.hero-instagram-btn');
        if (igBtn) igBtn.classList.add('slide-in-instagram');
    }, 300);
}

// Handle window resize for mobile detection
window.addEventListener('resize', () => {
    if (banner && banner.updateMobileDetection) {
        banner.updateMobileDetection();
    }
});

// Initialize on componentsLoaded (preferred)
document.addEventListener('componentsLoaded', initializeBanner);

// Fallback initialization
document.addEventListener('DOMContentLoaded', () => {
    if (!bannerInitialized) {
        setTimeout(initializeBanner, 100);
    }
});

// Banner functionality for Home page
class HomeBanner {
    constructor() {
        this.initialized = false;
        this.currentIndex = 0;
        this.slideInterval = null;
        this.images = [
            './images/Home-page-gallery/home1.jpg',
            './images/Home-page-gallery/home2.jpg',
            './images/Home-page-gallery/home3.jpg'
        ];
    }

    init() {
        if (this.initialized) return;
        const heroImage = document.getElementById('heroImage');
        if (!heroImage) {
            setTimeout(() => this.init(), 100);
            return;
        }
        this.setupGallery();
        this.initialized = true;
    }

    setupGallery() {
        const heroImage = document.getElementById('heroImage');
        if (!heroImage) return;
        // Clear and setup
        heroImage.innerHTML = `
            <div class="banner-nav">
                ${this.images.map((_, i) => `
                    <div class="banner-dot${i === 0 ? ' active' : ''}"></div>
                `).join('')}
            </div>
        `;
        // Create images
        this.imageElements = this.images.map((src, i) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Home Banner ${i + 1}`;
            img.style.display = i === 0 ? 'block' : 'none';
            img.style.width = 'auto';
            img.style.height = 'auto';
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            img.style.objectFit = 'contain';
            img.style.position = 'absolute';
            img.style.top = '50%';
            img.style.left = '50%';
            img.style.transform = 'translate(-50%, -50%)';
            img.style.padding = '12px';
            img.loading = 'lazy';
            // Thêm width/height thực tế của ảnh (giả sử 1200x800, có thể chỉnh lại nếu biết chính xác)
            img.width = 1200;
            img.height = 800;
            heroImage.insertBefore(img, heroImage.firstChild);
            return img;
        });
        const dots = heroImage.querySelectorAll('.banner-dot');
        // Update banner display
        this.updateBanner = () => {
            this.imageElements.forEach((img, i) => {
                img.style.display = i === this.currentIndex ? 'block' : 'none';
            });
            dots.forEach((dot, i) => {
                dot.classList.toggle('active', i === this.currentIndex);
            });
        };
        // Start interval
        this.startInterval = () => {
            if (this.slideInterval) {
                clearInterval(this.slideInterval);
            }
            this.slideInterval = setInterval(() => {
                this.currentIndex = (this.currentIndex + 1) % this.images.length;
                this.updateBanner();
            }, 2500);
        };
        // Event listeners
        heroImage.addEventListener('mouseenter', () => {
            if (this.slideInterval) {
                clearInterval(this.slideInterval);
                this.slideInterval = null;
            }
        });
        heroImage.addEventListener('mouseleave', () => {
            this.startInterval();
        });
        dots.forEach((dot, i) => {
            dot.addEventListener('click', () => {
                this.currentIndex = i;
                this.updateBanner();
                this.startInterval();
            });
        });
        // Start slideshow
        this.startInterval();
        this.updateBanner();
    }
}

}

// Auto-init on DOMContentLoaded
window.addEventListener('DOMContentLoaded', () => {
    if (document.getElementById('heroImage')) {
        const banner = new HomeBanner();
        banner.init();
    }
}); 