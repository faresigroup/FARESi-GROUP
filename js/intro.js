/* FARESI GROUP — Hero entrance and intro sequence */

function heroIn() {
  lenis && lenis.start();
  const v = $('.hero-media video');
  if (v) {
    if (RM) v.remove();
    else {
      v.addEventListener('error', () => v.remove());
      v.play().catch (() => v.remove())
    }
  }
  if (!G || RM) return;
  gsap.from('.hu', {
    y: 20,
    opacity: 0,
    stagger: .1,
    duration: 1,
    ease: 'expo.out',
    delay: .1
  });
  gsap.from('nav', { y: -30, opacity: 0, duration: 1, ease: 'expo.out' })
}

function intro() {
  const el = $('#intro');
  let seen = 0;
  try {
    seen = sessionStorage.getItem('fi')
  } catch (e) {}
  if (!G || RM || seen) {
    el.remove();
    return heroIn()
  }
  try {
    sessionStorage.setItem('fi', 1)
  } catch (e) {}
  lenis && lenis.stop();
  const U = getComputedStyle(document.documentElement).getPropertyValue('--up').trim();
  const tl = gsap.timeline({
    onComplete: () => {
      el.remove();
      heroIn()
    }
  });
  tl.fromTo('.lw0 .t', { opacity: 0, scale: .94, transformOrigin: '50% 80%' }, { opacity: 1, scale: 1, duration: .9, ease: 'power3.out' }).fromTo('.lw0 .u', { clipPath: `inset(${U}% 100% 0 0)` }, { clipPath: `inset(${U}% 0% 0 0)`, duration: .9, ease: 'power3.inOut' }, '-=.3').to('.lw0', { scale: 1.1, duration: .7, ease: 'power2.in' }, '+=.2').to(el, { clipPath: 'inset(0 0 100% 0)', duration: 1, ease: 'expo.inOut' }, '-=.25').from('.hero-media', { scale: 1.18, duration: 1.6, ease: 'expo.out' }, '<');
  $('#skip').addEventListener('click', () => tl.progress(1))
}
