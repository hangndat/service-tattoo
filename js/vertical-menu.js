// Artist data
const artistsData = {
    'banh': {
        title: 'BANH',
        description: 'Yo! Banh here, I run this place - Ink Under Skin. Been doing all kinds of styles but traditional and neo-traditional is where I shine. Those bold lines and sick colors? That\'s my jam. Hit me up and let\'s get you some fire ink!'
    },
    'nam-n2n': {
        title: 'NAM - N2N',
        description: 'What\'s up! I\'m Nam, but you can call me N2N. I\'ve been tattooing for about 6-7 years now, and I\'m totally obsessed with Asian flash designs - dragons, koi fish, cherry blossoms, you name it! Though I gotta say, new school style always gets me excited too with all those crazy colors and fun characters.'
    },
    'trinh-reklezz': {
        title: 'TRINH - REKLEZZ',
        description: 'Hey there! Trình here, aka Reklezz. Been tattooing for about 6-7 years and I focus mainly on realistic work and blackwork. If you\'re looking for clean portraits or solid black pieces, let\'s talk!'
    },
    'bui': {
        title: 'BUI',
        description: 'Hey there! I\'m Bui, and I\'ve been tattooing for about 6-7 years now. I\'m all about the bold and colorful designs, especially when it comes to traditional and neo-traditional styles. If you\'re looking for something that pops, let\'s chat!'
    },
    'pam-gon': {
        title: 'PAM GON',
        description: 'What\'s up! I\'m Pam, but you can call me Gon. I\'ve been tattooing for about 6-7 years now, and I\'m totally obsessed with Asian flash designs - dragons, koi fish, cherry blossoms, you name it! Though I gotta say, new school style always gets me excited too with all those crazy colors and fun characters.'
    }
};

// Cache DOM elements at module level
let heroTitle = null;
let heroDescription = null;

// Initialize DOM elements
function initializeElements() {
    heroTitle = document.querySelector('.hero-title');
    heroDescription = document.querySelector('.hero-description');
}

// Call initialization when DOM is ready
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeElements);
} else {
    initializeElements();
}

function renderArtistInfo(artistId) {
    // Ensure elements exist
    if (!heroTitle || !heroDescription) {
        initializeElements();
        if (!heroTitle || !heroDescription) {
            requestAnimationFrame(() => renderArtistInfo(artistId));
            return;
        }
    }
    var igBtn = document.querySelector('.hero-instagram-btn');
    if (window.artistsData[artistId]) {
        // Batch DOM updates
        requestAnimationFrame(() => {
            // Update content
            heroTitle.textContent = window.artistsData[artistId].title;
            heroDescription.textContent = window.artistsData[artistId].description;
            // Reset animation
            heroTitle.classList.remove('animate-title');
            heroDescription.classList.remove('animate-description');
            // Force reflow
            void heroTitle.offsetWidth;
            void heroDescription.offsetWidth;
            // Add animation classes
            heroTitle.classList.add('animate-title');
            heroDescription.classList.add('animate-description');
            if (igBtn) igBtn.href = window.artistsData[artistId].instagram || '#';
        });
        // Save to localStorage in the next frame to not block animation
        requestAnimationFrame(() => {
            localStorage.setItem('selectedArtist', artistId);
        });
    } else {
        // Default to first artist
        const defaultArtist = 'banh';
        requestAnimationFrame(() => {
            heroTitle.textContent = window.artistsData[defaultArtist].title;
            heroDescription.textContent = window.artistsData[defaultArtist].description;
            if (igBtn) igBtn.href = window.artistsData[defaultArtist].instagram || '#';
            localStorage.setItem('selectedArtist', defaultArtist);
        });
    }
}
window.renderArtistInfo = renderArtistInfo;

// Function to restore artist state
function restoreArtistState() {
    // Always default to 'banh' on page load/refresh
    const selectedArtist = 'banh';
    
    // Update menu item state
    const menuItem = document.querySelector(`[data-section="${selectedArtist}"]`);
    if (menuItem) {
        const allMenuItems = document.querySelectorAll('.menu-item');
        allMenuItems.forEach(item => item.classList.remove('active'));
        menuItem.classList.add('active');
    }
    
    // Update hero content
    renderArtistInfo(selectedArtist);
    
    // Clear any existing localStorage value
    localStorage.removeItem('selectedArtist');
}

class VerticalMenu {
    constructor() {
        // Prevent multiple instances
        if (VerticalMenu.instance) {
            return VerticalMenu.instance;
        }
        VerticalMenu.instance = this;
        
        this.config = {
            pages: {
                home: 'home',
                artists: 'artists',
                gallery: 'gallery',
                flashDeals: 'flash-deals',
                contact: 'contact'
            },
            sections: {
                contact: {
                    'contact-form': 'content-container', // hoặc id section thực tế nếu có
                    'google-map': 'content-container', // hoặc id section thực tế nếu có
                    'review': 'content-container' // hoặc id section thực tế nếu có
                }
            }
        };
        
        // Initialize immediately if DOM is ready
        if (document.readyState === 'loading') {
            document.addEventListener('DOMContentLoaded', () => this.setup());
        } else {
            this.setup();
        }
    }

    setup() {
        try {
            this.currentPage = document.body.dataset.page;
            this.mainMenuItems = document.querySelector('.main-menu-items');
            this.contactMenuItems = document.querySelector('.contact-menu-items');
            this.artistsMenuItems = document.querySelector('.artists-menu-items');
            this.menuItems = document.querySelectorAll('.menu-item');

            // Gallery menu elements
            this.galleryTabSelector = document.querySelector('.gallery-tab-selector');
            this.galleryArtistMenuItems = document.querySelector('.gallery-artist-menu-items');
            this.stylesMenuItems = document.querySelector('.styles-menu-items');
            this.galleryTabBtns = document.querySelectorAll('.gallery-tab-btn');

            if (!this.mainMenuItems || !this.contactMenuItems || !this.artistsMenuItems) {
                throw new Error('Required menu containers not found');
            }

            this.updateMenuVisibility();
            this.setupEventListeners();

            // Gallery: setup tab switching
            if (this.currentPage === this.config.pages.gallery) {
                this.setupGalleryTabs();
            }

            // Restore selected artist if on artists page
            if (this.currentPage === this.config.pages.artists) {
                // Override the content/artists-content.html script
                const script = document.querySelector('script[src="../js/artists-banner.js"]');
                if (script) {
                    script.addEventListener('load', () => {
                        // Wait for banner to initialize
                        setTimeout(() => {
                            restoreArtistState();
                        }, 100);
                    });
                }
            }
        } catch (error) {
            console.error('Error setting up VerticalMenu:', error);
        }
    }

    updateMenuVisibility() {
        const isContactPage = this.currentPage === this.config.pages.contact;
        const isArtistsPage = this.currentPage === this.config.pages.artists;
        const isGalleryPage = this.currentPage === this.config.pages.gallery;
        // Hide all specific menus first
        this.contactMenuItems.style.display = 'none';
        this.artistsMenuItems.style.display = 'none';
        if (this.galleryTabSelector) this.galleryTabSelector.style.display = 'none';
        if (this.galleryArtistMenuItems) this.galleryArtistMenuItems.style.display = 'none';
        if (this.stylesMenuItems) this.stylesMenuItems.style.display = 'none';
        // Show appropriate menu based on current page
        if (isContactPage) {
            this.mainMenuItems.style.display = 'none';
            this.contactMenuItems.style.display = 'block';
        } else if (isArtistsPage) {
            this.mainMenuItems.style.display = 'none';
            this.artistsMenuItems.style.display = 'block';
        } else if (isGalleryPage) {
            this.mainMenuItems.style.display = 'none';
            if (this.galleryTabSelector) this.galleryTabSelector.style.display = 'flex';
            // Default: show ARTIST tab
            if (this.galleryArtistMenuItems) this.galleryArtistMenuItems.style.display = 'block';
            if (this.stylesMenuItems) this.stylesMenuItems.style.display = 'none';
        } else {
            this.mainMenuItems.style.display = 'block';
        }
    }

    setupEventListeners() {
        this.menuItems.forEach(item => {
            item.addEventListener('click', () => {
                const section = item.dataset.section;
                this.handleNavigation(section);
            });
        });
    }

    handleNavigation(section) {
        if (this.currentPage === this.config.pages.contact) {
            this.handleContactNavigation(section);
        } else if (this.currentPage === this.config.pages.artists) {
            this.handleArtistsNavigation(section);
        } else {
            this.handleMainNavigation(section);
        }
    }

    handleContactNavigation(section) {
        const targetSection = this.config.sections.contact[section];
        if (targetSection) {
            const element = document.querySelector(`#${targetSection}`);
            if (element) {
                element.scrollIntoView({ behavior: 'smooth' });
            }
        }
    }

    handleArtistsNavigation(section) {
        renderArtistInfo(section);
        // Save to localStorage only when explicitly changed by user
        localStorage.setItem('selectedArtist', section);
    }

    handleMainNavigation(section) {
        const pageMap = {
            'studio': '../index.html',
            'artists': '../artist.html',
            'gallery': '../gallery.html',
            'flash': '../flash-deal.html',
            'contact': '../contact.html'
        };

        const targetPage = pageMap[section];
        if (targetPage && targetPage !== `${this.currentPage}.html`) {
            window.location.href = targetPage;
        }
    }

    setupGalleryTabs() {
        if (!this.galleryTabBtns) return;
        // Default: ARTIST tab active
        this.galleryTabBtns.forEach(btn => btn.classList.remove('active'));
        if (this.galleryTabBtns[0]) this.galleryTabBtns[0].classList.add('active');
        if (this.galleryArtistMenuItems) this.galleryArtistMenuItems.style.display = 'block';
        if (this.stylesMenuItems) this.stylesMenuItems.style.display = 'none';
        this.galleryTabBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.galleryTabBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                if (btn.dataset.galleryTab === 'artist') {
                    if (this.galleryArtistMenuItems) this.galleryArtistMenuItems.style.display = 'block';
                    if (this.stylesMenuItems) this.stylesMenuItems.style.display = 'none';
                } else {
                    if (this.galleryArtistMenuItems) this.galleryArtistMenuItems.style.display = 'none';
                    if (this.stylesMenuItems) this.stylesMenuItems.style.display = 'block';
                }
            });
        });
    }
}

// Immediately restore artist state if on artists page
if (document.body.dataset.page === 'artists') {
    // Wait for content to be loaded
    setTimeout(() => restoreArtistState(), 100);
}