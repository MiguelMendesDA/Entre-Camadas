const filters = document.querySelectorAll('.filter');
const gallery = document.querySelector('#gallery-grid');
const lightbox = document.querySelector('#lightbox');
const art = document.querySelector('#lightbox-art');
let works = [], visible = [], current = 0;
const controls = document.createElement('div');
controls.className = 'viewer-controls';
const previous = document.createElement('button');
previous.textContent = 'Anterior';
const count = document.createElement('span');
count.setAttribute('aria-live', 'polite');
const next = document.createElement('button');
next.textContent = 'Seguinte';
controls.append(previous, count, next);
lightbox.append(controls);
function show(index) {
  current = (index + visible.length) % visible.length;
  const work = visible[current];
  const img = document.createElement('img');
  img.src = work.image; img.alt = work.title;
  art.replaceChildren(img);
  document.querySelector('#lightbox-title').textContent = work.title;
  document.querySelector('#lightbox-meta').textContent = work.meta;
  count.textContent = `${current + 1} / ${visible.length}`;
  if (!lightbox.open) { lightbox.showModal(); document.body.classList.add('viewer-open'); }
}
function render(category = 'all') {
  visible = works.filter(w => category === 'all' || w.category === category);
  gallery.replaceChildren();
  visible.forEach((work, index) => {
    const card = document.createElement('button');
    card.type = 'button'; card.className = 'art-card';
    const img = document.createElement('img');
    img.src = work.image; img.alt = work.title; img.loading = 'lazy';
    const info = document.createElement('span'); info.className = 'card-info';
    const title = document.createElement('strong'); title.textContent = work.title;
    const meta = document.createElement('small'); meta.textContent = work.meta;
    info.append(title, meta); card.append(img, info);
    card.addEventListener('click', () => show(index)); gallery.append(card);
  });
}
fetch('imagens/obras.json').then(r => { if (!r.ok) throw Error(); return r.json(); }).then(data => {
  works = data;
  filters.forEach(f => { f.hidden = f.dataset.filter !== 'all' && !works.some(w => w.category === f.dataset.filter); });
  render();
}).catch(() => { gallery.textContent = 'Não foi possível carregar as obras. Atualiza a página para tentar novamente.'; });
filters.forEach(f => {
  f.setAttribute('aria-pressed', f.classList.contains('active'));
  f.addEventListener('click', () => {
    filters.forEach(item => { item.classList.toggle('active', item === f); item.setAttribute('aria-pressed', item === f); });
    render(f.dataset.filter);
  });
});
previous.addEventListener('click', () => show(current - 1));
next.addEventListener('click', () => show(current + 1));
lightbox.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft' || e.key === 'ArrowRight') { e.preventDefault(); show(current + (e.key === 'ArrowLeft' ? -1 : 1)); }
});
document.querySelector('.close-lightbox').addEventListener('click', () => lightbox.close());
lightbox.addEventListener('click', e => { if (e.target === lightbox) { const r = lightbox.getBoundingClientRect(); if (e.clientX < r.left || e.clientX > r.right || e.clientY < r.top || e.clientY > r.bottom) lightbox.close(); } });
lightbox.addEventListener('close', () => document.body.classList.remove('viewer-open'));
const menu = document.querySelector('.menu-toggle'), nav = document.querySelector('.nav-links');
function closeMenu() { nav.classList.remove('open'); menu.setAttribute('aria-expanded', 'false'); }
menu.addEventListener('click', () => menu.setAttribute('aria-expanded', nav.classList.toggle('open')));
nav.querySelectorAll('a').forEach(a => a.addEventListener('click', closeMenu));
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeMenu(); });
