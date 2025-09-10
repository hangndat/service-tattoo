// Gallery styles data
const galleryStyles = [
    {
        key: 'old-school',
        name: 'OLD SCHOOL - TRADITIONAL',
        images: [
            './images/galleryPages/demo-1/banhius-6.jpg',
            './images/galleryPages/demo-1/banhius-7.jpg',
            './images/galleryPages/demo-1/banhius-8.jpg',
            './images/galleryPages/demo-1/banhius-9.jpg',
            './images/galleryPages/demo-1/banhius-10.jpg',
            './images/galleryPages/demo-1/banhius-11.jpg',
            './images/galleryPages/demo-1/banhius-12.jpg',
            './images/galleryPages/demo-1/banhius-13.jpg',
            './images/galleryPages/demo-1/banhius-14.jpg',
            './images/galleryPages/demo-1/banhius-15.jpg',
            './images/galleryPages/demo-3/trinhius-6.jpg',
            './images/galleryPages/demo-3/trinhius-7.jpg',
            './images/galleryPages/demo-3/trinhius-8.jpg',
            './images/galleryPages/demo-3/trinhius-9.jpg',
            './images/galleryPages/demo-2/namius-6.jpg',
            './images/galleryPages/demo-2/namius-7.jpg',
            './images/galleryPages/demo-2/namius-8.jpg',
            './images/galleryPages/demo-2/namius-9.jpg',
            './images/galleryPages/demo-2/namius-10.jpg',
            './images/galleryPages/demo-2/namius-11.jpg',
            './images/galleryPages/demo-2/namius-12.jpg',
        ]
    },
    {
        key: 'neo-traditional',
        name: 'NEO TRADITIONAL',
        images: [
            './images/galleryPages/demo-2/namius-6.jpg',
            './images/galleryPages/demo-2/namius-7.jpg',
            './images/galleryPages/demo-2/namius-8.jpg',
            './images/galleryPages/demo-2/namius-9.jpg',
            './images/galleryPages/demo-2/namius-10.jpg',
            './images/galleryPages/demo-2/namius-11.jpg',
            './images/galleryPages/demo-2/namius-12.jpg',
        ]
    },
    {
        key: 'realistic',
        name: 'REALISTIC',
        images: [
            './images/Trinh-gallery/Trinh1.jpg',
            './images/Trinh-gallery/Trinh2.jpg',
            './images/Trinh-gallery/Trinh3.jpg'
        ]
    },
    {
        key: 'fine-line',
        name: 'FINE LINE',
        images: [
            './images/Banh-gallery/Banh1.jpg',
            './images/Nam-gallery/Nam1.jpg',
            './images/Trinh-gallery/Trinh1.jpg'
        ]
    },
    {
        key: 'big-work',
        name: 'BIG WORK',
        images: [
            './images/Banh-gallery/Banh2.jpg',
            './images/Nam-gallery/Nam2.jpg',
            './images/Trinh-gallery/Trinh2.jpg'
        ]
    },
    {
        key: 'small-work',
        name: 'SMALL WORK',
        images: [
            './images/Banh-gallery/Banh.jpg',
            './images/Nam-gallery/Nam3.jpg',
            './images/Trinh-gallery/Trinh3.jpg'
        ]
    },
    {
        key: 'blackwork',
        name: 'BLACKWORK',
        images: [
            './images/Banh-gallery/Banh1.jpg',
            './images/Nam-gallery/Nam1.jpg',
            './images/Trinh-gallery/Trinh2.jpg'
        ]
    },
    {
        key: 'asia-tattoo',
        name: 'ASIA TATTOO',
        images: [
            './images/Banh-gallery/Banh2.jpg',
            './images/Nam-gallery/Nam2.jpg',
            './images/Trinh-gallery/Trinh1.jpg'
        ]
    }
];

// Artist data with their images
const galleryArtists = [
    { 
        key: 'banh', 
        name: 'BANH',
        images: [
            './images/galleryPages/banh-products/banh-1.jpg',
            './images/galleryPages/banh-products/banh-2.jpg',
            './images/galleryPages/banh-products/banh-3.jpg',
            './images/galleryPages/banh-products/banh-4.jpg',
            './images/galleryPages/banh-products/banh-5.jpg',
            './images/galleryPages/banh-products/banh-6.jpg',
            './images/galleryPages/banh-products/banh-7.jpg',
            './images/galleryPages/banh-products/banh-8.jpg',
            './images/galleryPages/banh-products/banh-9.jpg',
            './images/galleryPages/banh-products/banh-10.jpg',
            './images/galleryPages/banh-products/banh-11.jpg',
            './images/galleryPages/banh-products/banh-12.jpg',
            './images/galleryPages/banh-products/banh-13.jpg',
            './images/galleryPages/banh-products/banh-14.jpg'
        ]
    },
    { 
        key: 'nam-n2n', 
        name: 'NAM - N2N',
        images: [
            './images/galleryPages/nam-products/nam-1.jpg',
            './images/galleryPages/nam-products/nam-2.jpg',
            './images/galleryPages/nam-products/nam-3.jpg',
            './images/galleryPages/nam-products/nam-4.jpg',
            './images/galleryPages/nam-products/nam-5.jpg'
        ]
    },
    { 
        key: 'trinh-reklezz', 
        name: 'TRINH - REKLEZZ',
        images: [
            './images/galleryPages/trinh-products/trinh-1.jpg',
            './images/galleryPages/trinh-products/trinh-2.jpg',
            './images/galleryPages/trinh-products/trinh-3.jpg',
            './images/galleryPages/trinh-products/trinh-4.jpg',
            './images/galleryPages/trinh-products/trinh-5.jpg',
            './images/galleryPages/trinh-products/trinh-6.jpg',
            './images/galleryPages/trinh-products/trinh-7.jpg',
            './images/galleryPages/trinh-products/trinh-8.jpg',
            './images/galleryPages/trinh-products/trinh-9.jpg',
            './images/galleryPages/trinh-products/trinh-10.jpg'
        ]
    },
    { key: 'bui', name: 'BUI', images: [] }
];

let currentStyleIndex = 0;
let currentBannerIndex = 0;
let bannerInterval = null;
let currentArtist = 'banh'; // Default to BANH

// Modal navigation state
let modalCurrentImageIndex = 0;
let modalImageList = [];

// Create modal element
function createModal() {
    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="gallery-modal-content">
            <button class="gallery-modal-close" aria-label="Close">×</button>
            <button class="gallery-modal-arrow gallery-modal-arrow-left" aria-label="Prev">‹</button>
            <img class="gallery-modal-image" alt="Preview"/>
            <button class="gallery-modal-arrow gallery-modal-arrow-right" aria-label="Next">›</button>
        </div>
    `;
    
    // Close modal events
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal();
        }
    });
    
    const closeBtn = modal.querySelector('.gallery-modal-close');
    closeBtn.addEventListener('click', closeModal);
    
    // Keyboard navigation
    document.addEventListener('keydown', handleModalKeydown);
    
    // Gắn sự kiện cho mũi tên
    const leftArrow = modal.querySelector('.gallery-modal-arrow-left');
    const rightArrow = modal.querySelector('.gallery-modal-arrow-right');
    if (leftArrow) leftArrow.addEventListener('click', function(e) { e.stopPropagation(); navigateModal('prev'); });
    if (rightArrow) rightArrow.addEventListener('click', function(e) { e.stopPropagation(); navigateModal('next'); });
    
    document.body.appendChild(modal);
    return modal;
}

function handleModalKeydown(e) {
    const modal = document.querySelector('.gallery-modal');
    if (!modal || !modal.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape':
            closeModal();
            break;
        case 'ArrowLeft':
            navigateModal('prev');
            break;
        case 'ArrowRight':
            navigateModal('next');
            break;
    }
}

function navigateModal(direction) {
    if (modalImageList.length === 0) return;
    
    if (direction === 'prev') {
        modalCurrentImageIndex = (modalCurrentImageIndex - 1 + modalImageList.length) % modalImageList.length;
    } else if (direction === 'next') {
        modalCurrentImageIndex = (modalCurrentImageIndex + 1) % modalImageList.length;
    }
    
    updateModalImage();
}

function updateModalImage() {
    const modal = document.querySelector('.gallery-modal');
    if (!modal) return;
    
    const modalImage = modal.querySelector('.gallery-modal-image');
    const currentImageSrc = modalImageList[modalCurrentImageIndex];
    
    if (currentImageSrc) {
        modalImage.src = currentImageSrc;
        modalImage.alt = `Gallery Image ${modalCurrentImageIndex + 1}`;
    }
}

function openModal(imageSrc, imageList = [], startIndex = 0) {
    const modal = document.querySelector('.gallery-modal') || createModal();
    
    // Set modal state
    modalImageList = imageList;
    modalCurrentImageIndex = startIndex;
    
    // Update modal image
    updateModalImage();
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.querySelector('.gallery-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        
        // Reset modal state
        modalImageList = [];
        modalCurrentImageIndex = 0;
    }
}

function renderGalleryGrid(artistKey) {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;
    
    grid.innerHTML = '';
    
    const artist = galleryArtists.find(a => a.key === artistKey);
    if (!artist || !artist.images.length) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #666; padding: 40px;">No images available for this artist yet.</div>';
        return;
    }
    
    artist.images.forEach((src, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-grid-item';
        
        const img = document.createElement('img');
        img.src = src;
        img.alt = `${artist.name} - Image ${index + 1}`;
        img.className = 'gallery-grid-item-img';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        // Thêm width/height thực tế của ảnh (giả sử 1200x800, có thể chỉnh lại nếu biết chính xác)
        img.width = 1200;
        img.height = 800;
        img.loading = 'lazy';
        
        item.appendChild(img);
        
        // Click to open modal with navigation
        item.addEventListener('click', () => {
            openModal(src, artist.images, index);
        });
        
        grid.appendChild(item);
    });
}

// Hàm cập nhật hero-content cho gallery
function updateGalleryHeroContent(artistKey) {
    if (!window.artistsData) return;
    const heroTitle = document.querySelector('.hero-title');
    const heroDescription = document.querySelector('.hero-description');
    const igBtn = document.querySelector('.hero-instagram-btn');
    if (!heroTitle || !heroDescription) return;
    const data = window.artistsData[artistKey];
    if (data) {
        heroTitle.textContent = data.title;
        heroDescription.textContent = data.description;
        if (igBtn) igBtn.href = data.instagram || '#';
    }
}

function renderGalleryArtistMenu() {
    const menu = document.querySelector('.gallery-artist-menu-items');
    if (!menu) return;
    menu.innerHTML = '';
    galleryArtists.forEach((artist, idx) => {
        const item = document.createElement('div');
        item.className = 'menu-item' + (artist.key === currentArtist ? ' active' : '');
        item.setAttribute('data-gallery-artist', artist.key);
        item.innerHTML = `<span class="menu-number">${(idx+1).toString().padStart(2, '0')}</span><span class="menu-text">${artist.name}</span>`;
        item.addEventListener('click', () => {
            document.querySelectorAll('.gallery-artist-menu-items .menu-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            currentArtist = artist.key;
            renderGalleryGrid(currentArtist);
            updateGalleryHeroContent(currentArtist);
            const gridContainer = document.querySelector('.gallery-grid-container');
            if (gridContainer) gridContainer.scrollTop = 0;
            // Reset hiệu ứng hero-content
            const heroEls = document.querySelectorAll('.hero-content .slide-in-left');
            heroEls.forEach(el => el.classList.remove('is-animated'));
            setTimeout(() => animateSlideInLeft('.hero-content .slide-in-left', 120), 10);
        });
        menu.appendChild(item);
    });
    // Khi render menu lần đầu cũng cập nhật hero-content
    updateGalleryHeroContent(currentArtist);
    const heroEls = document.querySelectorAll('.hero-content .slide-in-left');
    heroEls.forEach(el => el.classList.remove('is-animated'));
    setTimeout(() => animateSlideInLeft('.hero-content .slide-in-left', 120), 10);
}

function renderGalleryStylesMenu() {
    const menu = document.querySelector('.styles-menu-items');
    if (!menu) return;
    menu.innerHTML = '';
    galleryStyles.forEach((style, idx) => {
        const item = document.createElement('div');
        item.className = 'menu-item' + (idx === 0 ? ' active' : '');
        item.setAttribute('data-gallery-style', style.key);
        item.innerHTML = `<span class="menu-number">${(idx+1).toString().padStart(2, '0')}</span><span class="menu-text">${style.name}</span>`;
        item.addEventListener('click', () => {
            document.querySelectorAll('.styles-menu-items .menu-item').forEach(i => i.classList.remove('active'));
            item.classList.add('active');
            currentStyleIndex = idx;
            // renderGalleryGrid(currentArtist);
            renderGalleryGridFromStyle(currentStyleIndex)
            const gridContainer = document.querySelector('.gallery-grid-container');
            if (gridContainer) gridContainer.scrollTop = 0;
            updateGalleryHeroContent(currentArtist);
            // Reset hiệu ứng hero-content
            const heroEls = document.querySelectorAll('.hero-content .slide-in-left');
            heroEls.forEach(el => el.classList.remove('is-animated'));
            setTimeout(() => animateSlideInLeft('.hero-content .slide-in-left', 120), 10);
        });
        menu.appendChild(item);
    });
    updateGalleryHeroContent(currentArtist);
    const heroEls = document.querySelectorAll('.hero-content .slide-in-left');
    heroEls.forEach(el => el.classList.remove('is-animated'));
    setTimeout(() => animateSlideInLeft('.hero-content .slide-in-left', 120), 10);
}

// Setup gallery tab switching
function setupGalleryTabSwitching() {
    const tabBtns = document.querySelectorAll('.gallery-tab-btn');
    if (!tabBtns.length) return;

    tabBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            tabBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            if (btn.dataset.galleryTab === 'artist') {
                document.querySelector('.gallery-artist-menu-items').style.display = 'block';
                document.querySelector('.styles-menu-items').style.display = 'none';

                renderGalleryArtistMenu();
                renderGalleryGrid(currentArtist); // ✅ Hiển thị đúng artist (mặc định là Banh)
                updateGalleryHeroContent(currentArtist);
            } else {
                document.querySelector('.gallery-artist-menu-items').style.display = 'none';
                document.querySelector('.styles-menu-items').style.display = 'block';

                renderGalleryStylesMenu();
                renderGalleryGridFromStyle(0); // ✅ Hiển thị đúng style (mặc định Old School)
                // Nếu có heroContent riêng cho style thì sửa luôn ở đây nếu cần
            }

            // Reset scroll & hiệu ứng hero
            const gridContainer = document.querySelector('.gallery-grid-container');
            if (gridContainer) gridContainer.scrollTop = 0;
            const heroEls = document.querySelectorAll('.hero-content .slide-in-left');
            heroEls.forEach(el => el.classList.remove('is-animated'));
            setTimeout(() => animateSlideInLeft('.hero-content .slide-in-left', 120), 10);
        });
    });
}


// Animation for hero content (slide-in-left)
function animateSlideInLeft(selector = '.slide-in-left', stagger = 80) {
  const animatedEls = document.querySelectorAll(selector);
  animatedEls.forEach((el, idx) => {
    setTimeout(() => {
      el.classList.add('is-animated');
    }, idx * stagger);
  });
}

// Initialize gallery
function galleryInit() {
     const isMobile = window.innerWidth <= 768;

  if (isMobile) {
    try {
      const savedArtist = localStorage.getItem('currentArtist');
      if (savedArtist) currentArtist = savedArtist;

      const savedStyle = localStorage.getItem('currentStyleIndex');
      if (savedStyle !== null) currentStyleIndex = parseInt(savedStyle, 10);
    } catch (e) { /* ignore */ }
  } else {
    currentArtist = 'banh';
    currentStyleIndex = 0;
  }

  // luôn render cả 2 menu (ẩn/hiện bằng tab)
  renderGalleryArtistMenu();
  renderGalleryStylesMenu();
  setupGalleryTabSwitching();

  const artistMenu = document.querySelector('.gallery-artist-menu-items');
  const styleMenu = document.querySelector('.styles-menu-items');

  // Ưu tiên tab đã lưu
  const savedTab = localStorage.getItem('galleryTab'); // 'artist' | 'style'
  const useStyle = savedTab === 'style';

  if (artistMenu) artistMenu.style.display = useStyle ? 'none' : 'block';
  if (styleMenu)  styleMenu.style.display  = useStyle ? 'block' : 'none';

  if (useStyle) {
    renderGalleryGridFromStyle(currentStyleIndex || 0);
  } else {
    renderGalleryGrid(currentArtist);
  }

  updateGalleryHeroContent(currentArtist);
  animateSlideInLeft('.hero-content .slide-in-left', 120);
}

function renderGalleryGridFromStyle(styleIndex) {
    const grid = document.getElementById('galleryGrid');
    if (!grid) return;

    grid.innerHTML = '';

    const style = galleryStyles[styleIndex];
    if (!style || !style.images.length) {
        grid.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #666; padding: 40px;">No images available for this style yet.</div>';
        return;
    }

    style.images.forEach((src, index) => {
        const item = document.createElement('div');
        item.className = 'gallery-grid-item';

        const img = document.createElement('img');
        img.src = src;
        img.alt = `${style.name} - Image ${index + 1}`;
        img.className = 'gallery-grid-item-img';
        img.style.width = '100%';
        img.style.height = '100%';
        img.style.objectFit = 'cover';
        img.width = 1200;
        img.height = 800;
        img.loading = 'lazy';

        item.appendChild(img);
        item.addEventListener('click', () => {
            openModal(src, style.images, index);
        });

        grid.appendChild(item);
    });
}


document.addEventListener('componentsLoaded', function() {
    galleryInit();
    setTimeout(function() {
        var igBtn = document.querySelector('.hero-instagram-btn');
        if (igBtn) igBtn.classList.add('slide-in-instagram');
    }, 100);
}); 