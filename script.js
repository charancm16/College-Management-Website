/* ============================================================
   Institution Lumina – Smt T.K.R. Polytechnic
   Vanilla JavaScript – Interactions & Animations
   ============================================================ */

(function () {
  'use strict';

  // ── Preloader ──
  function initPreloader() {
    const preloader = document.querySelector('.preloader');
    if (!preloader) return;

    window.addEventListener('load', () => {
      setTimeout(() => {
        preloader.classList.add('fade-out');
        document.body.style.overflow = '';
      }, 600);
    });

    // Fallback: hide preloader after 4s even if load event doesn't fire
    setTimeout(() => {
      if (!preloader.classList.contains('fade-out')) {
        preloader.classList.add('fade-out');
        document.body.style.overflow = '';
      }
    }, 4000);
  }

  // ── Navbar Scroll Effect ──
  function initNavbar() {
    const navbar = document.querySelector('.navbar');
    if (!navbar) return;

    const SCROLL_THRESHOLD = 50;

    function updateNavbar() {
      if (window.scrollY > SCROLL_THRESHOLD) {
        navbar.classList.add('scrolled');
      } else {
        navbar.classList.remove('scrolled');
      }
    }

    window.addEventListener('scroll', updateNavbar, { passive: true });
    updateNavbar();
  }

  // ── Mobile Menu ──
  function initMobileMenu() {
    const hamburger = document.querySelector('.hamburger');
    const navLinks = document.querySelector('.nav-links');
    const overlay = document.querySelector('.mobile-overlay');
    if (!hamburger || !navLinks) return;

    function toggleMenu() {
      hamburger.classList.toggle('active');
      navLinks.classList.toggle('open');
      if (overlay) overlay.classList.toggle('active');
      document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
    }

    function closeMenu() {
      hamburger.classList.remove('active');
      navLinks.classList.remove('open');
      if (overlay) overlay.classList.remove('active');
      document.body.style.overflow = '';
    }

    hamburger.addEventListener('click', toggleMenu);
    if (overlay) overlay.addEventListener('click', closeMenu);

    // Close menu on link click
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', closeMenu);
    });

    // Close on Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMenu();
    });
  }

  // ── Smooth Scroll ──
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;

        const target = document.querySelector(targetId);
        if (target) {
          const navHeight = document.querySelector('.navbar')?.offsetHeight || 0;
          const targetPosition = target.getBoundingClientRect().top + window.scrollY - navHeight - 20;

          window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
          });
        }
      });
    });
  }

  // ── Active Nav Link ──
  function initActiveLink() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-links a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${id}`) {
              link.classList.add('active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -60% 0px',
      threshold: 0
    });

    sections.forEach(section => observer.observe(section));
  }

  // ── Scroll Animations ──
  function initScrollAnimations() {
    const elements = document.querySelectorAll('.animate-on-scroll');
    if (!elements.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          observer.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => observer.observe(el));
  }

  // ── Counter Animation ──
  function initCounters() {
    const counters = document.querySelectorAll('[data-count]');
    if (!counters.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          animateCounter(entry.target);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });

    counters.forEach(counter => observer.observe(counter));
  }

  function animateCounter(el) {
    const target = parseInt(el.getAttribute('data-count'), 10);
    const suffix = el.getAttribute('data-suffix') || '';
    const prefix = el.getAttribute('data-prefix') || '';
    const duration = 2000;
    const startTime = performance.now();

    function easeOutCubic(t) {
      return 1 - Math.pow(1 - t, 3);
    }

    function update(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const easedProgress = easeOutCubic(progress);
      const current = Math.round(easedProgress * target);

      el.textContent = prefix + current.toLocaleString() + suffix;

      if (progress < 1) {
        requestAnimationFrame(update);
      }
    }

    requestAnimationFrame(update);
  }

  // ── Gallery Lightbox ──
  function initLightbox() {
    const lightbox = document.querySelector('.lightbox');
    const lightboxImg = lightbox?.querySelector('img');
    const lightboxClose = lightbox?.querySelector('.lightbox-close');
    if (!lightbox || !lightboxImg) return;

    // Open lightbox
    document.querySelectorAll('.gallery-item').forEach(item => {
      item.addEventListener('click', () => {
        const img = item.querySelector('img');
        if (img) {
          lightboxImg.src = img.src;
          lightboxImg.alt = img.alt;
          lightbox.classList.add('active');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    // Close lightbox
    function closeLightbox() {
      lightbox.classList.remove('active');
      document.body.style.overflow = '';
    }

    if (lightboxClose) lightboxClose.addEventListener('click', closeLightbox);

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeLightbox();
    });
  }

  // ── Contact Form (Mockup) ──
  function initContactForm() {
    const form = document.querySelector('#contact-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalText = btn.innerHTML;

      btn.innerHTML = '<i class="fas fa-check"></i> Message Sent!';
      btn.style.background = '#28a745';

      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        form.reset();
      }, 2500);
    });
  }

  // ── Newsletter (Mockup) ──
  function initNewsletter() {
    const form = document.querySelector('.newsletter-form');
    if (!form) return;

    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const input = form.querySelector('input');
      const btn = form.querySelector('button');

      if (input && input.value) {
        const originalText = btn.textContent;
        btn.textContent = '✓';
        input.value = '';

        setTimeout(() => {
          btn.textContent = originalText;
        }, 2000);
      }
    });
  }

  // ── Initialize All ──
  function init() {
    document.body.style.overflow = 'hidden';
    initPreloader();
    initNavbar();
    initMobileMenu();
    initSmoothScroll();
    initActiveLink();
    initScrollAnimations();
    initCounters();
    initLightbox();
    initContactForm();
    initNewsletter();
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();
