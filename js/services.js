/* FARESI GROUP — Services accordion */

let setActive = () => {};
$$('.row').forEach((r, i) => {
  const b = $('button', r);
  b.addEventListener('click', () => {
    const o = !r.classList.contains('open');
    $$('.row').forEach(x => {
      x.classList.remove('open');
      $('button', x).setAttribute('aria-expanded', 'false')
    });
    if (o) {
      r.classList.add('open');
      b.setAttribute('aria-expanded', 'true')
    }
    setActive(i)
  });
  r.addEventListener('pointerenter', () => setActive(i))
});
$$('[data-svc]').forEach(a => a.addEventListener('click', () => {
  $('#sel').selectedIndex = +a.dataset.svc + 1
}));
$('.row button').click();
