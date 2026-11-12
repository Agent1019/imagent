"use client";

import { useEffect, useRef } from "react";
import { LAND_MASK } from "./heroGlobeLand";

type Vec3 = [number, number, number];
type Hub = { name: string; v: Vec3; phase: number; sx: number; sy: number; z: number };
type Arc = { pts: Float32Array; from: number; to: number; born: number; dur: number; violet: boolean; landed: boolean };
type Ping = { v: Vec3; born: number; big: boolean };
type Wave = { o: Vec3; u: Vec3; w: Vec3; born: number; front: number; band: number; amp: number };
type Star = { x: number; y: number; r: number; a: number; phase: number; speed: number };
type Drag = { x: number; t: number; moved: number; v: number; id: number };

const TAU = Math.PI * 2;
const RAD = Math.PI / 180;
const AUTO_SPIN = 0.045;
const TILT = -0.2;
const ARC_STEPS = 56;
const DOT_ALPHA_MAX = 0.46;
const BUCKETS = 6;
const INTERACTIVE = "a, button, input, textarea, select, summary, [role='button'], [role='link'], [contenteditable]";

const CITIES: [string, number, number][] = [
  ["San Francisco", 37.77, -122.42], ["New York", 40.71, -74.01], ["Mexico City", 19.43, -99.13],
  ["São Paulo", -23.55, -46.63], ["London", 51.51, -0.13], ["Paris", 48.86, 2.35], ["Madrid", 40.42, -3.7],
  ["Frankfurt", 50.11, 8.68], ["Milan", 45.46, 9.19], ["Dubai", 25.2, 55.27], ["Mumbai", 19.08, 72.88],
  ["Singapore", 1.35, 103.82], ["Shanghai", 31.23, 121.47], ["Seoul", 37.57, 126.98], ["Tokyo", 35.68, 139.69],
  ["Sydney", -33.87, 151.21],
];

function unit(lat: number, lon: number): Vec3 {
  const p = lat * RAD;
  const l = lon * RAD;
  return [Math.cos(p) * Math.sin(l), Math.sin(p), Math.cos(p) * Math.cos(l)];
}

function angle(a: Vec3, b: Vec3) {
  return Math.acos(Math.max(-1, Math.min(1, a[0] * b[0] + a[1] * b[1] + a[2] * b[2])));
}

/** Decorative only: interactions are observed on the hero, never intercepted. */
export default function HeroGlobeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const hero = canvas?.closest("section");
    const ctx = canvas?.getContext("2d");
    if (!canvas || !hero || !ctx) return;

    const still = document.createElement("canvas");
    const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

    /* Deterministic so the composition is identical on every load. */
    let seed = 20261113;
    function rand() {
      seed |= 0; seed = (seed + 0x6d2b79f5) | 0;
      let t = Math.imul(seed ^ (seed >>> 15), 1 | seed);
      t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    }

    const mask = Uint8Array.from(atob(LAND_MASK), (c) => c.charCodeAt(0));
    function isLand(lat: number, lon: number) {
      const col = Math.floor((((lon + 180) % 360) + 360) % 360);
      const row = Math.min(179, Math.max(0, Math.floor(90 - lat)));
      const i = row * 360 + col;
      return (mask[i >> 3] >> (7 - (i & 7))) & 1;
    }

    const hubs: Hub[] = CITIES.map(([name, lat, lon]) => ({ name, v: unit(lat, lon), phase: rand(), sx: 0, sy: 0, z: -1 }));

    const gridLines: Float32Array[] = [];
    for (let lon = 0; lon < 360; lon += 30) {
      const line: number[] = [];
      for (let lat = -80; lat <= 80; lat += 4) line.push(...unit(lat, lon));
      gridLines.push(new Float32Array(line));
    }
    for (let lat = -60; lat <= 60; lat += 20) {
      const line: number[] = [];
      for (let lon = 0; lon <= 360; lon += 4) line.push(...unit(lat, lon));
      gridLines.push(new Float32Array(line));
    }

    let W = 0, H = 0, dpr = 1, cx = 0, cy = 0, R = 1;
    let dots = new Float32Array(0), dotCount = 0, dotStep = 0;
    let bucketXY: Float32Array[] = [];
    const bucketN = new Int32Array(BUCKETS);
    let lit = new Float32Array(0), litN = 0;
    let stars: Star[] = [];

    let rotY = -112 * RAD;
    let spin = AUTO_SPIN;
    let parX = 0, parY = 0, pointerGlow = 0;
    const pointer = { x: 0, y: 0, active: false };
    let drag: Drag | null = null;
    let suppressClick = false;

    let arcs: Arc[] = [], pings: Ping[] = [], waves: Wave[] = [];
    let nextArcAt = 0;
    const arcX = new Float32Array(ARC_STEPS + 1);
    const arcY = new Float32Array(ARC_STEPS + 1);
    const arcV = new Uint8Array(ARC_STEPS + 1);

    let running = false, visible = true, raf = 0, last = 0, clock = 0;
    let ca = 1, sa = 0, ct = 1, st = 0;

    function buildDots(step: number) {
      const out: number[] = [];
      let row = 0;
      for (let lat = 84; lat >= -58; lat -= step, row++) {
        const n = Math.max(1, Math.round((360 * Math.cos(lat * RAD)) / step));
        const offset = row % 2 ? 0.5 : 0;
        for (let k = 0; k < n; k++) {
          const lon = -180 + ((k + offset) * 360) / n;
          if (!isLand(lat, lon)) continue;
          const v = unit(lat, lon);
          out.push(v[0], v[1], v[2], rand());
        }
      }
      dots = new Float32Array(out);
      dotCount = out.length / 4;
      bucketXY = Array.from({ length: BUCKETS }, () => new Float32Array(dotCount * 2));
      lit = new Float32Array(dotCount * 4);
      dotStep = step;
    }

    function layout() {
      const rect = hero!.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      W = rect.width; H = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas!.width = Math.round(W * dpr);
      canvas!.height = Math.round(H * dpr);
      /* A horizon globe: wide enough to read as a planet, capped so it never swallows the hero. */
      R = Math.min(Math.max(W * 0.46, H * 0.74), H * 1.25);
      cx = W / 2;
      /* The limb clears the headline in every language, so the rim never cuts through the title. */
      cy = Math.min(96, Math.max(72, H * 0.13)) + R;
      const step = W < 768 ? 1.7 : 1.15;
      if (step !== dotStep) buildDots(step);

      seed = 7;
      stars = [];
      const starCount = Math.round(Math.min(110, (W * H) / 9000));
      for (let i = 0; i < starCount * 3 && stars.length < starCount; i++) {
        const x = rand() * W, y = rand() * H * 0.7;
        if (Math.hypot(x - cx, y - cy) < R * 1.03) continue;
        stars.push({ x, y, r: 0.4 + rand() * 0.8, a: 0.12 + rand() * 0.4, phase: rand() * TAU, speed: 0.4 + rand() * 1.1 });
      }
      paintStill();
      if (!running) render(clock);
    }

    /* Sphere body and atmosphere never change between frames, so they are painted once per resize. */
    function paintStill() {
      still.width = canvas!.width;
      still.height = canvas!.height;
      const g = still.getContext("2d");
      if (!g) return;
      g.setTransform(dpr, 0, 0, dpr, 0, 0);
      g.clearRect(0, 0, W, H);

      let grad = g.createRadialGradient(cx, cy, R * 0.94, cx, cy, R * 1.22);
      grad.addColorStop(0, "rgba(43,127,255,0)");
      grad.addColorStop(0.2, "rgba(72,148,255,0.23)");
      grad.addColorStop(0.42, "rgba(43,127,255,0.09)");
      grad.addColorStop(1, "rgba(43,127,255,0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, W, H);

      grad = g.createRadialGradient(cx, cy - R, 0, cx, cy - R, R * 0.62);
      grad.addColorStop(0, "rgba(96,165,255,0.14)");
      grad.addColorStop(1, "rgba(96,165,255,0)");
      g.fillStyle = grad;
      g.fillRect(0, 0, W, H);

      g.beginPath();
      g.arc(cx, cy, R, 0, TAU);
      grad = g.createRadialGradient(cx, cy + R * 0.1, R * 0.5, cx, cy, R);
      grad.addColorStop(0, "rgba(6,13,28,0.96)");
      grad.addColorStop(0.62, "rgba(7,17,38,0.95)");
      grad.addColorStop(0.9, "rgba(9,27,60,0.94)");
      grad.addColorStop(1, "rgba(26,70,150,0.92)");
      g.fillStyle = grad;
      g.fill();

      const rim = g.createLinearGradient(0, cy - R, 0, cy - R * 0.25);
      rim.addColorStop(0, "rgba(176,214,255,0.58)");
      rim.addColorStop(0.35, "rgba(140,190,255,0.22)");
      rim.addColorStop(1, "rgba(140,190,255,0.05)");
      g.strokeStyle = rim;
      g.lineWidth = 1.25;
      g.stroke();
    }

    function setRotation() {
      const a = rotY + parX;
      const t = TILT + parY;
      ca = Math.cos(a); sa = Math.sin(a); ct = Math.cos(t); st = Math.sin(t);
    }

    /* Globe space to screen. Returns depth: positive faces the viewer. */
    const P = { x: 0, y: 0, z: 0, nx: 0, ny: 0 };
    function project(x: number, y: number, z: number) {
      const x1 = x * ca + z * sa;
      const z1 = -x * sa + z * ca;
      const y2 = y * ct - z1 * st;
      P.nx = x1; P.ny = y2;
      P.x = cx + R * x1;
      P.y = cy - R * y2;
      P.z = y * st + z1 * ct;
      return P.z;
    }

    function unproject(px: number, py: number): Vec3 {
      let X = (px - cx) / R;
      let Y = (cy - py) / R;
      const d = Math.hypot(X, Y);
      if (d > 0.998) { X *= 0.998 / d; Y *= 0.998 / d; }
      const Z = Math.sqrt(Math.max(0, 1 - X * X - Y * Y));
      const y = Y * ct + Z * st;
      const z1 = -Y * st + Z * ct;
      return [X * ca - z1 * sa, y, X * sa + z1 * ca];
    }

    function spawnArc(from: number, to: number, now: number) {
      const A = hubs[from].v, B = hubs[to].v;
      const omega = angle(A, B);
      if (omega < 0.05) return;
      const lift = 0.05 + 0.2 * (omega / Math.PI);
      const pts = new Float32Array((ARC_STEPS + 1) * 3);
      const so = Math.sin(omega);
      for (let i = 0; i <= ARC_STEPS; i++) {
        const t = i / ARC_STEPS;
        const wa = Math.sin((1 - t) * omega) / so;
        const wb = Math.sin(t * omega) / so;
        const h = 1 + lift * Math.sin(Math.PI * t);
        pts[i * 3] = (A[0] * wa + B[0] * wb) * h;
        pts[i * 3 + 1] = (A[1] * wa + B[1] * wb) * h;
        pts[i * 3 + 2] = (A[2] * wa + B[2] * wb) * h;
      }
      arcs.push({ pts, from, to, born: now, dur: 1.3 + omega * 0.85, violet: rand() < 0.24, landed: false });
      pings.push({ v: A, born: now, big: false });
    }

    function spawnRandomArc(now: number) {
      const onScreen: number[] = [];
      for (let i = 0; i < hubs.length; i++) {
        const h = hubs[i];
        if (h.z > 0.12 && h.sx > 0 && h.sx < W && h.sy > 0 && h.sy < H * 0.92) onScreen.push(i);
      }
      const from = onScreen.length ? onScreen[Math.floor(rand() * onScreen.length)] : Math.floor(rand() * hubs.length);
      for (let tries = 0; tries < 8; tries++) {
        const to = Math.floor(rand() * hubs.length);
        if (to === from) continue;
        const omega = angle(hubs[from].v, hubs[to].v);
        if (omega < 0.3 || omega > 2.6) continue;
        if (arcs.some((arc) => (arc.from === from && arc.to === to) || (arc.from === to && arc.to === from))) continue;
        spawnArc(from, to, now);
        return;
      }
    }

    function update(dt: number, now: number) {
      const ease = (rate: number) => 1 - Math.exp(-dt * rate);
      if (!drag) {
        spin += (AUTO_SPIN - spin) * ease(1.3);
        rotY += spin * dt;
      }
      const tx = pointer.active ? (pointer.x / W - 0.5) * 0.24 : 0;
      const ty = pointer.active ? (pointer.y / H - 0.5) * 0.09 : 0;
      parX += (tx - parX) * ease(3);
      parY += (ty - parY) * ease(3);
      pointerGlow += ((pointer.active ? 1 : 0) - pointerGlow) * ease(7);

      const maxArcs = W < 768 ? 3 : 7;
      if (now >= nextArcAt && arcs.length < maxArcs) {
        spawnRandomArc(now);
        nextArcAt = now + 0.45 + rand() * 0.7;
      }
      arcs = arcs.filter((arc) => now - arc.born < arc.dur + 1.5);
      pings = pings.filter((ping) => now - ping.born < 1.1);
      waves = waves.filter((wave) => now - wave.born < 2.6);
    }

    function drawGraticule() {
      ctx!.lineWidth = 1;
      ctx!.strokeStyle = "rgba(120,170,235,0.055)";
      ctx!.beginPath();
      for (const line of gridLines) {
        let pen = false;
        for (let i = 0; i < line.length; i += 3) {
          if (project(line[i], line[i + 1], line[i + 2]) > 0.02 && P.y < H + 8) {
            if (pen) ctx!.lineTo(P.x, P.y); else ctx!.moveTo(P.x, P.y);
            pen = true;
          } else pen = false;
        }
      }
      ctx!.stroke();
    }

    function drawDots(now: number) {
      const c = ctx!;
      bucketN.fill(0);
      litN = 0;
      const base = Math.min(1.35, Math.max(0.85, R / 560));
      const reach2 = 130 * 130;
      const px = pointer.x, py = pointer.y;
      const waveCount = waves.length;
      const animate = running;

      for (let i = 0; i < dotCount; i++) {
        const o = i * 4;
        const x = dots[o], y = dots[o + 1], z = dots[o + 2];
        const x1 = x * ca + z * sa;
        const z1 = -x * sa + z * ca;
        const depth = y * st + z1 * ct;
        if (depth <= 0.02) continue;
        const sx = cx + R * x1;
        if (sx < -4 || sx > W + 4) continue;
        const sy = cy - R * (y * ct - z1 * st);
        if (sy < -4 || sy > H + 4) continue;

        const edge = depth < 0.2 ? depth / 0.2 : 1;
        const alpha = (0.14 + 0.32 * depth) * edge;
        let glow = 0;

        if (animate) {
          const tw = Math.sin(now * 0.8 + dots[o + 3] * TAU);
          if (tw > 0.988) glow = ((tw - 0.988) / 0.012) * 0.55;
        }
        if (pointerGlow > 0.01) {
          const dx = sx - px, dy = sy - py;
          const d2 = dx * dx + dy * dy;
          if (d2 < reach2) {
            const k = 1 - d2 / reach2;
            glow = Math.max(glow, pointerGlow * k * k);
          }
        }
        for (let w = 0; w < waveCount; w++) {
          const wave = waves[w];
          const dot = x * wave.o[0] + y * wave.o[1] + z * wave.o[2];
          const diff = Math.acos(dot > 1 ? 1 : dot < -1 ? -1 : dot) - wave.front;
          if (diff > -wave.band * 2.6 && diff < wave.band * 2.6) {
            const k = diff / wave.band;
            glow = Math.max(glow, wave.amp * Math.exp(-k * k));
          }
        }

        if (glow > 0.03) {
          const q = litN * 4;
          lit[q] = sx; lit[q + 1] = sy; lit[q + 2] = Math.min(1, alpha + glow * 0.62); lit[q + 3] = base * (0.9 + glow * 0.95);
          litN++;
        } else {
          const b = Math.min(BUCKETS - 1, Math.floor((alpha / DOT_ALPHA_MAX) * BUCKETS));
          const n = bucketN[b]++;
          bucketXY[b][n * 2] = sx;
          bucketXY[b][n * 2 + 1] = sy;
        }
      }

      for (let b = 0; b < BUCKETS; b++) {
        const n = bucketN[b];
        if (!n) continue;
        const level = (b + 0.5) / BUCKETS;
        const r = base * (0.72 + 0.34 * level);
        const xy = bucketXY[b];
        c.fillStyle = `rgba(134,184,236,${(level * DOT_ALPHA_MAX).toFixed(3)})`;
        c.beginPath();
        for (let i = 0; i < n; i++) {
          const x = xy[i * 2], y = xy[i * 2 + 1];
          c.moveTo(x + r, y);
          c.arc(x, y, r, 0, TAU);
        }
        c.fill();
      }

      c.fillStyle = "rgb(214,235,255)";
      for (let i = 0; i < litN; i++) {
        const q = i * 4;
        c.globalAlpha = lit[q + 2];
        c.beginPath();
        c.arc(lit[q], lit[q + 1], lit[q + 3], 0, TAU);
        c.fill();
      }
      c.globalAlpha = 1;
    }

    /* The wave front itself, so a click over open ocean still reads. */
    function drawWaves() {
      const c = ctx!;
      c.lineWidth = 1.2;
      for (const wave of waves) {
        if (wave.amp <= 0.02) continue;
        const { o, u, w } = wave;
        const sinF = Math.sin(wave.front), cosF = Math.cos(wave.front);
        c.strokeStyle = `rgba(170,212,255,${(wave.amp * 0.5).toFixed(3)})`;
        c.beginPath();
        let pen = false;
        for (let i = 0; i <= 90; i++) {
          const th = (i / 90) * TAU;
          const k = Math.cos(th) * sinF, s = Math.sin(th) * sinF;
          const depth = project(o[0] * cosF + u[0] * k + w[0] * s, o[1] * cosF + u[1] * k + w[1] * s, o[2] * cosF + u[2] * k + w[2] * s);
          if (depth > 0.02) {
            if (pen) c.lineTo(P.x, P.y); else c.moveTo(P.x, P.y);
            pen = true;
          } else pen = false;
        }
        c.stroke();
      }
    }

    function drawArcs(now: number) {
      const c = ctx!;
      c.lineCap = "round";
      for (const arc of arcs) {
        const age = now - arc.born;
        const head = Math.min(1, age / arc.dur);
        const fade = age > arc.dur ? Math.max(0, 1 - (age - arc.dur) / 1.5) : 1;
        if (head >= 1 && !arc.landed) {
          arc.landed = true;
          pings.push({ v: hubs[arc.to].v, born: now, big: true });
        }
        const rgb = arc.violet ? "158,150,255" : "120,178,255";

        for (let i = 0; i <= ARC_STEPS; i++) {
          const o = i * 3;
          const depth = project(arc.pts[o], arc.pts[o + 1], arc.pts[o + 2]);
          arcX[i] = P.x; arcY[i] = P.y;
          /* Lifted points stay visible past the limb, where they clear the sphere's silhouette. */
          arcV[i] = depth > 0 || P.nx * P.nx + P.ny * P.ny > 1.0 ? 1 : 0;
        }

        const headPos = head * ARC_STEPS;
        const headIdx = Math.floor(headPos);
        c.lineWidth = 1;
        c.strokeStyle = `rgba(${rgb},${(0.26 * fade).toFixed(3)})`;
        c.beginPath();
        let pen = false;
        for (let i = 0; i <= headIdx; i++) {
          if (arcV[i]) {
            if (pen) c.lineTo(arcX[i], arcY[i]); else c.moveTo(arcX[i], arcY[i]);
            pen = true;
          } else pen = false;
        }
        c.stroke();

        if (head >= 1) continue;
        const tail = Math.round(ARC_STEPS * 0.3);
        const start = Math.max(0, headIdx - tail);
        c.lineWidth = 1.7;
        for (let i = start; i < headIdx; i++) {
          if (!arcV[i] || !arcV[i + 1]) continue;
          const k = (i - start + 1) / (headIdx - start);
          c.strokeStyle = `rgba(${rgb},${(Math.pow(k, 1.7) * 0.95).toFixed(3)})`;
          c.beginPath();
          c.moveTo(arcX[i], arcY[i]);
          c.lineTo(arcX[i + 1], arcY[i + 1]);
          c.stroke();
        }
        const next = Math.min(ARC_STEPS, headIdx + 1);
        if (arcV[headIdx] && arcV[next]) {
          const f = headPos - headIdx;
          const hx = arcX[headIdx] + (arcX[next] - arcX[headIdx]) * f;
          const hy = arcY[headIdx] + (arcY[next] - arcY[headIdx]) * f;
          const glow = c.createRadialGradient(hx, hy, 0, hx, hy, 9);
          glow.addColorStop(0, `rgba(${rgb},0.55)`);
          glow.addColorStop(1, `rgba(${rgb},0)`);
          c.fillStyle = glow;
          c.fillRect(hx - 9, hy - 9, 18, 18);
          c.fillStyle = "#f2f8ff";
          c.beginPath();
          c.arc(hx, hy, 1.8, 0, TAU);
          c.fill();
        }
      }
    }

    function drawHubs(now: number) {
      const c = ctx!;
      c.font = "500 10px ui-monospace, SFMono-Regular, Menlo, Consolas, monospace";
      c.textBaseline = "middle";
      for (const hub of hubs) {
        hub.z = project(hub.v[0], hub.v[1], hub.v[2]);
        hub.sx = P.x; hub.sy = P.y;
        if (hub.z <= 0.04 || hub.sy > H + 10) continue;
        const edge = Math.min(1, hub.z / 0.25);
        const pulse = running ? (now * 0.45 + hub.phase) % 1 : 0.35;
        c.strokeStyle = `rgba(150,200,255,${((1 - pulse) * 0.3 * edge).toFixed(3)})`;
        c.lineWidth = 1;
        c.beginPath();
        c.arc(hub.sx, hub.sy, 3 + pulse * 9, 0, TAU);
        c.stroke();
        c.fillStyle = `rgba(226,240,255,${(0.78 * edge).toFixed(3)})`;
        c.beginPath();
        c.arc(hub.sx, hub.sy, 2.1, 0, TAU);
        c.fill();

        if (pointerGlow > 0.01) {
          const d = Math.hypot(hub.sx - pointer.x, hub.sy - pointer.y);
          const near = Math.max(0, 1 - d / 110) * pointerGlow * edge;
          if (near > 0.02) {
            c.fillStyle = `rgba(214,235,255,${Math.min(0.9, near * 1.6).toFixed(3)})`;
            c.fillText(hub.name.toUpperCase(), hub.sx + 10, hub.sy - 9);
          }
        }
      }
    }

    function drawPings(now: number) {
      const c = ctx!;
      for (const ping of pings) {
        if (project(ping.v[0], ping.v[1], ping.v[2]) <= 0.02) continue;
        const k = (now - ping.born) / (ping.big ? 1.1 : 0.7);
        if (k >= 1) continue;
        const out = 1 - Math.pow(1 - k, 3);
        c.strokeStyle = `rgba(190,224,255,${((1 - k) * (ping.big ? 0.7 : 0.4)).toFixed(3)})`;
        c.lineWidth = ping.big ? 1.4 : 1;
        c.beginPath();
        c.arc(P.x, P.y, 3 + out * (ping.big ? 22 : 12), 0, TAU);
        c.stroke();
      }
    }

    function render(now: number) {
      const c = ctx!;
      setRotation();
      c.setTransform(dpr, 0, 0, dpr, 0, 0);
      c.clearRect(0, 0, W, H);

      c.fillStyle = "#cfe3ff";
      for (const s of stars) {
        c.globalAlpha = s.a * (0.65 + 0.35 * Math.sin(now * s.speed + s.phase));
        c.fillRect(s.x, s.y, s.r, s.r);
      }
      c.globalAlpha = 1;
      c.drawImage(still, 0, 0, W, H);

      drawGraticule();
      drawDots(now);
      drawWaves();
      drawArcs(now);
      drawHubs(now);
      drawPings(now);
    }

    function frame(time: number) {
      if (!running) return;
      const t = time / 1000;
      const dt = Math.min(0.05, last ? t - last : 0.016);
      last = t;
      clock += dt;
      for (const wave of waves) {
        const age = clock - wave.born;
        wave.front = age * 1.15;
        wave.band = 0.07 + wave.front * 0.03;
        wave.amp = Math.min(1, 1.25 * (1 - age / 2.6));
      }
      update(dt, clock);
      render(clock);
      raf = requestAnimationFrame(frame);
    }

    function sync() {
      const shouldRun = visible && !document.hidden && !reducedMotion.matches;
      if (shouldRun && !running) {
        running = true; last = 0;
        raf = requestAnimationFrame(frame);
      } else if (!shouldRun && running) {
        running = false;
        cancelAnimationFrame(raf);
      }
      if (reducedMotion.matches) {
        /* Still image: a few complete routes, no travelling light. */
        waves = [];
        if (!arcs.length) {
          ([[12, 0], [12, 4], [14, 1], [7, 9], [10, 13]] as const).forEach(([a, b]) => spawnArc(a, b, -100));
          arcs.forEach((arc) => { arc.landed = true; arc.born = clock - arc.dur; });
        }
        pings = [];
        if (W) render(clock);
      }
    }

    function onPointerMove(event: PointerEvent) {
      if (event.pointerType === "touch" || reducedMotion.matches) return;
      const rect = hero!.getBoundingClientRect();
      pointer.x = event.clientX - rect.left;
      pointer.y = event.clientY - rect.top;
      pointer.active = true;
      if (!drag) return;
      const dx = event.clientX - drag.x;
      const dtMs = Math.max(1, event.timeStamp - drag.t);
      drag.x = event.clientX; drag.t = event.timeStamp;
      drag.moved += Math.abs(dx);
      rotY += dx / R;
      drag.v = drag.v * 0.6 + ((dx / R) / (dtMs / 1000)) * 0.4;
      if (drag.moved > 4) hero!.classList.add("hero-globe-dragging");
    }

    function onPointerLeave() {
      pointer.active = false;
    }

    function onPointerDown(event: PointerEvent) {
      if (event.pointerType === "touch" || event.button !== 0 || reducedMotion.matches) return;
      if (event.target instanceof Element && event.target.closest(INTERACTIVE)) return;
      drag = { x: event.clientX, t: event.timeStamp, moved: 0, v: 0, id: event.pointerId };
      try { hero!.setPointerCapture(event.pointerId); } catch { /* pointer already gone */ }
    }

    function endDrag(event: PointerEvent) {
      if (!drag) return;
      if (hero!.hasPointerCapture(drag.id)) hero!.releasePointerCapture(drag.id);
      if (drag.moved > 4) {
        suppressClick = true;
        /* Release with the hand's momentum, then ease back to the idle spin. */
        if (event.timeStamp - drag.t < 80) spin = Math.max(-2.5, Math.min(2.5, drag.v));
      }
      drag = null;
      hero!.classList.remove("hero-globe-dragging");
    }

    function onClick(event: MouseEvent) {
      if (suppressClick) { suppressClick = false; return; }
      if (reducedMotion.matches || event.button !== 0 || event.detail === 0) return;
      if (event.target instanceof Element && event.target.closest(INTERACTIVE)) return;
      const rect = hero!.getBoundingClientRect();
      setRotation();
      const origin = unproject(event.clientX - rect.left, event.clientY - rect.top);
      const helper: Vec3 = Math.abs(origin[1]) < 0.9 ? [0, 1, 0] : [1, 0, 0];
      const cross: Vec3 = [origin[1] * helper[2] - origin[2] * helper[1], origin[2] * helper[0] - origin[0] * helper[2], origin[0] * helper[1] - origin[1] * helper[0]];
      const len = Math.hypot(cross[0], cross[1], cross[2]);
      const u: Vec3 = [cross[0] / len, cross[1] / len, cross[2] / len];
      const w: Vec3 = [origin[1] * u[2] - origin[2] * u[1], origin[2] * u[0] - origin[0] * u[2], origin[0] * u[1] - origin[1] * u[0]];
      if (waves.length === 3) waves.shift();
      waves.push({ o: origin, u, w, born: clock, front: 0, band: 0.07, amp: 1 });
      pings.push({ v: origin, born: clock, big: true });

      let nearest = 0, best = Infinity;
      hubs.forEach((hub, i) => {
        const d = angle(hub.v, origin);
        if (d < best) { best = d; nearest = i; }
      });
      const targets = hubs.map((_, i) => i)
        .filter((i) => i !== nearest && angle(hubs[i].v, hubs[nearest].v) > 0.3)
        .sort(() => rand() - 0.5)
        .slice(0, 3);
      if (arcs.length > 10) arcs.splice(0, arcs.length - 10);
      targets.forEach((to) => spawnArc(nearest, to, clock));
    }

    function onMotionChange() {
      arcs = [];
      sync();
    }

    const resizeObserver = new ResizeObserver(layout);
    resizeObserver.observe(hero);
    const intersectionObserver = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    intersectionObserver.observe(hero);

    hero.addEventListener("pointermove", onPointerMove, { passive: true });
    hero.addEventListener("pointerleave", onPointerLeave);
    hero.addEventListener("pointerdown", onPointerDown);
    hero.addEventListener("pointerup", endDrag);
    hero.addEventListener("pointercancel", endDrag);
    hero.addEventListener("click", onClick);
    document.addEventListener("visibilitychange", sync);
    reducedMotion.addEventListener("change", onMotionChange);

    layout();
    sync();

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      hero.removeEventListener("pointermove", onPointerMove);
      hero.removeEventListener("pointerleave", onPointerLeave);
      hero.removeEventListener("pointerdown", onPointerDown);
      hero.removeEventListener("pointerup", endDrag);
      hero.removeEventListener("pointercancel", endDrag);
      hero.removeEventListener("click", onClick);
      hero.classList.remove("hero-globe-dragging");
      document.removeEventListener("visibilitychange", sync);
      reducedMotion.removeEventListener("change", onMotionChange);
    };
  }, []);

  return (
    <>
      <div className="hero-globe-glow hero-globe-glow-a" />
      <div className="hero-globe-glow hero-globe-glow-b" />
      <canvas ref={canvasRef} className="hero-globe-canvas" />
      <div className="hero-globe-shade" />
      <div className="hero-globe-fade" />
    </>
  );
}
