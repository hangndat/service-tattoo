class ComponentLoader {
    constructor() {
        this.page = document.body.dataset.page;
        this.loadPromises = new Map(); // Cache promises to prevent multiple fetches
        this.components = [
            // Shared components (load tất cả trang)
            { file: 'components/header.html', container: 'header-container', shared: true },
            { file: 'components/vertical-menu.html', container: 'vertical-menu-container', shared: true },
            // Page-specific content
            { file: `content/${this.page}-content.html`, container: 'content-container', shared: false },
            // Footer component (load tất cả trang)
            { file: 'components/footer.html', container: 'footer-container', shared: true }
        ];

        // Add artists specific scripts
        if (this.page === 'artists') {
            this.components.push(
                { file: 'js/artists-data.js', type: 'script' },
                { file: 'js/artists-banner.js', type: 'script' }
            );
        }

        // Add home specific script for banner
        if (this.page === 'home') {
            this.components.push(
                { file: 'js/home-banner.js', type: 'script' }
            );
        }

        this.loadAllComponents();
    }

    async loadComponent(componentPath, containerId, type = 'html', shared = false) {
        try {
            if (type === 'script') {
                return new Promise((resolve, reject) => {
                    const script = document.createElement('script');
                    script.src = componentPath;
                    script.onload = resolve;
                    script.onerror = reject;
                    document.body.appendChild(script);
                });
            }

            const container = document.getElementById(containerId);
            if (!container) return;

            // For shared components, check if already loaded
            if (shared && container.children.length > 0) {
                return;
            }

            // Check if we're already loading this component
            if (this.loadPromises.has(componentPath)) {
                const html = await this.loadPromises.get(componentPath);
                container.innerHTML = html;
                return;
            }

            // Create new promise for this component
            const loadPromise = fetch(componentPath)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! status: ${response.status}`);
                    }
                    return response.text();
                });

            this.loadPromises.set(componentPath, loadPromise);
            const html = await loadPromise;
            
            container.innerHTML = html;
            
        } catch (error) {
            console.error(`Error loading component ${componentPath}:`, error);
        }
    }

    async loadAllComponents() {
        const loadPromises = this.components.map(component => 
            this.loadComponent(component.file, component.container, component.type, component.shared)
        );
        
        try {
            await Promise.all(loadPromises);
            // Dispatch event when all components are loaded
            document.dispatchEvent(new CustomEvent('componentsLoaded'));
        } catch (error) {
            console.error('Error loading components:', error);
        }
    }
}

// Initialize component loader when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    new ComponentLoader();
});