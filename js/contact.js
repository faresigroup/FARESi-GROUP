/* FARESI GROUP — Contact buttons and inquiry form (WhatsApp / email delivery) */

const wa = $('#wa'), em = $('#em'), st = $('#st');
if (CONFIG.whatsapp) Object.assign(wa, {
  href: 'https://wa.me/' + CONFIG.whatsapp.replace(/\D/g, '') + '?text=' + encodeURIComponent('Hello FARESI GROUP, what services do you offer?'),
  target: '_blank',
  rel: 'noopener'
});
CONFIG.email ? em.href = 'mailto:' + CONFIG.email : em.remove();
[wa, em].forEach(b => b.addEventListener('click', e => {
  if (b.getAttribute('href') === '#contact') {
    e.preventDefault();
    st.textContent = (b === wa ? 'WhatsApp' : 'Email') + ' contact details have not been added yet. Please use the form.';
    $('#f input').focus()
  }
}));
function send(d, msg, f) {
  const btn = $('button[type=submit]', f);
  btn.disabled = true;
  st.textContent = 'Sending…';
  const fb = () => {
    location.href = 'mailto:' + CONFIG.email + '?subject=' + encodeURIComponent('Project inquiry — ' + d.service) + '&body=' + encodeURIComponent(msg);
    st.textContent = 'We could not send it automatically, so your email app is opening instead.';
    btn.disabled = false
  };
  fetch('https://formsubmit.co/ajax/' + CONFIG.email, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
    body: JSON.stringify({
      Name: d.name,
      Business: d.brand || '-',
      Service: d.service,
      Details: d.details,
      _subject: 'New inquiry — FARESI GROUP website',
      _template: 'table',
      _honey: d._honey || ''
    })
  }).then(r => r.json()).then(j => {
    if (j.success === true || j.success === 'true') {
      st.textContent = 'Thank you! Your inquiry has been sent. We will get back to you soon.';
      f.reset();
      btn.disabled = false
    } else fb()
  }).catch (fb)
}

$('#f').addEventListener('submit', e => {
  e.preventDefault();
  const f = e.target, d = Object.fromEntries(new FormData(f));
  if (!d.name.trim() || !d.service || !d.details.trim()) {
    st.textContent = 'Please add your name, a service and project details.';
    return
  }
  const msg = `New inquiry — FARESI GROUP\nName: ${d.name}\nBrand: ${d.brand||'-'}\nService: ${d.service}\nDetails: ${d.details}`;
  if (!CONFIG.email && CONFIG.whatsapp) {
    open('https://wa.me/' + CONFIG.whatsapp.replace(/\D/g, '') + '?text=' + encodeURIComponent(msg), '_blank');
    st.textContent = 'Opening WhatsApp with your inquiry…'
  } else if (CONFIG.email) {
    send(d, msg, f)
  } else st.textContent = 'Inquiry form is ready, but no contact destination has been configured yet.'
});
