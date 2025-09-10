// mobile-banner.js — Hero swipe + dots cho MOBILE (home + artists)
(function () {
  const isMobile = () => window.innerWidth <= 768;

  function initHero(container) {
    if (!container || !isMobile()) return;

    let imgs = Array.from(container.querySelectorAll('img'));
    if (imgs.length <= 1) return;

    let track = container.querySelector('.hero-swipe-track');
    if (!track) {
      track = document.createElement('div');
      track.className = 'hero-swipe-track';
      container.appendChild(track);
      imgs.forEach(img => track.appendChild(img));
    }
    imgs = Array.from(track.querySelectorAll('img'));

    let dotsWrap = container.querySelector('.banner-dots');
    if (!dotsWrap) {
      dotsWrap = document.createElement('div');
      dotsWrap.className = 'banner-dots';
      container.appendChild(dotsWrap);
    } else {
      dotsWrap.innerHTML = '';
    }
    imgs.forEach((_img, i) => {
      const d = document.createElement('span');
      d.className = 'banner-dot' + (i === 0 ? ' active' : '');
      d.dataset.index = i;
      dotsWrap.appendChild(d);
    });

    let index = 0;
    let startX = 0, curX = 0, touching = false, threshold = 40, dragging = false;

    function applyActive(newIdx, hint = 0) {
      imgs.forEach((img, i) => {
        img.classList.toggle('active', i === newIdx);
        img.classList.toggle('to-left', i === newIdx && hint < 0);
        img.classList.toggle('to-right', i === newIdx && hint > 0);
        if (i !== newIdx) { img.classList.remove('to-left'); img.classList.remove('to-right'); }
      });
      dotsWrap.querySelectorAll('.banner-dot').forEach((d, i) => d.classList.toggle('active', i === newIdx));
    }
    applyActive(index, 0);

    function go(delta) {
      const next = Math.max(0, Math.min(imgs.length - 1, index + delta));
      if (next !== index) {
        index = next;
        applyActive(index, 0);
      } else {
        applyActive(index, 0);
      }
    }

    function onStart(e) {
      if (!isMobile()) return;
      touching = true; dragging = false;
      startX = (e.touches ? e.touches[0].clientX : e.clientX);
      curX = startX;
    }
    function onMove(e) {
      if (!touching) return;
      const x = (e.touches ? e.touches[0].clientX : e.clientX);
      const dx = x - startX;
      curX = x;
      if (Math.abs(dx) > 4) dragging = true;
      if (dragging) applyActive(index, Math.sign(dx));
    }
    function onEnd() {
      if (!touching) return;
      touching = false;
      const dx = curX - startX;
      if (Math.abs(dx) > threshold) {
        go(dx < 0 ? +1 : -1);
      } else {
        applyActive(index, 0);
      }
    }

    track.addEventListener('touchstart', onStart, { passive: true });
    track.addEventListener('touchmove', onMove, { passive: true });
    track.addEventListener('touchend', onEnd);
    track.addEventListener('mousedown', onStart);
    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseup', onEnd);

    dotsWrap.addEventListener('click', (e) => {
      const dot = e.target.closest('.banner-dot');
      if (!dot) return;
      const i = Number(dot.dataset.index);
      if (!Number.isNaN(i)) { index = i; applyActive(index, 0); }
    });
  }

  function boot() {
    if (!isMobile()) return;
    document.querySelectorAll('.hero-section .hero-image').forEach(initHero);
    document.querySelectorAll('.hero-section.hero-artists .hero-image, .artist-section .hero-image').forEach(initHero);
  }

  document.addEventListener('componentsLoaded', boot);
  document.addEventListener('DOMContentLoaded', boot);
  window.addEventListener('resize', boot);
})();
