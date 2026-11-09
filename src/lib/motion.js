/**
 * Camada de movimento da página (GSAP + ScrollTrigger + SplitText + Lenis).
 *
 * Tudo aqui é progressivo: o conteúdo já nasce visível no HTML e só é animado
 * quando o JavaScript roda. Com "reduzir movimento" ligado no sistema, nada
 * disso é aplicado (sem rolagem suave, sem revelações, sem contadores).
 */
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { SplitText } from 'gsap/SplitText';
import Lenis from 'lenis';
import 'lenis/dist/lenis.css';

gsap.registerPlugin(ScrollTrigger, SplitText);

const HEADER_OFFSET = 84;
const TOUCH = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;

/** Ouvintes registrados aqui são removidos quando o movimento é desligado. */
let cleanups = [];
function on(el, type, fn, opts) {
  el.addEventListener(type, fn, opts);
  cleanups.push(() => el.removeEventListener(type, fn, opts));
}

function smoothScroll() {
  // lerp baixo = rolagem macia, mas que responde na hora; toque continua nativo.
  const lenis = new Lenis({ lerp: 0.12, wheelMultiplier: 1, smoothWheel: true, syncTouch: false });
  lenis.on('scroll', ScrollTrigger.update);
  const raf = (time) => lenis.raf(time * 1000);
  gsap.ticker.add(raf);
  gsap.ticker.lagSmoothing(0);

  // Âncoras internas com rolagem suave e foco no destino (teclado e leitores de tela).
  const onClick = (e) => {
    const a = e.target.closest('a[href^="#"]');
    if (!a || e.defaultPrevented || e.metaKey || e.ctrlKey) return;
    const id = a.getAttribute('href');
    if (id.length < 2) return;
    const target = document.querySelector(id);
    if (!target) return;
    e.preventDefault();
    const y = id === '#topo' ? 0 : target.getBoundingClientRect().top + window.scrollY - HEADER_OFFSET;
    lenis.scrollTo(Math.max(0, y), {
      duration: 1.2,
      onComplete: () => {
        if (!target.hasAttribute('tabindex')) target.setAttribute('tabindex', '-1');
        target.focus({ preventScroll: true });
      },
    });
    history.replaceState(null, '', id);
  };
  document.addEventListener('click', onClick);

  return {
    lenis,
    destroy: () => {
      document.removeEventListener('click', onClick);
      gsap.ticker.remove(raf);
      lenis.destroy();
    },
  };
}

/** Títulos: palavras sobem de dentro de uma máscara; o trecho laranja "pinta" da esquerda para a direita. */
function revealHeadings() {
  document.querySelectorAll('[data-split]').forEach((el) => {
    const split = SplitText.create(el, { type: 'words', mask: 'words', wordsClass: 'split-word' });
    const hl = el.querySelectorAll('.hl');
    const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 95%', once: true } });
    tl.from(split.words, { yPercent: 110, duration: 0.9, ease: 'power4.out', stagger: 0.05 });
    if (hl.length)
      tl.from(hl, { clipPath: 'inset(0 100% 0 0 round 0.2em)', duration: 0.8, ease: 'power3.inOut' }, 0.25);
  });
}

/** Blocos com data-reveal: sobem e aparecem. data-reveal="stagger" anima os filhos em sequência. */
function revealBlocks() {
  document.querySelectorAll('[data-reveal]').forEach((el) => {
    const mode = el.dataset.reveal;
    if (mode === 'flip') {
      gsap.from(el.children, {
        rotateX: -10,
        y: 36,
        autoAlpha: 0,
        transformOrigin: '50% 0%',
        transformPerspective: 1000,
        duration: 0.75,
        ease: 'power3.out',
        stagger: 0.08,
        scrollTrigger: { trigger: el, start: 'top 92%', once: true },
      });
      return;
    }
    const stagger = mode === 'stagger';
    const targets = stagger ? el.children : el;
    gsap.from(targets, {
      y: 28,
      autoAlpha: 0,
      duration: TOUCH ? 0.5 : 0.8,
      ease: 'power3.out',
      stagger: stagger ? (TOUCH ? 0.05 : 0.08) : 0,
      scrollTrigger: { trigger: el, start: 'top 96%', once: true },
    });
  });
}

/** Números que contam até o valor final (ex.: "200%", "−78%", "92"). */
function counters() {
  document.querySelectorAll('[data-count]').forEach((el) => {
    // Guarda o valor original uma única vez (o React em modo de desenvolvimento monta duas vezes).
    if (!el.dataset.countTo) el.dataset.countTo = el.textContent.trim();
    const raw = el.dataset.countTo;
    cleanups.push(() => {
      el.textContent = raw;
    });
    const m = raw.match(/^([^\d]*)(\d+)(.*)$/);
    if (!m) return;
    const [, prefix, num, suffix] = m;
    const obj = { v: 0 };
    gsap.to(obj, {
      v: Number(num),
      duration: 1.6,
      ease: 'power2.out',
      scrollTrigger: { trigger: el, start: 'top 90%', once: true },
      onUpdate: () => {
        el.textContent = `${prefix}${Math.round(obj.v)}${suffix}`;
      },
      onStart: () => el.setAttribute('aria-label', raw),
    });
  });
}

/** Abertura: entrada em sequência, notebook que se endireita com a rolagem e cartões com paralaxe. */
function hero() {
  const root = document.querySelector('.hero2');
  if (!root) return;
  const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });
  tl.from('.hero2__badge', { y: 16, autoAlpha: 0, duration: 0.6 })
    .from(
      '.hero2__lead, .hero2__actions, .hero2__segments',
      { y: 20, autoAlpha: 0, duration: 0.7, stagger: 0.1 },
      0.55,
    )
    .from('.laptop', { y: 120, autoAlpha: 0, duration: 1.2 }, 0.6)
    .from('.hero2__phone', { x: 80, autoAlpha: 0, duration: 1 }, 0.9)
    .from(
      '.glass-card',
      { scale: 0.6, autoAlpha: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(1.8)' },
      1.1,
    );

  gsap.fromTo(
    '.laptop',
    { rotateX: 22, scale: 0.92 },
    {
      rotateX: 0,
      scale: 1,
      ease: 'none',
      scrollTrigger: { trigger: '.hero2__stage', start: 'top 95%', end: 'top 25%', scrub: true },
    },
  );
  gsap.utils.toArray('.glass-card').forEach((card, i) => {
    gsap.to(card, {
      yPercent: -40 - i * 25,
      ease: 'none',
      scrollTrigger: { trigger: root, start: 'top top', end: 'bottom top', scrub: true },
    });
  });

  // Paralaxe leve com o mouse (somente mouse/trackpad).
  if (window.matchMedia('(pointer: fine)').matches) {
    const stage = root.querySelector('.hero2__stage');
    const movers = gsap.utils.toArray('.glass-card, .hero2__phone').map((el, i) => ({
      x: gsap.quickTo(el, 'x', { duration: 0.8, ease: 'power3' }),
      y: gsap.quickTo(el, 'y', { duration: 0.8, ease: 'power3' }),
      depth: 10 + (i % 3) * 8,
    }));
    const onMove = (e) => {
      const r = root.getBoundingClientRect();
      const px = (e.clientX - r.left) / r.width - 0.5;
      const py = (e.clientY - r.top) / r.height - 0.5;
      movers.forEach((m) => {
        m.x(px * m.depth * 2);
        m.y(py * m.depth);
      });
    };
    on(root, 'pointermove', onMove);
    stage && gsap.set(stage, { perspective: 1200 });
  }
}

/** Faixas em movimento aceleram com a velocidade da rolagem. */
function marqueeVelocity(lenis) {
  if (!lenis) return;
  lenis.on('scroll', ({ velocity }) => {
    const rate = 1 + Math.min(Math.abs(velocity) * 0.12, 5);
    document.querySelectorAll('.marquee__track').forEach((t) =>
      t.getAnimations().forEach((a) => {
        a.playbackRate = rate;
      }),
    );
  });
}

/** Cabeçalho fixo: barra de progresso da leitura e seção atual marcada no menu. */
function header() {
  const bar = document.querySelector('.scroll-progress');
  if (bar) gsap.to(bar, { scaleX: 1, ease: 'none', scrollTrigger: { start: 0, end: 'max', scrub: 0.2 } });

  document.querySelectorAll('.site-nav__link').forEach((link) => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    ScrollTrigger.create({
      trigger: target,
      start: 'top 50%',
      end: 'bottom 50%',
      onToggle: (self) => {
        link.classList.toggle('is-current', self.isActive);
        if (self.isActive) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      },
    });
  });
}

/** Cartões que inclinam acompanhando o mouse. */
function tilt() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  document.querySelectorAll('[data-tilt]').forEach((el) => {
    const rx = gsap.quickTo(el, 'rotationX', { duration: 0.5, ease: 'power3' });
    const ry = gsap.quickTo(el, 'rotationY', { duration: 0.5, ease: 'power3' });
    gsap.set(el, { transformPerspective: 900 });
    on(el, 'pointermove', (e) => {
      const r = el.getBoundingClientRect();
      ry(((e.clientX - r.left) / r.width - 0.5) * 8);
      rx(-((e.clientY - r.top) / r.height - 0.5) * 8);
    });
    on(el, 'pointerleave', () => {
      rx(0);
      ry(0);
    });
  });
}

/** Luz que segue o mouse em superfícies escuras. */
function spotlight() {
  document.querySelectorAll('[data-spotlight]').forEach((el) => {
    on(el, 'pointermove', (e) => {
      const r = el.getBoundingClientRect();
      el.style.setProperty('--mx', `${e.clientX - r.left}px`);
      el.style.setProperty('--my', `${e.clientY - r.top}px`);
    });
  });
}

/** Comparativo: cada linha entra e o "jeito antigo" é riscado. */
function versus() {
  const rows = gsap.utils.toArray('.versus__table tbody tr');
  if (!rows.length) return;
  gsap.from(rows, {
    x: -24,
    autoAlpha: 0,
    duration: 0.6,
    ease: 'power3.out',
    stagger: 0.08,
    scrollTrigger: { trigger: '.versus__table', start: 'top 80%', once: true },
    onComplete: () => document.querySelector('.versus__table')?.classList.add('is-struck'),
  });
}

/** Texto grande que acende palavra por palavra acompanhando a rolagem. */
function scrubWords() {
  document.querySelectorAll('[data-scrub-words]').forEach((el) => {
    const split = SplitText.create(el, { type: 'words', wordsClass: 'scrub-word' });
    gsap.fromTo(
      split.words,
      { opacity: 0.16 },
      {
        opacity: 1,
        ease: 'none',
        stagger: 0.1,
        scrollTrigger: { trigger: el, start: 'top 80%', end: 'bottom 45%', scrub: true },
      },
    );
  });
}

/** Etapas do fluxo acendem em sequência com a rolagem. */
function stages() {
  document.querySelectorAll('[data-stages]').forEach((list) => {
    const items = [...list.children];
    ScrollTrigger.create({
      trigger: list.closest('.flow-panel') || list,
      start: 'top 70%',
      end: 'bottom 40%',
      scrub: true,
      onUpdate: (self) => {
        const n = Math.round(self.progress * items.length);
        items.forEach((li, i) => li.classList.toggle('is-on', i < n));
      },
    });
  });
}

/** Telas do tour e do fluxo crescem levemente ao entrar. */
function screens() {
  gsap.utils.toArray('.tour__stage, .flow-panel__visual').forEach((el) => {
    gsap.fromTo(
      el,
      { scale: 0.88, y: 60 },
      {
        scale: 1,
        y: 0,
        ease: 'none',
        scrollTrigger: { trigger: el, start: 'top 100%', end: 'top 45%', scrub: true },
      },
    );
  });
}

/** Ícones e marcas de "incluído" surgem com um pequeno salto. */
function pops() {
  const groups = [
    ['.diff2__grid', '.diff2__icon'],
    ['.features-grid', '.feature-card__icon'],
    ['.how__grid', '.how-card__n'],
    ['.plans-grid', '.plan-card__check'],
  ];
  groups.forEach(([wrap, item]) => {
    const w = document.querySelector(wrap);
    if (!w) return;
    gsap.from(w.querySelectorAll(item), {
      scale: 0,
      rotate: -30,
      duration: 0.6,
      ease: 'back.out(2.2)',
      stagger: 0.04,
      scrollTrigger: { trigger: w, start: 'top 75%', once: true },
    });
  });
  const table = document.querySelector('.compare-table');
  if (table) {
    gsap.from(table.querySelectorAll('.mark--included'), {
      scale: 0,
      duration: 0.4,
      ease: 'back.out(3)',
      stagger: { each: 0.012, from: 'start' },
      scrollTrigger: { trigger: table, start: 'top 75%', once: true },
    });
  }
}

/** Barras sob os números grandes crescem junto com a contagem. */
function statBars() {
  const bars = gsap.utils.toArray('.stat__bar');
  if (!bars.length) return;
  gsap.from(bars, {
    scaleX: 0,
    transformOrigin: '0 50%',
    duration: 1.6,
    ease: 'power2.out',
    stagger: 0.12,
    scrollTrigger: { trigger: '.stats__grid', start: 'top 85%', once: true },
  });
}

/** Faixas inclinam conforme a velocidade da rolagem. */
function marqueeSkew(lenis) {
  const wrap = document.querySelector('.marquee-wrap');
  if (!wrap || !lenis) return;
  const skew = gsap.quickTo(wrap, 'skewY', { duration: 0.4, ease: 'power3' });
  lenis.on('scroll', ({ velocity }) => skew(gsap.utils.clamp(-4, 4, velocity * 0.25)));
}

/** Letras grandes do rodapé sobem uma a uma. */
function chars() {
  document.querySelectorAll('[data-chars]').forEach((el) => {
    const split = SplitText.create(el, { type: 'chars', mask: 'chars' });
    gsap.from(split.chars, {
      yPercent: 120,
      duration: 1,
      ease: 'power4.out',
      stagger: 0.025,
      scrollTrigger: { trigger: el, start: 'top 95%', once: true },
    });
  });
}

/** Botões principais são "atraídos" pelo cursor. */
function magnetic() {
  if (!window.matchMedia('(pointer: fine)').matches) return;
  document.querySelectorAll('.btn--primary, .round-btn, .tour__play, .wa-float').forEach((el) => {
    const x = gsap.quickTo(el, 'x', { duration: 0.4, ease: 'power3' });
    const y = gsap.quickTo(el, 'y', { duration: 0.4, ease: 'power3' });
    on(el, 'pointermove', (e) => {
      const r = el.getBoundingClientRect();
      x((e.clientX - r.left - r.width / 2) * 0.1);
      y((e.clientY - r.top - r.height / 2) * 0.12);
    });
    on(el, 'pointerleave', () => {
      x(0);
      y(0);
    });
  });
}

/**
 * Rede de segurança das revelações:
 * - recalcula as posições quando a altura da página muda (imagens, textos, recarga do servidor local);
 * - qualquer bloco que já está na tela (ou acima dela) e ainda não apareceu é mostrado na hora.
 * Assim nenhuma seção fica "em branco" se uma posição ficar desatualizada.
 */
function keepInSync() {
  let t;
  const ro = new ResizeObserver(() => {
    clearTimeout(t);
    t = setTimeout(() => ScrollTrigger.refresh(), 200);
  });
  ro.observe(document.body);
  const catchUp = () => {
    const limit = window.innerHeight * 0.95;
    ScrollTrigger.getAll().forEach((st) => {
      const anim = st.animation;
      if (!anim || st.vars.scrub || anim.progress() > 0 || anim.isActive()) return;
      const el = st.trigger;
      if (el && el.isConnected && el.getBoundingClientRect().top < limit) anim.play();
    });
  };
  const id = setInterval(catchUp, 400);
  cleanups.push(() => {
    ro.disconnect();
    clearTimeout(t);
    clearInterval(id);
  });
}

export function initMotion() {
  const mm = gsap.matchMedia();
  let scroller = null;
  mm.add('(prefers-reduced-motion: no-preference)', (context) => {
    document.documentElement.classList.add('has-motion');
    scroller = smoothScroll();
    hero();
    // Títulos só são divididos em palavras depois que as fontes da marca carregam.
    let alive = true;
    const split = () => {
      if (!alive) return;
      context.add(() => {
        revealHeadings();
        scrubWords();
        chars();
      });
      document.querySelectorAll('[data-split]').forEach((el) => el.classList.add('is-split'));
      ScrollTrigger.refresh();
    };
    Promise.race([document.fonts?.ready ?? Promise.resolve(), new Promise((r) => setTimeout(r, 600))]).then(
      split,
    );
    revealBlocks();
    counters();
    marqueeVelocity(scroller.lenis);
    marqueeSkew(scroller.lenis);
    stages();
    screens();
    pops();
    statBars();
    magnetic();
    header();
    tilt();
    spotlight();
    versus();
    keepInSync();
    return () => {
      alive = false;
      scroller?.destroy();
      cleanups.forEach((fn) => fn());
      cleanups = [];
      document.documentElement.classList.remove('has-motion');
    };
  });
  return () => mm.revert();
}
