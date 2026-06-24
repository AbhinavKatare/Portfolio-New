/* =========================================================
   Abhinav Katare — Portfolio interactions
   ========================================================= */

document.addEventListener('DOMContentLoaded', () => {
  initPreloader();
  initCursor();
  initNav();
  initProgressRail();
  initRevealOnScroll();
  initTimelineSpine();
  initMoreProjectsToggle();
  initBackToTop();
  initMagneticButtons();
  initHeroScene();
  initStoryFlow();
});

/* ---------------------------------------------------------
   Preloader
--------------------------------------------------------- */
function initPreloader() {
  const pre = document.getElementById('preloader');
  if (!pre) return;
  window.addEventListener('load', () => {
    setTimeout(() => pre.classList.add('is-hidden'), 600);
  });
  // Safety fallback in case load never fires cleanly
  setTimeout(() => pre.classList.add('is-hidden'), 2600);
}

/* ---------------------------------------------------------
   Custom cursor
--------------------------------------------------------- */
function initCursor() {
  const dot = document.getElementById('cursorDot');
  const ring = document.getElementById('cursorRing');
  if (!dot || !ring) return;
  if (window.matchMedia('(hover: none)').matches) return;

  let mouseX = 0, mouseY = 0;
  let ringX = 0, ringY = 0;

  window.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    dot.style.transform = `translate(${mouseX}px, ${mouseY}px) translate(-50%,-50%)`;
  });

  function loop() {
    ringX += (mouseX - ringX) * 0.18;
    ringY += (mouseY - ringY) * 0.18;
    ring.style.transform = `translate(${ringX}px, ${ringY}px) translate(-50%,-50%)`;
    requestAnimationFrame(loop);
  }
  loop();

  const interactive = 'a, button, .case, .cap-card, .more-item, .tl-item';
  document.querySelectorAll(interactive).forEach((el) => {
    el.addEventListener('mouseenter', () => ring.classList.add('is-active'));
    el.addEventListener('mouseleave', () => ring.classList.remove('is-active'));
  });
}

/* ---------------------------------------------------------
   Navbar — scroll state, mobile toggle, active link
--------------------------------------------------------- */
function initNav() {
  const navbar = document.getElementById('navbar');
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.getElementById('navMenu');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('is-scrolled', window.scrollY > 40);
  }, { passive: true });

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('is-open');
      navMenu.classList.toggle('is-open');
    });
    navMenu.querySelectorAll('a').forEach((a) => {
      a.addEventListener('click', () => {
        hamburger.classList.remove('is-open');
        navMenu.classList.remove('is-open');
      });
    });
  }

  // Active link highlighting via IntersectionObserver
  const sections = document.querySelectorAll('section[id]');
  const links = document.querySelectorAll('.nav-menu a');
  if (sections.length && links.length && 'IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const id = entry.target.getAttribute('id');
          links.forEach((l) => {
            l.classList.toggle('is-active', l.getAttribute('href') === `#${id}`);
          });
        }
      });
    }, { rootMargin: '-45% 0px -45% 0px', threshold: 0 });
    sections.forEach((s) => obs.observe(s));
  }
}

/* ---------------------------------------------------------
   Scroll progress rail
--------------------------------------------------------- */
function initProgressRail() {
  const fill = document.getElementById('progressFill');
  if (!fill) return;
  function update() {
    const doc = document.documentElement;
    const scrollable = doc.scrollHeight - doc.clientHeight;
    const pct = scrollable > 0 ? (window.scrollY / scrollable) * 100 : 0;
    const clamped = Math.min(100, Math.max(0, pct));
    // On mobile (<640px) the rail is horizontal (top bar); on desktop it's vertical (left rail)
    if (window.innerWidth <= 640) {
      fill.style.width = `${clamped}%`;
      fill.style.height = '100%';
    } else {
      fill.style.height = `${clamped}%`;
      fill.style.width = '100%';
    }
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

/* ---------------------------------------------------------
   Reveal-on-scroll
--------------------------------------------------------- */
function initRevealOnScroll() {
  const els = document.querySelectorAll('.reveal');
  if (!els.length) return;
  if (!('IntersectionObserver' in window)) {
    els.forEach((el) => el.classList.add('is-visible'));
    return;
  }
  const obs = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('is-visible');
        obs.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
  els.forEach((el) => obs.observe(el));
}

/* ---------------------------------------------------------
   Timeline spine fill + dot activation
--------------------------------------------------------- */
function initTimelineSpine() {
  const spineFill = document.getElementById('tlSpineFill');
  const items = document.querySelectorAll('.tl-item');
  if (!items.length) return;

  function update() {
    items.forEach((item) => {
      const rect = item.getBoundingClientRect();
      if (rect.top < window.innerHeight * 0.7) {
        item.classList.add('is-visible');
      }
    });
    if (spineFill) {
      const list = document.querySelector('.tl-list');
      const listRect = list.getBoundingClientRect();
      const viewportCenter = window.innerHeight * 0.7;
      let pct = ((viewportCenter - listRect.top) / listRect.height) * 100;
      pct = Math.min(100, Math.max(0, pct));
      spineFill.style.height = `${pct}%`;
    }
  }
  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);
  update();
}

/* ---------------------------------------------------------
   "View all projects" expandable grid
--------------------------------------------------------- */
function initMoreProjectsToggle() {
  const btn = document.getElementById('moreToggle');
  const grid = document.getElementById('moreGrid');
  if (!btn || !grid) return;
  btn.addEventListener('click', () => {
    const isOpen = grid.classList.toggle('is-open');
    btn.classList.toggle('is-open', isOpen);
    btn.querySelector('span').textContent = isOpen ? 'Hide projects' : 'View all projects';
  });
}

/* ---------------------------------------------------------
   Back to top button
--------------------------------------------------------- */
function initBackToTop() {
  const btn = document.getElementById('backToTop');
  if (!btn) return;
  window.addEventListener('scroll', () => {
    btn.classList.toggle('is-visible', window.scrollY > 600);
  }, { passive: true });
  btn.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}

/* ---------------------------------------------------------
   Magnetic buttons
--------------------------------------------------------- */
function initMagneticButtons() {
  if (window.matchMedia('(hover: none)').matches) return;
  document.querySelectorAll('.magnetic .btn').forEach((btn) => {
    btn.addEventListener('mousemove', (e) => {
      const rect = btn.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      btn.style.transform = `translate(${x * 0.25}px, ${y * 0.35}px)`;
    });
    btn.addEventListener('mouseleave', () => {
      btn.style.transform = 'translate(0,0)';
    });
  });
}

/* ---------------------------------------------------------
   Hero Three.js scene — "Product Constellation"
   Nodes represent shipped + in-progress products, connected
   by thin animated lines, slowly rotating with subtle
   mouse-parallax. Pure WebGL points + line geometry, no
   heavy postprocessing — kept light for mobile.
--------------------------------------------------------- */
function initHeroScene() {
  const canvas = document.getElementById('hero-canvas');
  if (!canvas || typeof THREE === 'undefined') return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({
    canvas,
    antialias: true,
    alpha: true,
    powerPreference: 'low-power'
  });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 100);
  camera.position.set(0, 0, 9);

  function resize() {
    const w = canvas.parentElement.clientWidth;
    const h = canvas.parentElement.clientHeight;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
    // Shift constellation toward the right side on wide viewports
    const offset = w > 880 ? 3.2 : 0;
    group.position.x = offset;
    particles.position.x = offset * 0.6;
  }

  // ---- Group that holds the whole constellation
  const group = new THREE.Group();
  scene.add(group);

  // ---- Node data: 3 shipped products (brighter) + 3 in-progress (dimmer, pulsing)
  const nodeDefs = [
    { name: 'Chatbolt', color: 0x7c5cfc, shipped: true },
    { name: 'Weblake', color: 0x3ddc97, shipped: true },
    { name: 'Setu-Scheduler', color: 0x7c5cfc, shipped: true },
    { name: 'Product 04', color: 0x9d8cff, shipped: false },
    { name: 'Product 05', color: 0x9d8cff, shipped: false },
    { name: 'Product 06', color: 0x9d8cff, shipped: false }
  ];

  // Position nodes roughly on a sphere shell
  const nodePositions = [];
  const golden = Math.PI * (3 - Math.sqrt(5));
  nodeDefs.forEach((def, i) => {
    const y = 1 - (i / (nodeDefs.length - 1)) * 2;
    const radiusAtY = Math.sqrt(1 - y * y);
    const theta = golden * i;
    const x = Math.cos(theta) * radiusAtY;
    const z = Math.sin(theta) * radiusAtY;
    const scale = 3.4;
    nodePositions.push(new THREE.Vector3(x * scale, y * scale, z * scale));
  });

  // ---- Node meshes (small glowing spheres via sprite-like geometry)
  const nodeMeshes = [];
  nodeDefs.forEach((def, i) => {
    const geo = new THREE.SphereGeometry(def.shipped ? 0.16 : 0.11, 24, 24);
    const mat = new THREE.MeshBasicMaterial({
      color: def.color,
      transparent: true,
      opacity: def.shipped ? 1 : 0.6
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(nodePositions[i]);
    group.add(mesh);
    nodeMeshes.push({ mesh, def });

    // Halo ring for shipped products
    if (def.shipped) {
      const ringGeo = new THREE.RingGeometry(0.24, 0.29, 32);
      const ringMat = new THREE.MeshBasicMaterial({
        color: def.color,
        transparent: true,
        opacity: 0.45,
        side: THREE.DoubleSide
      });
      const ring = new THREE.Mesh(ringGeo, ringMat);
      ring.position.copy(nodePositions[i]);
      group.add(ring);

      // Outer soft glow sprite
      const glowGeo = new THREE.SphereGeometry(0.42, 16, 16);
      const glowMat = new THREE.MeshBasicMaterial({
        color: def.color,
        transparent: true,
        opacity: 0.08
      });
      const glow = new THREE.Mesh(glowGeo, glowMat);
      glow.position.copy(nodePositions[i]);
      group.add(glow);
    }
  });

  // ---- Connecting lines between nodes (sparse, not full mesh)
  const linePairs = [
    [0, 1], [1, 2], [2, 0], // core triangle between shipped products
    [0, 3], [1, 4], [2, 5],
    [3, 4], [4, 5], [5, 3]
  ];
  const lineMaterial = new THREE.LineBasicMaterial({
    color: 0x6a5fae,
    transparent: true,
    opacity: 0.55
  });
  linePairs.forEach(([a, b]) => {
    const geo = new THREE.BufferGeometry().setFromPoints([nodePositions[a], nodePositions[b]]);
    const line = new THREE.Line(geo, lineMaterial);
    group.add(line);
  });

  // ---- Ambient particle field behind constellation
  const particleCount = window.innerWidth < 768 ? 220 : 500;
  const particlesGeo = new THREE.BufferGeometry();
  const positions = new Float32Array(particleCount * 3);
  for (let i = 0; i < particleCount; i++) {
    positions[i * 3] = (Math.random() - 0.5) * 22;
    positions[i * 3 + 1] = (Math.random() - 0.5) * 22;
    positions[i * 3 + 2] = (Math.random() - 0.5) * 22 - 4;
  }
  particlesGeo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
  const particlesMat = new THREE.PointsMaterial({
    color: 0x9089c2,
    size: 0.035,
    transparent: true,
    opacity: 0.7
  });
  const particles = new THREE.Points(particlesGeo, particlesMat);
  scene.add(particles);

  resize();
  window.addEventListener('resize', resize);

  // ---- Mouse parallax
  let targetRotX = 0, targetRotY = 0;
  window.addEventListener('mousemove', (e) => {
    targetRotY = (e.clientX / window.innerWidth - 0.5) * 0.4;
    targetRotX = (e.clientY / window.innerHeight - 0.5) * 0.25;
  });

  // ---- Animation loop
  const clock = new THREE.Clock();
  let frameId;

  function animate() {
    const elapsed = clock.getElapsedTime();

    if (!reduceMotion) {
      group.rotation.y += 0.0014;
      group.rotation.y += (targetRotY - group.rotation.y * 0) * 0; // placeholder no-op kept light
      group.rotation.x = THREE.MathUtils.lerp(group.rotation.x, targetRotX, 0.03);
      group.rotation.z = THREE.MathUtils.lerp(group.rotation.z, targetRotY * 0.3, 0.03);

      particles.rotation.y += 0.00025;

      // Pulse the "in-progress" nodes
      nodeMeshes.forEach(({ mesh, def }) => {
        if (!def.shipped) {
          const pulse = 0.4 + Math.sin(elapsed * 1.6 + mesh.position.x) * 0.25;
          mesh.material.opacity = 0.35 + pulse * 0.3;
        }
      });
    }

    renderer.render(scene, camera);
    frameId = requestAnimationFrame(animate);
  }
  animate();

  canvas.classList.add('is-ready');

  // Pause rendering when hero is offscreen (perf)
  if ('IntersectionObserver' in window) {
    const heroObs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          if (!frameId) animate();
        } else {
          cancelAnimationFrame(frameId);
          frameId = null;
        }
      });
    }, { threshold: 0 });
    heroObs.observe(canvas.parentElement);
  }
}

/* ---------------------------------------------------------
   Story section — "scattered inputs → one system" particle
   data-flow visualization. Several loose source points on the
   left emit particles along curved paths that converge into a
   single bright, orbited node cluster on the right — a literal
   illustration of "I took something fragmented and rebuilt it
   as one system," without depicting anything that can look
   wrong (no faces, no characters — just motion and light).
--------------------------------------------------------- */
function initStoryFlow() {
  const stage = document.getElementById('storyFlow');
  const canvas = document.getElementById('flow-canvas');
  if (!stage || !canvas || typeof THREE === 'undefined') return;

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.75));

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(40, 1, 0.1, 100);
  camera.position.set(0, 0, 7);

  const group = new THREE.Group();
  scene.add(group);

  // ---- Scattered source points (left side) — represent the
  // fragmented tools/workflows mentioned in the copy
  const sourceCount = 6;
  const sources = [];
  for (let i = 0; i < sourceCount; i++) {
    const angle = (i / sourceCount) * Math.PI * 1.3 - Math.PI * 0.15;
    const radius = 2.6 + (i % 2) * 0.5;
    const pos = new THREE.Vector3(
      -2.4 + Math.cos(angle) * 0.6,
      Math.sin(angle) * radius * 0.55,
      (Math.random() - 0.5) * 0.8
    );
    sources.push(pos);

    const dotGeo = new THREE.SphereGeometry(0.05, 12, 12);
    const dotMat = new THREE.MeshBasicMaterial({ color: 0x6e6b66, transparent: true, opacity: 0.7 });
    const dot = new THREE.Mesh(dotGeo, dotMat);
    dot.position.copy(pos);
    group.add(dot);
  }

  // ---- Convergence node (right side) — the "one system"
  const target = new THREE.Vector3(2.3, 0, 0);
  const coreGeo = new THREE.SphereGeometry(0.16, 24, 24);
  const coreMat = new THREE.MeshBasicMaterial({ color: 0x7c5cfc });
  const core = new THREE.Mesh(coreGeo, coreMat);
  core.position.copy(target);
  group.add(core);

  const coreGlowGeo = new THREE.SphereGeometry(0.34, 20, 20);
  const coreGlowMat = new THREE.MeshBasicMaterial({ color: 0x7c5cfc, transparent: true, opacity: 0.15 });
  const coreGlow = new THREE.Mesh(coreGlowGeo, coreGlowMat);
  coreGlow.position.copy(target);
  group.add(coreGlow);

  const ring = new THREE.Mesh(new THREE.TorusGeometry(0.46, 0.008, 8, 48), new THREE.MeshBasicMaterial({ color: 0x3ddc97, transparent: true, opacity: 0.55 }));
  ring.position.copy(target);
  group.add(ring);

  // ---- Faint curved guide lines from each source to the core
  sources.forEach((src) => {
    const mid = src.clone().lerp(target, 0.5);
    mid.y += (Math.random() - 0.5) * 0.6;
    const curve = new THREE.QuadraticBezierCurve3(src, mid, target);
    const points = curve.getPoints(24);
    const geo = new THREE.BufferGeometry().setFromPoints(points);
    const mat = new THREE.LineBasicMaterial({ color: 0x2a283a, transparent: true, opacity: 0.5 });
    const line = new THREE.Line(geo, mat);
    group.add(line);
  });

  // ---- Flowing particles — small points traveling along each
  // curve from source to core, looped with staggered timing
  const particlesPerPath = 4;
  const flowParticles = [];
  sources.forEach((src, idx) => {
    const mid = src.clone().lerp(target, 0.5);
    mid.y += Math.sin(idx) * 0.4;
    const curve = new THREE.QuadraticBezierCurve3(src, mid, target);

    for (let p = 0; p < particlesPerPath; p++) {
      const geo = new THREE.SphereGeometry(0.035, 8, 8);
      const colorChoice = p % 2 === 0 ? 0x7c5cfc : 0x3ddc97;
      const mat = new THREE.MeshBasicMaterial({ color: colorChoice, transparent: true, opacity: 0.9 });
      const mesh = new THREE.Mesh(geo, mat);
      group.add(mesh);
      flowParticles.push({
        mesh,
        curve,
        offset: (p / particlesPerPath) + idx * 0.07,
        speed: 0.18 + Math.random() * 0.06
      });
    }
  });

  function resize() {
    const w = stage.clientWidth;
    const h = stage.clientHeight;
    if (!w || !h) return;
    renderer.setSize(w, h, false);
    camera.aspect = w / h;
    camera.updateProjectionMatrix();
  }
  resize();
  window.addEventListener('resize', resize);

  const clock = new THREE.Clock();
  let frameId;

  function animate() {
    const t = clock.getElapsedTime();

    if (!reduceMotion) {
      flowParticles.forEach((fp) => {
        let progress = (t * fp.speed + fp.offset) % 1;
        const point = fp.curve.getPoint(progress);
        fp.mesh.position.copy(point);
        // fade in/out near the endpoints so particles don't pop
        const fade = Math.sin(progress * Math.PI);
        fp.mesh.material.opacity = 0.25 + fade * 0.7;
        const scale = 0.7 + fade * 0.6;
        fp.mesh.scale.setScalar(scale);
      });

      ring.rotation.z += 0.01;
      ring.rotation.x = Math.sin(t * 0.4) * 0.3;
      core.scale.setScalar(1 + Math.sin(t * 2) * 0.08);
      coreGlow.scale.setScalar(1 + Math.sin(t * 2) * 0.15);
      group.rotation.y = Math.sin(t * 0.15) * 0.08;
    }

    renderer.render(scene, camera);
    frameId = requestAnimationFrame(animate);
  }
  animate();

  if ('IntersectionObserver' in window) {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) { if (!frameId) animate(); }
        else { cancelAnimationFrame(frameId); frameId = null; }
      });
    }, { threshold: 0 });
    obs.observe(stage);
  }
}
