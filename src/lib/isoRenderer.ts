/**
 * Standalone Isometric Vector SVG Renderer
 * Recreates the exact 3D isometric polygon facet projection and gradient shading.
 * 0 external dependencies, pure vector math.
 */

export interface GradientStop {
  offset: number;
  color: string;
}

export interface GradientDef {
  id: string;
  stops: GradientStop[];
}

export interface BoxDef {
  pos: [number, number, number];
  size: [number, number, number];
  rotation: [number, number, number];
  hollow?: boolean | string;
  faceDir?: string;
  opacity?: number;
  gradients: {
    top: string;
    sideA: string;
    sideB: string;
  };
}

export interface KeyframeDef {
  frame: number;
  pos: [number, number, number];
  size: [number, number, number];
  rotation: [number, number, number];
  hollow?: boolean | string;
  faceDir?: string;
  opacity?: number;
  gradients?: {
    top: string;
    sideA: string;
    sideB: string;
  };
}

export interface IsoAnimData {
  format: string;
  version: number;
  w: number;
  h: number;
  fps: number;
  totalFrames: number;
  currentView: number;
  background?: string;
  disableAutoFrame?: boolean;
  zoom?: number;
  panX?: number;
  panY?: number;
  gradients: GradientDef[];
  boxes: BoxDef[];
  keyframes?: Record<string, KeyframeDef[]>;
  stops?: number[];
}

class Vector3 {
  x: number;
  y: number;
  z: number;

  constructor(x = 0, y = 0, z = 0) {
    this.x = x;
    this.y = y;
    this.z = z;
  }

  clone(): Vector3 {
    return new Vector3(this.x, this.y, this.z);
  }

  negate(): this {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }

  dot(v: Vector3): number {
    return this.x * v.x + this.y * v.y + this.z * v.z;
  }

  crossVectors(a: Vector3, b: Vector3): this {
    this.x = a.y * b.z - a.z * b.y;
    this.y = a.z * b.x - a.x * b.z;
    this.z = a.x * b.y - a.y * b.x;
    return this;
  }

  normalize(): this {
    const len = Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    if (len > 0) {
      this.x /= len;
      this.y /= len;
      this.z /= len;
    }
    return this;
  }

  applyMatrix4(m: Matrix4): this {
    const e = m.elements;
    const x = this.x;
    const y = this.y;
    const z = this.z;
    this.x = e[0] * x + e[4] * y + e[8] * z + e[12];
    this.y = e[1] * x + e[5] * y + e[9] * z + e[13];
    this.z = e[2] * x + e[6] * y + e[10] * z + e[14];
    return this;
  }
}

class Matrix4 {
  elements: number[];

  constructor() {
    this.elements = [
      1, 0, 0, 0,
      0, 1, 0, 0,
      0, 0, 1, 0,
      0, 0, 0, 1,
    ];
  }

  makeRotationFromEuler(x: number, y: number, z: number): this {
    const c1 = Math.cos(x);
    const s1 = Math.sin(x);
    const c2 = Math.cos(y);
    const s2 = Math.sin(y);
    const c3 = Math.cos(z);
    const s3 = Math.sin(z);
    const c1c3 = c1 * c3;
    const c1s3 = c1 * s3;
    const s1c3 = s1 * c3;
    const s1s3 = s1 * s3;
    const te = this.elements;

    te[0] = c2 * c3;
    te[4] = -c2 * s3;
    te[8] = s2;
    te[1] = c1s3 + s1c3 * s2;
    te[5] = c1c3 - s1s3 * s2;
    te[9] = -s1 * c2;
    te[2] = s1s3 - c1c3 * s2;
    te[6] = s1c3 + c1s3 * s2;
    te[10] = c1 * c2;

    te[3] = 0;
    te[7] = 0;
    te[11] = 0;
    te[12] = 0;
    te[13] = 0;
    te[14] = 0;
    te[15] = 1;
    return this;
  }
}

const cameraViews = [
  { dir: [1, 1, 1] },
  { dir: [-1, 1, 1] },
  { dir: [-1, 1, -1] },
  { dir: [1, 1, -1] },
];

const standardCubeFaces = [
  { verts: [[-1, 1, -1], [1, 1, -1], [1, 1, 1], [-1, 1, 1]], normal: [0, 1, 0], type: "top" },
  { verts: [[-1, -1, 1], [1, -1, 1], [1, -1, -1], [-1, -1, -1]], normal: [0, -1, 0], type: "bottom" },
  { verts: [[-1, -1, 1], [-1, 1, 1], [1, 1, 1], [1, -1, 1]], normal: [0, 0, 1], type: "side" },
  { verts: [[1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, -1]], normal: [0, 0, -1], type: "side" },
  { verts: [[1, -1, 1], [1, 1, 1], [1, 1, -1], [1, -1, -1]], normal: [1, 0, 0], type: "side" },
  { verts: [[-1, -1, -1], [-1, 1, -1], [-1, 1, 1], [-1, -1, 1]], normal: [-1, 0, 0], type: "side" },
];

const HOLLOW_OFFSET = 0.25;
const t = 1 - 2 * HOLLOW_OFFSET;

const hollowOuterInnerFaces = [
  { outer: [[-1, 1, -1], [1, 1, -1], [1, 1, 1], [-1, 1, 1]], inner: [[-t, 1, -t], [t, 1, -t], [t, 1, t], [-t, 1, t]], normal: [0, 1, 0] },
  { outer: [[-1, -1, 1], [1, -1, 1], [1, -1, -1], [-1, -1, -1]], inner: [[-t, -1, t], [t, -1, t], [t, -1, -t], [-t, -1, -t]], normal: [0, -1, 0] },
  { outer: [[-1, -1, 1], [-1, 1, 1], [1, 1, 1], [1, -1, 1]], inner: [[-t, -t, 1], [-t, t, 1], [t, t, 1], [t, -t, 1]], normal: [0, 0, 1] },
  { outer: [[1, -1, -1], [1, 1, -1], [-1, 1, -1], [-1, -1, -1]], inner: [[t, -t, -1], [t, t, -1], [-t, t, -1], [-t, -t, -1]], normal: [0, 0, -1] },
  { outer: [[1, -1, 1], [1, 1, 1], [1, 1, -1], [1, -1, -1]], inner: [[1, -t, t], [1, t, t], [1, t, -t], [1, -t, -t]], normal: [1, 0, 0] },
  { outer: [[-1, -1, -1], [-1, 1, -1], [-1, 1, 1], [-1, -1, 1]], inner: [[-1, -t, -t], [-1, t, -t], [-1, t, t], [-1, -t, t]], normal: [-1, 0, 0] },
];

const hollowInnerWalls = [
  { verts: [[t, 1, t], [t, 1, -t], [t, t, -t], [t, t, t]], normal: [-1, 0, 0] },
  { verts: [[-t, 1, -t], [-t, 1, t], [-t, t, t], [-t, t, -t]], normal: [1, 0, 0] },
  { verts: [[-t, 1, t], [t, 1, t], [t, t, t], [-t, t, t]], normal: [0, 0, -1] },
  { verts: [[t, 1, -t], [-t, 1, -t], [-t, t, -t], [t, t, -t]], normal: [0, 0, 1] },
  { verts: [[t, -t, t], [t, -t, -t], [t, -1, -t], [t, -1, t]], normal: [-1, 0, 0] },
  { verts: [[-t, -t, -t], [-t, -t, t], [-t, -1, t], [-t, -1, -t]], normal: [1, 0, 0] },
  { verts: [[-t, -t, t], [t, -t, t], [t, -1, t], [-t, -1, t]], normal: [0, 0, -1] },
  { verts: [[t, -t, -t], [-t, -t, -t], [-t, -1, -t], [t, -1, -t]], normal: [0, 0, 1] },
  { verts: [[t, t, t], [t, -t, t], [t, -t, 1], [t, t, 1]], normal: [-1, 0, 0] },
  { verts: [[-t, -t, t], [-t, t, t], [-t, t, 1], [-t, -t, 1]], normal: [1, 0, 0] },
  { verts: [[-t, t, t], [t, t, t], [t, t, 1], [-t, t, 1]], normal: [0, -1, 0] },
  { verts: [[t, -t, t], [-t, -t, t], [-t, -t, 1], [t, -t, 1]], normal: [0, 1, 0] },
  { verts: [[t, -t, -t], [t, t, -t], [t, t, -1], [t, -t, -1]], normal: [-1, 0, 0] },
  { verts: [[-t, t, -t], [-t, -t, -t], [-t, -t, -1], [-t, t, -1]], normal: [1, 0, 0] },
  { verts: [[t, t, -t], [-t, t, -t], [-t, t, -1], [t, t, -1]], normal: [0, -1, 0] },
  { verts: [[-t, -t, -t], [t, -t, -t], [t, -t, -1], [-t, -t, -1]], normal: [0, 1, 0] },
  { verts: [[t, t, t], [t, t, -t], [1, t, -t], [1, t, t]], normal: [0, -1, 0] },
  { verts: [[t, -t, -t], [t, -t, t], [1, -t, t], [1, -t, -t]], normal: [0, 1, 0] },
  { verts: [[t, -t, t], [t, t, t], [1, t, t], [1, -t, t]], normal: [0, 0, -1] },
  { verts: [[t, t, -t], [t, -t, -t], [1, -t, -t], [1, t, -t]], normal: [0, 0, 1] },
  { verts: [[-t, t, -t], [-t, t, t], [-1, t, t], [-1, t, -t]], normal: [0, -1, 0] },
  { verts: [[-t, -t, t], [-t, -t, -t], [-1, -t, -t], [-1, -t, t]], normal: [0, 1, 0] },
  { verts: [[-t, t, t], [-t, -t, t], [-1, -t, t], [-1, t, t]], normal: [0, 0, -1] },
  { verts: [[-t, -t, -t], [-t, t, -t], [-1, t, -t], [-1, -t, -t]], normal: [0, 0, 1] },
];

function getCamera(viewIndex: number) {
  const dir = cameraViews[viewIndex]?.dir || [1, 1, 1];
  const pos = new Vector3(dir[0], dir[1], dir[2]).normalize();
  const forward = pos.clone().negate();
  const upRef = new Vector3(0, 1, 0);
  const right = new Vector3().crossVectors(upRef, forward).normalize();
  const up = new Vector3().crossVectors(forward, right).normalize();
  return { pos, right, up };
}

function projectVertex(v: Vector3, cam: { pos: Vector3; right: Vector3; up: Vector3 }) {
  return {
    x: v.dot(cam.right),
    y: -v.dot(cam.up),
    depth: v.dot(cam.pos),
  };
}

function projectSolidBox(box: BoxDef, boxIdx: number) {
  const rotMat = new Matrix4().makeRotationFromEuler(box.rotation[0], box.rotation[1], box.rotation[2]);
  const faces: any[] = [];
  for (let i = 0; i < standardCubeFaces.length; i++) {
    const f = standardCubeFaces[i];
    const worldVerts = f.verts.map((v) => {
      const p = new Vector3(v[0] * box.size[0] * 0.5, v[1] * box.size[1] * 0.5, v[2] * box.size[2] * 0.5);
      p.applyMatrix4(rotMat);
      p.x += box.pos[0];
      p.y += box.pos[1];
      p.z += box.pos[2];
      return p;
    });
    const normal = new Vector3(f.normal[0], f.normal[1], f.normal[2]);
    normal.applyMatrix4(rotMat).normalize();

    let gradId: string;
    let faceRole: string;
    if (Math.abs(normal.y) > 0.5) {
      gradId = box.gradients.top;
      faceRole = "top";
    } else if (Math.abs(normal.x) >= Math.abs(normal.z)) {
      gradId = box.gradients.sideA;
      faceRole = "sideA";
    } else {
      gradId = box.gradients.sideB;
      faceRole = "sideB";
    }

    faces.push({ worldVerts, normal, type: f.type, gradId, faceRole, boxIdx });
  }
  return faces;
}

function projectHollowBox(box: BoxDef, boxIdx: number) {
  const rotMat = new Matrix4().makeRotationFromEuler(box.rotation[0], box.rotation[1], box.rotation[2]);
  const sx = box.size[0] * 0.5;
  const sy = box.size[1] * 0.5;
  const sz = box.size[2] * 0.5;

  const transformPoint = (pt: number[]) => {
    const p = new Vector3(pt[0] * sx, pt[1] * sy, pt[2] * sz);
    p.applyMatrix4(rotMat);
    p.x += box.pos[0];
    p.y += box.pos[1];
    p.z += box.pos[2];
    return p;
  };

  const transformNormal = (n: number[]) => {
    const norm = new Vector3(n[0], n[1], n[2]);
    norm.applyMatrix4(rotMat).normalize();
    return norm;
  };

  const getFaceGrad = (norm: Vector3) => {
    if (Math.abs(norm.y) > 0.5) {
      return { gradId: box.gradients.top, faceRole: "top" };
    }
    if (Math.abs(norm.x) >= Math.abs(norm.z)) {
      return { gradId: box.gradients.sideA, faceRole: "sideA" };
    }
    return { gradId: box.gradients.sideB, faceRole: "sideB" };
  };

  const faces: any[] = [];
  for (let f = 0; f < hollowOuterInnerFaces.length; f++) {
    const d = hollowOuterInnerFaces[f];
    const norm = transformNormal(d.normal);
    const grad = getFaceGrad(norm);
    faces.push({
      type: "frame",
      outerVerts: d.outer.map(transformPoint),
      innerVerts: d.inner.map(transformPoint),
      normal: norm,
      gradId: grad.gradId,
      faceRole: grad.faceRole,
      boxIdx,
    });
  }

  for (let m = 0; m < hollowInnerWalls.length; m++) {
    const wall = hollowInnerWalls[m];
    const norm = transformNormal(wall.normal);
    const grad = getFaceGrad(norm);
    faces.push({
      type: "quad",
      worldVerts: wall.verts.map(transformPoint),
      normal: norm,
      gradId: grad.gradId,
      faceRole: grad.faceRole,
      boxIdx,
    });
  }

  return faces;
}

function cubicEase(t: number): number {
  return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
}

function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}

function lerpArray(a: number[], b: number[], t: number): [number, number, number] {
  return [lerp(a[0], b[0], t), lerp(a[1], b[1], t), lerp(a[2], b[2], t)];
}

function parseHex(h: string): [number, number, number] {
  const n = parseInt(h.slice(1), 16);
  return [(n >> 16) & 255, (n >> 8) & 255, n & 255];
}

function rgbToHex(r: number, g: number, b: number): string {
  return "#" + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1).toUpperCase();
}

function interpolateColor(c1: string, c2: string, t: number): string {
  const rgb1 = parseHex(c1);
  const rgb2 = parseHex(c2);
  return rgbToHex(
    Math.round(lerp(rgb1[0], rgb2[0], t)),
    Math.round(lerp(rgb1[1], rgb2[1], t)),
    Math.round(lerp(rgb1[2], rgb2[2], t))
  );
}

function getGradientStops(gradId: string, gradients: GradientDef[]): GradientStop[] {
  for (let i = 0; i < gradients.length; i++) {
    if (gradients[i].id === gradId) return gradients[i].stops;
  }
  return gradients[0]?.stops || [];
}

function sampleGradient(stops: GradientStop[], offset: number): string {
  if (offset <= stops[0].offset) return stops[0].color;
  if (offset >= stops[stops.length - 1].offset) return stops[stops.length - 1].color;
  for (let i = 0; i < stops.length - 1; i++) {
    if (offset >= stops[i].offset && offset <= stops[i + 1].offset) {
      const s = (offset - stops[i].offset) / (stops[i + 1].offset - stops[i].offset);
      return interpolateColor(stops[i].color, stops[i + 1].color, s);
    }
  }
  return stops[stops.length - 1].color;
}

function blendGradients(stops1: GradientStop[], stops2: GradientStop[], t: number): GradientStop[] {
  const map: Record<number, boolean> = {};
  for (let i = 0; i < stops1.length; i++) map[stops1[i].offset] = true;
  for (let i = 0; i < stops2.length; i++) map[stops2[i].offset] = true;
  const offsets = Object.keys(map).map(Number).sort((a, b) => a - b);
  return offsets.map((o) => ({
    offset: o,
    color: interpolateColor(sampleGradient(stops1, o), sampleGradient(stops2, o), t),
  }));
}

function getDynamicGradId(
  g1: string,
  g2: string,
  t: number,
  gradients: GradientDef[],
  dynGrads: Record<string, GradientStop[]>
): string {
  if (g1 === g2) return g1;
  const id = `_dyn_${g1}_${g2}_${Math.round(t * 1000)}`;
  if (!dynGrads[id]) {
    dynGrads[id] = blendGradients(getGradientStops(g1, gradients), getGradientStops(g2, gradients), t);
  }
  return id;
}

function interpolateBoxKeyframes(
  keyframes: KeyframeDef[],
  frame: number,
  gradients: GradientDef[],
  dynGrads: Record<string, GradientStop[]>
): BoxDef | null {
  if (!keyframes || keyframes.length === 0) return null;
  if (frame <= keyframes[0].frame) {
    const k = keyframes[0];
    return {
      pos: [...k.pos],
      size: [...k.size],
      rotation: [...k.rotation],
      opacity: k.opacity ?? 1,
      hollow: k.hollow,
      faceDir: k.faceDir || "top",
      gradients: k.gradients ? { ...k.gradients } : { top: "grad0", sideA: "grad1", sideB: "grad2" },
    };
  }
  if (frame >= keyframes[keyframes.length - 1].frame) {
    const k = keyframes[keyframes.length - 1];
    return {
      pos: [...k.pos],
      size: [...k.size],
      rotation: [...k.rotation],
      opacity: k.opacity ?? 1,
      hollow: k.hollow,
      faceDir: k.faceDir || "top",
      gradients: k.gradients ? { ...k.gradients } : { top: "grad0", sideA: "grad1", sideB: "grad2" },
    };
  }

  for (let i = 0; i < keyframes.length - 1; i++) {
    const k1 = keyframes[i];
    const k2 = keyframes[i + 1];
    if (frame >= k1.frame && frame <= k2.frame) {
      const len = k2.frame - k1.frame;
      const t = len > 0 ? cubicEase((frame - k1.frame) / len) : 0;
      const g1 = k1.gradients || { top: "grad0", sideA: "grad1", sideB: "grad2" };
      const g2 = k2.gradients || { top: "grad0", sideA: "grad1", sideB: "grad2" };

      return {
        pos: lerpArray(k1.pos, k2.pos, t),
        size: lerpArray(k1.size, k2.size, t),
        rotation: lerpArray(k1.rotation, k2.rotation, t),
        opacity: lerp(k1.opacity ?? 1, k2.opacity ?? 1, t),
        hollow: t < 0.5 ? k1.hollow : k2.hollow,
        faceDir: (t < 0.5 ? k1.faceDir : k2.faceDir) || "top",
        gradients: {
          top: getDynamicGradId(g1.top, g2.top, t, gradients, dynGrads),
          sideA: getDynamicGradId(g1.sideA, g2.sideA, t, gradients, dynGrads),
          sideB: getDynamicGradId(g1.sideB, g2.sideB, t, gradients, dynGrads),
        },
      };
    }
  }

  const last = keyframes[keyframes.length - 1];
  return {
    pos: [...last.pos],
    size: [...last.size],
    rotation: [...last.rotation],
    opacity: last.opacity ?? 1,
    hollow: last.hollow,
    faceDir: last.faceDir || "top",
    gradients: last.gradients ? { ...last.gradients } : { top: "grad0", sideA: "grad1", sideB: "grad2" },
  };
}

export interface LayerOffsets {
  leftPrismX?: number;
  silverX?: number;
  silverY?: number;
  clusterY?: number;
  clusterOpacity?: number;
}

let prefixCounter = 0;

/**
 * Renders an isometric frame as pure vector SVG markup with 3 distinct parallax depth layers:
 * a) fc-layer-left-prism: Foreground large dark navy prism on the left
 * b) fc-layer-silver: Midground silver-grey facet at the top-right
 * c) fc-layer-cluster: Background accent small bright blue triangle cluster at bottom-left
 */
export function renderIsoFrame(
  data: IsoAnimData,
  frame: number,
  targetWidth: number,
  targetHeight: number,
  prefix = `fc_iso_${prefixCounter++}_`,
  layerOffsets?: LayerOffsets
): string {
  const dynGrads: Record<string, GradientStop[]> = {};
  const boxes: BoxDef[] = [];

  for (let i = 0; i < data.boxes.length; i++) {
    const kfs = data.keyframes ? data.keyframes[String(i)] : undefined;
    if (kfs) {
      const interpolated = interpolateBoxKeyframes(kfs, frame, data.gradients, dynGrads);
      boxes.push(interpolated || data.boxes[i]);
    } else {
      boxes.push(data.boxes[i]);
    }
  }

  const cam = getCamera(data.currentView || 0);
  const faces: any[] = [];

  for (let p = 0; p < boxes.length; p++) {
    const box = boxes[p];
    const generated = box.hollow ? projectHollowBox(box, p) : projectSolidBox(box, p);

    for (let z = 0; z < generated.length; z++) {
      const face = generated[z];
      if (face.normal.dot(cam.pos) <= 0) continue; // Backface culling

      if (face.type === "frame") {
        const outerProjected = face.outerVerts.map((v: Vector3) => projectVertex(v, cam));
        const innerProjected = face.innerVerts.map((v: Vector3) => projectVertex(v, cam));
        const all = outerProjected.concat(innerProjected);
        const depth = all.reduce((sum: number, pt: any) => sum + pt.depth, 0) / all.length;
        faces.push({
          type: "frame",
          outerProjected,
          innerProjected,
          depth,
          gradId: face.gradId,
          faceRole: face.faceRole,
          boxIdx: face.boxIdx,
        });
      } else {
        const projected = face.worldVerts.map((v: Vector3) => projectVertex(v, cam));
        const depth = projected.reduce((sum: number, pt: any) => sum + pt.depth, 0) / projected.length;
        faces.push({
          type: "quad",
          projected,
          depth,
          gradId: face.gradId,
          faceRole: face.faceRole,
          boxIdx: face.boxIdx,
        });
      }
    }
  }

  // Painter's algorithm depth sort
  faces.sort((a, b) => b.boxIdx - a.boxIdx || a.depth - b.depth);

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (let e = 0; e < faces.length; e++) {
    const f = faces[e];
    const pts = f.type === "frame" ? f.outerProjected.concat(f.innerProjected) : f.projected;
    for (let n = 0; n < pts.length; n++) {
      const p = pts[n];
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }
  }

  let scale: number;
  let centerX: number;
  let centerY: number;

  if (data.disableAutoFrame) {
    const fixedUnit = 20;
    scale = Math.min(targetWidth, targetHeight) / fixedUnit;
    centerX = 0;
    centerY = 0;
  } else {
    const spanX = maxX - minX || 1;
    const spanY = maxY - minY || 1;
    scale = Math.min(targetWidth / (spanX * 1.15), targetHeight / (spanY * 1.15));
    centerX = (minX + maxX) / 2;
    centerY = (minY + maxY) / 2;
  }

  if (data.disableAutoFrame && data.zoom && data.zoom !== 1) {
    scale *= data.zoom;
  }
  const panX = data.panX || 0;
  const panY = data.panY || 0;

  const toPointStr = (pt: { x: number; y: number }) => {
    const px = (pt.x - centerX) * scale + targetWidth / 2 + panX;
    const py = (pt.y - centerY) * scale + targetHeight / 2 + panY;
    return `${px.toFixed(2)},${py.toFixed(2)}`;
  };

  const toPointPair = (pt: { x: number; y: number }): [string, string] => {
    const px = ((pt.x - centerX) * scale + targetWidth / 2 + panX).toFixed(2);
    const py = ((pt.y - centerY) * scale + targetHeight / 2 + panY).toFixed(2);
    return [px, py];
  };

  let svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${targetWidth}" height="${targetHeight}" viewBox="0 0 ${targetWidth} ${targetHeight}">\n<defs>\n`;

  // Standard gradients
  for (let i = 0; i < data.gradients.length; i++) {
    const g = data.gradients[i];
    svg += `  <linearGradient id="${prefix}${g.id}" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="0" y2="1">\n`;
    for (let s = 0; s < g.stops.length; s++) {
      svg += `    <stop offset="${g.stops[s].offset}" stop-color="${g.stops[s].color}"/>\n`;
    }
    svg += `  </linearGradient>\n`;
  }

  // Dynamic interpolated gradients
  const dynKeys = Object.keys(dynGrads);
  for (let i = 0; i < dynKeys.length; i++) {
    const k = dynKeys[i];
    const stops = dynGrads[k];
    svg += `  <linearGradient id="${prefix}${k}" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="0" y2="1">\n`;
    for (let s = 0; s < stops.length; s++) {
      svg += `    <stop offset="${stops[s].offset}" stop-color="${stops[s].color}"/>\n`;
    }
    svg += `  </linearGradient>\n`;
  }

  svg += `</defs>\n`;

  let clusterElements = "";
  let silverElements = "";
  let leftPrismElements = "";

  // Polygons & Paths separated into the 3 visual depth layers
  for (let i = 0; i < faces.length; i++) {
    const f = faces[i];
    const box = boxes[f.boxIdx];
    const opacity = box && box.opacity != null ? box.opacity : 1;
    const opacityAttr = opacity < 1 ? ` opacity="${opacity.toFixed(2)}"` : "";
    const strokeAttr = f.faceRole === "sideA" ? "" : ' stroke="#1F1C1B" stroke-width="1" stroke-opacity="0.08"';

    let elStr = "";
    let cy = 0;
    let cx = 0;
    let minY = Infinity;

    if (f.type === "frame") {
      const outerPairs = f.outerProjected.map(toPointPair);
      const innerPairs = f.innerProjected.map(toPointPair);

      let d = `M${outerPairs[0][0]},${outerPairs[0][1]}`;
      for (let p = 1; p < outerPairs.length; p++) d += ` L${outerPairs[p][0]},${outerPairs[p][1]}`;
      d += ` Z M${innerPairs[0][0]},${innerPairs[0][1]}`;
      for (let p = 1; p < innerPairs.length; p++) d += ` L${innerPairs[p][0]},${innerPairs[p][1]}`;
      d += ` Z`;

      elStr = `    <path d="${d}" fill="url(#${prefix}${f.gradId})" fill-rule="evenodd"${opacityAttr}${strokeAttr}/>\n`;
    } else {
      const points = f.projected.map(toPointStr).join(" ");
      elStr = `    <polygon points="${points}" fill="url(#${prefix}${f.gradId})"${opacityAttr}${strokeAttr}/>\n`;

      const allPts = f.projected;
      cx = allPts.reduce((sum: number, p: any) => sum + p.x, 0) / allPts.length;
      cy = allPts.reduce((sum: number, p: any) => sum + p.y, 0) / allPts.length;
      minY = Math.min(...allPts.map((p: any) => p.y));
    }

    // Classify into 3 depth layers:
    // 1. Box 0: Top-right silver facet (midground)
    // 2. Box 1 with lower quads: Bottom-left cluster (background accent)
    // 3. Box 1 rest: Large left prism (foreground)
    if (f.boxIdx === 0) {
      silverElements += elStr;
    } else if (f.boxIdx === 1 && f.type === "quad" && cy > 520 && (cx < 100 || minY > 500)) {
      clusterElements += elStr;
    } else {
      leftPrismElements += elStr;
    }
  }

  const leftPrismX = layerOffsets?.leftPrismX || 0;
  const silverX = layerOffsets?.silverX || 0;
  const silverY = layerOffsets?.silverY || 0;
  const clusterY = layerOffsets?.clusterY || 0;
  const clusterOpacity = layerOffsets?.clusterOpacity != null ? layerOffsets.clusterOpacity : 1;

  // Background accent: Bottom-left bright blue triangle cluster (sinks down and exits)
  svg += `  <g id="${prefix}layer_cluster" class="fc-layer-cluster" transform="translate(0, ${clusterY.toFixed(2)})" opacity="${clusterOpacity.toFixed(2)}">\n${clusterElements}  </g>\n`;

  // Midground: Silver-grey top-right facet (drifts down and slightly inward at half speed)
  svg += `  <g id="${prefix}layer_silver" class="fc-layer-silver" transform="translate(${silverX.toFixed(2)}, ${silverY.toFixed(2)})">\n${silverElements}  </g>\n`;

  // Foreground: Large dark left prism (travels right by 10-13% viewport width, fastest)
  svg += `  <g id="${prefix}layer_left_prism" class="fc-layer-left-prism" transform="translate(${leftPrismX.toFixed(2)}, 0)">\n${leftPrismElements}  </g>\n`;

  svg += `</svg>`;
  return svg;
}

export interface IsoLayerSvgs {
  clusterSvg: string;
  silverSvg: string;
  leftPrismSvg: string;
}

/**
 * Renders the 3 block depth layers as independent standalone SVGs
 * for direct, hardware-accelerated scroll-scrub binding.
 */
export function renderIsoLayers(
  data: IsoAnimData,
  frame: number,
  targetWidth: number,
  targetHeight: number,
  prefix = `fc_iso_${prefixCounter++}_`,
  oversizeRatio = 1.70
): IsoLayerSvgs {
  const dynGrads: Record<string, GradientStop[]> = {};
  const boxes: BoxDef[] = [];

  for (let i = 0; i < data.boxes.length; i++) {
    const kfs = data.keyframes ? data.keyframes[String(i)] : undefined;
    if (kfs) {
      const interpolated = interpolateBoxKeyframes(kfs, frame, data.gradients, dynGrads);
      boxes.push(interpolated || data.boxes[i]);
    } else {
      boxes.push(data.boxes[i]);
    }
  }

  const cam = getCamera(data.currentView || 0);
  const faces: any[] = [];

  for (let p = 0; p < boxes.length; p++) {
    const box = boxes[p];
    const generated = box.hollow ? projectHollowBox(box, p) : projectSolidBox(box, p);

    for (let z = 0; z < generated.length; z++) {
      const face = generated[z];
      if (face.normal.dot(cam.pos) <= 0) continue; // Backface culling

      if (face.type === "frame") {
        const outerProjected = face.outerVerts.map((v: Vector3) => projectVertex(v, cam));
        const innerProjected = face.innerVerts.map((v: Vector3) => projectVertex(v, cam));
        const all = outerProjected.concat(innerProjected);
        const depth = all.reduce((sum: number, pt: any) => sum + pt.depth, 0) / all.length;
        faces.push({
          type: "frame",
          outerProjected,
          innerProjected,
          depth,
          gradId: face.gradId,
          faceRole: face.faceRole,
          boxIdx: face.boxIdx,
        });
      } else {
        const projected = face.worldVerts.map((v: Vector3) => projectVertex(v, cam));
        const depth = projected.reduce((sum: number, pt: any) => sum + pt.depth, 0) / projected.length;
        faces.push({
          type: "quad",
          projected,
          depth,
          gradId: face.gradId,
          faceRole: face.faceRole,
          boxIdx: face.boxIdx,
        });
      }
    }
  }

  // Painter's algorithm depth sort
  faces.sort((a, b) => b.boxIdx - a.boxIdx || a.depth - b.depth);

  let minX = Infinity;
  let maxX = -Infinity;
  let minY = Infinity;
  let maxY = -Infinity;

  for (let e = 0; e < faces.length; e++) {
    const f = faces[e];
    const pts = f.type === "frame" ? f.outerProjected.concat(f.innerProjected) : f.projected;
    for (let n = 0; n < pts.length; n++) {
      const p = pts[n];
      if (p.x < minX) minX = p.x;
      if (p.x > maxX) maxX = p.x;
      if (p.y < minY) minY = p.y;
      if (p.y > maxY) maxY = p.y;
    }
  }

  // Spec 2: Build the block artwork on an oversized board (~160 to 180% of viewport width and height)
  // centered on the hero. Shapes keep their exact design scale while having generous bleed so no
  // facets or outlines are ever cut off by container or SVG edges during rotation.
  const boardWidth = Math.round(targetWidth * oversizeRatio);
  const boardHeight = Math.round(targetHeight * oversizeRatio);

  let scale: number;
  let centerX: number;
  let centerY: number;

  if (data.disableAutoFrame) {
    const fixedUnit = 20;
    // Native viewport-relative scale keeps shapes identical to design
    scale = Math.min(targetWidth, targetHeight) / fixedUnit;
    centerX = 0;
    centerY = 0;
  } else {
    const spanX = maxX - minX || 1;
    const spanY = maxY - minY || 1;
    scale = Math.min(targetWidth / (spanX * 1.15), targetHeight / (spanY * 1.15));
    centerX = (minX + maxX) / 2;
    centerY = (minY + maxY) / 2;
  }

  if (data.disableAutoFrame && data.zoom && data.zoom !== 1) {
    scale *= data.zoom;
  }
  const panX = data.panX || 0;
  const panY = data.panY || 0;

  const toPointStr = (pt: { x: number; y: number }) => {
    const px = (pt.x - centerX) * scale + boardWidth / 2 + panX;
    const py = (pt.y - centerY) * scale + boardHeight / 2 + panY;
    return `${px.toFixed(2)},${py.toFixed(2)}`;
  };

  const toPointPair = (pt: { x: number; y: number }): [string, string] => {
    const px = ((pt.x - centerX) * scale + boardWidth / 2 + panX).toFixed(2);
    const py = ((pt.y - centerY) * scale + boardHeight / 2 + panY).toFixed(2);
    return [px, py];
  };

  let defsMarkup = "";
  for (let i = 0; i < data.gradients.length; i++) {
    const g = data.gradients[i];
    defsMarkup += `  <linearGradient id="${prefix}${g.id}" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="0" y2="1">\n`;
    for (let s = 0; s < g.stops.length; s++) {
      defsMarkup += `    <stop offset="${g.stops[s].offset}" stop-color="${g.stops[s].color}"/>\n`;
    }
    defsMarkup += `  </linearGradient>\n`;
  }

  const dynKeys = Object.keys(dynGrads);
  for (let i = 0; i < dynKeys.length; i++) {
    const k = dynKeys[i];
    const stops = dynGrads[k];
    defsMarkup += `  <linearGradient id="${prefix}${k}" gradientUnits="objectBoundingBox" x1="0" y1="0" x2="0" y2="1">\n`;
    for (let s = 0; s < stops.length; s++) {
      defsMarkup += `    <stop offset="${stops[s].offset}" stop-color="${stops[s].color}"/>\n`;
    }
    defsMarkup += `  </linearGradient>\n`;
  }

  let clusterElements = "";
  let silverElements = "";
  let leftPrismElements = "";

  for (let i = 0; i < faces.length; i++) {
    const f = faces[i];
    const box = boxes[f.boxIdx];
    const opacity = box && box.opacity != null ? box.opacity : 1;
    const opacityAttr = opacity < 1 ? ` opacity="${opacity.toFixed(2)}"` : "";
    const strokeAttr = f.faceRole === "sideA" ? "" : ' stroke="#1F1C1B" stroke-width="1" stroke-opacity="0.08"';

    let elStr = "";
    let cy = 0;
    let cx = 0;
    let minY = Infinity;

    if (f.type === "frame") {
      const outerPairs = f.outerProjected.map(toPointPair);
      const innerPairs = f.innerProjected.map(toPointPair);

      let d = `M${outerPairs[0][0]},${outerPairs[0][1]}`;
      for (let p = 1; p < outerPairs.length; p++) d += ` L${outerPairs[p][0]},${outerPairs[p][1]}`;
      d += ` Z M${innerPairs[0][0]},${innerPairs[0][1]}`;
      for (let p = 1; p < innerPairs.length; p++) d += ` L${innerPairs[p][0]},${innerPairs[p][1]}`;
      d += ` Z`;

      elStr = `    <path d="${d}" fill="url(#${prefix}${f.gradId})" fill-rule="evenodd"${opacityAttr}${strokeAttr}/>\n`;
    } else {
      const points = f.projected.map(toPointStr).join(" ");
      elStr = `    <polygon points="${points}" fill="url(#${prefix}${f.gradId})"${opacityAttr}${strokeAttr}/>\n`;

      const allPts = f.projected;
      cx = allPts.reduce((sum: number, p: any) => sum + ((p.x - centerX) * scale + boardWidth / 2 + panX), 0) / allPts.length;
      cy = allPts.reduce((sum: number, p: any) => sum + ((p.y - centerY) * scale + boardHeight / 2 + panY), 0) / allPts.length;
      minY = Math.min(...allPts.map((p: any) => (p.y - centerY) * scale + boardHeight / 2 + panY));
    }

    if (f.boxIdx === 1) {
      silverElements += elStr;
    } else if (f.boxIdx === 0 && f.type === "quad" && cy > (boardHeight * 0.52)) {
      clusterElements += elStr;
    } else {
      leftPrismElements += elStr;
    }
  }

  const svgHeader = `<svg xmlns="http://www.w3.org/2000/svg" width="${boardWidth}" height="${boardHeight}" viewBox="0 0 ${boardWidth} ${boardHeight}" class="w-full h-full pointer-events-none select-none" style="overflow: visible;" preserveAspectRatio="xMidYMid meet">\n<defs>\n${defsMarkup}</defs>\n`;

  return {
    clusterSvg: `${svgHeader}  <g id="${prefix}layer_cluster_content" class="fc-layer-cluster">\n${clusterElements}  </g>\n</svg>`,
    silverSvg: `${svgHeader}  <g id="${prefix}layer_silver_content" class="fc-layer-silver">\n${silverElements}  </g>\n</svg>`,
    leftPrismSvg: `${svgHeader}  <g id="${prefix}layer_left_prism_content" class="fc-layer-left-prism">\n${leftPrismElements}  </g>\n</svg>`,
  };
}
