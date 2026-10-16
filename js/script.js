document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.querySelector('.back-to-top');
  const revealItems = document.querySelectorAll('.reveal');
  const modal = document.getElementById('productModal');
  const modalTitle = document.getElementById('modalTitle');
  const modalText = document.getElementById('modalText');
  const productButtons = document.querySelectorAll('.product-detail');
  const modalClose = document.querySelector('.modal-close');
  const currentYear = document.getElementById('currentYear');

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
      const isActive = currentSection && link.getAttribute('href') === `#${currentSection.id}`;
      link.classList.toggle('active', Boolean(isActive));
    });
  };

  handleHeaderScroll();
  activateNavLink();
  window.addEventListener('scroll', () => {
    handleHeaderScroll();
    activateNavLink();

    if (window.scrollY > 400) {
      backToTop.classList.add('visible');
    } else {
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

  // Product modal
  const openModal = (title, text) => {
    if (!modal || !modalTitle || !modalText) return;
    modalTitle.textContent = title;
    modalText.textContent = text;
    modal.classList.add('visible');
    modal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  };

  const closeModal = () => {
    if (!modal) return;
    modal.classList.remove('visible');
    modal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  };

  productButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const title = button.dataset.title || 'Detail Produk';
      const text = button.dataset.text || 'Informasi lengkap tentang produk ini.';
      openModal(title, text);
    });
  });

  if (modalClose) {
    modalClose.addEventListener('click', closeModal);
  }

  if (modal) {
    modal.addEventListener('click', (event) => {
      if (event.target instanceof HTMLElement && event.target.dataset.close === 'true') {
        closeModal();
      }
    });
  }

  document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape' && modal && modal.classList.contains('visible')) {
      closeModal();
    }
  });

});
