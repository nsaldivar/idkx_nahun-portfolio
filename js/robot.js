import * as THREE from "three";

export function initRobot(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.15;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);

  scene.add(new THREE.AmbientLight(0x2a2f6a, 0.9));
  const key = new THREE.DirectionalLight(0x8aa4ff, 2.2); key.position.set(-3, 3, 4); scene.add(key);
  const rim = new THREE.PointLight(0xa78bfa, 40, 12); rim.position.set(3, 1.5, -2); scene.add(rim);
  const fill = new THREE.PointLight(0x3b5bff, 28, 12); fill.position.set(-3, -1, 2); scene.add(fill);

  const black = new THREE.MeshStandardMaterial({ color: 0x0b0c12, metalness: 0.75, roughness: 0.28 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x15161f, metalness: 0.6, roughness: 0.4 });
  const glow = new THREE.MeshStandardMaterial({ color: 0xb69bff, emissive: 0xa78bfa, emissiveIntensity: 2.4 });

  const robot = new THREE.Group(); scene.add(robot);
  const add = (geo, mat, x = 0, y = 0, z = 0, parent = robot) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); parent.add(m); return m; };

  const torso = add(new THREE.SphereGeometry(1, 48, 32), black, 0, 0, 0); torso.scale.set(1.15, 1.05, 0.8);
  for (let i = 0; i < 3; i++) { const r = add(new THREE.TorusGeometry(0.62 - i * 0.07, 0.014, 8, 48, Math.PI), dark, 0, -0.1 - i * 0.22, 0.62); r.rotation.set(Math.PI, 0, 0); r.scale.set(1.3, 1, 1); }
  const core = add(new THREE.TorusGeometry(0.1, 0.022, 16, 40), glow, 0, 0.12, 0.8);
  const corePoint = new THREE.PointLight(0xa78bfa, 3, 2); corePoint.position.set(0, 0.12, 1); robot.add(corePoint);

  [-0.07, 0.07].forEach((x) => add(new THREE.CylinderGeometry(0.025, 0.025, 0.5, 12), glow, x, 1.12, 0));
  add(new THREE.CylinderGeometry(0.16, 0.2, 0.3, 24), dark, 0, 1.05, 0);

  const head = new THREE.Group(); head.position.set(0, 1.75, 0); robot.add(head);
  const skull = add(new THREE.SphereGeometry(0.55, 48, 32), black, 0, 0, 0, head); skull.scale.set(0.95, 1.2, 0.95);
  const visor = add(new THREE.SphereGeometry(0.5, 48, 32), new THREE.MeshStandardMaterial({ color: 0x020206, metalness: 0.9, roughness: 0.08 }), 0, 0.02, 0.1, head);
  visor.scale.set(0.82, 0.9, 0.7);

  const eyeCanvas = document.createElement("canvas"); eyeCanvas.width = 128; eyeCanvas.height = 64;
  const ec = eyeCanvas.getContext("2d");
  ec.fillStyle = "#000"; ec.fillRect(0, 0, 128, 64);
  for (let y = 0; y < 8; y++) for (let x = 0; x < 16; x++) {
    const dx = (x - 7.5) / 7, dy = (y - 3.5) / 3.6; if (dx * dx + dy * dy > 1) continue;
    ec.fillStyle = "#c4b5fd"; ec.beginPath(); ec.arc(4 + x * 8, 4 + y * 8, 2.2, 0, 7); ec.fill();
  }
  const eyeTex = new THREE.CanvasTexture(eyeCanvas); eyeTex.colorSpace = THREE.SRGBColorSpace;
  const eyeMat = new THREE.MeshBasicMaterial({ map: eyeTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
  const eyes = [-0.19, 0.19].map((x) => { const m = add(new THREE.PlaneGeometry(0.3, 0.15), eyeMat, x, 0.1, 0.5, head); return m; });
  [-1, 1].forEach((s) => add(new THREE.CylinderGeometry(0.07, 0.07, 0.1, 16), dark, s * 0.52, 0, 0, head).rotation.z = Math.PI / 2);

  const arms = [-1, 1].map((s) => {
    const a = new THREE.Group(); a.position.set(s * 1.22, 0.62, 0); robot.add(a);
    add(new THREE.SphereGeometry(0.3, 32, 24), black, 0, 0, 0, a);
    add(new THREE.CapsuleGeometry(0.19, 0.9, 8, 24), black, s * 0.06, -0.65, 0, a);
    add(new THREE.TorusGeometry(0.17, 0.02, 12, 36), glow, s * 0.06, -1.25, 0, a).rotation.x = Math.PI / 2;
    add(new THREE.CapsuleGeometry(0.15, 0.7, 8, 24), dark, s * 0.06, -1.75, 0, a);
    return a;
  });
  add(new THREE.CylinderGeometry(0.35, 0.5, 0.6, 24), dark, 0, -1.0, 0);

  const pts = new Float32Array(240 * 3);
  for (let i = 0; i < pts.length; i += 3) { pts[i] = (Math.random() - 0.5) * 12; pts[i + 1] = (Math.random() - 0.5) * 8; pts[i + 2] = -2 - Math.random() * 4; }
  const pg = new THREE.BufferGeometry(); pg.setAttribute("position", new THREE.BufferAttribute(pts, 3));
  const particles = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0x8aa4ff, size: 0.03, transparent: true, opacity: 0.6 }));
  scene.add(particles);

  let mode = "intro", t = 0, blink = 0;
  const mouse = { x: 0, y: 0 }, look = { x: 0, y: 0 };
  let scrollRot = 0, scrollTarget = 0;
  const view = { s: 1, x: 0.9, y: -0.6 };  
  addEventListener("pointermove", (e) => { mouse.x = (e.clientX / innerWidth) * 2 - 1; mouse.y = (e.clientY / innerHeight) * 2 - 1; });
  addEventListener("scroll", () => { scrollTarget = (scrollY / Math.max(1, document.body.scrollHeight - innerHeight)) * Math.PI * 4; }, { passive: true });

  function resize() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false); camera.aspect = w / h;
    camera.position.set(0, 0.7, mode === "intro" ? 8.2 : 9.5); camera.lookAt(0, 0.5, 0);
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(canvas);

  const target = { intro: { s: 1, x: 2.2, y: -0.35 }, widget: { s: 0.62, x: 0, y: -0.2 } };
  let transition = 0;
  const api = {
    setMode(m, instant) { mode = m; resize(); if (instant) Object.assign(view, target[m]); transition = 0; },
  };
  if (innerWidth < 760) target.intro.x = 0.9;   
  Object.assign(view, target.intro);

  const clock = new THREE.Clock();
  (function loop() {
    requestAnimationFrame(loop);
    const dt = Math.min(clock.getDelta(), 0.05); t += dt;
    const tg = target[mode];
    view.s += (tg.s - view.s) * 0.06; view.x += (tg.x - view.x) * 0.06; view.y += (tg.y - view.y) * 0.06;

    robot.scale.setScalar(view.s);
    robot.position.set(view.x, view.y + Math.sin(t * 1.4) * 0.05, 0);

    look.x += (mouse.x - look.x) * 0.06; look.y += (mouse.y - look.y) * 0.06;
    head.rotation.y = look.x * 0.5; head.rotation.x = look.y * 0.25;
    scrollRot += (scrollTarget - scrollRot) * 0.05;
    robot.rotation.y = mode === "intro" ? -0.35 + look.x * 0.12 : Math.sin(scrollRot) * 0.6;

    arms.forEach((a, i) => (a.rotation.z = (i ? -1 : 1) * (0.04 + Math.sin(t * 1.4 + i) * 0.03)));
    const pulse = 1 + Math.sin(t * 3) * 0.12; core.scale.setScalar(pulse); glow.emissiveIntensity = 2.2 + Math.sin(t * 3) * 0.6;

    blink -= dt; if (blink < 0) blink = 3.5 + Math.random() * 2;
    const b = blink > 3.35 ? 0.1 : 1; eyes.forEach((e) => (e.scale.y += (b - e.scale.y) * 0.5));

    particles.rotation.y = t * 0.02;
    renderer.render(scene, camera);
  })();

  resize();
  return api;
}
