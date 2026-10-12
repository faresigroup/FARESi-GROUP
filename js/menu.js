/* FARESI GROUP — Mobile menu and anchor navigation (smooth scroll) */

const bg = $('#burger'), menu = $('#menu');
bg.addEventListener('click', () => {
  const o = menu.classList.toggle('open');
  bg.setAttribute('aria-expanded', o);
  bg.textContent = o ? 'CLOSE' : 'MENU'
});
let lenis, outro = false;
function go(id) {
  const t = $(id);
  if (!t) return;
  menu.classList.remove('open');
  bg.textContent = 'MENU';
  bg.setAttribute('aria-expanded', 'false');
  lenis ? lenis.scrollTo(t, { duration: 1.4 }) : t.scrollIntoView({ behavior: RM ? 'auto' : 'smooth' });
  history.replaceState(null, '', id)
}

$$('a[href^="#"]').forEach(a => a.addEventListener('click', e => {
  if (a.id === 'wa' || a.id === 'em') if (a.getAttribute('href') === '#contact') return;
  e.preventDefault();
  go(a.getAttribute('href'))
}));
