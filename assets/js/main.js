gsap.registerPlugin(ScrollTrigger);

  /* ── APPLY SAVED THEME ── */
  const savedTheme = localStorage.getItem('theme') || 'light';
  document.documentElement.setAttribute('data-theme', savedTheme);
  const themeBtn = document.getElementById('theme-toggle');
  if (themeBtn) themeBtn.textContent = savedTheme === 'dark' ? '☀️' : '🌙';

  /* ── NAV SCROLL ── */
  window.addEventListener('scroll', () => {
    document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 30);
  });

  /* ── DARK MODE TOGGLE ── */
  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
      const next   = isDark ? 'light' : 'dark';
      document.documentElement.classList.add('theme-transitioning');
      setTimeout(() => document.documentElement.classList.remove('theme-transitioning'), 500);
      document.documentElement.setAttribute('data-theme', next);
      localStorage.setItem('theme', next);
      themeBtn.textContent = next === 'dark' ? '☀️' : '🌙';
      gsap.timeline()
        .to(themeBtn, { scale: .8, duration: .12, ease: 'power2.in' })
        .to(themeBtn, { scale: 1,  duration: .4,  ease: 'back.out(2)' });
    });
  }

  /* ── MOBILE DRAWER ── */
  const hamburger = document.getElementById('hamburger');
  const drawer    = document.getElementById('nav-drawer');
  function openDrawer()  {
    if (!hamburger || !drawer) return;
    hamburger.classList.add('open');
    drawer.classList.add('open');
    document.body.style.overflow = 'hidden';
  }
  function closeDrawer() {
    if (!hamburger || !drawer) return;
    hamburger.classList.remove('open');
    drawer.classList.remove('open');
    document.body.style.overflow = '';
  }
  window.closeDrawer = closeDrawer;
  if (hamburger) hamburger.addEventListener('click', () => {
    hamburger.classList.contains('open') ? closeDrawer() : openDrawer();
  });
  if (drawer) drawer.addEventListener('click', e => { if (e.target === drawer) closeDrawer(); });

  /* ── CUSTOM CURSOR ── */
  if (window.matchMedia('(pointer: fine)').matches) {
    document.body.classList.add('no-cursor');
    const dot  = document.getElementById('cursor-dot');
    const ring = document.getElementById('cursor-ring');
    let mx = 0, my = 0, rx = 0, ry = 0;
    window.addEventListener('mousemove', e => { mx = e.clientX; my = e.clientY; });
    gsap.ticker.add(() => {
      if (dot)  gsap.set(dot,  { x: mx, y: my });
      rx += (mx - rx) * 0.12;
      ry += (my - ry) * 0.12;
      if (ring) gsap.set(ring, { x: rx, y: ry });
    });
    document.querySelectorAll('a, button, .service-card, .faq-q, .pay-btn').forEach(el => {
      el.addEventListener('mouseenter', () => ring && ring.classList.add('hover'));
      el.addEventListener('mouseleave', () => ring && ring.classList.remove('hover'));
    });
  }

  /* ── HERO ENTRANCE ── */
  const heroTl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  heroTl
    .from('nav',             { y: -60, opacity: 0, duration: .9 })
    .from('.hero-tag',       { y: 30,  opacity: 0, duration: .7 }, '-=.4')
    .from('#hero h1',        { y: 50,  opacity: 0, duration: .9 }, '-=.5')
    .from('.hero-desc',      { y: 30,  opacity: 0, duration: .7 }, '-=.5')
    .from('.hero-btns a',    { y: 20,  opacity: 0, duration: .6, stagger: .15 }, '-=.4')
    .from('.hero-img img',   { scale: 1.08, opacity: 0, duration: 1.1, ease: 'power2.out' }, '-=.8')
    .from('.hero-badge',     { x: -40, opacity: 0, duration: .7, ease: 'back.out(1.4)' }, '-=.4')
    .from('.hero-stat',      { x: 40,  opacity: 0, duration: .7, ease: 'back.out(1.4)' }, '-=.6')
    .from('.hero-bg-circle', { scale: .7, opacity: 0, duration: 1.4, ease: 'power2.out' }, 0);

  gsap.from('.strip', { opacity: 0, y: 20, duration: .8, delay: 1.2, ease: 'power2.out' });

  /* ── PARALLAX hero circle ── */
  gsap.to('.hero-bg-circle', {
    scrollTrigger: { trigger: '#hero', start: 'top top', end: 'bottom top', scrub: 1.5 },
    y: 120, scale: 1.08, ease: 'none'
  });

  /* ── COUNTER 500+ ── */
  ScrollTrigger.create({
    trigger: '.hero-stat', start: 'top 90%', once: true,
    onEnter: () => {
      const el = document.querySelector('.hero-stat .num');
      if (!el) return;
      gsap.fromTo({ val: 0 }, { val: 500 }, {
        duration: 1.8, ease: 'power2.out',
        onUpdate: function() { el.textContent = Math.round(this.targets()[0].val) + '+'; }
      });
    }
  });

  /* ── ABOUT ── */
  gsap.from('.about-img-wrap img', {
    scrollTrigger: { trigger: '#about', start: 'top 80%' },
    clipPath: 'inset(100% 0% 0% 0%)', duration: 1.1, ease: 'power3.out'
  });
  gsap.from('.about-quote', {
    scrollTrigger: { trigger: '#about', start: 'top 65%' },
    scale: .8, opacity: 0, duration: .8, ease: 'back.out(1.6)', delay: .4
  });
  const aboutText = document.querySelector('.about-text');
  if (aboutText) {
    gsap.from(aboutText.children, {
      scrollTrigger: { trigger: '#about', start: 'top 75%' },
      y: 40, opacity: 0, duration: .8, stagger: .12, ease: 'power3.out'
    });
  }
  gsap.from('.credential-item', {
    scrollTrigger: { trigger: '.credentials', start: 'top 85%' },
    x: -30, opacity: 0, duration: .6, stagger: .1, ease: 'power2.out'
  });

  /* ── SERVICES ── */
  gsap.from('.services-header > *', {
    scrollTrigger: { trigger: '#services', start: 'top 80%' },
    y: 30, opacity: 0, duration: .7, stagger: .15, ease: 'power3.out'
  });
  gsap.from('.service-card', {
    scrollTrigger: { trigger: '.services-grid', start: 'top 80%' },
    y: 60, opacity: 0, duration: .75, stagger: { amount: .7, from: 'start' }, ease: 'power3.out'
  });
  document.querySelectorAll('.service-card').forEach(card => {
    const img = card.querySelector('.service-img');
    if (!img) return;
    card.addEventListener('mouseenter', () => gsap.to(img, { scale: 1.07, duration: .5, ease: 'power2.out' }));
    card.addEventListener('mouseleave', () => gsap.to(img, { scale: 1,    duration: .5, ease: 'power2.out' }));
  });

  /* ── HOW ── */
  gsap.from('.step', {
    scrollTrigger: { trigger: '.how-steps', start: 'top 80%' },
    x: -50, opacity: 0, duration: .7, stagger: .18, ease: 'power3.out'
  });
  gsap.from('.how-img img', {
    scrollTrigger: { trigger: '.how-grid', start: 'top 75%' },
    scale: 1.06, opacity: 0, duration: 1.1, ease: 'power2.out'
  });
  gsap.from('.how-img-overlay', {
    scrollTrigger: { trigger: '.how-img', start: 'top 70%' },
    x: -40, opacity: 0, duration: .8, ease: 'back.out(1.4)', delay: .4
  });

  /* ── TESTIMONIALS ── */
  gsap.from('.test-card', {
    scrollTrigger: { trigger: '.test-grid', start: 'top 80%' },
    y: 50, opacity: 0, rotation: 2, duration: .75,
    stagger: { amount: .5, from: 'start' }, ease: 'power3.out'
  });

  /* ── BOOKING ── */
  const bookingInfo = document.querySelector('.booking-info');
  if (bookingInfo) {
    gsap.from(bookingInfo.children, {
      scrollTrigger: { trigger: '#reservar', start: 'top 75%' },
      x: -50, opacity: 0, duration: .8, stagger: .12, ease: 'power3.out'
    });
  }
  gsap.from('.booking-form', {
    scrollTrigger: { trigger: '#reservar', start: 'top 75%' },
    y: 60, opacity: 0, duration: 1, ease: 'power3.out', delay: .2
  });
  gsap.from('.booking-feature', {
    scrollTrigger: { trigger: '.booking-features', start: 'top 85%' },
    x: -25, opacity: 0, duration: .55, stagger: .1, ease: 'power2.out'
  });

  /* ── FAQ ── */
  const faqText = document.querySelector('.faq-text');
  if (faqText) {
    gsap.from(faqText.children, {
      scrollTrigger: { trigger: '#faq', start: 'top 80%' },
      y: 30, opacity: 0, duration: .7, stagger: .12, ease: 'power3.out'
    });
  }
  gsap.from('.faq-item', {
    scrollTrigger: { trigger: '.faq-list', start: 'top 85%' },
    y: 25, opacity: 0, duration: .6, stagger: .1, ease: 'power2.out'
  });

  /* ── FOOTER ── */
  const footerGrid = document.querySelector('footer .footer-grid');
  if (footerGrid) {
    gsap.from(footerGrid.children, {
      scrollTrigger: { trigger: 'footer', start: 'top 90%' },
      y: 30, opacity: 0, duration: .7, stagger: .15, ease: 'power2.out'
    });
  }

  /* ── NAV LINK HOVER ── */
  document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('mouseenter', () => gsap.to(link, { y: -2, duration: .2 }));
    link.addEventListener('mouseleave', () => gsap.to(link, { y:  0, duration: .2 }));
  });

  /* ── SUBMIT BUTTON PULSE ── */
  const submitBtn = document.getElementById('submit-btn');
  if (submitBtn) {
    gsap.to(submitBtn, {
      boxShadow: '0 0 0 8px rgba(143,166,138,0)',
      repeat: -1, duration: 2, ease: 'power1.inOut', yoyo: true
    });
  }

  /* ── FAQ TOGGLE ── */
  window.toggleFaq = function(btn) {
    const item = btn.parentElement;
    const open = item.classList.contains('open');
    document.querySelectorAll('.faq-item').forEach(i => i.classList.remove('open'));
    if (!open) item.classList.add('open');
  };

  /* ── PAYMENT ── */
  let selectedPay = '';
  window.selectPay = function(btn, method) {
    document.querySelectorAll('.pay-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    selectedPay = method;
    document.getElementById('card-fields').classList.toggle('show', method === 'card');
    document.getElementById('mp-info').classList.toggle('show', method === 'mp');
    if (method !== 'card') document.getElementById('card-fields').classList.remove('show');
    if (method !== 'mp')   document.getElementById('mp-info').classList.remove('show');
  };

  window.formatCard = function(input) {
    let v = input.value.replace(/\D/g, '').substring(0, 16);
    input.value = v.replace(/(.{4})/g, '$1 ').trim();
  };
  window.formatExp = function(input) {
    let v = input.value.replace(/\D/g, '').substring(0, 4);
    if (v.length >= 2) v = v.substring(0,2) + '/' + v.substring(2);
    input.value = v;
  };

  const dateInput = document.getElementById('date');
  if (dateInput) dateInput.min = new Date().toISOString().split('T')[0];

  /* ── SUBMIT FORM ── */
  window.submitForm = function() {
    const required = ['fname','lname','email','phone','session-type','modality','date','time'];
    const missing = required.filter(id => !document.getElementById(id).value);
    if (missing.length) { alert('Por favor completá todos los campos requeridos.'); return; }
    if (!selectedPay)   { alert('Seleccioná un método de pago para continuar.'); return; }
    const btn = document.getElementById('submit-btn');
    btn.disabled = true;
    gsap.to(btn, { scale: .97, duration: .15, yoyo: true, repeat: 1 });
    btn.textContent = 'Procesando…';
    setTimeout(() => {
      if (selectedPay === 'mp') {
        btn.textContent = 'Redirigiendo a Mercado Pago…';
        setTimeout(() => showSuccess(), 1500);
      } else { showSuccess(); }
    }, 1200);
  };

  function showSuccess() {
    const content = document.getElementById('form-content');
    const msg     = document.getElementById('success-msg');
    gsap.to(content, { opacity: 0, y: -20, duration: .4, ease: 'power2.in', onComplete: () => {
      content.style.display = 'none';
      msg.classList.add('show');
      gsap.from(msg, { opacity: 0, y: 30, scale: .95, duration: .7, ease: 'back.out(1.4)' });
    }});
  }

  /* ── CALENDAR ── */
  const TAKEN_MAP = {
    1: ['09:00','11:00'], 3: ['10:00','14:00'], 5: ['16:00'],
    7: ['09:00','17:00'], 10: ['11:00','13:00'], 12: ['10:00','15:00'],
    14: ['09:00'], 17: ['12:00','16:00'], 19: ['11:00'],
    21: ['09:00','10:00'], 24: ['14:00'], 26: ['11:00','17:00']
  };
  const SLOTS = ['09:00','10:00','11:00','12:00','13:00','14:00','15:00','16:00','17:00','18:00','19:00'];
  let calDate = new Date(); calDate.setDate(1);
  let selDay = null, selSlot = null;

  window.calNav = function(dir) {
    calDate.setMonth(calDate.getMonth() + dir);
    selDay = null; selSlot = null;
    renderCal();
  };

  function renderCal() {
    const grid  = document.getElementById('cal-days');
    const title = document.getElementById('cal-month-label');
    const slots = document.getElementById('time-slots');
    const confBtn = document.getElementById('cal-confirm');
    if (!grid) return;

    const year = calDate.getFullYear(), month = calDate.getMonth();
    const months = ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'];
    title.textContent = months[month] + ' ' + year;

    const today = new Date(); today.setHours(0,0,0,0);
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    const offset = firstDay;

    let html = '';
    for (let i = 0; i < offset; i++) html += '<div class="cal-day empty"></div>';
    for (let d = 1; d <= daysInMonth; d++) {
      const dt = new Date(year, month, d);
      const isPast = dt < today;
      const isSun  = dt.getDay() === 0;
      const isToday = dt.toDateString() === today.toDateString();
      const isSel  = selDay === d;
      const hasDot = !isPast && !isSun && TAKEN_MAP[d]?.length < SLOTS.length;
      let cls = 'cal-day';
      if (isPast || isSun) cls += ' disabled';
      else if (hasDot)     cls += ' available';
      if (isToday) cls += ' today';
      if (isSel)   cls += ' selected';
      html += `<div class="${cls}" onclick="calSelectDay(${d})">${d}</div>`;
    }
    grid.innerHTML = html;

    // Render slots
    if (selDay) {
      const taken = TAKEN_MAP[selDay] || [];
      let shtml = '<div class="time-slots-label">Horarios disponibles</div><div class="slots-grid">';
      SLOTS.forEach(sl => {
        const isTaken = taken.includes(sl);
        const isSel   = selSlot === sl;
        shtml += `<button class="slot${isTaken ? ' taken' : ''}${isSel ? ' selected-slot' : ''}" onclick="calSelectSlot('${sl}')" ${isTaken ? 'disabled' : ''}>${sl}</button>`;
      });
      shtml += '</div>';
      slots.innerHTML = shtml;
      slots.style.display = 'block';
    } else {
      slots.innerHTML = '';
      slots.style.display = 'none';
    }

    if (confBtn) {
      confBtn.disabled = !(selDay && selSlot);
      confBtn.style.opacity = (selDay && selSlot) ? '1' : '0.45';
    }
  }

  window.calSelectDay = function(d) {
    const today = new Date(); today.setHours(0,0,0,0);
    const dt = new Date(calDate.getFullYear(), calDate.getMonth(), d);
    if (dt < today || dt.getDay() === 0) return;
    selDay = d; selSlot = null;
    renderCal();
  };

  window.calSelectSlot = function(slot) {
    selSlot = slot;
    renderCal();
  };

  window.calConfirm = function() {
    if (!selDay || !selSlot) return;
    const months = ['enero','febrero','marzo','abril','mayo','junio','julio','agosto','septiembre','octubre','noviembre','diciembre'];
    const dateStr = `${selDay} de ${months[calDate.getMonth()]} de ${calDate.getFullYear()}`;
    const pad = n => String(n).padStart(2, '0');
    const isoDate = `${calDate.getFullYear()}-${pad(calDate.getMonth()+1)}-${pad(selDay)}`;

    const dateInput = document.getElementById('date');
    const timeInput = document.getElementById('time');
    if (dateInput) { dateInput.value = isoDate; gsap.fromTo(dateInput, { borderColor: '#8FA68A', boxShadow: '0 0 0 3px rgba(143,166,138,.3)' }, { borderColor: '', boxShadow: 'none', duration: 1.5, delay: .3 }); }
    if (timeInput) { for (let opt of timeInput.options) { if (opt.text === selSlot) { opt.selected = true; break; } } }

    // Show toast
    const existing = document.getElementById('cal-toast');
    if (existing) existing.remove();
    const toast = document.createElement('div');
    toast.id = 'cal-toast';
    toast.style.cssText = 'position:fixed;bottom:6rem;left:50%;transform:translateX(-50%);background:#8FA68A;color:#fff;padding:.85rem 1.6rem;border-radius:40px;font-family:Jost,sans-serif;font-size:.9rem;font-weight:500;z-index:9999;white-space:nowrap;box-shadow:0 8px 28px rgba(0,0,0,.2);';
    toast.textContent = '✓ Turno reservado: ' + dateStr + ' a las ' + selSlot;
    document.body.appendChild(toast);
    gsap.from(toast, { y: 30, opacity: 0, duration: .5, ease: 'back.out(1.4)' });
    setTimeout(() => { gsap.to(toast, { opacity: 0, y: -10, duration: .4, onComplete: () => toast.remove() }); }, 3500);

    document.getElementById('reservar').scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  // Init calendar
  renderCal();

  /* ── WHATSAPP SEND ON SUBMIT ── */
  window.sendWhatsApp = function() {
    const numero = '5491100000000';
    const get = id => { const el = document.getElementById(id); return el ? el.value : ''; };
    const msg = encodeURIComponent(
      'Hola Valentina! Acabo de hacer una reserva:\n' +
      '👤 ' + get('fname') + ' ' + get('lname') + '\n' +
      '📧 ' + get('email') + '\n' +
      '📱 ' + get('phone') + '\n' +
      '🗓 Sesión: ' + get('session-type') + '\n' +
      '💻 Modalidad: ' + get('modality') + '\n' +
      '📅 Fecha: ' + get('date') + '\n' +
      '⏰ Horario: ' + get('time') + '\n' +
      (get('message') ? '💬 ' + get('message') : '')
    );
    window.open('https://wa.me/' + numero + '?text=' + msg, '_blank');
  };