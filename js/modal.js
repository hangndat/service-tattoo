// js/modal.js
(function() {
let modalCurrentImageIndex = 0;
let modalImageList = [];

function createModal() {
    if (document.querySelector('.gallery-modal')) return;

    const modal = document.createElement('div');
    modal.className = 'gallery-modal';
    modal.innerHTML = `
        <div class="gallery-modal-content">
            <button class="gallery-modal-arrow gallery-modal-arrow-left" aria-label="Previous image">&#60;</button>
            <img class="gallery-modal-image" src="" alt="Gallery Image" width="1200" height="800">
            <button class="gallery-modal-arrow gallery-modal-arrow-right" aria-label="Next image">&#62;</button>
            <button class="gallery-modal-close">&times;</button>
        </div>
    `;
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    const closeBtn = modal.querySelector('.gallery-modal-close');
    if(closeBtn) closeBtn.addEventListener('click', closeModal);

    const leftArrow = modal.querySelector('.gallery-modal-arrow-left');
    const rightArrow = modal.querySelector('.gallery-modal-arrow-right');
    if (leftArrow) leftArrow.addEventListener('click', function(e) { e.stopPropagation(); navigateModal('prev'); });
    if (rightArrow) rightArrow.addEventListener('click', function(e) { e.stopPropagation(); navigateModal('next'); });

    document.addEventListener('keydown', handleModalKeydown);
    document.body.appendChild(modal);
}

function handleModalKeydown(e) {
    const modal = document.querySelector('.gallery-modal');
    if (!modal || !modal.classList.contains('active')) return;
    
    switch(e.key) {
        case 'Escape': closeModal(); break;
        case 'ArrowLeft': navigateModal('prev'); break;
        case 'ArrowRight': navigateModal('next'); break;
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
    createModal();
    const modal = document.querySelector('.gallery-modal');
    
    modalImageList = imageList;
    modalCurrentImageIndex = startIndex;
    
    updateModalImage();
    
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
}

function closeModal() {
    const modal = document.querySelector('.gallery-modal');
    if (modal) {
        modal.classList.remove('active');
        document.body.style.overflow = '';
        modalImageList = [];
        modalCurrentImageIndex = 0;
    }
}
window.openModal = openModal;
})(); 