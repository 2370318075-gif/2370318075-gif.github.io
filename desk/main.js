import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { RoomEnvironment } from 'three/addons/environments/RoomEnvironment.js';
import { GLTFLoader } from 'three/addons/loaders/GLTFLoader.js';
import { EffectComposer } from 'three/addons/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/addons/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/addons/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/addons/postprocessing/OutputPass.js';
import { GTAOPass } from 'three/addons/postprocessing/GTAOPass.js';
import { RGBELoader } from 'three/addons/loaders/RGBELoader.js';

const reduce = matchMedia('(prefers-reduced-motion: reduce)').matches;
const isTouch = matchMedia('(hover: none), (pointer: coarse)').matches || 'ontouchstart' in window;
const ACCENT = '#E2572B';
const FONT = '-apple-system, "PingFang SC", "Helvetica Neue", sans-serif';
const BG = '#0F0C0A';

/* ---------- 渲染器 / 场景 ---------- */
const renderer = new THREE.WebGLRenderer({ canvas: document.getElementById('scene'), antialias: false, powerPreference: 'high-performance' });
renderer.setPixelRatio(devicePixelRatio);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.shadowMap.autoUpdate = false;
renderer.toneMapping = THREE.AgXToneMapping;
renderer.toneMappingExposure = 1.35;

const scene = new THREE.Scene();
scene.background = new THREE.Color(BG);
scene.fog = new THREE.Fog(BG, 26, 52);
const pmrem = new THREE.PMREMGenerator(renderer);
scene.environment = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
scene.environmentIntensity = 0.3;

const camera = new THREE.PerspectiveCamera(33, 1, 0.05, 120);
const HOME_LOOK = new THREE.Vector3(-0.3, 1.95, -1.05);
const HOME_CAM = new THREE.Vector3(1.0, 5.4, 21.8);
let camScale = 1;
const view = { pos: HOME_CAM.clone(), look: HOME_LOOK.clone() };

const composer = new EffectComposer(renderer, new THREE.WebGLRenderTarget(1, 1, { samples: isTouch ? 4 : 8, type: THREE.HalfFloatType }));
composer.addPass(new RenderPass(scene, camera));
const gtao = new GTAOPass(scene, camera, 1, 1);
gtao.output = GTAOPass.OUTPUT.Default;
gtao.blendIntensity = 1;
gtao.updateGtaoMaterial({ radius: 1.2, distanceExponent: 1.5, thickness: 1.5, scale: 1.2, samples: 12 });
gtao.updatePdMaterial({ lumaPhi: 10, depthPhi: 2, normalPhi: 3, radius: 6, rings: 2, samples: 12 });
composer.addPass(gtao);
const bloom = new UnrealBloomPass(new THREE.Vector2(1, 1), 0.22, 0.5, 0.95);
composer.addPass(bloom);
composer.addPass(new OutputPass());
// 清晰度拉满：渲染目标带 MSAA 采样，不再走 FXAA（FXAA 用模糊换抗锯齿，是屏幕文字发虚的最后一环）

/* ---------- 工具 ---------- */
const std = (color, roughness = 0.6, metalness = 0, extra = {}) => new THREE.MeshStandardMaterial({ color, roughness, metalness, ...extra });
const box = (w, h, d, r = 0.02) => new RoundedBoxGeometry(w, h, d, 4, Math.min(r, w / 2, h / 2, d / 2) * 0.999);
function mesh(geo, mat, x = 0, y = 0, z = 0) {
  const m = new THREE.Mesh(geo, mat);
  m.position.set(x, y, z);
  m.castShadow = m.receiveShadow = true;
  return m;
}
function canvasTex(w, h, draw) {
  const c = document.createElement('canvas');
  c.width = w; c.height = h;
  draw(c.getContext('2d'), w, h);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  t.anisotropy = 8;
  t.userData.redraw = () => { draw(c.getContext('2d'), w, h); t.needsUpdate = true; };
  return t;
}
function plane(w, h, mat, x = 0, y = 0, z = 0, flat = false) {
  const m = new THREE.Mesh(new THREE.PlaneGeometry(w, h), mat);
  if (flat) m.rotation.x = -Math.PI / 2;
  m.position.set(x, y, z);
  m.receiveShadow = true;
  return m;
}
const group = (...ch) => { const g = new THREE.Group(); if (ch.length) g.add(...ch); return g; };
const place = (g, x, y, z, ry = 0) => { g.position.set(x, y, z); g.rotation.y = ry; scene.add(g); return g; };
const screenMat = map => new THREE.MeshBasicMaterial({ map, color: new THREE.Color(0, 0, 0) });
const screens = [];
const rand = (a, b) => a + Math.random() * (b - a);

/* ---------- 资源加载 ---------- */
const loading = document.getElementById('loading');
const manager = new THREE.LoadingManager();
manager.onProgress = (_, done, total) => { if (loading) loading.dataset.p = Math.round((done / total) * 100) + '%'; };
const texLoader = new THREE.TextureLoader(manager);
const gltfLoader = new GLTFLoader(manager);
const maxAniso = renderer.capabilities.getMaxAnisotropy();

function pbr(name, repeat = [1, 1], extra = {}) {
  const t = k => {
    const tx = texLoader.load(`assets/textures/${name}_${k}.jpg`);
    tx.wrapS = tx.wrapT = THREE.RepeatWrapping;
    tx.repeat.set(...repeat);
    tx.anisotropy = maxAniso;
    if (k === 'diff') tx.colorSpace = THREE.SRGBColorSpace;
    return tx;
  };
  return new THREE.MeshStandardMaterial({ map: t('diff'), normalMap: t('nor'), roughnessMap: t('rough'), ...extra });
}

function acg(id, repeat = [1, 1], extra = {}, maps = ['Color', 'NormalGL', 'Roughness']) {
  const t = k => {
    const tx = texLoader.load(`assets/textures/acg/${id}/${id}_1K-JPG_${k}.jpg`);
    tx.wrapS = tx.wrapT = THREE.RepeatWrapping;
    tx.repeat.set(...repeat);
    tx.anisotropy = maxAniso;
    if (k === 'Color') tx.colorSpace = THREE.SRGBColorSpace;
    return tx;
  };
  const keys = { Color: 'map', NormalGL: 'normalMap', Roughness: 'roughnessMap', Metalness: 'metalnessMap' };
  const o = {};
  maps.forEach(k => { o[keys[k]] = t(k); });
  const Ctor = extra.clearcoat !== undefined ? THREE.MeshPhysicalMaterial : THREE.MeshStandardMaterial;
  return new Ctor({ ...o, ...extra });
}
const smudge = (() => {
  const tx = texLoader.load('assets/textures/acg/Fingerprints002/Fingerprints002_1K-JPG_Roughness.jpg');
  tx.wrapS = tx.wrapT = THREE.RepeatWrapping;
  return tx;
})();
/* 屏幕玻璃：黑色加法混合，只叠加环境反射与指纹 */
const glassMat = () => new THREE.MeshBasicMaterial({ color: '#000', envMap: scene.environment, combine: THREE.MixOperation, reflectivity: 0.18,
  alphaMap: smudge, transparent: true, blending: THREE.AdditiveBlending, depthWrite: false });
const glass = (w, h, ref) => { const g = new THREE.Mesh(new THREE.PlaneGeometry(w, h), glassMat()); g.position.copy(ref.position); g.rotation.copy(ref.rotation); g.translateZ(0.003); return g; };

const hdr = await new RGBELoader(manager).loadAsync('assets/hdri/studio_1k.hdr');
hdr.mapping = THREE.EquirectangularReflectionMapping;
scene.environment = pmrem.fromEquirectangular(hdr).texture;
scene.environmentRotation.y = 2.2;
hdr.dispose();

/* 真实材质库 */
const M = {
  alu: acg('Metal012', [1, 1], { color: '#D3D6DA', metalness: 1, roughness: 0.55 }, ['NormalGL', 'Roughness']),
  aluDark: acg('Metal012', [1, 1], { color: '#8E9196', metalness: 1, roughness: 0.6 }, ['NormalGL', 'Roughness']),
  whitePlastic: acg('Plastic013A', [1, 1], { color: '#EDEBE6', roughness: 0.6 }, ['NormalGL', 'Roughness']),
  keycap: acg('Plastic013A', [0.25, 0.25], { color: '#F2EFE8', roughness: 0.85 }, ['NormalGL', 'Roughness']),
  blackPlastic: acg('Plastic012A', [1, 1], { color: '#1A1A1C', roughness: 0.55 }, ['NormalGL', 'Roughness']),
  powder: acg('Plastic012A', [2, 2], { color: '#18181B', metalness: 0.35, roughness: 0.5 }, ['NormalGL', 'Roughness']),
  felt: acg('Fabric034', [5, 2], { color: '#7A7A80', roughness: 1 }),
  paper: acg('Paper001', [1, 1], { roughness: 0.95 }),
  ceramic: new THREE.MeshPhysicalMaterial({ color: '#F3F1EC', roughness: 0.32, roughnessMap: smudge, clearcoat: 1, clearcoatRoughness: 0.08 }),
};
const cloth = c => acg('Fabric034', [1, 1], { color: c, roughness: 1 }, ['NormalGL', 'Roughness']);

const MODELS = ['desk_lamp_arm_01', 'Camera_01', 'potted_plant_04', 'potted_plant_02', 'binder_notebook',
  'stationery_supplies', 'standing_picture_frame_01', 'portable_cassette_player', 'modern_arm_chair_01'];
const SKETCHFAB = ['monitor', 'laptop', 'keyboard', 'mouse', 'phone', 'clock'];
const sources = [...MODELS.map(id => [id, `assets/models/${id}/${id}_1k.gltf`]), ...SKETCHFAB.map(id => ['sf_' + id, `assets/sketchfab/${id}.glb`])];
const models = Object.fromEntries(await Promise.all(sources.map(async ([id, url]) => {
  const g = await gltfLoader.loadAsync(url);
  g.scene.traverse(o => { if (o.isMesh) { o.castShadow = o.receiveShadow = true; } });
  return [id, g.scene];
})));
function model(id, scale = 10, { ground = true, keep, rot, prep } = {}) {
  const src = models[id].clone(true);
  if (keep) src.traverse(o => { if (o.isMesh && !keep(o)) o.visible = false; });
  src.scale.setScalar(scale);
  if (rot) src.rotation.set(...rot);
  prep?.(src);
  const g = group(src);
  if (ground) {
    g.updateMatrixWorld(true);
    const b = new THREE.Box3();
    src.traverse(o => { if (o.isMesh && o.visible) b.expandByObject(o); });
    const c = b.getCenter(new THREE.Vector3());
    src.position.set(-c.x, -b.min.y, -c.z);
  }
  return g;
}

/* ---------- 贴图 ---------- */
const pegTex = canvasTex(1000, 700, (c, w, h) => {
  c.fillStyle = '#CFC8BD'; c.fillRect(0, 0, w, h);
  c.fillStyle = '#4E4741';
  for (let y = 25; y < h; y += 34) for (let x = 25; x < w; x += 34) { c.beginPath(); c.arc(x, y, 4.5, 0, 7); c.fill(); }
});
const posterTex = canvasTex(600, 800, (c, w, h) => {
  c.fillStyle = '#151413'; c.fillRect(0, 0, w, h);
  c.fillStyle = '#EDE6DA'; c.font = `800 190px ${FONT}`;
  c.fillText('SHIP', 40, 260); c.fillText('IT.', 40, 450);
  c.fillStyle = ACCENT; c.fillRect(44, 520, 120, 10);
  c.fillStyle = '#8F877C'; c.font = `28px ${FONT}`;
  c.fillText('BUILD · MEASURE · ITERATE', 44, 600);
  c.fillText('ZHOU QIZHI — 2026', 44, h - 60);
});
const dotTex = canvasTex(64, 64, (c, w) => {
  const g = c.createRadialGradient(w / 2, w / 2, 0, w / 2, w / 2, w / 2);
  g.addColorStop(0, 'rgba(255,255,255,1)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  c.fillStyle = g; c.fillRect(0, 0, w, w);
});

/* ---------- 房间 ---------- */
scene.add(plane(80, 80, pbr('floor', [10, 10], { color: '#8A7765' }), 0, -7.5, 0, true));
scene.add(mesh(box(22, 0.05, 14, 0.02), acg('Fabric034', [10, 6], { color: '#4A433C', roughness: 1 }), 0, -7.47, 1.5));
scene.add(plane(80, 40, pbr('wall', [8, 4], { color: '#8C7E72' }), 0, 10, -3.9));
scene.add(mesh(box(10.5, 6.6, 0.12, 0.04), std('#CFC8BD', 0.85, 0, { map: pegTex }), -3.2, 6.4, -3.8));
scene.add(mesh(box(3.4, 4.4, 0.14, 0.03), std('#E9E4DA', 0.6), 6.2, 6.3, -3.8));
scene.add(plane(3.0, 4.0, std('#ffffff', 0.7, 0, { map: posterTex }), 6.2, 6.3, -3.72));

/* 桌子 */
const wood = pbr('desk', [2, 1], { color: '#B79A80' });
scene.add(mesh(box(16.4, 0.4, 7.4, 0.1), wood, 0, -0.2, 0));
const metal = M.powder;
[-7.1, 7.1].forEach(x => {
  scene.add(mesh(box(0.6, 7.0, 0.9, 0.05), metal, x, -3.9, -0.4));
  scene.add(mesh(box(0.8, 0.3, 6.6, 0.08), metal, x, -7.35, -0.4));
  scene.add(mesh(box(0.9, 0.25, 6.4, 0.04), metal, x, -0.52, -0.2));
});
scene.add(mesh(box(14.2, 0.4, 0.4, 0.04), metal, 0, -0.62, -2.6));
scene.add(mesh(box(1.4, 0.28, 0.5, 0.06), metal, 5.6, -0.56, 3.3));
scene.add(mesh(new THREE.BoxGeometry(0.5, 0.06, 0.02), new THREE.MeshBasicMaterial({ color: '#6fd3ff', toneMapped: false }), 5.6, -0.56, 3.56));

const riserWood = pbr('desk', [1.2, 0.3], { color: '#D9C2AC' });
scene.add(mesh(box(9.8, 0.28, 2.2, 0.06), riserWood, -1.0, 1.3, -2.4));
[-5.6, 3.6].forEach(x => scene.add(mesh(box(0.25, 1.16, 2.0, 0.03), metal, x, 0.58, -2.4)));
scene.add(mesh(box(11.5, 0.05, 4.2, 0.025), M.felt, -0.3, 0.025, 1.2));

/* ---------- 灯光 ---------- */
const hemi = new THREE.HemisphereLight('#B7C3D9', '#3A2A1E', 0.35);
scene.add(hemi);
const windowLight = new THREE.DirectionalLight('#D6E0FF', 1.1);
windowLight.position.set(-14, 12, 10);
windowLight.target.position.set(0, 0, -1);
windowLight.castShadow = true;
windowLight.shadow.mapSize.set(2048, 2048);
Object.assign(windowLight.shadow.camera, { left: -12, right: 12, top: 10, bottom: -10, near: 1, far: 50 });
windowLight.shadow.bias = -0.0003;
windowLight.shadow.normalBias = 0.03;
windowLight.shadow.radius = 4;
scene.add(windowLight, windowLight.target);
const rim = new THREE.DirectionalLight('#6F86B8', 0.9);
rim.position.set(12, 9, -1);
scene.add(rim);

/* 台灯（Poly Haven 模型），灯头位置由模型中的发光材质求得 */
const lampModel = model('desk_lamp_arm_01', 10);
place(lampModel, -6.9, 0, -2.6, -2.15);
lampModel.updateMatrixWorld(true);
const LAMP_HEAD = new THREE.Vector3();
let lampBulbMat = null;
lampModel.traverse(o => {
  if (o.isMesh && /light/i.test(o.material.name)) {
    new THREE.Box3().setFromObject(o).getCenter(LAMP_HEAD);
    o.material = o.material.clone();
    lampBulbMat = o.material;
    o.castShadow = false;
  }
});
const LAMP_AIM = new THREE.Vector3(-3.1, 0, 0.9);
const lamp = new THREE.SpotLight('#FFB36B', 0, 0, 0.33, 0.92, 2);
lamp.position.copy(LAMP_HEAD).add(new THREE.Vector3(0, -0.15, 0));
lamp.target.position.copy(LAMP_AIM);
lamp.castShadow = true;
lamp.shadow.mapSize.set(2048, 2048);
lamp.shadow.bias = -0.0002;
lamp.shadow.normalBias = 0.03;
lamp.shadow.camera.near = 0.3;
scene.add(lamp, lamp.target);
const LAMP_ON = 420;

/* 桌面上的暖光斑：柔和放射渐变贴片，叠加在台灯照射点 */
const poolTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const x = c.getContext('2d');
  const g = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, 'rgba(255,255,255,.9)'); g.addColorStop(.35, 'rgba(255,255,255,.42)'); g.addColorStop(.7, 'rgba(255,255,255,.12)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g; x.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
})();
const poolMat = new THREE.MeshBasicMaterial({ map: poolTex, color: '#FFB36B', transparent: true, opacity: 0, depthWrite: false, blending: THREE.AdditiveBlending });
const pool = new THREE.Mesh(new THREE.CircleGeometry(3.6, 48), poolMat);
pool.rotation.x = -Math.PI / 2;
pool.position.set(LAMP_AIM.x, 0.075, LAMP_AIM.z);
pool.scale.set(1.25, 1, 1);
scene.add(pool);

const bar = new THREE.SpotLight('#FFE7C7', 0, 0, 1.0, 1, 2);
bar.position.set(-1.2, 7.0, -2.2);
bar.target.position.set(-1.2, 0, 1.2);
scene.add(bar, bar.target);
const monGlow = new THREE.PointLight('#7AB0FF', 0, 10, 2);
monGlow.position.set(-1.2, 4.2, -1.2);
scene.add(monGlow);
const candle = new THREE.PointLight('#FF8A3D', 0, 6, 2);
scene.add(candle);
const wash = new THREE.SpotLight('#FFC58A', 0, 0, 0.9, 1, 1.6);
wash.position.set(0, 13, 1);
wash.target.position.set(-1, 5, -3.9);
scene.add(wash, wash.target);
const under = new THREE.PointLight('#FFB070', 0, 7, 2);
under.position.set(-1, 0.9, -1.2);
scene.add(under);

/* ---------- 交互物件 ---------- */
const items = {};
const alu = M.alu;

/* view: [方位角°, 仰角°, 距离倍数]，镜头从物件正前方按此角度推近 */
function item(key, label, [x, y, z], ry, build, viewCfg, lift = [0, 0.15, 0]) {
  const g = group();
  build(g);
  place(g, x, y, z, ry);
  g.traverse(o => { if (o.isMesh) o.userData.key = key; });
  items[key] = { key, label, group: g, view: viewCfg, lift: 0, liftDir: new THREE.Vector3(...lift), home: g.position.clone() };
}

function drawProjects(c, w, h, title) {
  c.fillStyle = '#141416'; c.fillRect(0, 0, w, h);
  c.fillStyle = '#3A3A3E';
  [40, 68, 96].forEach(x => { c.beginPath(); c.arc(x, 40, 10, 0, 7); c.fill(); });
  c.fillStyle = '#86868B'; c.font = `30px ui-monospace, Menlo, monospace`; c.fillText(title, 140, 51);
  const names = [['Stream Ready', 'AI 音频工作台'], ['先声 PreVoice', '多 Agent 合成调研'], ['Server Ops', 'AI 运维副驾'], ['Pocket Agent', '手机智能体']];
  const pad = 60, gw = (w - pad * 3) / 2, gh = (h - 130 - pad * 2) / 2;

  names.forEach(([t, s], i) => {
    const x = pad + (i % 2) * (gw + pad), y = 110 + Math.floor(i / 2) * (gh + pad / 1.5);
    c.fillStyle = '#1D1D20'; c.fillRect(x, y, gw, gh);
    c.fillStyle = i === 0 ? ACCENT : '#86868B'; c.font = `26px ${FONT}`; c.fillText(i === 0 ? 'FEATURED' : 'PROJECT 0' + (i + 1), x + 36, y + 60);
    c.fillStyle = '#EDEDED'; c.font = `600 64px ${FONT}`; c.fillText(t, x + 36, y + gh / 2 + 30);
    c.fillStyle = '#8E8E93'; c.font = `30px ${FONT}`; c.fillText(s, x + 36, y + gh - 40);
  });
}

item('monitor', '显示器 · 产品项目', [-1.2, 1.44, -2.6], 0, g => {
  const S = 11;
  g.add(model('sf_monitor', S, { prep: src => {
    // 隐藏模型自带的半透明玻璃层和转轴处的重复面片——与插入的屏幕/玻璃层共面产生 z-fighting
    src.traverse(o => {
      if (!o.isMesh) return;
      // 隐藏半透明玻璃层 + 整个支架相关网格（内部重叠面片是闪烁根源，支架用代码重建）
      const stand = ['brcoZSxzOSoevAw', 'CElcLTDBzgBFdsM', 'wZGbeDqBpMbWxTB', 'SknzJgmHAaIMFSw_0', 'TDkvoVUgHzLbzbL',
        'ZWCSZUadUZuaVww', 'AGySFvQQCOoAsmj_0', 'MrDSpJtaCtWvGof_0'];
      if (o.material?.transparent || stand.includes(o.name)) o.visible = false;
      // 模型自带的显示面板改成纯深色（Basic 材质不反光，避免屏幕上的高光点）
      if (o.name === 'NYVmzMLiovxElXF') o.material = new THREE.MeshBasicMaterial({ color: '#0C0C0F' });
    });
    // 代码重建干净的铝合金支架：底座 + 颈板 + 转轴
    const alu = new THREE.MeshStandardMaterial({ color: '#B9BBBD', metalness: 0.9, roughness: 0.32 });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.19, 0.006, 0.135), alu);
    base.position.set(0, 0.003, -0.005);
    const neck = new THREE.Mesh(new THREE.BoxGeometry(0.028, 0.175, 0.014), alu);
    neck.position.set(0, 0.088, -0.002); neck.rotation.x = -0.05;
    const hinge = new THREE.Mesh(new THREE.CylinderGeometry(0.012, 0.012, 0.05, 20), alu);
    hinge.rotation.z = Math.PI / 2; hinge.position.set(0, 0.178, 0.005);
    src.add(base, neck, hinge);

  } }));
  const tex = canvasTex(3840, 2136, (c) => { c.scale(2.4, 2.4); drawProjects(c, 1600, 890, 'projects — 周琦致'); });
  tex.anisotropy = 16;
  const scr = new THREE.Mesh(new THREE.PlaneGeometry(0.597 * S, 0.331 * S), screenMat(tex));
  scr.position.set(0, 0.30 * S, 0.069 * S);
  scr.rotation.x = -0.124; // 贴合模型前盖玻璃约 7° 后倾角，防止下半部被玻璃挡住
  screens.push(scr.material);
  g.add(scr, glass(0.597 * S, 0.331 * S, scr));
}, [0, 4, 1.75], [0, 0.1, 0]);

item('laptop', '电脑 · Stream Ready', [5.3, 0, -1.4], -0.42, g => {
  const tilt = group();
  tilt.position.set(0, 1.0, 0);
  tilt.rotation.x = 0.35;
  tilt.add(mesh(box(3.0, 0.07, 2.2, 0.03), metal, 0, -0.05, 0));
  g.add(mesh(box(0.18, 1.7, 0.18, 0.04), metal, -1.2, 0.85, -0.75), mesh(box(0.18, 1.7, 0.18, 0.04), metal, 1.2, 0.85, -0.75));
  g.add(mesh(box(0.2, 0.6, 0.2, 0.04), metal, -1.2, 0.3, 0.9), mesh(box(0.2, 0.6, 0.2, 0.04), metal, 1.2, 0.3, 0.9));
  const tex = canvasTex(1024, 660, (c, w) => {
    c.fillStyle = '#121214'; c.fillRect(0, 0, w, 660);
    c.fillStyle = '#EDEDED'; c.font = `600 44px ${FONT}`; c.fillText('Stream Ready', 48, 80);
    c.fillStyle = '#86868B'; c.font = `24px ${FONT}`; c.fillText('Mastering · Stems · De-artifact', 48, 120);
    for (let i = 0; i < 90; i++) {
      const v = Math.abs(Math.sin(i * 0.37) * Math.cos(i * 0.11)) * 150 + 12;
      c.fillStyle = i < 40 ? ACCENT : '#3A3A3E';
      c.fillRect(48 + i * 10.3, 300 - v / 2, 6, v);
    }
    c.fillStyle = '#1F1F23'; c.fillRect(48, 450, 620, 70); c.fillRect(356, 540, 620, 70);
    c.fillStyle = '#C9C9CE'; c.font = `28px ${FONT}`;
    c.fillText('提亮人声，减少低频，增加空气感', 72, 496);
    c.fillStyle = ACCENT; c.fillText('✓ 已执行 3 项调整 · 扣 1 次', 380, 586);
  });
  tex.flipY = false;
  tex.center.set(0.5, 0.5);
  tex.rotation = Math.PI;
  tex.repeat.x = -1;
  const lap = model('sf_laptop', 11, { prep: src => {
    src.getObjectByName('Bevels_2').rotation.x = -1.78;
    src.traverse(o => { if (o.isMesh && o.material?.transparent) o.visible = false; });
  } });
  lap.traverse(o => {
    if (o.isMesh && o.material.name === 'Material.002') {
      const m = screenMat(tex);
      m.polygonOffset = true; m.polygonOffsetFactor = -2; m.polygonOffsetUnits = -4;
      o.material = m; screens.push(m);
    }
  });
  lap.position.y = -0.02;
  tilt.add(lap);
  g.add(tilt);
}, [0, 12, 1.5], [0, 0.12, 0]);

item('notebook', '笔记本 · 工作经历', [6.3, 0.02, 1.9], -0.25, g => {
  g.add(model('binder_notebook', 12, { keep: o => o.parent?.name === 'binder_notebook_closed' || o.name.includes('closed') }));
}, [0, 58, 1.9]);

item('card', '名片 · 关于我', [-6.5, 0.13, 1.5], 0.12, g => {
  g.add(mesh(box(1.75, 0.022, 1.0, 0.008), M.paper, 0.06, 0.011, 0.04));
  g.children.at(-1).rotation.y = -0.12;
  g.add(mesh(box(1.75, 0.022, 1.0, 0.008), M.paper, 0, 0.034, 0));
  g.add(plane(1.75, 1.0, std('#fff', 0.95, 0, { transparent: true, normalMap: M.paper.normalMap, map: canvasTex(700, 400, (c, w, h) => {
    c.fillStyle = ACCENT; c.fillRect(48, 56, 56, 8);
    c.fillStyle = '#1C1B19'; c.font = `700 92px ${FONT}`; c.fillText('周琦致', 46, 190);
    c.fillStyle = '#7A746A'; c.font = `30px ${FONT}`; c.fillText('AI PRODUCT MANAGER', 50, 250);
    c.font = `26px ${FONT}`; c.fillText('2370318075@qq.com', 50, h - 50);
  }) }), 0, 0.046, 0, true));
}, [0, 62, 2.4]);

item('notes', '便利贴 · 个人优势', [-5.75, 5.6, -3.66], 0, g => {
  const y = acg('Paper001', [1, 1], { color: '#F2CF55', roughness: 0.95 }, ['NormalGL', 'Roughness']);
  [[0.1, 0, 0.0], [-0.06, 0.15, 0.02], [0.03, -0.05, 0.04]].forEach(([r, dx, z]) => {
    const n = mesh(box(1.15, 1.15, 0.015, 0.004), y, dx, 0, z);
    n.rotation.z = r;
    g.add(n);
  });
  const label = plane(1.15, 1.15, std('#fff', 0.9, 0, { transparent: true, map: canvasTex(512, 512, c => {
    c.fillStyle = 'rgba(28,27,25,.55)'; c.font = `32px ${FONT}`; c.fillText('NOTE', 48, 90);
    c.fillStyle = '#1C1B19'; c.font = `700 84px ${FONT}`; c.fillText('个人优势', 46, 260);
    c.font = `600 64px ${FONT}`; c.fillText('× 5', 48, 360);
  }) }), -0.05, -0.05, 0.05);
  label.rotation.z = 0.03;
  g.add(label, mesh(new THREE.SphereGeometry(0.07, 16, 12), std(ACCENT, 0.4), 0, 0.5, 0.07));
}, [0, 0, 2.6], [0, 0, 0.25]);

const camProp = group();
camProp.add(model('Camera_01', 11));
place(camProp, -4.3, 0.02, -0.4, 0.55);

const phoneTex = canvasTex(400, 820, (c, w, h) => {
  const g = c.createLinearGradient(0, 0, 0, h);
  g.addColorStop(0, '#2B1A12'); g.addColorStop(1, '#0D0B0A');
  c.fillStyle = g; c.fillRect(0, 0, w, h);
  const d = new Date();
  c.fillStyle = '#EDE6DA'; c.textAlign = 'center';
  c.font = `600 120px ${FONT}`; c.fillText(`${String(d.getHours()).padStart(2, '0')}:${String(d.getMinutes()).padStart(2, '0')}`, w / 2, 250);
  c.font = `30px ${FONT}`; c.fillStyle = '#9A9186'; c.fillText('联系我 · Contact', w / 2, 310);
  c.fillStyle = ACCENT; c.fillRect(70, h - 190, w - 140, 84);
  c.fillStyle = '#fff'; c.font = `600 30px ${FONT}`; c.fillText('发送邮件', w / 2, h - 136);
  c.textAlign = 'start';
});
item('phone', '手机 · 联系我', [-3.6, 0.04, 2.2], 0.28, g => {
  const ph = model('sf_phone', 10, { prep: src => {
    src.rotation.set(Math.PI / 2, Math.PI, 0, 'YXZ');
    src.traverse(o => { if (o.isMesh && o.material?.transparent) o.visible = false; });
  } });
  g.add(ph);
  ph.updateMatrixWorld(true);
  const top = new THREE.Box3().setFromObject(ph).max.y;
  const scr = plane(0.69, 1.5, screenMat(phoneTex), 0, top + 0.002, 0, true);
  scr.material.polygonOffset = true; scr.material.polygonOffsetFactor = -2;
  screens.push(scr.material);
  g.add(scr, plane(0.72, 1.54, glassMat(), 0, top + 0.004, 0, true));
}, [0, 62, 2.6]);

/* ---------- 装饰 ---------- */
const cylinderBetween = (a, b, r, mat) => {
  const dir = new THREE.Vector3().subVectors(b, a);
  const m = mesh(new THREE.CylinderGeometry(r, r, dir.length(), 16), mat);
  m.position.copy(a).addScaledVector(dir, 0.5);
  m.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), dir.normalize());
  return m;
};

/* 丁达尔光束：已移除——光片与桌面物件穿插产生硬边，效果不达预期 */

/* 显示器灯条 */
scene.add(cylinderBetween(new THREE.Vector3(-3.8, 7.25, -2.75), new THREE.Vector3(1.4, 7.25, -2.75), 0.12, metal));
const barStrip = new THREE.Mesh(new THREE.BoxGeometry(5.0, 0.03, 0.1), new THREE.MeshBasicMaterial({ color: new THREE.Color(0, 0, 0), toneMapped: false }));
barStrip.position.set(-1.2, 7.12, -2.68);
scene.add(barStrip);

/* 键盘 / 鼠标（Sketchfab 模型） */
place(model('sf_keyboard', 1.3), -0.9, 0.05, 1.3, 0.02);
place(model('sf_mouse', 10, { prep: src => src.traverse(o => { if (o.isMesh && o.material?.transparent) o.visible = false; }) }), 2.7, 0.05, 1.5, Math.PI / 2 - 0.1);

/* 托盘 + 充电宝 */
place(group(mesh(box(3.4, 0.12, 2.5, 0.05), M.aluDark, 0, 0.06, 0),
  mesh(box(1.3, 0.34, 0.7, 0.08), M.blackPlastic, 0.8, 0.29, -0.5),
  mesh(new THREE.CylinderGeometry(0.4, 0.4, 0.1, 48), M.whitePlastic, 0.9, 0.17, 0.6)), -6.3, 0, 1.6, 0.06);

/* 翻页钟 */
const clockTex = canvasTex(744, 300, (c, w, h) => {
  const d = new Date(), hh = String(d.getHours()).padStart(2, '0'), mm = String(d.getMinutes()).padStart(2, '0');
  c.fillStyle = '#0B0B0C'; c.fillRect(0, 0, w, h);
  [[hh, 14], [mm, 386]].forEach(([t, x]) => {
    const g = c.createLinearGradient(0, 0, 0, h);
    g.addColorStop(0, '#26262A'); g.addColorStop(0.5, '#1A1A1D'); g.addColorStop(0.5, '#141416'); g.addColorStop(1, '#202023');
    c.fillStyle = g; c.fillRect(x, 6, 344, h - 12);
    c.fillStyle = '#EDE6DA'; c.font = `600 230px ${FONT}`; c.textAlign = 'center'; c.textBaseline = 'middle'; c.fillText(t, x + 172, h / 2 + 10);
    c.fillStyle = '#060607'; c.fillRect(x, h / 2 - 2, 344, 4);
  });
  c.textAlign = 'start'; c.textBaseline = 'alphabetic';
});
{
  const face = plane(1.76, 0.71, screenMat(clockTex), 0, 0.605, 0.415);
  screens.push(face.material);
  place(group(model('sf_clock', 10), face), 2.5, 1.44, -2.0, -0.15);
}

/* Poly Haven 装饰模型 */
place(model('standing_picture_frame_01', 6.5), -5.0, 1.44, -2.0, -Math.PI / 2 + 0.35);
place(model('portable_cassette_player', 10), -6.0, 0.02, -0.3, 0.5);
place(model('stationery_supplies', 10), 3.8, 0.02, -2.3, 0.3);
place(model('potted_plant_04', 11), 7.1, 0, -2.7, 0.4);
place(model('potted_plant_04', 8), 6.2, 0, -3.0, 2.1);
place(model('potted_plant_02', 10), 11.6, -7.5, -1.8, 0.8);
place(model('modern_arm_chair_01', 10), -11.2, -7.5, 4.2, 1.1);

/* 蜡烛 */
let flameMat;
{
  const c = group(
    mesh(new THREE.CylinderGeometry(0.42, 0.42, 0.55, 32, 1, true), new THREE.MeshPhysicalMaterial({ color: '#B8865B', roughness: 0.15, transmission: 0.6, thickness: 0.2, transparent: true, opacity: 0.6, side: THREE.DoubleSide }), 0, 0.275, 0),
    mesh(new THREE.CylinderGeometry(0.38, 0.38, 0.38, 32), new THREE.MeshPhysicalMaterial({ color: '#F2E8D8', roughness: 0.6, sheen: 0.5, transmission: 0.15, thickness: 0.4 }), 0, 0.19, 0));
  const flame = new THREE.Mesh(new THREE.SphereGeometry(0.06, 12, 8), new THREE.MeshBasicMaterial({ color: new THREE.Color(0, 0, 0), toneMapped: false }));
  flame.scale.set(1, 2, 1);
  flame.position.y = 0.5;
  c.add(flame);
  place(c, 3.0, 0.02, -0.6);
  candle.position.set(3.0, 0.9, -0.6);
  flameMat = flame.material;
}

/* 马克杯 */
{
  const coffee = new THREE.Mesh(new THREE.CircleGeometry(0.34, 40), new THREE.MeshPhysicalMaterial({ color: '#2A1A10', roughness: 0.05, clearcoat: 1 }));
  coffee.rotation.x = -Math.PI / 2;
  coffee.position.y = 0.79;
  place(group(mesh(new THREE.CylinderGeometry(0.38, 0.35, 0.8, 64), M.ceramic, 0, 0.4, 0), coffee,
    mesh(new THREE.TorusGeometry(0.19, 0.05, 16, 32), M.ceramic, 0.42, 0.42, 0)), 4.3, 0.02, 0.7, 0.6);
}
/* 书 */
const book = (w, h, d, c, y, x) => group(mesh(box(w, h, d, 0.03), cloth(c), 0, 0, 0), mesh(box(w - 0.12, h - 0.06, d - 0.04, 0.01), M.paper, 0.07, 0, 0)).translateX(x).translateY(y);
place(group(book(2.2, 0.32, 1.6, '#CFC7B8', 0.16, 0), book(2.0, 0.28, 1.5, '#34404E', 0.46, 0.05), book(1.9, 0.24, 1.4, '#8E3E24', 0.72, -0.03)), 7.0, 0, -0.5, 0.2)
  .children.forEach((b, i) => { b.rotation.y = [0, 0.08, -0.06][i]; });



/* 朦胧雾气：几张巨大的柔边雾片，随时间缓慢漂移 */
const hazeTex = (() => {
  const c = document.createElement('canvas'); c.width = c.height = 256;
  const x = c.getContext('2d');
  const g = x.createRadialGradient(128, 128, 0, 128, 128, 128);
  g.addColorStop(0, 'rgba(255,255,255,.5)'); g.addColorStop(.6, 'rgba(255,255,255,.16)'); g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g; x.fillRect(0, 0, 256, 256);
  return new THREE.CanvasTexture(c);
})();
const hazeSprites = [];
[
  [-3.5, 6.0, -2.8, 18, '#8A6B4A', 0.05],
  [2.0, 3.2, -1.0, 16, '#5C6478', 0.06],
  [0.0, 7.2, -3.5, 21, '#6A7180', 0.05],
  [-1.5, 1.6, 1.8, 12, '#8A6B4A', 0.04],
  [5.5, 4.0, -2.0, 14, '#5C6478', 0.05],
].forEach(([x, y, z, s, c, o], i) => {
  const m = new THREE.SpriteMaterial({ map: hazeTex, color: c, transparent: true, opacity: 0, depthWrite: false });
  m.userData = { max: o, seed: i * 7.31 };
  const sp = new THREE.Sprite(m);
  sp.position.set(x, y, z); sp.scale.set(s, s, 1);
  sp.userData.base = new THREE.Vector3(x, y, z);
  hazeSprites.push(sp); scene.add(sp);
});

/* ---------- 动画工具 ---------- */
const easeOut = t => 1 - Math.pow(1 - t, 5);
const easeInOut = t => (t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2);
const tweens = new Set();
function tween(dur, ease, onUpdate, onDone) {
  const tw = { start: performance.now(), dur: reduce ? 1 : dur, ease, onUpdate, onDone };
  tweens.add(tw);
  return tw;
}
function runTweens(now) {
  for (const tw of tweens) {
    const t = Math.min(1, Math.max(0, (now - tw.start) / tw.dur));
    tw.onUpdate(tw.ease(t));
    if (t >= 1) { tweens.delete(tw); tw.onDone?.(); }
  }
}

/* ---------- 风格变体（?style=resident|cyber|metro|pixel） ---------- */
const styleId = new URLSearchParams(location.search).get('style') || 'metro';
const PIXEL = styleId === 'pixel';
const styleMul = { lamp: 1, screens: 1, beam: 1, dust: 1, haze: 0.6 };
function applyStyle(id) {
  const accent = c => document.documentElement.style.setProperty('--accent', c);
  const vig = t => { const e = document.querySelector('.vignette'); if (e) e.style.background = `radial-gradient(120% 90% at 50% 45%,transparent ${t}%,rgba(0,0,0,.65) 100%)`; };
  switch (id) {
    case 'resident':
      scene.background.set('#060A07'); scene.fog.color.set('#060A07');
      renderer.toneMappingExposure = 0.95; scene.environmentIntensity = 0.1;
      hemi.color.set('#8FA896'); hemi.groundColor.set('#141C14'); hemi.intensity = 0.2;
      windowLight.color.set('#6E8F7C'); windowLight.intensity = 0.35;
      rim.color.set('#4A6B52'); rim.intensity = 0.5;
      lamp.color.set('#C9E4BC'); styleMul.lamp = 0.85;
      bar.color.set('#A8C8A0'); wash.color.set('#7A9A72'); under.color.set('#4F7A56'); monGlow.color.set('#7FE08F');
      styleMul.screens = 0.8;
      bloom.strength = 0.12; accent('#7BE08A'); vig(42);
      break;
    case 'cyber':
      scene.background.set('#04060F'); scene.fog.color.set('#04060F');
      renderer.toneMappingExposure = 1.15; scene.environmentIntensity = 0.14;
      hemi.color.set('#2A3A6B'); hemi.groundColor.set('#0B0B18'); hemi.intensity = 0.3;
      windowLight.color.set('#2FD8FF'); windowLight.intensity = 0.8;
      rim.color.set('#8A5CFF'); rim.intensity = 1.3;
      lamp.color.set('#FF7AD9'); styleMul.lamp = 0.9;
      bar.color.set('#4FE3FF'); wash.color.set('#FF5AC8'); under.color.set('#3B6BFF'); monGlow.color.set('#38C8FF');
      candle.color.set('#FF3E8F');
      bloom.strength = 0.5; accent('#35E0FF'); vig(50);
      break;
    case 'metro':
      scene.background.set('#0A0806'); scene.fog.color.set('#0A0806');
      renderer.toneMappingExposure = 1.15; scene.environmentIntensity = 0.08;
      hemi.color.set('#7A6A55'); hemi.groundColor.set('#141210'); hemi.intensity = 0.25;
      windowLight.color.set('#4A5A78'); windowLight.intensity = 0.4;
      rim.color.set('#4A5568'); rim.intensity = 0.7;
      lamp.color.set('#FF9A3C'); styleMul.lamp = 0;   // 台灯不向桌面投射光照（灯头保留发光）
      bar.color.set('#FFC07A'); wash.color.set('#E0AA6A'); under.color.set('#B86A3A'); monGlow.color.set('#6F9FD8');
      candle.color.set('#FF7A2A');
      bloom.strength = 0.18; vig(42);
      scene.fog.near = 15; scene.fog.far = 40;
      gtao.enabled = false;   // GTAO 随机采样在暗部逐帧闪，metro 场景偏暗、AO 收益小，直接关掉
      styleMul.beam = 1.5; styleMul.dust = 0.7; styleMul.haze = 1;
      break;
    case 'pixel':
      renderer.toneMappingExposure = 1.45; scene.environmentIntensity = 0.4;
      bloom.strength = 0.35; accent('#FFCC33'); gtao.enabled = false; styleMul.haze = 0;
      const gr = document.querySelector('.grain'); if (gr) gr.style.display = 'none';
      break;
  }
}
applyStyle(styleId);

/* ---------- 开场：台灯闪亮，屏幕点亮，镜头推近 ---------- */
let ready = false;
const power = { screens: 0, intro: reduce ? 0 : 1 };
function setLamp(v) {
  lamp.intensity = LAMP_ON * v * styleMul.lamp;
  poolMat.opacity = 0.55 * v * Math.min(1, styleMul.lamp);
  if (lampBulbMat) { lampBulbMat.emissive = new THREE.Color('#FFC88A'); lampBulbMat.emissiveIntensity = 6 * v; }

  hazeSprites.forEach(sp => { sp.material.opacity = sp.material.userData.max * v * styleMul.haze; });
}
function setScreens(v) {
  power.screens = v;
  screens.forEach(m => m.color.setScalar(1.25 * v));
  bar.intensity = 55 * v * styleMul.screens;
  barStrip.material.color.setScalar(2.2 * v);
  monGlow.intensity = 9 * v * styleMul.screens;
  wash.intensity = 120 * v * styleMul.screens;
  under.intensity = 6 * v * styleMul.screens;
  flameMat.color.setRGB(3 * v, 1.4 * v, 0.4 * v);
}
loading?.classList.add('done');
if (reduce) { setLamp(1); setScreens(1); ready = true; }
else {
  setLamp(0); setScreens(0);
  [[250, 0.6], [330, 0], [450, 0.9], [520, 0.2], [600, 1]].forEach(([t, v]) => setTimeout(() => setLamp(v), t));
  setTimeout(() => tween(900, easeOut, setScreens), 800);
  tween(2400, easeOut, t => { power.intro = 1 - t; }, () => { ready = true; });
}

/* ---------- 交互：镜头推到物件跟前 ---------- */
const ray = new THREE.Raycaster();
const ndc = new THREE.Vector2(9, 9);
const pointer = { x: 0, y: 0 };
const tip = document.getElementById('tip');
if (isTouch) document.getElementById('hint').textContent = '点击桌上的物品';
const panel = document.getElementById('panel');
const scrim = document.getElementById('scrim');
const hint = document.getElementById('hint');
let hovered = null, focus = null, busy = false;
const meshes = Object.values(items).flatMap(i => { const a = []; i.group.traverse(o => o.isMesh && o.visible && a.push(o)); return a; });

let ndcMoved = true;
const swayNdc = { x: 0, y: 0 };
addEventListener('pointermove', e => {
  pointer.x = e.clientX; pointer.y = e.clientY;
  ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  if (e.pointerType !== 'touch') { swayNdc.x = ndc.x; swayNdc.y = ndc.y; }
  ndcMoved = true;
}, { passive: true });
document.addEventListener('pointerleave', () => { ndc.set(9, 9); ndcMoved = true; });
renderer.domElement.addEventListener('touchmove', e => e.preventDefault(), { passive: false });

/* 触屏点按容错：未精确命中时，找屏幕空间里最近的物件 */
const _pv = new THREE.Vector3();
function nearestItem(px, py) {
  let best = null, bestD = 72;
  for (const it of Object.values(items)) {
    const bb = new THREE.Box3();
    it.group.traverse(o => { if (o.isMesh && o.visible) bb.expandByObject(o); });
    if (bb.isEmpty()) continue;
    bb.getCenter(_pv).project(camera);
    if (_pv.z > 1) continue;
    const sx = (_pv.x * 0.5 + 0.5) * innerWidth, sy = (-_pv.y * 0.5 + 0.5) * innerHeight;
    const d = Math.hypot(sx - px, sy - py);
    if (d < bestD) { bestD = d; best = it.key; }
  }
  return best;
}
renderer.domElement.addEventListener('click', e => {
  pointer.x = e.clientX; pointer.y = e.clientY;
  ndc.set((e.clientX / innerWidth) * 2 - 1, -(e.clientY / innerHeight) * 2 + 1);
  if (hovered) open(hovered);
  else if (!focus && isTouch) { const k = nearestItem(e.clientX, e.clientY); if (k) open(k); }
  else if (focus) stepBack();
});
document.querySelectorAll('.dock button').forEach(b => b.addEventListener('click', () => (focus ? switchTo(b.dataset.key) : open(b.dataset.key))));
scrim.addEventListener('click', stepBack);
document.getElementById('close').addEventListener('click', stepBack);
addEventListener('keydown', e => { if (e.key === 'Escape') stepBack(); });

const narrow = () => innerWidth < 760 || innerHeight < 520;
function shotFor(it) {
  const g = it.group;
  g.updateMatrixWorld(true);
  const bb = new THREE.Box3();
  g.traverse(o => { if (o.isMesh && o.visible) bb.expandByObject(o); });
  const center = bb.getCenter(new THREE.Vector3());
  const radius = bb.getBoundingSphere(new THREE.Sphere()).radius;
  const [az, el, k] = it.view;
  const a = THREE.MathUtils.degToRad(az), e = THREE.MathUtils.degToRad(el);
  const dir = new THREE.Vector3(Math.sin(a) * Math.cos(e), Math.sin(e), Math.cos(a) * Math.cos(e));
  const vFov = THREE.MathUtils.degToRad(camera.fov) / 2;
  const fit = Math.min(vFov, Math.atan(Math.tan(vFov) * camera.aspect * (narrow() ? 1 : 0.5)));
  const dist = Math.max(radius / Math.sin(fit) * k * 0.55, 1.6);
  const pos = center.clone().addScaledVector(dir, dist);
  const right = new THREE.Vector3().crossVectors(new THREE.Vector3(0, 1, 0), dir).normalize().negate();
  const look = center.clone();
  if (narrow()) look.y -= dist * 0.28;
  else look.addScaledVector(right, -dist * Math.tan(vFov) * camera.aspect * 0.5);
  return { pos, look };
}

function flyCamera(to, dur, ease, done) {
  const from = { pos: view.pos.clone(), look: view.look.clone() };
  tween(dur, ease, t => {
    view.pos.lerpVectors(from.pos, to.pos, t);
    view.look.lerpVectors(from.look, to.look, t);
  }, done);
}

function open(key) {
  if (busy || focus || !ready) return;
  busy = true; focus = key; hovered = null;
  Object.values(items).forEach(i => { i.lift = 0; i.group.position.copy(i.home); });
  tip.classList.remove('on');
  hint.style.opacity = 0;
  document.body.style.cursor = '';
  flyCamera(shotFor(items[key]), 1300, easeInOut, () => { busy = false; });
  setTimeout(() => showPanel(key), reduce ? 0 : 750);
}

function switchTo(key) {
  if (busy || key === focus) return;
  busy = true;
  hidePanel(false);
  focus = key;
  flyCamera(shotFor(items[key]), 1100, easeInOut, () => { busy = false; });
  setTimeout(() => showPanel(key), reduce ? 0 : 650);
}

function close() {
  if (!focus || busy) return;
  busy = true;
  hidePanel(true);
  hint.style.opacity = '';
  flyCamera({ pos: HOME_CAM.clone().multiplyScalar(camScale), look: HOME_LOOK.clone() }, 1100, easeInOut, () => { busy = false; focus = null; });
}

function detailBack() {
  const d = document.getElementById('pdetail');
  if (!d || !d.classList.contains('on')) return false;
  d.classList.remove('on');
  d.innerHTML = '';
  const t = document.querySelector('.p-laptop .tiles');
  if (t) t.style.display = '';
  const a = panel.querySelector('article.on');
  if (a) a.scrollTop = 0;
  return true;
}
function stepBack() {
  if (busy) return;
  if (focus === 'monitor' && detailBack()) return;
  close();
}

function showPanel(key) {
  scrim.classList.add('on');
  panel.classList.add('open');
  panel.setAttribute('aria-hidden', 'false');
  document.querySelectorAll('.dock button').forEach(b => b.classList.toggle('on', b.dataset.key === key));
  const a = panel.querySelector(`[data-panel="${key}"]`);
  if (key === 'monitor') detailBack();
  a.classList.add('on');
  requestAnimationFrame(() => requestAnimationFrame(() => a.classList.add('in')));
  document.getElementById('close').focus({ preventScroll: true });
}
function hidePanel(all) {
  if (all) { scrim.classList.remove('on'); panel.classList.remove('open'); panel.setAttribute('aria-hidden', 'true'); }
  document.querySelectorAll('.dock button').forEach(b => b.classList.remove('on'));
  panel.querySelectorAll('article.on').forEach(a => {
    a.classList.remove('in');
    setTimeout(() => a.classList.remove('on'), reduce ? 0 : 280);
  });
}

/* 显示器面板：项目卡 → 核心流程截图 */
const PROJ = {
  sr: {
    title: 'Stream Ready', tag: '浏览器端 AI 音频母带工作台 · stream-ready.com',
    flow: '上传 → 自动母带（冻结 V1）→ 源诊断 → 频段图谱/EQ 精修 → 平台响度预览 → 发行打包导出',
    shots: [
      ['shots/products/sr-1-studio.png', '① 上传完成：自动母带冻结 V1，波形 + 源诊断卡 + Chat 入口 + 平台响度预览'],
      ['shots/products/sr-3-atlas.png', '② 对话式频段图谱：15 条白名单规则，每条标明正向/反向/风险——自然语言精修的入口'],
      ['shots/products/sr-2-eq.png', '③ 手动精修：Master EQ + 宏旋钮（Width/Color/Air/Calm），下方是冻结的自动母带处理链'],
      ['shots/products/sr-4-packaging.png', '④ 发行打包：响度遥测 + 封面 + 格式感知元数据，WAV/MP3/FLAC 导出'],
    ],
  },
  pv: {
    title: '先声 PreVoice', tag: '多 Agent 合成调研平台 · 「真人之前，先问一遍」',
    flow: '一句话发起 → 分层人群 → 受访者作答/主持人追问 → 可信度报告 → 真人验证清单',
    shots: [
      ['shots/products/pv-0-workbench.png', '① 工作台：对话发起研究，右侧多 Agent 团队（主管/主持/分析/质检/受访者）+ 事件流 + 质检偏差告警'],
      ['shots/products/pv-1-groups.png', '② 人群库：按中国分层画像生成受访者组（如银发人群 12 人、求职人群小样组）'],
      ['shots/products/pv-2-study.png', '③ 调研执行：12 名受访者独立作答，每条可追问，全程事件可审计'],
      ['shots/products/pv-3-report.png', '④ 报告：关键发现逐条标注可信度（未校准/偏差/已校准），附真人复核建议'],
      ['shots/products/pv-4-cal.png', '⑤ 校准数据：上传真实问卷 CSV 回灌评分，「真实数据只进评分不进生成」'],
    ],
  },
  soc: {
    title: 'Server Ops Copilot', tag: 'AI 运维副驾 · 私有化、可审计、能降级',
    flow: '告警接入 → 事件归并 → AI 诊断 → 分级审批 → 白名单执行 → 复采评估 → 知识沉淀',
    shots: [
      ['shots/products/soc-0-mon.png', '① 监控接入：Agent mTLS 遥测 + Prometheus 抓取双通道，双向 TLS 加密'],
      ['shots/products/soc-1-overview.png', '② 总览：发现→诊断→决策→修复→沉淀五环一屏可见'],
      ['shots/products/soc-3-detail.png', '③ 诊断：告警聚合成事件，AI 给出根因与处置建议'],
      ['shots/products/soc-6-approval.png', '④ 决策：根因假设 + 置信度 + 动作清单，高风险需人工授权'],
      ['shots/products/soc-5-audit.png', '⑤ 修复留痕：每次建议/授权/命令/验证全链路审计，只增不改'],
      ['shots/products/soc-7-kb.png', '⑥ 沉淀：复盘结论蒸馏回知识库，供下次诊断引用——越用越准'],
      ['shots/products/soc-6-chat.png', '⑦ 对话排障台：「先回答有没有问题，再决定要不要动手」'],
    ],
  },
  pk: {
    title: 'Pocket Agent', tag: 'Android 无障碍服务驱动的手机智能体 · J.A.R.V.I.S.',
    flow: '「贾维斯」唤醒/文本下达 → 任务规划 → 无障碍逐步执行 → 配方固化沉淀 → 偏好记忆注入',
    shots: [
      ['shots/products/pk-1-hud.png', '① 待机 HUD：A11Y 无障碍在线、语音唤醒待命、Token 计量、任务输入 + 执行'],
      ['shots/products/pk-2-amap.png', '② 真实执行：下达「打开高德地图搜索首都机场」后，真机被驱动到高德并呈现结果'],
      ['shots/products/pk-4-done.png', '③ 任务完成：MISSION COMPLETE + 执行日志审计 + 「配方已固化 3 步流程，相似任务免模型回放」'],
      ['shots/products/pk-3-config.png', '④ SYSTEM CONFIG：DeepSeek 接入、贾维斯唤醒+克隆音色播报、偏好记忆、配方管理'],
    ],
  },
};
{
  const detail = document.getElementById('pdetail');
  const tiles = document.querySelector('.p-laptop .tiles');
  document.querySelectorAll('.tile[data-proj]').forEach(t => t.addEventListener('click', () => {
    const p = PROJ[t.dataset.proj];
    detail.innerHTML = `<button class="back">← 返回项目列表</button><h3>${p.title}</h3><p class="tag">${p.tag}</p><p class="flow">${p.flow}</p>` +
      (p.shots.length ? `<div class="pshots">${p.shots.map(([s, c]) => s.endsWith('.mp4')
        ? `<figure><video src="${s}" controls playsinline preload="metadata"></video><figcaption>${c}</figcaption></figure>`
        : `<figure><img src="${s}" alt="${c}"><figcaption>${c}</figcaption></figure>`).join('')}</div>`
        : `<p class="coming">${p.coming}</p>`);
    tiles.style.display = 'none';
    detail.classList.add('on');
    detail.querySelector('.back').addEventListener('click', detailBack);
    panel.querySelector('article.on').scrollTop = 0;
  }));
}

{
  const wave = document.querySelector('.p-head .wave');
  for (let i = 0; i < 56; i++) {
    const b = document.createElement('i');
    b.style.setProperty('--h', (0.25 + Math.abs(Math.sin(i * 0.5) * Math.cos(i * 0.17)) * 0.75).toFixed(2));
    b.style.setProperty('--d', (i * 0.06).toFixed(2));
    wave.appendChild(b);
  }
}
setInterval(() => { clockTex.userData.redraw(); phoneTex.userData.redraw(); }, 20000);

/* ---------- 渲染循环 ---------- */
let pxCap = Infinity;   // 清晰度拉满：上限解锁，fps 自适应降级时才接管
function resize() {
  const a = innerWidth / innerHeight;
  camScale = a < 0.8 ? 1.9 : a < 1.3 ? 1.35 : 1;
  scene.fog.near = 26 * camScale;   // 镜头后拉时雾要跟着远，不然竖屏整个场景泡在雾里
  scene.fog.far = 52 * camScale;
  const pr = PIXEL ? 0.16 : Math.min(devicePixelRatio, Math.sqrt(pxCap / (innerWidth * innerHeight)));
  if (PIXEL) renderer.domElement.style.imageRendering = 'pixelated';
  renderer.setPixelRatio(pr);
  renderer.setSize(innerWidth, innerHeight, false);
  composer.setPixelRatio(pr);
  composer.setSize(innerWidth, innerHeight);
  gtao.setSize(innerWidth * pr * (isTouch ? 0.5 : 0.75), innerHeight * pr * (isTouch ? 0.5 : 0.75));
  bloom.setSize(innerWidth * pr * 0.5, innerHeight * pr * 0.5);
  camera.aspect = a;
  camera.updateProjectionMatrix();
  if (!focus) view.pos.copy(HOME_CAM).multiplyScalar(camScale);
}
addEventListener('resize', resize);
addEventListener('orientationchange', () => setTimeout(resize, 250));
resize();

const camPos = view.pos.clone().multiplyScalar(1.3).add(new THREE.Vector3(0, 1.5, 0));
const camLook = view.look.clone();
const sway = new THREE.Vector3();
let fCount = 0;
let perfT = 0, perfN = 0, perfStage = 0;
window.__fps = 0; window.__dc = 0;
const fpsEl = location.search.includes('fps') ? Object.assign(document.body.appendChild(document.createElement('div')), {
  style: 'position:fixed;top:8px;left:50%;transform:translateX(-50%);z-index:9;color:#7f7;font:12px ui-monospace,monospace;text-shadow:0 1px 2px #000'
}) : null;
let fpsAcc = 0, fpsTime = 0;
function frame(now) {
  fCount++;
  runTweens(now);
  const t = now / 1000;

  const mx = swayNdc.x > 2 ? 0 : swayNdc.x, my = swayNdc.y > 2 ? 0 : swayNdc.y;
  const k = focus ? 0.25 : 1;
  sway.set(mx * 1.2 * k, my * 0.5 * k, 0);
  const target = view.pos.clone().add(sway);
  if (!focus) target.lerp(HOME_CAM.clone().multiplyScalar(camScale * 1.3).add(new THREE.Vector3(0, 1.5, 0)), power.intro);
  camPos.lerp(target, reduce ? 1 : 0.08);
  camLook.lerp(view.look, reduce ? 1 : 0.12);
  camera.position.copy(camPos);
  camera.lookAt(camLook);

  if (!focus && ready && !busy && (ndcMoved || (fCount & 3) === 0)) {
    ray.setFromCamera(ndc, camera);
    const key = ray.intersectObjects(meshes, false)[0]?.object.userData.key ?? null;
    if (key !== hovered) {
      hovered = key;
      document.body.style.cursor = key ? 'pointer' : '';
      tip.classList.toggle('on', !!key);
      if (key) tip.textContent = items[key].label;
    }
    if (hovered) { tip.style.left = pointer.x + 'px'; tip.style.top = pointer.y + 'px'; }
    ndcMoved = false;
  }
  let animating = !ready || busy;
  if (ready) for (const it of Object.values(items)) {
    const d = (it.key === hovered && !focus ? 1 : 0) - it.lift;
    it.lift += d * (reduce ? 1 : 0.18);
    if (Math.abs(d) > 0.002) animating = true;
    it.group.position.copy(it.home).addScaledVector(it.liftDir, it.lift);
  }
  renderer.shadowMap.needsUpdate = animating;

  if (ready && !reduce && perfStage < 3 && document.visibilityState === 'visible' && document.hasFocus()) {
    perfN++;
    if (!perfT) perfT = now;
    else if (now - perfT > 2000) {
      const fps = perfN / ((now - perfT) / 1000);
      perfT = now; perfN = 0;
      if (fps < 45) {
        perfStage++;
        if (perfStage === 1) gtao.enabled = false;
        else if (perfStage === 2) { pxCap = 2.4e6; bloom.strength = 0.12; resize(); }
        else { pxCap = 1.5e6; resize(); }
      } else perfStage = 3;
    }
  }

  if (!reduce) {
    hazeSprites.forEach(sp => {
      const s = sp.material.userData.seed;
      sp.position.x = sp.userData.base.x + Math.sin(t * 0.05 + s) * 0.7;
      sp.position.y = sp.userData.base.y + Math.cos(t * 0.037 + s * 1.7) * 0.45;
    });
    candle.intensity = 4.5 * (0.85 + Math.sin(t * 13) * 0.06 + Math.sin(t * 7.3 + 1) * 0.06 + Math.random() * 0.04) * power.screens;
  } else candle.intensity = 4.5;

  composer.render();
  fpsAcc++;
  if (now - fpsTime > 1000) {
    window.__fps = fpsAcc * 1000 / (now - fpsTime); window.__dc = renderer.info.render.calls;
    if (fpsEl) fpsEl.textContent = `${window.__fps.toFixed(0)} fps · ${window.__dc} dc · ${perfStage}`;
    fpsAcc = 0; fpsTime = now;
  }
  requestAnimationFrame(frame);
}
requestAnimationFrame(frame);
