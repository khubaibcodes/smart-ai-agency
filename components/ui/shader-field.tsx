"use client";

import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

/**
 * Dependency-free WebGL aurora field in the brand amber.
 *
 * Deliberately not Three.js: this is one fullscreen quad and one fragment
 * shader, so it costs ~4kb instead of ~150kb+.
 *
 * Guards, in order of importance:
 * - `prefers-reduced-motion` renders nothing (the CSS gradient beneath shows through)
 * - never mounted until it scrolls into view, and pauses when it leaves
 * - pauses when the tab is hidden
 * - renders at a fraction of device resolution, DPR capped
 * - survives WebGL context loss instead of leaving a black hole
 * - bails to the CSS gradient if WebGL is unavailable
 */

const VERT = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`;

const FRAG = `
precision mediump float;

uniform vec2  uRes;
uniform float uTime;
uniform float uIntensity;

// --- simplex noise (Ashima / webgl-noise, 2D) ---
vec3 mod289(vec3 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec2 mod289(vec2 x) { return x - floor(x * (1.0 / 289.0)) * 289.0; }
vec3 permute(vec3 x) { return mod289(((x * 34.0) + 1.0) * x); }

float snoise(vec2 v) {
  const vec4 C = vec4(0.211324865405187, 0.366025403784439,
                     -0.577350269189626, 0.024390243902439);
  vec2 i  = floor(v + dot(v, C.yy));
  vec2 x0 = v - i + dot(i, C.xx);
  vec2 i1 = (x0.x > x0.y) ? vec2(1.0, 0.0) : vec2(0.0, 1.0);
  vec4 x12 = x0.xyxy + C.xxzz;
  x12.xy -= i1;
  i = mod289(i);
  vec3 p = permute(permute(i.y + vec3(0.0, i1.y, 1.0))
                          + i.x + vec3(0.0, i1.x, 1.0));
  vec3 m = max(0.5 - vec3(dot(x0, x0), dot(x12.xy, x12.xy),
                          dot(x12.zw, x12.zw)), 0.0);
  m = m * m; m = m * m;
  vec3 x = 2.0 * fract(p * C.www) - 1.0;
  vec3 h = abs(x) - 0.5;
  vec3 ox = floor(x + 0.5);
  vec3 a0 = x - ox;
  m *= 1.79284291400159 - 0.85373472095314 * (a0 * a0 + h * h);
  vec3 g;
  g.x  = a0.x  * x0.x  + h.x  * x0.y;
  g.yz = a0.yz * x12.xz + h.yz * x12.yw;
  return 130.0 * dot(m, g);
}

// Domain-warped fbm — the warp is what makes it read as flowing cloth
// rather than generic noise.
float fbm(vec2 p) {
  float v = 0.0;
  float amp = 0.5;
  for (int i = 0; i < 4; i++) {
    v += amp * snoise(p);
    p *= 2.02;
    amp *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = gl_FragCoord.xy / uRes.xy;
  vec2 p = (gl_FragCoord.xy - 0.5 * uRes.xy) / uRes.y;

  float t = uTime * 0.035;

  // two-stage domain warp
  vec2 q = vec2(fbm(p * 1.2 + vec2(0.0, t)),
                fbm(p * 1.2 + vec2(3.7, -t * 0.8)));
  vec2 r = vec2(fbm(p * 1.6 + q * 0.9 + vec2(1.3, t * 1.2)),
                fbm(p * 1.6 + q * 0.9 + vec2(-2.1, t * 0.9)));

  float f = fbm(p * 1.4 + r * 1.1);
  f = f * 0.5 + 0.5;

  // brand palette: deep bronze -> amber -> pale sand
  vec3 bronze = vec3(0.408, 0.271, 0.145);
  vec3 amber  = vec3(0.851, 0.631, 0.357);
  vec3 sand   = vec3(0.937, 0.831, 0.667);

  vec3 col = mix(bronze, amber, smoothstep(0.32, 0.72, f));
  col = mix(col, sand, smoothstep(0.68, 0.94, f) * 0.55);

  // filaments — thin bright veins along the warp ridges
  float ridge = 1.0 - abs(f - 0.5) * 2.0;
  col += sand * pow(max(ridge, 0.0), 7.0) * 0.35;

  // shape the alpha: bloom toward top-centre, fade to nothing at the edges
  float radial = 1.0 - smoothstep(0.15, 1.05, length(p * vec2(0.72, 1.0)));
  float vertical = smoothstep(-0.15, 0.75, 1.0 - uv.y);
  float a = pow(max(f, 0.0), 1.6) * radial * mix(0.55, 1.0, vertical);

  gl_FragColor = vec4(col, clamp(a * uIntensity, 0.0, 1.0));
}
`;

function compile(gl: WebGLRenderingContext, type: number, src: string) {
  const shader = gl.createShader(type);
  if (!shader) return null;
  gl.shaderSource(shader, src);
  gl.compileShader(shader);
  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    gl.deleteShader(shader);
    return null;
  }
  return shader;
}

export default function ShaderField({
  className,
  intensity = 0.55,
}: {
  className?: string;
  /** 0–1 overall opacity of the field. */
  intensity?: number;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const hostRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(false);

  // Only switch the canvas on once it is both in view and motion is allowed.
  useEffect(() => {
    const host = hostRef.current;
    if (!host) return;

    const motionOk = !window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!motionOk) return;

    const io = new IntersectionObserver(
      ([entry]) => setActive(entry.isIntersecting),
      { rootMargin: "120px" },
    );
    io.observe(host);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: true,
      premultipliedAlpha: false,
      antialias: false,
      depth: false,
      stencil: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vs = compile(gl, gl.VERTEX_SHADER, VERT);
    const fs = compile(gl, gl.FRAGMENT_SHADER, FRAG);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW,
    );
    const aPos = gl.getAttribLocation(program, "aPos");
    gl.enableVertexAttribArray(aPos);
    gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0);

    const uRes = gl.getUniformLocation(program, "uRes");
    const uTime = gl.getUniformLocation(program, "uTime");
    const uIntensity = gl.getUniformLocation(program, "uIntensity");

    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.uniform1f(uIntensity, intensity);

    // Render well under device resolution — this is soft light, nobody can
    // tell, and it keeps mid-range phones at 60fps.
    const scale = window.innerWidth < 768 ? 0.4 : 0.55;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.max(1, Math.floor(canvas.clientWidth * dpr * scale));
      const h = Math.max(1, Math.floor(canvas.clientHeight * dpr * scale));
      if (canvas.width === w && canvas.height === h) return;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
      gl.uniform2f(uRes, w, h);
    };
    resize();

    const ro = new ResizeObserver(resize);
    ro.observe(canvas);

    let raf = 0;
    let running = true;
    const start = performance.now();

    const frame = (now: number) => {
      if (!running) return;
      gl.uniform1f(uTime, (now - start) / 1000);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);

    const onVisibility = () => {
      if (document.hidden) {
        running = false;
        cancelAnimationFrame(raf);
      } else if (!running) {
        running = true;
        raf = requestAnimationFrame(frame);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    // A lost context otherwise leaves a dead rectangle where the light was.
    const onLost = (event: Event) => {
      event.preventDefault();
      running = false;
      cancelAnimationFrame(raf);
    };
    canvas.addEventListener("webglcontextlost", onLost);

    return () => {
      running = false;
      cancelAnimationFrame(raf);
      ro.disconnect();
      document.removeEventListener("visibilitychange", onVisibility);
      canvas.removeEventListener("webglcontextlost", onLost);
      gl.deleteProgram(program);
      gl.deleteShader(vs);
      gl.deleteShader(fs);
      gl.deleteBuffer(buffer);
    };
  }, [active, intensity]);

  return (
    <div ref={hostRef} className={cn("pointer-events-none absolute inset-0", className)} aria-hidden="true">
      {/* Always-present gradient — this is what reduced-motion and no-WebGL users see. */}
      <div className="absolute inset-0 hero-shell" />
      <canvas
        ref={canvasRef}
        className={cn(
          "size-full transition-opacity duration-1000",
          active ? "opacity-100" : "opacity-0",
        )}
      />
    </div>
  );
}
