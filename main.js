(function () {
  'use strict';

  const header = document.getElementById('header');
  const navToggle = document.getElementById('nav-toggle');
  const navMenu = document.getElementById('nav-menu');
  const navLinks = document.querySelectorAll('.nav__link');
  const sections = document.querySelectorAll('section[id]');
  const contactForm = document.getElementById('contact-form');
  const yearEl = document.getElementById('year');

  /* Current year in footer */
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  /* Mobile navigation toggle */
  navToggle.addEventListener('click', () => {
    const isOpen = navMenu.classList.toggle('open');
    navToggle.classList.toggle('open');
    navToggle.setAttribute('aria-expanded', isOpen);
  });

  /* Close mobile menu on link click */
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      navToggle.classList.remove('open');
      navToggle.setAttribute('aria-expanded', 'false');
    });
  });

  /* Header shadow on scroll */
  function handleScroll() {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  }

  window.addEventListener('scroll', handleScroll, { passive: true });
  handleScroll();

  /* Active nav link on scroll */
  function setActiveLink() {
    const scrollPos = window.scrollY + 100;

    sections.forEach((section) => {
      const top = section.offsetTop;
      const height = section.offsetHeight;
      const id = section.getAttribute('id');

      if (scrollPos >= top && scrollPos < top + height) {
        navLinks.forEach((link) => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${id}`) {
            link.classList.add('active');
          }
        });
      }
    });
  }

  window.addEventListener('scroll', setActiveLink, { passive: true });
  setActiveLink();

  /* Scroll reveal animation */
  const revealElements = document.querySelectorAll(
    '.section__header, .about__grid, .skill-card, .project-card, .contact__grid'
  );

  revealElements.forEach((el) => el.classList.add('reveal'));

  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
  );

  revealElements.forEach((el) => revealObserver.observe(el));

  /* Contact form validation */
  function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorEl = document.getElementById(`${fieldId}-error`);
    field.classList.add('error');
    errorEl.textContent = message;
  }

  function clearErrors() {
    ['name', 'email', 'message'].forEach((id) => {
      document.getElementById(id).classList.remove('error');
      document.getElementById(`${id}-error`).textContent = '';
    });
    document.getElementById('form-success').hidden = true;
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }

  contactForm.addEventListener('submit', (e) => {
    e.preventDefault();
    clearErrors();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();
    let isValid = true;

    if (!name) {
      showError('name', 'Please enter your name.');
      isValid = false;
    }

    if (!email) {
      showError('email', 'Please enter your email.');
      isValid = false;
    } else if (!validateEmail(email)) {
      showError('email', 'Please enter a valid email address.');
      isValid = false;
    }

    if (!message) {
      showError('message', 'Please enter a message.');
      isValid = false;
    } else if (message.length < 10) {
      showError('message', 'Message must be at least 10 characters.');
      isValid = false;
    }

    if (isValid) {
      const successEl = document.getElementById('form-success');
      successEl.hidden = false;
      contactForm.reset();
      successEl.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
    }
  });
})();
