(() => {
  'use strict';
  document.getElementById('year').textContent = new Date().getFullYear();
  const toggle = document.querySelector('.nav-toggle');
  const menu = document.getElementById('mobile-menu');
  function closeMenu() { menu.hidden = true; toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','Abrir menu'); }
  toggle.addEventListener('click', () => { menu.hidden = !menu.hidden; toggle.setAttribute('aria-expanded',String(!menu.hidden)); toggle.setAttribute('aria-label',menu.hidden ? 'Abrir menu' : 'Fechar menu'); });
  menu.querySelectorAll('a').forEach(a => a.addEventListener('click',closeMenu));
  document.addEventListener('keydown',e => { if(e.key === 'Escape' && !menu.hidden) { closeMenu(); toggle.focus(); } });
  window.addEventListener('scroll',()=>document.querySelector('.header').classList.toggle('is-scrolled',window.scrollY>25),{passive:true});
  const form = document.getElementById('quote-form');
  const fields = ['nome','regiao','descricao'].map(id => document.getElementById(id));
  function validate(input) {
    const invalid = !input.value.trim();
    input.setAttribute('aria-invalid',String(invalid));
    input.closest('.field').classList.toggle('field--error',invalid);
    document.getElementById('err-'+input.id).textContent = invalid ? 'Preencha este campo para continuar.' : '';
    return !invalid;
  }
  fields.forEach(input=>input.addEventListener('input',()=> { if(input.hasAttribute('aria-invalid')) validate(input); }));
  form.addEventListener('submit',e => {
    e.preventDefault();
    const valid = fields.map(validate).every(Boolean);
    if(!valid) { fields.find(f=>f.getAttribute('aria-invalid')==='true').focus(); return; }
    const [name,region,description] = fields.map(f=>f.value.trim());
    const message = `Olá! Vim pelo site da DL Móveis Planejados e gostaria de solicitar um orçamento.\n\nNome: ${name}\nCidade ou bairro: ${region}\nAmbiente: ${document.getElementById('ambiente').value || 'A definir'}\nMeu projeto: ${description}`;
    window.open('https://wa.me/5511992222298?text='+encodeURIComponent(message),'_blank','noopener,noreferrer');
  });
  const items = [...document.querySelectorAll('.gallery__item')];
  const filters = [...document.querySelectorAll('.filter')];
  filters.forEach(button=>button.addEventListener('click',()=> {
    filters.forEach(b=> { const active=b===button; b.classList.toggle('active',active); b.setAttribute('aria-pressed',String(active)); });
    items.forEach(item=> { item.hidden = button.dataset.filter!=='Todos' && item.dataset.category!==button.dataset.filter; });
    document.getElementById('gallery-status').textContent = `${items.filter(x=>!x.hidden).length} fotos de projetos`;
  }));
  const dialog = document.getElementById('lightbox');
  const image = dialog.querySelector('img');
  let activeItem;
  function show(item) { activeItem=item; image.src=item.dataset.img; image.alt=item.querySelector('img').alt; document.getElementById('photo-caption').textContent=item.querySelector('.gallery__caption span').textContent; document.getElementById('photo-category').textContent=item.dataset.category; document.getElementById('photo-description').textContent=item.querySelector('img').alt+'. Explore a composição e os detalhes deste ambiente para reunir referências para o seu projeto.'; }
  items.forEach(item=>item.addEventListener('click',()=> { show(item); dialog.showModal(); document.body.style.overflow='hidden'; }));
  document.getElementById('project-quote').addEventListener('click',()=>dialog.close());
  dialog.querySelector('.lightbox__close').addEventListener('click',()=>dialog.close());
  dialog.addEventListener('close',()=> { document.body.style.overflow=''; if(activeItem) activeItem.focus(); });
  dialog.addEventListener('click',e=> { if(e.target===dialog) dialog.close(); });
  function next(delta) { const visible=items.filter(x=>!x.hidden); show(visible[(visible.indexOf(activeItem)+delta+visible.length)%visible.length]); }
  dialog.querySelector('.lightbox__prev').addEventListener('click',()=>next(-1));
  dialog.querySelector('.lightbox__next').addEventListener('click',()=>next(1));
  dialog.addEventListener('keydown',e=> { if(e.key==='ArrowLeft') { e.preventDefault(); next(-1); } if(e.key==='ArrowRight') { e.preventDefault(); next(1); } });
})();

(() => {
  const dialog = document.getElementById('demo-dialog');
  const reopen = document.getElementById('demo-reopen');

  let previousOverflow = '';
  function openDemo(){ previousOverflow = document.body.style.overflow; dialog.showModal(); document.body.style.overflow = 'hidden'; }
  function closeDemo(){ dialog.close(); }
  document.getElementById('demo-close').addEventListener('click',closeDemo);
  document.getElementById('demo-continue').addEventListener('click',closeDemo);
  reopen.addEventListener('click',openDemo);
  dialog.addEventListener('click',e=>{if(e.target===dialog){const r=dialog.getBoundingClientRect();if(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom)closeDemo();}});
  dialog.addEventListener('close',()=>{ document.body.style.overflow=previousOverflow; });

  openDemo();
})();


