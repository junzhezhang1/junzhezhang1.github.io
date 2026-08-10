"use client";

import { useEffect, useRef } from "react";
import { Mesh, Program, Renderer, Triangle } from "ogl";

type GrainientProps = {
  timeSpeed?: number;
  colorBalance?: number;
  warpStrength?: number;
  warpFrequency?: number;
  warpSpeed?: number;
  warpAmplitude?: number;
  blendAngle?: number;
  blendSoftness?: number;
  rotationAmount?: number;
  noiseScale?: number;
  grainAmount?: number;
  grainScale?: number;
  grainAnimated?: boolean;
  contrast?: number;
  gamma?: number;
  saturation?: number;
  centerX?: number;
  centerY?: number;
  zoom?: number;
  color1?: string;
  color2?: string;
  color3?: string;
  className?: string;
};

type GrainientUniforms = {
  iTime: { value: number };
  iResolution: { value: Float32Array };
  uTimeSpeed: { value: number };
  uColorBalance: { value: number };
  uWarpStrength: { value: number };
  uWarpFrequency: { value: number };
  uWarpSpeed: { value: number };
  uWarpAmplitude: { value: number };
  uBlendAngle: { value: number };
  uBlendSoftness: { value: number };
  uRotationAmount: { value: number };
  uNoiseScale: { value: number };
  uGrainAmount: { value: number };
  uGrainScale: { value: number };
  uGrainAnimated: { value: number };
  uContrast: { value: number };
  uGamma: { value: number };
  uSaturation: { value: number };
  uCenterOffset: { value: Float32Array };
  uZoom: { value: number };
  uColor1: { value: Float32Array };
  uColor2: { value: Float32Array };
  uColor3: { value: Float32Array };
};

type GrainientContext = {
  renderer: InstanceType<typeof Renderer>;
  program: InstanceType<typeof Program>;
  mesh: InstanceType<typeof Mesh>;
};

const contextMap = new WeakMap<HTMLDivElement, GrainientContext>();

const hexToRgb = (hex: string): [number, number, number] => {
  const match = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  if (!match) return [1, 1, 1];

  return [
    Number.parseInt(match[1], 16) / 255,
    Number.parseInt(match[2], 16) / 255,
    Number.parseInt(match[3], 16) / 255,
  ];
};

const vertexShader = `#version 300 es
  in vec2 position;

  void main() {
    gl_Position = vec4(position, 0.0, 1.0);
  }
`;

const fragmentShader = `#version 300 es
  precision highp float;

  uniform vec2 iResolution;
  uniform float iTime;
  uniform float uTimeSpeed;
  uniform float uColorBalance;
  uniform float uWarpStrength;
  uniform float uWarpFrequency;
  uniform float uWarpSpeed;
  uniform float uWarpAmplitude;
  uniform float uBlendAngle;
  uniform float uBlendSoftness;
  uniform float uRotationAmount;
  uniform float uNoiseScale;
  uniform float uGrainAmount;
  uniform float uGrainScale;
  uniform float uGrainAnimated;
  uniform float uContrast;
  uniform float uGamma;
  uniform float uSaturation;
  uniform vec2 uCenterOffset;
  uniform float uZoom;
  uniform vec3 uColor1;
  uniform vec3 uColor2;
  uniform vec3 uColor3;

  out vec4 fragColor;

  #define S(a,b,t) smoothstep(a,b,t)

  mat2 rotate2d(float angle) {
    float sine = sin(angle);
    float cosine = cos(angle);
    return mat2(cosine, -sine, sine, cosine);
  }

  vec2 hash(vec2 point) {
    point = vec2(
      dot(point, vec2(2127.1, 81.17)),
      dot(point, vec2(1269.5, 283.37))
    );
    return fract(sin(point) * 43758.5453);
  }

  float noise(vec2 point) {
    vec2 integer = floor(point);
    vec2 fraction = fract(point);
    vec2 curve = fraction * fraction * (3.0 - 2.0 * fraction);
    float value = mix(
      mix(
        dot(-1.0 + 2.0 * hash(integer), fraction),
        dot(-1.0 + 2.0 * hash(integer + vec2(1.0, 0.0)), fraction - vec2(1.0, 0.0)),
        curve.x
      ),
      mix(
        dot(-1.0 + 2.0 * hash(integer + vec2(0.0, 1.0)), fraction - vec2(0.0, 1.0)),
        dot(-1.0 + 2.0 * hash(integer + vec2(1.0, 1.0)), fraction - vec2(1.0, 1.0)),
        curve.x
      ),
      curve.y
    );
    return 0.5 + 0.5 * value;
  }

  void mainImage(out vec4 outputColor, vec2 coordinate) {
    float time = iTime * uTimeSpeed;
    vec2 uv = coordinate / iResolution.xy;
    float ratio = iResolution.x / iResolution.y;
    vec2 transformedUv = uv - 0.5 + uCenterOffset;
    transformedUv /= max(uZoom, 0.001);

    float degree = noise(vec2(time * 0.1, transformedUv.x * transformedUv.y) * uNoiseScale);
    transformedUv.y *= 1.0 / ratio;
    transformedUv *= rotate2d(radians((degree - 0.5) * uRotationAmount + 180.0));
    transformedUv.y *= ratio;

    float strength = max(uWarpStrength, 0.001);
    float amplitude = uWarpAmplitude / strength;
    float warpTime = time * uWarpSpeed;
    transformedUv.x += sin(transformedUv.y * uWarpFrequency + warpTime) / amplitude;
    transformedUv.y += sin(transformedUv.x * (uWarpFrequency * 1.5) + warpTime) / (amplitude * 0.5);

    float softness = max(uBlendSoftness, 0.0);
    mat2 blendRotation = rotate2d(radians(uBlendAngle));
    float blendX = (transformedUv * blendRotation).x;
    float edge0 = -0.3 - uColorBalance - softness;
    float edge1 = 0.2 - uColorBalance + softness;
    float vertical0 = 0.5 - uColorBalance + softness;
    float vertical1 = -0.3 - uColorBalance - softness;
    vec3 layer1 = mix(uColor3, uColor2, S(edge0, edge1, blendX));
    vec3 layer2 = mix(uColor2, uColor1, S(edge0, edge1, blendX));
    vec3 color = mix(layer1, layer2, S(vertical0, vertical1, transformedUv.y));

    vec2 grainUv = uv * max(uGrainScale, 0.001);
    if (uGrainAnimated > 0.5) grainUv += vec2(iTime * 0.05);
    float grain = fract(sin(dot(grainUv, vec2(12.9898, 78.233))) * 43758.5453);
    color += (grain - 0.5) * uGrainAmount;
    color = (color - 0.5) * uContrast + 0.5;
    float luma = dot(color, vec3(0.2126, 0.7152, 0.0722));
    color = mix(vec3(luma), color, uSaturation);
    color = pow(max(color, 0.0), vec3(1.0 / max(uGamma, 0.001)));
    outputColor = vec4(clamp(color, 0.0, 1.0), 1.0);
  }

  void main() {
    vec4 outputColor = vec4(0.0);
    mainImage(outputColor, gl_FragCoord.xy);
    fragColor = outputColor;
  }
`;

// Adapted from the React Bits Grainient background for this site's hero.
export function Grainient({
  timeSpeed = 0.25,
  colorBalance = 0,
  warpStrength = 1,
  warpFrequency = 5,
  warpSpeed = 2,
  warpAmplitude = 50,
  blendAngle = 0,
  blendSoftness = 0.05,
  rotationAmount = 500,
  noiseScale = 2,
  grainAmount = 0.1,
  grainScale = 2,
  grainAnimated = false,
  contrast = 1.5,
  gamma = 1,
  saturation = 1,
  centerX = 0,
  centerY = 0,
  zoom = 0.9,
  color1 = "#ff9ffc",
  color2 = "#5227ff",
  color3 = "#b497cf",
  className = "",
}: GrainientProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const renderer = new Renderer({
      webgl: 2,
      alpha: true,
      antialias: false,
      dpr: Math.min(window.devicePixelRatio || 1, 1.5),
    });
    const gl = renderer.gl;
    const canvas = gl.canvas as HTMLCanvasElement;
    canvas.style.width = "100%";
    canvas.style.height = "100%";
    canvas.style.display = "block";
    canvas.setAttribute("aria-hidden", "true");
    container.appendChild(canvas);

    const geometry = new Triangle(gl);
    const program = new Program(gl, {
      vertex: vertexShader,
      fragment: fragmentShader,
      uniforms: {
        iTime: { value: 0 },
        iResolution: { value: new Float32Array([1, 1]) },
        uTimeSpeed: { value: 0.25 },
        uColorBalance: { value: 0 },
        uWarpStrength: { value: 1 },
        uWarpFrequency: { value: 5 },
        uWarpSpeed: { value: 2 },
        uWarpAmplitude: { value: 50 },
        uBlendAngle: { value: 0 },
        uBlendSoftness: { value: 0.05 },
        uRotationAmount: { value: 500 },
        uNoiseScale: { value: 2 },
        uGrainAmount: { value: 0.1 },
        uGrainScale: { value: 2 },
        uGrainAnimated: { value: 0 },
        uContrast: { value: 1.5 },
        uGamma: { value: 1 },
        uSaturation: { value: 1 },
        uCenterOffset: { value: new Float32Array([0, 0]) },
        uZoom: { value: 0.9 },
        uColor1: { value: new Float32Array([1, 1, 1]) },
        uColor2: { value: new Float32Array([1, 1, 1]) },
        uColor3: { value: new Float32Array([1, 1, 1]) },
      },
    });
    const mesh = new Mesh(gl, { geometry, program });
    contextMap.set(container, { renderer, program, mesh });
    const uniforms = program.uniforms as unknown as GrainientUniforms;

    const setSize = () => {
      const bounds = container.getBoundingClientRect();
      renderer.setSize(
        Math.max(1, Math.floor(bounds.width)),
        Math.max(1, Math.floor(bounds.height)),
      );
      uniforms.iResolution.value[0] = gl.drawingBufferWidth;
      uniforms.iResolution.value[1] = gl.drawingBufferHeight;
      renderer.render({ scene: mesh });
    };

    const resizeObserver = new ResizeObserver(setSize);
    resizeObserver.observe(container);
    setSize();

    let animationFrame = 0;
    let isVisible = true;
    let isPageVisible = !document.hidden;
    const startTime = performance.now();

    const render = (time: number) => {
      uniforms.iTime.value = (time - startTime) * 0.001;
      renderer.render({ scene: mesh });
      animationFrame = window.requestAnimationFrame(render);
    };

    const start = () => {
      if (!reducedMotion && isVisible && isPageVisible && animationFrame === 0) {
        animationFrame = window.requestAnimationFrame(render);
      }
    };

    const stop = () => {
      if (animationFrame !== 0) {
        window.cancelAnimationFrame(animationFrame);
        animationFrame = 0;
      }
    };

    const intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        isVisible = entry.isIntersecting;
        if (isVisible) start();
        else stop();
      },
      { threshold: 0 },
    );
    intersectionObserver.observe(container);

    const handleVisibility = () => {
      isPageVisible = !document.hidden;
      if (isPageVisible) start();
      else stop();
    };

    document.addEventListener("visibilitychange", handleVisibility);
    start();

    return () => {
      stop();
      resizeObserver.disconnect();
      intersectionObserver.disconnect();
      document.removeEventListener("visibilitychange", handleVisibility);
      contextMap.delete(container);
      canvas.remove();
    };
  }, []);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const context = contextMap.get(container);
    if (!context) return;

    const uniforms = context.program.uniforms as unknown as GrainientUniforms;
    uniforms.uTimeSpeed.value = timeSpeed;
    uniforms.uColorBalance.value = colorBalance;
    uniforms.uWarpStrength.value = warpStrength;
    uniforms.uWarpFrequency.value = warpFrequency;
    uniforms.uWarpSpeed.value = warpSpeed;
    uniforms.uWarpAmplitude.value = warpAmplitude;
    uniforms.uBlendAngle.value = blendAngle;
    uniforms.uBlendSoftness.value = blendSoftness;
    uniforms.uRotationAmount.value = rotationAmount;
    uniforms.uNoiseScale.value = noiseScale;
    uniforms.uGrainAmount.value = grainAmount;
    uniforms.uGrainScale.value = grainScale;
    uniforms.uGrainAnimated.value = grainAnimated ? 1 : 0;
    uniforms.uContrast.value = contrast;
    uniforms.uGamma.value = gamma;
    uniforms.uSaturation.value = saturation;
    uniforms.uCenterOffset.value = new Float32Array([centerX, centerY]);
    uniforms.uZoom.value = zoom;
    uniforms.uColor1.value = new Float32Array(hexToRgb(color1));
    uniforms.uColor2.value = new Float32Array(hexToRgb(color2));
    uniforms.uColor3.value = new Float32Array(hexToRgb(color3));
  }, [
    blendAngle,
    blendSoftness,
    centerX,
    centerY,
    color1,
    color2,
    color3,
    colorBalance,
    contrast,
    gamma,
    grainAmount,
    grainAnimated,
    grainScale,
    noiseScale,
    rotationAmount,
    saturation,
    timeSpeed,
    warpAmplitude,
    warpFrequency,
    warpSpeed,
    warpStrength,
    zoom,
  ]);

  return (
    <div
      ref={containerRef}
      className={`grainient-container ${className}`.trim()}
    />
  );
}
