(() => {
  'use strict';

  const data = window.LABSA_CASE;
  if (!data) {
    console.error('Dados do estudo não encontrados. Verifique case-data.js.');
    return;
  }

  const $ = (selector, context = document) => context.querySelector(selector);
  const $$ = (selector, context = document) => [...context.querySelectorAll(selector)];
  const clamp = (value, min, max) => Math.min(Math.max(value, min), max);

  // Company links can be updated from one place.
  $$('[data-maps-link]').forEach(link => {
    link.href = data.company.mapsUrl;
  });

  // Header and reading progress.
  const header = $('[data-header]');
  const progressBar = $('.reading-progress span');
  let lastScrollTop = 0;
  const headerHeight = 86; // Coincide com a variável --header-height
  const updateScrollUI = () => {
    const scrollTop = window.scrollY || document.documentElement.scrollTop;
    const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
    header?.classList.toggle('scrolled', scrollTop > 24);

    // Lógica do Header Inteligente (Auto-Hide)
    if (scrollTop > lastScrollTop && scrollTop > headerHeight) {
      // Scroll para baixo: esconde o menu
      header?.classList.add('header-hidden');
    } else {
      // Scroll para cima: mostra o menu
      header?.classList.remove('header-hidden');
    }
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;

    if (progressBar) progressBar.style.width = `${maxScroll > 0 ? (scrollTop / maxScroll) * 100 : 0}%`;
  };
  updateScrollUI();
  window.addEventListener('scroll', updateScrollUI, { passive: true });
  window.addEventListener('resize', updateScrollUI);

  // Reveal-on-scroll.
  const revealItems = $$('.reveal');
  if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -40px' });
    revealItems.forEach(item => revealObserver.observe(item));
  } else {
    revealItems.forEach(item => item.classList.add('visible'));
  }



  // Timeline state.
  const timeline = $('[data-timeline]');
  const records = data.caseStudy.records || [];
  let activeIndex = 0;
  let renderRecord = () => {};

  if (timeline && records.length) {
    const tabsContainer = $('.timeline-tabs', timeline);
    const imageWrap = $('.timeline-photo', timeline);
    const image = $('[data-record-image]', timeline);
    const dayLabel = $('[data-record-day]', timeline);
    const dateLabel = $('[data-record-date]', timeline);
    const title = $('[data-record-label]', timeline);
    const note = $('[data-record-note]', timeline);
    const counter = $('[data-image-counter]', timeline);
    const meter = $('.timeline-meter span', timeline);
    const prev = $('[data-record-prev]', timeline);
    const next = $('[data-record-next]', timeline);

    records.forEach((record, index) => {
      const tab = document.createElement('button');
      tab.className = 'timeline-tab';
      tab.type = 'button';
      tab.role = 'tab';
      tab.setAttribute('aria-selected', index === 0 ? 'true' : 'false');
      tab.setAttribute('aria-label', `${record.label}, dia ${record.day}`);
      tab.innerHTML = `<i>${String(record.day).padStart(2, '0')}</i><span>${record.label}</span>`;
      tab.addEventListener('click', () => renderRecord(index));
      tabsContainer.appendChild(tab);
    });

    let animationTimeout = null;
    renderRecord = index => {
      activeIndex = clamp(index, 0, records.length - 1);
      const record = records[activeIndex];
      if (!record) return;

      // Atualiza textos clínicos snappily
      dayLabel.textContent = `DIA ${String(record.day).padStart(2, '0')}`;
      dateLabel.textContent = record.date;
      title.textContent = record.label;
      note.textContent = record.note;
      counter.textContent = `${String(activeIndex + 1).padStart(2, '0')} / ${String(records.length).padStart(2, '0')}`;
      meter.style.width = `${((activeIndex + 1) / records.length) * 100}%`;
      prev.disabled = activeIndex === 0;
      next.disabled = activeIndex === records.length - 1;

      $$('.timeline-tab', tabsContainer).forEach((tab, tabIndex) => {
        const isActive = tabIndex === activeIndex;
        tab.classList.toggle('active', isActive);
        tab.setAttribute('aria-selected', String(isActive));
        tab.tabIndex = isActive ? 0 : -1;
      });

      // Executa transição suave com cross-fade
      imageWrap.classList.add('changing');
      if (animationTimeout) clearTimeout(animationTimeout);

      animationTimeout = setTimeout(() => {
        const preload = new Image();
        preload.onload = () => {
          image.src = record.image;
          image.alt = `${record.label}, dia ${record.day} do acompanhamento`;
          image.style.objectPosition = record.focal || '50% 50%';
          requestAnimationFrame(() => imageWrap.classList.remove('changing'));
        };
        preload.onerror = () => imageWrap.classList.remove('changing');
        preload.src = record.image;
      }, 120);
    };

    prev.addEventListener('click', () => renderRecord(activeIndex - 1));
    next.addEventListener('click', () => renderRecord(activeIndex + 1));
    timeline.addEventListener('keydown', event => {
      if (event.key === 'ArrowLeft') renderRecord(activeIndex - 1);
      if (event.key === 'ArrowRight') renderRecord(activeIndex + 1);
    });

    renderRecord(0);
  }

  // Fullscreen image lightbox.
  const lightbox = $('[data-lightbox]');
  const lightboxImage = $('[data-lightbox-image]');
  const lightboxCaption = $('[data-lightbox-caption]');
  const lightboxPrev = $('[data-lightbox-prev]');
  const lightboxNext = $('[data-lightbox-next]');
  let lightboxMode = 'clinical'; // 'clinical' ou 'product'

  const updateLightboxContent = () => {
    if (lightboxMode === 'clinical') {
      const record = records[activeIndex];
      if (!record) return;
      lightboxImage.src = record.image;
      lightboxImage.alt = `${record.label}, dia ${record.day}`;
      lightboxCaption.textContent = `${record.label} · Dia ${record.day} · ${record.date}`;

      if (lightboxPrev) {
        lightboxPrev.style.display = 'grid';
        lightboxPrev.disabled = activeIndex === 0;
      }
      if (lightboxNext) {
        lightboxNext.style.display = 'grid';
        lightboxNext.disabled = activeIndex === records.length - 1;
      }
    }
  };

  const sensitivePhoto = $('[data-sensitive-photo]');
  const sensitiveBtn = $('[data-reveal-sensitive]');
  if (sensitivePhoto && sensitiveBtn) {
    sensitiveBtn.addEventListener('click', event => {
      event.stopPropagation();
      sensitivePhoto.classList.remove('sensitive-blur');
    });
  }

  const sensitiveComp = $('[data-sensitive-comparison]');
  const sensitiveCompBtn = $('[data-reveal-comparison]');
  if (sensitiveComp && sensitiveCompBtn) {
    sensitiveCompBtn.addEventListener('click', event => {
      event.stopPropagation();
      sensitiveComp.classList.remove('sensitive-blur');
    });
  }

  const closeLightbox = () => {
    if (lightbox?.open) {
      if (typeof lightbox.close === 'function') {
        lightbox.close();
      } else {
        lightbox.removeAttribute('open');
      }
    }
    document.body.classList.remove('lightbox-open');
  };

  const openClinicalLightbox = () => {
    sensitivePhoto?.classList.remove('sensitive-blur');
    lightboxMode = 'clinical';
    updateLightboxContent();
    document.body.classList.add('lightbox-open');
    if (typeof lightbox.showModal === 'function') {
      lightbox.showModal();
    } else {
      lightbox?.setAttribute('open', '');
    }
  };

  $('[data-open-lightbox]')?.addEventListener('click', openClinicalLightbox);
  sensitivePhoto?.addEventListener('click', event => {
    if (!sensitivePhoto.classList.contains('sensitive-blur') && !event.target.closest('[data-open-lightbox]')) {
      openClinicalLightbox();
    }
  });

  lightboxPrev?.addEventListener('click', event => {
    event.stopPropagation();
    if (activeIndex > 0) {
      renderRecord(activeIndex - 1);
      updateLightboxContent();
    }
  });

  lightboxNext?.addEventListener('click', event => {
    event.stopPropagation();
    if (activeIndex < records.length - 1) {
      renderRecord(activeIndex + 1);
      updateLightboxContent();
    }
  });

  // Touch Swipe para Lightbox em Dispositivos Móveis
  let touchStartX = 0;
  lightbox?.addEventListener('touchstart', event => {
    touchStartX = event.changedTouches[0].screenX;
  }, { passive: true });
  lightbox?.addEventListener('touchend', event => {
    const touchEndX = event.changedTouches[0].screenX;
    const diffX = touchEndX - touchStartX;
    if (Math.abs(diffX) > 40 && lightboxMode === 'clinical') {
      if (diffX < 0 && activeIndex < records.length - 1) {
        renderRecord(activeIndex + 1);
        updateLightboxContent();
      } else if (diffX > 0 && activeIndex > 0) {
        renderRecord(activeIndex - 1);
        updateLightboxContent();
      }
    }
  }, { passive: true });

  $('[data-lightbox-close]')?.addEventListener('click', closeLightbox);
  lightbox?.addEventListener('click', event => {
    if (event.target === lightbox) closeLightbox();
  });
  lightbox?.addEventListener('close', () => {
    document.body.classList.remove('lightbox-open');
  });

  // Before/after comparison.
  const comparison = $('[data-comparison]');
  if (comparison) {
    const range = $('input[type="range"]', comparison);
    const overlay = $('.comparison-overlay', comparison);
    const line = $('.comparison-line', comparison);
    const stage = $('.comparison-stage', comparison);
    const overlayImage = $('.comparison-overlay img', comparison);

    const resizeComparisonImage = () => {
      overlayImage.style.width = `${stage.getBoundingClientRect().width}px`;
      overlayImage.style.height = `${stage.getBoundingClientRect().height}px`;
    };
    const updateComparison = () => {
      const value = Number(range.value);
      overlay.style.width = `${value}%`;
      line.style.left = `${value}%`;
    };
    range.addEventListener('input', updateComparison);
    window.addEventListener('resize', resizeComparisonImage);
    resizeComparisonImage();
    updateComparison();
  }

  // Product brochure page switcher.
  const productPages = $$('.product-page');
  const productSwitches = $$('[data-product-switch]');
  const setProductPage = page => {
    productPages.forEach(item => item.classList.toggle('active', item.dataset.productPage === page));
    productSwitches.forEach(item => item.classList.toggle('active', item.dataset.productSwitch === page));
  };
  productPages.forEach(page => {
    page.addEventListener('click', () => {
      const pageId = page.dataset.productPage;
      if (page.classList.contains('active')) {
        // Zoom em alta resolução no lightbox
        const img = page.querySelector('img');
        if (img) {
          lightboxMode = 'product';
          lightboxImage.src = img.src;
          lightboxImage.alt = img.alt;
          lightboxCaption.textContent = pageId === 'front' 
            ? 'Folheto Técnico UrgoClean Ag · Frente (Clique fora para fechar)' 
            : 'Folheto Técnico UrgoClean Ag · Informações Técnicas (Clique fora para fechar)';
          if (lightboxPrev) lightboxPrev.style.display = 'none';
          if (lightboxNext) lightboxNext.style.display = 'none';
          document.body.classList.add('lightbox-open');
          if (typeof lightbox.showModal === 'function') {
            lightbox.showModal();
          } else {
            lightbox?.setAttribute('open', '');
          }
        }
      } else {
        setProductPage(pageId);
      }
    });
  });
  productSwitches.forEach(button => button.addEventListener('click', () => setProductPage(button.dataset.productSwitch)));

  // Respect keyboard escape and navigation for dialogs.
  document.addEventListener('keydown', event => {
    if (lightbox?.open) {
      if (event.key === 'Escape') {
        closeLightbox();
      } else if (lightboxMode === 'clinical') {
        if (event.key === 'ArrowLeft' && activeIndex > 0) {
          renderRecord(activeIndex - 1);
          updateLightboxContent();
        } else if (event.key === 'ArrowRight' && activeIndex < records.length - 1) {
          renderRecord(activeIndex + 1);
          updateLightboxContent();
        }
      }
    }
  });
})();
