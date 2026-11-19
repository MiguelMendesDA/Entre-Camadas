const filters = document.querySelectorAll('.filter');
const gallery = document.querySelector('#gallery-grid');
const lightbox = document.querySelector('#lightbox');
const lightboxArt = document.querySelector('#lightbox-art');
const lightboxTitle = document.querySelector('#lightbox-title');
const lightboxMeta = document.querySelector('#lightbox-meta');

function renderGallery(works) {
  gallery.innerHTML = works.map((work, index) => `
    <button class="art-card ${index % 5 === 0 ? 'card-tall' : ''} ${index % 3 === 1 ? 'card-wide' : ''}" data-category="${work.category}" data-title="${work.title}" data-meta="${work.meta}" data-art="${work.art || 'sea'}" type="button">
      <span class="art-thumb art-${work.art || 'sea'} ${work.image ? 'has-image' : ''}" ${work.image ? `style="background-image:url('${work.image}');background-size:cover;background-position:center"` : ''}></span>
      <span class="card-info"><strong>${work.title}</strong><small>${work.meta}</small></span>
    </button>`).join('');

  gallery.querySelectorAll('.art-card').forEach((card) => card.addEventListener('click', () => {
    lightboxArt.className = `lightbox-art art-${card.dataset.art}${card.querySelector('.art-thumb').classList.contains('has-image') ? ' has-image' : ''}`;
    lightboxTitle.textContent = card.dataset.title;
    lightboxMeta.textContent = card.dataset.meta;
    const image = card.querySelector('.art-thumb').style.backgroundImage;
    if (image) lightboxArt.style.backgroundImage = image;
    lightbox.showModal();
  }));
}

fetch('imagens/obras.json')
  .then((response) => response.json())
  .then(renderGallery)
  .catch(() => console.warn('Não foi possível carregar imagens/obras.json.'));

filters.forEach((filter) => filter.addEventListener('click', () => {
  filters.forEach((item) => item.classList.remove('active'));
  filter.classList.add('active');
  const selected = filter.dataset.filter;
  gallery.querySelectorAll('.art-card').forEach((card) => card.classList.toggle('is-hidden', selected !== 'all' && card.dataset.category !== selected));
}));

document.querySelector('.close-lightbox').addEventListener('click', () => { lightboxArt.style.backgroundImage = ''; lightbox.close(); });
lightbox.addEventListener('click', (event) => { if (event.target === lightbox) lightbox.close(); });

const menuButton = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav-links');
menuButton.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  menuButton.setAttribute('aria-expanded', open);
});
nav.querySelectorAll('a').forEach((link) => link.addEventListener('click', () => nav.classList.remove('open')));
