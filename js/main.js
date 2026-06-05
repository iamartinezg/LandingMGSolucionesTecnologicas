/* ============================================================
   MG SOLUCIONES TECNOLÓGICAS — JavaScript
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ── Header scroll shadow ── */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('scrolled', window.scrollY > 20);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* ── Mobile hamburger ── */
  const hamburger = document.querySelector('.hamburger');
  const mobileNav  = document.querySelector('.mobile-nav');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      const open = mobileNav.classList.contains('is-open');
      if (open) closeMobileNav();
      else openMobileNav();
    });

    // Cerrar al hacer clic fuera
    document.addEventListener('click', (e) => {
      if (mobileNav.classList.contains('is-open') &&
          !mobileNav.contains(e.target) &&
          !hamburger.contains(e.target)) {
        closeMobileNav();
      }
    });

    // Cerrar con Escape
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeMobileNav();
    });
  }

  function openMobileNav() {
    mobileNav.classList.add('is-open');
    mobileNav.style.display = 'flex';
    hamburger.classList.add('open');
    hamburger.setAttribute('aria-expanded', 'true');
    document.body.style.overflow = 'hidden';
    // Animación de entrada
    requestAnimationFrame(() => { mobileNav.style.opacity = '1'; });
  }

  function closeMobileNav() {
    mobileNav.classList.remove('is-open');
    mobileNav.style.display = 'none';
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
    document.body.style.overflow = '';
  }

  // Cerrar menú al cambiar a desktop
  const mq = window.matchMedia('(min-width: 769px)');
  mq.addEventListener('change', (e) => { if (e.matches) closeMobileNav(); });

  /* ── Active nav link ── */
  const currentFile = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav-links a, .mobile-nav a').forEach(link => {
    const href = link.getAttribute('href') || '';
    const linkFile = href.split('/').pop();
    if (linkFile === currentFile || (currentFile === '' && linkFile === 'index.html')) {
      link.classList.add('active');
    }
  });

  /* ── Scroll-reveal con IntersectionObserver ── */
  const revealSelectors = [
    '.service-card', '.feature-item', '.case-card',
    '.blog-card', '.brand-card', '.value-card',
    '.cert-card', '.mv-card', '.contact-info-item',
    '.faq-item', '.why-stat', '.blog-card-featured'
  ];
  const revealEls = document.querySelectorAll(revealSelectors.join(', '));

  if ('IntersectionObserver' in window && revealEls.length) {
    // Respetar preferencia de movimiento reducido
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (!prefersReduced) {
      revealEls.forEach((el, i) => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(20px)';
        el.style.transition = 'opacity .45s ease, transform .45s ease';
        el.dataset.revealDelay = (i % 4) * 70;
      });

      const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            const delay = parseInt(entry.target.dataset.revealDelay) || 0;
            setTimeout(() => {
              entry.target.style.opacity = '1';
              entry.target.style.transform = 'translateY(0)';
            }, delay);
            observer.unobserve(entry.target);
          }
        });
      }, { threshold: 0.08, rootMargin: '0px 0px -40px 0px' });

      revealEls.forEach(el => observer.observe(el));
    }
  }

  /* ── Smooth scroll para anclas ── */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const id = anchor.getAttribute('href');
      if (id === '#') return;
      const target = document.querySelector(id);
      if (target) {
        e.preventDefault();
        const headerH = header ? header.offsetHeight : 72;
        const top = target.getBoundingClientRect().top + window.scrollY - headerH - 16;
        window.scrollTo({ top, behavior: 'smooth' });
        closeMobileNav();
      }
    });
  });

  /* ── FAQ accordion (contacto.html) ── */
  document.querySelectorAll('.faq-question').forEach(q => {
    q.addEventListener('click', () => {
      const item = q.parentElement;
      const wasOpen = item.classList.contains('open');
      document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
      if (!wasOpen) item.classList.add('open');
    });
  });

  /* ── Blog filter buttons (blog.html) ── */
  document.querySelectorAll('.filter-btn').forEach(btn => {
    btn.addEventListener('click', () => {
      document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
      btn.classList.add('active');
    });
  });

  /* ── Formulario de contacto ── */
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', function (e) {
      e.preventDefault();
      if (!validateForm(this)) return;

      const btn = this.querySelector('button[type="submit"]');
      const successMsg = document.getElementById('successMsg');
      const originalHTML = btn.innerHTML;

      btn.disabled = true;
      btn.innerHTML = '<span style="display:inline-flex;align-items:center;gap:8px;">'
        + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" style="animation:spin .8s linear infinite"><path d="M21 12a9 9 0 1 1-6.219-8.56"/></svg>'
        + 'Enviando…</span>';

      setTimeout(() => {
        if (successMsg) {
          successMsg.style.display = 'flex';
          successMsg.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
          setTimeout(() => { successMsg.style.display = 'none'; }, 6000);
        }
        btn.innerHTML = originalHTML;
        btn.disabled = false;
        contactForm.reset();
        clearErrors(contactForm);
      }, 1400);
    });

    // Validación en tiempo real
    contactForm.querySelectorAll('input, textarea').forEach(field => {
      field.addEventListener('blur', () => validateField(field));
      field.addEventListener('input', () => clearFieldError(field));
    });
  }

  function validateForm(form) {
    let valid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!validateField(field)) valid = false;
    });
    return valid;
  }

  function validateField(field) {
    clearFieldError(field);
    const value = field.value.trim();
    if (field.hasAttribute('required') && !value) {
      showFieldError(field, 'Este campo es obligatorio.');
      return false;
    }
    if (field.type === 'email' && value && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)) {
      showFieldError(field, 'Ingrese un correo electrónico válido.');
      return false;
    }
    return true;
  }

  function showFieldError(field, msg) {
    field.style.borderColor = '#dc3545';
    let err = field.parentElement.querySelector('.field-error');
    if (!err) {
      err = document.createElement('span');
      err.className = 'field-error';
      err.style.cssText = 'display:block;font-size:.76rem;color:#dc3545;margin-top:4px;font-family:var(--font-head)';
      field.parentElement.appendChild(err);
    }
    err.textContent = msg;
  }

  function clearFieldError(field) {
    field.style.borderColor = '';
    const err = field.parentElement.querySelector('.field-error');
    if (err) err.remove();
  }

  function clearErrors(form) {
    form.querySelectorAll('.field-error').forEach(e => e.remove());
    form.querySelectorAll('input, textarea, select').forEach(f => f.style.borderColor = '');
  }

  /* ── Animación del spinner para el botón ── */
  const style = document.createElement('style');
  style.textContent = '@keyframes spin { to { transform: rotate(360deg); } }';
  document.head.appendChild(style);

  /* ── Back to top al scroll extremo (UX en móvil) ── */
  let lastScroll = 0;
  window.addEventListener('scroll', () => {
    const current = window.scrollY;
    if (header) {
      // Ocultar header al bajar rápido en móvil, mostrar al subir
      if (window.innerWidth < 769) {
        if (current > lastScroll + 80 && current > 200) {
          header.style.transform = 'translateY(-100%)';
        } else if (current < lastScroll - 10) {
          header.style.transform = 'translateY(0)';
        }
      } else {
        header.style.transform = 'translateY(0)';
      }
    }
    lastScroll = current <= 0 ? 0 : current;
  }, { passive: true });

});
