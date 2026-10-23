document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.querySelector('.back-to-top');
  const revealItems = document.querySelectorAll('.reveal');
  const currentYear = document.getElementById('currentYear');
  const lightbox = document.querySelector('.product-lightbox');

  if (lightbox) {
    const galleryItems = [...document.querySelectorAll('[data-product-gallery] .product-gallery-item')];
    const lightboxImage = lightbox.querySelector('.product-lightbox-image');
    const lightboxCount = lightbox.querySelector('.product-lightbox-count');
    const closeButton = lightbox.querySelector('.product-lightbox-close');
    let activeIndex = 0;
    let pointerStartX = null;
    let opener = null;

    const showImage = (index) => {
      activeIndex = (index + galleryItems.length) % galleryItems.length;
      const thumbnail = galleryItems[activeIndex].querySelector('img');
      lightboxImage.src = thumbnail.currentSrc || thumbnail.src;
      lightboxImage.alt = thumbnail.alt;
      lightboxCount.textContent = `${activeIndex + 1} / ${galleryItems.length}`;
    };

    galleryItems.forEach((item, index) => {
      item.addEventListener('click', () => {
        opener = item;
        showImage(index);
        lightbox.showModal();
        closeButton.focus();
      });
    });

    lightbox.querySelector('.product-lightbox-prev').addEventListener('click', () => {
      showImage(activeIndex - 1);
    });

    lightbox.querySelector('.product-lightbox-next').addEventListener('click', () => {
      showImage(activeIndex + 1);
    });

    closeButton.addEventListener('click', () => lightbox.close());

    lightbox.addEventListener('close', () => {
      pointerStartX = null;
      if (opener) opener.focus();
    });

    lightbox.addEventListener('click', (event) => {
      if (event.target === lightbox) lightbox.close();
    });

    lightbox.addEventListener('keydown', (event) => {
      if (event.key === 'ArrowLeft') {
        event.preventDefault();
        showImage(activeIndex - 1);
      } else if (event.key === 'ArrowRight') {
        event.preventDefault();
        showImage(activeIndex + 1);
      }
    });

    const lightboxStage = lightbox.querySelector('.product-lightbox-stage');
    lightboxStage.addEventListener('pointerdown', (event) => {
      if (event.target === lightboxImage) pointerStartX = event.clientX;
    });

    lightboxStage.addEventListener('pointerup', (event) => {
      if (pointerStartX === null) return;
      const swipeDistance = event.clientX - pointerStartX;
      pointerStartX = null;
      if (Math.abs(swipeDistance) < 45) return;
      showImage(activeIndex + (swipeDistance < 0 ? 1 : -1));
    });
  }

  // Update footer year
  if (currentYear) {
    currentYear.textContent = new Date().getFullYear();
  }

  // Sticky header and active nav states
  const handleHeaderScroll = () => {
    if (!header) return;
    header.classList.toggle('scrolled', window.scrollY > 28);
  };

  const activateNavLink = () => {
    const sections = [...document.querySelectorAll('main section[id]')];
    let currentSection = null;

    for (let i = sections.length - 1; i >= 0; i -= 1) {
      if (window.scrollY >= sections[i].offsetTop - 140) {
        currentSection = sections[i];
        break;
      }
    }

    navLinks.forEach((link) => {
      const href = link.getAttribute('href');
      if (href && href.startsWith('#')) {
        const isActive = currentSection && href === `#${currentSection.id}`;
        link.classList.toggle('active', Boolean(isActive));
      } else if (document.querySelector('main #home') && href === 'index.html') {
        link.classList.toggle('active', Boolean(currentSection && currentSection.id === 'home'));
      }
    });
  };

  handleHeaderScroll();
  activateNavLink();
  window.addEventListener('scroll', () => {
    handleHeaderScroll();
    activateNavLink();

    if (backToTop && window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else if (backToTop) {
      backToTop.classList.remove('visible');
    }
  });

  // Mobile navigation toggle
  if (navToggle && navMenu) {
    navToggle.addEventListener('click', () => {
      const isOpen = navMenu.classList.toggle('open');
      navToggle.setAttribute('aria-expanded', String(isOpen));
    });

    navLinks.forEach((link) => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('open');
        navToggle.setAttribute('aria-expanded', 'false');
      });
    });
  }

  // Scroll reveal animation
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );

  revealItems.forEach((item) => revealObserver.observe(item));

  // Back to top action
  if (backToTop) {
    backToTop.addEventListener('click', () => {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    });
  }

});
