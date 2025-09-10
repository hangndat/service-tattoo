// // mobile-menu.js (UNIFIED, Flow B) — 1 menu duy nhất + dropdown các mục con
// document.addEventListener('componentsLoaded', function () {
//   const menuBtn = document.getElementById('mobileMenuToggle');
//   const closeBtn = document.getElementById('mobileMenuClose');
//   const nav = document.getElementById('mobileOnlyNav');
//   if (!menuBtn || !closeBtn || !nav) return;

//   const isMobile = () => window.innerWidth <= 768;
//   const currentPage = () => (document.body && document.body.dataset && document.body.dataset.page) || '';

//   // Open/Close
//   menuBtn.addEventListener('click', debounce(() => nav.classList.add('open'), 200));
//   closeBtn.addEventListener('click', debounce(() => nav.classList.remove('open'), 200));

//   // Helper: wait until condition true (avoid race with per-page scripts)
//   function waitUntil(testFn, { timeout = 10000, interval = 50 } = {}) {
//     return new Promise((resolve, reject) => {
//       const start = Date.now();
//       const timer = setInterval(() => {
//         try {
//           if (testFn()) {
//             clearInterval(timer);
//             resolve();
//           } else if (Date.now() - start > timeout) {
//             clearInterval(timer);
//             reject(new Error('waitUntil timeout'));
//           }
//         } catch (err) {
//           clearInterval(timer);
//           reject(err);
//         }
//       }, interval);
//     });
//   }

//   // React to artists data becoming ready
//   document.addEventListener('artistsDataReady', () => {
//     // no-op, just lets waitUntil resolve faster
//   });

//   // Dropdown toggle (hỗ trợ lồng nhau)
//   nav.querySelectorAll('.mobile-dropdown-toggle').forEach(toggle => {
//     toggle.addEventListener('click', function (e) {
//       e.stopPropagation();
//       const key = toggle.dataset.dropdown;
//       if (!key) return;
//       const menu = nav.querySelector(`.mobile-dropdown-menu[data-dropdown-menu="${key}"]`);
//       if (!menu) return;

//       // Đóng tất cả menu ngang cấp (chỉ cùng parentNode)
//       const siblings = [...toggle.parentNode.children];
//       siblings.forEach(el => {
//         if (el !== menu && el.classList?.contains('mobile-dropdown-menu')) el.classList.remove('open');
//         if (el !== toggle && el.classList?.contains('mobile-dropdown-toggle')) el.classList.remove('active');
//       });

//       // Toggle menu hiện tại
//       const willOpen = !menu.classList.contains('open');
//       if (willOpen) { menu.classList.add('open'); toggle.classList.add('active'); }
//       else { menu.classList.remove('open'); toggle.classList.remove('active'); }
//     });
//   });

//   // ========== NAV HELPERS (Flow B) ==========
//   function goTo(page) { window.location.href = page; }
//   function setActiveInMenu(selector, predicate) {
//     nav.querySelectorAll(selector).forEach(a => a.classList.toggle('active', predicate(a)));
//   }
//   function closeAll() {
//     nav.querySelectorAll('.mobile-dropdown-menu.open').forEach(m => m.classList.remove('open'));
//     nav.querySelectorAll('.mobile-dropdown-toggle.active').forEach(t => t.classList.remove('active'));
//     nav.classList.remove('open');
//   }

//   // ========== ARTISTS actions ==========
//   function handlePickArtist(artistKey) {
//     if (!artistKey) return;
//     if (!isMobile()) return;

//     if (currentPage() !== 'artists') {
//       // Save state then navigate
//       try { localStorage.setItem('selectedArtist', artistKey); } catch(_){}
//       goTo('../artist.html');
//       return;
//     }

//     // On artists page: ensure scripts ready then render
//     const doRender = () => {
//       if (window.banner?.switchArtist) window.banner.switchArtist(artistKey);
//       if (window.renderArtistInfo) window.renderArtistInfo(artistKey);
//       setActiveInMenu('[data-dropdown-menu="artists"] .mobile-dropdown-item,[data-dropdown-menu="artist"] .mobile-dropdown-item',
//         a => a.getAttribute('data-section') === artistKey);
//       closeAll();
//     };

//     if (!window.renderArtistInfo || !window.artistsData || !window.artistsData[artistKey]) {
//       waitUntil(() => window.renderArtistInfo && window.artistsData && window.artistsData[artistKey])
//         .then(doRender)
//         .catch(() => { console.warn('[mobile-menu] artistsData not ready in time (artists page)'); closeAll(); });
//     } else {
//       doRender();
//     }
//   }

//   nav.querySelectorAll('[data-dropdown-menu="artists"] .mobile-dropdown-item,[data-dropdown-menu="artist"] .mobile-dropdown-item')
//     .forEach(item => {
//       item.addEventListener('click', function (e) {
//         e.preventDefault();
//         handlePickArtist(item.getAttribute('data-section'));
//       });
//     });

//   // ========== GALLERY actions ==========
//   function handlePickStyleIndex(idx) {
//     const i = Number(idx);
//     if (Number.isNaN(i)) return;
//     if (!isMobile()) return;

//     // Lưu style đã chọn
//     try { localStorage.setItem('currentStyleIndex', String(i)); } catch(_){}

//     if (currentPage() !== 'gallery') {
//       // giữ currentArtist nếu user vừa pick ở menu artist
//       const activeArtistItem = nav.querySelector('[data-dropdown-menu="artist"] .mobile-dropdown-item.active');
//       const artistFromMenu = activeArtistItem?.getAttribute('data-section');
//       if (artistFromMenu) try { localStorage.setItem('currentArtist', artistFromMenu); } catch(_){}
//       goTo('../gallery.html');
//       return;
//     }

//     // Đang ở gallery page: render theo STYLE (luôn)
//     window.currentStyleIndex = i;
//     if (window.renderGalleryGridFromStyle) {
//       window.renderGalleryGridFromStyle(i);
//     }
//     if (window.updateGalleryHeroContentFromStyle) {
//       window.updateGalleryHeroContentFromStyle(i);
//     }
//     setActiveInMenu('[data-dropdown-menu="style"] .mobile-dropdown-item', (_a, j) => j === i);
//     closeAll();
//   }

//   nav.querySelectorAll('[data-dropdown-menu="style"] .mobile-dropdown-item')
//     .forEach((item, idx) => {
//       const styleIdx = item.getAttribute('data-style-index') ?? idx;
//       item.addEventListener('click', function (e) {
//         e.preventDefault();
//         handlePickStyleIndex(styleIdx);
//       });
//     });

//   // ========== CONTACT actions ==========
//   function handleContact(section) {
//     if (!section) return;
//     if (!isMobile()) return;
//     const typeMap = { 'contact-form': 'contact', 'google-map': 'map', 'review': 'review' };
//     const type = typeMap[section];

//     if (currentPage() !== 'contact') {
//       try { localStorage.setItem('contactTab', type || 'contact'); } catch(_){}
//       goTo('../contact.html');
//       return;
//     }

//     if (type && window.renderContactTab) window.renderContactTab(type);
//     setActiveInMenu('[data-dropdown-menu="contact"] .mobile-dropdown-item', a => a.getAttribute('data-section') === section);
//     closeAll();
//   }

//   nav.querySelectorAll('[data-dropdown-menu="contact"] .mobile-dropdown-item')
//     .forEach(item => {
//       item.addEventListener('click', function (e) {
//         e.preventDefault();
//         handleContact(item.getAttribute('data-section'));
//       });
//     });

//   // Click ngoài để đóng menu
//   document.addEventListener('click', function (e) {
//     if (!isMobile()) return;
//     if (!nav.classList.contains('open')) return;
//     if (!nav.contains(e.target) && e.target !== document.getElementById('mobileMenuToggle')) {
//       closeAll();
//     }
//   });

//   // ========== PAGE-ENTRY STATE RESTORE (mobile only) ==========
//   if (isMobile()) {
//     // On artists page: restore selected artist
//     if (currentPage() === 'artists') {
//       const params = new URLSearchParams(window.location.search);
//       const paramArtist = params.get('artist');
//       const saved = localStorage.getItem('selectedArtist');
//       const artist = paramArtist || saved || 'banh';
//       waitUntil(() => window.renderArtistInfo && window.artistsData && window.artistsData[artist])
//         .then(() => {
//           if (window.banner?.switchArtist) window.banner.switchArtist(artist);
//           window.renderArtistInfo(artist);
//           setActiveInMenu('[data-dropdown-menu="artists"] .mobile-dropdown-item,[data-dropdown-menu="artist"] .mobile-dropdown-item',
//             a => a.getAttribute('data-section') === artist);
//         })
//         .catch(() => {/* ignore */});
//     }

//     // On gallery page: restore artist/style (ưu tiên style nếu đã chọn)
//     if (currentPage() === 'gallery') {
//       const savedArtist = localStorage.getItem('currentArtist') || 'banh';
//       const savedStyleStr = localStorage.getItem('currentStyleIndex');
//       const hasSavedStyle = savedStyleStr !== null && savedStyleStr !== undefined;
//       const savedStyle = hasSavedStyle ? Number(savedStyleStr) : 0;

//       window.currentArtist = savedArtist;
//       window.currentStyleIndex = hasSavedStyle ? savedStyle : 0;

//       const doRenderByStyle = () => {
//         if (window.renderGalleryGridFromStyle) window.renderGalleryGridFromStyle(window.currentStyleIndex);
//         if (window.updateGalleryHeroContentFromStyle) window.updateGalleryHeroContentFromStyle(window.currentStyleIndex);
//       };

//       const doRenderByArtist = () => {
//         if (window.renderGalleryGrid) window.renderGalleryGrid(window.currentArtist);
//         if (window.updateGalleryHeroContent) window.updateGalleryHeroContent(window.currentArtist);
//       };

//       if (typeof window.galleryInit === 'function') {
//         setTimeout(() => {
//           if (hasSavedStyle) {
//             doRenderByStyle();
//           } else {
//             doRenderByArtist();
//           }
//         }, 50);
//       } else {
//         if (hasSavedStyle) {
//           doRenderByStyle();
//         } else {
//           doRenderByArtist();
//         }
//       }
//     }

//     // On contact page: restore tab
//     if (currentPage() === 'contact') {
//       const tab = localStorage.getItem('contactTab') || 'contact';
//       waitUntil(() => typeof window.renderContactTab === 'function')
//         .then(() => window.renderContactTab(tab))
//         .catch(() => {/* ignore */});
//     }

//     // Default highlight for gallery artist dropdown in menu
//     nav.querySelectorAll('[data-dropdown-menu="artist"] .mobile-dropdown-item')
//       .forEach(a => a.classList.toggle('active', a.getAttribute('data-section') === 'banh'));
//   }
// });

// // Giữ nguyên debounce utility
// function debounce(fn, delay) {
//   let t; return (...args) => { if (t) return; fn(...args); t = setTimeout(() => t = null, delay); };
// }


// mobile-menu.js — Optimized + origin-aware + galleryTab restore
document.addEventListener('componentsLoaded', function () {
  const menuBtn = document.getElementById('mobileMenuToggle');
  const closeBtn = document.getElementById('mobileMenuClose');
  const nav = document.getElementById('mobileOnlyNav');
  if (!menuBtn || !closeBtn || !nav) return;

  // ---------- Utils ----------
  const isMobile = () => window.innerWidth <= 768;
  const currentPage = () => (document.body?.dataset?.page) || '';
  let navigating = false;

  function goTo(page) {
    if (navigating) return;
    navigating = true;
    window.location.href = page;
    // fallback nếu vì lý do gì đó không rời trang
    setTimeout(() => { navigating = false; }, 1500);
  }

  function waitUntil(testFn, { timeout = 8000 } = {}) {
    return new Promise((res, rej) => {
      const start = performance.now();
      (function loop() {
        if (testFn()) return res();
        if (performance.now() - start > timeout) return rej(new Error('waitUntil timeout'));
        requestAnimationFrame(loop);
      })();
    });
  }

  function saveState(kv = {}) {
    try { Object.entries(kv).forEach(([k, v]) => localStorage.setItem(k, v)); } catch (_) {}
  }
  function removeState(keys = []) {
    try { keys.forEach(k => localStorage.removeItem(k)); } catch (_) {}
  }

  function setActiveInMenu(selector, predicate) {
    nav.querySelectorAll(selector).forEach(a => a.classList.toggle('active', predicate(a)));
  }
  function closeAll() {
    nav.querySelectorAll('.mobile-dropdown-menu.open').forEach(m => m.classList.remove('open'));
    nav.querySelectorAll('.mobile-dropdown-toggle.active').forEach(t => t.classList.remove('active'));
    nav.classList.remove('open');
  }

  // ---------- Open/Close ----------
  menuBtn.addEventListener('click', debounce(() => nav.classList.add('open'), 200));
  closeBtn.addEventListener('click', debounce(() => nav.classList.remove('open'), 200));

  // ---------- Dropdown toggle (cache siblings để đóng nhanh) ----------
  const SELECTORS = {
    toggle: '.mobile-dropdown-toggle',
    menu: (k) => `.mobile-dropdown-menu[data-dropdown-menu="${k}"]`,
  };

  nav.querySelectorAll(SELECTORS.toggle).forEach(toggle => {
    const key = toggle.dataset.dropdown;
    const parent = toggle.parentNode;
    const menu = key ? nav.querySelector(SELECTORS.menu(key)) : null;

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      if (!key || !menu) return;

      // đóng ngang cấp
      for (const el of parent.children) {
        if (el !== menu && el.classList?.contains('mobile-dropdown-menu')) el.classList.remove('open');
        if (el !== toggle && el.classList?.contains('mobile-dropdown-toggle')) el.classList.remove('active');
      }

      const opening = !menu.classList.contains('open');
      menu.classList.toggle('open', opening);
      toggle.classList.toggle('active', opening);
    });
  });

  // ---------- Handlers ----------
  // origin: 'artists' (top-level) | 'gallery-artist' (submenu in Gallery)
  function handlePickArtist(artistKey, origin) {
    if (!artistKey || !isMobile()) return;

    const onArtistsPage = currentPage() === 'artists';
    const onGalleryPage = currentPage() === 'gallery';

    if (origin === 'gallery-artist') {
      // ở GALLERY → ARTIST: luôn dùng logic của gallery
      saveState({ currentArtist: artistKey, galleryTab: 'artist' });
      removeState(['currentStyleIndex']);
      if (!onGalleryPage) return goTo('../gallery.html');

      if (window.renderGalleryGrid) window.renderGalleryGrid(artistKey);
      if (window.updateGalleryHeroContent) window.updateGalleryHeroContent(artistKey);

      setActiveInMenu(
        '[data-dropdown-menu="artist"] .mobile-dropdown-item',
        a => a.getAttribute('data-section') === artistKey
      );
      closeAll();
      return;
    }

    // origin === 'artists' (top-level)
    if (!onArtistsPage) {
      saveState({ selectedArtist: artistKey });
      return goTo('../artist.html');
    }

    const doRender = () => {
      if (window.banner?.switchArtist) window.banner.switchArtist(artistKey);
      if (window.renderArtistInfo) window.renderArtistInfo(artistKey);
      setActiveInMenu(
        '[data-dropdown-menu="artists"] .mobile-dropdown-item',
        a => a.getAttribute('data-section') === artistKey
      );
      closeAll();
    };

    if (!window.renderArtistInfo || !window.artistsData || !window.artistsData[artistKey]) {
      waitUntil(() => window.renderArtistInfo && window.artistsData && window.artistsData[artistKey])
        .then(doRender)
        .catch(() => { console.warn('[mobile-menu] artistsData not ready'); closeAll(); });
    } else {
      doRender();
    }
  }

  function handlePickStyleIndex(idx) {
    const i = Number(idx);
    if (Number.isNaN(i) || !isMobile()) return;

    saveState({ currentStyleIndex: String(i), galleryTab: 'style' });

    if (currentPage() !== 'gallery') {
      // nếu user có chọn artist trước đó ở GALLERY → ARTIST, giữ lại
      const a = nav.querySelector('[data-dropdown-menu="artist"] .mobile-dropdown-item.active');
      const artistFromMenu = a?.getAttribute('data-section');
      if (artistFromMenu) saveState({ currentArtist: artistFromMenu });
      return goTo('../gallery.html');
    }

    // đang ở gallery: render theo style
    window.currentStyleIndex = i;
    if (window.renderGalleryGridFromStyle) window.renderGalleryGridFromStyle(i);
    if (window.updateGalleryHeroContentFromStyle) window.updateGalleryHeroContentFromStyle(i);
    setActiveInMenu('[data-dropdown-menu="style"] .mobile-dropdown-item', (_a, j) => String(j) === String(i));
    closeAll();
  }

  function handleContact(section) {
    if (!section || !isMobile()) return;
    const typeMap = { 'contact-form': 'contact', 'google-map': 'map', 'review': 'review' };
    const type = typeMap[section] || 'contact';

    if (currentPage() !== 'contact') {
      saveState({ contactTab: type });
      return goTo('../contact.html');
    }

    if (window.renderContactTab) window.renderContactTab(type);
    setActiveInMenu('[data-dropdown-menu="contact"] .mobile-dropdown-item', a => a.getAttribute('data-section') === section);
    closeAll();
  }

  // ---------- Event Delegation cho mọi .mobile-dropdown-item ----------
  nav.addEventListener('click', (e) => {
    const a = e.target.closest('.mobile-dropdown-item');
    if (!a || !nav.contains(a)) return;
    e.preventDefault();

    // xác định group bằng parent menu gần nhất
    const parentMenu = a.closest('[data-dropdown-menu]');
    const group = parentMenu?.getAttribute('data-dropdown-menu'); // "artists" | "artist" | "style" | "contact"

    if (group === 'artists')  return handlePickArtist(a.getAttribute('data-section'), 'artists');
    if (group === 'artist')   return handlePickArtist(a.getAttribute('data-section'), 'gallery-artist');
    if (group === 'style')    return handlePickStyleIndex(a.getAttribute('data-style-index'));
    if (group === 'contact')  return handleContact(a.getAttribute('data-section'));
  });

  // ---------- Click ngoài để đóng menu ----------
  document.addEventListener('click', function (e) {
    if (!isMobile()) return;
    if (!nav.classList.contains('open')) return;
    if (!nav.contains(e.target) && e.target !== menuBtn) {
      closeAll();
    }
  });

  // ---------- PAGE-ENTRY RESTORE (mobile) ----------
  if (isMobile()) {
    // Artists
    if (currentPage() === 'artists') {
      const params = new URLSearchParams(window.location.search);
      const paramArtist = params.get('artist');
      const saved = localStorage.getItem('selectedArtist');
      const artist = paramArtist || saved || 'banh';
      waitUntil(() => window.renderArtistInfo && window.artistsData && window.artistsData[artist])
        .then(() => {
          if (window.banner?.switchArtist) window.banner.switchArtist(artist);
          window.renderArtistInfo(artist);
          setActiveInMenu('[data-dropdown-menu="artists"] .mobile-dropdown-item',
            a => a.getAttribute('data-section') === artist);
        })
        .catch(() => {/* ignore */});
    }

    // Gallery (ưu tiên galleryTab)
    if (currentPage() === 'gallery') {
      const tab = localStorage.getItem('galleryTab'); // 'artist' | 'style'
      const savedArtist = localStorage.getItem('currentArtist') || 'banh';
      const savedStyleStr = localStorage.getItem('currentStyleIndex');
      const hasSavedStyle = savedStyleStr !== null && savedStyleStr !== undefined;
      const savedStyle = hasSavedStyle ? Number(savedStyleStr) : 0;

      window.currentArtist = savedArtist;
      window.currentStyleIndex = hasSavedStyle ? savedStyle : 0;

      const renderByStyle = () => {
        if (window.renderGalleryGridFromStyle) window.renderGalleryGridFromStyle(window.currentStyleIndex);
        if (window.updateGalleryHeroContentFromStyle) window.updateGalleryHeroContentFromStyle(window.currentStyleIndex);
      };
      const renderByArtist = () => {
        if (window.renderGalleryGrid) window.renderGalleryGrid(window.currentArtist);
        if (window.updateGalleryHeroContent) window.updateGalleryHeroContent(window.currentArtist);
      };

      // nếu page script có init async, chờ nhẹ
      if (typeof window.galleryInit === 'function') {
        setTimeout(() => {
          if (tab === 'style' || (tab !== 'artist' && hasSavedStyle)) renderByStyle();
          else renderByArtist();
        }, 50);
      } else {
        if (tab === 'style' || (tab !== 'artist' && hasSavedStyle)) renderByStyle();
        else renderByArtist();
      }
    }

    // Contact
    if (currentPage() === 'contact') {
      const tab = localStorage.getItem('contactTab') || 'contact';
      waitUntil(() => typeof window.renderContactTab === 'function')
        .then(() => window.renderContactTab(tab))
        .catch(() => {/* ignore */});
    }

    // Default highlight cho GALLERY → ARTIST (menu)
    nav.querySelectorAll('[data-dropdown-menu="artist"] .mobile-dropdown-item')
      .forEach(a => a.classList.toggle('active', a.getAttribute('data-section') === 'banh'));
  }
});

// ---------- debounce ----------
function debounce(fn, delay) {
  let t;
  return (...args) => { if (t) return; fn(...args); t = setTimeout(() => t = null, delay); };
}
