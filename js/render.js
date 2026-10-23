/* FARESI GROUP — DOM helpers and rendering of the data-driven sections */

const $ = (s, c = document) => c.querySelector(s), $$ = (s, c = document) => [...c.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches, G = window.gsap && window.ScrollTrigger, mob = innerWidth < 900;
$('#list').innerHTML = SERVICES.map((s, i) => `<div class="row"><button aria-expanded="false" aria-controls="p${i}"><span class="n">0${i+1}</span><span class="t">${s.t}</span><span class="pl" aria-hidden="true">+</span></button><div class="pn" id="p${i}" role="region"><div><div class="pi"><p>${s.s}</p><ul>${s.l.map(x=>`<li>${x}</li>`).join('')}</ul><p style="font-size:15px;color:var(--mute);grid-column:1/3"><b style="color:#fff">How it works.</b> ${s.h}</p>${s.n?`<p class="nt">${s.n}</p>`:''}<a href="#contact" data-svc="${i}">Enquire about this</a></div></div></div></div>`).join('');
$('#steps').insertAdjacentHTML('beforeend', STEPS.map((s, i) => `<div class="step"><span>0${i+1}</span><b>${s[0]}</b><p>${s[1]}</p></div>`).join(''));
$('#pjs').innerHTML = PROJECTS.map(p => `<article class="pj ${p.cls||''}"><div class="vis" style="background:${p.bg||'#0A0E1A'};color:${p.fg||'#fff'}">${p.img?`<img src="${p.img}" alt="${p.alt}" loading="lazy">`:`<i>${p.mark}</i>`}</div><div class="inf"><span class="tag k">${p.tag}</span><h3>${p.name}</h3><p>${p.d}</p>${p.svc?`<small>${p.svc.join(' · ')}</small>`:''}${p.url?`<a class="btn mag" href="${p.url}" target="_blank" rel="noopener" aria-label="View ${p.name} website (opens in a new tab)" style="margin-top:22px">View website ↗</a>`:''}</div></article>`).join('');
$('#wl').innerHTML = WHY.map(w => `<li><span></span><strong>${w[0]}</strong><em>${w[1]}</em></li>`).join('');
$('#sel').innerHTML = '<option value="">Select a service</option>' + SERVICES.map(s => `<option>${s.t}</option>`).join('') + '<option>Not sure yet</option>';
$('#fs').innerHTML = SERVICES.map(s => `<li><a href="#services">${s.t}</a></li>`).join('');
const soc = Object.entries(CONFIG.socials).filter(e => e[1]);
$('#so').innerHTML = soc.map(e => `<a href="${e[1]}" target="_blank" rel="noopener">${e[0]}</a>`).join('');
$('#fso').innerHTML = soc.map(e => `<li><a href="${e[1]}" target="_blank" rel="noopener">${e[0]}</a></li>`).join('') || '<li>Social links coming soon</li>';
$('#yr').textContent = new Date().getFullYear();
