    // Nav scroll effect
    window.addEventListener('scroll', () => {
      document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 20);
    });

    // Hamburger menu
    function toggleMenu() {
      document.getElementById('navLinks').classList.toggle('open');
    }
    document.querySelectorAll('#navLinks a').forEach(a => {
      a.addEventListener('click', () => document.getElementById('navLinks').classList.remove('open'));
    });

    // Scroll reveal
    const revealEls = document.querySelectorAll('.reveal');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('visible'); } });
    }, { threshold: 0.12 });
    revealEls.forEach(el => observer.observe(el));

    // Form submit (simulation)
    function submitForm() {
      const name = document.getElementById('fname').value.trim();
      const email = document.getElementById('femail').value.trim();
      if (!name || !email) {
        alert('Por favor complete al menos su nombre y correo electrónico.');
        return;
      }
      document.getElementById('formContent').style.display = 'none';
      document.getElementById('formSuccess').style.display = 'block';
    }
