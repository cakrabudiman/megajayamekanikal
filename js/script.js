document.addEventListener('DOMContentLoaded', () => {
  const header = document.querySelector('.site-header');
  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navLinks = document.querySelectorAll('.nav-link');
  const backToTop = document.querySelector('.back-to-top');
  const revealItems = document.querySelectorAll('.reveal');
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

});
