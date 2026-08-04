(() => {
  'use strict';
  const header = document.querySelector('[data-header]');
  const menu = document.querySelector('[data-menu]');
  const nav = document.querySelector('[data-nav]');
  const onScroll = () => header?.classList.toggle('scrolled', scrollY > 20);
  onScroll(); addEventListener('scroll', onScroll, {passive:true});
  menu?.addEventListener('click', () => {
    const open = nav?.classList.toggle('open');
    menu.setAttribute('aria-expanded', String(Boolean(open)));
  });
  nav?.querySelectorAll('a').forEach(a => a.addEventListener('click', () => {
    nav.classList.remove('open'); menu?.setAttribute('aria-expanded','false');
  }));

  const observer = new IntersectionObserver(entries => entries.forEach(e => {
    if (e.isIntersecting) { e.target.classList.add('visible'); observer.unobserve(e.target); }
  }), {threshold:.12});
  document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
  document.querySelectorAll('[data-year]').forEach(el => el.textContent = new Date().getFullYear());

  const stats = {individuals:0,organisations:0,devices:0,letters:0,pilots:0,quotes:0};
  Object.entries(stats).forEach(([k,v]) => document.querySelectorAll(`[data-count="${k}"]`).forEach(el => el.textContent = v.toLocaleString('it-IT')));
  const targets = {individuals:1000,organisations:30,devices:2500,letters:10,pilots:5,quotes:2};
  const progress = Object.keys(stats).reduce((s,k)=>s+Math.min(stats[k]/targets[k],1),0)/Object.keys(stats).length*100;
  document.querySelectorAll('[data-gate]').forEach(el => el.textContent = `${Math.round(progress)}%`);
  document.querySelectorAll('[data-bar]').forEach(el => el.style.width = `${progress}%`);

  const params = new URLSearchParams(location.search);
  const requested = params.get('tipo');
  const tabs = [...document.querySelectorAll('[data-tab]')];
  const forms = [...document.querySelectorAll('[data-form]')];
  function show(type){tabs.forEach(b=>b.classList.toggle('active',b.dataset.tab===type));forms.forEach(f=>f.classList.toggle('active',f.dataset.form===type));}
  tabs.forEach(b=>b.addEventListener('click',()=>show(b.dataset.tab)));
  if (requested && tabs.some(b=>b.dataset.tab===requested)) show(requested);
  else if (tabs.length) show(tabs[0].dataset.tab);
  forms.forEach(form => form.addEventListener('submit', e => {
    e.preventDefault();
    const status = form.querySelector('[data-status]');
    if (status) status.textContent = 'Modulo dimostrativo: il backend verrà attivato dopo la definizione del titolare e della privacy definitiva.';
  }));
})();