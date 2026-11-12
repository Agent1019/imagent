/**
 * Generate a dotted world map SVG from Natural Earth GeoJSON.
 * Uses equirectangular projection with 8px grid spacing.
 * Handles ±180° meridian wrapping for Russia, Fiji, etc.
 *
 * Usage: npx tsx apps/web/scripts/generate-world-dots.ts
 */

import { readFileSync, writeFileSync } from "fs";
import { resolve } from "path";

// --- Configuration ---
const VIEWBOX_W = 1440;
const VIEWBOX_H = 576;
const GRID = 8;           // px spacing between dot centers
const DOT_R = 2.4;        // circle radius
const LON_MIN = -180;
const LON_MAX = 180;
const LAT_MIN = -60;      // cut off Antarctica below useful latitude
const LAT_MAX = 84;       // include full Arctic

// Convert lon/lat to SVG x/y (equirectangular)
function toSvgX(lon: number): number {
  return ((lon - LON_MIN) / (LON_MAX - LON_MIN)) * VIEWBOX_W;
}
function toSvgY(lat: number): number {
  return ((LAT_MAX - lat) / (LAT_MAX - LAT_MIN)) * VIEWBOX_H;
}

// Ray-casting point-in-polygon
function pointInRing(px: number, py: number, ring: [number, number][]): boolean {
  let inside = false;
  for (let i = 0, j = ring.length - 1; i < ring.length; j = i++) {
    const [xi, yi] = ring[i];
    const [xj, yj] = ring[j];
    if ((yi > py) !== (yj > py) && px < ((xj - xi) * (py - yi)) / (yj - yi) + xi) {
      inside = !inside;
    }
  }
  return inside;
}

function pointInPolygon(lon: number, lat: number, coords: [number, number][][]): boolean {
  // First ring is exterior, rest are holes
  if (!pointInRing(lon, lat, coords[0])) return false;
  for (let h = 1; h < coords.length; h++) {
    if (pointInRing(lon, lat, coords[h])) return false;
  }
  return true;
}

// --- Main ---
const geoPath = resolve(__dirname, "world-land-50m.json");
let geojson: { type: string; features: { geometry: { type: string; coordinates: number[][][] | number[][][][] } }[] };

try {
  const raw = readFileSync(geoPath, "utf-8");
  geojson = JSON.parse(raw);
} catch {
  console.log("Need world-land-50m.json. Downloading from Natural Earth...");
  // Fallback: try the 110m file
  const fallback = resolve(__dirname, "world-land-110m.json");
  try {
    const raw = readFileSync(fallback, "utf-8");
    geojson = JSON.parse(raw);
  } catch {
    console.error("Place world-land-50m.json or world-land-110m.json in scripts/ directory.");
    console.error("Download from: https://github.com/nvkelso/natural-earth-vector/tree/master/geojson");
    process.exit(1);
  }
}

// Collect all polygon coordinates, normalizing to [number, number][][][]
const polygons: [number, number][][][] = [];

for (const feature of geojson.features) {
  const geom = feature.geometry;
  if (geom.type === "Polygon") {
    polygons.push((geom.coordinates as number[][][]).map(ring =>
      ring.map(([x, y]) => [x, y] as [number, number])
    ));
  } else if (geom.type === "MultiPolygon") {
    for (const poly of geom.coordinates as number[][][][]) {
      polygons.push(poly.map(ring =>
        ring.map(([x, y]) => [x, y] as [number, number])
      ));
    }
  }
}

console.log(`Loaded ${polygons.length} polygons from GeoJSON`);

// Build a spatial index: for each grid row (latitude), find the longitude ranges that are land.
// This is much faster than testing every grid point against every polygon.
const circles: { cx: number; cy: number }[] = [];

// Grid in latitude/longitude space
const latStep = (LAT_MAX - LAT_MIN) / (VIEWBOX_H / GRID);
const lonStep = (LON_MAX - LON_MIN) / (VIEWBOX_W / GRID);

let tested = 0;
let landHits = 0;

for (let gy = 0; gy < VIEWBOX_H; gy += GRID) {
  const lat = LAT_MAX - (gy / VIEWBOX_H) * (LAT_MAX - LAT_MIN);
  for (let gx = 0; gx < VIEWBOX_W; gx += GRID) {
    const lon = LON_MIN + (gx / VIEWBOX_W) * (LON_MAX - LON_MIN);
    tested++;
    let hit = false;
    for (const poly of polygons) {
      if (pointInPolygon(lon, lat, poly)) {
        hit = true;
        break;
      }
    }
    if (hit) {
      landHits++;
      circles.push({ cx: gx, cy: gy });
    }
  }
}

console.log(`Tested ${tested} grid points, ${landHits} on land`);

// Generate SVG
const circlesStr = circles
  .map(c => `<circle cx="${c.cx}" cy="${c.cy}" r="${DOT_R}"/>`)
  .join("");

const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${VIEWBOX_W} ${VIEWBOX_H}"><title>Imagent dotted world map</title><desc>Decorative land dots generated from Natural Earth public-domain land data.</desc><g fill="white">${circlesStr}</g></svg>`;

const outPath = resolve(__dirname, "../public/images/world-dots.svg");
writeFileSync(outPath, svg);
console.log(`Written ${(svg.length / 1024).toFixed(1)}KB to ${outPath}`);
console.log(`${circles.length} dots total`);
