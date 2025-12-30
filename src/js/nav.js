(function() {
  'use strict';

  const navToggle = document.querySelector('.nav-toggle');
  const navMenu = document.querySelector('.nav-menu');
  const navOverlay = document.querySelector('.nav-overlay');
  const navLinks = document.querySelectorAll('.nav-link:not(.dropdown-toggle)');
  const dropdownToggles = document.querySelectorAll('.dropdown-toggle');

  if (!navToggle || !navMenu) return;

  function toggleNav() {
    const isOpen = navToggle.getAttribute('aria-expanded') === 'true';

    navToggle.setAttribute('aria-expanded', !isOpen);
    navMenu.classList.toggle('is-open');
    navOverlay?.classList.toggle('is-visible');

    document.body.style.overflow = isOpen ? '' : 'hidden';
  }

  function closeNav() {
    navToggle.setAttribute('aria-expanded', 'false');
    navMenu.classList.remove('is-open');
    navOverlay?.classList.remove('is-visible');
    document.body.style.overflow = '';
  }

  function toggleDropdown(toggle) {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', !isOpen);
  }

  navToggle.addEventListener('click', toggleNav);

  navOverlay?.addEventListener('click', closeNav);

  navLinks.forEach(link => {
    link.addEventListener('click', closeNav);
  });

  dropdownToggles.forEach(toggle => {
    toggle.addEventListener('click', () => toggleDropdown(toggle));
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && navMenu.classList.contains('is-open')) {
      closeNav();
      navToggle.focus();
    }
  });

  window.addEventListener('resize', () => {
    if (window.innerWidth >= 768 && navMenu.classList.contains('is-open')) {
      closeNav();
    }
  });
})();
