import * as THREE from "three";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";

const CYAN = 0x22d3ee;     
const CYAN_L = 0x67e8f9;
const CYAN_CSS = "#67e8f9";

export function initRobot(canvas) {
  const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
  renderer.setPixelRatio(Math.min(devicePixelRatio, 2));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;

  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(30, 1, 0.1, 50);

  const pmrem = new THREE.PMREMGenerator(renderer);
  scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;

  scene.add(new THREE.AmbientLight(0x1b2a5a, 0.9));
  const key = new THREE.DirectionalLight(0x9db4ff, 3.2); key.position.set(-3, 3, 4); scene.add(key);
  const rim = new THREE.PointLight(CYAN, 90, 14); rim.position.set(3, 1.5, -2); scene.add(rim);
  const fill = new THREE.PointLight(0x3b5bff, 60, 14); fill.position.set(-3, -1, 2); scene.add(fill);

  const black = new THREE.MeshStandardMaterial({ color: 0x0b0c12, metalness: 0.7, roughness: 0.3, envMapIntensity: 0.9 });
  const dark = new THREE.MeshStandardMaterial({ color: 0x15161f, metalness: 0.6, roughness: 0.4, envMapIntensity: 0.8 });
  const glow = new THREE.MeshStandardMaterial({ color: CYAN_L, emissive: CYAN, emissiveIntensity: 2.4 });
  const tipMat = new THREE.MeshStandardMaterial({ color: 0xffffff, emissive: CYAN_L, emissiveIntensity: 0 });

  const robot = new THREE.Group(); scene.add(robot);
  const add = (geo, mat, x = 0, y = 0, z = 0, parent = robot) => { const m = new THREE.Mesh(geo, mat); m.position.set(x, y, z); parent.add(m); return m; };

  const torso = add(new THREE.SphereGeometry(1, 48, 32), black); torso.scale.set(1.15, 1.05, 0.8);
  for (let i = 0; i < 3; i++) { const r = add(new THREE.TorusGeometry(0.62 - i * 0.07, 0.014, 8, 48, Math.PI), dark, 0, -0.1 - i * 0.22, 0.62); r.rotation.set(Math.PI, 0, 0); r.scale.set(1.3, 1, 1); }
  const core = add(new THREE.TorusGeometry(0.1, 0.022, 16, 40), glow, 0, 0.12, 0.8);
  const corePoint = new THREE.PointLight(CYAN, 3, 2); corePoint.position.set(0, 0.12, 1); robot.add(corePoint);

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
    ec.fillStyle = CYAN_CSS; ec.beginPath(); ec.arc(4 + x * 8, 4 + y * 8, 2.2, 0, 7); ec.fill();
  }
  const eyeTex = new THREE.CanvasTexture(eyeCanvas); eyeTex.colorSpace = THREE.SRGBColorSpace;
  const eyeMat = new THREE.MeshBasicMaterial({ map: eyeTex, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0 });
  const eyes = [-0.19, 0.19].map((x) => add(new THREE.PlaneGeometry(0.3, 0.15), eyeMat, x, 0.1, 0.5, head));
  [-1, 1].forEach((s) => add(new THREE.CylinderGeometry(0.07, 0.07, 0.1, 16), dark, s * 0.52, 0, 0, head).rotation.z = Math.PI / 2);


  const makeArm = (s, pointing) => {
    const shoulder = new THREE.Group(); shoulder.position.set(s * 1.22, 0.62, 0); robot.add(shoulder);
    add(new THREE.SphereGeometry(0.3, 32, 24), black, 0, 0, 0, shoulder);
    add(new THREE.CapsuleGeometry(0.19, 0.9, 8, 24), black, s * 0.06, -0.65, 0, shoulder);
    const elbow = new THREE.Group(); elbow.position.set(s * 0.06, -1.25, 0); shoulder.add(elbow);
    add(new THREE.TorusGeometry(0.17, 0.02, 12, 36), glow, 0, 0, 0, elbow).rotation.x = Math.PI / 2;
    add(new THREE.CapsuleGeometry(0.15, 0.6, 8, 24), dark, 0, -0.5, 0, elbow);
    const hand = new THREE.Group(); hand.position.set(0, -1.02, 0); elbow.add(hand);
    const palm = add(new THREE.SphereGeometry(0.15, 24, 16), black, 0, 0, 0, hand); palm.scale.set(1, 0.9, 0.8);

    [[-0.09, -0.14, 0.08], [0.09, -0.14, 0.08], [0.17, -0.03, 0.05]].forEach(([x, y, z]) => add(new THREE.SphereGeometry(0.058, 12, 10), dark, x, y, z, hand));
    let tip = null, tipLight = null;
    if (pointing) {
      add(new THREE.CapsuleGeometry(0.04, 0.26, 6, 12), dark, 0, -0.26, 0.05, hand);   
      tip = add(new THREE.SphereGeometry(0.055, 16, 12), tipMat, 0, -0.45, 0.05, hand);
      tipLight = new THREE.PointLight(CYAN_L, 0, 4); tip.add(tipLight);
    } else {
      add(new THREE.SphereGeometry(0.058, 12, 10), dark, 0, -0.17, 0.08, hand);
    }
    return { shoulder, elbow, tip, tipLight, s };
  };
  const armR = makeArm(1, true);    
  const armL = makeArm(-1, false);
  add(new THREE.CylinderGeometry(0.35, 0.5, 0.6, 24), dark, 0, -1.0, 0);

  const hc = document.createElement("canvas"); hc.width = 256; hc.height = 128;
  const hx = hc.getContext("2d");
  hx.font = "700 76px 'JetBrains Mono', ui-monospace, monospace"; hx.textAlign = "center"; hx.textBaseline = "middle";
  hx.shadowColor = CYAN_CSS; hx.shadowBlur = 22; hx.fillStyle = CYAN_CSS; hx.fillText("</>", 128, 66);
  hx.shadowBlur = 8; hx.fillText("</>", 128, 66);
  const holo = new THREE.Sprite(new THREE.SpriteMaterial({ map: new THREE.CanvasTexture(hc), transparent: true, blending: THREE.AdditiveBlending, depthWrite: false, opacity: 0 }));
  holo.scale.set(1.3, 0.65, 1); robot.add(holo);

  const scanMat = new THREE.MeshBasicMaterial({ color: CYAN_L, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false, side: THREE.DoubleSide });
  const scan = add(new THREE.PlaneGeometry(3.8, 0.05), scanMat, 0, 2.6, 1.0);
  const scanSoftMat = scanMat.clone();
  const scanSoft = add(new THREE.PlaneGeometry(3.8, 0.7), scanSoftMat, 0, 2.6, 1.0);

  const rings = [1.9, 2.35].map((r) => {
    const m = add(new THREE.TorusGeometry(r, 0.012, 8, 160), new THREE.MeshBasicMaterial({ color: CYAN, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false }), 0, 0, 0);
    m.rotation.x = Math.PI / 2; return m;
  });

  const N = 140, pPos = new Float32Array(N * 3), pSpd = new Float32Array(N);
  for (let i = 0; i < N; i++) {
    const a = Math.random() * Math.PI * 2, r = 1.5 + Math.random() * 1.1;
    pPos[i * 3] = Math.cos(a) * r; pPos[i * 3 + 1] = -2.2 + Math.random() * 5; pPos[i * 3 + 2] = Math.sin(a) * r * 0.6;
    pSpd[i] = 0.25 + Math.random() * 0.6;
  }
  const dataGeo = new THREE.BufferGeometry(); dataGeo.setAttribute("position", new THREE.BufferAttribute(pPos, 3));
  const dataMat = new THREE.PointsMaterial({ color: CYAN_L, size: 0.045, transparent: true, opacity: 0, blending: THREE.AdditiveBlending, depthWrite: false });
  robot.add(new THREE.Points(dataGeo, dataMat));

  const pts = new Float32Array(240 * 3);
  for (let i = 0; i < pts.length; i += 3) { pts[i] = (Math.random() - 0.5) * 12; pts[i + 1] = (Math.random() - 0.5) * 8; pts[i + 2] = -2 - Math.random() * 4; }
  const pg = new THREE.BufferGeometry(); pg.setAttribute("position", new THREE.BufferAttribute(pts, 3));
  const particles = new THREE.Points(pg, new THREE.PointsMaterial({ color: 0x8aa4ff, size: 0.03, transparent: true, opacity: 0.6 }));
  scene.add(particles);

  let mode = "intro", t = 0, blink = 0, raise = 0, fx = 1;
  const t0 = performance.now();
  const mouse = { x: 0, y: 0 }, look = { x: 0, y: 0 };
  let scrollRot = 0, scrollTarget = 0;
  const view = { s: 1, x: 0, y: -0.5 };
  const tmp = new THREE.Vector3();
  const clamp = THREE.MathUtils.clamp;
  addEventListener("pointermove", (e) => { mouse.x = (e.clientX / innerWidth) * 2 - 1; mouse.y = (e.clientY / innerHeight) * 2 - 1; });
  addEventListener("scroll", () => { scrollTarget = (scrollY / Math.max(1, document.body.scrollHeight - innerHeight)) * Math.PI * 4; }, { passive: true });

  const target = { intro: { s: 1.05, x: 0, y: -0.5 }, widget: { s: 0.62, x: 0, y: -0.2 } };
  function resize() {
    const w = canvas.clientWidth || 1, h = canvas.clientHeight || 1;
    renderer.setSize(w, h, false); camera.aspect = w / h;
    const visW = 2 * 8.2 * Math.tan(THREE.MathUtils.degToRad(15)) * camera.aspect;
    target.intro.s = Math.min(1.05, visW / 3.4);  
    camera.position.set(0, 0.7, mode === "intro" ? 8.2 : 9.5); camera.lookAt(0, 0.5, 0);
    camera.updateProjectionMatrix();
  }
  new ResizeObserver(resize).observe(canvas);

  const api = { setMode(m, instant) { mode = m; resize(); if (instant) Object.assign(view, target[m]); } };
  resize();
  Object.assign(view, target.intro);

  const clock = new THREE.Clock();
  (function loop() {
    requestAnimationFrame(loop);
    const dt = Math.min(clock.getDelta(), 0.05); t += dt;
    const T = (performance.now() - t0) / 1000;           
    const intro = mode === "intro";
    const ease = (k) => 1 - Math.exp(-dt * k);

    const tg = target[mode];
    view.s += (tg.s - view.s) * 0.06; view.x += (tg.x - view.x) * 0.06; view.y += (tg.y - view.y) * 0.06;
    robot.scale.setScalar(view.s);
    robot.position.set(view.x, view.y + Math.sin(t * 1.4) * 0.05, 0);

    fx += ((intro ? 1 : 0) - fx) * ease(2.5);

    const powering = intro && T < 1.5;
    eyeMat.opacity = !intro ? 1 : T < 0.4 ? 0 : powering ? (Math.random() > 0.45 ? 1 : 0.12) : 1;
    const coreBase = intro ? 0.2 + clamp(T / 1.4, 0, 1) * 2.2 : 2.4;
    glow.emissiveIntensity = coreBase + Math.sin(t * 3) * 0.5;
    corePoint.intensity = glow.emissiveIntensity * 1.2;
    core.scale.setScalar(1 + Math.sin(t * 3) * 0.12);

    const sp = clamp((T - 0.6) / 1.6, 0, 1);
    scan.position.y = scanSoft.position.y = 2.6 - sp * 4.6;
    scanMat.opacity = intro && sp > 0 && sp < 1 ? Math.sin(sp * Math.PI) * 0.9 : 0;
    scanSoftMat.opacity = scanMat.opacity * 0.18;

    const wantRaise = intro && T > 2.0 && camera.aspect > 1.1 ? 1 : 0;   
    raise += (wantRaise - raise) * ease(3.2);
    const wave = intro && T > 3.6 ? Math.sin((T - 3.6) * 7) * 0.28 * raise : 0;
    const idle = 0.04 + Math.sin(t * 1.4) * 0.03;
    armR.shoulder.rotation.z = idle * (1 - raise) + raise * 1.5;
    armR.elbow.rotation.z = raise * 1.64 + wave;
    armL.shoulder.rotation.z = -(0.04 + Math.sin(t * 1.4 + 1) * 0.03);
    tipMat.emissiveIntensity = raise * 3.5;
    armR.tipLight.intensity = raise * 14;

    armR.tip.getWorldPosition(tmp); robot.worldToLocal(tmp);
    holo.position.set(tmp.x, tmp.y + 0.55 + Math.sin(t * 2) * 0.05, tmp.z + 0.1);
    holo.material.opacity = clamp((raise - 0.85) / 0.15, 0, 1) * fx * (0.8 + Math.sin(t * 8) * 0.12);

    rings.forEach((r, i) => {
      const k = Math.sin(t * 0.9 + i * 2.2);
      r.position.y = -0.2 + k * 1.7;
      r.material.opacity = fx * 0.55 * (1 - Math.abs(k) * 0.55);
    });
    const arr = dataGeo.attributes.position.array;
    for (let i = 0; i < N; i++) { arr[i * 3 + 1] += pSpd[i] * dt; if (arr[i * 3 + 1] > 2.8) arr[i * 3 + 1] = -2.2; }
    dataGeo.attributes.position.needsUpdate = true;
    dataMat.opacity = fx * 0.8;

    look.x += (mouse.x - look.x) * 0.06; look.y += (mouse.y - look.y) * 0.06;
    head.rotation.y = look.x * 0.5 + raise * 0.3; head.rotation.x = look.y * 0.25;
    scrollRot += (scrollTarget - scrollRot) * 0.05;
    robot.rotation.y = intro ? look.x * 0.18 : Math.sin(scrollRot) * 0.6;

    blink -= dt; if (blink < 0) blink = 3.5 + Math.random() * 2;
    const b = blink > 3.35 ? 0.1 : 1; eyes.forEach((e) => (e.scale.y += (b - e.scale.y) * 0.5));

    particles.rotation.y = t * 0.02;
    renderer.render(scene, camera);
  })();

  return api;
}