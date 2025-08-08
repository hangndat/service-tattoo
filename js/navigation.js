class Navigation {
    constructor() {
        // Prevent multiple instances
        if (Navigation.instance) {
            return Navigation.instance;
        }
        Navigation.instance = this;
        
        this.navLinks = document.querySelectorAll('.nav-menu a');
        this.init();
    }

    init() {
        // Set initial active state
        this.setInitialActiveState();
        
        // Use event delegation for better performance
        const navMenu = document.querySelector('.nav-menu');
        if (navMenu) {
            navMenu.addEventListener('click', this.handleClick.bind(this), { passive: true });
        }
    }

    handleClick(event) {
        if (event.target.tagName === 'A') {
            this.navLinks.forEach(l => l.classList.remove('active'));
            event.target.classList.add('active');
        }
    }

    setInitialActiveState() {
        const currentPage = window.location.pathname.split('/').pop();
        
        // Check if we're on home page
        if (currentPage === '' || currentPage === 'index.html' || currentPage === undefined) {
            const homeLink = document.querySelector('.nav-menu a[href="../index.html"]');
            if (homeLink) {
                homeLink.classList.add('active');
            }
        } else {
            // Find matching link for current page
            this.navLinks.forEach(link => {
                const linkPage = link.getAttribute('href').split('/').pop();
                if (linkPage === currentPage) {
                    link.classList.add('active');
                }
            });
        }
    }
}

// Initialize navigation when components are loaded
document.addEventListener('componentsLoaded', () => {
    new Navigation();
});