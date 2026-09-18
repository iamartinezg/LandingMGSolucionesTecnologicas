/* ==========================================================================
   MG SOLUCIONES TECNOLÓGICAS — JavaScript
   ========================================================================== */
(function () {
  'use strict';

  var $  = function (s, c) { return (c || document).querySelector(s); };
  var $$ = function (s, c) { return Array.prototype.slice.call((c || document).querySelectorAll(s)); };

  document.addEventListener('DOMContentLoaded', function () {
    stickyHeader();
    mobileMenu();
    revealOnScroll();
    faqAccordion();
    blogFilters();
    contactForm();
    setYear();
  });

  /* ----------------------------------------------------------------------
     Header: oculta al bajar en móvil, muestra al subir
     ---------------------------------------------------------------------- */
  function stickyHeader() {
    var header = $('.site-header');
    if (!header) return;
    var last = 0, ticking = false;

    function update() {
      var y = window.pageYOffset;
      if (window.innerWidth <= 768) {
        if (y > last + 50 && y > 140) header.style.transform = 'translateY(-100%)';
        else if (y < last - 6) header.style.transform = '';
      } else {
        header.style.transform = '';
      }
      last = y < 0 ? 0 : y;
      ticking = false;
    }

    window.addEventListener('scroll', function () {
      if (!ticking) { window.requestAnimationFrame(update); ticking = true; }
    }, { passive: true });

    window.addEventListener('resize', function () { header.style.transform = ''; }, { passive: true });
  }

  /* ----------------------------------------------------------------------
     Menú móvil
     ---------------------------------------------------------------------- */
  function mobileMenu() {
    var toggle = $('.nav-toggle');
    var menu   = $('.nav-mobile');
    if (!toggle || !menu) return;

    function open()  {
      menu.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
      toggle.setAttribute('aria-label', 'Cerrar menú');
      document.body.style.overflow = 'hidden';
    }
    function close() {
      menu.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
      toggle.setAttribute('aria-label', 'Abrir menú');
      document.body.style.overflow = '';
    }

    toggle.addEventListener('click', function (e) {
      e.stopPropagation();
      menu.classList.contains('open') ? close() : open();
    });

    $$('a', menu).forEach(function (a) { a.addEventListener('click', close); });

    document.addEventListener('click', function (e) {
      if (menu.classList.contains('open') && !menu.contains(e.target) && !toggle.contains(e.target)) close();
    });

    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && menu.classList.contains('open')) { close(); toggle.focus(); }
    });

    window.addEventListener('resize', function () {
      if (window.innerWidth > 768) close();
    }, { passive: true });
  }

  /* ----------------------------------------------------------------------
     Aparición progresiva al hacer scroll
     ---------------------------------------------------------------------- */
  function revealOnScroll() {
    var sel = '.card,.feature,.stat-card,.value-card,.cert-card,.mv-card,' +
              '.brand-item,.product-card,.post,.faq-item,.contact-item,.panel-stat,.checklist';
    var items = $$(sel);
    if (!items.length) return;

    if (!('IntersectionObserver' in window) ||
        window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      items.forEach(function (el) { el.classList.add('is-visible'); });
      return;
    }

    items.forEach(function (el, i) {
      el.classList.add('reveal');
      el.dataset.d = String((i % 4) * 60);
    });

    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (en) {
        if (!en.isIntersecting) return;
        var d = parseInt(en.target.dataset.d, 10) || 0;
        setTimeout(function () { en.target.classList.add('is-visible'); }, d);
        io.unobserve(en.target);
      });
    }, { threshold: 0.06, rootMargin: '0px 0px -30px 0px' });

    items.forEach(function (el) { io.observe(el); });
  }

  /* ----------------------------------------------------------------------
     Acordeón de preguntas frecuentes
     ---------------------------------------------------------------------- */
  function faqAccordion() {
    var buttons = $$('.faq-q');
    if (!buttons.length) return;

    buttons.forEach(function (btn) {
      btn.addEventListener('click', function () {
        var isOpen = btn.getAttribute('aria-expanded') === 'true';
        buttons.forEach(function (b) {
          b.setAttribute('aria-expanded', 'false');
          var p = document.getElementById(b.getAttribute('aria-controls'));
          if (p) p.hidden = true;
        });
        if (!isOpen) {
          btn.setAttribute('aria-expanded', 'true');
          var panel = document.getElementById(btn.getAttribute('aria-controls'));
          if (panel) panel.hidden = false;
        }
      });
    });
  }

  /* ----------------------------------------------------------------------
     Filtros del blog (sin recargar la página)
     ---------------------------------------------------------------------- */
  function blogFilters() {
    var filters = $$('.filter');
    var posts   = $$('.post');
    var empty   = $('#sinResultados');
    if (!filters.length || !posts.length) return;

    function apply(cat) {
      var shown = 0;
      posts.forEach(function (post) {
        var cats = (post.dataset.cat || '').split('|');
        var match = cat === 'todos' || cats.indexOf(cat) !== -1;
        post.hidden = !match;
        if (match) shown++;
      });
      if (empty) empty.hidden = shown !== 0;
    }

    filters.forEach(function (btn) {
      btn.addEventListener('click', function () {
        filters.forEach(function (b) { b.setAttribute('aria-pressed', 'false'); });
        btn.setAttribute('aria-pressed', 'true');
        apply(btn.dataset.filter);
      });
    });
  }

  /* ----------------------------------------------------------------------
     Formulario de contacto: validación + envío
     ---------------------------------------------------------------------- */
  function contactForm() {
    var form = $('#formContacto');
    if (!form) return;

    var okBox  = $('#avisoOk');
    var errBox = $('#avisoError');

    var required = $$('[required]', form);
    required.forEach(function (f) {
      f.addEventListener('blur',  function () { validate(f); });
      f.addEventListener('input', function () { clear(f); });
    });

    form.addEventListener('submit', function (e) {
      e.preventDefault();
      hide(okBox); hide(errBox);

      var valid = true, first = null;
      required.forEach(function (f) {
        if (!validate(f)) { valid = false; if (!first) first = f; }
      });
      if (!valid) { if (first) first.focus(); return; }

      var btn  = $('.form-submit', form);
      var html = btn.innerHTML;
      btn.disabled = true;
      btn.innerHTML =
        '<svg class="spin" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5">' +
        '<path d="M21 12a9 9 0 1 1-6.22-8.56"/></svg> Enviando…';

      fetch(form.action, {
        method: 'POST',
        body: new FormData(form),
        headers: { Accept: 'application/json' }
      })
      .then(function (res) {
        if (!res.ok) throw new Error('HTTP ' + res.status);
        show(okBox);
        form.reset();
        required.forEach(clear);
        okBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        setTimeout(function () { hide(okBox); }, 9000);
      })
      .catch(function () {
        show(errBox);
        errBox.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      })
      .then(function () {
        btn.disabled = false;
        btn.innerHTML = html;
      });
    });

    function validate(field) {
      clear(field);
      var v = field.value.trim();

      if (!v) {
        return fail(field, field.dataset.msg || 'Este campo es obligatorio.');
      }
      if (field.type === 'email' && !/^[^\s@]+@[^\s@]+\.[a-z]{2,}$/i.test(v)) {
        return fail(field, 'Ingrese un correo electrónico válido.');
      }
      if (field.name === 'nombre' && v.length < 3) {
        return fail(field, 'Ingrese su nombre completo.');
      }
      if (field.name === 'mensaje' && v.length < 10) {
        return fail(field, 'Cuéntenos un poco más sobre su necesidad.');
      }
      return true;
    }

    function fail(field, msg) {
      field.setAttribute('aria-invalid', 'true');
      var id = field.id + '-error';
      var span = document.getElementById(id);
      if (!span) {
        span = document.createElement('span');
        span.className = 'field-error';
        span.id = id;
        span.setAttribute('role', 'alert');
        field.parentNode.appendChild(span);
      }
      span.textContent = msg;
      field.setAttribute('aria-describedby', id);
      return false;
    }

    function clear(field) {
      field.removeAttribute('aria-invalid');
      field.removeAttribute('aria-describedby');
      var span = document.getElementById(field.id + '-error');
      if (span) span.remove();
    }

    function show(el) { if (el) el.setAttribute('data-visible', ''); }
    function hide(el) { if (el) el.removeAttribute('data-visible'); }
  }

  /* ----------------------------------------------------------------------
     Año dinámico en el footer
     ---------------------------------------------------------------------- */
  function setYear() {
    $$('[data-year]').forEach(function (el) {
      el.textContent = String(new Date().getFullYear());
    });
  }

})();
