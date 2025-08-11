/* global document, window */
(function () {
  'use strict'; 

  /* ---------- TYPING EFFECT (Hero) ---------- */
  const heroTitle = document.querySelector('.hero h1');
  const originalText = 'WordFlow — Pure Words, Pure Focus';

  if (heroTitle) {
    heroTitle.textContent = '';
    let i = 0;
    const type = () => {
      if (i < originalText.length) {
        heroTitle.textContent += originalText[i++];
        setTimeout(type, 80);
      }
    };
    type();
  }

  /* ---------- RANDOM QUOTE ROTATOR ---------- */
  const quotes = [
    { text: 'The pen is mightier than the sword.', author: 'Edward Bulwer-Lytton' },
    { text: 'Words are, in my not-so-humble opinion, our most inexhaustible source of magic.', author: 'J.K. Rowling' },
    { text: 'A word after a word after a word is power.', author: 'Margaret Atwood' },
    { text: 'Words can light fires in the minds of men.', author: 'Patrick Rothfuss' }
  ];

  const quoteEl = document.querySelector('.daily-quote blockquote');
  if (quoteEl) {
    const cycleQuote = () => {
      const { text, author } = quotes[Math.floor(Math.random() * quotes.length)];
      quoteEl.style.opacity = 0;
      setTimeout(() => {
        quoteEl.innerHTML = `“${text}” <footer>— ${author}</footer>`;
        quoteEl.style.opacity = 1;
      }, 300);
    };
    setInterval(cycleQuote, 10000);
  }

  /* ---------- MOBILE MENU ---------- */
  const menuBtn = document.getElementById('menuToggle');
  const navLinks = document.getElementById('navLinks');

  const toggleMenu = () => {
    const open = navLinks.classList.toggle('active');
    menuBtn.classList.toggle('active');
    document.body.style.overflow = open ? 'hidden' : '';
  };

  menuBtn?.addEventListener('click', toggleMenu);
  navLinks?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    navLinks.classList.remove('active');
    menuBtn.classList.remove('active');
    document.body.style.overflow = '';
  }));

  /* ---------- SCROLL PROGRESS BAR ---------- */
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.appendChild(progress);

  window.addEventListener('scroll', () => {
    const winScroll = document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    progress.style.width = `${(winScroll / height) * 100}%`;
  });

  /* ---------- NEWSLETTER FAKE SUBMIT ---------- */
  const form = document.querySelector('.subscribe-form');
  form?.addEventListener('submit', (e) => {
    e.preventDefault();
    const btn = form.querySelector('button');
    btn.textContent = '✨ Welcome aboard!';
    setTimeout(() => {
      btn.textContent = 'Subscribe';
      form.reset();
    }, 2000);
  });

  /* ---------- REVEAL ON SCROLL ---------- */
  const io = new IntersectionObserver(entries => {
    entries.forEach(({ target, isIntersecting }) => {
      if (isIntersecting) {
        target.style.opacity = 1;
        target.style.transform = 'translateY(0)';
      }
    });
  }, { threshold: 0.1 });

  document.querySelectorAll('section').forEach((sec, idx) => {
    sec.style.opacity = 0;
    sec.style.transform = 'translateY(20px)';
    sec.style.transition = `opacity .8s ease ${idx * 100}ms, transform .8s ease ${idx * 100}ms`;
    io.observe(sec);
  });

})();
