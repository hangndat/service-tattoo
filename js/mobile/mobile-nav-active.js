// Mobile Navigation Active State Manager
class MobileNavActiveManager {
    constructor() {
        this.isMobile = window.innerWidth <= 768;
        this.currentPage = this.getCurrentPage();
        this.init();
    }

    init() {
        if (!this.isMobile) return;
        
        // Wait for components to load
        document.addEventListener('componentsLoaded', () => {
            this.setupActiveState();
        });
    }

    getCurrentPage() {
        const body = document.body;
        const page = body.dataset.page;
        
        // Map page names to menu items
        const pageMap = {
            'home': 'index.html',
            'artists': 'artist.html', 
            'gallery': 'gallery.html',
            'contact': 'contact.html'
        };
        
        return pageMap[page] || 'index.html';
    }

    setupActiveState() {
        const mobileNavItems = document.querySelectorAll('.mobile-nav-item');
        
        mobileNavItems.forEach(item => {
            const href = item.getAttribute('href');
            
            // Check if href exists before using replace
            if (href) {
                // Remove ../ from href for comparison
                const cleanHref = href.replace('../', '');
                
                if (cleanHref === this.currentPage) {
                    item.classList.add('active');
                } else {
                    item.classList.remove('active');
                }
            }
        });
    }
}

// Initialize mobile nav active manager when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    new MobileNavActiveManager();
});

// Re-initialize on resize
window.addEventListener('resize', () => {
    if (window.innerWidth <= 768) {
        new MobileNavActiveManager();
    }
}); 