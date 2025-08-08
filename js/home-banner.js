// Banner functionality for Home page
class HomeBanner {
    constructor() {
        this.currentIndex = 0;
        this.slideInterval = null;
        this.images = [
            './images/Home-page-gallery/home.png',
            './images/Banh-gallery/Banh4.png',
            './images/Nam-gallery/Nam4.png',
            './images/Trinh-gallery/Trinh4.png',
        ];
        this.imageElements = [];
        this.dots = [];
        this.heroImage = null;
    }

    preloadImages(callback) {
        let loaded = 0;
        this.images.forEach(src => {
            const img = new window.Image();
            img.src = src;
            img.onload = img.onerror = () => {
                loaded++;
                if (loaded === this.images.length) callback();
            };
        });
    }

    init() {
        this.heroImage = document.getElementById('heroImage');
        if (!this.heroImage) return;

        // Clear old content
        this.heroImage.innerHTML = '';

        // Create image elements
        this.imageElements = this.images.map((src, i) => {
            const img = document.createElement('img');
            img.src = src;
            img.alt = `Home Banner ${i + 1}`;
            img.className = 'banner-img' + (i === 0 ? ' active' : '');
            img.style.opacity = i === 0 ? '1' : '0';
            img.style.transition = 'opacity 0.7s cubic-bezier(.4,0,.2,1)';
            img.style.position = 'absolute';
            img.style.top = img.style.left = img.style.right = img.style.bottom = '0';
            img.style.width = 'auto';
            img.style.height = 'auto';
            img.style.maxWidth = '100%';
            img.style.maxHeight = '100%';
            img.style.objectFit = 'contain';
            img.style.padding = '12px';
            img.style.borderRadius = '8px';
            img.style.pointerEvents = i === 0 ? 'auto' : 'none';
            img.loading = 'lazy';
            // Thêm width/height thực tế của ảnh (giả sử 1200x800, có thể chỉnh lại nếu biết chính xác)
            img.width = 1200;
            img.height = 800;
            this.heroImage.appendChild(img);
            return img;
        });

        // Create dot navigation
        const nav = document.createElement('div');
        nav.className = 'banner-nav';
        nav.setAttribute('role', 'navigation');
        nav.setAttribute('aria-label', 'Image navigation');
        this.dots = this.images.map((_, i) => {
            const dot = document.createElement('div');
            dot.className = 'banner-dot' + (i === 0 ? ' active' : '');
            dot.setAttribute('role', 'button');
            dot.setAttribute('aria-label', `Image ${i + 1}`);
            dot.setAttribute('tabindex', '0');
            dot.addEventListener('click', () => this.goTo(i));
            nav.appendChild(dot);
            return dot;
        });
        this.heroImage.appendChild(nav);

        // Mouse events
        this.heroImage.addEventListener('mouseenter', () => this.pause());
        this.heroImage.addEventListener('mouseleave', () => this.resume());

        // Start slideshow
        this.resume();
    }

    show(index) {
        this.imageElements.forEach((img, i) => {
            img.classList.remove('slide-in-left', 'is-animated');
            if (i === index) {
                img.classList.add('active');
                img.style.opacity = '1';
                img.style.pointerEvents = 'auto';
                // Thêm hiệu ứng động
                setTimeout(() => {
                    img.classList.add('slide-in-left');
                    setTimeout(() => img.classList.add('is-animated'), 10);
                }, 10);
            } else {
                img.classList.remove('active');
                img.style.opacity = '0';
                img.style.pointerEvents = 'none';
            }
        });
        this.dots.forEach((dot, i) => {
            dot.classList.toggle('active', i === index);
        });
        this.currentIndex = index;
    }

    next() {
        this.show((this.currentIndex + 1) % this.images.length);
    }

    goTo(index) {
        this.show(index);
        this.resume();
    }

    resume() {
        this.pause();
        this.slideInterval = setInterval(() => this.next(), 3000);
    }

    pause() {
        if (this.slideInterval) {
            clearInterval(this.slideInterval);
            this.slideInterval = null;
        }
    }
}

// Auto-init on componentsLoaded (sau khi content đã load xong)
document.addEventListener('componentsLoaded', () => {
    const heroImage = document.getElementById('heroImage');
    if (heroImage) {
        const banner = new HomeBanner();
        banner.preloadImages(() => banner.init());
    }
}); 