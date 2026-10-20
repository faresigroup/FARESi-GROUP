/* FARESI GROUP — Text splitting, Lenis smooth scroll and GSAP / ScrollTrigger animations */

function split(el) {
  const t = el.textContent.trim().split(/\s+/);
  el.setAttribute('aria-label', t.join(' '));
  el.innerHTML = t.map(w => `<span class="m" aria-hidden="true"><span class="w">${w}</span></span>`).join(' ');
  return $$('.w', el)
}

function motion() {
  if (!G) return;
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.config({ ignoreMobileResize: true });
  const rf = () => ScrollTrigger.refresh();
  addEventListener('orientationchange', () => setTimeout(rf, 350));
  addEventListener('load', rf);
  document.fonts && document.fonts.ready.then(rf);
  if (!RM && window.Lenis) {
    lenis = new Lenis({ lerp: .1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add(t => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0)
  }
  const nav = $('nav');
  $$('main>[data-theme],.mq,footer').forEach(s => ScrollTrigger.create({
    trigger: s,
    start: 'top 48px',
    end: 'bottom 48px',
    onToggle: x => {
      if (!x.isActive) return;
      nav.dataset.theme = s.dataset.theme;
      nav.classList.toggle('ah', s.id === 'home' && innerWidth > 900);
      if (s.id) $$('nav a.l').forEach(a => a.classList.toggle('on', a.getAttribute('href') === '#' + s.id))
    }
  }));
  if (RM) return;
  let sn = false;
  ScrollTrigger.create({
    trigger: '#home',
    start: 'top top',
    end: 'bottom 25%',
    onUpdate: s => {
      if (s.direction === 1 && s.progress > .03 && !sn) {
        sn = true;
        const t = $('#about');
        lenis ? lenis.scrollTo(t, { duration: 1.3 }) : t.scrollIntoView({ behavior: 'smooth' })
      } else if (s.progress < .01) sn = false
    },
    onEnterBack: () => {
      sn = true
    }
  });
  const hv = $('.hero-media video');
  if (hv) ScrollTrigger.create({
    trigger: '#home',
    start: 'top top',
    end: 'bottom 25%',
    onLeave: () => hv.pause(),
    onEnterBack: () => {
      if (hv.isConnected) hv.play().catch (() => {})
    }
  });
  $$('[data-split]').forEach(h => {
    const w = split(h);
    gsap.set(w, { yPercent: 115 });
    ScrollTrigger.create({
      trigger: h,
      start: 'top 88%',
      once: true,
      onEnter: () => gsap.to(w, { yPercent: 0, duration: 1.1, ease: 'expo.out', stagger: .05 })
    })
  });
  gsap.to('.hero-media img,.hero-media video', {
    yPercent: 7,
    scale: 1.12,
    ease: 'none',
    scrollTrigger: { trigger: '#home', start: 'top top', end: 'bottom top', scrub: true }
  });
  gsap.from('.about .rule', {
    scaleX: 0,
    duration: 1.4,
    ease: 'expo.out',
    scrollTrigger: { trigger: '.about .rule', start: 'top 90%' }
  });
  gsap.from('.about p:not(.k)', {
    y: 40,
    opacity: 0,
    duration: 1,
    ease: 'power3.out',
    scrollTrigger: { trigger: '.about p:not(.k)', start: 'top 88%' }
  });
  gsap.to('.steps .fill', {
    scaleY: 1,
    ease: 'none',
    scrollTrigger: { trigger: '.steps', start: 'top 60%', end: 'bottom 70%', scrub: true }
  });
  $$('.step').forEach(s => gsap.from(s.children, {
    y: 50,
    opacity: 0,
    stagger: .1,
    duration: 1,
    ease: 'expo.out',
    scrollTrigger: { trigger: s, start: 'top 80%' }
  }));
  $$('.pj').forEach(p => {
    const v = $('.vis', p), i = $('i,img', p), im = i.tagName === 'IMG';
    gsap.from(v, {
      clipPath: 'inset(0 100% 0 0)',
      duration: 1.3,
      ease: 'expo.inOut',
      scrollTrigger: { trigger: p, start: 'top 80%' }
    });
    gsap.fromTo(i, im ? { yPercent: -6 } : { xPercent: -12 }, {
      [im ? 'yPercent' : 'xPercent']: im ? 6 : 12,
      ease: 'none',
      scrollTrigger: { trigger: p, start: 'top bottom', end: 'bottom top', scrub: true }
    });
    gsap.from($('.inf', p).children, {
      y: 30,
      opacity: 0,
      stagger: .08,
      duration: .9,
      ease: 'power3.out',
      scrollTrigger: { trigger: p, start: 'top 70%' }
    })
  });
  $$('.wl li').forEach(l => gsap.from(l.children, {
    y: 30,
    opacity: 0,
    stagger: .08,
    duration: .9,
    ease: 'power3.out',
    scrollTrigger: { trigger: l, start: 'top 92%' }
  }));
  if (matchMedia('(hover:hover) and (pointer:fine)').matches) {
    const cu = $('#cur');
    addEventListener('pointermove', e => gsap.to(cu, {
      x: e.clientX - 6,
      y: e.clientY - 6,
      duration: .25,
      ease: 'power3.out',
      overwrite: true
    }));
    $$('a,button').forEach(a => {
      a.addEventListener('pointerenter', () => cu.classList.add('big'));
      a.addEventListener('pointerleave', () => cu.classList.remove('big'))
    });
    $$('.mag').forEach(m => {
      const mv = e => {
        const r = m.getBoundingClientRect();
        gsap.to(m, {
          x: (e.clientX - r.left - r.width / 2) * .25,
          y: (e.clientY - r.top - r.height / 2) * .35,
          duration: .4,
          ease: 'power3.out'
        })
      };
      m.addEventListener('pointermove', mv);
      m.addEventListener('pointerleave', () => gsap.to(m, { x: 0, y: 0, duration: .6, ease: 'elastic.out(1,.5)' }))
    })
  }
}
