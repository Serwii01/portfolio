import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Lenis from 'lenis';
import { icon } from './icons.js';
import { links, projects, categories, clientSites, duoqit, work, studies, certs, extras, stack } from './data.js';

gsap.registerPlugin(ScrollTrigger);

const $ = (s, el = document) => el.querySelector(s);
const $$ = (s, el = document) => [...el.querySelectorAll(s)];
const reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
const finePointer = matchMedia('(hover: hover) and (pointer: fine)').matches;
const esc = (s) => String(s).replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' })[c]);
const host = (url) => new URL(url).hostname.replace('www.', '');
const shot = (slug, n) => `shots/${slug}-${n}.webp`;
const catLabel = Object.fromEntries(categories.map((c) => [c.id, c.label]));
const body = document.body;

/* ===== Render ===== */
function browserFrame(url, src, alt, cls = '') {
  return `
    <figure class="browser ${cls}">
      <div class="browser__bar"><i></i><i></i><i></i><span>${esc(url)}</span></div>
      <img src="${src}" alt="${esc(alt)}" loading="lazy" />
    </figure>`;
}
function phoneFrame(src, alt, cls = '') {
  return `<figure class="phone ${cls}"><img src="${src}" alt="${esc(alt)}" loading="lazy" /></figure>`;
}

function render() {
  $$('[data-link]').forEach((a) => (a.href = links[a.dataset.link]));
  $$('[data-icon]').forEach((el) => el.insertAdjacentHTML(el.hasAttribute('data-icon-after') ? 'beforeend' : 'afterbegin', icon(el.dataset.icon)));
  $('.contact__mail-text').textContent = links.email;
  $('.year').textContent = new Date().getFullYear();

  const words = ['Java', 'Spring Boot', 'Angular', 'React', 'TypeScript', 'Astro', 'MySQL', 'Docker', 'Git', 'JavaFX', 'Supabase', 'MapLibre'];
  const row = words.map((w) => `<span>${w}</span>`).join('');
  $('.marquee__track').innerHTML = row + row;

  $('#stack').innerHTML = stack
    .map((g) => `<div class="stack__group reveal"><h3>${g.group}</h3><div class="chips">${g.items.map((i) => `<span class="chip">${i}</span>`).join('')}</div></div>`)
    .join('');

  const counts = Object.fromEntries(categories.map((c) => [c.id, c.id === 'all' ? projects.length : projects.filter((p) => p.cat === c.id).length]));
  $('.filters').innerHTML = categories
    .map((c, i) => `<button class="filter" role="tab" data-cat="${c.id}" aria-selected="${i === 0}">${c.label}<sup>${counts[c.id]}</sup></button>`)
    .join('');

  $('.projects').innerHTML = projects
    .map(
      (p) => `
      <article class="card${p.shots ? ' has-shot' : ''}" data-cat="${p.cat}" data-accent="${p.accent}" data-open="${p.slug}">
        <div class="card__visual">
          ${
            p.shots
              ? `<img src="${shot(p.slug, 1)}" alt="Captura de ${esc(p.name)}" loading="lazy" /><span class="card__icon">${icon(p.icon)}</span>`
              : `<span class="card__name-bg" aria-hidden="true">${esc(p.name)}</span><span class="card__glyph">${icon(p.icon)}</span>`
          }
          ${p.featured ? '<span class="card__badge">★ Destacado</span>' : ''}
        </div>
        <div class="card__body">
          <div class="card__top"><h3 class="card__title">${esc(p.name)}</h3><span class="card__year">${p.year}</span></div>
          <p class="card__desc">${esc(p.desc)}</p>
          <div class="card__tags">${p.tags.slice(0, 4).map((t) => `<span>${esc(t)}</span>`).join('')}</div>
          <div class="card__links">
            <button type="button" class="card__more" data-open="${p.slug}">Ver proyecto ${icon('ArrowRight')}</button>
            ${p.demo ? `<a class="card__ico" href="${p.demo}" target="_blank" rel="noopener" title="Abrir ${host(p.demo)}" aria-label="Abrir web de ${esc(p.name)}">${icon('ArrowUpRight')}</a>` : ''}
            <a class="card__ico" href="${p.repo}" target="_blank" rel="noopener" title="Código en GitHub" aria-label="Código de ${esc(p.name)} en GitHub">${icon('Github')}</a>
          </div>
        </div>
      </article>`,
    )
    .join('');

  $('.clients__list').innerHTML = clientSites
    .map((c) => `<a href="${c.repo}" target="_blank" rel="noopener"><b>${esc(c.name)}</b> <small>${esc(c.what)}</small></a>`)
    .join('');

  const d = duoqit;
  $('.biz').innerHTML = `
    <div class="biz__hero">
      <div class="biz__text">
        <span class="biz__logo">Duo<b>Q</b>IT</span>
        <p class="biz__tagline">${esc(d.tagline)}</p>
        <p class="biz__desc">${esc(d.desc)}</p>
        <div class="biz__actions">
          <a class="btn btn--c" href="${d.demo}" target="_blank" rel="noopener">Ver web ${icon('ArrowUpRight')}</a>
          <button type="button" class="btn btn--ghost" data-open="duoqit">Más info ${icon('ArrowRight')}</button>
        </div>
      </div>
      <div class="biz__shots" data-open="duoqit">
        ${browserFrame(host(d.demo), shot('duoqit', 1), 'Portada de la web de DuoQIT', 'biz__browser')}
        ${phoneFrame(shot('duoqit', 'm'), 'Web de DuoQIT en móvil', 'biz__phone')}
      </div>
    </div>
    <div class="services">
      ${d.services
        .map(
          (s, i) => `
        <div class="service" data-accent="${['c', 'm', 'y'][i % 3]}">
          <span class="service__icon">${icon(s.icon)}</span>
          <h3>${esc(s.title)}</h3>
          <p>${esc(s.text)}</p>
        </div>`,
        )
        .join('')}
    </div>
    <ol class="steps">${d.steps.map((s, i) => `<li><b>${String(i + 1).padStart(2, '0')}</b>${esc(s)}</li>`).join('')}</ol>`;

  $('#work').innerHTML = work
    .map(
      (w) => `
    <li class="tl-item" data-accent="${w.accent}">
      <div class="tl-card">
        <span class="tl-date">${w.date}</span>
        <h4 class="tl-title">${esc(w.role)}</h4>
        <p class="tl-org">${esc(w.org)} · ${esc(w.place)}</p>
        <ul class="tl-points">${w.points.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
      </div>
    </li>`,
    )
    .join('');

  $('#studies').innerHTML = studies
    .map(
      (s) => `
    <li class="tl-item" data-accent="${s.accent}">
      <div class="tl-card">
        <span class="tl-date">${s.date}</span>${s.now ? '<span class="tl-now">En curso</span>' : ''}
        <h4 class="tl-title">${esc(s.title)}</h4>
        <p class="tl-org">${esc(s.org)}</p>
      </div>
    </li>`,
    )
    .join('');

  $('.certs').innerHTML = certs
    .map(
      (c) => `
    <div class="cert">
      <span class="cert__icon">${icon(c.icon)}</span>
      <h3 class="cert__name">${esc(c.name)}</h3>
      <span class="cert__meta">${esc(c.by)} · ${c.date}</span>
    </div>`,
    )
    .join('');

  $('.extras').innerHTML = extras
    .map(
      (e) => `
    <article class="extra" data-accent="${e.accent}">
      <span class="extra__icon">${icon(e.icon)}</span>
      <h3>${esc(e.title)}</h3>
      <span class="extra__by">${esc(e.by)}</span>
      <p>${esc(e.text)}</p>
    </article>`,
    )
    .join('');
}

/* ===== Smooth scroll ===== */
let lenis;
function setupScroll() {
  if (!reduced) {
    lenis = new Lenis({ lerp: 0.1 });
    lenis.on('scroll', ScrollTrigger.update);
    gsap.ticker.add((t) => lenis.raf(t * 1000));
    gsap.ticker.lagSmoothing(0);
  }

  document.addEventListener('click', (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a) return;
    const target = a.getAttribute('href') === '#top' ? 0 : $(a.getAttribute('href'));
    if (target === null) return;
    e.preventDefault();
    closeMenu();
    if (lenis) lenis.scrollTo(target, { offset: 0, duration: 1.4, force: true });
    else if (target === 0) window.scrollTo({ top: 0 });
    else target.scrollIntoView();
  });
}

/* ===== Navegación ===== */
function closeMenu() {
  if (!body.classList.contains('menu-open')) return;
  body.classList.remove('menu-open');
  $('.burger').setAttribute('aria-expanded', 'false');
  $('.menu').setAttribute('aria-hidden', 'true');
  lenis?.start();
}
function setupNav() {
  const nav = $('.nav');
  $('.burger').addEventListener('click', () => {
    if (body.classList.contains('menu-open')) return closeMenu();
    body.classList.add('menu-open');
    $('.burger').setAttribute('aria-expanded', 'true');
    $('.menu').setAttribute('aria-hidden', 'false');
    lenis?.stop();
    if (!reduced) gsap.fromTo('.menu a', { yPercent: 80, opacity: 0 }, { yPercent: 0, opacity: 1, stagger: 0.06, duration: 0.6, delay: 0.15, ease: 'back.out(1.6)' });
  });

  // esconder al bajar, mostrar al subir
  ScrollTrigger.create({
    start: 0,
    end: 'max',
    onUpdate: (self) => nav.classList.toggle('is-hidden', self.direction === 1 && self.scroll() > 400 && !body.classList.contains('menu-open')),
  });

  // enlace activo
  $$('.nav__links a').forEach((a) => {
    ScrollTrigger.create({
      trigger: $(a.getAttribute('href')),
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => a.classList.toggle('is-active', self.isActive),
    });
  });

  gsap.to('.progress', { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.3 } });
}

/* ===== Paleta: espacio para barajar (guiño a Coolors) ===== */
const palettes = [
  ['--magenta', '--cyan', '--yellow'],
  ['--cyan', '--yellow', '--magenta'],
  ['--yellow', '--magenta', '--cyan'],
  ['--magenta', '--yellow', '--cyan'],
  ['--cyan', '--magenta', '--yellow'],
  ['--yellow', '--cyan', '--magenta'],
];
let paletteIndex = 0;
function shufflePalette() {
  paletteIndex = (paletteIndex + 1 + Math.floor(Math.random() * (palettes.length - 1))) % palettes.length;
  const [m, c, y] = palettes[paletteIndex];
  const root = document.documentElement.style;
  root.setProperty('--a-m', `var(${m})`);
  root.setProperty('--a-c', `var(${c})`);
  root.setProperty('--a-y', `var(${y})`);
  toast('Nueva paleta');
}
function setupPalette() {
  $('.shuffle').addEventListener('click', shufflePalette);
  addEventListener('keydown', (e) => {
    if (e.code !== 'Space' || e.repeat || isDetailOpen) return;
    if (e.target.closest('button, a, input, textarea, select, [contenteditable]')) return;
    e.preventDefault();
    shufflePalette();
  });
}

let toastTimer;
function toast(msg) {
  const el = $('.toast');
  el.textContent = msg;
  el.classList.add('is-on');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => el.classList.remove('is-on'), 1600);
}

/* ===== Filtros de proyectos ===== */
// Sale lo visible, se cambia la rejilla y entra lo nuevo; la altura se anima para que lo de abajo no pegue saltos.
function setupFilters() {
  const grid = $('.projects');
  let busy = null;
  $('.filters').addEventListener('click', (e) => {
    const btn = e.target.closest('.filter');
    if (!btn || btn.getAttribute('aria-selected') === 'true') return;
    $$('.filter').forEach((b) => b.setAttribute('aria-selected', String(b === btn)));
    const cat = btn.dataset.cat;
    const cards = $$('.card');
    const show = (c) => cat === 'all' || c.dataset.cat === cat;

    busy?.kill();
    gsap.killTweensOf(cards);
    const swap = () => {
      const h0 = grid.offsetHeight;
      cards.forEach((c) => {
        c.classList.toggle('is-hidden', !show(c));
        c.dataset.in = '1';
      });
      const next = cards.filter(show);
      const h1 = grid.offsetHeight;
      if (reduced) return gsap.set(next, { opacity: 1, clearProps: 'transform' });
      busy = gsap
        .timeline({ onComplete: () => ScrollTrigger.refresh() })
        .fromTo(grid, { height: h0 }, { height: h1, duration: 0.45, ease: 'power3.inOut', clearProps: 'height' })
        .fromTo(next, { opacity: 0, y: 30, scale: 0.96 }, { opacity: 1, y: 0, scale: 1, duration: 0.5, stagger: 0.05, ease: 'power3.out', clearProps: 'y,scale' }, 0.05);
    };
    const visible = cards.filter((c) => !c.classList.contains('is-hidden'));
    if (reduced) return swap();
    busy = gsap.to(visible, { opacity: 0, y: 14, scale: 0.97, duration: 0.2, stagger: 0.015, ease: 'power1.in', onComplete: swap });
  });
}

/* ===== Vista de detalle de proyecto ===== */
const detail = $('.detail');
const panel = $('.detail__panel');
let isDetailOpen = false;
let lastFocus = null;
const findProject = (slug) => (slug === duoqit.slug ? duoqit : projects.find((p) => p.slug === slug));

function detailHTML(p) {
  const n = p.shots || 0;
  const url = p.demo ? host(p.demo) : p.repo.replace('https://', '');
  const gallery = n
    ? `
      <div class="gallery">
        <div class="gallery__stage">
          ${browserFrame(url, shot(p.slug, 1), `Captura de ${p.name}`, 'gallery__main')}
          ${p.mobile ? phoneFrame(shot(p.slug, 'm'), `${p.name} en móvil`, 'gallery__phone') : ''}
        </div>
        ${
          n > 1
            ? `<div class="gallery__thumbs">${Array.from({ length: n }, (_, i) => `<button type="button" class="thumb${i ? '' : ' is-on'}" data-src="${shot(p.slug, i + 1)}" aria-label="Ver captura ${i + 1}"><img src="${shot(p.slug, i + 1)}" alt="" loading="lazy" /></button>`).join('')}</div>`
            : ''
        }
      </div>`
    : `
      <div class="detail__noshot" data-accent="${p.accent}">
        <span>${icon(p.icon)}</span>
        <p>Este proyecto no tiene web pública todavía. El código está en GitHub.</p>
      </div>`;

  const idx = projects.indexOf(p);
  const nav =
    idx >= 0
      ? `<nav class="detail__nav" aria-label="Otros proyectos">
          <button type="button" data-go="${projects[(idx - 1 + projects.length) % projects.length].slug}">${icon('ArrowLeft')} ${esc(projects[(idx - 1 + projects.length) % projects.length].name)}</button>
          <button type="button" data-go="${projects[(idx + 1) % projects.length].slug}">${esc(projects[(idx + 1) % projects.length].name)} ${icon('ArrowRight')}</button>
        </nav>`
      : '';

  return `
    <button type="button" class="detail__close" data-close aria-label="Cerrar">${icon('X')}</button>
    <header class="detail__head" data-accent="${p.accent}">
      <div class="detail__meta">
        <span class="detail__icon">${icon(p.icon)}</span>
        <span class="pill">${p.cat ? catLabel[p.cat] : 'Mi empresa'}</span>
        <span class="pill">${p.year}</span>
      </div>
      <h2 class="detail__title" id="detail-title">${esc(p.name)}</h2>
      <p class="detail__lead">${esc(p.desc)}</p>
      <div class="detail__actions">
        ${p.demo ? `<a class="btn btn--ink" href="${p.demo}" target="_blank" rel="noopener">Visitar web ${icon('ArrowUpRight')}</a>` : ''}
        ${p.email ? `<a class="btn" href="mailto:${p.email}">${icon('Mail')} Pedir presupuesto</a>` : ''}
        ${p.repo ? `<a class="btn" href="${p.repo}" target="_blank" rel="noopener">${icon('Github')} Código</a>` : ''}
      </div>
    </header>
    ${gallery}
    <div class="detail__body" data-accent="${p.accent}">
      <div class="detail__text">
        <h3>Sobre el proyecto</h3>
        ${p.long.map((t) => `<p>${esc(t)}</p>`).join('')}
        ${p.services ? `<h3>Servicios</h3><ul class="detail__services">${p.services.map((s) => `<li>${icon(s.icon)}<span><b>${esc(s.title)}.</b> ${esc(s.text)}</span></li>`).join('')}</ul>` : ''}
      </div>
      <aside class="detail__aside">
        <h3>Lo más destacado</h3>
        <ul class="detail__highlights">${p.highlights.map((h) => `<li>${esc(h)}</li>`).join('')}</ul>
        <h3>Stack</h3>
        <div class="card__tags">${p.tags.map((t) => `<span>${esc(t)}</span>`).join('')}</div>
      </aside>
    </div>
    ${nav}`;
}

function animateDetailIn() {
  if (reduced) return;
  gsap.fromTo(
    panel.querySelectorAll('.detail__head > *, .gallery, .detail__noshot, .detail__body > *, .detail__nav'),
    { y: 36, opacity: 0 },
    { y: 0, opacity: 1, duration: 0.7, stagger: 0.06, ease: 'expo.out', delay: 0.15 },
  );
  gsap.fromTo(panel.querySelector('.gallery__phone'), { y: 80, rotate: 8 }, { y: 0, rotate: 3, duration: 1, ease: 'back.out(1.4)', delay: 0.4 });
}

function openDetail(slug, mode = 'push') {
  const p = findProject(slug);
  if (!p) return;
  panel.innerHTML = detailHTML(p);
  panel.scrollTop = 0;
  if (mode === 'push') history.pushState({ detail: slug }, '', `#p/${slug}`);
  if (mode === 'replace') history.replaceState({ detail: slug }, '', `#p/${slug}`);

  if (!isDetailOpen) {
    isDetailOpen = true;
    lastFocus = document.activeElement;
    detail.hidden = false;
    document.documentElement.classList.add('detail-open');
    lenis?.stop();
    if (!reduced) {
      gsap.fromTo('.detail__backdrop', { opacity: 0 }, { opacity: 1, duration: 0.4 });
      gsap.fromTo(panel, { yPercent: 100 }, { yPercent: 0, duration: 0.7, ease: 'expo.out' });
    }
  }
  animateDetailIn();
  panel.querySelector('.detail__close').focus({ preventScroll: true });
}

function closeDetail(fromHistory = false) {
  if (!isDetailOpen) return;
  // si la vista se abrió desde la página, «atrás» deja el historial limpio
  if (!fromHistory && history.state?.detail) return history.back();
  if (!fromHistory) history.replaceState(null, '', location.pathname + location.search);
  isDetailOpen = false;
  const done = () => {
    detail.hidden = true;
    panel.innerHTML = '';
    document.documentElement.classList.remove('detail-open');
    lenis?.start();
    lastFocus?.focus?.({ preventScroll: true });
  };
  if (reduced) return done();
  gsap.to('.detail__backdrop', { opacity: 0, duration: 0.35 });
  gsap.to(panel, { yPercent: 100, duration: 0.45, ease: 'power3.in', onComplete: done });
}

function syncDetailWithUrl() {
  const m = location.hash.match(/^#p\/([\w-]+)/);
  if (m) openDetail(m[1], 'none');
  else closeDetail(true);
}

function setupDetail() {
  document.addEventListener('click', (e) => {
    if (e.target.closest('a[href]:not([href^="#"])')) return;
    const opener = e.target.closest('[data-open]');
    if (opener && !detail.contains(opener)) return openDetail(opener.dataset.open);
  });
  detail.addEventListener('click', (e) => {
    if (e.target.closest('[data-close]')) return closeDetail();
    const go = e.target.closest('[data-go]');
    if (go) {
      gsap.to(panel, { scrollTop: 0, duration: 0.3 });
      return openDetail(go.dataset.go, 'replace');
    }
    const thumb = e.target.closest('.thumb');
    if (thumb) {
      const img = panel.querySelector('.gallery__main img');
      $$('.thumb', panel).forEach((t) => t.classList.toggle('is-on', t === thumb));
      gsap.to(img, {
        opacity: 0,
        duration: 0.15,
        onComplete: () => {
          img.src = thumb.dataset.src;
          gsap.to(img, { opacity: 1, duration: 0.25 });
        },
      });
    }
  });
  addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (isDetailOpen) closeDetail();
    else closeMenu();
  });
  addEventListener('popstate', syncDetailWithUrl);
  if (location.hash.startsWith('#p/')) syncDetailWithUrl();
}

/* ===== Copiar email ===== */
function setupContact() {
  $('[data-copy]').addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(links.email);
      toast('Email copiado');
    } catch {
      location.href = `mailto:${links.email}`;
    }
  });
}

/* ===== Cursor e interacciones de ratón ===== */
function setupPointer() {
  if (!finePointer || reduced) return;
  const cursor = $('.cursor');
  const xTo = gsap.quickTo(cursor, 'x', { duration: 0.25, ease: 'power3' });
  const yTo = gsap.quickTo(cursor, 'y', { duration: 0.25, ease: 'power3' });
  addEventListener('pointermove', (e) => {
    cursor.classList.add('is-on');
    xTo(e.clientX);
    yTo(e.clientY);
  });
  document.addEventListener('pointerleave', () => cursor.classList.remove('is-on'));
  document.addEventListener('pointerover', (e) => {
    cursor.classList.toggle('is-hover', !!e.target.closest('a, button, .card, .cert, .chip, [data-open]'));
  });

  // hero: desajuste de imprenta + formas que siguen al ratón
  const hero = $('.hero');
  const misregs = $$('.misreg');
  const shapes = $$('.shape');
  hero.addEventListener('pointermove', (e) => {
    const r = hero.getBoundingClientRect();
    const nx = (e.clientX - r.left) / r.width - 0.5;
    const ny = (e.clientY - r.top) / r.height - 0.5;
    gsap.to(misregs, { '--mx': `${4 + nx * 14}px`, '--my': `${3 + ny * 10}px`, duration: 0.6, ease: 'power3', overwrite: 'auto' });
    shapes.forEach((s) => gsap.to(s, { x: nx * 60 * s.dataset.depth, y: ny * 60 * s.dataset.depth, duration: 1, ease: 'power3', overwrite: 'auto' }));
  });

  // tarjetas con inclinación 3D (solo rotación, para no pelear con las animaciones de entrada)
  $$('.card').forEach((card) => {
    const rx = gsap.quickTo(card, 'rotationX', { duration: 0.4, ease: 'power2' });
    const ry = gsap.quickTo(card, 'rotationY', { duration: 0.4, ease: 'power2' });
    gsap.set(card, { transformPerspective: 900 });
    card.addEventListener('pointermove', (e) => {
      const r = card.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 7);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 7);
    });
    card.addEventListener('pointerleave', () => {
      rx(0);
      ry(0);
    });
  });
}

/* ===== Animaciones de scroll ===== */
// Las transiciones CSS de hover solo se activan (.is-in) cuando GSAP ha terminado de animar el elemento.
const markIn = (els) => els.forEach((el) => el.classList.add('is-in'));

// Todo lo que espera a aparecer queda registrado; si un trigger no llega a dispararse
// (saltos de scroll, pestaña en segundo plano…), el barrido lo muestra igualmente.
const pending = new Map();
const pendingTimelines = [];

function revealBatch(selector, from, to, start = 'top 90%') {
  const show = (els) => {
    const fresh = els.filter((el) => !el.dataset.in);
    if (!fresh.length) return;
    fresh.forEach((el) => {
      el.dataset.in = '1';
      pending.delete(el);
    });
    gsap.fromTo(fresh, from, { ...to, opacity: 1, onComplete: () => markIn(fresh) });
  };
  gsap.utils.toArray(selector).forEach((el) => pending.set(el, show));
  gsap.set(selector, { opacity: 0 });
  ScrollTrigger.batch(selector, { start, once: true, onEnter: show, onEnterBack: show });
}

function sweepReveals() {
  const limit = innerHeight * 0.95;
  const groups = new Map();
  pending.forEach((show, el) => {
    if (el.classList.contains('is-hidden') || el.getBoundingClientRect().top > limit) return;
    if (!groups.has(show)) groups.set(show, []);
    groups.get(show).push(el);
  });
  groups.forEach((els, show) => show(els));
  pendingTimelines.forEach((tl) => {
    if (tl.progress() === 0 && tl.scrollTrigger?.trigger.getBoundingClientRect().top < limit) tl.play();
  });
}

function setupRevealSafety() {
  let raf = 0;
  const schedule = () => {
    if (!raf) raf = requestAnimationFrame(() => ((raf = 0), sweepReveals()));
  };
  addEventListener('scroll', schedule, { passive: true });
  addEventListener('resize', schedule);
  ScrollTrigger.addEventListener('refresh', schedule);
  document.addEventListener('visibilitychange', schedule);
  setTimeout(sweepReveals, 1500);
}

function setupAnimations() {
  // marquee infinito que acelera con la velocidad de scroll
  const loop = gsap.to('.marquee__track', { xPercent: -50, duration: 28, ease: 'none', repeat: -1 });
  if (reduced) {
    loop.pause();
    markIn($$('.card, .cert, .chip'));
    return;
  }
  ScrollTrigger.create({
    onUpdate: (self) => {
      const v = gsap.utils.clamp(-6, 6, self.getVelocity() / 300);
      gsap.to(loop, { timeScale: Math.abs(v) > 1 ? v : self.direction || 1, duration: 0.2, overwrite: true });
      gsap.to(loop, { timeScale: 1, duration: 1.2, delay: 0.25, ease: 'power2.out' });
    },
  });

  // entrada del hero
  gsap
    .timeline({ defaults: { ease: 'expo.out' } })
    .set('.misreg', { '--mx': '40px', '--my': '-20px' })
    .from('.misreg', { yPercent: 110, rotate: 6, opacity: 0, duration: 1.3, stagger: 0.12 })
    .to('.misreg', { '--mx': '4px', '--my': '3px', duration: 1.4, ease: 'elastic.out(1, .4)' }, '-=.7')
    .from('.hero__status', { y: -20, opacity: 0, duration: 0.8 }, '-=1.4')
    .from('.hero__lead, .hero__actions, .hero__hint', { y: 30, opacity: 0, duration: 0.9, stagger: 0.08 }, '-=1.2')
    .fromTo('.hero__lead .hl', { '--hl-scale': 0 }, { '--hl-scale': 1, duration: 0.8, ease: 'power3.inOut' }, '-=.6')
    .from('.shape', { scale: 0, rotate: -90, duration: 1.1, stagger: 0.08, ease: 'back.out(1.8)' }, '-=1.4')
    .from('.nav', { top: -90, duration: 0.9 }, '-=1.2');

  // formas flotando + parallax de salida
  gsap.utils.toArray('.shape').forEach((s, i) => {
    gsap.to(s, { rotate: i % 2 ? 25 : -25, yPercent: 15, duration: 3 + i, ease: 'sine.inOut', yoyo: true, repeat: -1 });
  });
  gsap.to('.hero__shapes', { yPercent: 40, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'top top', end: 'bottom top', scrub: true } });
  gsap.to('.hero__title', { yPercent: 18, opacity: 0.2, ease: 'none', scrollTrigger: { trigger: '.hero', start: 'center center', end: 'bottom top', scrub: true } });

  // títulos de sección
  $$('.section__head').forEach((head) => {
    pendingTimelines.push(gsap
      .timeline({ scrollTrigger: { trigger: head, start: 'top 85%', once: true } })
      .from(head.querySelector('.section__num'), { scale: 0, rotate: -120, duration: 0.6, ease: 'back.out(2)' })
      .from(head.querySelector('.section__title'), { yPercent: 60, opacity: 0, skewY: 4, duration: 0.9, ease: 'expo.out' }, '<.1')
      .fromTo(head.querySelectorAll('.hl'), { '--hl-scale': 0 }, { '--hl-scale': 1, duration: 0.7, ease: 'power3.inOut' }, '-=.4'));
  });

  revealBatch('.reveal', { y: 50 }, { y: 0, duration: 0.9, stagger: 0.1, ease: 'expo.out' }, 'top 88%');
  revealBatch('.chip', { scale: 0, rotate: () => gsap.utils.random(-20, 20) }, { scale: 1, rotate: 0, duration: 0.5, stagger: 0.025, ease: 'back.out(2)', clearProps: 'transform' }, 'top 92%');
  revealBatch('.card', { y: 70, rotate: () => gsap.utils.random(-3, 3) }, { y: 0, rotate: 0, duration: 0.9, stagger: 0.1, ease: 'expo.out', clearProps: 'y,rotate' });
  revealBatch('.cert', { scale: 0.5, rotate: () => gsap.utils.random(-12, 12) }, { scale: 1, rotate: 0, duration: 0.7, stagger: 0.06, ease: 'back.out(1.7)', clearProps: 'transform' }, 'top 92%');
  revealBatch('.extra', { y: 90, rotate: (i) => (i - 1) * 5 }, { y: 0, rotate: 0, duration: 1, stagger: 0.12, ease: 'expo.out', clearProps: 'transform' }, 'top 88%');
  revealBatch('.service', { y: 50 }, { y: 0, duration: 0.8, stagger: 0.07, ease: 'expo.out', clearProps: 'transform' }, 'top 90%');
  revealBatch('.steps li', { x: -30 }, { x: 0, duration: 0.6, stagger: 0.08, ease: 'back.out(1.6)', clearProps: 'transform' }, 'top 92%');

  // contadores
  $$('[data-count]').forEach((el) => {
    const obj = { v: 0 };
    gsap.to(obj, {
      v: +el.dataset.count,
      duration: 1.6,
      ease: 'power3.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => (el.textContent = Math.round(obj.v)),
    });
  });

  // DuoQIT: el bloque se destapa y las capturas flotan a distinta velocidad
  gsap.fromTo(
    '.biz__hero',
    { clipPath: 'inset(12% 6% 12% 6% round 28px)' },
    { clipPath: 'inset(0% 0% 0% 0% round 18px)', ease: 'none', scrollTrigger: { trigger: '.biz__hero', start: 'top 95%', end: 'top 45%', scrub: 0.6 } },
  );
  gsap.fromTo('.biz__browser', { yPercent: 14 }, { yPercent: -6, ease: 'none', scrollTrigger: { trigger: '.biz__hero', start: 'top bottom', end: 'bottom top', scrub: true } });
  gsap.fromTo('.biz__phone', { yPercent: 30 }, { yPercent: -20, ease: 'none', scrollTrigger: { trigger: '.biz__hero', start: 'top bottom', end: 'bottom top', scrub: true } });

  // línea de tiempo que se dibuja con el scroll
  $$('.timeline').forEach((tl) => {
    gsap.to(tl, { '--line': 1, ease: 'none', scrollTrigger: { trigger: tl, start: 'top 70%', end: 'bottom 60%', scrub: 0.5 } });
  });
  revealBatch('.tl-item', { x: 40 }, { x: 0, duration: 0.8, stagger: 0.1, ease: 'expo.out', clearProps: 'transform' }, 'top 88%');

  // contacto
  pendingTimelines.push(gsap
    .timeline({ scrollTrigger: { trigger: '.contact', start: 'top 75%', once: true } })
    .from('.contact__kicker', { y: 20, opacity: 0, duration: 0.6 })
    .from('.contact__title .line', { yPercent: 100, opacity: 0, duration: 1, stagger: 0.12, ease: 'expo.out' }, '<.1')
    .fromTo('.contact__title .hl', { '--hl-scale': 0 }, { '--hl-scale': 1, duration: 0.7, ease: 'power3.inOut' }, '-=.4')
    .from('.contact__mail', { scale: 0.6, opacity: 0, duration: 0.8, ease: 'back.out(1.8)', clearProps: 'transform' }, '-=.5')
    .from('.contact__links', { y: 30, opacity: 0, duration: 0.6, ease: 'back.out(2)' }, '-=.5'));
}

if (!location.hash) {
  history.scrollRestoration = 'manual';
  scrollTo(0, 0);
}
render();
setupScroll();
setupNav();
setupPalette();
setupFilters();
setupDetail();
setupContact();
setupPointer();
setupAnimations();
setupRevealSafety();
document.fonts?.ready.then(() => ScrollTrigger.refresh());
addEventListener('load', () => ScrollTrigger.refresh());
